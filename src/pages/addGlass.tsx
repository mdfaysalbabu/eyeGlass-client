import { FieldValues, useForm } from "react-hook-form";

import { toast } from "sonner";
import { Button, Input } from "@material-tailwind/react";
import { useAddEyeGlassMutation } from "../redux/features/eyeGlassesApi/eyeGlassApi";
import { useAppSelector } from "../redux/features/hooks";
import { selectCurrentUser } from "../redux/features/apiAuth/authSlice";
const image_upload_token = import.meta.env.VITE_image_upload_token;

const AddGlass = () => {
  const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_upload_token}`;

  const { register, handleSubmit, reset } = useForm();
  const [addGlass] = useAddEyeGlassMutation();
  const user = useAppSelector(selectCurrentUser);

  const onSubmit = (data: FieldValues) => {
    const toastId = toast.loading("Please wait");
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
              userEmail: user?.email,
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
    <div className="mx-auto bg-white md:p-12 p-6 rounded-lg shadow-xl">
      <h1 className="text-indigo-800 text-3xl mb-6">Add EyeGlass</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <Input
            className="input"
            {...register("productName")}
            type="text"
            crossOrigin={""}
            placeholder=""
            color="indigo"
            label="Product Name"
          />
        </div>
        <div>
          <Input
            className="input"
            {...register("productPrice")}
            type="number"
            crossOrigin={""}
            placeholder=""
            color="indigo"
            label="Product Price"
          />
        </div>
        <div>
          <Input
            className="input"
            {...register("productQuantity")}
            type="number"
            crossOrigin={""}
            placeholder=""
            color="indigo"
            label="Product Quantity"
          />
        </div>
        <div>
          <Input
            className="input"
            {...register("frameMaterial")}
            type="text"
            crossOrigin={""}
            placeholder=""
            color="indigo"
            label="Frame Material"
          />
        </div>
        <div>
          <Input
            className="input"
            {...register("frameShape")}
            type="text"
            crossOrigin={""}
            placeholder=""
            color="indigo"
            label="Frame Shape"
          />
        </div>
        <div>
          <Input
            className="input"
            {...register("lensType")}
            type="text"
            crossOrigin={""}
            placeholder=""
            color="indigo"
            label="Lens Type"
          />
        </div>
        <div>
          <Input
            className="input"
            {...register("brand")}
            type="text"
            crossOrigin={""}
            placeholder=""
            color="indigo"
            label="Brand"
          />
        </div>
        <div>
          <Input
            className="input"
            {...register("color")}
            type="text"
            crossOrigin={""}
            placeholder=""
            color="indigo"
            label="Color"
          />
        </div>
        <div>
          <select className="input" {...register("gender")}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <Input
            className="input"
            {...register("productImage")}
            type="file"
            crossOrigin={""}
            placeholder=""
            color="indigo"
            label="Product Image"
          />
        </div>
        <div className="flex justify-end">
          <Button
            className="shadow-xl rounded-lg "
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
