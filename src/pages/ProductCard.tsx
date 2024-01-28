/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Button,
  Checkbox,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import EditDuplicateModal from "./EditDuplicateModal";
import UpdateModal from "./UpdateModal";
import fallbackImage from "../assets/no-image.png";

import Swal from "sweetalert2";
import SalesModal from "./SalesModal";
import { useDeleteEyeGlassMutation } from "../redux/features/eyeGlassesApi/eyeGlassApi";

type TEyeGlass = {
  _id: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productImage: string;
  lensType: string;
  gender: string;
  frameShape: string;
  frameMaterial: string;
  color: string;
  brand: string;
};

type TGlassProps = {
  eyeGlasses: {
    data: TEyeGlass[];
  };
};

const ProductCard: React.FC<TGlassProps> = (
  { eyeGlasses }: TGlassProps,
  setProductsId: any
) => {
  const [deleteGlass] = useDeleteEyeGlassMutation();

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "bg-red-500",
      cancelButtonColor: "bg-gray-400",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteGlass(id);
        Swal.fire({
          title: "Deleted!",
          text: "Glass has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <tbody>
      {eyeGlasses?.data?.map(
        (
          {
            _id,
            productName,
            productPrice,
            productQuantity,
            productImage,
            lensType,
            frameMaterial,
            brand,
          }: TEyeGlass,
          index: number
        ) => {
          const isLast = index === eyeGlasses?.data?.length - 1;

          return (
            <tr
              key={_id}
              className={`border-b ${isLast ? "" : "border-blue-gray-50"}`}
            >
              <td className="p-4">
                <Checkbox
                  onClick={() => setProductsId(_id)}
                  className="py-2 px-2"
                  crossOrigin={""}
                  label=""
                />
              </td>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <img
                    className="h-16 w-16 md:h-20 md:w-20 rounded-md object-cover object-center border-2 border-white"
                    src={productImage ? productImage : fallbackImage}
                    alt={productImage}
                  />
                  <div className="flex flex-col">
                    <Typography
                      color="blue-gray"
                      className="font-semibold text-lg"
                    >
                      {productName}
                    </Typography>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  ${productPrice}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {productQuantity}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {brand}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {lensType}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {frameMaterial}
                </Typography>
              </td>
              <td className="p-4">
                <EditDuplicateModal id={_id} />
              </td>
              <td className="p-4">
                <UpdateModal id={_id} />
              </td>
              <td className="p-4">
                <Tooltip content="Delete Glass">
                  <Button
                    variant="gradient"
                    color="red"
                    className="py-2 px-3"
                    onClick={() => handleDelete(_id)}
                  >
                    Delete
                  </Button>
                </Tooltip>
              </td>
              <td className="p-4">
                <SalesModal id={_id} />
              </td>
            </tr>
          );
        }
      )}
    </tbody>
  );
};

export default ProductCard;
