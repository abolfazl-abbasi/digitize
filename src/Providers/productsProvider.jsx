import React, { useContext, createContext, useState } from "react";
import { startTransition } from "react";
import Products from "../data/products";

export const ProductsContext = createContext();
export const ProductsContextProvider = createContext();
export const ProductsShowContext = createContext();
export const ProductsShowContextProvider = createContext();
export const FavoritesContext = createContext();
export const FavoritesContextProvider = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([...Products]);
  const [productsShow, setProductsShow] = useState([...products]);
  const [favorites, setFavorites] = useState([]);

  return (
    <>
      <ProductsContext.Provider value={products}>
        <ProductsContextProvider.Provider value={setProducts}>
          <ProductsShowContext.Provider value={productsShow}>
            <ProductsShowContextProvider.Provider value={setProductsShow}>
              <FavoritesContext.Provider value={favorites}>
                <FavoritesContextProvider.Provider value={setFavorites}>
                  {children}
                </FavoritesContextProvider.Provider>
              </FavoritesContext.Provider>
            </ProductsShowContextProvider.Provider>
          </ProductsShowContext.Provider>
        </ProductsContextProvider.Provider>
      </ProductsContext.Provider>
    </>
  );
};

export const useProducts = () => useContext(ProductsContext);
export const useProductsShow = () => useContext(ProductsShowContext);
export const useFavorites = () => useContext(FavoritesContext);

export const useProductsDispatcher = () => {
  //? Providers \\
  const products = useProducts();
  const favorites = useFavorites();
  const setProducts = useContext(ProductsContextProvider);
  const setProductsShow = useContext(ProductsShowContextProvider);
  const setFavorites = useContext(FavoritesContextProvider);

  //? Handlers \\
  const handleLike = (product) => {
    const updateProducts = [...products];
    const index = updateProducts.findIndex((pro) => pro.id === product.id);
    updateProducts[index] = { ...product };
    updateProducts[index].liked = !updateProducts[index].liked;
    if (!product.liked) {
      setFavorites([...favorites, { ...product, liked: true }]);
    } else {
      setFavorites(favorites.filter((pro) => pro.id !== product.id));
      updateProducts[index].liked = false;
      setProducts([...updateProducts]);
      setProductsShow([...updateProducts]);
      console.log(updateProducts);
    }
    setProducts([...updateProducts]);
    setProductsShow([...updateProducts]);
  };

  const handleSetColor = (e, product) => {
    const updateProducts = [...products];
    const index = products.indexOf(product);
    updateProducts[index] = { ...product };
    updateProducts[index].activeColor = e;
    startTransition(() => {
      setProducts([...updateProducts]);
      setProductsShow([...updateProducts]);
    });
  };
  //! Handlers \\

  //? returned handlers for use \\
  return {
    setProducts,
    setProductsShow,
    handleLike,
    handleSetColor,
  };
};

export default ProductsProvider;
