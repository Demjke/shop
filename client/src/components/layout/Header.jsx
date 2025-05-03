import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as CartIcon } from "../../assets/images/components/header/cart.svg";
import { ReactComponent as LoginIcon } from "../../assets/images/components/header/login.svg";
import Logo from "../../assets/images/components/header/logo.png";
import Menu from "../navigation/Menu";
import Search from "../UI/Search";

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header-wrapper">
                    <div className="header-info">
                        <Link to="/" className="logo">
                            <img src={Logo} alt="Logo" />
                        </Link>
                        <Search />
                    </div>
                    <div className="header-content">
                        <Menu />
                        <Link to="/login" className="header-login">
                            <LoginIcon className="icon" />
                        </Link>
                        <Link to="/cart" className="header-cart cart">
                            <CartIcon className="icon" />
                            {/* {countCart > 0 && <div className="cart-count">{countCart}</div>} */}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
