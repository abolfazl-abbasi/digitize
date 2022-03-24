/* eslint-disable no-const-assign */
import { wordsToNumber } from "@persian-tools/persian-tools";
import _ from "lodash";
import React, { useState, createContext, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import Products from "../data/products";
import {
  ProductsShowContextProvider,
  useProducts,
  useProductsDispatcher,
  // useProductsDispatcher,
  useProductsShow,
} from "./productsProvider";

export const GroupingContext = createContext();
export const GroupingContextProvider = createContext();
export const SortContext = createContext();
export const SortContextProvider = createContext();
export const PriceRangeContext = createContext();
export const PriceRangeContextProvider = createContext();
export const FilterBrandContext = createContext();
export const FilterBrandContextProvider = createContext();
export const FilterColorContext = createContext();
export const FilterColorContextProvider = createContext();

const SortAndGroupingProvider = ({ children }) => {
  const [sort, setSort] = useState([]);
  const [grouping, setGrouping] = useState("");
  const [priceRange, setPriceRange] = useState();
  const [filterBrand, setFilterBrand] = useState([]);
  const [filterColor, setFilterColor] = useState([]);

  return (
    <>
      <GroupingContext.Provider value={grouping}>
        <GroupingContextProvider.Provider value={setGrouping}>
          <SortContext.Provider value={sort}>
            <SortContextProvider.Provider value={setSort}>
              <PriceRangeContext.Provider value={priceRange}>
                <PriceRangeContextProvider.Provider value={setPriceRange}>
                  <FilterBrandContext.Provider value={filterBrand}>
                    <FilterBrandContextProvider.Provider value={setFilterBrand}>
                      <FilterColorContext.Provider value={filterColor}>
                        <FilterColorContextProvider.Provider
                          value={setFilterColor}
                        >
                          {children}
                        </FilterColorContextProvider.Provider>
                      </FilterColorContext.Provider>
                    </FilterBrandContextProvider.Provider>
                  </FilterBrandContext.Provider>
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
export const useFilterBrand = () => useContext(FilterBrandContext);
export const useFilterColor = () => useContext(FilterColorContext);

export const useSaGDispatcher = () => {
  //? React Router DOM \\
  const loc = useLocation();
  const his = useHistory();

  //? important \\
  const products = useProducts();
  const { setProducts } = useProductsDispatcher();

  //? providers \\
  const grouping = useGrouping();
  const sort = useSort();
  const priceRange = usePriceRange();
  const productsShow = useProductsShow();
  // const filterBrand = useFilterBrand();
  const filterColor = useFilterColor();
  const setGrouping = useContext(GroupingContextProvider);
  const setSort = useContext(SortContextProvider);
  const setPriceRange = useContext(PriceRangeContextProvider);
  const setProductsShow = useContext(ProductsShowContextProvider);
  const setFilterBrand = useContext(FilterBrandContextProvider);
  const setFilterColor = useContext(FilterColorContextProvider);

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
    setProductsShow(_.filter(products, ["category", name]));
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
        setProducts(_.orderBy(products, [name[0]], [name[1]]));
      }
    }
  };

  const handlePriceRange = async (e) => {
    const price = e.target.value || priceRange;
    await setPriceRange(wordsToNumber(price));
    if (price === null || e) {
      await setProductsShow(
        products.filter((pro) => pro.price < Number(price))
      );
      if (grouping !== "") {
        setTimeout(() => {
          console.log(_.filter(productsShow, ["category", grouping]), grouping);
          setProductsShow(_.filter(productsShow, ["category", grouping]));
        });
      }
    }
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

  const handleFilterBrand = (e, brand) => {
    var name = [];
    if (e) {
      setFilterBrand([...filterColor, brand]);
      name = [...filterColor, brand];
    }

    if (brand !== Array) {
      if (!e) {
        setFilterBrand(filterColor.filter((filBrand) => filBrand !== brand));
        name = filterColor.filter((filBrand) => filBrand !== brand);
      }

      console.log(name.length);

      if (name.length !== 0) {
        setProductsShow([]);

        let arrays = name.map((brand) =>
          productsShow.filter(
            (pro) => pro.brandEn.toLowerCase() === brand.toLowerCase()
          )
        );
        setProductsShow([].concat.apply([], arrays));
      }
    }

    if (name.length === 0) {
      setProductsShow([...products]);
      setGrouping("");
    }
  };

  const handleFilterColor = (e, color) => {
    var name = [];
    if (e) {
      setFilterColor([...filterColor, color]);
      name = [...filterColor, color];
    }

    if (!e) {
      setFilterColor(filterColor.filter((filColor) => filColor !== color));
      name = filterColor.filter((filColor) => filColor !== color);
    }

    if (name.length !== 0) {
      setProductsShow([]);

      let arrays = name.map((color) =>
        productsShow.filter((pro) => pro.color.indexOf(color) !== -1)
      );

      setProductsShow([].concat.apply([], arrays));
    }

    if (name.length === 0) {
      setProductsShow([...products]);
      setGrouping("");
    }
  };

  const handleCancelAllFilters = () => {
    setSort([]);
    setGrouping("");
    setPriceRange();
    setFilterBrand([]);
    setFilterColor([]);
    setProductsShow([...products]);
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
    handleFilterBrand,
    handleFilterColor,
    handleCancelAllFilters,
  };
};

export default SortAndGroupingProvider;
