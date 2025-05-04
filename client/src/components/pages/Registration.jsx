import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LoginArrow } from "../../assets/images/pages/registration/arrow.svg";
import LoginInfo from "../layout/LoginInfo";
import Breadcrumbs from "../navigation/Breadcrumbs";

const Registration = () => {
    return (
        <div className="registration">
            <Breadcrumbs />
            <div className="registration-inner">
                <div className="container">
                    <div className="registration-wrapper">
                        <form action="" className="registration-form">
                            <div className="registration-form__block">
                                <div className="registration-form__title">Your Name</div>
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    className="registration-form__input"
                                    placeholder="First Name"
                                />
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    className="registration-form__input"
                                    placeholder="Last Name"
                                />
                            </div>
                            <div className="registration-form__radios">
                                <label className="registration-form__radio">
                                    <input type="radio" name="gender" value="male" />
                                    <span className="registration-form__mark"></span>
                                    Male
                                </label>
                                <label className="registration-form__radio">
                                    <input type="radio" name="gender" value="female" />
                                    <span className="registration-form__mark"></span>
                                    Female
                                </label>
                            </div>
                            <div className="registration-form__block">
                                <div className="registration-form__title">Login details</div>
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    className="registration-form__input"
                                    placeholder="Email"
                                />
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    className="registration-form__input"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="registration-form__text">
                                Please use 8 or more characters, with at least 1 number and a mixture of uppercase and
                                lowercase letters
                            </div>
                            <div className="registration-form__btns">
                                <button type="submit" className="registration-form__btn">
                                    JOIN NOW <LoginArrow className="icon" />
                                </button>
                                <Link to="/login" className="registration-form__btn">
                                    LOGIN <LoginArrow className="icon" />
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

export default Registration;
