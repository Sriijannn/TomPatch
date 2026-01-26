"use client";

import { useState } from "react";
import { Plus, UserPlus } from "lucide-react";
import CreateOrgModal from "./create-org-modal";
import JoinOrgModal from "./join-org-modal";

export default function LobbyControls({
  isCard = false,
}: {
  isCard?: boolean;
}) {
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  if (isCard) {
    return (
      <>
        <button
          onClick={() => setShowCreate(true)}
          className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all text-gray-400 hover:text-indigo-600 h-full min-h-[180px] w-full"
        >
          <Plus className="w-8 h-8 mb-2" />
          <span className="font-medium">Create Organization</span>
        </button>
        <CreateOrgModal
          isOpen={showCreate}
          onClose={() => setShowCreate(false)}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex gap-3">
        <button
          onClick={() => setShowJoin(true)}
          className="flex items-center gap-2 bg-[#FF9900] text-white px-4 py-2 rounded-full hover:bg-[#ff7b00] transition-colors text-xl"
        >
          <UserPlus className="w-4 h-4" />
          Join Team
        </button>

        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-[#6D57FF] text-white px-4 py-2 rounded-full hover:bg-[#6D27FF] transition-colors text-xl"
        >
          <Plus className="w-4 h-4" />
          Create New
        </button>
      </div>

      <CreateOrgModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
      />
      <JoinOrgModal isOpen={showJoin} onClose={() => setShowJoin(false)} />
    </>
  );
}
