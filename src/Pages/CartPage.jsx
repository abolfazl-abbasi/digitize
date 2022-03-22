import Layout from "../Layouts/MainLayout";
import {
  HiX,
  HiOutlineHome,
  HiOutlineHeart,
  HiHeart,
  HiShoppingCart,
  HiHome,
  HiOutlineViewGrid,
  HiOutlineShoppingCart,
  HiViewGrid,
} from "react-icons/hi";
import {
  useCart,
  useCartDispatcher,
  // useDiscountCode,
  useDiscountRes,
  useTotalPrice,
} from "../Providers/CartProvider";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { addCommas, digitsEnToAr } from "@persian-tools/persian-tools";

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

  const loc = useLocation();

  return (
    <>
      <Layout title={"سبد خرید"}>
        {cart.length > 0 ? (
          <section className="flex flex-col md:flex-row items-start my-5 container mx-auto px-5 md:px-0 gap-y-6 w-fit md:gap-x-4 md:w-full min-h-screen">
            <section className="flex flex-col items-center gap-y-3 md:w-full">
              {cart.map((product) => (
                <div
                  key={product.id + Math.random()}
                  className="flex items-center justify-between bg-white rounded-lg py-2 px-3 w-full"
                >
                  <div className="flex items-center">
                    <div className="w-1/4 sm:w-1/5">
                      <img src={product.mainImage} alt={product.titleEn} />
                    </div>
                    <div className="flex flex-col gap-y-8 sm:gap-y-10 justify-between pr-4">
                      <span className="text-sm sm:text-base">
                        {product.titleEn}
                      </span>
                      <span className="text-orange-500 font-bold text-sm sm:text-base">
                        {digitsEnToAr(addCommas(product.price))} تومان
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-8 sm:gap-y-10 justify-between items-end">
                    <button
                      className="text-red-400"
                      onClick={() => handleDelete_FC(product)}
                    >
                      <HiX className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-x-3 sm:gap-x-5">
                      <button
                        onClick={() => handleDecrement_FC(product)}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-red-50 text-red-500 text-lg"
                      >
                        -
                      </button>
                      <span>{product.numInCart}</span>
                      <button
                        onClick={() => handleIncrement_FC(product)}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-green-50 text-green-500 text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </section>
            <section className="w-full flex flex-col bg-white gap-y-3 p-3 text-sm rounded-lg md:w-96">
              <div className="flex flex-col items-start gap-y-2">
                <div className="w-full flex justify-between items-center">
                  <span>مجموع قیمت:</span>
                  <span className="text-red-500 text-lg">
                    {digitsEnToAr(addCommas(totalPrice))}
                  </span>
                </div>
                {discountRes.boolean ? (
                  <div className="w-full flex justify-between items-center">
                    <span>تخفیف:</span>
                    <span className="text-green-500 text-lg">
                      {digitsEnToAr(addCommas(discountRes.discount))}
                    </span>
                  </div>
                ) : (
                  ""
                )}
                <div className="w-full flex justify-between items-center">
                  <span
                    className="text-xs text-blue-500"
                    onClick={() =>
                      document
                        .getElementById("discountChecker")
                        .classList.toggle("hidden")
                    }
                  >
                    کد تخفیف دارید؟
                  </span>
                  <div className="flex flex-col items-end relative">
                    <div
                      className="flex items-center mb-1 pt-1 hidden"
                      id="discountChecker"
                    >
                      <input
                        type="text"
                        className="border border-gray-600 rounded-r-md w-20 focus:outline-none px-2 ltr"
                        placeholder="abc123"
                        onChange={(e) => handleDiscountCode_FC(e)}
                      />
                      <button
                        className="bg-orange-500 rounded-l-md py-[3.3px] px-1 text-xs text-white"
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
              <div className="w-full flex justify-between items-center">
                <span>قیمت نهایی:</span>
                <span className="text-green-500 text-lg">
                  {discountRes.boolean
                    ? digitsEnToAr(addCommas(totalPrice - discountRes.discount))
                    : digitsEnToAr(addCommas(totalPrice))}
                </span>
              </div>
            </section>
          </section>
        ) : (
          <h1 className="w-full text-center text-red-500 text-xl mt-4 min-h-[40vh]">
            سبد خالی است!
          </h1>
        )}
      </Layout>

      {/* Navigator (( Mobile )) */}
      <div className="bg-white shadow-2xl px-5 z-50 sticky bottom-0 left-0 w-full h-16 flex md:hidden items-center justify-between rounded-t-lg">
        <div className="flex items-center justify-between w-full container mx-auto">
          <Link to={{ pathname: "/" }}>
            {loc.pathname !== "/" ? (
              <HiOutlineHome className="h-8 w-8 stroke-gray-400" />
            ) : (
              <HiHome className="h-10 w-10 pl-2" />
            )}
          </Link>
          <Link to={{ pathname: "/list" }}>
            {loc.pathname !== "/list" ? (
              <HiOutlineViewGrid className="h-8 w-8 stroke-gray-400" />
            ) : (
              <HiViewGrid className="h-10 w-10 pl-2" />
            )}
          </Link>
          <Link to={{ pathname: "/cart" }}>
            {loc.pathname !== "/cart" ? (
              cart.length !== 0 ? (
                <div className="relative">
                  <HiOutlineShoppingCart className="h-8 w-8 stroke-orange-400" />
                  <span className="w-5 h-5 rounded-full absolute -top-3 -right-3 bg-orange-500 flex items-center justify-center text-sm text-white">
                    {cart.length}
                  </span>
                </div>
              ) : (
                <HiOutlineShoppingCart className="h-8 w-8 stroke-gray-400" />
              )
            ) : cart.length !== 0 ? (
              <div className="relative">
                <HiShoppingCart className="h-8 w-8 fill-orange-400" />
                <span className="w-5 h-5 rounded-full absolute -top-3 -right-3 bg-orange-500 flex items-center justify-center text-sm text-white">
                  {cart.length}
                </span>
              </div>
            ) : (
              <HiShoppingCart className="h-8 w-8 fill-orange-400" />
            )}
          </Link>
          <Link to={{ pathname: "/favorite" }}>
            {loc.pathname !== "/favorite" ? (
              <HiOutlineHeart className="h-8 w-8 stroke-gray-400" />
            ) : (
              <HiHeart className="h-10 w-10 pl-2 fill-red-500" />
            )}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;
