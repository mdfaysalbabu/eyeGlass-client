// MainLayout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <div className="flex h-screen mx-auto">
      <Sidebar />
      <div className="flex-1 p-3 m-auto md:p-6 lg:p-5 ">
        <h1 className="text-2xl font-bold mb-4 md:mb-8 lg:mb-12">
          <div>
            <Outlet />
          </div>
        </h1>
      </div>
    </div>
  );
};

export default MainLayout;
