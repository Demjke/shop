import { Route, Routes } from "react-router-dom";
import ProductList from "../features/Catagog/ProductList";
import Product from "./Product";

const Products = () => {
    return (
        <div className="catalog">
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/:id" element={<Product />} />
            </Routes>
        </div>
    );
};

export default Products;
