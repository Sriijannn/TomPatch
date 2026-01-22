import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { ChevronRight, Users, Boxes } from "lucide-react";

export default async function DashboardLobby() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/signin");

  const memberships = await prisma.member.findMany({
    where: { userId: user.id },
    include: {
      org: {
        include: {
          _count: { select: { fleet: true, members: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        {/* Top Heading */}
        <div className="flex justify-between items-center mb-8 bg-[#F6f6f6] px-10 py-10 rounded-[3.2rem]">
          <div>
            <div className="flex flex-col leading-tight">
              <h1 className="text-md font-semibold text-[#57A4FF]">YOUR</h1>

              <h1 className="text-4xl font-semibold text-[#171420] -mt-1">
                ORGANISATIONS
              </h1>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              color="#FF9900"
              label="Join Team"
              redirect="/onboarding"
              fontStyle={500}
            />

            <Button
              color="#6D57FF"
              label="Create New"
              redirect="/onboarding"
              fontStyle={500}
            />
          </div>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memberships.map((m) => (
            <Link
              href={`/dashboard/${m.org.slug}`}
              className="group relative block h-full overflow-hidden rounded-[2.2rem] bg-white transition-all duration-300"
            >
              <div className="p-6 flex flex-col h-full">
                {/* Header */}
                <div className="mb-6 flex flex-row justify-between">
                  <h3 className="text-2xl font-semibold text-[#171420] mb-2">
                    {m.org.name}
                  </h3>
                  <div className="inline-block">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-md font-semibold bg-[#171420] text-white`}
                    >
                      {m.role}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-auto pt-6 border-t border-gray-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Boxes className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Fleets</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {m.org._count.fleet}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Members</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {m.org._count.members}
                    </span>
                  </div>
                  <button className="text-xl px-6 py-2 mt-3 text-white w-full rounded-full bg-amber-200 font-semibold">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
