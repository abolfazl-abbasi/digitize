import {
  HiOutlineSortDescending,
  HiOutlineDeviceMobile,
  HiOutlineDesktopComputer,
  HiChevronDown,
  HiOutlineHome,
  // HiOutlineColorSwatch,
  HiOutlineCreditCard,
  // HiOutlineRewind,
  // HiOutlineArrowSmLeft,
  // HiOutlineArrowSmRight,
  HiOutlineFilter,
  HiOutlineHeart,
  HiHeart,
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
import { usePending } from "../Providers/CartProvider";
import Products from "../data/products";
import _ from "lodash";
import NavigatorMobile from "../components/NavigatorMobile";
function ShopPage() {
  //? Providers \\
  const grouping = useGrouping();
  const sort = useSort();
  const priceRange = usePriceRange();
  const productsShow = useProductsShow();
  // const cart = useCart();
  const pending = usePending();

  //? Dispatchers \\
  const { handleLike } = useProductsDispatcher();
  const {
    handleGrouping,
    handlePriceRange,
    handleSort,
    handleFilterBrand,
    handleCancelAllFilters,
  } = useSaGDispatcher();

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

  const handleShow = (id = "") => {
    const target = document.getElementById(id);
    const filters = document.getElementById("filters");
    const sorts = document.getElementById("sorts");
    filters.classList.add("hidden");
    sorts.classList.add("hidden");
    if (id !== "") {
      target.classList.remove("hidden");
      target.classList.add("flex");
    }
  };

  //! Local Handlers \\

  return (
    <>
      <Layout title={"فروشگاه"}>
        {/* Filter and Sort mobile section (( Mobile )) */}
        <div className="container mx-auto px-5">
          <div className="my-5 md:hidden">
            <div className="flex items-center">
              <div
                className="ml-1 flex w-1/2 items-center whitespace-nowrap rounded-md bg-white px-3 py-2 text-sm shadow"
                onClick={() => handleShow("sorts")}
              >
                <HiOutlineSortDescending className="ml-3 h-5 w-5 stroke-gray-400" />
                محبوب ترین
              </div>
              <div
                className="mr-1 flex w-1/2 items-center rounded-md bg-white px-3 py-2 text-sm shadow"
                onClick={() => handleShow("filters")}
              >
                <HiOutlineFilter className="ml-3 h-5 w-5 stroke-gray-400" />
                فیلتر
              </div>
            </div>
          </div>
        </div>

        {/* section (( Desktop && Mobile )) */}
        <div className="container mx-auto grid grid-cols-12 grid-rows-[55px_minmax(500px,_1fr)] md:gap-6">
          {/* app bar (( Desktop )) */}
          <div className="col-span-3 row-span-2 hidden md:block xl:col-span-2">
            <div className="sticky top-24 mb-16 max-h-[700px] min-h-[300px] rounded-xl bg-white p-4 py-5 shadow-md">
              {/* Grouping */}
              <div className="flex flex-col">
                <h3 className="mb-3 text-lg font-bold text-orange-500">
                  دسته بندی
                </h3>
                <ul>
                  <li
                    onClick={(e) => handleGrouping("smartPhone", loc)}
                    name="smartPhone"
                    className={`mb-1 flex cursor-pointer rounded-md py-1 px-2  ${
                      grouping === "smartPhone"
                        ? "bg-gray-100"
                        : "opacity-40 hover:bg-gray-200"
                    }`}
                  >
                    <div className="h-4 w-4 rounded-full bg-gray-300 ">
                      <HiOutlineDeviceMobile className="mr-[5px] mt-[5px] h-4 w-4" />
                    </div>
                    <p className="mr-3">تلفن همراه</p>
                  </li>
                  <li
                    onClick={(e) => handleGrouping("laptop", loc)}
                    className={`mb-1 flex cursor-pointer rounded-md py-1 px-2  ${
                      grouping === "laptop"
                        ? "bg-gray-100"
                        : "opacity-40 hover:bg-gray-200"
                    }`}
                    name="laptop"
                  >
                    <div className="h-4 w-4 rounded-full bg-gray-300">
                      <HiOutlineDesktopComputer className="mr-[5px] mt-[5px] h-4 w-4" />
                    </div>
                    <p className="mr-3">لپ تاپ</p>
                  </li>
                  <li
                    onClick={(e) => handleGrouping("smartWatch", loc)}
                    className={`mb-1 flex cursor-pointer rounded-md py-1 px-2  ${
                      grouping === "smartWatch"
                        ? "bg-gray-100"
                        : "opacity-40 hover:bg-gray-200"
                    }`}
                    name="smartWatch"
                  >
                    <div className="h-4 w-4 rounded-full bg-gray-300">
                      <HiOutlineDesktopComputer className="mr-[5px] mt-[5px] h-4 w-4" />
                    </div>
                    <p className="mr-3">ساعت هوشمند</p>
                  </li>
                </ul>
                <hr />
              </div>

              {/* Filter */}
              <div className="flex flex-col">
                <h3 className="mb-3 text-lg font-bold text-orange-500">
                  فیلتر
                </h3>
                <ul>
                  {/* Brands */}
                  <li>
                    <div
                      onClick={(e) => handleAccr(e)}
                      name="grouping"
                      className={`mb-2 flex cursor-pointer select-none`}
                    >
                      <div className="h-4 w-4 rounded-full bg-gray-300 ">
                        <HiOutlineHome className="mr-[5px] mt-[5px] h-4 w-4" />
                      </div>
                      <div className="flex w-full items-center justify-between">
                        <p className="mr-3">برند محصول</p>
                        <HiChevronDown />
                      </div>
                    </div>
                    <ul
                      className="mx-1 mb-4 rounded-md bg-gray-100 p-1"
                      id="grouping"
                    >
                      <li className="flex w-full items-center py-1 hover:bg-gray-50">
                        <input
                          onChange={(e) =>
                            handleFilterBrand(e.target.checked, "apple")
                          }
                          type="checkbox"
                          className="form-checkbox w-4 rounded text-orange-500 focus:ring-orange-500"
                          id="apple"
                        />
                        <label className="w-full pr-2 text-sm" htmlFor="apple">
                          اپل
                        </label>
                      </li>
                      <li className="flex w-full items-center py-1 hover:bg-gray-50">
                        <input
                          onChange={(e) =>
                            handleFilterBrand(e.target.checked, "samsong")
                          }
                          type="checkbox"
                          className="form-checkbox w-4 rounded text-orange-500 focus:ring-orange-500"
                          id="samsung"
                        />
                        <label
                          className="w-full pr-2 text-sm"
                          htmlFor="samsung"
                        >
                          سامسونگ
                        </label>
                      </li>
                      <li className="flex w-full items-center py-1 hover:bg-gray-50">
                        <input
                          onChange={(e) =>
                            handleFilterBrand(e.target.checked, "xiaomi")
                          }
                          type="checkbox"
                          className="form-checkbox w-4 rounded text-orange-500 focus:ring-orange-500"
                          id="xiaomi"
                        />
                        <label className="w-full pr-2 text-sm" htmlFor="xiaomi">
                          شیاِیَومی
                        </label>
                      </li>
                      <li className="flex w-full items-center py-1 hover:bg-gray-50">
                        <input
                          onChange={(e) =>
                            handleFilterBrand(e.target.checked, "sony")
                          }
                          type="checkbox"
                          className="form-checkbox w-4 rounded text-orange-500 focus:ring-orange-500"
                          id="sony"
                        />
                        <label className="w-full pr-2 text-sm" htmlFor="sony">
                          سونی
                        </label>
                      </li>
                    </ul>
                  </li>

                  {/* Colors */}
                  {/* <li>
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
                          onClick={(e) =>
                            handleFilterColor(e.target.checked, "black")
                          }
                          type="checkbox"
                          name="color"
                          id="black"
                          className=" rounded w-4 focus:ring-orange-500 text-orange-500"
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
                          onClick={(e) =>
                            handleFilterColor(e.target.checked, "blue")
                          }
                          type="checkbox"
                          name="color"
                          id="blue"
                          className=" rounded w-4 focus:ring-orange-500 text-orange-500"
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
                          onClick={(e) =>
                            handleFilterColor(e.target.checked, "red")
                          }
                          type="checkbox"
                          name="color"
                          id="red"
                          className=" rounded w-4 focus:ring-orange-500
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
                          onClick={(e) =>
                            handleFilterColor(e.target.checked, "purple")
                          }
                          type="checkbox"
                          name="color"
                          id="purple"
                          className=" rounded w-4 focus:ring-orange-500 text-orange-500"
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
                          onClick={(e) =>
                            handleFilterColor(e.target.checked, "pink")
                          }
                          type="checkbox"
                          name="color"
                          id="pink"
                          className=" rounded w-4 focus:ring-orange-500 text-orange-500"
                        />
                        <label
                          className="pr-2 w-full text-sm cursor-pointer"
                          htmlFor="pink"
                        >
                          صورتی
                        </label>
                      </li>
                    </ul>
                  </li> */}

                  {/* Price Range */}
                  <li>
                    <div
                      onClick={(e) => handleAccr(e)}
                      className={`mb-2 flex cursor-pointer select-none`}
                      name="priceRange"
                    >
                      <div className="h-4 w-4 rounded-full bg-gray-300">
                        <HiOutlineCreditCard className="mr-[5px] mt-[5px] h-4 w-4" />
                      </div>
                      <div className="flex w-full items-center justify-between">
                        <p className="mr-3">قیمت محصول</p>
                        <HiChevronDown />
                      </div>
                    </div>
                    <ul className="rounded-md bg-gray-100 p-2" id="priceRange">
                      <li className="flex w-full py-1">
                        <label className="flex w-full flex-col">
                          <input
                            type="range"
                            value={priceRange}
                            min={
                              _.minBy(Products, function (pro) {
                                return pro.price;
                              }).price
                            }
                            max={
                              _.maxBy(Products, function (pro) {
                                return pro.price;
                              }).price + 100000
                            }
                            onChange={(e) => handlePriceRange(e.target.value)}
                            name="priceRange"
                            id="black"
                            className="PriceRange my-2 h-[5px] w-full appearance-none rounded-md bg-orange-400 caret-orange-500"
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
          </div>

          {/* Filter and Sort mobile section (( Desktop )) */}
          <div className="col-span-9 hidden rounded-md bg-white px-2 md:block xl:col-span-10">
            <div className="flex h-full items-center">
              <div className="rounded-md bg-orange-200 p-2">
                <HiOutlineSortDescending className="h-7 w-7 stroke-orange-600 font-light" />
              </div>
              <button
                onClick={(e) => handleSort(["rate", "asc"])}
                name="rate"
                className={`relative mx-2 px-2 py-1 ${
                  sort[0] === "rate" ? "" : "text-gray-400"
                }`}
              >
                محبوب ترین
                <span
                  className={`absolute top-1 left-0 h-1 w-1 rounded-full bg-orange-400 ${
                    sort[0] === "rate" ? "block" : "hidden"
                  }`}
                ></span>
              </button>
              <button
                onClick={(e) => handleSort(["numOfVisits", "asc"])}
                name="numOfVisits"
                className={`relative mx-2 px-2 py-1 ${
                  sort[0] === "numOfVisits" ? "" : "text-gray-400"
                }`}
              >
                پربازدید ترین
                <span
                  className={`absolute top-1 left-0 h-1 w-1 rounded-full bg-orange-400 ${
                    sort[0] === "numOfVisits" ? "block" : "hidden"
                  }`}
                ></span>
              </button>
              <button
                onClick={(e) => handleSort(["price", "desc"])}
                name="price"
                className={`relative mx-2 px-2 py-1 ${
                  sort[0] === "price" && sort[1] === "desc"
                    ? ""
                    : "text-gray-400"
                }`}
              >
                گران ترین
                <span
                  className={`absolute top-1 left-0 h-1 w-1 rounded-full bg-orange-400 ${
                    sort[0] === "price" && sort[1] === "desc"
                      ? "block"
                      : "hidden"
                  }`}
                ></span>
              </button>
              <button
                onClick={(e) => handleSort(["price", "asc"])}
                name="price"
                className={`relative mx-2 px-2 py-1 ${
                  sort[0] === "price" && sort[1] === "asc"
                    ? ""
                    : "text-gray-400"
                }`}
              >
                ارزان ترین
                <span
                  className={`absolute top-1 left-0 h-1 w-1 rounded-full bg-orange-400 ${
                    sort[0] === "price" && sort[1] === "asc"
                      ? "block"
                      : "hidden"
                  }`}
                ></span>
              </button>
            </div>
          </div>

          {/* Products Section (( Desktop && Mobile )) */}
          <section className="col-span-12 row-span-full mb-16 px-5 md:col-span-9 md:row-auto md:px-0 xl:col-span-10">
            <div
              className={`grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${
                pending ? "opacity-30" : ""
              }`}
            >
              {/* Product */}
              {productsShow.map((product) => (
                <section
                  className="block rounded-lg bg-white p-1 shadow-md sm:p-2"
                  key={product.id}
                >
                  <div className="relative flex min-h-[140px] items-center justify-center overflow-hidden rounded-lg bg-gray-400">
                    <Link
                      to={{ pathname: `/products/${product.id}` }}
                      className="flex w-full items-center justify-center"
                    >
                      <img
                        className="w-3/4"
                        src={product.mainImage}
                        alt={product.titleEn}
                      />
                    </Link>
                    <div
                      className="absolute right-2 top-2 inline-flex cursor-pointer rounded-full bg-[#ffffff42] p-1"
                      onClick={() => handleLike(product)}
                    >
                      {product.liked ? (
                        <HiHeart className="h-4 w-4 fill-red-500 transition-colors" />
                      ) : (
                        <HiOutlineHeart className="h-4 w-4 stroke-red-500" />
                      )}
                    </div>
                  </div>
                  <div className="my-2 flex flex-col p-2 sm:my-0">
                    <div className="my-1 mb-2 flex items-center justify-between text-sm md:text-base">
                      <div className="font-bold text-gray-300">
                        {product.brandFa}
                      </div>
                      <SelectColor product={product} />
                    </div>
                    <Link to={{ pathname: `/products/${product.id}` }}>
                      <div className="my-1 text-sm md:text-base">
                        {product.titleFa}
                      </div>
                    </Link>

                    <div className="mt-2 self-end text-sm font-bold text-orange-500 md:text-base">
                      {digitsEnToAr(addCommas(product.price))} تومان
                    </div>
                  </div>
                  <hr />
                  <Link
                    to={{ pathname: `/products/${product.id}` }}
                    className=""
                  >
                    <button className="w-full p-1 text-sm font-bold text-orange-500 sm:text-base">
                      مشاهده و سفارش
                    </button>
                  </Link>
                </section>
              ))}
            </div>

            {/* Pagination */}
            {/* <div className="w-full flex items-center justify-center my-8">
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
            </div> */}
          </section>
        </div>
      </Layout>

      {/* Navigator (( Mobile )) */}
      <NavigatorMobile />

      {/* filter and Grouping (( Mobile )) */}
      <div
        className="fixed bottom-0 z-[999] hidden h-screen w-full bg-[#ffffff84] md:hidden"
        id="filters"
      >
        <div
          className="absolute bottom-0 flex h-full w-full flex-col justify-between overflow-auto rounded-t-[30px] px-5 py-3 shadow-2xl"
          onClick={handleShow}
        ></div>
        <div className="absolute bottom-0 flex h-[70vh] w-full flex-col justify-between overflow-auto rounded-t-[30px] bg-white px-5 py-3 shadow-2xl">
          <div>
            <div className="col-span-3 row-span-2 xl:col-span-2">
              <div className="max-h-[700px] min-h-[300px] rounded-xl bg-white">
                {/* Grouping */}
                <div className="flex flex-col">
                  <h3 className="mb-3 text-lg font-bold text-orange-500">
                    دسته بندی
                  </h3>
                  <ul>
                    <li
                      onClick={(e) => handleGrouping("smartPhone", loc)}
                      name="smartPhone"
                      className={`mb-1 flex cursor-pointer rounded-md py-1 px-2  ${
                        grouping === "smartPhone"
                          ? "bg-gray-100"
                          : "opacity-40 hover:bg-gray-200"
                      }`}
                    >
                      <div className="h-4 w-4 rounded-full bg-gray-300 ">
                        <HiOutlineDeviceMobile className="mr-[5px] mt-[5px] h-4 w-4" />
                      </div>
                      <p className="mr-3">تلفن همراه</p>
                    </li>
                    <li
                      onClick={(e) => handleGrouping("laptop", loc)}
                      className={`mb-1 flex cursor-pointer rounded-md py-1 px-2  ${
                        grouping === "laptop"
                          ? "bg-gray-100"
                          : "opacity-40 hover:bg-gray-200"
                      }`}
                      name="laptop"
                    >
                      <div className="h-4 w-4 rounded-full bg-gray-300">
                        <HiOutlineDesktopComputer className="mr-[5px] mt-[5px] h-4 w-4" />
                      </div>
                      <p className="mr-3">لپ تاپ</p>
                    </li>
                    <li
                      onClick={(e) => handleGrouping("smartWatch", loc)}
                      className={`mb-1 flex cursor-pointer rounded-md py-1 px-2  ${
                        grouping === "smartWatch"
                          ? "bg-gray-100"
                          : "opacity-40 hover:bg-gray-200"
                      }`}
                      name="smartWatch"
                    >
                      <div className="h-4 w-4 rounded-full bg-gray-300">
                        <HiOutlineDesktopComputer className="mr-[5px] mt-[5px] h-4 w-4" />
                      </div>
                      <p className="mr-3">ساعت هوشمند</p>
                    </li>
                  </ul>
                  <hr />
                </div>

                {/* Filter */}
                <div className="flex flex-col">
                  <h3 className="mb-3 text-lg font-bold text-orange-500">
                    فیلتر
                  </h3>
                  <ul>
                    {/* Brands */}
                    <li>
                      <div
                        onClick={(e) => handleAccr(e)}
                        name="grouping_"
                        className={`mb-2 flex cursor-pointer select-none`}
                      >
                        <div className="h-4 w-4 rounded-full bg-gray-300 ">
                          <HiOutlineHome className="mr-[5px] mt-[5px] h-4 w-4" />
                        </div>
                        <div className="flex w-full items-center justify-between">
                          <p className="mr-3">برند محصول</p>
                          <HiChevronDown />
                        </div>
                      </div>
                      <ul
                        className="mx-1 mb-4 rounded-md bg-gray-100 p-1"
                        id="grouping_"
                      >
                        <li className="flex w-full items-center py-1 hover:bg-gray-50">
                          <input
                            onChange={(e) =>
                              handleFilterBrand(e.target.checked, "apple")
                            }
                            type="checkbox"
                            className="form-checkbox w-4 rounded text-orange-500 focus:ring-orange-500"
                            id="apple_"
                          />
                          <label
                            className="w-full pr-2 text-sm"
                            htmlFor="apple_"
                          >
                            اپل
                          </label>
                        </li>
                        <li className="flex w-full items-center py-1 hover:bg-gray-50">
                          <input
                            onChange={(e) =>
                              handleFilterBrand(e.target.checked, "samsong")
                            }
                            type="checkbox"
                            className="form-checkbox w-4 rounded text-orange-500 focus:ring-orange-500"
                            id="samsung_"
                          />
                          <label
                            className="w-full pr-2 text-sm"
                            htmlFor="samsung_"
                          >
                            سامسونگ
                          </label>
                        </li>
                        <li className="flex w-full items-center py-1 hover:bg-gray-50">
                          <input
                            onChange={(e) =>
                              handleFilterBrand(e.target.checked, "xiaomi")
                            }
                            type="checkbox"
                            className="form-checkbox w-4 rounded text-orange-500 focus:ring-orange-500"
                            id="xiaomi_"
                          />
                          <label
                            className="w-full pr-2 text-sm"
                            htmlFor="xiaomi_"
                          >
                            شیاِیَومی
                          </label>
                        </li>
                        <li className="flex w-full items-center py-1 hover:bg-gray-50">
                          <input
                            onChange={(e) =>
                              handleFilterBrand(e.target.checked, "sony")
                            }
                            type="checkbox"
                            className="form-checkbox w-4 rounded text-orange-500 focus:ring-orange-500"
                            id="sony_"
                          />
                          <label
                            className="w-full pr-2 text-sm"
                            htmlFor="sony_"
                          >
                            سونی
                          </label>
                        </li>
                      </ul>
                    </li>

                    {/* Colors */}
                    {/* <li>
                    <div
                      onClick={(e) => handleAccr(e)}
                      className={`flex cursor-pointer mb-2 select-none`}
                      name="colors_"
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
                      id="colors_"
                    >
                      <li className="w-full flex items-center py-1 hover:bg-gray-50">
                        <input
                          onClick={(e) =>
                            handleFilterColor(e.target.checked, "black")
                          }
                          type="checkbox"
                          name="color"
                          id="black"
                          className=" rounded w-4 focus:ring-orange-500 text-orange-500"
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
                          onClick={(e) =>
                            handleFilterColor(e.target.checked, "blue")
                          }
                          type="checkbox"
                          name="color"
                          id="blue"
                          className=" rounded w-4 focus:ring-orange-500 text-orange-500"
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
                          onClick={(e) =>
                            handleFilterColor(e.target.checked, "red")
                          }
                          type="checkbox"
                          name="color"
                          id="red"
                          className=" rounded w-4 focus:ring-orange-500 text-orange-500 "
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
                          onClick={(e) =>
                            handleFilterColor(e.target.checked, "purple")
                          }
                          type="checkbox"
                          name="color"
                          id="purple"
                          className=" rounded w-4 focus:ring-orange-500 text-orange-500"
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
                          onClick={(e) =>
                            handleFilterColor(e.target.checked, "pink")
                          }
                          type="checkbox"
                          name="color"
                          id="pink"
                          className=" rounded w-4 focus:ring-orange-500 text-orange-500"
                        />
                        <label
                          className="pr-2 w-full text-sm cursor-pointer"
                          htmlFor="pink"
                        >
                          صورتی
                        </label>
                      </li>
                    </ul>
                  </li> */}

                    {/* Price Range */}
                    <li>
                      <div
                        onClick={(e) => handleAccr(e)}
                        className={`mb-2 flex cursor-pointer select-none`}
                        name="priceRange_"
                      >
                        <div className="h-4 w-4 rounded-full bg-gray-300">
                          <HiOutlineCreditCard className="mr-[5px] mt-[5px] h-4 w-4" />
                        </div>
                        <div className="flex w-full items-center justify-between">
                          <p className="mr-3">قیمت محصول</p>
                          <HiChevronDown />
                        </div>
                      </div>
                      <ul
                        className="rounded-md bg-gray-100 p-2"
                        id="priceRange_"
                      >
                        <li className="flex w-full py-1">
                          <label className="flex w-full flex-col">
                            <input
                              type="range"
                              value={priceRange}
                              min={
                                _.minBy(Products, function (pro) {
                                  return pro.price;
                                }).price
                              }
                              max={
                                _.maxBy(Products, function (pro) {
                                  return pro.price;
                                }).price + 100000
                              }
                              onChange={(e) => handlePriceRange(e.target.value)}
                              name="priceRange"
                              id="black"
                              className="PriceRange my-2 h-[5px] w-full appearance-none rounded-md bg-orange-400 caret-orange-500"
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
            </div>
          </div>
          <div className="mt-4 flex w-full items-center">
            <button
              className="ml-2 h-12 w-1/2 rounded bg-orange-500 text-lg font-bold text-white"
              onClick={handleShow}
            >
              تایید
            </button>
            <button
              className="mr-2 h-12 w-1/2 rounded border-2 border-orange-500 bg-orange-100 text-lg font-bold text-orange-500"
              onClick={handleCancelAllFilters}
            >
              لغو همه
            </button>
          </div>
        </div>
      </div>

      {/* Sort (( Mobile )) */}
      <div
        className="fixed bottom-0 z-[999] hidden h-screen w-full bg-[#ffffff84] md:hidden"
        id="sorts"
      >
        <div
          className="absolute bottom-0 flex h-full w-full flex-col justify-between overflow-auto rounded-t-[30px] px-5 py-3 shadow-2xl"
          onClick={handleShow}
        ></div>
        <div className="absolute bottom-0 flex h-[32vh] w-full flex-col justify-between overflow-auto rounded-t-[30px] bg-white px-5 py-3 shadow-2xl">
          <div className="col-span-9 rounded-md bg-white px-2 xl:col-span-10">
            <div className="flex h-full flex-col items-center gap-y-3">
              <button
                onClick={(e) => handleSort(["rate", "asc"])}
                name="rate"
                className={`relative mx-2 px-2 py-1 ${
                  sort[0] === "rate" ? "" : "text-gray-400"
                }`}
              >
                محبوب ترین
                <span
                  className={`footer-list absolute top-1 left-0 h-1 w-1 rounded-full bg-orange-400 ${
                    sort[0] === "rate" ? "block" : "hidden"
                  }`}
                ></span>
              </button>
              <button
                onClick={(e) => handleSort(["numOfVisits", "asc"])}
                name="numOfVisits"
                className={`relative mx-2 px-2 py-1 ${
                  sort[0] === "numOfVisits" ? "" : "text-gray-400"
                }`}
              >
                پربازدید ترین
                <span
                  className={`footer-list absolute top-1 left-0 h-1 w-1 rounded-full bg-orange-400 ${
                    sort[0] === "numOfVisits" ? "block" : "hidden"
                  }`}
                ></span>
              </button>
              <button
                onClick={(e) => handleSort(["price", "desc"])}
                name="price"
                className={`relative mx-2 px-2 py-1 ${
                  sort[0] === "price" && sort[1] === "desc"
                    ? ""
                    : "text-gray-400"
                }`}
              >
                گران ترین
                <span
                  className={`footer-list absolute top-1 left-0 h-1 w-1 rounded-full bg-orange-400 ${
                    sort[0] === "price" && sort[1] === "desc"
                      ? "block"
                      : "hidden"
                  }`}
                ></span>
              </button>
              <button
                onClick={(e) => handleSort(["price", "asc"])}
                name="price"
                className={`relative mx-2 px-2 py-1 ${
                  sort[0] === "price" && sort[1] === "asc"
                    ? ""
                    : "text-gray-400"
                }`}
              >
                ارزان ترین
                <span
                  className={`footer-list absolute top-1 left-0 h-1 w-1 rounded-full bg-orange-400 ${
                    sort[0] === "price" && sort[1] === "asc"
                      ? "block"
                      : "hidden"
                  }`}
                ></span>
              </button>
            </div>
          </div>
          <div className="mt-4 flex w-full items-center">
            <button
              className="ml-2 h-12 w-1/2 rounded bg-orange-500 text-lg font-bold text-white"
              onClick={handleShow}
            >
              تایید
            </button>
            <button
              className="mr-2 h-12 w-1/2 rounded border-2 border-orange-500 bg-orange-100 text-lg font-bold text-orange-500"
              onClick={handleCancelAllFilters}
            >
              لغو همه
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopPage;
