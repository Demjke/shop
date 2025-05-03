import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LoginArrow } from "../../assets/images/pages/registration/arrow.svg";
import LoginInfo from "../layout/LoginInfo";
import Breadcrumbs from "../navigation/Breadcrumbs";

const Login = () => {
    return (
        <div className="login">
            <Breadcrumbs />
            <div className="login-inner">
                <div className="container">
                    <div className="login-wrapper">
                        <form action="" className="login-form">
                            <div className="login-form__block">
                                <div className="login-form__title">Login details</div>
                                <input type="text" name="" id="" className="login-form__input" placeholder="Email" />
                                <input type="text" name="" id="" className="login-form__input" placeholder="Password" />
                            </div>
                            <div className="login-form__btns">
                                <button type="submit" className="login-form__btn">
                                    JOIN NOW <LoginArrow className="icon" />
                                </button>
                                <Link to="/registration" className="login-form__btn">
                                    REGISTRATION <LoginArrow className="icon" />
                                </Link>
                            </div>
                        </form>
                        <LoginInfo />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
