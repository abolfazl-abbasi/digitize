import React, { useRef, useState } from "react";
import {
  HiOutlineDeviceMobile,
  HiChevronDown,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineX,
  HiOutlineDesktopComputer,
  HiCheck,
  HiOutlineHeart,
  HiHeart,
} from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { digitsEnToAr, addCommas } from "@persian-tools/persian-tools";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Layout from "../Layouts/MainLayout";
import { useCart, useCartDispatcher } from "../Providers/CartProvider";
import { useGrouping, useSaGDispatcher } from "../Providers/Sort&Grouping";
import {
  useProducts,
  useProductsDispatcher,
} from "../Providers/productsProvider";

function ProductPage() {
  const par = useParams();
  const [isShow, setIsShow] = useState(false);
  const cart = useCart();
  const grouping = useGrouping();
  const products = useProducts();
  const { handleAddToCart_FC } = useCartDispatcher();
  const { setProducts, setProductsShow, handleLike } = useProductsDispatcher();
  const { handleGrouping } = useSaGDispatcher();
  const [index] = useState(
    products.indexOf(products.find((pro) => pro.id === par.id))
  );

  const review = useRef();

  const [property, setProperty] = useState("design");

  useEffect(() => {
    products.find((pro) => pro.id === Number(par.id));
  }, [par.id, products]);

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

  return (
    <>
      <Layout title={products[index].titleFa}>
        {/* BradCrumb (( Desktop )) */}
        <section className="mt-5 md:hidden">
          <div className="container mx-auto flex items-center px-6 text-[10px] font-bold">
            <Link to={{ pathname: "/" }} className="text-orange-500">
              خانه
            </Link>
            <HiChevronDown className="mx-2 h-3 w-3 rotate-90" />
            <Link to={{ pathname: "/" }} className="text-orange-500">
              گوشی هوشمند
            </Link>
            <HiChevronDown className="mx-2 h-3 w-3 rotate-90" />
            <span>آیفون 13 pro max</span>
          </div>
        </section>

        {/* App Main Section (( Desktop && Mobile )) */}
        <section className="container mx-auto grid grid-cols-12 grid-rows-[55px_minmax(500px,_1fr)] md:gap-6">
          {/* AppBar */}
          <section className="col-span-3 row-span-2 hidden md:block xl:col-span-2">
            <div className="col-span-3 row-span-2 hidden md:block xl:col-span-2">
              <div className="sticky top-52 z-20 h-52 rounded-xl bg-white p-2 py-5 shadow-md">
                {/* Grouping */}
                <div className="flex flex-col">
                  <h3 className="mb-3 text-lg font-bold text-orange-500">
                    دسته بندی
                  </h3>
                  <ul>
                    <li
                      onClick={(e) => handleGrouping("smartPhone")}
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
                      onClick={(e) => handleGrouping("laptop")}
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
                      onClick={(e) => handleGrouping("smartWatch")}
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
                </div>
              </div>
            </div>
          </section>

          {/* BradCrumb (( Desktop )) */}
          <section className="col-span-9 hidden items-center rounded-md bg-white px-2 shadow-sm md:flex xl:col-span-10">
            <div className="container mx-auto flex items-center px-6 font-bold">
              <Link to={{ pathname: "/" }} className="text-orange-500">
                خانه
              </Link>
              <HiChevronDown className="mx-2 h-3 w-3 rotate-90" />
              <Link to={{ pathname: "/" }} className="text-orange-500">
                گوشی هوشمند
              </Link>
              <HiChevronDown className="mx-2 h-3 w-3 rotate-90" />
              <span>آیفون 13 pro max</span>
            </div>
          </section>

          {/* App Main section (( Mobile )) */}
          <section className="col-span-12 row-span-full my-6 overflow-hidden rounded-lg py-3 px-5 md:col-span-9 md:row-auto md:my-0 lg:bg-gray-50 xl:col-span-10">
            <div className="container mx-auto flex flex-col items-center justify-center lg:items-start">
              <div className="container mx-auto flex flex-col items-center justify-between lg:mx-0 lg:flex-row lg:items-start">
                <div className="container mx-auto flex flex-col items-center lg:mx-0 lg:flex-row lg:items-start">
                  {/* Slider (( Desktop )) */}
                  <div className="flex items-center lg:self-start xl:ml-12">
                    <div className="flex w-full flex-col items-center justify-center">
                      <Swiper
                        onClick={handleShowSlider}
                        modules={[Navigation]}
                        className="flex h-1/4 w-screen items-center justify-center lg:w-[200px]"
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
                      <div className="slider-scroller hidden items-center overflow-y-hidden px-4 py-2 lg:flex lg:h-20 lg:w-48 lg:px-0">
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
                            className="border-1 ml-8 flex flex-shrink-0 items-center justify-center rounded-lg border-2 border-gray-400 p-1 lg:ml-4"
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
                    <div className="my-10 flex items-center gap-1 text-center lg:my-5 lg:items-start">
                      <div className="my-10 flex flex-col items-center gap-1 text-center lg:my-5 lg:items-start">
                        <h1 className="text-lg font-bold">
                          {products[index].titleFa}
                        </h1>
                        <p className="text-sm font-light text-gray-600">
                          {products[index].titleEn}
                        </p>
                      </div>
                      <div className="relative flex justify-end">
                        <div
                          className="absolute right-14 top-5 inline-flex cursor-pointer rounded-full bg-[#00000020] p-1"
                          onClick={() => handleLike(products[index])}
                        >
                          {products[index].liked ? (
                            <HiHeart className="h-4 w-4 fill-red-500 transition-colors" />
                          ) : (
                            <HiOutlineHeart className="h-4 w-4 stroke-red-500" />
                          )}
                        </div>
                      </div>
                    </div>

                    <hr className="hidden lg:block" />

                    {/* Select Color */}
                    <div className="flex items-center justify-around md:my-5 md:justify-between">
                      <span className="text-sm text-gray-600">
                        انتخاب رنگ :
                      </span>
                      <div className="flex items-center">
                        {products[index].color.map((proColor) => {
                          return (
                            <div
                              key={proColor + Math.random()}
                              onClick={(e) => {
                                const updateProduct = { ...products[index] };
                                updateProduct.activeColor = proColor;
                                const updateProducts = [...products];
                                updateProducts[par.id - 1] = {
                                  ...updateProduct,
                                };
                                setProducts([...updateProducts]);
                                setProductsShow([...updateProducts]);
                              }}
                              className={`-mr-1 h-4 w-4 sm:h-5 sm:w-5 bg-${proColor} flex items-center justify-center rounded-full  ${
                                products[index].activeColor === `${proColor}`
                                  ? `ring-2 ring-${proColor} ring-offset-2`
                                  : ""
                              }`}
                            >
                              <HiCheck
                                className={`h-3 w-3 text-white ${
                                  products[index].activeColor === `${proColor}`
                                    ? "block"
                                    : "hidden"
                                }`}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <hr className="hidden lg:block" />

                    {/* Product Properties (( Desktop )) */}
                    <div className="hidden w-full rounded-lg px-3 lg:my-5 lg:block">
                      <h2 className="mb-1">ویژگی ها : </h2>
                      <ul className="flex flex-col gap-2">
                        <li className="flex flex-col gap-x-4 text-sm">
                          <span className="propertyList text-sm text-gray-600">
                            حافظه داخلی :
                          </span>
                          <span className="mr-8 text-gray-500">
                            {products[index].properties.memory}
                          </span>
                        </li>
                        <li className="flex flex-col gap-x-4 text-sm">
                          <span className="propertyList text-sm text-gray-600">
                            اندازه صفحه نمایش :
                          </span>
                          <span className="mr-8 text-gray-500">
                            {products[index].properties.resolution} اینچ
                          </span>
                        </li>

                        <li className="flex flex-col gap-x-4 text-sm">
                          <span className="propertyList text-sm text-gray-600">
                            شبکه ها :
                          </span>
                          <span className="mr-8 text-gray-500">
                            {products[index].properties.networks.map((net) => (
                              <p
                                className="ml-2 inline-block"
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
                    className={`z-50 flex-col items-center ${
                      !isShow ? "hidden" : "flex"
                    } md:hidden`}
                  >
                    <div className="fixed top-0 flex h-screen w-screen justify-center overflow-hidden bg-white">
                      <button
                        className="absolute top-4 right-4 z-[9999] flex h-6 w-6 items-center justify-center rounded-full bg-orange-100"
                        onClick={handleShowSlider}
                      >
                        <HiOutlineX />
                      </button>
                      <Swiper
                        modules={[Navigation]}
                        className="flex h-4/5 w-screen items-center justify-center"
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
                      <div className="fixed bottom-0 flex items-center overflow-auto px-4 py-2">
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
                            className="ml-8 flex w-1/4 flex-shrink-0 items-center justify-center rounded-lg border-2 border-gray-400 p-2 ring-1 sm:w-1/5 lg:mx-2"
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
                  <div className="my-6 flex flex-wrap items-center justify-center rounded-lg px-2 py-3 lg:my-4 lg:w-60 lg:bg-white lg:shadow-lg">
                    {/* Services (( Mobile && desktop )) */}
                    <div className="flex flex-wrap items-center justify-center">
                      <div className="my-2 mx-1 flex items-center text-gray-700">
                        <div className="mx-2 h-4 w-4 rounded-full bg-gray-300">
                          <HiOutlineDeviceMobile className="mr-[5px] mt-[5px] h-4 w-4" />
                        </div>
                        <span className="mx-1 text-xs font-light">
                          فروشنده :
                        </span>
                        <span className="mx-1 text-xs font-bold">
                          {products[index].services.seller}
                        </span>
                      </div>
                      <div className="my-2 mx-1 flex items-center text-gray-700">
                        <div className="mx-2 h-4 w-4 rounded-full bg-gray-300">
                          <HiOutlineShieldCheck className="mr-[5px] mt-[5px] h-4 w-4" />
                        </div>
                        <span className="mx-1 text-xs font-light">
                          گارانتی :
                        </span>
                        <span className="mx-1 text-xs font-bold">
                          {products[index].services.warranty}
                        </span>
                      </div>
                      <div className="my-2 mx-1 flex items-center text-gray-700">
                        <div className="mx-2 h-4 w-4 rounded-full bg-gray-300">
                          <HiOutlineTruck className="mr-[5px] mt-[5px] h-4 w-4" />
                        </div>
                        <span className="mx-1 text-xs font-light">
                          ارسال توسط :
                        </span>
                        <span className="mx-1 text-xs font-bold">
                          {products[index].services.postedBy}
                        </span>
                      </div>
                    </div>

                    {/* Add To Cart and Price (( Desktop )) */}
                    <div className="mt-8 hidden items-center justify-between gap-x-4 lg:flex">
                      {cart
                        .map(
                          (pro) =>
                            pro.id === products[index].id &&
                            pro.activeColor === products[index].activeColor
                        )
                        .indexOf(true) !== -1 ? (
                        <button className="rounded-md bg-orange-500 p-2 text-white">
                          اضافه شد!
                        </button>
                      ) : (
                        <button
                          onClick={(e) => handleAddToCart_FC(products[index])}
                          className="rounded-md bg-orange-500 p-2 text-white"
                        >
                          افزودن به سبد
                        </button>
                      )}
                      <span className="flex flex-col items-center justify-center text-sm font-bold text-orange-500">
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
                <div className="w-full rounded-lg bg-white px-3 py-2 lg:hidden">
                  <h2 className="mb-2">ویژگی ها : </h2>
                  <ul className="flex flex-col gap-2">
                    <li className="my-2 flex flex-col gap-x-4 text-sm">
                      <span className="propertyList text-sm text-gray-600">
                        حافظه داخلی :
                      </span>
                      <span className="mr-8 mt-1 text-gray-500">
                        {products[index].properties.memory}
                      </span>
                    </li>
                    <hr />
                    <li className="my-2 flex flex-col gap-x-4 text-sm">
                      <span className="propertyList text-sm text-gray-600">
                        اندازه صفحه نمایش :
                      </span>
                      <span className="mr-8 mt-1 text-gray-500">
                        {products[index].properties.resolution} اینچ
                      </span>
                    </li>
                    <hr />
                    <li className="my-2 flex flex-col gap-x-4 text-sm">
                      <span className="propertyList text-sm text-gray-600">
                        شبکه ها :
                      </span>
                      <span className="mr-8 mt-1 text-gray-500">
                        {products[index].properties.networks.map((net) => (
                          <p
                            className="ml-2 inline-block"
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
                <div className="mt-4 flex w-full flex-col rounded-lg bg-white p-3 px-5">
                  <h2 className=" mb-3">نقد و بررسی این محصول</h2>
                  <p
                    className="min-h-24 inline-block max-h-44 overflow-hidden text-ellipsis text-justify text-xs leading-6 text-gray-500"
                    ref={review}
                  >
                    {products[index].properties.review}
                  </p>
                  <button
                    className="mt-3 inline-block self-end text-orange-500"
                    onClick={(e) => {
                      review.current.classList.toggle("max-h-44");
                      review.current.classList.value.includes("max-h-44")
                        ? (e.target.innerHTML = "ادامه مطلب")
                        : (e.target.innerHTML = "کمتر");
                    }}
                  >
                    ادامه مطلب
                  </button>
                </div>

                <div className="mt-4 flex w-full flex-col rounded-lg bg-white p-3">
                  {/* product properties Review (( Mobile )) */}
                  <div className="mx-auto h-8 w-2/3 overflow-hidden rounded-full border bg-gray-300 sm:w-1/2 lg:hidden">
                    <button
                      className={`h-full w-1/3 rounded-full text-xs text-gray-700 ${
                        property === "camera" ? "bg-white" : ""
                      }`}
                      onClick={() => setProperty("camera")}
                    >
                      دروبین
                    </button>
                    <button
                      className={`h-full w-1/3 rounded-full text-xs text-gray-700 ${
                        property === "design" ? "bg-white" : ""
                      }`}
                      onClick={() => setProperty("design")}
                    >
                      طراحی
                    </button>
                    <button
                      className={`h-full w-1/3 rounded-full text-xs text-gray-700 ${
                        property === "battery" ? "bg-white" : ""
                      }`}
                      onClick={() => setProperty("battery")}
                    >
                      باتری
                    </button>
                  </div>
                  <div className="lg:hidden">
                    <div className="my-3 px-2">
                      <h2 className="my-3">
                        {products[index].properties[property][0]}
                      </h2>
                      <p className="text-justify text-xs leading-6 text-gray-500">
                        {products[index].properties[property][1]}
                      </p>
                    </div>
                  </div>
                  {/* product properties Review (( Desktop )) */}
                  <div className="hidden lg:block">
                    <div className="mb-12 px-2">
                      <h2 className="mb-2">
                        {products[index].properties.design[0]}
                      </h2>
                      <p className="text-justify text-xs leading-6 text-gray-500">
                        {products[index].properties.design[1]}
                      </p>
                    </div>
                    <div className="mb-12 px-2">
                      <h2 className="mb-2">
                        {products[index].properties.battery[0]}
                      </h2>
                      <p className="text-justify text-xs leading-6 text-gray-500">
                        {products[index].properties.battery[1]}
                      </p>
                    </div>
                    <div className="mb-12 px-2">
                      <h2 className="mb-2">
                        {products[index].properties.camera[0]}
                      </h2>
                      <p className="text-justify text-xs leading-6 text-gray-500">
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
      <div className="sticky bottom-0 left-0 z-10 flex h-16 w-full items-center justify-between rounded-t-lg bg-white px-5 shadow-md lg:hidden">
        <div className="container mx-auto flex w-full items-center justify-between">
          {cart.map((pro) => pro.id === products[index].id).indexOf(true) !==
          -1 ? (
            <button className="w-1/2 rounded-md bg-orange-500 py-2 text-white">
              اضافه شد!
            </button>
          ) : (
            <button
              onClick={(e) => handleAddToCart_FC(products[index])}
              className="w-1/2 rounded-md bg-orange-500 py-2 text-white"
            >
              افزودن به سبد
            </button>
          )}
          <span className="mr-4 flex items-center justify-center text-xl font-bold text-orange-500">
            <span>{digitsEnToAr(addCommas(products[index].price))} تومان</span>
          </span>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
