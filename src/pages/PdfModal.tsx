import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useRef, useState } from "react";

import moment from "moment";
import fallbackImage from "../assets/no-image.png";
import { useReactToPrint } from "react-to-print";
import { useGetSaleQuery } from "../redux/features/sales/salesApi";

const DownloadPDF = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const { data: saleData } = useGetSaleQuery(id);
 
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const TABLE_HEAD = [
    "Item",
    "Price",
    "Quantity",
    "Brand",
    "lensType",
    "Color",
  ];

  return (
    <>
      <Button
        placeholder={""}
        variant="outlined"
        color="teal"
        className="py-3 px-6 border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition duration-300 rounded-lg"
        onClick={handleOpen}
      >
        Download
      </Button>
      <Dialog size="lg" placeholder={""} open={open} handler={handleOpen}>
        <DialogBody ref={componentRef} placeholder={""}>
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-2">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-2 ">
              <div>
                <Typography
                  placeholder={""}
                  variant="h5"
                  color="purple"
                  className="font-bold text-2xl md:text-3xl"
                >
                  EyeGlass Inventory
                </Typography>
              </div>
              <div className="text-right">
                <p className="font-semibold">Eye Glass</p>
                <p className="text-gray-600 text-sm">eyeglass@gmail.com</p>
                <p className="text-gray-600 text-sm">+880 1811548765</p>
                <p className="text-gray-600 text-sm">VAT: +880 1797657407</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
              <div>
                <p className="font-bold text-gray-800">Bill to:</p>
                <p className="text-gray-600">{saleData?.data?.buyerName}</p>
                <p className="text-gray-600">{saleData?.data?.userEmail}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  Invoice number:{" "}
                  <span className="text-gray-800">
                    EGI-{saleData?.data?._id}
                  </span>
                </p>
                <p className="font-semibold">
                  Invoice date:{" "}
                  <span className="text-gray-800">
                    {moment(saleData?.data?.createdAt).format("lll")}
                  </span>
                </p>
              </div>
            </div>
            <table className="w-full md:w-full table-auto text-left mb-2">
              <thead>
                <tr className="bg-gray-200">
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={index}
                      className="border-b border-gray-200  md:p-3 text-gray-700 font-semibold"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <img
                      className="h-8 w-12 rounded-lg object-cover object-center"
                      src={
                        saleData?.data?.productId?.productImage || fallbackImage
                      }
                      alt="Product Image"
                    />
                    <td className="pr-2 mr-4 md:p-3">
                      <div>
                        <Typography
                          placeholder={""}
                          color="gray"
                          className="font-semibold text-xs md:text-xl"
                        >
                          {saleData?.data?.productId?.productName || "Sold Out"}
                        </Typography>
                      </div>
                    </td>
                  </div>
                  <td className="p-4  md:p-3">
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="gray"
                      className="font-semibold"
                    >
                      ${saleData?.data?.productId?.productPrice || "Not Found"}
                    </Typography>
                  </td>
                  <td className="p-2 md:p-3">
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="gray"
                      className="font-semibold"
                    >
                      {saleData?.data?.quantity || "Not Found"}
                    </Typography>
                  </td>
                  <td className="p-2 md:p-3">
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="gray"
                      className="font-semibold"
                    >
                      {saleData?.data?.productId?.brand || "Not Found"}
                    </Typography>
                  </td>
                  <td className="p-2 md:p-3">
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="gray"
                      className="font-semibold"
                    >
                      {saleData?.data?.productId?.lensType || "Not Found"}
                    </Typography>
                  </td>
                  <td className="p-2 md:p-3">
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="gray"
                      className="font-semibold"
                    >
                      {saleData?.data?.productId?.color || "Not Found"}
                    </Typography>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="text-right">
              <p className="font-semibold text-teal-800">
                Total:{" "}
                <span>
                  ${saleData?.data?.productId?.productPrice || "Not Found"}
                </span>
              </p>
            </div>
          </div>
        </DialogBody>
        <DialogFooter placeholder={""}>
          <Button
            onClick={handlePrint}
            type="submit"
            placeholder={""}
            variant="outlined"
            color="cyan"
            className="py-3 px-6 border border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white transition duration-300 rounded-lg"
          >
            Download PDF
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DownloadPDF;
