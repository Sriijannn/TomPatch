import { getFleets } from "../actions";
import CreateFleetForm from "@/components/dashboard/create-fleet-form";
import Link from "next/link";
import { Server, Activity, ArrowRight } from "lucide-react";

export default async function DashboardPage({
  params,
}: {
  params: { orgSlug: string };
}) {
  const fleets = await getFleets(params.orgSlug);

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Fleets</h1>
        <p className="text-gray-500">Manage your device groups and updates.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. The List of Existing Fleets */}
        {fleets.map((fleet) => (
          <Link
            key={fleet.id}
            href={`/dashboard/${params.orgSlug}/fleet/${fleet.id}`}
            className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-indigo-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Server className="w-6 h-6" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 bg-green-50 text-green-700 rounded-full">
                <Activity className="w-3 h-3" />
                Active
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
              {fleet.name}
            </h3>

            <p className="text-sm text-gray-500 mb-6">
              {fleet._count.devices} Devices Connected
            </p>

            <div className="flex items-center text-sm font-medium text-indigo-600 group-hover:translate-x-1 transition-transform">
              Manage Fleet <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        ))}

        {/* 2. The Create Button/Form */}
        <CreateFleetForm orgSlug={params.orgSlug} />
      </div>
    </div>
  );
}
