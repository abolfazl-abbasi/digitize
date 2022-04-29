import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useProducts, useProductsDispatcher } from "./productsProvider";

const CartContext = createContext();
const CartContextProvider = createContext();
const DiscountCodeContext = createContext();
const DiscountCodeContextProvider = createContext();
const DiscountResContext = createContext();
const DiscountResContextProvider = createContext();
const TotalPriceContext = createContext();
const TotalPriceContextProvider = createContext();
const FinalPriceContext = createContext();
const FinalPriceContextProvider = createContext();
const StartTransition = createContext();
const Pending = createContext();

const CartProvider = ({ children }) => {
  const [pending, startTransition] = useTransition();
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [discountRes, setDiscountRes] = useState({
    boolean: false,
    response: "",
    discount: 0,
  });

  const products = useProducts();
  const { setProducts } = useProductsDispatcher();

  useEffect(() => {
    if (localStorage.getItem("userCartData")) {
      const updatedProducts = [...products];
      const data = JSON.parse(localStorage.getItem("userCartData"));

      let pros = [];

      for (let i = 0; i < data.length; i++) {
        const product = updatedProducts.find((o) => o.id === data[i].id);
        pros = [
          ...pros,
          {
            ...product,
            numOnCart: data[i].numOnCart,
            activeColor: data[i].activeColor,
          },
        ];
      }

      setTotalPrice(
        cart.reduce((sum, i) => {
          return sum + i.price * i.numOnCart;
        }, 0)
      );

      setCart([...pros]);
      setProducts([...updatedProducts]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "userCartData",
      JSON.stringify(
        cart.map((o) => ({
          id: o.id,
          numOnCart: o.numOnCart,
          activeColor: o.activeColor,
        }))
      )
    );
  }, [cart]);

  return (
    <>
      <CartContext.Provider value={cart}>
        <CartContextProvider.Provider value={setCart}>
          <StartTransition.Provider value={startTransition}>
            <Pending.Provider value={pending}>
              <TotalPriceContext.Provider value={totalPrice}>
                <TotalPriceContextProvider.Provider value={setTotalPrice}>
                  <FinalPriceContext.Provider value={finalPrice}>
                    <FinalPriceContextProvider.Provider value={setFinalPrice}>
                      <DiscountCodeContext.Provider value={discountCode}>
                        <DiscountCodeContextProvider.Provider
                          value={setDiscountCode}
                        >
                          <DiscountResContext.Provider value={discountRes}>
                            <DiscountResContextProvider.Provider
                              value={setDiscountRes}
                            >
                              {children}
                            </DiscountResContextProvider.Provider>
                          </DiscountResContext.Provider>
                        </DiscountCodeContextProvider.Provider>
                      </DiscountCodeContext.Provider>
                    </FinalPriceContextProvider.Provider>
                  </FinalPriceContext.Provider>
                </TotalPriceContextProvider.Provider>
              </TotalPriceContext.Provider>
            </Pending.Provider>
          </StartTransition.Provider>
        </CartContextProvider.Provider>
      </CartContext.Provider>
    </>
  );
};

export const useCart = () => useContext(CartContext);
export const useDiscountCode = () => useContext(DiscountCodeContext);
export const useDiscountRes = () => useContext(DiscountResContext);
export const useTotalPrice = () => useContext(TotalPriceContext);
export const useFinalPrice = () => useContext(FinalPriceContext);
export const useStartTransition = () => useContext(StartTransition);
export const usePending = () => useContext(Pending);

export const useCartDispatcher = () => {
  //? Providers \\
  const cart = useCart();
  const totalPrice = useTotalPrice();
  const discountCode = useDiscountCode();
  const discountRes = useDiscountRes();
  const setCart = useContext(CartContextProvider);
  const setTotalPrice = useContext(TotalPriceContextProvider);
  const setFinalPrice = useContext(FinalPriceContextProvider);
  const setDiscountCode = useContext(DiscountCodeContextProvider);
  const setDiscountRes = useContext(DiscountResContextProvider);
  const shipping = 25_000;

  //? Handlers \\
  const handleAddToCart_FC = (product) => {
    if (
      cart
        .map(
          (pro) =>
            pro.id === product.id && pro.activeColor === product.activeColor
        )
        .indexOf(true) !== -1
    ) {
      return;
    }
    setCart([...cart, { ...product, numOnCart: 1 }]);
    setTotalPrice(
      cart.reduce((sum, i) => {
        return sum + i.price * i.numOnCart;
      }, 0)
    );
  };

  const handleIncrement_FC = (product) => {
    const updatedCart = [...cart];
    const index = updatedCart.indexOf(product);
    updatedCart[index] = { ...product };
    updatedCart[index].numOnCart += 1;
    setCart(updatedCart);
    setTotalPrice(totalPrice + product.price);
  };

  const handleDecrement_FC = (product) => {
    const updatedCart = [...cart];
    const index = updatedCart.indexOf(product);
    updatedCart[index] = { ...product };

    if (product.numOnCart === 1) {
      return setCart(
        updatedCart.filter(
          (pro) => pro.id + pro.activeColor !== product.id + product.activeColor
        )
      );
    }

    updatedCart[index].numOnCart -= 1;
    setCart(updatedCart);
    setTotalPrice(
      cart.reduce((sum, i) => {
        return sum + i.price * i.numOnCart;
      }, 0)
    );
  };

  const handleDelete_FC = (product) => {
    const updatedCart = [...cart];
    const index = updatedCart.indexOf(product);
    setCart(
      updatedCart.filter(
        (pro) => pro.id + pro.activeColor !== product.id + product.activeColor
      )
    );
    updatedCart[index].numOnCart = 0;
  };

  const handleDiscountCode_FC = (e) => {
    setDiscountRes({
      boolean: false,
      response: "",
      discount: 0,
    });
    setDiscountCode(e.target.value);
  };

  const handleDiscount_FC = (e) => {
    setDiscountRes({
      boolean: false,
      response: "",
      discount: 0,
    });
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

  setTotalPrice(
    cart.reduce((sum, i) => {
      return sum + i.price * i.numOnCart;
    }, 0)
  );

  setFinalPrice(totalPrice - discountRes.discount + shipping);
  //! Handlers \\

  //? returned handlers for use \\
  return {
    handleAddToCart_FC,
    handleDecrement_FC,
    handleDelete_FC,
    handleIncrement_FC,
    handleDiscount_FC,
    handleDiscountCode_FC,
    setCart,
  };
};

export default CartProvider;
