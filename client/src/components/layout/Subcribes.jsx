import React from "react";
import Avatar from "./../../assets/images/components/footer/avatar.png";

const Subcribes = () => {
    return (
        <div className="footer-subscribe subscribe">
            <div className="container">
                <div className="subscribe-wrapper">
                    <div className="subscribe-info">
                        <img src={Avatar} alt="" />
                        <div className="subscribe-info__text">
                            “Vestibulum quis porttitor dui! Quisque viverra nunc mi, a pulvinar purus condimentum“
                        </div>
                    </div>
                    <div className="subscribe-form">
                        <div className="subscribe-form__title">SUBSCRIBE</div>
                        <div className="subscribe-form__subtitle">FOR OUR NEWLETTER AND PROMOTION</div>
                        <div className="subscribe-form__box">
                            <input
                                className="subscribe-form__input"
                                type="text"
                                name=""
                                id=""
                                placeholder="Enter Your Email"
                            />
                            <button type="button" className="subscribe-form__btn">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subcribes;
