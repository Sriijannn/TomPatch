import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function getCurrentMember(orgSlug: string) {
  const supabase = await createClient();

  // 1. Check Auth Session
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/signin");

  // 2. Check Database Membership
  const member = await prisma.member.findFirst({
    where: {
      userId: user.id,
      org: {
        slug: orgSlug, // Ensure they belong to THIS specific org
      },
    },
    include: {
      org: true, // Grab the Org name too
    },
  });

  // 3. Security Bounce
  if (!member) {
    // If they aren't a member, send them back to onboarding or home
    redirect("/onboarding");
  }

  return member;
}
