/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { useAppSelector } from "../../../redux/features/hooks";
import { useGetAllSalesQuery } from "../../../redux/features/sales/salesApi";
import { selectCurrentUser } from "../../../redux/features/apiAuth/authSlice";

interface BrandData {
  brand: string;
  totalQuantity: number;
  totalSalesPrice: number;
}

const BarChartComponent = () => {
  const user = useAppSelector(selectCurrentUser);
  const userInfo = {
    email: user?.email,
    role: user?.role,
  };
  const { data: sales } = useGetAllSalesQuery({
    userInfo,
  });

  const brandDataMap: Map<string, BrandData> = new Map();

  // Calculate total quantity and total sales price for each brand
  sales?.data?.forEach((transaction: any) => {
    const brand = transaction.productId.brand;
    const quantity = transaction.quantity;
    const salesPrice = transaction.productId.productPrice * quantity;

    if (!brandDataMap.has(brand)) {
      brandDataMap.set(brand, {
        brand: brand,
        totalQuantity: quantity,
        totalSalesPrice: salesPrice,
      });
    } else {
      const existingBrandData = brandDataMap.get(brand)!;
      existingBrandData.totalQuantity += quantity;
      existingBrandData.totalSalesPrice += salesPrice;
      brandDataMap.set(brand, existingBrandData);
    }
  });

  const brandData: BrandData[] = Array.from(brandDataMap.values());

  const screenWidth = window.innerWidth;
  const chartWidth = screenWidth <= 768 ? 320 : 350;

  return (
    <div>
      <BarChart width={chartWidth} height={400} data={brandData} barSize={20}>
        <XAxis
          dataKey="brand"
          scale="point"
          padding={{ left: 18, right: 18 }}
          tick={{ fontSize: 14 }}
        />
        <YAxis tick={{ fontSize: 16 }} />
        <Tooltip
          wrapperStyle={{
            fontSize: "12px",
          }}
        />
        <Legend
          wrapperStyle={{
            fontSize: "12px",
          }}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar
          dataKey="totalSalesPrice"
          fill="#8884d8"
          background={{ fill: "#eee" }}
        />
        <Bar
          dataKey="totalQuantity"
          fill="green"
          background={{ fill: "#eee" }}
        />
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
