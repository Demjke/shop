import React from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "../pages/Cart";
import Catalog from "../pages/Catalog";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Products from "../pages/Products";
import Registration from "../pages/Registration";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog/*" element={<Catalog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/products/*" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    );
};

export default AppRoutes;
