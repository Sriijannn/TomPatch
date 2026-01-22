"use client";

import { useState } from "react";
import { createFleet } from "@/app/(dashboard)/dashboard/actions";
import { Plus, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateFleetForm({ orgSlug }: { orgSlug: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await createFleet(orgSlug, formData);

    if (result?.message) {
      setError(result.message);
      setLoading(false);
    } else {
      // Success!
      setIsExpanded(false);
      setLoading(false);
      router.refresh(); // Refresh the list of fleets behind us
    }
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="flex flex-col items-center justify-center h-full min-h-[160px] p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 hover:bg-indigo-50/30 transition-all text-gray-500 hover:text-indigo-600 group"
      >
        <div className="bg-gray-100 p-3 rounded-full group-hover:bg-indigo-100 transition-colors mb-3">
          <Plus className="w-6 h-6" />
        </div>
        <span className="font-medium">Create New Fleet</span>
      </button>
    );
  }

  return (
    <div className="h-full min-h-[160px] p-6 bg-white border border-indigo-100 shadow-lg rounded-xl flex flex-col justify-center">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">New Fleet</h3>
        <button
          onClick={() => setIsExpanded(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          type="text"
          placeholder="e.g. Production V2"
          autoFocus
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
          required
        />

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Create Fleet"
          )}
        </button>
      </form>
    </div>
  );
}
