import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 flex flex-col justify-between">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <ul className="space-y-2">
          <li className="py-2 px-4 hover:bg-gray-700 rounded-md cursor-pointer">
            Products
          </li>
          <li className="py-2 px-4 hover:bg-gray-700 rounded-md cursor-pointer">
            Sales
          </li>
          <li className="py-2 px-4 hover:bg-gray-700 rounded-md cursor-pointer">
            Reports
          </li>
          {/* Add more sidebar items as needed */}
        </ul>
      </div>
      <div className="p-4 bg-gray-900">
        <p className="text-xs">EyeGlass Company</p>
      </div>
    </div>
  );
};

export default Sidebar;
