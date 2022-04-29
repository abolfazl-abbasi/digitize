import moment from "jalali-moment";
import React, { createContext, useContext, useEffect, useState } from "react";
// import { startTransition } from "react";
import { useHistory } from "react-router-dom";
import {
  useCartDispatcher,
  useFinalPrice,
  useStartTransition,
} from "./CartProvider";
// import { useProducts } from "./productsProvider";
import { toast } from "react-toastify/dist";
import Swal from "sweetalert2";

const DeliveryDaysContext = createContext();
const DeliveryDaysContextProvider = createContext();
const DeliveryDayContext = createContext();
const DeliveryDayContextProvider = createContext();
const AddressContext = createContext();
const AddressContextProvider = createContext();
const OrdersContext = createContext();
const OrdersContextProvider = createContext();
const OrdersShowContext = createContext();
const OrdersShowContextProvider = createContext();
const SelectedOrderContext = createContext();
const SelectedOrderContextProvider = createContext();

const CheckoutProvider = ({ children }) => {
  const [deliveryDay, setDeliveryDay] = useState();
  const [deliveryDays, setDeliveryDays] = useState();
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [address, setAddress] = useState({
    name: "",
    address: "",
    edited: false,
  });

  useEffect(() => {
    if (localStorage.getItem("userAddressData")) {
      const data = JSON.parse(localStorage.getItem("userAddressData"));
      setAddress(data);
    }
    if (localStorage.getItem("userOrdersData")) {
      const data = JSON.parse(localStorage.getItem("userOrdersData"));
      setOrders(data);
      setShowOrders(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userAddressData", JSON.stringify(address));
    localStorage.setItem("userOrdersData", JSON.stringify(orders));
  }, [address, orders]);

  return (
    <>
      <OrdersContext.Provider value={orders}>
        <OrdersShowContext.Provider value={showOrders}>
          <OrdersContextProvider.Provider value={setOrders}>
            <OrdersShowContextProvider.Provider value={setShowOrders}>
              <DeliveryDaysContext.Provider value={deliveryDays}>
                <DeliveryDaysContextProvider.Provider value={setDeliveryDays}>
                  <DeliveryDayContext.Provider value={deliveryDay}>
                    <DeliveryDayContextProvider.Provider value={setDeliveryDay}>
                      <AddressContext.Provider value={address}>
                        <AddressContextProvider.Provider value={setAddress}>
                          <SelectedOrderContext.Provider value={selectedOrder}>
                            <SelectedOrderContextProvider.Provider
                              value={setSelectedOrder}
                            >
                              {children}
                            </SelectedOrderContextProvider.Provider>
                          </SelectedOrderContext.Provider>
                        </AddressContextProvider.Provider>
                      </AddressContext.Provider>
                    </DeliveryDayContextProvider.Provider>
                  </DeliveryDayContext.Provider>
                </DeliveryDaysContextProvider.Provider>
              </DeliveryDaysContext.Provider>
            </OrdersShowContextProvider.Provider>
          </OrdersContextProvider.Provider>
        </OrdersShowContext.Provider>
      </OrdersContext.Provider>
    </>
  );
};

export const useOrders = () => useContext(OrdersContext);
export const useDeliveryDays = () => useContext(DeliveryDaysContext);
export const useDeliveryDay = () => useContext(DeliveryDayContext);
export const useAddress = () => useContext(AddressContext);
export const useShowOrder = () => useContext(OrdersShowContext);
export const useSelectedOrder = () => useContext(SelectedOrderContext);

export const useCheckoutProvider = () => {
  //? Providers \\
  const setOrders = useContext(OrdersContextProvider);
  const setDeliveryDays = useContext(DeliveryDaysContextProvider);
  const setDeliveryDay = useContext(DeliveryDayContextProvider);
  const setAddress = useContext(AddressContextProvider);
  const setShowOrders = useContext(OrdersShowContextProvider);
  const setSelectedOrder = useContext(SelectedOrderContextProvider);

  const startTransition = useStartTransition();

  const { setCart } = useCartDispatcher();

  const deliveryDay = useDeliveryDay();
  const orders = useOrders();
  const address = useAddress();
  const finalPrice = useFinalPrice();

  const his = useHistory();

  //? Handlers \\
  const handleDayInMonth = (day) => {
    return Number(moment().add(day, "day").format("jDD"));
  };

  const handleDate = (day) => {
    return moment().add(day, "day").format("jYYYY-jMM-jDD");
  };

  const handleDayOfWeek = (day) => {
    switch (moment().add(day, "day").jDay()) {
      case 0:
        return "شنبه";
      case 1:
        return "یکشنبه";
      case 2:
        return "دوشنبه";
      case 3:
        return "سه شنبه";
      case 4:
        return "چهارشنبه";
      case 5:
        return "پنجشنبه";
      case 6:
        return "جمعه";

      default:
        his.push("/");
    }
  };

  const handleDay = (day) => {
    setDeliveryDay(day);
    console.log(day);
  };

  const handleEditAddress = (edited, newAddress, newName) => {
    // setAddress({ ...address });
    setAddress({ ...address, name: newName, address: newAddress });
    if (edited) {
      setAddress({ ...address, edited: !address.edited });
    }
  };

  const handleSetOrder = (data) => {
    setOrders([
      {
        category: "current",
        orderNum: Math.random().toString().slice(2, 10),
        deliveryDay: deliveryDay.split("-").reverse(),
        orderPrice: finalPrice,
        data: data.map((product) => ({
          image: product.mainImage,
          id: product.id,
          numOnCart: product.numOnCart,
          activeColor: product.activeColor,
        })),
      },
      ...orders,
    ]);
    setOrders([
      {
        category: "current",
        orderNum: Math.random().toString().slice(2, 10),
        deliveryDay: deliveryDay.split("-").reverse(),
        orderPrice: finalPrice,
        data: data.map((product) => ({
          image: product.mainImage,
          id: product.id,
          numOnCart: product.numOnCart,
          activeColor: product.activeColor,
        })),
      },
      ...orders,
    ]);

    his.push("/profile/orders");

    toast.success("", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    startTransition(() => {
      setDeliveryDay("");
      setCart([]);
    });
  };

  const handleSelectedOrder = (category) => {
    if (category === "") {
      setSelectedOrder(category);
      return setShowOrders(orders);
    }
    setSelectedOrder(category);
    setShowOrders(orders.filter((order) => order.category === category));
  };

  const handleCategory = (order, category) => {
    const updatedOrders = [...orders];
    const index = updatedOrders.findIndex((o) => o.orderNum === order.orderNum);
    Swal.fire({
      title: "آیا از این کار اطمینان دارید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "خیر",
      confirmButtonText: "بله",
    }).then((result) => {
      if (result.isConfirmed) {
        if (category === "canceled") {
          updatedOrders[index] = {
            ...updatedOrders[index],
            category: category,
            cancelDate: moment().format("jYYYY-jMM-jDD"),
          };
          setSelectedOrder("");
          setOrders(updatedOrders);
          return setShowOrders(updatedOrders);
        }
        updatedOrders[index] = { ...updatedOrders[index], category: category };
        setSelectedOrder("");
        setOrders(updatedOrders);
        setShowOrders(updatedOrders);
      }
    });
  };
  //! Handlers \\

  //? returned handlers for use \\
  return {
    setDeliveryDay,
    setDeliveryDays,
    setAddress,
    setOrders,
    setSelectedOrder,
    setShowOrders,
    handleDay,
    handleDayInMonth,
    handleDate,
    handleDayOfWeek,
    handleEditAddress,
    handleSetOrder,
    handleCategory,
    handleSelectedOrder,
  };
};

export default CheckoutProvider;
