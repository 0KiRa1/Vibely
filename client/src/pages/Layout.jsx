import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Menu, X } from "lucide-react";
import { Outlet } from "react-router-dom";
import { dummyUserData } from "../assets/assets";
import Loading from "../components/Loading";

const Layout = () => {
  const user = dummyUserData;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return user ? (
    <div className="flex h-screen bg-gradient-to-br from-cyan-50 via-white to-purple-50">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow"
      >
        {sidebarOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

    </div>
  ) : (
    <Loading />
  );
};

export default Layout;