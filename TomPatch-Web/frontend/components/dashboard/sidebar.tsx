import Link from "next/link";
import { Role } from "@prisma/client";
import {
  LayoutDashboard,
  Server,
  Cpu,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  role: Role;
  orgName: string;
  slug: string;
}

export default function Sidebar({ role, orgName, slug }: SidebarProps) {
  const baseUrl = `/dashboard/${slug}`;

  const LinkItem = ({ href, icon: Icon, label }: any) => (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-indigo-600 transition-colors"
    >
      <Icon className="w-5 h-5" />
      {label}
    </Link>
  );

  return (
    <div className="w-64 h-full bg-white border-r flex flex-col">
      <div className="p-6 border-b">
        <h2
          className="font-bold text-lg text-gray-900 truncate"
          title={orgName}
        >
          {orgName}
        </h2>
        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
          {role}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <LinkItem href={`${baseUrl}`} icon={LayoutDashboard} label="Overview" />
        <LinkItem href={`${baseUrl}/fleets`} icon={Server} label="Fleets" />
        <LinkItem href={`${baseUrl}/devices`} icon={Cpu} label="Devices" />

        {/* 🔒 Restricted Areas */}
        {(role === "ADMIN" || role === "OWNER") && (
          <>
            <div className="pt-4 pb-1">
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Management
              </p>
            </div>
            <LinkItem href={`${baseUrl}/team`} icon={Users} label="Team" />
            <LinkItem
              href={`${baseUrl}/settings`}
              icon={Settings}
              label="Settings"
            />
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <form action="/auth/signout" method="post">
          <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
