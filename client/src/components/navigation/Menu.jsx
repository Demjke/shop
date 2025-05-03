import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as MenuIcon } from "../../assets/images/components/header/menu.svg";
import { ReactComponent as CloseIcon } from "../../assets/images/pages/cart/close.svg";
import { fetchCategories } from "../../services/categoriesAPI";
import { Loader } from "../UI/Loader";

const Menu = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const { categories, loadingCategories, errorCategories } = useSelector(state => state.categories);

    useEffect(() => {
        fetchCategories(dispatch);
    }, [dispatch]);

    useEffect(() => {
        const closeMenu = ({ target }) => {
            !menuRef.current.contains(target) && setIsOpen(false);
        };

        document.addEventListener("mousedown", closeMenu);
        return () => document.removeEventListener("mousedown", closeMenu);
    }, []);

    return (
        <div className="header-menu menu" ref={menuRef}>
            <MenuIcon className="icon" onClick={() => setIsOpen(!isOpen)} />
            {isOpen && (
                <div className="menu-wrapper">
                    <CloseIcon className="menu-close" onClick={() => setIsOpen(false)} />
                    <div className="menu-title">MENU</div>
                    {loadingCategories ? (
                        <Loader />
                    ) : (
                        <ul className="menu-list">
                            {categories ? (
                                categories.map(({ id, name, subcategories }) => (
                                    <li className="menu-list__category" key={id}>
                                        {}
                                        <Link to={`catalog/${name}`} className="menu-list__title">
                                            {name}
                                        </Link>
                                        <ul className="menu-list__links">
                                            {subcategories.map(({ id: subId, name: subName }) => (
                                                <li className="menu-list__item" key={subId}>
                                                    <Link to={`catalog/${name}/${subName}`} className="menu-list__link">
                                                        {subName}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))
                            ) : (
                                <div className="error-text">{errorCategories && "Ошибка загрузки меню"}</div>
                            )}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default Menu;
