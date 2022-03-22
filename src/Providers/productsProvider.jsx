import React, { useContext, createContext, useState } from "react";
import Products from "../data/products";

export const ProductsContext = createContext();
export const ProductsContextProvider = createContext();
export const ProductsShowContext = createContext();
export const ProductsShowContextProvider = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([...Products]);
  const [productsShow, setProductsShow] = useState([...products]);

  return (
    <>
      <ProductsContext.Provider value={products}>
        <ProductsContextProvider.Provider value={setProducts}>
          <ProductsShowContext.Provider value={productsShow}>
            <ProductsShowContextProvider.Provider value={setProductsShow}>
              {children}
            </ProductsShowContextProvider.Provider>
          </ProductsShowContext.Provider>
        </ProductsContextProvider.Provider>
      </ProductsContext.Provider>
    </>
  );
};

export const useProducts = () => useContext(ProductsContext);
export const useProductsShow = () => useContext(ProductsShowContext);

export const useProductsDispatcher = () => {
  //? Providers \\
  const products = useProducts();
  const setProducts = useContext(ProductsContextProvider);

  //? Handlers \\
  const handleLike = (product) => {
    const updateProducts = [...products];
    const index = products.indexOf(product);
    updateProducts[index] = { ...product };
    updateProducts[index].liked = !updateProducts[index].liked;
    setProducts(updateProducts);
  };

  const handleSetColor = (e, product) => {
    const name = e.target.attributes.name.value;
    const updateProducts = [...products];
    const index = products.indexOf(product);
    updateProducts[index] = { ...product };
    updateProducts[index].activeColor = name;
    setProducts([...updateProducts]);
  };
  //! Handlers \\

  //? returned handlers for use \\
  return {
    setProducts,
    handleLike,
    handleSetColor,
  };
};

export default ProductsProvider;
