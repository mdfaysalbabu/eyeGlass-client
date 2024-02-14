import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Button,
  Tooltip,
  Spinner,
  CardFooter,
} from "@material-tailwind/react";

import { useState } from "react";
import ProductCard from "./ProductCard";
import {
  useDeleteManyEyeGlassMutation,
  useGetAllEyeGlassQuery,
} from "../redux/features/eyeGlassesApi/eyeGlassApi";
import Swal from "sweetalert2";
import { useAppSelector } from "../redux/features/hooks";
import { selectCurrentUser } from "../redux/features/apiAuth/authSlice";

const AllGlasses = () => {
  const [material, setMaterial] = useState("");
  const [shape, setShape] = useState("");
  const [lens, setLens] = useState("");
  const [brand, setBrand] = useState("");
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [productsId, setProductsId] = useState<string[]>([]);
  const [deletedAll] = useDeleteManyEyeGlassMutation();
  const [page, setPage] = useState(1);
  const user = useAppSelector(selectCurrentUser);
  const query = {
    material,
    shape,
    lens,
    brand,
    gender,
    color,
    minPrice,
    maxPrice,
    searchTerm,
    page,
    email: user?.email,
    role: user?.role,
    limit: 5,
  };
  const { data: eyeGlasses, isLoading } = useGetAllEyeGlassQuery(query);

  const handleCheckboxClick = (id: string) => {
    if (productsId) {
      const index = productsId.indexOf(id);

      if (index === -1) {
        setProductsId([...productsId, id]);
      } else {
        const newProductsId = [...productsId];
        newProductsId.splice(index, 1);
        setProductsId(newProductsId);
      }
    }
  };

  const handleDeleteMany = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deletedAll(productsId);
        Swal.fire({
          title: "Deleted!",
          text: "Glass has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const TABLE_HEAD = [
    <Tooltip content="Delete Glass">
      <Button
        placeholder={""}
        variant="gradient"
        color="red"
        className="py-2 px-3"
        onClick={handleDeleteMany}
        disabled={!productsId[0]}
      >
        Delete All
      </Button>
    </Tooltip>,
    "Product Name",
    "Price",
    "Quantity",
    "Brand",
    "Lens",
    "Material",
    "Edit & Duplicate",
    "Update",
    "Delete",
    "Sell",
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner color="blue" />
      </div>
    );
  }

  return (
    <Card placeholder="" className="bg-indigo-50 mx-auto h-full w-full">
      <CardHeader
        placeholder=""
        floated={false}
        shadow={false}
        className="rounded-xl bg-indigo-600 p-4 md:p-6 lg:p-8"
      >
        <div className="flex flex-wrap gap-4 mx-auto w-full">
          {/* Filter Select Inputs */}
          <div className="flex flex-wrap gap-4">
            {/* Material */}
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="block appearance-none bg-white border border-gray-200 hover:border-gray-500 px-2 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm "
            >
              <option value="" disabled selected>
                Filter by Material
              </option>
              <option value="Metal">Metal</option>
              <option value="Plastic">Plastic</option>
              <option value="Titanium">Titanium</option>
            </select>
            {/* Shape */}
            <select
              value={shape}
              onChange={(e) => setShape(e.target.value)}
              className="block appearance-none bg-white border border-gray-200 hover:border-gray-500 px-2 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm "
            >
              <option value="" disabled selected>
                Filter by Shape
              </option>
              <option value="Rectangular">Rectangular</option>
              <option value="Round">Round</option>
              <option value="Cat-eye">Cat-eye</option>
            </select>
            {/* Lens */}
            <select
              value={lens}
              onChange={(e) => setLens(e.target.value)}
              className="block appearance-none bg-white border border-gray-200 hover:border-gray-500 px-2 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm "
            >
              <option value="" disabled selected>
                Filter by Lens
              </option>
              <option value="Single-vision">Single-vision</option>
              <option value="Polarized">Polarized</option>
              <option value="UV Protection">UV Protection</option>
            </select>
            {/* Brand */}
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="block appearance-none bg-white border border-gray-200 hover:border-gray-500 px-2 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm "
            >
              <option value="" disabled selected>
                Filter by Brand
              </option>
              <option value="Lenskart">Lenskart</option>
              <option value="UrbanStyle">UrbanStyle</option>
              <option value="Gucci">Gucci</option>
            </select>
            {/* Gender */}
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="block appearance-none bg-white border border-gray-200 hover:border-gray-500 px-2 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm "
            >
              <option value="" disabled selected>
                Filter by Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {/* Color */}
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="block appearance-none bg-white border border-gray-200 hover:border-gray-500 px-2 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm "
            >
              <option value="" disabled selected>
                Filter by Color
              </option>
              <option value="Black">Black</option>
              <option value="Blue">Blue</option>
              <option value="Red">Red</option>
            </select>
          </div>
          {/* Price Range Inputs */}
          <div className="flex gap-2">
            <input
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              type="number"
              className="border border-gray-400 hover:border-gray-500 px-2 py-2 rounded focus:outline-none focus:shadow-outline w-20 text-sm"
              placeholder="Min"
            />
            <input
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              type="number"
              className="border border-gray-400 hover:border-gray-500 px-2 py-2 rounded focus:outline-none focus:shadow-outline w-20 text-sm"
              placeholder="Max"
            />
          </div>
          {/* Search Input */}
          <div className="w-full md:w-96 text-white">
            <Input
              className="text-white font-bold"
              crossOrigin={""}
              onChange={(e) => setSearchTerm(e.target.value)}
              label="Search Glass"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>

      <CardBody
        placeholder=""
        className="px-0 max-auto  table-auto text-left overflow-x-auto"
      >
        <table className="w-full ">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2"
                >
                  <Typography
                    placeholder=""
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
          <ProductCard
            eyeGlasses={eyeGlasses}
            handleCheckboxClick={handleCheckboxClick}
          />
        </table>
      </CardBody>

      <CardFooter
        placeholder=""
        className="flex items-center justify-between border-t border-blue-gray-50 p-4"
      >
        <Typography
          placeholder=""
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          {`Page ${page}`}
        </Typography>
        <div className="flex gap-2">
          <Button
            placeholder=""
            onClick={() => setPage(page - 1)}
            variant="outlined"
            size="sm"
          >
            Previous
          </Button>
          <Button
            placeholder=""
            onClick={() => setPage(page + 1)}
            variant="outlined"
            size="sm"
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AllGlasses;
