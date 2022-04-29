import {
  HiOutlineTruck,
  HiOutlineShoppingCart,
  HiOutlineCalculator,
  HiOutlineLocationMarker,
  HiOutlineChevronLeft,
} from "react-icons/hi";
import { BiTimeFive } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";
import {
  useCart,
  useCartDispatcher,
  useDiscountRes,
  useFinalPrice,
  useTotalPrice,
} from "../Providers/CartProvider";
import { addCommas, digitsEnToAr } from "@persian-tools/persian-tools";
import "react-calendar/dist/Calendar.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import _ from "lodash";
import {
  useAddress,
  useDeliveryDay,
  useCheckoutProvider,
} from "../Providers/CheckoutProvider";
import { useUserData } from "../Providers/SignProvider";

const CheckoutPage = () => {
  const deliveryDay = useDeliveryDay();
  const totalPrice = useTotalPrice();
  const finalPrice = useFinalPrice();
  const userData = useUserData();
  const address = useAddress();
  const cart = useCart();

  const { handleDiscountCode_FC, handleDiscount_FC } = useCartDispatcher();

  const {
    handleDate,
    handleDay,
    handleDayInMonth,
    handleDayOfWeek,
    handleEditAddress,
    handleSetOrder,
  } = useCheckoutProvider();

  const his = useHistory();

  if (!userData) {
    his.push("/login");
  }

  const discountRes = useDiscountRes();
  const shipping = 25_000;

  return (
    <>
      <div className="container mx-auto grid grid-cols-12 gap-4 p-4">
        <div className="col-span-12 h-32 md:h-48">
          <div className="flex h-full w-full flex-col items-center justify-evenly rounded-2xl border-2 border-gray-300 bg-white">
            <div>
              <Link to={"/"}>
                <svg
                  className="h-20 w-40 md:h-32 md:w-64"
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
              </Link>
            </div>
            <div className="hidden items-center space-x-3 md:flex">
              <Link to={"/cart"}>
                <div className="mx-5 flex items-center text-orange-500 opacity-70">
                  <span>
                    <HiOutlineShoppingCart className="h-7 w-7" />
                  </span>
                  <span className="mr-2 whitespace-nowrap pb-1 md:text-xl">
                    سبد خرید
                  </span>
                </div>
              </Link>
              <hr className="mx-5 h-[2px] w-16 bg-orange-500 md:w-24 lg:w-36" />
              <Link to={"/checkout"}>
                <div className="mx-5 flex items-center text-orange-500">
                  <span>
                    <HiOutlineTruck className="h-7 w-7" />
                  </span>
                  <span className="mr-2 whitespace-nowrap pb-1 text-lg md:text-2xl">
                    زمان ارسال
                  </span>
                </div>
              </Link>
              <hr className="mx-5 h-[1px] w-16 bg-gray-300 md:w-24 lg:w-36" />
              <div className="mx-5 flex items-center">
                <span>
                  <HiOutlineCalculator className="h-7 w-7 text-gray-500" />
                </span>
                <span className="mr-2 whitespace-nowrap pb-1 text-gray-500 md:text-xl">
                  پرداخت
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-9">
          <div className="h-fit  w-full rounded-2xl border-2 border-gray-300 bg-white py-1 px-3">
            <div className="flex h-full items-center justify-between">
              <div className="mx-3 md:mx-4">
                <HiOutlineLocationMarker className="h-7 w-7 md:h-9 md:w-9" />
              </div>
              {address.edited ? (
                <div className="flex w-full flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="my-2 text-gray-600">آدرس تحویل سفارش</div>
                    <button className="flex items-center text-blue-500">
                      <button onClick={() => handleEditAddress(true)}>
                        تایید
                      </button>
                      <span>
                        <HiOutlineChevronLeft />
                      </span>
                    </button>
                  </div>
                  <label className="relative w-full">
                    <span className="absolute right-3 -top-3 bg-white px-2 text-gray-600">
                      آدرس
                    </span>
                    <textarea
                      className={`max-h-40 w-full rounded border-2 bg-white p-2 px-4 text-sm md:max-h-24 md:text-base ${
                        address.address
                          ? "border-green-500"
                          : "border-slate-400"
                      }`}
                      onChange={(e) =>
                        handleEditAddress(false, e.target.value, address.name)
                      }
                      value={address.address}
                    ></textarea>
                  </label>
                  <label className="relative w-full">
                    <span className="absolute right-3 -top-1 bg-white px-2 text-gray-600">
                      نام
                    </span>
                    <input
                      className={`my-2 w-full rounded border-2 border-slate-400 bg-white p-2 px-4 text-sm md:text-base ${
                        address.name ? "border-green-500" : "border-slate-400"
                      }
                      }`}
                      onChange={(e) =>
                        handleEditAddress(
                          false,
                          address.address,
                          e.target.value
                        )
                      }
                      value={address.name}
                    />
                  </label>
                </div>
              ) : (
                <div className="flex w-full flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="my-2 text-gray-600">آدرس تحویل سفارش</div>
                    <button className="flex items-center text-blue-500">
                      <button onClick={() => handleEditAddress(true)}>
                        ویرایش
                      </button>
                      <span>
                        <HiOutlineChevronLeft />
                      </span>
                    </button>
                  </div>
                  {address.address ? (
                    <div className="my-2 w-5/6 text-lg">{address.address}</div>
                  ) : (
                    <div className="my-2 w-5/6 text-lg text-red-500">
                      *لطفا نشانی محل اقامت خود را وارد کنید.
                    </div>
                  )}
                  {address.name ? (
                    <div className="my-2 text-gray-600">{address.name}</div>
                  ) : (
                    <div className="my-2 w-5/6 text-lg text-red-500">
                      *لطفا نام فرد تحویل گیرنده بسته را وارد کنید.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="order-1 mt-4 w-full rounded-2xl border-2 border-gray-300 bg-white p-6 md:order-2">
            <h1 className="mx-2 mb-5 flex items-center pt-3 text-2xl">
              <span>
                <HiOutlineShoppingCart className="ml-3 h-8 w-8" />
              </span>
              <span>محصولات</span>
            </h1>
            <div className="mb-8 flex w-full flex-col">
              <div className="space-y-3 rounded-2xl border-2 p-2 pt-4">
                <div className="overflow-x-h flex">
                  <Swiper
                    className="mySwiper !mx-0"
                    slidesPerView={4}
                    spaceBetween={0}
                    pagination={{
                      clickable: true,
                    }}
                  >
                    {cart.map((product) => (
                      <SwiperSlide
                        className="!w-32 pb-3"
                        key={Math.random().toString() + product.id}
                      >
                        <Link
                          to={`/products/${product.id}`}
                          className="relative ml-2 w-24"
                        >
                          <img
                            src={product.mainImage}
                            className="w-24"
                            alt={product.titleEn}
                          />
                          <div className="absolute top-24 right-2 flex h-6 w-20 items-center justify-around">
                            <div
                              className={`h-6 w-6 rounded-full bg-${product.activeColor}`}
                            ></div>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-sm">
                              {product.numOnCart}
                            </div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
            <h1 className="mx-2 mb-5 flex items-center pt-3 text-2xl">
              <span>
                <BiTimeFive className="ml-3 h-8 w-8" />
              </span>
              <span>تاریخ تحویل</span>
            </h1>
            <div className="h-44 w-full rounded-2xl border-2 border-gray-300">
              <div className="h-2/3 border-b-2 border-gray-300">
                <Swiper
                  className="mySwiper !mx-0"
                  slidesPerView={2}
                  spaceBetween={0}
                  pagination={{
                    clickable: true,
                  }}
                >
                  {_.range(1, 7).map((day) => (
                    <SwiperSlide
                      className="!w-28 cursor-pointer md:!w-32"
                      onClick={() => handleDay(handleDate(day))}
                      key={Math.random() + day}
                      name={handleDate(day)}
                    >
                      <div className="mt-4 flex h-full flex-col items-center justify-between space-y-4 text-base md:text-lg">
                        <span
                          className={`${
                            deliveryDay === handleDate(day)
                              ? "text-orange-500"
                              : ""
                          }`}
                        >
                          {handleDayOfWeek(day)}
                        </span>
                        <span className="text-lg md:text-xl">
                          {handleDayInMonth(day)}
                        </span>
                        {deliveryDay === handleDate(day) ? (
                          <span className="h-2 w-1/3 bg-orange-500"></span>
                        ) : (
                          ""
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="mt-2 flex items-start justify-center px-2 sm:mt-4">
                {deliveryDay ? (
                  <span>
                    سفارش شما در تاریخ{" "}
                    <span className="mx-2 text-sm text-green-600">
                      {deliveryDay.split("-").reverse().join(" / ")}
                    </span>{" "}
                    ارسال میشود.
                  </span>
                ) : (
                  <span>لطفا تاریخ مورد نظر خود را انتخاب کنید.</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="sticky top-4 col-span-12 h-fit rounded-2xl border-2 border-gray-300 bg-white px-4 py-3 lg:col-span-3">
          <div className="flex items-center justify-between py-3 px-1 ">
            <span>قیمت کالاها : </span>
            <span>{digitsEnToAr(addCommas(totalPrice))}</span>
          </div>
          {discountRes.boolean ? (
            <div className="mx-1 mb-3 flex w-full items-center justify-between">
              <span>تخفیف :</span>
              <span className="mx-2 text-lg text-green-500">
                {digitsEnToAr(addCommas(discountRes.discount))}
              </span>
            </div>
          ) : (
            ""
          )}
          <div className="mx-1 mb-3 flex w-full items-center justify-between">
            <span
              className="cursor-pointer text-xs text-blue-500"
              onClick={() =>
                document
                  .getElementById("discountChecker")
                  .classList.toggle("hidden")
              }
            >
              کد تخفیف دارید؟
            </span>
            <div className="relative flex flex-col items-end">
              <div
                className="mb-1 flex hidden items-center pt-1"
                id="discountChecker"
              >
                <input
                  type="text"
                  className="ltr w-20 rounded-r-md border border-gray-600 px-2 focus:outline-none"
                  placeholder="abc123"
                  onChange={(e) => handleDiscountCode_FC(e)}
                />
                <button
                  className="rounded-l-md bg-orange-500 py-[3.3px] px-1 text-xs text-white"
                  onClick={handleDiscount_FC}
                >
                  تایید
                </button>
              </div>
              {discountRes.boolean ? (
                <span className="text-xs font-bold text-green-500">
                  {discountRes.response}
                </span>
              ) : (
                <span className="text-xs font-bold text-red-500">
                  {discountRes.response}
                </span>
              )}
            </div>
          </div>
          <hr />
          <div className="flex items-center justify-between py-3 px-1 ">
            <span>هزینه ارسال : </span>
            <span className="text-orange-600">
              {digitsEnToAr(addCommas(shipping))}
            </span>
          </div>
          <hr />
          <div className="flex items-center justify-between py-3 px-1 ">
            <span>قابل پرداخت : </span>
            <span className="text-green-600">
              {digitsEnToAr(addCommas(finalPrice))}
            </span>
          </div>
          <div className="flex w-full items-center justify-center py-2 text-center">
            {deliveryDay &&
            address.address &&
            address.name &&
            !address.edited ? (
              <button
                onClick={() => handleSetOrder(cart)}
                className="block w-2/3 rounded bg-orange-500 py-1 text-white"
              >
                پرداخت
              </button>
            ) : (
              <button
                disabled={true}
                className="block w-2/3 rounded border-2 border-orange-500 py-1 text-orange-600"
              >
                تاریخ تحویل
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
