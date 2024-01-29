import { Link, NavLink } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/features/hooks";
import { logout } from "../../redux/features/apiAuth/authSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    const toastId = toast.loading("loading...");
    dispatch(logout());
    toast.success("Logged out", { id: toastId, duration: 2000 });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800 text-white">
      <div className="p-4 flex-shrink-0">
        <h2 className="text-xl font-bold mb-4 text-orange-600">
          EyeGlass Company
        </h2>
        <ul className="space-y-2">
          <Link to="/add-product">
            <li className="py-2 px-4 hover:bg-gray-700 rounded-md cursor-pointer">
              Add Glass
            </li>
          </Link>
          <Link to="/all-products">
            <li className="py-2 px-4 hover:bg-gray-700 rounded-md cursor-pointer">
              Eye Glasses
            </li>
          </Link>
          <NavLink
            className={({ isActive }) => (isActive ? "bg-deep-orange-400" : "")}
            to="/sales-history"
          >
            <li className="py-2 px-4 hover:bg-gray-700 rounded-md cursor-pointer">
              Sales History
            </li>
          </NavLink>
        </ul>
      </div>
      <div className="flex-shrink-0">
        <div className="p-4 bg-gray-900">
          <Link onClick={handleLogout} to="/login">
            <p className="text-xl py-1 px-1 hover:bg-gray-700">Logout</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
