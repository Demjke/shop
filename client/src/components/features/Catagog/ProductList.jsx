import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands, fetchDesigners, fetchProducts } from "../../../services/productsAPI";
import Adva from "../../layout/Adva";
import Breadcrumbs from "../../navigation/Breadcrumbs";
import Paginations from "../../navigation/Pagination";
import { Loader } from "../../UI/Loader";
import Filters from "./Filters";
import ProductCard from "./ProductCard";
import Sort from "./Sorting";

const ProductList = () => {
    const { products, loadingProducts, errorProducts } = useSelector(state => state.products);
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(12);

    useEffect(() => {
        fetchProducts(dispatch, { params: { page, size } });
    }, [dispatch, page, size]);

    useEffect(() => {
        fetchBrands(dispatch);
    }, [dispatch]);

    useEffect(() => {
        fetchDesigners(dispatch);
    }, [dispatch]);

    return (
        <div className="catalog">
            <Breadcrumbs />
            {loadingProducts ? (
                <Loader />
            ) : products.length > 0 ? (
                <div className="catalog-content">
                    <div className="catalog-filters filters">
                        <div className="container">
                            <div className="filters-wrapper">
                                <Filters />
                                <Sort />
                            </div>
                        </div>
                    </div>
                    <div className="catalog-list">
                        <div className="container">
                            <div className="catalog-wrapper">
                                {products.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <Paginations setPage={setPage} />
                </div>
            ) : (
                <div className="catalog-error">{errorProducts ? "Ошибка загрузки" : "Товаров нет"}</div>
            )}
            <Adva />
        </div>
    );
};

export default ProductList;
