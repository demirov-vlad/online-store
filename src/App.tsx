import "./scss/app.scss";
import { Home } from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { Suspense, lazy } from "react";

const Cart = lazy(() => import("./pages/Cart"));
const PizzaDescription = lazy(() => import("./pages/PizzaDescription"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />

        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          }
        />

        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PizzaDescription />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
