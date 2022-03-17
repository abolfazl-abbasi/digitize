import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import ShopPage from "../Pages/ShopPage.jsx";
import Product from "../Pages/singleProductsPage.jsx";
import "swiper/css/bundle";
import { useEffect } from "react";
import Products from "../data/products.js";

function App() {
  useEffect(() => {});
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
      </Switch>
    </>
  );
}

export default App;
