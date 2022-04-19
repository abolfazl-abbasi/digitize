import { HiCheck } from "react-icons/hi";
import { useProductsDispatcher } from "../Providers/productsProvider";

const SelectColor = ({ product }) => {
  const { handleSetColor } = useProductsDispatcher();
  // const products = useProducts();
  return (
    <>
      <div className="flex items-center">
        {product.color.map((proColor) => {
          return (
            <div
              key={proColor + Math.random()}
              onClick={(e) => handleSetColor(proColor, product)}
              className={`-mr-1 h-4 w-4 sm:h-5 sm:w-5 bg-${proColor} flex items-center justify-center rounded-full  ${
                product.activeColor === `${proColor}`
                  ? `ring-2 ring-${proColor} ring-offset-2`
                  : ""
              }`}
            >
              <HiCheck
                className={`h-3 w-3 text-white ${
                  product.activeColor === `${proColor}` ? "block" : "hidden"
                }`}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SelectColor;
