import React from "react";

interface Product {
  id: number;
  name: string;
  price: string;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">
              ID
            </th>
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">
              Price
            </th>
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-gray-300">
              <td className="px-4 py-2 text-left text-sm text-gray-700">
                {product.id}
              </td>
              <td className="px-4 py-2 text-left text-sm text-gray-700">
                {product.name}
              </td>
              <td className="px-4 py-2 text-left text-sm text-gray-700">
                {product.price}
              </td>
              <td className="px-4 py-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mr-2">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
