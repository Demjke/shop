import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../services/productAPI";
import { fetchProducts } from "../../services/productsAPI";
import { Loader } from "../UI/Loader";
// import { addToCart } from "../redux/slices/cartSlice";
// import { ReactComponent as CartIcon } from "../../assets/images/pages/products/cart.svg";
import ProductCard from "../features/Catagog/ProductCard";
import Sort from "../features/Catagog/Sorting";
import Slider from "../UI/Slider";

const Product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { products, product, loadingProducts, errorProducts, loadingProduct, errorProduct } = useSelector(
        state => state.products
    );

    const { categories } = useSelector(state => state.categories);

    useEffect(() => {
        fetchProducts(dispatch, { params: { size: 3 } });
    }, [dispatch]);

    useEffect(() => {
        fetchProduct(dispatch, id);
    }, [dispatch, id]);

    const subcategory = categories.find(item => item.id === product?.categoryId);

    return (
        <div className="product">
            {loadingProduct && <Loader />}
            {errorProduct && <div className="error">Ошибка загрузки товара: {errorProduct}</div>}
            {!loadingProduct && !errorProduct && product && (
                <>
                    <Slider images={product.images ?? []} />
                    <div className="product-info info">
                        <div className="container">
                            <div className="info-wrapper">
                                <div className="info-content">
                                    <div className="info-subtitle">{subcategory?.name || "Unknown"} COLLECTION</div>
                                    <div className="info-title">{product.name}</div>
                                    <div className="info-text">{product.description}</div>
                                    <div className="info-price">${product.price}</div>
                                    <Sort />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className="product-popular popular">
                <div className="container">
                    {loadingProducts ? (
                        <Loader />
                    ) : products.length > 0 ? (
                        <div className="popular-wrapper">
                            {products.map(product => (
                                <ProductCard key={product.id} id={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="home-products__error">{errorProducts ? "Ошибка загрузки" : "Товаров нет"}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
