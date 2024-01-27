import React from "react";

interface ProductFormProps {
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-md w-80 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Product</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 px-3 py-2 focus:outline-none transition-colors duration-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Price
            </label>
            <input
              type="text"
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 px-3 py-2 focus:outline-none transition-colors duration-300"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
