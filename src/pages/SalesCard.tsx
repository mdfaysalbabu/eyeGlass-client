import { Typography } from "@material-tailwind/react";
import fallbackImage from "../assets/no-image.png";
import DownloadPDF from "./PdfModal";

type TSales = {
  _id: string;
  quantity: number;
  buyerName: string;
  productId: {
    productName: string;
    productPrice: number;
    productQuantity: number;
    productImage: string;
    lensType: string;
    frameMaterial: string;
    color: string;
    brand: string;
  };
};
type TProps = {
  sales: {
    data: TSales[];
  };
};

const SalesCard = ({ sales }: TProps) => {
  return (
    <tbody>
      {sales?.data?.map(
        ({ _id, quantity, buyerName, productId }: TSales, index: number) => {
          const isLast = index === sales?.data?.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

          return (
            <tr key={_id}>
              <td className={classes}>
                <div className="flex items-center gap-3">
                  <img
                    className="h-8 w-12 rounded-lg object-cover object-center"
                    src={
                      productId?.productImage
                        ? productId?.productImage
                        : fallbackImage
                    }
                    alt={"Product Image"}
                  />
                  <div className="flex flex-col">
                    <Typography
                      placeholder=" "
                      color="blue-gray"
                      className="font-normal text-[12px]"
                    >
                      {productId?.productName || "Sold Out"}
                    </Typography>
                  </div>
                </div>
              </td>
              <td className={classes}>
                <div className="flex flex-col">
                  <Typography
                    placeholder=" "
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {buyerName || "Not Found"}
                  </Typography>
                </div>
              </td>
              <td className={classes}>
                <Typography
                  placeholder=" "
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {productId?.productPrice || "Not Found"}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  placeholder=" "
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {productId?.brand || "Not Found"}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  placeholder=" "
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {productId?.lensType || "Not Found"}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  placeholder=" "
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {productId?.color || "Not Found"}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  placeholder=" "
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {quantity || "Not Found"}
                </Typography>
              </td>
              <td className={classes}>
                <DownloadPDF id={_id} />
              </td>
            </tr>
          );
        }
      )}
    </tbody>
  );
};

export default SalesCard;
