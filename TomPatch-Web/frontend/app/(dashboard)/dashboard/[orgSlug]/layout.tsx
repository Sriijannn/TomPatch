import { getCurrentMember } from "@/lib/auth/get-role";
import Sidebar from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { orgSlug: string };
}) {
  // 1. Security Check & Data Fetching (Server-Side)
  // This runs before the page loads. If it fails, they get redirected.
  const member = await getCurrentMember(params.orgSlug);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* 2. Persistent Sidebar */}
      <aside className="hidden md:block">
        <Sidebar
          role={member.role}
          orgName={member.org.name}
          slug={member.org.slug}
        />
      </aside>

      {/* 3. Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header (Optional - add later) */}
        <div className="md:hidden p-4 bg-white border-b flex justify-between items-center">
          <span className="font-bold">{member.org.name}</span>
          {/* You can add a mobile menu toggle here later */}
        </div>

        {/* The Page Content scrolls independently */}
        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </main>
    </div>
  );
}
