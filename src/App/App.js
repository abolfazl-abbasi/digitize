import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import ShopPage from "../components/Shop/Shop.jsx";
import Product from "../components/singleProduct/singleProducts.jsx";
import "swiper/css/bundle";

function App() {
  return (
    <>
      <Switch>
        <Route path={"/"} exact>
          <ShopPage />
        </Route>
        <Route path={"/product"}>
          <Product />
        </Route>
      </Switch>
    </>
  );
}

export default App;
