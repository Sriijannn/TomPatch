import prisma from "../prisma";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export async function getCurrentMemeber(orgSlug: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/signin");

  const member = await prisma.member.findFirst({
    where: {
      userId: user.id,
      org: {
        slug: orgSlug,
      },
    },
    include: {
      org: true,
    },
  });
  if (!member) {
    redirect("/dashboard");
  }
  return member;
}
