import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../../assets/images/components/header/search.svg";
import { ReactComponent as CloseIcon } from "../../assets/images/pages/cart/close.svg";
import { fetchProducts } from "../../services/productsAPI";
import { Loader } from "./Loader";

const Search = () => {
    const dispatch = useDispatch();
    const searchRef = useRef(null);
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [searched, setSearched] = useState(false);
    const { searchProducts, loadingProducts, errorProducts } = useSelector(state => state.products);

    const handleSearchValue = ({ target }) => {
        setQuery(target.value);
        if (target.value.trim() !== "") {
            setSearched(true);
            fetchProducts(dispatch, { query: target.value });
        } else {
            setSearched(false);
        }
    };

    useEffect(() => {
        const closeSearch = ({ target }) => {
            if (!searchRef.current.contains(target)) {
                setIsOpen(false);
                setQuery("");
                setSearched(false);
            }
        };

        document.addEventListener("mousedown", closeSearch);
        return () => document.removeEventListener("mousedown", closeSearch);
    }, []);

    return (
        <div className="header-search search" ref={searchRef}>
            <SearchIcon
                className="icon"
                onClick={() => setIsOpen(!isOpen)}
                style={{ color: isOpen ? "#000" : "#fff" }}
            />
            {isOpen && (
                <div className="search-wrapper">
                    <input
                        type="search"
                        placeholder="Введите название товара"
                        className="search-input"
                        onChange={handleSearchValue}
                        value={query}
                    />
                    <CloseIcon className="search-close" onClick={() => setIsOpen(false)} />
                    {query && (
                        <div className="search-products">
                            <div className="search-list">
                                {loadingProducts ? (
                                    <Loader />
                                ) : searchProducts.length > 0 ? (
                                    searchProducts.map(({ id, images, name }) => (
                                        <Link to="" className="search-product" key={id}>
                                            <div className="search-product__img">
                                                <img
                                                    src={`${process.env.REACT_APP_UPLOADS}products/${images[0]}`}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="search-product__title">{name}</div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="error-text">
                                        {errorProducts ? "Ошибка загрузки товаров" : searched && "Товаров нет"}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
