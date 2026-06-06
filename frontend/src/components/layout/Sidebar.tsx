"use client";

import {
  Home,
  Users,
  FileText,
  BookOpen,
  Library,
  Settings,
  ChevronDown
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <div className="w-55 h-screen bg-white rounded-r-3xl shadow-lg p-5 flex flex-col">
      <h1 className="text-3xl font-bold mb-6">
        VedaAI
      </h1>

      <button className="bg-black text-white rounded-full py-2.5 mb-8 border-2 border-orange-500 font-medium text-sm hover:bg-gray-800 transition-colors">
        AI Teacher's Toolkit
      </button>

      <nav className="space-y-2 flex-1">
        <div className={`flex items-center gap-3 rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-200 ${
          isActive("/") 
            ? "bg-gray-200 font-medium" 
            : "hover:bg-gray-100"
        }`}>
          <Home size={18} className="text-black" />
          <span className="text-sm font-medium">Home</span>
        </div>

        <div className={`flex items-center gap-3 rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-200 ${
          isActive("/groups") 
            ? "bg-gray-200 font-medium" 
            : "hover:bg-gray-100"
        }`}>
          <Users size={18} />
          <span className="text-sm font-medium">My Groups</span>
        </div>

        <div className={`flex items-center gap-3 rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-200 relative ${
          isActive("/assignments") 
            ? "bg-gray-200 font-medium" 
            : "hover:bg-gray-100"
        }`}>
          <FileText size={18} />
          <span className="text-sm font-medium">Assignments</span>
          <span className="absolute right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">2</span>
        </div>

        <div className={`flex items-center gap-3 rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-200 ${
          isActive("/toolkit") 
            ? "bg-gray-200 font-medium" 
            : "hover:bg-gray-100"
        }`}>
          <BookOpen size={18} />
          <span className="text-sm font-medium">AI Toolkit</span>
        </div>

        <div className={`flex items-center gap-3 rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-200 ${
          isActive("/library") 
            ? "bg-gray-200 font-medium" 
            : "hover:bg-gray-100"
        }`}>
          <Library size={18} />
          <span className="text-sm font-medium">Library</span>
        </div>
      </nav>

      <div className="mt-auto space-y-4">
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
          <p className="text-sm font-semibold text-gray-900 mb-1">Delhi Public School</p>
          <p className="text-xs text-gray-500">Bokaro Steel City</p>
        </div>

        <div className={`flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
          isActive("/settings") 
            ? "bg-gray-200 font-medium" 
            : "hover:bg-gray-100"
        }`}>
          <Settings size={18} />
          <span className="text-sm font-medium">Settings</span>
        </div>
      </div>
    </div>
  );
}