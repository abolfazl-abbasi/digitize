import React, { useState } from "react";
import {
  HiOutlineDeviceMobile,
  HiChevronDown,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineX,
  HiOutlineDesktopComputer,
} from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Products from "../data/products";
import { digitsEnToAr, addCommas } from "@persian-tools/persian-tools";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import SelectColor from "../components/SelectColor";
import Layout from "../Layouts/MainLayout";
import { useCart, useCartDispatcher } from "../Providers/CartProvider";

function Product() {
  const par = useParams();
  const [index] = useState(par.id - 1);
  const [products, setProducts] = useState([...Products]);
  const [isShow, setIsShow] = useState(false);
  const [groupingWith, setGroupingWith] = useState("smartPhone");
  const cart = useCart();
  const { handleAddToCart_FC } = useCartDispatcher();

  const handleShowSlider = () => {
    if (!isShow) {
      setIsShow(true);
      document.body.classList.add("md:overflow-visible");
      document.body.classList.add("overflow-hidden");
    } else {
      setIsShow(false);
      document.body.classList.remove("md:overflow-visible");
      document.body.classList.remove("overflow-hidden");
    }
  };

  const handleGrouping = (e) => {
    setGroupingWith(e.currentTarget.attributes.name.value);
  };

  const handleSetColor = (e, product) => {
    const name = e.target.attributes.name.value;
    const updateProducts = [...products];
    const index = products.indexOf(product);
    updateProducts[index] = { ...product };
    updateProducts[index].activeColor = name;
    setProducts([...updateProducts]);
  };

  return (
    <>
      <Layout title={products[index].titleFa}>
        {/* BradCrumb (( Desktop )) */}
        <section className="mt-5 md:hidden">
          <div className="container mx-auto flex items-center text-[10px] font-bold px-6">
            <Link to={{ pathname: "/" }} className="text-orange-500">
              خانه
            </Link>
            <HiChevronDown className="h-3 w-3 mx-2 rotate-90" />
            <Link to={{ pathname: "/" }} className="text-orange-500">
              گوشی هوشمند
            </Link>
            <HiChevronDown className="h-3 w-3 mx-2 rotate-90" />
            <span>آیفون 13 pro max</span>
          </div>
        </section>

        {/* App Main Section (( Desktop && Mobile )) */}
        <section className="grid grid-cols-12 grid-rows-[55px_minmax(500px,_1fr)] md:gap-6 container mx-auto">
          {/* AppBar */}
          <section className="hidden md:block col-span-3 xl:col-span-2 row-span-2">
            <div className="hidden md:block col-span-3 xl:col-span-2 row-span-2">
              <div className="bg-white py-5 h-52 sticky top-52 z-20 rounded-xl shadow-md p-2">
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
                </div>
              </div>
            </div>
          </section>

          {/* BradCrumb (( Desktop )) */}
          <section className="hidden md:flex col-span-9 xl:col-span-10 px-2 rounded-md items-center bg-white shadow-sm">
            <div className="container mx-auto flex items-center font-bold px-6">
              <Link to={{ pathname: "/" }} className="text-orange-500">
                خانه
              </Link>
              <HiChevronDown className="h-3 w-3 mx-2 rotate-90" />
              <Link to={{ pathname: "/" }} className="text-orange-500">
                گوشی هوشمند
              </Link>
              <HiChevronDown className="h-3 w-3 mx-2 rotate-90" />
              <span>آیفون 13 pro max</span>
            </div>
          </section>

          {/* App Main section (( Mobile )) */}
          <section className="lg:bg-gray-50 rounded-lg py-3 px-5 col-span-12 row-span-full md:row-auto md:col-span-9 xl:col-span-10 my-6 md:my-0 overflow-hidden">
            <div className="flex flex-col lg:items-start items-center justify-center container mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-start items-center justify-between container mx-auto lg:mx-0">
                <div className="flex flex-col lg:flex-row lg:items-start items-center container mx-auto lg:mx-0">
                  {/* Slider (( Desktop )) */}
                  <div className="flex items-center lg:self-start xl:ml-12">
                    <div className="flex items-center justify-center w-full flex-col">
                      <Swiper
                        onClick={handleShowSlider}
                        modules={[Navigation]}
                        className="w-screen lg:w-[200px] h-1/4 flex items-center justify-center"
                        id="swiper"
                      >
                        {products[index].images.map((image) => (
                          <SwiperSlide
                            className="flex items-center justify-center"
                            key={
                              products[index].images.indexOf(image).toString() +
                              Math.random().toString(32)
                            }
                          >
                            <img
                              src={image}
                              className="w-2/5 sm:w-1/4 lg:w-[700px]"
                              alt={products[index].titleEn}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <div className="hidden lg:flex items-center px-4 lg:px-0 py-2 overflow-y-hidden lg:w-48 lg:h-20 slider-scroller">
                        {products[index].images.map((image) => (
                          <div
                            key={
                              products[index].images.indexOf(image).toString() +
                              Math.random().toString(32)
                            }
                            onClick={() =>
                              document
                                .getElementById("swiper")
                                .swiper.slideTo(
                                  products[index].images.indexOf(image)
                                )
                            }
                            className="border-1 flex items-center ml-8 lg:ml-4 justify-center border-2 border-gray-400 p-1 rounded-lg flex-shrink-0"
                          >
                            <img
                              src={image}
                              className="w-10"
                              alt={`${products[index].titleEn}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="w-60">
                    {/* Product Titles */}
                    <div className="flex flex-col items-center lg:items-start text-center my-10 lg:my-5 gap-1">
                      <h1 className="text-lg font-bold">
                        {products[index].titleFa}
                      </h1>
                      <p className="text-sm text-gray-600 font-light">
                        {products[index].titleEn}
                      </p>
                    </div>

                    <hr className="hidden lg:block" />

                    {/* Select Color */}
                    <div className="flex items-center justify-around md:justify-between md:my-5">
                      <span className="text-sm text-gray-600">
                        انتخاب رنگ :
                      </span>

                      <SelectColor
                        product={products[index]}
                        onSetColor={handleSetColor}
                      />
                    </div>
                    <hr className="hidden lg:block" />

                    {/* Product Properties (( Desktop )) */}
                    <div className="w-full hidden px-3 rounded-lg lg:block lg:my-5">
                      <h2 className="mb-1">ویژگی ها : </h2>
                      <ul className="gap-2 flex flex-col">
                        <li className="flex gap-x-4 text-sm flex-col">
                          <span className="propertyList text-sm text-gray-600">
                            حافظه داخلی :
                          </span>
                          <span className="text-gray-500 mr-8">
                            {products[index].properties.memory}
                          </span>
                        </li>
                        <li className="flex gap-x-4 text-sm flex-col">
                          <span className="propertyList text-sm text-gray-600">
                            اندازه صفحه نمایش :
                          </span>
                          <span className="text-gray-500 mr-8">
                            {products[index].properties.resolution} اینچ
                          </span>
                        </li>

                        <li className="flex gap-x-4 text-sm flex-col">
                          <span className="propertyList text-sm text-gray-600">
                            شبکه ها :
                          </span>
                          <span className="text-gray-500 mr-8">
                            {products[index].properties.networks.map((net) => (
                              <p
                                className="inline-block ml-2"
                                key={products[
                                  index
                                ].properties.networks.indexOf(net)}
                              >
                                {net}
                              </p>
                            ))}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Slider (( Mobile )) */}
                  <div
                    className={`items-center flex-col z-50 ${
                      !isShow ? "hidden" : "flex"
                    } md:hidden`}
                  >
                    <div className="flex justify-center fixed w-screen h-screen bg-white top-0 overflow-hidden">
                      <button
                        className="flex items-center justify-center absolute z-[9999] w-6 h-6 rounded-full bg-orange-100 top-4 right-4"
                        onClick={handleShowSlider}
                      >
                        <HiOutlineX />
                      </button>
                      <Swiper
                        modules={[Navigation]}
                        className="w-screen h-4/5 flex items-center justify-center"
                        id="swiper2"
                      >
                        {products[index].images.map((image) => (
                          <SwiperSlide
                            className="flex items-center justify-center"
                            key={
                              products[index].images.indexOf(image).toString() +
                              Math.random().toString(32)
                            }
                          >
                            <img
                              src={image}
                              className="w-72"
                              alt={`${products[index].titleEn}`}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <div className="flex items-center px-4 py-2 overflow-auto fixed bottom-0">
                        {products[index].images.map((image) => (
                          <div
                            key={
                              products[index].images.indexOf(image).toString() +
                              Math.random().toString(32)
                            }
                            onClick={() =>
                              document
                                .getElementById("swiper2")
                                .swiper.slideTo(
                                  products[index].images.indexOf(image)
                                )
                            }
                            className="ring-1 flex items-center ml-8 lg:mx-2 justify-center border-2 border-gray-400 p-2 rounded-lg w-1/4 sm:w-1/5 flex-shrink-0"
                          >
                            <img
                              src={image}
                              className="w-32"
                              alt={`${products[index].titleEn}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center flex-wrap justify-center my-6 lg:my-4 lg:w-60 lg:bg-white px-2 py-3 rounded-lg lg:shadow-lg">
                    {/* Services (( Mobile && desktop )) */}
                    <div className="flex items-center flex-wrap justify-center">
                      <div className="flex text-gray-700 items-center my-2 mx-1">
                        <div className="w-4 h-4 rounded-full bg-gray-300 mx-2">
                          <HiOutlineDeviceMobile className="w-4 h-4 mr-[5px] mt-[5px]" />
                        </div>
                        <span className="text-xs mx-1 font-light">
                          فروشنده :
                        </span>
                        <span className="text-xs font-bold mx-1">
                          {products[index].services.seller}
                        </span>
                      </div>
                      <div className="flex text-gray-700 items-center my-2 mx-1">
                        <div className="w-4 h-4 rounded-full bg-gray-300 mx-2">
                          <HiOutlineShieldCheck className="w-4 h-4 mr-[5px] mt-[5px]" />
                        </div>
                        <span className="text-xs mx-1 font-light">
                          گارانتی :
                        </span>
                        <span className="text-xs font-bold mx-1">
                          {products[index].services.warranty}
                        </span>
                      </div>
                      <div className="flex text-gray-700 items-center my-2 mx-1">
                        <div className="w-4 h-4 rounded-full bg-gray-300 mx-2">
                          <HiOutlineTruck className="w-4 h-4 mr-[5px] mt-[5px]" />
                        </div>
                        <span className="text-xs mx-1 font-light">
                          ارسال توسط :
                        </span>
                        <span className="text-xs font-bold mx-1">
                          {products[index].services.postedBy}
                        </span>
                      </div>
                    </div>

                    {/* Add To Cart and Price (( Desktop )) */}
                    <div className="hidden lg:flex items-center justify-between gap-x-4 mt-8">
                      {cart
                        .map((pro) => pro.id === products[index].id)
                        .indexOf(true) !== -1 ? (
                        <button className="bg-orange-500 p-2 rounded-md text-white">
                          اضافه شد!
                        </button>
                      ) : (
                        <button
                          onClick={(e) => handleAddToCart_FC(products[index])}
                          className="bg-orange-500 p-2 rounded-md text-white"
                        >
                          افزودن به سبد
                        </button>
                      )}
                      <span className="text-orange-500 flex flex-col justify-center items-center text-sm font-bold">
                        <span>
                          {digitsEnToAr(addCommas(products[index].price))}
                        </span>
                        <span>تومان</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {/* Product Properties (( Mobile )) */}
                <div className="w-full bg-white px-3 py-2 rounded-lg lg:hidden">
                  <h2 className="mb-2">ویژگی ها : </h2>
                  <ul className="gap-2 flex flex-col">
                    <li className="flex gap-x-4 text-sm flex-col my-2">
                      <span className="propertyList text-sm text-gray-600">
                        حافظه داخلی :
                      </span>
                      <span className="text-gray-500 mr-8 mt-1">
                        {products[index].properties.memory}
                      </span>
                    </li>
                    <hr />
                    <li className="flex gap-x-4 text-sm flex-col my-2">
                      <span className="propertyList text-sm text-gray-600">
                        اندازه صفحه نمایش :
                      </span>
                      <span className="text-gray-500 mr-8 mt-1">
                        {products[index].properties.resolution} اینچ
                      </span>
                    </li>
                    <hr />
                    <li className="flex gap-x-4 text-sm flex-col my-2">
                      <span className="propertyList text-sm text-gray-600">
                        شبکه ها :
                      </span>
                      <span className="text-gray-500 mr-8 mt-1">
                        {products[index].properties.networks.map((net) => (
                          <p
                            className="inline-block ml-2"
                            key={products[index].properties.networks.indexOf(
                              net
                            )}
                          >
                            {net}
                          </p>
                        ))}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Product Review (( Mobile && Desktop )) */}
                <div className="w-full bg-white p-3 rounded-lg mt-4 flex flex-col px-5">
                  <h2 className=" mb-3">نقد و بررسی این محصول</h2>
                  <p className="text-xs text-gray-500 min-h-24 max-h-44 text-ellipsis overflow-hidden inline-block text-justify leading-6">
                    {products[index].properties.review}
                  </p>
                  <button className="inline-block text-orange-500 self-end mt-3">
                    ادامه مطلب
                  </button>
                </div>

                <div className="w-full bg-white p-3 rounded-lg mt-4 flex flex-col">
                  {/* product properties Review (( Mobile )) */}
                  <div className="w-2/3 sm:w-1/2 mx-auto h-8 bg-gray-300 rounded-full overflow-hidden border lg:hidden">
                    <button className="text-xs w-1/3 rounded-full h-full text-gray-700">
                      دروبین
                    </button>
                    <button className="text-xs w-1/3 rounded-full h-full text-gray-700 bg-white">
                      طراحی
                    </button>
                    <button className="text-xs w-1/3 rounded-full h-full text-gray-700">
                      باتری
                    </button>
                  </div>
                  <div className="lg:hidden">
                    <div className="my-3 px-2">
                      <h2 className="my-3">
                        {products[index].properties.design[0]}
                      </h2>
                      <p className="text-xs text-gray-500 text-justify leading-6">
                        {products[index].properties.design[1]}
                      </p>
                    </div>
                  </div>
                  {/* product properties Review (( Desktop )) */}
                  <div className="hidden lg:block">
                    <div className="mb-12 px-2">
                      <h2 className="mb-2">
                        {products[index].properties.design[0]}
                      </h2>
                      <p className="text-xs text-gray-500 text-justify leading-6">
                        {products[index].properties.design[1]}
                      </p>
                    </div>
                    <div className="mb-12 px-2">
                      <h2 className="mb-2">
                        {products[index].properties.battery[0]}
                      </h2>
                      <p className="text-xs text-gray-500 text-justify leading-6">
                        {products[index].properties.battery[1]}
                      </p>
                    </div>
                    <div className="mb-12 px-2">
                      <h2 className="mb-2">
                        {products[index].properties.camera[0]}
                      </h2>
                      <p className="text-xs text-gray-500 text-justify leading-6">
                        {products[index].properties.camera[1]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </Layout>

      {/* Navigator (( Mobile )) */}
      <div className="bg-white shadow-md px-5 z-10 sticky bottom-0 left-0 w-full h-16 flex lg:hidden items-center justify-between rounded-t-lg">
        <div className="flex items-center justify-between w-full container mx-auto">
          {cart.map((pro) => pro.id === products[index].id).indexOf(true) !==
          -1 ? (
            <button className="bg-orange-500 w-1/2 py-2 rounded-md text-white">
              اضافه شد!
            </button>
          ) : (
            <button
              onClick={(e) => handleAddToCart_FC(products[index])}
              className="bg-orange-500 w-1/2 py-2 rounded-md text-white"
            >
              افزودن به سبد
            </button>
          )}
          <span className="text-orange-500 flex justify-center items-center mr-4 font-bold text-xl">
            <span>{digitsEnToAr(addCommas(products[index].price))} تومان</span>
          </span>
        </div>
      </div>
    </>
  );
}

export default Product;
