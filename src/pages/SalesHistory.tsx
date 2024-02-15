import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Spinner,
} from "@material-tailwind/react";
import SalesCard from "./SalesCard";

import { useState } from "react";
import { useGetAllSalesQuery } from "../redux/features/sales/salesApi";
import { useAppSelector } from "../redux/features/hooks";
import { selectCurrentUser } from "../redux/features/apiAuth/authSlice";

const SalesHistory = () => {
  const [filter, setFilter] = useState("");
  const user = useAppSelector(selectCurrentUser);
  const userInfo = {
    email: user?.email,
    role: user?.role,
  };
  const { data: sales, isLoading } = useGetAllSalesQuery({ filter, userInfo });
  const TABLE_HEAD = [
    "Product Name",
    "Buyer Name",
    "Price",
    "Brand",
    "Lens",
    "Color",
    "Sell Quantity",
    "Download Invoice",
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner color="blue" />
      </div>
    );
  }

  return (
    <Card
      placeholder=" "
      className="h-full w-full bg-gray-100 shadow-lg rounded-lg"
    >
      <CardHeader
        placeholder=" "
        floated={false}
        shadow={false}
        className="bg-indigo-500 text-white rounded-t-lg p-4"
      >
        <div className="mb-6 mt-4 flex items-center justify-between gap-8"></div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <Typography placeholder=" " variant="h3" color="white">
              Sales History
            </Typography>
          </div>
          <div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block appearance-none w-60 bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm text-gray-800"
            >
              <option value="" disabled>
                Show Data by Filter
              </option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardBody placeholder=" " className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="border-y border-gray-200 bg-gray-50 p-4"
                >
                  <Typography
                    placeholder=" "
                    variant="small"
                    color="gray"
                    className="font-semibold text-lg leading-none opacity-90"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <SalesCard sales={sales} />
        </table>
      </CardBody>
    </Card>
  );
};

export default SalesHistory;
