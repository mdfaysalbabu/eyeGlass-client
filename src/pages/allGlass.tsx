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
    const res = await deletedAll(productsId);
    console.log(res);
  };

  const TABLE_HEAD = [
    <Tooltip content="Delete Glass">
      <Button
        placeholder={""}
        variant="gradient"
        color="red"
        className="py-2 px-3"
        onClick={handleDeleteMany}
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
    <Card placeholder={""} className="bg-blue-gray-500 mx-auto">
      <CardHeader
        placeholder={""}
        floated={false}
        shadow={false}
        className="rounded-xl bg-blue-100 p-1 "
      >
        <div className="mb-6 mt-4 flex justify-start items-start gap-4 mx-auto w-full ">
          <div>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="block appearance-none w-36 bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm "
            >
              <option value="" disabled>
                Filter by Material
              </option>
              <option value="Metal">Metal</option>
              <option value="Plastic">Plastic</option>
              <option value="Acetate">Acetate</option>
            </select>
          </div>
          <div>
            <select
              value={shape}
              onChange={(e) => setShape(e.target.value)}
              className="block appearance-none w-36 bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm "
            >
              <option value="" disabled>
                Filter by Shape
              </option>
              <option value="Rectangular">Rectangular</option>
              <option value="Round">Round</option>
              <option value="Cat-eye">Cat-eye</option>
            </select>
          </div>
          <div>
            <select
              value={lens}
              onChange={(e) => setLens(e.target.value)}
              className="block appearance-none w-36 bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm "
            >
              <option value="" disabled>
                Filter by Lens
              </option>
              <option value="Single-vision">Single-vision</option>
              <option value="Bifocal">Bifocal</option>
              <option value="Progressive">Progressive</option>
            </select>
          </div>
          <div>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="block appearance-none w-36 bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm "
            >
              <option value="" disabled>
                Filter by Brand
              </option>
              <option value="Lenskart">Lenskart</option>
              <option value="Prada">Prada</option>
              <option value="Gucci">Gucci</option>
            </select>
          </div>
          <div>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="block appearance-none w-36 bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm "
            >
              <option value="" disabled>
                Filter by Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="block appearance-none w-36 bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm "
            >
              <option value="" disabled>
                Filter by Color
              </option>
              <option value="Black">Black</option>
              <option value="Blue">Blue</option>
              <option value="Red">Red</option>
            </select>
          </div>
          <div className="flex gap-2">
            <input
              onBlur={(e) => setMinPrice(e.target.value)}
              type="number"
              className="border border-gray-400 hover:border-gray-500 px-2 py-2 rounded focus:outline-none focus:shadow-outline w-20 text-sm"
              placeholder="Min"
            />
            <input
              onBlur={(e) => setMaxPrice(e.target.value)}
              type="number"
              className="border border-gray-400 hover:border-gray-500 px-2 py-2 rounded focus:outline-none focus:shadow-outline w-20 text-sm"
              placeholder="Max"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row ">
          <div>
            <Typography placeholder={""} variant="h4" color="teal">
              All Glasses
            </Typography>
          </div>
          <div className="w-full md:w-96">
            <Input
              crossOrigin={""}
              onChange={(e) => setSearchTerm(e.target.value)}
              label="Search Glass"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody placeholder={""} className=" px-0 max-auto table-auto text-left">
        <table className="mt-4 w-full ">
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
          <ProductCard
            eyeGlasses={eyeGlasses}
            handleCheckboxClick={handleCheckboxClick}
          />
        </table>
      </CardBody>
      <CardFooter
        placeholder={""}
        className="flex items-center justify-between border-t border-blue-gray-50 p-4"
      >
        <Typography
          placeholder={""}
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button placeholder={""} variant="outlined" size="sm">
            Previous
          </Button>
          <Button placeholder={""} variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AllGlasses;
