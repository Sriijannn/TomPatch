"use server";

import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getCurrentMember } from "@/lib/auth/get-role";
import { create } from "domain";

const createOrgSchema = z.object({
  name: z.string().min(2, "Organization name must be at least 2 characters"),
});
const createFleetSchema = z.object({
  name: z.string().min(2, "Fleet name must be at least 2 characters"),
});

//invite code is used to join the organisations
function generateInviteCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result.match(/.{1,4}/g)?.join("-") || "ABCD-EFGH";
}

//slug is used as a url reference to the organisation.
function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

//server actions to add organisations
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
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 5) {
      const existing = await prisma.organisation.findUnique({
        where: { orgCode },
      });

      if (!existing) {
        isUnique = true;
      } else {
        orgCode = generateInviteCode();
        attempts++;
      }
    }

    if (!isUnique) {
      return {
        message: "Could not generate a unique team code. Please try again.",
      };
    }

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

//server action to join the organisations using invite code.
export async function joinOrganisation(prevState: any, formData: FormData) {
  const supabse = await createClient();
  const {
    data: { user },
  } = await supabse.auth.getUser();

  if (!user) {
    return { message: "User is not authenticated" };
  }

  const inviteCode = formData.get("code") as string;

  if (!inviteCode || inviteCode.length < 8) {
    return { message: "Please enter a valid invite code." };
  }

  try {
    const org = await prisma.organisation.findUnique({
      where: { orgCode: inviteCode },
    });
    if (!org) {
      return { message: "Invite Code is Invalid" };
    }

    const existingMember = await prisma.member.findUnique({
      where: {
        userId_orgId: {
          userId: user.id,
          orgId: org.id,
        },
      },
    });

    if (existingMember) {
      return { message: "You are already a member of this team." };
    }
    await prisma.member.create({
      data: {
        userId: user.id,
        orgId: org.id,
        role: "VIEWER",
      },
    });
  } catch (error) {
    console.error("Join Error:", error);
    return { message: "Failed to join team. Please try again." };
  }
  const org = await prisma.organisation.findUnique({
    where: { orgCode: inviteCode },
  });
  if (org) {
    redirect(`/dashboard/${org.slug}`);
  }
}

//server actions to get the list of fleets
export async function getFleets(orgSlug: string) {
  const member = await getCurrentMember(orgSlug);

  const whereClause: any = {
    orgId: member.orgId,
  };

  if (member.role !== "OWNER" && member.role !== "ADMIN") {
    whereClause.assignedMembers = {
      some: {
        id: member.id,
      },
    };
  }

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

//server action to create a new fleet.
export async function createFleet(orgSlug: string, formData: FormData) {
  const member = await getCurrentMember(orgSlug);

  if (member.role !== "OWNER" && member.role !== "ADMIN") {
    return { message: "Unauthorized: You cannot create fleets." };
  }

  const name = formData.get("name") as string;
  const validation = createFleetSchema.safeParse({ name });

  if (!validation.success) {
    return { message: validation.error.issues[0].message };
  }

  try {
    await prisma.fleet.create({
      data: {
        name,
        orgId: member.orgId,
      },
    });
    return { success: true };
  } catch (error) {
    return { message: "Failed to create fleet. Please try again." };
  }
}
