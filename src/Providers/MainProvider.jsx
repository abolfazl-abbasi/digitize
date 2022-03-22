import React from "react";
import CartProvider from "./CartProvider";
import ProductsProvider from "./productsProvider";
import SortAndGroupingProvider from "./Sort&Grouping";

const MainProvider = ({ children }) => {
  return (
    <>
      <ProductsProvider>
        <SortAndGroupingProvider>
          <CartProvider>{children}</CartProvider>
        </SortAndGroupingProvider>
      </ProductsProvider>
    </>
  );
};

export default MainProvider;
