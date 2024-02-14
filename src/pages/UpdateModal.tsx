import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { toast } from "sonner";
import {
  useGetEyeGlassQuery,
  useUpdateEyeGlassMutation,
} from "../redux/features/eyeGlassesApi/eyeGlassApi";
const image_upload_token = import.meta.env.VITE_image_upload_token;

const UpdateModal = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const { data: glassData } = useGetEyeGlassQuery(id);
  const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_upload_token}`;
  const [updateGlass] = useUpdateEyeGlassMutation();
  const handleOpen = () => setOpen(!open);

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Please wait...");
    try {
      if (data.productImage[0]) {
        const formData = new FormData();
        formData.append("image", data.productImage[0]);
        fetch(image_upload_url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then(async (profileResponse) => {
            if (profileResponse.success) {
              const productImageURL = profileResponse.data.display_url;
              const productPriceConvert = Number(data.productPrice);
              const productQuantityConvert = Number(data.productQuantity);

              const {
                productName,
                frameMaterial,
                frameShape,
                lensType,
                brand,
                gender,
                color,
              } = data;

              const productData = {
                productName,
                productPrice: productPriceConvert,
                productQuantity: productQuantityConvert,
                productImage: productImageURL,
                frameMaterial,
                frameShape,
                lensType,
                brand,
                gender,
                color,
              };
              await updateGlass({ productData, id });
              toast.success("Product update successfully!", {
                id: toastId,
                duration: 2000,
              });
              handleOpen();
            }
          });
      } else {
        const productPriceConvert = Number(data.productPrice);
        const productQuantityConvert = Number(data.productQuantity);

        const {
          productName,
          frameMaterial,
          frameShape,
          lensType,
          brand,
          gender,
          color,
        } = data;

        const productData = {
          productName,
          productPrice: productPriceConvert,
          productQuantity: productQuantityConvert,
          frameMaterial,
          frameShape,
          lensType,
          brand,
          gender,
          color,
        };
        await updateGlass({ productData, id });
        toast.success("Product update successfully!", {
          id: toastId,
          duration: 2000,
        });
        handleOpen();
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <>
      <Button
        placeholder={""}
        variant="outlined"
        color="purple"
        className="py-2 px-3"
        onClick={handleOpen}
      >
        Update
      </Button>
      <Dialog placeholder={""} open={open} handler={handleOpen}>
        <div className="bg-gradient-to-r from-gray-100 to-teal-50">
          <form
            className="h-full flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex justify-between items-center">
              <DialogHeader placeholder={""} className="text-green-500">
                Update Glass
              </DialogHeader>
              <div
                onClick={handleOpen}
                className="me-4 cursor-pointer border-2 border-red-400 p-1"
              >
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <DialogBody placeholder={""}>
              <div className="grid lg:grid-cols-2 grid-cols-2 gap-4 my-5">
                <div>
                  <Input
                    {...register("productName")}
                    defaultValue={glassData?.data?.productName}
                    type="text"
                    crossOrigin={""}
                    placeholder=""
                    color="indigo"
                    label="Product Name"
                    size="lg"
                    className="text-orange-600 font-bold text-5xl"
                  />
                </div>
                <div>
                  <Input
                    {...register("productPrice")}
                    defaultValue={glassData?.data?.productPrice}
                    type="number"
                    crossOrigin={""}
                    placeholder=""
                    color="indigo"
                    label="Product Price"
                    size="lg"
                    className="text-orange-600 font-bold text-5xl"
                  />
                </div>
                <div>
                  <Input
                    {...register("productQuantity")}
                    defaultValue={glassData?.data?.productQuantity}
                    type="number"
                    crossOrigin={""}
                    placeholder=""
                    color="indigo"
                    label="Product Quantity"
                    size="lg"
                    className="text-orange-600 font-bold text-5xl"
                  />
                </div>
                <div>
                  <Input
                    {...register("frameMaterial")}
                    defaultValue={glassData?.data?.frameMaterial}
                    type="text"
                    crossOrigin={""}
                    placeholder=""
                    color="indigo"
                    label="Frame Material"
                    size="lg"
                    className="text-orange-600 font-bold text-5xl"
                  />
                </div>
                <div>
                  <Input
                    {...register("frameShape")}
                    defaultValue={glassData?.data?.frameShape}
                    type="text"
                    crossOrigin={""}
                    placeholder=""
                    color="indigo"
                    label="Frame Shape"
                    size="lg"
                    className="text-orange-600 font-bold text-5xl"
                  />
                </div>
                <div>
                  <Input
                    {...register("lensType")}
                    defaultValue={glassData?.data?.lensType}
                    type="text"
                    crossOrigin={""}
                    placeholder=""
                    color="indigo"
                    label="Lens Type"
                    size="lg"
                    className="text-orange-600 font-bold text-5xl"
                  />
                </div>
                <div>
                  <Input
                    {...register("brand")}
                    defaultValue={glassData?.data?.brand}
                    type="text"
                    crossOrigin={""}
                    placeholder=""
                    color="indigo"
                    label="Brand"
                    size="lg"
                    className="text-orange-600 font-bold text-5xl"
                  />
                </div>
                <div>
                  <Input
                    {...register("color")}
                    defaultValue={glassData?.data?.color}
                    type="text"
                    crossOrigin={""}
                    placeholder=""
                    color="indigo"
                    label="Color"
                    size="lg"
                    className="text-orange-600 font-bold text-5xl"
                  />
                </div>
                <div>
                  <select
                    className="w-full py-2 rounded-lg border border-purple-50 text-sm text-gray-500"
                    {...register("gender")}
                    defaultValue={glassData?.data?.gender}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <Input
                    {...register("productImage")}
                    type="file"
                    crossOrigin={""}
                    placeholder=""
                    color="indigo"
                    label="Product Image"
                    size="lg"
                    className="text-orange-600 font-bold text-5xl"
                  />
                </div>
              </div>
            </DialogBody>
            <DialogFooter placeholder={""}>
              <Button
                type="submit"
                placeholder={""}
                variant="gradient"
                color="green"
                className="w-full"
              >
                <span>Update</span>
              </Button>
            </DialogFooter>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default UpdateModal;
