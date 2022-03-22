import _ from "lodash";
import React, { useState, createContext, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  ProductsShowContextProvider,
  useProducts,
  // useProductsDispatcher,
  useProductsShow,
} from "./productsProvider";

export const GroupingContext = createContext();
export const GroupingContextProvider = createContext();
export const SortContext = createContext();
export const SortContextProvider = createContext();
export const PriceRangeContext = createContext();
export const PriceRangeContextProvider = createContext();

const SortAndGroupingProvider = ({ children }) => {
  const [sort, setSort] = useState([]);
  const [grouping, setGrouping] = useState("");
  const [priceRange, setPriceRange] = useState();

  return (
    <>
      <GroupingContext.Provider value={grouping}>
        <GroupingContextProvider.Provider value={setGrouping}>
          <SortContext.Provider value={sort}>
            <SortContextProvider.Provider value={setSort}>
              <PriceRangeContext.Provider value={priceRange}>
                <PriceRangeContextProvider.Provider value={setPriceRange}>
                  {children}
                </PriceRangeContextProvider.Provider>
              </PriceRangeContext.Provider>
            </SortContextProvider.Provider>
          </SortContext.Provider>
        </GroupingContextProvider.Provider>
      </GroupingContext.Provider>
    </>
  );
};

export const useGrouping = () => useContext(GroupingContext);
export const useSort = () => useContext(SortContext);
export const usePriceRange = () => useContext(PriceRangeContext);

export const useSaGDispatcher = () => {
  //? React Router DOM \\
  const loc = useLocation();
  const his = useHistory();

  //? important \\
  const products = useProducts();
  // const { setProducts } = useProductsDispatcher();

  //? providers \\
  const grouping = useGrouping();
  const sort = useSort();
  const priceRange = usePriceRange();
  const productsShow = useProductsShow();
  const setGrouping = useContext(GroupingContextProvider);
  const setSort = useContext(SortContextProvider);
  const setPriceRange = useContext(PriceRangeContextProvider);
  const setProductsShow = useContext(ProductsShowContextProvider);

  // useEffect(() => {
  //   handleSort(sort);
  //   handleGrouping(grouping);
  // }, [grouping, handleGrouping, handleSort, priceRange, sort]);

  //? handlers \\
  const handleGrouping = (e) => {
    const name = e || grouping;
    setGrouping(name);
    if (loc.pathname.includes("/products/")) {
      his.push("/");
    }
    setProductsShow(products.filter((pro) => pro.category === name));
    setPriceRange(0);
    setSort([]);
  };

  const handleSort = (e) => {
    const name = e || sort;
    setSort(name);
    if (sort === [] || e) {
      if (loc.pathname.includes("/products/")) {
        his.push("/");
      }
      if (name !== "") {
        setProductsShow(_.orderBy(productsShow, [name[0]], [name[1]]));
      }
    }
  };

  const handlePriceRange = (e) => {
    const price = e.target.value || priceRange;
    setPriceRange(price);
    if (price === null || e) {
      setProductsShow(products.filter((pro) => pro.price <= price));
    }
    setTimeout(() => {
      handleSort(sort);
    }, 1);
  };

  const handleSearch = (e) => {
    setProductsShow(
      productsShow.filter((pro) =>
        (pro.titleFa + pro.titleEn)
          .toLowerCase()
          .includes(e.target.value.toLowerCase().trim())
      )
    );
  };
  //! Handlers \\

  //? returned handlers for use \\
  return {
    grouping,
    sort,
    priceRange,
    setGrouping,
    setSort,
    setPriceRange,
    handleSearch,
    handleGrouping,
    handleSort,
    handlePriceRange,
  };
};

export default SortAndGroupingProvider;
