import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CUSTOM_ROUTES } from "./constants/custom-routes";
import Home from "./pages/Home";
import Order from "./pages/Order";
import OrderItem from "./pages/OrderItem";
import Cart from "./pages/Cart";
import Faq from "./pages/Faq";
import Contacts from "./pages/Contacts";
import Layout from "./constants/Layout";
import NotFound from "./components/NotFound/NotFound";
import SpinnerLoader from "./components/SpinnerLoader";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { AuthProvider } from "./stores/authProvider";
import { CartProvider } from "./stores/cartContext.jsx";
import CreateMenus from "./pages/CreateMenus/CreateMenus";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <SpinnerLoader />
          <Routes>
            <Route path={CUSTOM_ROUTES.HOME} element={<Layout />}>
              <Route index element={<Home />} />
              <Route path={CUSTOM_ROUTES.ORDER} element={<Order />} />
              <Route path={CUSTOM_ROUTES.ORDER_ITEM} element={<OrderItem />} />
              <Route path={CUSTOM_ROUTES.CART} element={<Cart />} />
              <Route path={CUSTOM_ROUTES.FAQ} element={<Faq />} />
              <Route path={CUSTOM_ROUTES.CONTACTS} element={<Contacts />} />
              <Route path={CUSTOM_ROUTES.LOGIN} element={<Login />} />
              <Route path={CUSTOM_ROUTES.REGISTER} element={<Register />} />

              <Route element={<ProtectedRoutes />}>
                <Route
                  path={CUSTOM_ROUTES.CREATE_MENUS}
                  element={<CreateMenus />}
                />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
