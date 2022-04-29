import React from "react";
import CartProvider from "./CartProvider";
import CheckoutProvider from "./CheckoutProvider";
import ProductsProvider from "./productsProvider";
import SignProvider from "./SignProvider";
import SortAndGroupingProvider from "./Sort&Grouping";

const MainProvider = ({ children }) => {
  return (
    <>
      <SignProvider>
        <ProductsProvider>
          <CartProvider>
            <SortAndGroupingProvider>
              <CheckoutProvider>{children}</CheckoutProvider>
            </SortAndGroupingProvider>
          </CartProvider>
        </ProductsProvider>
      </SignProvider>
    </>
  );
};

export default MainProvider;
