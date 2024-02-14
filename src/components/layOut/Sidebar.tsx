/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, NavLink } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/features/hooks";
import { logout } from "../../redux/features/apiAuth/authSlice";

import React from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import { PowerIcon } from "@heroicons/react/24/solid";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FaChartLine, FaEye, FaGlasses, FaPlus } from "react-icons/fa";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    const toastId = toast.loading("loading...");
    dispatch(logout());
    toast.success("Logged out", { id: toastId, duration: 2000 });
  };

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div>
      <div className="hidden lg:block">
        {/* Only visible on large screens */}
        <Card
          placeholder="..."
          color="transparent"
          shadow={false}
          className="h-[calc(100vh--2rem)]  w-full p-6 bg-gradient-to-br from-pink-500 to-purple-300"
        >
          <div className="mb-6 mt-4 flex items-center gap-4 p-4">
            <FaGlasses className="h-6 w-6 text-white" />
            <Typography
              placeholder="..."
              variant="h5"
              color="yellow"
              className="text-3xl"
            >
              Eye Glasses
            </Typography>
          </div>
          <div className="p-2">
            <Input
              className="text-white border-2 border-white rounded-md px-4 py-2 focus:outline-none focus:border-white text-2xl"
              crossOrigin="..."
              icon={<MagnifyingGlassIcon className="h-6 w-6 text-gray-300" />}
              label="Search"
              success
            />
          </div>
          <List placeholder="...">
            <List placeholder="..." className="p-0">
              <ListItem placeholder="...">
                <ListItemPrefix placeholder="...">
                  <FaPlus strokeWidth={3} className="h-6 w-6 text-gray-300" />
                </ListItemPrefix>
                <NavLink to="/add-product" className="text-white">
                  Add Glass
                </NavLink>
              </ListItem>
              <ListItem placeholder="...">
                <ListItemPrefix placeholder="...">
                  <FaEye strokeWidth={3} className="h-6 w-6 text-gray-300" />
                </ListItemPrefix>
                <NavLink to="/all-products" className="text-white">
                  Eye Glasses
                </NavLink>
              </ListItem>
              <ListItem placeholder="...">
                <ListItemPrefix placeholder="...">
                  <FaChartLine
                    strokeWidth={3}
                    className="h-6 w-6 text-gray-300"
                  />
                </ListItemPrefix>
                <NavLink to="/sales-history" className="text-white">
                  Sales History
                </NavLink>
              </ListItem>
            </List>

            <hr className="my-2 border-gray-300" />

            <ListItem placeholder="...">
              <ListItemPrefix placeholder="...">
                <PowerIcon className="h-5 w-5 text-gray-300" />
              </ListItemPrefix>

              <Link onClick={handleLogout} to="/login" className="text-white">
                Log Out
              </Link>
            </ListItem>
          </List>
        </Card>
      </div>
      <IconButton
        placeholder="..."
        variant="text"
        size="lg"
        onClick={openDrawer}
        className="lg:hidden" // Hide on large screens
      >
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2 text-gray-300" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2 text-gray-300" />
        )}
      </IconButton>
      <Drawer
        placeholder="..."
        open={isDrawerOpen}
        onClose={closeDrawer}
        className="lg:hidden"
      >
        {/* Render only on small screens */}
        {/* Insert content here for the drawer */}
        <Card
          placeholder="..."
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4 bg-gradient-to-br from-pink-500 to-purple-300"
        >
          <div className="mb-6 mt-4 flex items-center gap-4 p-4">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography
              placeholder="..."
              variant="h5"
              color="white"
              className="text-lg"
            >
              Eye Glasses
            </Typography>
          </div>
          <div className="p-2">
            <Input
              className="text-white border-2 border-white rounded-md px-4 py-2 focus:outline-none focus:border-white text-2xl"
              crossOrigin="..."
              icon={<MagnifyingGlassIcon className="h-6 w-6 text-gray-300" />}
              label="Search"
              success
            />
          </div>
          <List placeholder="...">
            <ListItemPrefix placeholder="...">
              <FaGlasses className="h-6 w-6 text-gray-300" />
            </ListItemPrefix>

            <List placeholder="..." className="p-0">
              <ListItem placeholder="...">
                <ListItemPrefix placeholder="...">
                  <FaPlus strokeWidth={3} className="h-6 w-6 text-gray-300" />
                </ListItemPrefix>
                <NavLink to="/add-product" className="text-white">
                  Add Glass
                </NavLink>
              </ListItem>
              <ListItem placeholder="...">
                <ListItemPrefix placeholder="...">
                  <FaEye strokeWidth={3} className="h-6 w-6 text-gray-300" />
                </ListItemPrefix>
                <NavLink to="/all-products" className="text-white">
                  Eye Glasses
                </NavLink>
              </ListItem>
              <ListItem placeholder="...">
                <ListItemPrefix placeholder="...">
                  <FaChartLine
                    strokeWidth={3}
                    className="h-6 w-6 text-gray-300"
                  />
                </ListItemPrefix>
                <NavLink to="/sales-history" className="text-white">
                  Sales History
                </NavLink>
              </ListItem>
            </List>

            <hr className="my-2 border-gray-300" />

            <ListItem placeholder="...">
              <ListItemPrefix placeholder="...">
                <PowerIcon className="h-5 w-5 text-gray-300" />
              </ListItemPrefix>
              <Link onClick={handleLogout} to="/login" className="text-white">
                Log Out
              </Link>
            </ListItem>
          </List>
        </Card>
      </Drawer>
    </div>
  );
};

export default Sidebar;
