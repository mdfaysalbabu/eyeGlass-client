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
import {
  
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

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
      <IconButton
        placeholder="..."
        variant="text"
        size="lg"
        onClick={openDrawer}
      >
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer placeholder="..." open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          placeholder="..."
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography placeholder="..." variant="h5" color="green">
              Eye Glasses
            </Typography>
          </div>
          <div className="p-2">
            <Input
              crossOrigin="..."
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
            />
          </div>
          <List placeholder="...">
            <ListItemPrefix placeholder="...">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </ListItemPrefix>

            <List placeholder="..." className="p-0">
              <ListItem placeholder="...">
                <ListItemPrefix placeholder="...">
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <NavLink to="/add-product">Add Glass</NavLink>
              </ListItem>
              <ListItem placeholder="...">
                <ListItemPrefix placeholder="...">
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <NavLink to="/all-products">Eye Glasses</NavLink>
              </ListItem>
              <ListItem placeholder="...">
                <ListItemPrefix placeholder="...">
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <NavLink to="/sales-history">Sales History</NavLink>
              </ListItem>
            </List>

            <hr className="my-2 border-blue-gray-50" />

            <ListItem placeholder="...">
              <ListItemPrefix placeholder="...">
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link onClick={handleLogout} to="/login">
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
