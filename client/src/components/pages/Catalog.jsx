import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductList from "../features/Catagog/ProductList";

const Catalog = () => {
    return (
        <div>
            <Routes>
                <Route path="/*" element={<ProductList />} />
            </Routes>
        </div>
    );
};

export default Catalog;
