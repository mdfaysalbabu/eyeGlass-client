import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <div className="flex flex-wrap overflow-hidden">
      {/* Sidebar */}
      <div className="w-full  lg:w-1/4 overflow-hidden">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-3/4 overflow-hidden">
        <div className="p-3 m-auto md:p-4 lg:p-5 h-full">
          <h1 className="text-2xl font-bold ">
            <Outlet />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
