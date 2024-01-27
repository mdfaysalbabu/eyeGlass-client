import { useState } from "react";
import { useGetAllEyeGlassQuery } from "../../redux/features/eyeGlassesApi/eyeGlassApi";
import Sidebar from "./Sidebar";
import ProductList from "./ProductList";
import ProductForm from "./Form";

const MainLayout = () => {
  //   const { data } = useGetAllEyeGlassQuery(undefined);
  const [showProductForm, setShowProductForm] = useState(false);

  const handleCreateVariantClick = () => {
    setShowProductForm(true);
  };

  const handleProductFormClose = () => {
    setShowProductForm(false);
  };
  return (
    <div>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-5">
          <h1 className="text-2xl font-bold mb-5">Product List</h1>
          <div className="flex justify-between items-center mb-5">
            <button
              onClick={handleCreateVariantClick}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md"
            >
              Duplicate & Edit
            </button>
            {/* Other relevant features can be added here */}
          </div>
          <ProductList />
        </div>
        {showProductForm && <ProductForm onClose={handleProductFormClose} />}
      </div>
    </div>
  );
};

export default MainLayout;
