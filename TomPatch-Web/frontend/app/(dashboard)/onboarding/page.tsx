"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createOrganization } from "../dashboard/actions"; // We will make this action in the next step

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all"
    >
      {pending ? "Setting up..." : "Create Organization"}
    </button>
  );
}

export default function Onboarding() {
  const [state, formAction] = useFormState(createOrganization, null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to TomFlash
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Let's create your first workspace to manage your devices.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10">
          <form action={formAction} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Organization Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g. Acme Corp IoT"
                />
              </div>
            </div>

            {state?.message && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">
                {state.message}
              </div>
            )}

            <div>
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
