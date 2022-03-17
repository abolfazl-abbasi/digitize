import { HiCheck } from "react-icons/hi";

const SelectColor = ({ product, onSetColor }) => {
  return (
    <>
      <div className="flex items-center">
        {product.color.map((proColor) => {
          return (
            <div
              key={proColor + Math.random() * 100}
              onClick={(e) => onSetColor(e, product)}
              name={`${proColor}`}
              className={`w-4 h-4 sm:w-5 sm:h-5 -mr-1 bg-${proColor} rounded-full flex items-center justify-center  ${
                product.activeColor === `${proColor}` &&
                `ring-2 ring-${proColor} ring-offset-2 `
              }`}
            >
              <HiCheck
                className={`h-3 w-3 text-white ${
                  product.activeColor === `${proColor}` && "block"
                } ${product.activeColor !== `${proColor}` && "hidden"}`}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SelectColor;
