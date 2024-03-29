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

type TProps = {
  eyeGlasses: {
    data: TEyeGlass[];
  };
};

const ProductCard: React.FC<
  TProps & { handleCheckboxClick: (id: string) => void }
> = ({ eyeGlasses, handleCheckboxClick }) => {
  const [deleteGlass] = useDeleteEyeGlassMutation();

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
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
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

          return (
            <tr key={_id} className="hover:bg-gray-100">
              {/* Checkbox */}
              <td className={`${classes} py-2 px-2 md:w-16`}>
                <div className="flex items-center gap-1">
                  <Checkbox
                    onClick={() => handleCheckboxClick(_id)}
                    className="py-1 px-1"
                    crossOrigin={""}
                    label=""
                  />
                  <img
                    className="h-8 w-12 rounded-lg object-cover object-center"
                    src={productImage ? productImage : fallbackImage}
                    alt={productImage}
                  />
                </div>
              </td>
              {/* Product Image and Name */}
              <td className={`${classes} py-2 px-4 `}>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col py-2 px-3 ">
                    <Typography
                      placeholder={""}
                      color="blue-gray"
                      className="font-normal text-sm md:text-base"
                    >
                      {productName}
                    </Typography>
                  </div>
                </div>
              </td>
              {/* Product Price */}
              <td className={`${classes} py-2 px-2 `}>
                <div className="flex flex-col">
                  <Typography
                    placeholder={""}
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    ${productPrice}
                  </Typography>
                </div>
              </td>
              {/* Product Quantity */}
              <td className={`${classes} py-2 px-3 `}>
                <Typography
                  placeholder={""}
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {productQuantity}
                </Typography>
              </td>
              {/* Brand */}
              <td className={`${classes} py-2 px-2 `}>
                <Typography
                  placeholder={""}
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {brand}
                </Typography>
              </td>
              {/* Lens Type */}
              <td className={`${classes} py-2 px-2 md:w-20 lg:w-24`}>
                <Typography
                  placeholder={""}
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {lensType}
                </Typography>
              </td>
              {/* Frame Material */}
              <td className={`${classes} py-2 px-2 `}>
                <Typography
                  placeholder={""}
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {frameMaterial}
                </Typography>
              </td>
              {/* Edit Duplicate Modal */}
              <td className={`${classes} py-1 px-1 md:w-10`}>
                <EditDuplicateModal id={_id} />
              </td>
              {/* Update Modal */}
              <td className={`${classes} py-1 px-1 `}>
                <UpdateModal id={_id} />
              </td>
              {/* Delete Button */}
              <td className={`${classes} py-1 px-1 `}>
                <Tooltip content="Delete Glass">
                  <Button
                    placeholder={""}
                    variant="gradient"
                    color="red"
                    className="py-2 px-2"
                    onClick={() => handleDelete(_id)}
                  >
                    Delete
                  </Button>
                </Tooltip>
              </td>
              {/* Sales Modal */}
              <td className={`${classes} py-1 px-1 `}>
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
