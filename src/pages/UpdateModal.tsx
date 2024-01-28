import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { toast } from "sonner";
import { useGetAllEyeGlassQuery, useUpdateEyeGlassMutation } from "../redux/features/eyeGlassesApi/eyeGlassApi";
const image_upload_token = import.meta.env.VITE_image_upload_token;

const UpdateModal = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const { data: glassData } = useGetAllEyeGlassQuery(id);
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
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader placeholder={""}>Update Glass</DialogHeader>
            <DialogBody placeholder={""}>
              <input
                {...register("productName")}
                type="text"
                placeholder="productName"
                defaultValue={glassData?.data?.productName}
              />
              <input
                {...register("productPrice")}
                type="number"
                placeholder="productPrice"
                defaultValue={glassData?.data?.productPrice}
              />
              <input
                {...register("productQuantity")}
                type="number"
                placeholder="productQuantity"
                defaultValue={glassData?.data?.productQuantity}
              />
              <input
                {...register("frameMaterial")}
                type="text"
                placeholder="frameMaterial"
                defaultValue={glassData?.data?.frameMaterial}
              />
              <input
                {...register("frameShape")}
                type="text"
                placeholder="frameShape"
                defaultValue={glassData?.data?.frameShape}
              />
              <input
                {...register("lensType")}
                type="text"
                placeholder="lensType"
                defaultValue={glassData?.data?.lensType}
              />
              <input
                {...register("brand")}
                type="text"
                placeholder="brand"
                defaultValue={glassData?.data?.brand}
              />
              <select
                defaultValue={glassData?.data?.gender}
                {...register("gender")}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                {...register("color")}
                type="text"
                placeholder="color"
                defaultValue={glassData?.data?.color}
              />
              <input
                type="file"
                {...register("productImage")}
                // defaultValue={glassData?.data?.productImage}
              />
            </DialogBody>
            <DialogFooter placeholder={""}>
              <Button
                type="submit"
                placeholder={""}
                variant="gradient"
                color="green"
              >
                <span>Update Glass</span>
              </Button>
            </DialogFooter>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default UpdateModal;