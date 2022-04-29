import {
  HiHeart,
  HiHome,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineShoppingCart,
  HiOutlineUser,
  HiOutlineUserCircle,
  HiShoppingCart,
  HiUser,
  HiUserCircle,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../Providers/CartProvider";

const NavigatorMobile = () => {
  const loc = useLocation();

  const cart = useCart();

  return (
    <>
      <div className="sticky bottom-0 left-0 z-50 flex h-16 w-full items-center justify-between rounded-t-lg bg-white px-5 shadow-2xl md:hidden">
        <div className="container mx-auto flex w-full items-center justify-between">
          <Link to={{ pathname: "/" }}>
            {loc.pathname !== "/" ? (
              <HiOutlineHome className="h-8 w-8 stroke-gray-400" />
            ) : (
              <HiHome className="h-10 w-10 pl-2" />
            )}
          </Link>
          <Link to={{ pathname: "/cart" }}>
            {loc.pathname !== "/cart" ? (
              cart.length !== 0 ? (
                <div className="relative">
                  <HiOutlineShoppingCart className="h-8 w-8 stroke-orange-400" />
                  <span className="absolute -top-3 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-sm text-white">
                    {cart.length}
                  </span>
                </div>
              ) : (
                <HiOutlineShoppingCart className="h-8 w-8 stroke-gray-400" />
              )
            ) : cart.length !== 0 ? (
              <div className="relative">
                <HiShoppingCart className="h-8 w-8 fill-orange-400" />
                <span className="absolute -top-3 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-sm text-white">
                  {cart.length}
                </span>
              </div>
            ) : (
              <HiShoppingCart className="h-8 w-8 fill-orange-400" />
            )}
          </Link>
          <Link to={{ pathname: "/favorites" }}>
            {loc.pathname !== "/favorites" ? (
              <HiOutlineHeart className="h-8 w-8 stroke-gray-400" />
            ) : (
              <HiHeart className="h-10 w-10 fill-red-500 pl-2" />
            )}
          </Link>
          <Link to={{ pathname: "/profile" }}>
            {loc.pathname.startsWith("/profile") ? (
              <HiUserCircle className="h-10 w-10 fill-gray-800 pl-2" />
            ) : (
              <HiOutlineUserCircle className="h-8 w-8 stroke-gray-400" />
            )}
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavigatorMobile;
