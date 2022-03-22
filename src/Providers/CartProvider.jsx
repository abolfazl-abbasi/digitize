import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();
const CartContextProvider = createContext();
const DiscountCodeContext = createContext();
const DiscountCodeContextProvider = createContext();
const DiscountResContext = createContext();
const DiscountResContextProvider = createContext();
const TotalPriceContext = createContext();
const TotalPriceContextProvider = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [discountRes, setDiscountRes] = useState({
    boolean: false,
    response: "",
    discount: 0,
  });

  return (
    <>
      <CartContext.Provider value={cart}>
        <CartContextProvider.Provider value={setCart}>
          <TotalPriceContext.Provider value={totalPrice}>
            <TotalPriceContextProvider.Provider value={setTotalPrice}>
              <DiscountCodeContext.Provider value={discountCode}>
                <DiscountCodeContextProvider.Provider value={setDiscountCode}>
                  <DiscountResContext.Provider value={discountRes}>
                    <DiscountResContextProvider.Provider value={setDiscountRes}>
                      {children}
                    </DiscountResContextProvider.Provider>
                  </DiscountResContext.Provider>
                </DiscountCodeContextProvider.Provider>
              </DiscountCodeContext.Provider>
            </TotalPriceContextProvider.Provider>
          </TotalPriceContext.Provider>
        </CartContextProvider.Provider>
      </CartContext.Provider>
    </>
  );
};

export const useCart = () => useContext(CartContext);
export const useDiscountCode = () => useContext(DiscountCodeContext);
export const useDiscountRes = () => useContext(DiscountResContext);
export const useTotalPrice = () => useContext(TotalPriceContext);

export const useCartDispatcher = () => {
  const cart = useCart();
  const totalPrice = useTotalPrice();
  const discountCode = useDiscountCode();
  const setCart = useContext(CartContextProvider);
  const setTotalPrice = useContext(TotalPriceContextProvider);
  const setDiscountCode = useContext(DiscountCodeContextProvider);
  const setDiscountRes = useContext(DiscountResContextProvider);

  const handleAddToCart_FC = (product) => {
    if (cart.map((pro) => pro.id === product.id).indexOf(true) !== -1) {
      return;
    }
    setCart([...cart, { ...product, numInCart: 1 }]);
    console.log(totalPrice, product.price);
    setTotalPrice(totalPrice + product.price);
  };

  const handleIncrement_FC = (product) => {
    const updatedCart = [...cart];
    const index = updatedCart.indexOf(product);
    updatedCart[index] = { ...product };
    updatedCart[index].numInCart += 1;
    setCart(updatedCart);
    setTotalPrice(totalPrice + product.price);
  };

  const handleDecrement_FC = (product) => {
    const updatedCart = [...cart];
    const index = updatedCart.indexOf(product);
    updatedCart[index] = { ...product };
    if (product.numInCart === 1) {
      return setCart(updatedCart.filter((pro) => pro.id !== product.id));
    }
    updatedCart[index].numInCart -= 1;
    setCart(updatedCart);
    setTotalPrice(totalPrice - product.price);
  };

  const handleDelete_FC = (product) => {
    setCart(cart.filter((pro) => pro.id !== product.id));
    setTotalPrice(totalPrice - product.price * product.numInCart);
  };

  const handleDiscountCode_FC = (e) => {
    setDiscountCode(e.target.value);
  };

  const handleDiscount_FC = (e) => {
    if (discountCode === "abc123") {
      setDiscountRes({
        boolean: true,
        response: "کد تخفیف تایید شد!",
        discount: 2_000_000,
      });
    } else {
      setDiscountRes({
        boolean: false,
        response: "کد تخفیف اشتباه است!",
        discount: 0,
      });
      setTimeout(() => {
        setDiscountRes({
          boolean: false,
          response: "",
          discount: 0,
        });
      }, 5000);
    }
  };

  return {
    handleAddToCart_FC,
    handleDecrement_FC,
    handleDelete_FC,
    handleIncrement_FC,
    handleDiscount_FC,
    handleDiscountCode_FC,
  };
};

export default CartProvider;
