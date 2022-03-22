import {
  HiOutlineSortDescending,
  HiOutlineDeviceMobile,
  HiOutlineDesktopComputer,
  HiChevronDown,
  HiOutlineHome,
  HiOutlineColorSwatch,
  HiOutlineCreditCard,
  HiOutlineRewind,
  HiOutlineArrowSmLeft,
  HiOutlineArrowSmRight,
  HiOutlineFilter,
  HiOutlineHeart,
  HiHeart,
  HiShoppingCart,
  HiHome,
  HiOutlineViewGrid,
  HiOutlineShoppingCart,
  HiViewGrid,
} from "react-icons/hi";
import React from "react";
import "./../App/App.css";
import { digitsEnToAr, addCommas } from "@persian-tools/persian-tools";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SelectColor from "../components/SelectColor";
import Layout from "../Layouts/MainLayout";
import {
  // useProducts,
  useProductsDispatcher,
  useProductsShow,
} from "../Providers/productsProvider";

import {
  useGrouping,
  usePriceRange,
  useSaGDispatcher,
  useSort,
} from "./../Providers/Sort&Grouping";
import { useCart } from "../Providers/CartProvider";
import Products from "../data/products";
import _ from "lodash";

function ShopPage() {
  //? Providers \\
  // const products = useProducts();
  const grouping = useGrouping();
  const sort = useSort();
  const priceRange = usePriceRange();
  const productsShow = useProductsShow();
  const cart = useCart();
  // const { handleAddToCart_FC } = useCartDispatcher();

  //? Dispatchers \\
  const { handleLike, handleSetColor } = useProductsDispatcher();
  const { handleGrouping, handlePriceRange, handleSearch, handleSort } =
    useSaGDispatcher();

  // useEffect(() => {
  //   handleGrouping();
  //   // handlePriceRange();
  //   handleSort();
  // }, []);

  //? React Router DOM \\
  const loc = useLocation();

  //? Local Handlers \\
  const handleAccr = (e) => {
    const items = document.querySelector(
      `#${e.currentTarget.attributes.name.value}`
    );

    if (items.classList.value.includes("hidden")) {
      e.currentTarget.addEventListener("click", () => {
        items.classList.remove("hidden");
      });
    }
    if (!items.classList.value.includes("hidden")) {
      e.currentTarget.addEventListener("click", () => {
        items.classList.add("hidden");
      });
    }
  };
  //! Local Handlers \\

  return (
    <>
      <Layout onSearch={handleSearch} title={"فروشگاه"}>
        {/* Filter and Sort mobile section (( Mobile )) */}
        <div className="container px-5 mx-auto">
          <div className="my-5 md:hidden">
            <div className="flex items-center">
              <div className="flex items-center w-1/2 rounded-md whitespace-nowrap shadow bg-white px-3 py-2 ml-1 text-sm">
                <HiOutlineSortDescending className="h-5 w-5 ml-3 stroke-gray-400" />
                محبوب ترین
              </div>
              <div className="flex items-center w-1/2 rounded-md shadow bg-white px-3 py-2 mr-1 text-sm">
                <HiOutlineFilter className="h-5 w-5 ml-3 stroke-gray-400" />
                <span>برند اپل </span>
              </div>
            </div>
          </div>
        </div>

        {/* section (( Desktop && Mobile )) */}
        <div className="grid grid-cols-12 grid-rows-[55px_minmax(500px,_1fr)] md:gap-6 container mx-auto">
          {/* app bar (( Desktop )) */}
          <div className="hidden md:block col-span-3 xl:col-span-2 row-span-2">
            <div className="bg-white py-5 min-h-[300px] max-h-[700px] rounded-xl shadow-md p-4">
              {/* Grouping */}
              <div className="flex flex-col">
                <h3 className="text-orange-500 font-bold mb-3 text-lg">
                  دسته بندی
                </h3>
                <ul>
                  <li
                    onClick={(e) => handleGrouping("smartPhone", loc)}
                    name="smartPhone"
                    className={`flex cursor-pointer py-1 px-2 rounded-md mb-1  ${
                      grouping === "smartPhone"
                        ? "bg-gray-100"
                        : "opacity-40 hover:bg-gray-200"
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-gray-300 ">
                      <HiOutlineDeviceMobile className="w-4 h-4 mr-[5px] mt-[5px]" />
                    </div>
                    <p className="mr-3">تلفن همراه</p>
                  </li>
                  <li
                    onClick={(e) => handleGrouping("laptop", loc)}
                    className={`flex cursor-pointer py-1 px-2 rounded-md mb-1  ${
                      grouping === "laptop"
                        ? "bg-gray-100"
                        : "opacity-40 hover:bg-gray-200"
                    }`}
                    name="laptop"
                  >
                    <div className="w-4 h-4 rounded-full bg-gray-300">
                      <HiOutlineDesktopComputer className="w-4 h-4 mr-[5px] mt-[5px]" />
                    </div>
                    <p className="mr-3">لپ تاپ</p>
                  </li>
                  <li
                    onClick={(e) => handleGrouping("smartWatch", loc)}
                    className={`flex cursor-pointer py-1 px-2 rounded-md mb-1  ${
                      grouping === "smartWatch"
                        ? "bg-gray-100"
                        : "opacity-40 hover:bg-gray-200"
                    }`}
                    name="smartWatch"
                  >
                    <div className="w-4 h-4 rounded-full bg-gray-300">
                      <HiOutlineDesktopComputer className="w-4 h-4 mr-[5px] mt-[5px]" />
                    </div>
                    <p className="mr-3">ساعت هوشمند</p>
                  </li>
                </ul>
                <hr />
              </div>

              {/* Filter */}
              <div className="flex flex-col">
                <h3 className="text-orange-500 font-bold mb-3 text-lg">
                  فیلتر
                </h3>
                <ul>
                  {/* Brands */}
                  <li>
                    <div
                      onClick={(e) => handleAccr(e)}
                      name="grouping"
                      className={`flex cursor-pointer mb-2 select-none`}
                    >
                      <div className="w-4 h-4 rounded-full bg-gray-300 ">
                        <HiOutlineHome className="w-4 h-4 mr-[5px] mt-[5px]" />
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <p className="mr-3">برند محصول</p>
                        <HiChevronDown />
                      </div>
                    </div>
                    <ul
                      className="mb-4 mx-1 bg-gray-100 p-1 rounded-md"
                      id="grouping"
                    >
                      <li className="w-full flex items-center hover:bg-gray-50 py-1">
                        <input
                          type="checkbox"
                          className="form-checkbox rounded w-4 focus:ring-orange-500 text-orange-500"
                          id="apple"
                        />
                        <label className="pr-2 w-full text-sm" htmlFor="apple">
                          اپل
                        </label>
                      </li>
                      <li className="w-full flex items-center hover:bg-gray-50 py-1">
                        <input
                          type="checkbox"
                          className="form-checkbox rounded w-4 focus:ring-orange-500 text-orange-500"
                          id="samsung"
                        />
                        <label
                          className="pr-2 w-full text-sm"
                          htmlFor="samsung"
                        >
                          سامسونگ
                        </label>
                      </li>
                      <li className="w-full flex items-center hover:bg-gray-50 py-1">
                        <input
                          type="checkbox"
                          className="form-checkbox rounded w-4 focus:ring-orange-500 text-orange-500"
                          id="xiaomi"
                        />
                        <label className="pr-2 w-full text-sm" htmlFor="xiaomi">
                          شیاِومی
                        </label>
                      </li>
                      <li className="w-full flex items-center hover:bg-gray-50 py-1">
                        <input
                          type="checkbox"
                          className="form-checkbox rounded w-4 focus:ring-orange-500 text-orange-500"
                          id="sony"
                        />
                        <label className="pr-2 w-full text-sm" htmlFor="sony">
                          سونی
                        </label>
                      </li>
                    </ul>
                  </li>

                  {/* Colors */}
                  <li>
                    <div
                      onClick={(e) => handleAccr(e)}
                      className={`flex cursor-pointer mb-2 select-none`}
                      name="colors"
                    >
                      <div className="w-4 h-4 rounded-full bg-gray-300">
                        <HiOutlineColorSwatch className="w-4 h-4 mr-[5px] mt-[5px]" />
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <p className="mr-3">رنگ محصول</p>
                        <HiChevronDown />
                      </div>
                    </div>
                    <ul
                      className="mb-4 mx-1 bg-gray-100 p-1 rounded-md"
                      id="colors"
                    >
                      <li className="w-full flex items-center py-1 hover:bg-gray-50">
                        <input
                          type="checkbox"
                          name="color"
                          id="black"
                          className="form-checkbox rounded w-4 focus:ring-orange-500 text-orange-500"
                        />
                        <label
                          className="pr-2 w-full text-sm cursor-pointer"
                          htmlFor="black"
                        >
                          مشکی
                        </label>
                      </li>
                      <li className="w-full flex items-center py-1 hover:bg-gray-50">
                        <input
                          type="checkbox"
                          name="color"
                          id="blue"
                          className="form-checkbox rounded w-4 focus:ring-orange-500 text-orange-500"
                        />
                        <label
                          className="pr-2 w-full text-sm cursor-pointer"
                          htmlFor="blue"
                        >
                          آبی
                        </label>
                      </li>
                      <li className="w-full flex items-center py-1 hover:bg-gray-50">
                        <input
                          type="checkbox"
                          name="color"
                          id="red"
                          className="form-checkbox rounded w-4 focus:ring-orange-500
                  text-orange-500 "
                        />
                        <label
                          className="pr-2 w-full text-sm cursor-pointer"
                          htmlFor="red"
                        >
                          قرمز
                        </label>
                      </li>
                      <li className="w-full flex items-center py-1 hover:bg-gray-50">
                        <input
                          type="checkbox"
                          name="color"
                          id="purple"
                          className="form-checkbox rounded w-4 focus:ring-orange-500 text-orange-500"
                        />
                        <label
                          className="pr-2 w-full text-sm cursor-pointer"
                          htmlFor="purple"
                        >
                          بنفش
                        </label>
                      </li>
                      <li className="w-full flex items-center py-1 hover:bg-gray-50">
                        <input
                          type="checkbox"
                          name="color"
                          id="pink"
                          className="form-checkbox rounded w-4 focus:ring-orange-500 text-orange-500"
                        />
                        <label
                          className="pr-2 w-full text-sm cursor-pointer"
                          htmlFor="pink"
                        >
                          صورتی
                        </label>
                      </li>
                    </ul>
                  </li>

                  {/* Price Range */}
                  <li>
                    <div
                      onClick={(e) => handleAccr(e)}
                      className={`flex cursor-pointer mb-2 select-none`}
                      name="priceRange"
                    >
                      <div className="w-4 h-4 rounded-full bg-gray-300">
                        <HiOutlineCreditCard className="w-4 h-4 mr-[5px] mt-[5px]" />
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <p className="mr-3">قیمت محصول</p>
                        <HiChevronDown />
                      </div>
                    </div>
                    <ul className="bg-gray-100 rounded-md p-2" id="priceRange">
                      <li className="w-full flex py-1">
                        <label className="flex flex-col w-full">
                          <input
                            type="range"
                            value={priceRange}
                            min={
                              _.minBy(Products, function (pro) {
                                return pro.price;
                              }).price + 100000
                            }
                            max={
                              _.maxBy(Products, function (pro) {
                                return pro.price;
                              }).price - 100000
                            }
                            onChange={(e) => handlePriceRange(e)}
                            name="priceRange"
                            id="black"
                            className="w-full caret-orange-500 appearance-none h-[5px] my-2 rounded-md bg-orange-400 PriceRange"
                          />
                          <div className="flex items-center justify-between text-xs">
                            <span>
                              {digitsEnToAr(
                                addCommas(
                                  _.minBy(Products, function (pro) {
                                    return pro.price;
                                  }).price
                                )
                              )}
                            </span>
                            <span>
                              {digitsEnToAr(
                                addCommas(
                                  _.maxBy(Products, function (pro) {
                                    return pro.price;
                                  }).price
                                )
                              )}
                            </span>
                          </div>
                        </label>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            {/* Ad Bar */}
            <div className="rounded-xl shadow-md h-44 my-4 flex items-center justify-center bg-orange-500">
              <img
                src={require("./../assets/img/Cart/1.png")}
                alt="iphone 13 pro max"
                className="w-1/3"
              />
            </div>
          </div>

          {/* Filter and Sort mobile section (( Desktop )) */}
          <div className="bg-white hidden md:block col-span-9 xl:col-span-10 px-2 rounded-md">
            <div className="flex items-center h-full">
              <div className="bg-orange-200 p-2 rounded-md">
                <HiOutlineSortDescending className="w-7 h-7 font-light stroke-orange-600" />
              </div>
              <button
                onClick={(e) => handleSort(["rate", "asc"])}
                name="rate"
                className={`px-2 py-1 mx-2 relative ${
                  sort[0] === "rate" ? "" : "text-gray-400"
                }`}
              >
                محبوب ترین
                <span
                  className={`w-1 h-1 rounded-full bg-orange-400 absolute top-1 left-0 ${
                    sort[0] === "rate" ? "block" : "hidden"
                  }`}
                ></span>
              </button>
              <button
                onClick={(e) => handleSort(["numOfVisits", "asc"])}
                name="numOfVisits"
                className={`px-2 py-1 mx-2 relative ${
                  sort[0] === "numOfVisits" ? "" : "text-gray-400"
                }`}
              >
                پربازدید ترین
                <span
                  className={`w-1 h-1 rounded-full bg-orange-400 absolute top-1 left-0 ${
                    sort[0] === "numOfVisits" ? "block" : "hidden"
                  }`}
                ></span>
              </button>
              <button
                onClick={(e) => handleSort(["price", "desc"])}
                name="price"
                className={`px-2 py-1 mx-2 relative ${
                  sort[0] === "price" && sort[1] === "desc"
                    ? ""
                    : "text-gray-400"
                }`}
              >
                گران ترین
                <span
                  className={`w-1 h-1 rounded-full bg-orange-400 absolute top-1 left-0 ${
                    sort[0] === "price" && sort[1] === "desc"
                      ? "block"
                      : "hidden"
                  }`}
                ></span>
              </button>
              <button
                onClick={(e) => handleSort(["price", "asc"])}
                name="price"
                className={`px-2 py-1 mx-2 relative ${
                  sort[0] === "price" && sort[1] === "asc"
                    ? ""
                    : "text-gray-400"
                }`}
              >
                ارزان ترین
                <span
                  className={`w-1 h-1 rounded-full bg-orange-400 absolute top-1 left-0 ${
                    sort[0] === "price" && sort[1] === "asc"
                      ? "block"
                      : "hidden"
                  }`}
                ></span>
              </button>
            </div>
          </div>

          {/* Products Section (( Desktop && Mobile )) */}
          <section className="md:px-0 px-5 col-span-12 row-span-full md:row-auto md:col-span-9 xl:col-span-10 mb-16">
            <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {/* Product */}
              {productsShow.map((product) => (
                <section
                  className="bg-white rounded-lg shadow-md p-1 sm:p-2 block"
                  key={product.id}
                >
                  <div className="bg-gray-400 min-h-[140px] rounded-lg relative flex items-center justify-center overflow-hidden">
                    <Link
                      to={{ pathname: `/products/${product.id}` }}
                      className="flex items-center justify-center w-full"
                    >
                      <img
                        className="w-3/4"
                        src={product.mainImage}
                        alt={product.titleEn}
                      />
                    </Link>
                    <div
                      className="bg-[#ffffff42] p-1 inline-flex rounded-full absolute right-2 top-2 cursor-pointer"
                      onClick={() => handleLike(product)}
                    >
                      {product.liked ? (
                        <HiHeart className="h-4 w-4 fill-red-500 transition-colors" />
                      ) : (
                        <HiOutlineHeart className="h-4 w-4 stroke-red-500" />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col my-2 sm:my-0 p-2">
                    <div className="my-1 mb-2 text-sm md:text-base flex items-center justify-between">
                      <div className="font-bold text-gray-300">
                        {product.brandFa}
                      </div>
                      <SelectColor
                        product={product}
                        onSetColor={handleSetColor}
                      />
                    </div>
                    <Link to={{ pathname: `/products/${product.id}` }}>
                      <div className="my-1 text-sm md:text-base">
                        {product.titleFa}
                      </div>
                    </Link>

                    <div className="mt-2 text-sm md:text-base self-end text-orange-500 font-bold">
                      {digitsEnToAr(addCommas(product.price))} تومان
                    </div>
                  </div>
                  <hr />
                  <Link
                    to={{ pathname: `/products/${product.id}` }}
                    className=""
                  >
                    <button className="w-full text-orange-500 p-1 font-bold text-sm sm:text-base">
                      مشاهده و سفارش
                    </button>
                  </Link>
                </section>
              ))}
            </div>

            {/* Pagination */}
            <div className="w-full flex items-center justify-center my-8">
              <ul className="flex items-center justify-center">
                <li className="py-1 px-2 hover:bg-orange-500 transition-[background-color] hover:text-white cursor-pointer rounded">
                  <HiOutlineRewind className="rotate-180" />
                </li>
                <li className="ml-2 py-1 px-2 hover:bg-orange-500 transition-[background-color] hover:text-white cursor-pointer rounded">
                  <HiOutlineArrowSmRight />
                </li>
                <li className="m-1 text-xl py-1 px-2 hover:bg-orange-500 [ bg-orange-500 text-white ring-2 ring-offset-2 ring-offset-gray-200 ring-orange-500 ] transition-[background-color] hover:text-white cursor-pointer rounded">
                  1
                </li>
                <li className="m-1 text-xl py-1 px-2 hover:bg-orange-500 transition-[background-color] hover:text-white cursor-pointer rounded">
                  2
                </li>
                <li className="m-1 text-xl py-1 px-2 hover:bg-orange-500 transition-[background-color] hover:text-white cursor-pointer rounded">
                  3
                </li>
                <li className="m-1 text-xl py-1 px-2 hover:bg-orange-500 transition-[background-color] hover:text-white cursor-pointer rounded">
                  4
                </li>
                <li className="m-1 text-xl py-1 px-2 hover:bg-orange-500 transition-[background-color] hover:text-white cursor-pointer rounded">
                  5
                </li>
                <li className="mr-2 py-1 px-2 hover:bg-orange-500 transition-[background-color] hover:text-white cursor-pointer rounded">
                  <HiOutlineArrowSmLeft />
                </li>
                <li className="py-1 px-2 hover:bg-orange-500 transition-[background-color] hover:text-white cursor-pointer rounded">
                  <HiOutlineRewind />
                </li>
              </ul>
            </div>
          </section>
        </div>
      </Layout>

      {/* Navigator (( Mobile )) */}
      <div className="bg-white shadow-2xl px-5 z-50 sticky bottom-0 left-0 w-full h-16 flex md:hidden items-center justify-between rounded-t-lg">
        <div className="flex items-center justify-between w-full container mx-auto">
          <Link to={{ pathname: "/" }}>
            {loc.pathname !== "/" ? (
              <HiOutlineHome className="h-8 w-8 stroke-gray-400" />
            ) : (
              <HiHome className="h-10 w-10 pl-2" />
            )}
          </Link>
          <Link to={{ pathname: "/list" }}>
            {loc.pathname !== "/list" ? (
              <HiOutlineViewGrid className="h-8 w-8 stroke-gray-400" />
            ) : (
              <HiViewGrid className="h-10 w-10 pl-2" />
            )}
          </Link>
          <Link to={{ pathname: "/cart" }}>
            {loc.pathname !== "/cart" ? (
              cart.length !== 0 ? (
                <div className="relative">
                  <HiOutlineShoppingCart className="h-8 w-8 stroke-orange-400" />
                  <span className="w-5 h-5 rounded-full absolute -top-3 -right-3 bg-orange-500 flex items-center justify-center text-sm text-white">
                    {cart.length}
                  </span>
                </div>
              ) : (
                <HiOutlineShoppingCart className="h-8 w-8 stroke-gray-400" />
              )
            ) : (
              <HiShoppingCart className="h-10 w-10 pl-2" />
            )}
          </Link>
          <Link to={{ pathname: "/favorite" }}>
            {loc.pathname !== "/favorite" ? (
              <HiOutlineHeart className="h-8 w-8 stroke-gray-400" />
            ) : (
              <HiHeart className="h-10 w-10 pl-2 fill-red-500" />
            )}
          </Link>
        </div>
      </div>
    </>
  );
}

export default ShopPage;
