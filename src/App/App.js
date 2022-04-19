import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import ShopPage from "../Pages/ShopPage.jsx";
import Product from "../Pages/singleProductsPage.jsx";
import "swiper/css/bundle";
// import { useEffect } from "react";
import Products from "../data/products.js";
import Cart from "../Pages/CartPage.jsx";
import Favorites from "../Pages/FavoritesPage.jsx";

function App() {
  return (
    <>
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
      </Switch>
    </>
  );
}

export default App;
