import React from "react";
import { assets, dummyUserData } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import MenuItems from "./MenuItems";
import { CirclePlus, LogOut } from "lucide-react";
import { UserButton, useClerk } from "@clerk/react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const user = dummyUserData;
  const { signOut } = useClerk();

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 z-50 transition-transform duration-300 relative flex flex-col
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-slate-100">
          <img
            src={assets.Vibely2}
            alt="Vibely"
            onClick={() => navigate("/")}
            className="h-12 cursor-pointer"
          />

          <p className="text-xs text-slate-500 mt-1">
            Connect Smarter Together
          </p>
        </div>

        {/* Menu */}
        <div className="flex-1 p-4 overflow-y-auto">
          <MenuItems setSidebarOpen={setSidebarOpen} />

          {/* Create Post */}
          <Link
            to="/create-post"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
          >
            <CirclePlus className="w-5 h-5" />
            Create Post
          </Link>
        </div>

        {/* User Profile */}
        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <UserButton />

                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  {user.full_name}
                </h3>

                <p className="text-xs text-slate-500">
                  @{user.username}
                </p>
              </div>
            </div>

            <button
              onClick={() => signOut()}
              className="p-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;