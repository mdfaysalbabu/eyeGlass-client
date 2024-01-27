/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { BuyerSidebar, SellerSidebar } from "./Sidebar";

const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
];

const Dashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const handleDuplicateEdit = (product: any) => {
    setSelectedProduct(product);
    // Redirect or show form for editing
    // You can implement this part according to your routing or modal logic
  };
  return (
    <div>
      <div className="flex">
        {/* Seller Sidebar */}
        <SellerSidebar />
        {/* Main Content */}
        <div className="w-4/5 p-4">
          <h2 className="text-lg font-semibold mb-4">Product List</h2>
          <ul>
            {products.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between border-b border-gray-200 py-2"
              >
                <span>{product.name}</span>
                <span>${product.price}</span>
                <button
                  onClick={() => handleDuplicateEdit(product)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Duplicate & Edit
                </button>
              </li>
            ))}
          </ul>
          {selectedProduct && (
            <div>
              <h2 className="text-lg font-semibold mt-8 mb-4">Edit Product</h2>
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={selectedProduct.name}
                    className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    defaultValue={selectedProduct.price}
                    className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {/* Add more fields as needed */}
                <div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        {/* Buyer Sidebar */}
        <BuyerSidebar />
      </div>
    </div>
  );
};

export default Dashboard;
