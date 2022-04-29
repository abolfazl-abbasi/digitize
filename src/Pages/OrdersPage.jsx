import {
  HiCheckCircle,
  HiOutlineTruck,
  HiRefresh,
  HiXCircle,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  useCheckoutProvider,
  useSelectedOrder,
  useShowOrder,
} from "../Providers/CheckoutProvider";
// import { useState } from "react";
// import moment from "jalali-moment";
// import Swal from "sweetalert2";
import { addCommas } from "@persian-tools/persian-tools";

const OrdersPage = () => {
  // const orders = useOrders();
  const { handleCategory, handleSelectedOrder } = useCheckoutProvider();

  const selectedOrder = useSelectedOrder();
  const showOrders = useShowOrder();

  return (
    <div className="order-1 mt-4 w-full space-y-2 overflow-hidden rounded-2xl bg-white shadow md:order-2 md:mt-0">
      <h1 className="mx-6 py-8 text-2xl">تاریخچه سفارشات</h1>
      <div className="mx-auto flex w-full items-center border-b border-gray-200 text-xs sm:text-sm md:text-base">
        <div
          onClick={() => handleSelectedOrder("")}
          className={`ml-4 mr-1 w-2/12 whitespace-nowrap border-b-2 text-center ${
            selectedOrder === "" ? "border-orange-400" : "border-hidden"
          } pb-3 lg:w-1/12`}
        >
          <span>همه</span>
        </div>
        <div
          onClick={() => handleSelectedOrder("current")}
          className={`ml-4 mr-1 w-2/12 whitespace-nowrap border-b-2 text-center ${
            selectedOrder === "current" ? "border-orange-400" : "border-hidden"
          } pb-3 lg:w-1/12`}
        >
          <span>جاری</span>
        </div>
        <div
          onClick={() => handleSelectedOrder("delivered")}
          className={`ml-4 mr-1 w-3/12 whitespace-nowrap border-b-2 text-center ${
            selectedOrder === "delivered"
              ? "border-orange-400"
              : "border-hidden"
          } pb-3 lg:w-1/12`}
        >
          <span>تحویل شده</span>
        </div>
        <div
          onClick={() => handleSelectedOrder("referred")}
          className={`ml-4 mr-1 w-2/12 whitespace-nowrap border-b-2 text-center ${
            selectedOrder === "referred" ? "border-orange-400" : "border-hidden"
          } pb-3 lg:w-1/12`}
        >
          <span>مرجوع</span>
        </div>
        <div
          onClick={() => handleSelectedOrder("canceled")}
          className={`ml-4 mr-1 w-2/12 whitespace-nowrap border-b-2 text-center ${
            selectedOrder === "canceled" ? "border-orange-400" : "border-hidden"
          } pb-3 lg:w-1/12`}
        >
          <span>لغو شده</span>
        </div>
      </div>
      <div className="flex w-full flex-col">
        {showOrders.length ? (
          showOrders.map((order) => (
            <div
              className="mx-4 my-4 space-y-3 rounded-lg border-2 p-2 py-3"
              key={order.orderNum}
            >
              {order.category === "current" ? (
                <div className="my-1 flex items-center justify-start">
                  <div className="flex items-center">
                    <span>
                      <HiOutlineTruck className="h-6 w-6 stroke-orange-500" />
                    </span>
                    <span className="mr-2 pb-1">درحال ارسال</span>
                  </div>
                </div>
              ) : (
                ""
              )}

              {order.category === "delivered" ? (
                <div className="my-1 flex items-center justify-start">
                  <div className="flex items-center">
                    <span>
                      <HiCheckCircle className="h-6 w-6 fill-green-600" />
                    </span>
                    <span className="mr-2 pb-1">تحویل شده</span>
                  </div>
                </div>
              ) : (
                ""
              )}

              {order.category === "referred" ? (
                <div className="my-1 flex items-center justify-start">
                  <div className="flex items-center">
                    <span>
                      <HiRefresh className="h-6 w-6 text-yellow-600" />
                    </span>
                    <span className="mr-2 pb-1">مرجوع شده</span>
                  </div>
                </div>
              ) : (
                ""
              )}

              {order.category === "canceled" ? (
                <div className="my-1 flex items-center justify-start">
                  <div className="flex items-center">
                    <span>
                      <HiXCircle className="h-6 w-6 fill-red-500" />
                    </span>
                    <span className="mr-2 pb-1">لغو شده</span>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div>
                <span className="text-xs text-gray-600 lg:text-sm">
                  <span className="text-black">
                    {order.deliveryDay.join(" / ")}
                  </span>{" "}
                  &nbsp; | &nbsp; شماره سفارش :{" "}
                  <span className="text-black">{order.orderNum}</span> &nbsp; |
                  &nbsp; مبلغ :{" "}
                  <span className="text-black">
                    {addCommas(order.orderPrice)} تومان
                  </span>
                </span>
              </div>
              <div className="overflow-x-h flex border-b-2 border-t-2 py-2">
                <Swiper
                  className="mySwiper !mx-0"
                  slidesPerView={4}
                  spaceBetween={0}
                  pagination={{
                    clickable: true,
                  }}
                >
                  {order.data.map((product) => (
                    <SwiperSlide
                      className="!w-32"
                      key={Math.random().toString() + product.id}
                    >
                      <Link
                        to={`/products/${product.id}`}
                        className="ml-2 w-24"
                      >
                        <img src={product.image} className="w-24" alt="" />
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="my-2 flex items-center justify-end">
                {order.category === "current" ? (
                  <button
                    onClick={() => handleCategory(order, "canceled")}
                    className="my-1  ml-2 flex items-center text-red-500"
                  >
                    <span className="ml-1">
                      <HiXCircle className="h-5 w-5" />
                    </span>{" "}
                    <span>لغو سفارش</span>
                  </button>
                ) : (
                  ""
                )}

                {order.category === "delivered" ? (
                  <button
                    onClick={() => handleCategory(order, "referred")}
                    className="my-1 ml-2 flex cursor-pointer items-center text-yellow-500"
                  >
                    <span className="ml-1">
                      <HiXCircle className="h-5 w-5" />
                    </span>{" "}
                    <span>مرجوع کردن</span>
                  </button>
                ) : (
                  ""
                )}

                {order.category === "referred" ? (
                  <button
                    onClick={() => handleCategory(order, "delivered")}
                    className="my-1 ml-2 flex cursor-pointer items-center text-green-500"
                  >
                    <span className="ml-1">
                      <HiCheckCircle className="h-5 w-5" />
                    </span>{" "}
                    <span>لغو مرجوعیت</span>
                  </button>
                ) : (
                  ""
                )}

                {order.category === "canceled" ? (
                  <div className="my-1 ml-2 flex items-center text-sm text-gray-700">
                    <span>
                      سفارش شما در تاریخ{" "}
                      <span className="mx-2 text-red-500">
                        {order.cancelDate.split("-").reverse().join(" / ")}
                      </span>{" "}
                      لغو شده است.
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex w-full items-center justify-center">
            <img
              src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg?t=st=1651225593~exp=1651226193~hmac=b3af4f6904022b6a3573a2cdfdb637639954db5c20f408a0e30de0012c9bdfcc&w=996"
              alt=""
              className="md:w-2/3"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
