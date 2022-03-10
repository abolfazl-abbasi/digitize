/* eslint-disable no-restricted-globals */
/* eslint-disable no-template-curly-in-string */
import {
  HiOutlineSortDescending,
  HiOutlineDeviceMobile,
  HiOutlineDesktopComputer,
  HiChevronDown,
  HiOutlineHome,
  HiOutlineColorSwatch,
  HiOutlineCreditCard,
} from "react-icons/hi";
import React, { useState } from "react";
import Products from "../data/products";
import "./App.css";

function App() {
  const [products, setProducts] = useState([...Products]);
  const [sortWith, setSortWith] = useState("");
  const [groupingWith, setGroupingWith] = useState("smartPhone");
  const [filterWith, setFilterWith] = useState("");

  const handleSetColor = (e, product) => {
    const name = e.target.attributes.name.value;
    const updateProducts = [...products];
    const index = products.indexOf(product);
    updateProducts[index] = { ...product };
    updateProducts[index].activeColor = name;
    setProducts([...updateProducts]);
  };

  const handleLike = (product) => {
    const updateProducts = [...products];
    const index = products.indexOf(product);
    updateProducts[index] = { ...product };
    updateProducts[index].liked = !updateProducts[index].liked;
    setProducts(updateProducts);
  };

  const handleSort = (e) => {
    setSortWith(e.target.attributes.name.value);
  };

  const handleGrouping = (e) => {
    setGroupingWith(e.currentTarget.attributes.name.value);
  };

  const handleFilter = (e) => {
    setGroupingWith(e.currentTarget.attributes.name.value);
  };

  const handleAccr = (e) => {
    const items = document.querySelector(
      `#${e.currentTarget.attributes.name.value}`
    );
    console.log(items.classList);
    if (items.classList.value.includes("hidden")) {
      e.target.addEventListener("click", () => {
        items.classList.remove("hidden");
      });
    }
    if (!items.classList.value.includes("hidden")) {
      e.target.addEventListener("click", () => {
        items.classList.add("hidden");
      });
    }
  };

  return (
    <>
      {/* app bar (( Mobile )) */}
      <header className="mt-5 md:hidden">
        <div className="flex items-center justify-between">
          <div>Logo</div>
          <h1 className="text-xl font-bold">گوشی هوشمند</h1>
          <div className="bg-white p-1 rounded-md shadow-lg cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </header>

      {/* Filter and Sort mobile section (( Mobile )) */}
      <div className="my-5 md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex items-center w-1/2 rounded-md whitespace-nowrap shadow bg-white px-3 py-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-3 stroke-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
              />
            </svg>
            محبوب ترین
          </div>
          <div className="flex items-center w-1/2 rounded-md shadow bg-white px-3 py-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-3 stroke-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            فیلتر:<span> برند اپل</span>
          </div>
        </div>
      </div>

      {/* Navigator (( Mobile )) */}
      <div className="bg-white shadow-2xl px-3 z-50 fixed -bottom-1 left-0 w-full h-16 flex md:hidden items-center justify-between rounded-t-lg">
        <a href="/">
          {location.pathname !== "/" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 stroke-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          ) : (
            <div className="flex items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 pl-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
          )}
        </a>
        <a href="/list">
          {location.pathname !== "/list" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 stroke-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          ) : (
            <div className="flex items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 pl-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
          )}
        </a>
        <a href="/cart">
          {location.pathname !== "/cart" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 stroke-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          ) : (
            <div className="flex items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 pl-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </div>
          )}
        </a>
        <a href="/favorite">
          {location.pathname !== "/favorite" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 stroke-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          ) : (
            <div className="flex items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 pl-2 fill-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </a>
      </div>

      <div className="grid grid-cols-12 grid-rows-[55px_minmax(500px,_1fr)] md:gap-6">
        {/* app bar (( Desktop )) */}
        <div className="bg-white hidden md:block p-4 col-span-3 xl:col-span-2 row-span-2 rounded-xl shadow-md py-5">
          {/* Grouping */}
          <div className="flex flex-col">
            <h3 className="text-orange-500 font-bold mb-3 text-lg">
              <span>دسته بندی</span>
            </h3>
            <ul>
              <li
                onClick={(e) => handleGrouping(e)}
                name="smartPhone"
                className={`flex cursor-pointer py-1 px-2 rounded-md mb-1  ${
                  groupingWith === "smartPhone"
                    ? "hover:bg-gray-50"
                    : "opacity-40 hover:bg-gray-200"
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-gray-300 ">
                  <HiOutlineDeviceMobile className="w-4 h-4 mr-[5px] mt-[5px]" />
                </div>
                <p className="mr-3">تلفن همراه</p>
              </li>
              <li
                onClick={(e) => handleGrouping(e)}
                className={`flex cursor-pointer py-1 px-2 rounded-md mb-1  ${
                  groupingWith === "laptop"
                    ? "hover:bg-gray-50"
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
                onClick={(e) => handleGrouping(e)}
                className={`flex cursor-pointer py-1 px-2 rounded-md mb-1  ${
                  groupingWith === "smartWatch"
                    ? "hover:bg-gray-50"
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
              <span>فیلتر</span>
            </h3>
            <ul>
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
                    <label className="pr-2 w-full text-sm" htmlFor="samsung">
                      سامسونگ
                    </label>
                  </li>
                  <li className="w-full flex items-center hover:bg-gray-50 py-1">
                    <input
                      type="checkbox"
                      className="form-checkbox rounded w-4 focus:ring-orange-500 text-orange-500"
                      id="shiaomi"
                    />
                    <label className="pr-2 w-full text-sm" htmlFor="shiaomi">
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

              <li
                onClick={(e) => handleGrouping("3")}
                className={`flex cursor-pointer mb-2`}
                name="smartWatch"
              >
                <div className="w-4 h-4 rounded-full bg-gray-300">
                  <HiOutlineCreditCard className="w-4 h-4 mr-[5px] mt-[5px]" />
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="mr-3">محدودیت قیمت</p>
                  <HiChevronDown />
                </div>
              </li>
            </ul>
            <hr />
          </div>
        </div>

        {/* Filter and Sort mobile section (( Desktop )) */}
        <div className="bg-white hidden md:block col-span-9 xl:col-span-10 px-2 rounded-md">
          <div className="flex items-center h-full">
            <div className="bg-orange-200 p-2 rounded-md">
              <HiOutlineSortDescending className="w-7 h-7 font-light stroke-orange-600" />
            </div>
            <button
              onClick={(e) => handleSort(e)}
              name="1"
              className={`px-2 py-1 mx-2 relative ${
                sortWith === "1" ? "" : "text-gray-400"
              }`}
            >
              محبوب ترین
              <span
                className={`w-1 h-1 rounded-full bg-orange-400 absolute top-1 left-0 ${
                  sortWith === "1" ? "block" : "hidden"
                }`}
              ></span>
            </button>
            <button
              onClick={(e) => handleSort(e)}
              name="2"
              className={`px-2 py-1 mx-2 relative ${
                sortWith === "2" ? "" : "text-gray-400"
              }`}
            >
              پربازدید ترین
              <span
                className={`w-1 h-1 rounded-full bg-orange-400 absolute top-1 left-0 ${
                  sortWith === "2" ? "block" : "hidden"
                }`}
              ></span>
            </button>
            <button
              onClick={(e) => handleSort(e)}
              name="3"
              className={`px-2 py-1 mx-2 relative ${
                sortWith === "3" ? "" : "text-gray-400"
              }`}
            >
              گران ترین
              <span
                className={`w-1 h-1 rounded-full bg-orange-400 absolute top-1 left-0 ${
                  sortWith === "3" ? "block" : "hidden"
                }`}
              ></span>
            </button>
            <button
              onClick={(e) => handleSort(e)}
              name="4"
              className={`px-2 py-1 mx-2 relative ${
                sortWith === "4" ? "" : "text-gray-400"
              }`}
            >
              ارزان ترین
              <span
                className={`w-1 h-1 rounded-full bg-orange-400 absolute top-1 left-0 ${
                  sortWith === "4" ? "block" : "hidden"
                }`}
              ></span>
            </button>
          </div>
        </div>

        {/* Products Section (( Desktop )) */}
        <section className="md:px-0 col-span-12 row-span-full md:row-auto md:col-span-9 xl:col-span-10  mb-16">
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <div
                className="bg-white rounded-lg shadow-md p-1 sm:p-2"
                key={product.id}
              >
                <div className="bg-gray-400 min-h-[140px] rounded-lg relative">
                  <img className="" src={product.image} alt={product.title} />
                  <div
                    className="bg-[#ffffff42] p-1 inline-flex rounded-full absolute right-2 top-2 cursor-pointer"
                    onClick={(e) => handleLike(product)}
                  >
                    {product.liked ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 fill-red-500 transition-colors"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 stroke-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex flex-col my-2 sm:my-0 p-2">
                  <div className="my-1 mb-2 text-sm md:text-base flex items-center justify-between">
                    <div className="font-bold text-gray-300">اپل</div>
                    <div className="flex items-center">
                      {product.color.map((proColor) => {
                        return (
                          <div
                            key={proColor + Math.random() * 100}
                            onClick={(e) => handleSetColor(e, product)}
                            name={`${proColor}`}
                            className={`w-4 h-4 sm:w-5 sm:h-5 -mr-1 bg-${proColor} rounded-full flex items-center justify-center  ${
                              product.activeColor === `${proColor}` &&
                              `ring-2 ring-${proColor} ring-offset-2 `
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-3 w-3 text-white ${
                                product.activeColor === `${proColor}` && "block"
                              } ${
                                product.activeColor !== `${proColor}` &&
                                "hidden"
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="my-1 text-sm md:text-base">
                    {product.title}
                  </div>
                  <div className="mt-2 text-sm md:text-base self-end text-orange-500 font-bold">
                    {product.price} تومان
                  </div>
                </div>
                <hr />
                <div className="">
                  <button className="w-full text-orange-500 p-1 font-bold text-sm sm:text-base">
                    مشاهده و سفارش
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
