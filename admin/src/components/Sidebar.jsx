import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen bg-white shadow-sm border-r border-gray-100">
      <div className="flex flex-col gap-2 pt-8 pl-6 pr-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200
            ${isActive
              ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'}`
          }
        >
          <div className="p-2 rounded-lg bg-gray-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <span className="hidden md:block font-medium">Dashboard</span>
        </NavLink>

        <NavLink
          to="/add"
          className={({ isActive }) => 
            `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200
            ${isActive 
              ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'}`
          }
        >
          <div className={`p-2 rounded-lg ${window.location.pathname === '/add' ? 'bg-indigo-100' : 'bg-gray-100'}`}>
            <img src={assets.add_icon} className="w-5 h-5" alt="Add Items" />
          </div>
          <span className="hidden md:block font-medium">Add Items</span>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) => 
            `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200
            ${isActive 
              ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'}`
          }
        >
          <div className={`p-2 rounded-lg ${window.location.pathname === '/list' ? 'bg-indigo-100' : 'bg-gray-100'}`}>
            <img src={assets.order_icon} className="w-5 h-5" alt="List Items" />
          </div>
          <span className="hidden md:block font-medium">List Items</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) => 
            `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200
            ${isActive 
              ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'}`
          }
        >
          <div className={`p-2 rounded-lg ${window.location.pathname === '/orders' ? 'bg-indigo-100' : 'bg-gray-100'}`}>
            <img src={assets.order_icon} className="w-5 h-5" alt="View Orders" />
          </div>
          <span className="hidden md:block font-medium">Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;