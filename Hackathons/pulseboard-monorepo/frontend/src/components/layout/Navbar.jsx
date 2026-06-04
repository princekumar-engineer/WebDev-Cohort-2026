import { Bell, User } from "lucide-react";

export default function Navbar() {
  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between">
      <h1 className="font-bold text-xl text-violet-600">
        PulseBoard
      </h1>

      <div className="flex items-center gap-4">
        <Bell size={20} />
        <User size={20} />
      </div>
    </div>
  );
}