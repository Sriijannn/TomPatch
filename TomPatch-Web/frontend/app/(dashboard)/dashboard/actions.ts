"use server";

import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getCurrentMember } from "@/lib/auth/get-role";

const createOrgSchema = z.object({
  name: z.string().min(2, "Organization name must be at least 2 characters"),
});
const createFleetSchema = z.object({
  name: z.string().min(2, "Fleet name must be at least 2 characters"),
});

// Improved generator using built-in crypto for better randomness
function generateInviteCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  // Generate a 8-character code (e.g., 9X2A-B7K1)
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result.match(/.{1,4}/g)?.join("-") || "ABCD-EFGH";
}

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createOrganization(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { message: "User not authenticated" };
  }

  const name = formData.get("name") as string;
  const validation = createOrgSchema.safeParse({ name });

  if (!validation.success) {
    return { message: validation.error.issues[0].message };
  }

  const slug = generateSlug(name);
  let orgCode = generateInviteCode();
  let result;

  try {
    // 👇 1. SAFETY CHECK: Ensure the code is unique
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 5) {
      const existing = await prisma.organisation.findUnique({
        where: { orgCode },
      });

      if (!existing) {
        isUnique = true;
      } else {
        // Collision! Generate a new one and try again
        orgCode = generateInviteCode();
        attempts++;
      }
    }

    if (!isUnique) {
      return {
        message: "Could not generate a unique team code. Please try again.",
      };
    }

    // 2. Transaction
    result = await prisma.$transaction(async (tx) => {
      const org = await tx.organisation.create({
        data: {
          name,
          slug,
          orgCode,
        },
      });

      await tx.member.create({
        data: {
          userId: user.id,
          orgId: org.id,
          role: "OWNER",
        },
      });

      return org;
    });
  } catch (error: any) {
    // Now we know if P2002 happens, it is definitely the SLUG (Name), not the Code.
    if (error.code === "P2002") {
      const target = error.meta?.target || [];
      if (target.includes("slug")) {
        return {
          message:
            "This organization name is already used. Please choose another.",
        };
      }
    }
    console.error(error);
    return { message: "Something went wrong. Please try again." };
  }

  if (result) {
    redirect(`/dashboard/${result.slug}`);
  }
}

export async function getFleets(orgSlug: string) {
  // 1. Who is asking? (Security Check)
  const member = await getCurrentMember(orgSlug);

  // 2. Define the Query
  const whereClause: any = {
    orgId: member.orgId, // Always filter by Org first
  };

  // 3. Apply Scoped Access
  // If they are NOT an Admin/Owner, they only see fleets they are assigned to.
  if (member.role !== "OWNER" && member.role !== "ADMIN") {
    whereClause.assignedMembers = {
      some: {
        id: member.id, // Only fleets where THIS member is in the list
      },
    };
  }

  // 4. Fetch Data
  const fleets = await prisma.fleet.findMany({
    where: whereClause,
    include: {
      _count: {
        select: { devices: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return fleets;
}

export async function createFleet(orgSlug: string, formData: FormData) {
  // 1. Security Check
  const member = await getCurrentMember(orgSlug);

  // Only Owners/Admins can create fleets
  if (member.role !== "OWNER" && member.role !== "ADMIN") {
    return { message: "Unauthorized: You cannot create fleets." };
  }

  // 2. Validation
  const name = formData.get("name") as string;
  const validation = createFleetSchema.safeParse({ name });

  if (!validation.success) {
    return { message: validation.error.issues[0].message };
  }

  try {
    // 3. Create Fleet
    await prisma.fleet.create({
      data: {
        name,
        orgId: member.orgId,
      },
    });

    // 4. Revalidate (Refresh the page data without full reload)
    // We don't redirect because we want them to stay on the list view
    return { success: true };
  } catch (error) {
    return { message: "Failed to create fleet. Please try again." };
  }
}
