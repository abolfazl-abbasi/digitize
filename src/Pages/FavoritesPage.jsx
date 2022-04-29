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
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const cart = useCart();
  const favorites = useFavorites();

  const { handleAddToCart_FC } = useCartDispatcher();

  const { handleLike } = useProductsDispatcher();

  return (
    <>
      <Layout title={"موردعلاقه ها"}>
        {favorites.length > 0 ? (
          <section className="container my-5 mx-auto flex min-h-screen w-fit flex-col items-start gap-y-6 px-5 md:w-full md:flex-row md:gap-x-4 md:px-0">
            <section className="grid grid-cols-12 gap-x-8 md:w-full">
              {favorites.map((product) => (
                <div
                  key={product.id + Math.random()}
                  className="col-span-12 mb-5 flex w-full items-center justify-between rounded-lg bg-white py-2 px-3 lg:col-span-6"
                >
                  <Link
                    to={{ pathname: `/products/${product.id}` }}
                    className="flex items-center"
                  >
                    <div className="w-1/4 sm:w-1/5">
                      <img src={product.mainImage} alt={product.titleEn} />
                    </div>
                    <div className="flex flex-col pr-4 sm:gap-y-10">
                      <span className="mb-8 text-sm sm:text-base">
                        {product.titleEn}
                      </span>
                      <span className="text-sm font-bold text-orange-500 sm:text-base">
                        {digitsEnToAr(addCommas(product.price))} تومان
                      </span>
                    </div>
                  </Link>
                  <div className="relative flex flex-col items-end  sm:gap-y-10">
                    <div
                      className="mb-8 inline-flex cursor-pointer rounded-full bg-[#ffffff42] p-1"
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
                          <button className="whitespace-nowrap rounded-md bg-orange-500 p-2 text-xs text-white md:text-sm lg:text-base">
                            افزوده شد!
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={(e) => handleAddToCart_FC(product)}
                          className="whitespace-nowrap rounded-md bg-orange-500 p-2 text-xs text-white md:text-sm lg:text-base"
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
            مورد علاقه ها خالی است!
          </h1>
        )}
      </Layout>

      {/* Navigator (( Mobile )) */}
      <NavigatorMobile />
    </>
  );
};

export default FavoritesPage;
