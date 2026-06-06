import { Bell, ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    <div className="bg-white h-[72px] rounded-3xl flex items-center justify-between px-6 shadow-md">
      <h2 className="font-semibold text-base">
        Assignment
      </h2>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
        <img
          src="https://i.pravatar.cc/40"
          alt="user"
          className="rounded-full w-10 h-10"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">John Doe</span>
          <ChevronDown size={18} className="text-gray-500" />
        </div>
      </div>
    </div>
  );
}