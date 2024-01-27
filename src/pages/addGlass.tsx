import { FieldValues, useForm } from "react-hook-form";

import { toast } from "sonner";
import { useAddEyeGlassMutation } from "../redux/features/eyeGlassesApi/eyeGlassApi";
const image_upload_token = import.meta.env.VITE_image_upload_token;

const AddGlass = () => {
  const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_upload_token}`;

  const { register, handleSubmit } = useForm();
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
            console.log({ glassData });
            toast.success("Product added successfully!", {
              id: toastId,
              duration: 2000,
            });
          }
        });
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-700 to-purple-400 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Add New Glass
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          <input
            {...register("productName")}
            type="text"
            placeholder="Product Name"
            className="input-field p-1"
          />
          <input
            {...register("productPrice")}
            type="number"
            placeholder="Product Price"
            className="input-field p-1"
          />
          <input
            {...register("productQuantity")}
            type="number"
            placeholder="Product Quantity"
            className="input-field p-1"
          />
          <input
            {...register("frameMaterial")}
            type="text"
            placeholder="Frame Material"
            className="input-field p-1"
          />
          <input
            {...register("frameShape")}
            type="text"
            placeholder="Frame Shape"
            className="input-field p-1"
          />
          <input
            {...register("lensType")}
            type="text"
            placeholder="Lens Type"
            className="input-field p-1"
          />
          <input
            {...register("brand")}
            type="text"
            placeholder="Brand"
            className="input-field p-1"
          />
          <input
            {...register("gender")}
            type="text"
            placeholder="Gender"
            className="input-field p-1"
          />
          <input
            {...register("color")}
            type="text"
            placeholder="Color"
            className="input-field p-1"
          />
          <input
            type="file"
            {...register("productImage")}
            className="input-field p-1"
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-white py-3 px-6 rounded-lg font-semibold transition duration-300 col-span-2"
          >
            Add Glass
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGlass;
