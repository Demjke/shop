import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../services/productsAPI";
import { Loader } from "../UI/Loader";
import ProductCard from "../features/Catagog/ProductCard";
import CategoryItem from "../features/Home/CategoryItem";
import Adva from "../layout/Adva";

const Home = () => {
    const { products, loadingProducts, errorProducts } = useSelector(state => state.products);
    const { categories, loadingCategories, errorCategories } = useSelector(state => state.categories);

    const dispatch = useDispatch();

    useEffect(() => {
        fetchProducts(dispatch, { size: 6 });
    }, [dispatch]);

    return (
        <div className="home">
            <div className="home-intro intro">
                <div className="container">
                    <div className="intro-wrapper">
                        <div className="intro-info">
                            <div className="intro-title">THE BRAND</div>
                            <div className="intro-text">
                                OF LUXERIOUS <span>FASHION</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-category category">
                <div className="container">
                    {loadingCategories ? (
                        <Loader />
                    ) : categories.length > 0 ? (
                        <div className="category-wrapper">
                            {categories.map(category => (
                                <CategoryItem category={category} key={category.id} />
                            ))}
                        </div>
                    ) : (
                        <div className="home-products__error">
                            {errorCategories ? "Ошибка загрузки" : "Категорий нет"}
                        </div>
                    )}
                </div>
            </div>
            <div className="home-products">
                <div className="container">
                    <div className="home-products__title">Fetured Items</div>
                    <div className="home-products__text">Shop for items based on what we featured in this week</div>
                    {loadingProducts ? (
                        <Loader />
                    ) : products.length > 0 ? (
                        <div className="home-products__wrapper">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="home-products__error">{errorProducts ? "Ошибка загрузки" : "Товаров нет"}</div>
                    )}
                    <Link to="/catalog" className="home-products__btn">
                        Browse All Product
                    </Link>
                </div>
            </div>
            <Adva />
        </div>
    );
};

export default Home;
