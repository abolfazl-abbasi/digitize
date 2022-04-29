import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import ShopPage from "../Pages/ShopPage.jsx";
import Product from "../Pages/singleProductsPage.jsx";
import "swiper/css/bundle";
// import { useEffect } from "react";
import Products from "../data/products.js";
import Cart from "../Pages/CartPage.jsx";
import Favorites from "../Pages/FavoritesPage.jsx";
import Signup from "../Pages/SignupPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../Pages/LoginPage.jsx";
import { useEffect } from "react";
import { useUserDataDispatcher } from "../Providers/SignProvider.jsx";
import axios from "axios";
import Profile from "../Pages/ProfilePage.jsx";
import Checkout from "../Pages/CheckoutPage.jsx";
import "swiper/css/bundle";

function App() {
  const { setUserData } = useUserDataDispatcher();

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("userSignData"));

    if (localData)
      axios
        .post("http://localhost:5000/api/user/login", {
          email: localData.email,
          password: localData.password,
        })
        .then((res) => {
          const { data } = res;

          if (res.status === 200)
            setUserData({
              name: data.name,
              phoneNumber: data.phoneNumber,
              email: data.email,
              password: localData.password,
            });
        })
        .catch((err) => {
          setUserData(null);
        });
  }, []);

  return (
    <>
      <ToastContainer />
      <Switch>
        <Route path={"/"} exact>
          <ShopPage />
        </Route>
        <Route
          path={"/products/:id"}
          render={(e) =>
            e.match.params.id < Products.length ? (
              <Product />
            ) : (
              e.history.push("/")
            )
          }
        ></Route>
        <Route path={"/cart"}>
          <Cart />
        </Route>
        <Route path={"/favorites"}>
          <Favorites />
        </Route>
        <Route path={"/signup"}>
          <Signup />
        </Route>
        <Route path={"/login"}>
          <Login />
        </Route>
        <Route path={"/profile"}>
          <Profile />
        </Route>
        <Route path={"/checkout"}>
          <Checkout />
        </Route>
      </Switch>
    </>
  );
}

export default App;
