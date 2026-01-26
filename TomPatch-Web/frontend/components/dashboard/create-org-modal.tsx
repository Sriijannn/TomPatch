"use client";

import { useState } from "react";
import { createOrganization } from "@/app/(dashboard)/dashboard/actions";
import { X, Loader2, Building2 } from "lucide-react";

import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

export default function CreateOrgModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  // We can wrap the server action to handle the loading state manually
  // or use useFormStatus if we extracted the button.
  // For a simple modal, a wrapper handler is often easier to read:

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    // Call the server action directly
    // Note: The action handles the redirect on success!
    const result = await createOrganization(null, formData);

    if (result?.message) {
      alert(result.message); // Simple error handling for now
      setLoading(false);
    }
    // If successful, the browser redirects, so we don't need to setLoading(false)
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-600" />
            Create Organization
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <form action={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Organization Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="e.g. Acme Corp IoT"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                autoFocus
              />
              <p className="mt-1 text-xs text-gray-500">
                This will generate your team URL and invite code.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Team"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
