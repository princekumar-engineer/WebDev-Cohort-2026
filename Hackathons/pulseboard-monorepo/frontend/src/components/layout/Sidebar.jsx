import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  BarChart3,
  PlusSquare,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const items = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "My Polls",
    path: "/polls",
    icon: <BarChart3 size={20} />,
  },
  {
    name: "Create Poll",
    path: "/polls/create",
    icon: <PlusSquare size={20} />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <User size={20} />,
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-72 min-h-screen bg-white border-r border-gray-100 flex flex-col justify-between">
      {/* TOP */}
      <div>
        {/* LOGO */}
        <div className="px-6 py-8 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-violet-600" />

            <h1 className="text-3xl font-bold text-gray-900">
              Pulse
              <span className="text-violet-600">
                Board
              </span>
            </h1>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="p-4 space-y-2">
          {items.map((item) => {
            const isActive =
              location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 font-medium ${
                  isActive
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-200"
                    : "text-gray-600 hover:bg-violet-50 hover:text-violet-600"
                }`}
              >
                {item.icon}

                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="p-4 border-t border-gray-100">
        {/* SETTINGS */}
        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-600 hover:bg-gray-100 transition mb-2">
          <Settings size={20} />

          <span className="font-medium">Settings</span>
        </button>

        {/* LOGOUT */}
        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition">
          <LogOut size={20} />

          <span className="font-medium">Logout</span>
        </button>

      </div>
    </div>
  );
}