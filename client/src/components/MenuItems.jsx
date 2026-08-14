import React from "react";
import { NavLink } from "react-router-dom";
import { menuItemsData } from "../assets/assets";

const MenuItems = ({ setSidebarOpen }) => {
  return (
    <div className="space-y-1 px-3">
      {menuItemsData.map(({ to, label, Icon }) => (

        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
            ${
                isActive
                ? "bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 text-purple-700 border-l-4 border-purple-500"
                : "text-slate-600 hover:bg-slate-50"
            }`
        }>
          <Icon
            className={`w-5 h-5 ${
              location.pathname === to
                ? "text-purple-600"
                : "text-slate-500"
            }`}
          />

          <span className="font-medium">
            {label}
          </span>
        </NavLink>
      ))}
    </div>
  );
};

export default MenuItems;