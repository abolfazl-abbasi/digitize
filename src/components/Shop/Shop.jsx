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
  HiOutlineSearch,
  HiOutlineRewind,
  HiOutlineArrowSmLeft,
  HiOutlineArrowSmRight,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineFilter,
  HiOutlineHeart,
  HiHeart,
  HiCheck,
  HiShoppingCart,
  HiHome,
  HiOutlineViewGrid,
  HiOutlineShoppingCart,
  HiViewGrid,
} from "react-icons/hi";
import React, { useState } from "react";
import Products from "../../data/products";
import "./../../App/App.css";
import { digitsEnToAr, addCommas } from "@persian-tools/persian-tools";
import { Link } from "react-router-dom";

function ShopPage() {
  const [products, setProducts] = useState([...Products]);
  const [sortWith, setSortWith] = useState("");
  const [groupingWith, setGroupingWith] = useState("smartPhone");
  const [, setPriceRange] = useState();
  // const [filterWith, setFilterWith] = useState("");

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

  // const handleFilter = (e) => {
  //   setGroupingWith(e.currentTarget.attributes.name.value);
  // };

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

  const handlePriceRange = (e) => {
    setPriceRange(e.target.value);
  };

  return (
    <>
      {/* app bar (( Mobile )) */}
      <div className="container px-5 mx-auto">
        <header className="mt-5 md:hidden">
          <div className="flex items-center justify-between">
            <div>
              <svg
                className="w-12"
                viewBox="0 0 99 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.74402 1.40941V5.42118H4.73226V1.40941H8.74402ZM10.6852 12.9788C10.8577 12.9788 10.944 13.0651 10.944 13.2376V17.7412C10.944 17.9137 10.8577 18 10.6852 18H9.6499C9.37383 18 9.17539 17.9914 9.05461 17.9741C8.96834 19.182 8.71814 20.2086 8.30402 21.0541C7.8899 21.9169 7.22559 22.7106 6.31108 23.4353C5.41383 24.16 4.15422 24.9192 2.53226 25.7129L0.746376 21.7271C1.95422 21.0024 2.79971 20.4157 3.28285 19.9671C3.76598 19.5184 4.05932 19.0784 4.16285 18.6471C4.28363 18.2157 4.34402 17.5169 4.34402 16.5506V7.49177H9.10637V12.4094C9.10637 12.582 9.14951 12.72 9.23579 12.8235C9.33932 12.9271 9.47736 12.9788 9.6499 12.9788H10.6852ZM19.3572 12.7459C19.3572 13.6949 19.1243 14.5749 18.6584 15.3859C18.1925 16.1796 17.5627 16.818 16.769 17.3012C15.9752 17.7671 15.0952 18 14.129 18H10.6866C10.5141 18 10.4278 17.9137 10.4278 17.7412V13.2376C10.4278 13.0651 10.5141 12.9788 10.6866 12.9788H14.0772C14.2152 12.9788 14.336 12.9271 14.4396 12.8235C14.5431 12.72 14.5948 12.5906 14.5948 12.4353V6.76706H19.3572V12.7459ZM19.409 20.0706V24.0824H11.3854V20.0706H19.409ZM26.0939 18C25.1276 18 24.2476 17.7671 23.4539 17.3012C22.6602 16.818 22.0304 16.1796 21.5645 15.3859C21.0986 14.5749 20.8657 13.6949 20.8657 12.7459V0.322355H25.628V12.4353C25.628 12.6078 25.6711 12.7459 25.7574 12.8494C25.8609 12.9357 25.9904 12.9788 26.1457 12.9788H27.7245C27.897 12.9788 27.9833 13.0651 27.9833 13.2376V17.7412C27.9833 17.9137 27.897 18 27.7245 18H26.0939ZM35.7977 0.684708V4.69647H27.7742V0.684708H35.7977ZM31.0354 6.76706H35.7977V12.7459C35.7977 13.6949 35.5648 14.5749 35.0989 15.3859C34.633 16.1796 34.0032 16.818 33.2095 17.3012C32.4158 17.7671 31.5358 18 30.5695 18H27.7225C27.5499 18 27.4636 17.9137 27.4636 17.7412V13.2376C27.4636 13.0651 27.5499 12.9788 27.7225 12.9788H30.5177C30.6558 12.9788 30.7766 12.9271 30.8801 12.8235C30.9836 12.72 31.0354 12.5906 31.0354 12.4353V6.76706Z"
                  fill="#222F5D"
                />
                <path
                  d="M56.7374 12.9788C56.9099 12.9788 56.9962 13.0651 56.9962 13.2376V17.7412C56.9962 17.9137 56.9099 18 56.7374 18H56.0127C56.0472 18.3106 56.0644 18.5435 56.0644 18.6988C56.0644 19.7341 55.8056 20.6918 55.288 21.5718C54.7703 22.4518 54.0715 23.142 53.1915 23.6424C52.3115 24.16 51.3452 24.4188 50.2927 24.4188H44.1844C42.9076 24.4188 41.7256 24.0996 40.6386 23.4612C39.5515 22.8227 38.6888 21.96 38.0503 20.8729C37.4119 19.7859 37.0927 18.6039 37.0927 17.3271V10.4941H41.855V17.0682C41.855 17.7067 42.0793 18.2502 42.528 18.6988C42.9939 19.1647 43.546 19.3976 44.1844 19.3976H50.3703C50.5774 19.3976 50.7499 19.3286 50.888 19.1906C51.026 19.0525 51.095 18.8886 51.095 18.6988C51.095 18.509 51.026 18.3451 50.888 18.2071C50.7499 18.069 50.5774 18 50.3703 18H44.7021V12.9788H56.7374ZM56.739 18C56.5664 18 56.4802 17.9137 56.4802 17.7412V13.2376C56.4802 13.0651 56.5664 12.9788 56.739 12.9788H62.5366C63.71 12.9788 64.7108 12.6165 65.539 11.8918L67.5837 10.08L64.6072 8.63059C64.3657 8.52706 64.1759 8.47529 64.0378 8.47529C63.7272 8.47529 63.4166 8.61333 63.1061 8.88941L60.4143 11.8659L57.1013 8.96706L59.819 5.65412C60.3712 4.99843 61.0182 4.52392 61.7602 4.23059C62.5021 3.92 63.2441 3.76471 63.9861 3.76471C64.8488 3.76471 65.6684 3.97177 66.4449 4.38588L71.9837 6.97412C72.07 7.00863 72.139 7.02588 72.1908 7.02588C72.2598 7.02588 72.3115 7.02588 72.3461 7.02588H75.5296V11.6847H72.2166V12.4094C72.2166 12.582 72.2598 12.72 72.3461 12.8235C72.4496 12.9271 72.5876 12.9788 72.7602 12.9788H75.9955C76.168 12.9788 76.2543 13.0651 76.2543 13.2376V17.7412C76.2543 17.9137 76.168 18 75.9955 18H72.7602C71.7421 18 70.9053 17.7584 70.2496 17.2753C69.6111 16.7749 69.0849 16.0502 68.6708 15.1012L68.1531 15.6188C67.2904 16.3953 66.3155 16.9906 65.2284 17.4047C64.1413 17.8016 63.0284 18 61.8896 18H56.739ZM59.9484 20.0706H63.9602V24.0824H59.9484V20.0706ZM84.6697 12.7459C84.6697 13.6949 84.4367 14.5749 83.9709 15.3859C83.505 16.1796 82.8752 16.818 82.0815 17.3012C81.2877 17.7671 80.4077 18 79.4415 18H75.9991C75.8266 18 75.7403 17.9137 75.7403 17.7412V13.2376C75.7403 13.0651 75.8266 12.9788 75.9991 12.9788H79.3897C79.5277 12.9788 79.6485 12.9271 79.752 12.8235C79.8556 12.72 79.9073 12.5906 79.9073 12.4353V6.76706H84.6697V12.7459ZM84.7215 20.0706V24.0824H76.6979V20.0706H84.7215ZM93.037 12.9788C93.4856 12.9788 93.7099 12.7976 93.7099 12.4353C93.7099 12.2973 93.6581 12.1851 93.5546 12.0988C93.4511 11.9953 93.2095 11.8141 92.8299 11.5553L87.0064 7.54353L89.724 3.60941L96.324 8.19059C97.0315 8.74275 97.5664 9.32941 97.9287 9.95059C98.2911 10.5718 98.4723 11.3482 98.4723 12.28C98.4723 13.3671 98.2048 14.3506 97.6699 15.2306C97.1523 16.0933 96.4448 16.7749 95.5476 17.2753C94.6503 17.7584 93.6754 18 92.6228 18H86.1781V12.9788H93.037Z"
                  fill="#FF755C"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold">گوشی هوشمند</h1>
            <div className="bg-white p-1 rounded-md shadow-lg cursor-pointer">
              <HiOutlineSearch className="h-5 w-5" />
            </div>
          </div>
        </header>

        {/* Filter and Sort mobile section (( Mobile )) */}
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

      <header className="w-full bg-white shadow-md h-20 mb-6 sticky top-0 z-[9999] hidden md:flex">
        <div className="flex items-center justify-between container mx-auto">
          <div className="flex items-center justify-center">
            <div className="hidden lg:block ml-5">
              <svg
                width="99"
                height="26"
                viewBox="0 0 99 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.74402 1.40941V5.42118H4.73226V1.40941H8.74402ZM10.6852 12.9788C10.8577 12.9788 10.944 13.0651 10.944 13.2376V17.7412C10.944 17.9137 10.8577 18 10.6852 18H9.6499C9.37383 18 9.17539 17.9914 9.05461 17.9741C8.96834 19.182 8.71814 20.2086 8.30402 21.0541C7.8899 21.9169 7.22559 22.7106 6.31108 23.4353C5.41383 24.16 4.15422 24.9192 2.53226 25.7129L0.746376 21.7271C1.95422 21.0024 2.79971 20.4157 3.28285 19.9671C3.76598 19.5184 4.05932 19.0784 4.16285 18.6471C4.28363 18.2157 4.34402 17.5169 4.34402 16.5506V7.49177H9.10637V12.4094C9.10637 12.582 9.14951 12.72 9.23579 12.8235C9.33932 12.9271 9.47736 12.9788 9.6499 12.9788H10.6852ZM19.3572 12.7459C19.3572 13.6949 19.1243 14.5749 18.6584 15.3859C18.1925 16.1796 17.5627 16.818 16.769 17.3012C15.9752 17.7671 15.0952 18 14.129 18H10.6866C10.5141 18 10.4278 17.9137 10.4278 17.7412V13.2376C10.4278 13.0651 10.5141 12.9788 10.6866 12.9788H14.0772C14.2152 12.9788 14.336 12.9271 14.4396 12.8235C14.5431 12.72 14.5948 12.5906 14.5948 12.4353V6.76706H19.3572V12.7459ZM19.409 20.0706V24.0824H11.3854V20.0706H19.409ZM26.0939 18C25.1276 18 24.2476 17.7671 23.4539 17.3012C22.6602 16.818 22.0304 16.1796 21.5645 15.3859C21.0986 14.5749 20.8657 13.6949 20.8657 12.7459V0.322355H25.628V12.4353C25.628 12.6078 25.6711 12.7459 25.7574 12.8494C25.8609 12.9357 25.9904 12.9788 26.1457 12.9788H27.7245C27.897 12.9788 27.9833 13.0651 27.9833 13.2376V17.7412C27.9833 17.9137 27.897 18 27.7245 18H26.0939ZM35.7977 0.684708V4.69647H27.7742V0.684708H35.7977ZM31.0354 6.76706H35.7977V12.7459C35.7977 13.6949 35.5648 14.5749 35.0989 15.3859C34.633 16.1796 34.0032 16.818 33.2095 17.3012C32.4158 17.7671 31.5358 18 30.5695 18H27.7225C27.5499 18 27.4636 17.9137 27.4636 17.7412V13.2376C27.4636 13.0651 27.5499 12.9788 27.7225 12.9788H30.5177C30.6558 12.9788 30.7766 12.9271 30.8801 12.8235C30.9836 12.72 31.0354 12.5906 31.0354 12.4353V6.76706Z"
                  fill="#222F5D"
                />
                <path
                  d="M56.7374 12.9788C56.9099 12.9788 56.9962 13.0651 56.9962 13.2376V17.7412C56.9962 17.9137 56.9099 18 56.7374 18H56.0127C56.0472 18.3106 56.0644 18.5435 56.0644 18.6988C56.0644 19.7341 55.8056 20.6918 55.288 21.5718C54.7703 22.4518 54.0715 23.142 53.1915 23.6424C52.3115 24.16 51.3452 24.4188 50.2927 24.4188H44.1844C42.9076 24.4188 41.7256 24.0996 40.6386 23.4612C39.5515 22.8227 38.6888 21.96 38.0503 20.8729C37.4119 19.7859 37.0927 18.6039 37.0927 17.3271V10.4941H41.855V17.0682C41.855 17.7067 42.0793 18.2502 42.528 18.6988C42.9939 19.1647 43.546 19.3976 44.1844 19.3976H50.3703C50.5774 19.3976 50.7499 19.3286 50.888 19.1906C51.026 19.0525 51.095 18.8886 51.095 18.6988C51.095 18.509 51.026 18.3451 50.888 18.2071C50.7499 18.069 50.5774 18 50.3703 18H44.7021V12.9788H56.7374ZM56.739 18C56.5664 18 56.4802 17.9137 56.4802 17.7412V13.2376C56.4802 13.0651 56.5664 12.9788 56.739 12.9788H62.5366C63.71 12.9788 64.7108 12.6165 65.539 11.8918L67.5837 10.08L64.6072 8.63059C64.3657 8.52706 64.1759 8.47529 64.0378 8.47529C63.7272 8.47529 63.4166 8.61333 63.1061 8.88941L60.4143 11.8659L57.1013 8.96706L59.819 5.65412C60.3712 4.99843 61.0182 4.52392 61.7602 4.23059C62.5021 3.92 63.2441 3.76471 63.9861 3.76471C64.8488 3.76471 65.6684 3.97177 66.4449 4.38588L71.9837 6.97412C72.07 7.00863 72.139 7.02588 72.1908 7.02588C72.2598 7.02588 72.3115 7.02588 72.3461 7.02588H75.5296V11.6847H72.2166V12.4094C72.2166 12.582 72.2598 12.72 72.3461 12.8235C72.4496 12.9271 72.5876 12.9788 72.7602 12.9788H75.9955C76.168 12.9788 76.2543 13.0651 76.2543 13.2376V17.7412C76.2543 17.9137 76.168 18 75.9955 18H72.7602C71.7421 18 70.9053 17.7584 70.2496 17.2753C69.6111 16.7749 69.0849 16.0502 68.6708 15.1012L68.1531 15.6188C67.2904 16.3953 66.3155 16.9906 65.2284 17.4047C64.1413 17.8016 63.0284 18 61.8896 18H56.739ZM59.9484 20.0706H63.9602V24.0824H59.9484V20.0706ZM84.6697 12.7459C84.6697 13.6949 84.4367 14.5749 83.9709 15.3859C83.505 16.1796 82.8752 16.818 82.0815 17.3012C81.2877 17.7671 80.4077 18 79.4415 18H75.9991C75.8266 18 75.7403 17.9137 75.7403 17.7412V13.2376C75.7403 13.0651 75.8266 12.9788 75.9991 12.9788H79.3897C79.5277 12.9788 79.6485 12.9271 79.752 12.8235C79.8556 12.72 79.9073 12.5906 79.9073 12.4353V6.76706H84.6697V12.7459ZM84.7215 20.0706V24.0824H76.6979V20.0706H84.7215ZM93.037 12.9788C93.4856 12.9788 93.7099 12.7976 93.7099 12.4353C93.7099 12.2973 93.6581 12.1851 93.5546 12.0988C93.4511 11.9953 93.2095 11.8141 92.8299 11.5553L87.0064 7.54353L89.724 3.60941L96.324 8.19059C97.0315 8.74275 97.5664 9.32941 97.9287 9.95059C98.2911 10.5718 98.4723 11.3482 98.4723 12.28C98.4723 13.3671 98.2048 14.3506 97.6699 15.2306C97.1523 16.0933 96.4448 16.7749 95.5476 17.2753C94.6503 17.7584 93.6754 18 92.6228 18H86.1781V12.9788H93.037Z"
                  fill="#FF755C"
                />
              </svg>
            </div>
            <nav>
              <ul className="flex items-center mr-6">
                <li
                  className={`mx-1 px-3 py-1 rounded text-lg hover:bg-gray-100 transition-all duration-200 ${
                    location.pathname === "/"
                      ? "font-bold"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <a href="##">خانه</a>
                </li>
                <li
                  className={`mx-1 px-3 py-1 rounded text-lg hover:bg-gray-100 transition-all duration-200 ${
                    location.pathname === ""
                      ? "font-bold"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <a href="##">دسته بندی ها</a>
                </li>
                <li
                  className={`mx-1 px-3 py-1 rounded text-lg hover:bg-gray-100 transition-all duration-200 ${
                    location.pathname === ""
                      ? "font-bold"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <a href="##">سبد خرید</a>
                </li>
                <li
                  className={`mx-1 px-3 py-1 rounded text-lg hover:bg-gray-100 transition-all duration-200 ${
                    location.pathname === ""
                      ? "font-bold"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <a href="##">موردعلاقه ها</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="w-[40%] flex items-center justify-end">
            <label className="bg-stone-100 outline-none py-2 px-2 flex items-center justify-center">
              <HiOutlineSearch className="w-5 h-5" />
            </label>
            <input
              type="search"
              className="bg-stone-100 w-full  outline-none py-[6px] px-2 placeholder:text-gray-400"
              placeholder="جستجوی نام محصول , نام برند و ..."
            />
          </div>
        </div>
      </header>

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
                  onClick={(e) => handleGrouping(e)}
                  name="smartPhone"
                  className={`flex cursor-pointer py-1 px-2 rounded-md mb-1  ${
                    groupingWith === "smartPhone"
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
                  onClick={(e) => handleGrouping(e)}
                  className={`flex cursor-pointer py-1 px-2 rounded-md mb-1  ${
                    groupingWith === "laptop"
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
                  onClick={(e) => handleGrouping(e)}
                  className={`flex cursor-pointer py-1 px-2 rounded-md mb-1  ${
                    groupingWith === "smartWatch"
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
              <h3 className="text-orange-500 font-bold mb-3 text-lg">فیلتر</h3>
              <ul>
                {/* Brand */}
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
                          min={10000}
                          max={1000000}
                          onChange={(e) => handlePriceRange(e)}
                          name="priceRange"
                          id="black"
                          className="w-full caret-orange-500 appearance-none h-[5px] my-2 rounded-md bg-orange-400 PriceRange"
                        />
                        <div className="flex items-center justify-between">
                          <span>min</span>
                          <span>max</span>
                        </div>
                      </label>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-xl shadow-md h-44 my-4 flex items-center justify-center bg-orange-500">
            <img
              src={require("./../../assets/img/Cart/1.png")}
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
        <section className="md:px-0 px-5 col-span-12 row-span-full md:row-auto md:col-span-9 xl:col-span-10 mb-16">
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <section
                className="bg-white rounded-lg shadow-md p-1 sm:p-2 block"
                key={product.id}
              >
                <div className="bg-gray-400 min-h-[140px] rounded-lg relative flex items-center justify-center overflow-hidden">
                  <Link
                    to={{ pathname: "/product" }}
                    className="flex items-center justify-center w-full"
                  >
                    <img
                      className="w-3/4"
                      src={product.image}
                      alt={product.title}
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
                            <HiCheck
                              className={`h-3 w-3 text-white ${
                                product.activeColor === `${proColor}` && "block"
                              } ${
                                product.activeColor !== `${proColor}` &&
                                "hidden"
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="my-1 text-sm md:text-base">
                    {product.title}
                  </div>
                  <div className="mt-2 text-sm md:text-base self-end text-orange-500 font-bold">
                    {digitsEnToAr(addCommas(product.price))} تومان
                  </div>
                </div>
                <hr />
                <Link to={{ pathname: "/product" }} className="">
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

      {/* Footer */}
      <footer className="bg-white pb-4 sm:pb-0">
        <div className="container mx-auto flex items-center flex-col sm:flex-row">
          <div className="flex flex-col my-12  w-3/4">
            <div className="flex items-center">
              <svg
                className="w-32"
                viewBox="0 0 99 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.74402 1.40941V5.42118H4.73226V1.40941H8.74402ZM10.6852 12.9788C10.8577 12.9788 10.944 13.0651 10.944 13.2376V17.7412C10.944 17.9137 10.8577 18 10.6852 18H9.6499C9.37383 18 9.17539 17.9914 9.05461 17.9741C8.96834 19.182 8.71814 20.2086 8.30402 21.0541C7.8899 21.9169 7.22559 22.7106 6.31108 23.4353C5.41383 24.16 4.15422 24.9192 2.53226 25.7129L0.746376 21.7271C1.95422 21.0024 2.79971 20.4157 3.28285 19.9671C3.76598 19.5184 4.05932 19.0784 4.16285 18.6471C4.28363 18.2157 4.34402 17.5169 4.34402 16.5506V7.49177H9.10637V12.4094C9.10637 12.582 9.14951 12.72 9.23579 12.8235C9.33932 12.9271 9.47736 12.9788 9.6499 12.9788H10.6852ZM19.3572 12.7459C19.3572 13.6949 19.1243 14.5749 18.6584 15.3859C18.1925 16.1796 17.5627 16.818 16.769 17.3012C15.9752 17.7671 15.0952 18 14.129 18H10.6866C10.5141 18 10.4278 17.9137 10.4278 17.7412V13.2376C10.4278 13.0651 10.5141 12.9788 10.6866 12.9788H14.0772C14.2152 12.9788 14.336 12.9271 14.4396 12.8235C14.5431 12.72 14.5948 12.5906 14.5948 12.4353V6.76706H19.3572V12.7459ZM19.409 20.0706V24.0824H11.3854V20.0706H19.409ZM26.0939 18C25.1276 18 24.2476 17.7671 23.4539 17.3012C22.6602 16.818 22.0304 16.1796 21.5645 15.3859C21.0986 14.5749 20.8657 13.6949 20.8657 12.7459V0.322355H25.628V12.4353C25.628 12.6078 25.6711 12.7459 25.7574 12.8494C25.8609 12.9357 25.9904 12.9788 26.1457 12.9788H27.7245C27.897 12.9788 27.9833 13.0651 27.9833 13.2376V17.7412C27.9833 17.9137 27.897 18 27.7245 18H26.0939ZM35.7977 0.684708V4.69647H27.7742V0.684708H35.7977ZM31.0354 6.76706H35.7977V12.7459C35.7977 13.6949 35.5648 14.5749 35.0989 15.3859C34.633 16.1796 34.0032 16.818 33.2095 17.3012C32.4158 17.7671 31.5358 18 30.5695 18H27.7225C27.5499 18 27.4636 17.9137 27.4636 17.7412V13.2376C27.4636 13.0651 27.5499 12.9788 27.7225 12.9788H30.5177C30.6558 12.9788 30.7766 12.9271 30.8801 12.8235C30.9836 12.72 31.0354 12.5906 31.0354 12.4353V6.76706Z"
                  fill="#222F5D"
                />
                <path
                  d="M56.7374 12.9788C56.9099 12.9788 56.9962 13.0651 56.9962 13.2376V17.7412C56.9962 17.9137 56.9099 18 56.7374 18H56.0127C56.0472 18.3106 56.0644 18.5435 56.0644 18.6988C56.0644 19.7341 55.8056 20.6918 55.288 21.5718C54.7703 22.4518 54.0715 23.142 53.1915 23.6424C52.3115 24.16 51.3452 24.4188 50.2927 24.4188H44.1844C42.9076 24.4188 41.7256 24.0996 40.6386 23.4612C39.5515 22.8227 38.6888 21.96 38.0503 20.8729C37.4119 19.7859 37.0927 18.6039 37.0927 17.3271V10.4941H41.855V17.0682C41.855 17.7067 42.0793 18.2502 42.528 18.6988C42.9939 19.1647 43.546 19.3976 44.1844 19.3976H50.3703C50.5774 19.3976 50.7499 19.3286 50.888 19.1906C51.026 19.0525 51.095 18.8886 51.095 18.6988C51.095 18.509 51.026 18.3451 50.888 18.2071C50.7499 18.069 50.5774 18 50.3703 18H44.7021V12.9788H56.7374ZM56.739 18C56.5664 18 56.4802 17.9137 56.4802 17.7412V13.2376C56.4802 13.0651 56.5664 12.9788 56.739 12.9788H62.5366C63.71 12.9788 64.7108 12.6165 65.539 11.8918L67.5837 10.08L64.6072 8.63059C64.3657 8.52706 64.1759 8.47529 64.0378 8.47529C63.7272 8.47529 63.4166 8.61333 63.1061 8.88941L60.4143 11.8659L57.1013 8.96706L59.819 5.65412C60.3712 4.99843 61.0182 4.52392 61.7602 4.23059C62.5021 3.92 63.2441 3.76471 63.9861 3.76471C64.8488 3.76471 65.6684 3.97177 66.4449 4.38588L71.9837 6.97412C72.07 7.00863 72.139 7.02588 72.1908 7.02588C72.2598 7.02588 72.3115 7.02588 72.3461 7.02588H75.5296V11.6847H72.2166V12.4094C72.2166 12.582 72.2598 12.72 72.3461 12.8235C72.4496 12.9271 72.5876 12.9788 72.7602 12.9788H75.9955C76.168 12.9788 76.2543 13.0651 76.2543 13.2376V17.7412C76.2543 17.9137 76.168 18 75.9955 18H72.7602C71.7421 18 70.9053 17.7584 70.2496 17.2753C69.6111 16.7749 69.0849 16.0502 68.6708 15.1012L68.1531 15.6188C67.2904 16.3953 66.3155 16.9906 65.2284 17.4047C64.1413 17.8016 63.0284 18 61.8896 18H56.739ZM59.9484 20.0706H63.9602V24.0824H59.9484V20.0706ZM84.6697 12.7459C84.6697 13.6949 84.4367 14.5749 83.9709 15.3859C83.505 16.1796 82.8752 16.818 82.0815 17.3012C81.2877 17.7671 80.4077 18 79.4415 18H75.9991C75.8266 18 75.7403 17.9137 75.7403 17.7412V13.2376C75.7403 13.0651 75.8266 12.9788 75.9991 12.9788H79.3897C79.5277 12.9788 79.6485 12.9271 79.752 12.8235C79.8556 12.72 79.9073 12.5906 79.9073 12.4353V6.76706H84.6697V12.7459ZM84.7215 20.0706V24.0824H76.6979V20.0706H84.7215ZM93.037 12.9788C93.4856 12.9788 93.7099 12.7976 93.7099 12.4353C93.7099 12.2973 93.6581 12.1851 93.5546 12.0988C93.4511 11.9953 93.2095 11.8141 92.8299 11.5553L87.0064 7.54353L89.724 3.60941L96.324 8.19059C97.0315 8.74275 97.5664 9.32941 97.9287 9.95059C98.2911 10.5718 98.4723 11.3482 98.4723 12.28C98.4723 13.3671 98.2048 14.3506 97.6699 15.2306C97.1523 16.0933 96.4448 16.7749 95.5476 17.2753C94.6503 17.7584 93.6754 18 92.6228 18H86.1781V12.9788H93.037Z"
                  fill="#FF755C"
                />
              </svg>
              <div className="w-12 h-1 bg-orange-500 rounded-xl mr-4"></div>
            </div>
            <div className="flex justify-between mt-8">
              <div className="text-lg sm:w-2/3 w-full leading-8">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
              </div>
              <div className="hidden lg:flex w-48">
                <ul>
                  <li className="mb-6 font-bold text-xl text-orange-500">
                    محصولات
                  </li>
                  <li className="my-4 footer-list">
                    <a href="##">تلفن همراه</a>
                  </li>
                  <li className="my-4 footer-list">
                    <a href="##">لپ تاپ</a>
                  </li>
                  <li className="my-4 footer-list">
                    <a href="##">ساعت هوشمند</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:w-1/4 items-end mt-3 w-full">
            <div className="">
              <img
                className="sm:w-48 sm:h-48 w-full px-2 sm:px-0 rounded-xl"
                src={require("./../../assets/img/Footer.jpg")}
                alt="map"
              />
            </div>
            <div className="flex sm:flex-col justify-around w-full items-end mt-6 gap-2 ">
              <a
                href="tel:021-123456"
                className="flex items-center text-gray-600"
              >
                <div>021-123456</div>
                <div>
                  <HiOutlinePhone className="w-6 h-6 mr-3" />
                </div>
              </a>
              <a
                href="mailto:abolcostom99@gmail.com"
                className="flex items-center text-gray-600"
              >
                <div>support@info.com</div>
                <div>
                  <HiOutlineMail className="w-6 h-6 mr-3" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Navigator (( Mobile )) */}
      <div className="bg-white shadow-2xl px-5 z-50 sticky bottom-0 left-0 w-full h-16 flex md:hidden items-center justify-between rounded-t-lg">
        <div className="flex items-center justify-between w-full container mx-auto">
          <a href="/">
            {location.pathname !== "/" ? (
              <HiOutlineHome className="h-8 w-8 stroke-gray-400" />
            ) : (
              <HiHome className="h-10 w-10 pl-2" />
            )}
          </a>
          <a href="/list">
            {location.pathname !== "/list" ? (
              <HiOutlineViewGrid className="h-8 w-8 stroke-gray-400" />
            ) : (
              <HiViewGrid className="h-10 w-10 pl-2" />
            )}
          </a>
          <a href="/cart">
            {location.pathname !== "/cart" ? (
              <HiOutlineShoppingCart className="h-8 w-8 stroke-gray-400" />
            ) : (
              <HiShoppingCart className="h-10 w-10 pl-2" />
            )}
          </a>
          <a href="/favorite">
            {location.pathname !== "/favorite" ? (
              <HiOutlineHeart className="h-8 w-8 stroke-gray-400" />
            ) : (
              <HiHeart className="h-10 w-10 pl-2 fill-red-500" />
            )}
          </a>
        </div>
      </div>
    </>
  );
}

export default ShopPage;