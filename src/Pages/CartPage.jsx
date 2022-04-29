import React from "react";
import Layout from "../Layouts/MainLayout";
import { HiX, HiOutlineShieldCheck } from "react-icons/hi";
import {
  useCart,
  useCartDispatcher,
  // useDiscountCode,
  useDiscountRes,
  useFinalPrice,
  useTotalPrice,
} from "../Providers/CartProvider";
import { Link } from "react-router-dom";
import { addCommas, digitsEnToAr } from "@persian-tools/persian-tools";
import NavigatorMobile from "../components/NavigatorMobile";
import { useUserData } from "../Providers/SignProvider";

const CartPage = () => {
  const cart = useCart();
  // const discountCode = useDiscountCode();
  const discountRes = useDiscountRes();
  const totalPrice = useTotalPrice();
  const userData = useUserData();
  const finalPrice = useFinalPrice();

  const { handleDecrement_FC, handleDelete_FC, handleIncrement_FC } =
    useCartDispatcher();

  return (
    <>
      <Layout title={"سبد خرید"}>
        {cart.length > 0 ? (
          <section className="container my-5 mx-auto flex min-h-screen w-fit flex-col items-start gap-y-6 px-5 md:w-full md:flex-row md:gap-x-4 md:px-0">
            <section className="flex flex-col items-center gap-y-1 md:w-full">
              {cart.map((product) => (
                <div
                  key={product.id + Math.random()}
                  className="mb-3 flex w-full items-center justify-between rounded-lg bg-white py-2 px-3"
                >
                  <Link to={{ pathname: `/products/${product.id}` }}>
                    <div className="flex items-center">
                      <div className="w-1/4 sm:w-1/5">
                        <img src={product.mainImage} alt={product.titleEn} />
                      </div>
                      <div className="flex flex-col space-y-2 pr-4 md:space-y-4">
                        <span className="text-sm sm:text-base">
                          {product.titleEn}
                        </span>
                        <div className="flex items-center gap-x-3">
                          <div className="my-2 flex items-center text-gray-700">
                            <div className="mx-2 h-4 w-4 rounded-full bg-gray-300">
                              <HiOutlineShieldCheck className="mr-[5px] mt-[5px] h-4 w-4" />
                            </div>
                            <span className="mx-1 text-xs font-light">
                              رنگ :
                            </span>
                            <span className="mx-1 text-xs font-bold">
                              <div
                                className={`h-4 w-4 rounded-full bg-${product.activeColor}`}
                              ></div>
                            </span>
                          </div>
                          <div className="my-2 hidden items-center text-gray-700 md:flex">
                            <div className="mx-2 h-4 w-4 rounded-full bg-gray-300">
                              <HiOutlineShieldCheck className="mr-[5px] mt-[5px] h-4 w-4" />
                            </div>
                            <span className="mx-1 text-xs font-light">
                              گارانتی :
                            </span>
                            <span className="mx-1 text-xs font-bold">
                              {product.services.warranty}
                            </span>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-orange-500 sm:text-base">
                          {digitsEnToAr(addCommas(product.price))} تومان
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="flex flex-col items-end space-y-6">
                    <button
                      className="text-red-400 md:my-2"
                      onClick={() => handleDelete_FC(product)}
                    >
                      <HiX className="h-5 w-5" />
                    </button>
                    <div></div>
                    <div className="flex items-center gap-x-3 sm:gap-x-5 md:my-2">
                      <button
                        onClick={() => handleDecrement_FC(product)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-lg text-red-500 sm:h-8 sm:w-8"
                      >
                        -
                      </button>
                      <span>{product.numOnCart}</span>
                      <button
                        onClick={() => handleIncrement_FC(product)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-green-50 text-lg text-green-500 sm:h-8 sm:w-8"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </section>
            <section className="sticky top-24 mb-3 flex w-full flex-col gap-y-3 rounded-lg bg-white p-3 text-sm md:w-96">
              <div className="flex flex-col items-start gap-y-2">
                <div className="flex w-full items-center justify-between">
                  <span>مجموع قیمت :</span>
                  <span className="text-lg text-red-500">
                    {digitsEnToAr(addCommas(totalPrice))}
                  </span>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span>مجموع تخفیف :</span>
                  <span className="text-lg text-green-500">
                    {digitsEnToAr(addCommas("0"))}
                  </span>
                </div>
              </div>
              <hr />
              <div className="flex w-full items-center justify-between">
                <span>قیمت نهایی :</span>
                <span className="text-lg text-green-500">
                  {discountRes.boolean
                    ? digitsEnToAr(addCommas(finalPrice))
                    : digitsEnToAr(addCommas(totalPrice))}
                </span>
              </div>
              <div className="mt-2 flex w-full items-center justify-end md:justify-center">
                <Link
                  to={userData ? "/checkout" : "/login?redirect=/checkout"}
                  className="block rounded-md bg-orange-500 p-2 px-3 text-white"
                >
                  خرید خود را نهایی کنید
                </Link>
              </div>
            </section>
          </section>
        ) : (
          <h1 className="mt-4 min-h-[50vh] w-full text-center text-xl text-red-500">
            سبد خالی است!
          </h1>
        )}
      </Layout>

      {/* Navigator (( Mobile )) */}
      <NavigatorMobile />
    </>
  );
};

export default CartPage;
