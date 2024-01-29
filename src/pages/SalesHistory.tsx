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

const SalesHistory = () => {
  const [filter, setFilter] = useState("");
  const { data: sales, isLoading } = useGetAllSalesQuery(filter);
  const TABLE_HEAD = [
    "Product Name",
    "Buyer Name",
    "Price",
    "Brand",
    "Lens",
    "Color",
    "Sell Quantity",
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner color="blue" />
      </div>
    );
  }

  return (
    <Card placeholder={""} className="h-full w-full">
      <CardHeader
        placeholder={""}
        floated={false}
        shadow={false}
        className="rounded-none "
      >
        <div className="mb-6 mt-4 flex items-center justify-between gap-8"></div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <Typography placeholder={""} variant="h4" color="blue-gray">
              All Glasses
            </Typography>
          </div>
          <div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block appearance-none w-60 bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm "
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
      <CardBody placeholder={""} className="overflow-scroll px-0 ">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    placeholder={""}
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
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