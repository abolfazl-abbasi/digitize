import React from "react";
import Layout from "../Layouts/MainLayout";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import {
  useCart,
  useCartDispatcher,
  // useDiscountCode,
} from "../Providers/CartProvider";
import { addCommas, digitsEnToAr } from "@persian-tools/persian-tools";
import NavigatorMobile from "../components/NavigatorMobile";
import {
  useFavorites,
  useProductsDispatcher,
} from "../Providers/productsProvider";

const Favorites = () => {
  const cart = useCart();
  // const discountCode = useDiscountCode();
  // const discountRes = useDiscountRes();
  // const totalPrice = useTotalPrice();
  // const productsShow = useProductsShow();
  const favorites = useFavorites();
  console.log(favorites);

  const {
    // handleAddToCart_FC,
    handleDecrement_FC,
    handleIncrement_FC,
    handleAddToCart_FC,
  } = useCartDispatcher();

  const { handleLike } = useProductsDispatcher();

  return (
    <>
      <Layout title={"موردعلاقه ها"}>
        {favorites.length > 0 ? (
          <section className="container my-5 mx-auto flex min-h-screen w-fit flex-col items-start gap-y-6 px-5 md:w-full md:flex-row md:gap-x-4 md:px-0">
            <section className="flex flex-col items-center gap-y-1 md:w-full">
              {favorites.map((product) => (
                <div
                  key={product.id + Math.random()}
                  className="mb-3 flex w-full items-center justify-between rounded-lg bg-white py-2 px-3"
                >
                  <div className="flex items-center">
                    <div className="w-1/4 sm:w-1/5">
                      <img src={product.mainImage} alt={product.titleEn} />
                    </div>
                    <div className="flex flex-col justify-between gap-y-8 pr-4 sm:gap-y-10">
                      <span className="text-sm sm:text-base">
                        {product.titleEn}
                      </span>
                      <span className="text-sm font-bold text-orange-500 sm:text-base">
                        {digitsEnToAr(addCommas(product.price))} تومان
                      </span>
                    </div>
                  </div>
                  <div className="relative flex flex-col items-end justify-between gap-y-8 sm:gap-y-10">
                    <div
                      className="inline-flex cursor-pointer rounded-full bg-[#ffffff42] p-1"
                      onClick={() => handleLike(product)}
                    >
                      {product.liked ? (
                        <HiHeart className="h-4 w-4 fill-red-500 transition-colors" />
                      ) : (
                        <HiOutlineHeart className="h-4 w-4 stroke-red-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-x-3 sm:gap-x-5">
                      {cart
                        .map((pro) => pro.id === product.id)
                        .indexOf(true) !== -1 ? (
                        <>
                          <button
                            onClick={() =>
                              handleDecrement_FC(cart.map((pro) => pro))
                            }
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-lg text-red-500 sm:h-8 sm:w-8"
                          >
                            -
                          </button>
                          <span>{cart.map((pro) => pro.numInCart)}</span>
                          <button
                            onClick={() =>
                              handleIncrement_FC(cart.map((pro) => pro))
                            }
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-green-50 text-lg text-green-500 sm:h-8 sm:w-8"
                          >
                            +
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={(e) => handleAddToCart_FC(product)}
                          className="rounded-md bg-orange-500 p-2 text-white"
                        >
                          افزودن به سبد
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </section>
        ) : (
          <h1 className="mt-4 min-h-[50vh] w-full text-center text-xl text-red-500">
            خالی است!
          </h1>
        )}
      </Layout>

      {/* Navigator (( Mobile )) */}
      <NavigatorMobile />
    </>
  );
};

export default Favorites;
