import { FieldValues, useForm } from "react-hook-form";

import { toast } from "sonner";
import { Button, Input } from "@material-tailwind/react";
import { useAddEyeGlassMutation } from "../redux/features/eyeGlassesApi/eyeGlassApi";
const image_upload_token = import.meta.env.VITE_image_upload_token;

const AddGlass = () => {
  const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_upload_token}`;

  const { register, handleSubmit, reset } = useForm();
  const [addGlass] = useAddEyeGlassMutation();

  const onSubmit = (data: FieldValues) => {
    const toastId = toast.loading("Please wait...");
    try {
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

            const glassData = {
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
            await addGlass(glassData);
            toast.success("Product added successfully!", {
              id: toastId,
              duration: 2000,
            });
            reset();
          }
        });
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className=" mx-auto bg-deep-purple-50 md:p-12   ">
      <h1 className="text-indigo-800 text-3xl p-3">Add EyeGlass</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 my-3 ">
          <div>
            <Input
              className="shadow-md p-5 drop-shadow-lg outline-none "
              {...register("productName")}
              type="text"
              crossOrigin={""}
              placeholder=""
              color="green"
              label="Product Name"
            />
          </div>
          <div>
            <Input
              className="shadow-md p-5 drop-shadow-lg outline-none "
              {...register("productPrice")}
              type="number"
              crossOrigin={""}
              placeholder=""
              color="green"
              label="Product Price"
            />
          </div>
          <div>
            <Input
              className="shadow-md p-5 drop-shadow-lg outline-none"
              {...register("productQuantity")}
              type="number"
              crossOrigin={""}
              placeholder=""
              color="green"
              label="Product Quantity"
            />
          </div>
          <div>
            <Input
              className="shadow-md p-5 drop-shadow-lg outline-none"
              {...register("frameMaterial")}
              type="text"
              crossOrigin={""}
              placeholder=""
              color="green"
              label="Frame Material"
            />
          </div>
          <div>
            <Input
              className="shadow-md p-5 drop-shadow-lg outline-none"
              {...register("frameShape")}
              type="text"
              crossOrigin={""}
              placeholder=""
              color="green"
              label="Frame Shape"
            />
          </div>
          <div>
            <Input
              className="shadow-md p-5 drop-shadow-lg outline-none"
              {...register("lensType")}
              type="text"
              crossOrigin={""}
              placeholder=""
              color="green"
              label="Lens Type"
            />
          </div>
          <div>
            <Input
              className="shadow-md p-5 drop-shadow-lg outline-none"
              {...register("brand")}
              type="text"
              crossOrigin={""}
              placeholder=""
              color="green"
              label="Brand"
            />
          </div>
          <div>
            <Input
              className="shadow-md p-5 drop-shadow-lg outline-none"
              {...register("color")}
              type="text"
              crossOrigin={""}
              placeholder=""
              color="green"
              label="Color"
            />
          </div>
          <div>
            <select
              className="w-full py-2 rounded-lg border border-purple-50 text-sm text-gray-500 shadow-md p-5 drop-shadow-lg outline-none"
              {...register("gender")}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <Input
              className="shadow-lg p-8 drop-shadow-lg outline-none"
              {...register("productImage")}
              type="file"
              crossOrigin={""}
              placeholder=""
              color="green"
              label="Product Image"
            />
          </div>
        </div>
        <div className="flex float-end ">
          <Button
            className="shadow-xl rounded-lg"
            type="submit"
            variant="gradient"
            size="md"
            color="green"
            placeholder={""}
          >
            Add Eye Glass
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddGlass;
