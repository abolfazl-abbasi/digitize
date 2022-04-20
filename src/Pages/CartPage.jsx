import React from "react";
import Layout from "../Layouts/MainLayout";
import { HiX } from "react-icons/hi";
import {
  useCart,
  useCartDispatcher,
  // useDiscountCode,
  useDiscountRes,
  useTotalPrice,
} from "../Providers/CartProvider";
import { Link } from "react-router-dom";
import { addCommas, digitsEnToAr } from "@persian-tools/persian-tools";
import NavigatorMobile from "../components/NavigatorMobile";

const Cart = () => {
  const cart = useCart();
  // const discountCode = useDiscountCode();
  const discountRes = useDiscountRes();
  const totalPrice = useTotalPrice();

  const {
    // handleAddToCart_FC,
    handleDecrement_FC,
    handleDelete_FC,
    handleIncrement_FC,
    handleDiscount_FC,
    handleDiscountCode_FC,
  } = useCartDispatcher();

  // const loc = useLocation();

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
                      <div className="flex flex-col space-y-6 pr-4">
                        <span className="text-sm sm:text-base">
                          {product.titleEn}
                        </span>
                        <span className="text-sm font-bold text-orange-500 sm:text-base">
                          {digitsEnToAr(addCommas(product.price))} تومان
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="flex flex-col items-end space-y-6">
                    <button
                      className="text-red-400"
                      onClick={() => handleDelete_FC(product)}
                    >
                      <HiX className="h-5 w-5" />
                    </button>
                    <div className="flex items-center gap-x-3 sm:gap-x-5">
                      <button
                        onClick={() => handleDecrement_FC(product)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-lg text-red-500 sm:h-8 sm:w-8"
                      >
                        -
                      </button>
                      <span>{product.numInCart}</span>
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
            <section className="flex w-full flex-col gap-y-3 rounded-lg bg-white p-3 text-sm md:w-96">
              <div className="flex flex-col items-start gap-y-2">
                <div className="flex w-full items-center justify-between">
                  <span>مجموع قیمت:</span>
                  <span className="text-lg text-red-500">
                    {digitsEnToAr(addCommas(totalPrice))}
                  </span>
                </div>
                {discountRes.boolean ? (
                  <div className="flex w-full items-center justify-between">
                    <span>تخفیف:</span>
                    <span className="text-lg text-green-500">
                      {digitsEnToAr(addCommas(discountRes.discount))}
                    </span>
                  </div>
                ) : (
                  ""
                )}
                <div className="flex w-full items-center justify-between">
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
              </div>
              <hr />
              <div className="flex w-full items-center justify-between">
                <span>قیمت نهایی:</span>
                <span className="text-lg text-green-500">
                  {discountRes.boolean
                    ? digitsEnToAr(addCommas(totalPrice - discountRes.discount))
                    : digitsEnToAr(addCommas(totalPrice))}
                </span>
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

export default Cart;
