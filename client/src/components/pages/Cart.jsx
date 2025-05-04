import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../../redux/slices/cartSlice";
import CartItem from "../features/Cart/CartItem";
import Breadcrumbs from "../navigation/Breadcrumbs";

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const totalPrice = cart.reduce((acc, { count, item }) => acc + item.price * count, 0);

    return (
        <div className="cart">
            <Breadcrumbs />
            <div className="cart-inner">
                <div className="container">
                    {cart.length > 0 ? (
                        <div className="cart-wrapper">
                            <div className="cart-items">
                                {cart.map((item, i) => (
                                    <CartItem key={i} cartItem={item} />
                                ))}
                                <div className="cart-btns">
                                    <button className="cart-btn" onClick={() => dispatch(clearCart())}>
                                        CLEAR SHOPPING CART
                                    </button>
                                    <Link to="/catalog" className="cart-btn">
                                        CONTINUE SHOPPING
                                    </Link>
                                </div>
                            </div>
                            <form className="cart-order order">
                                <div className="order-info">
                                    <div className="order-info__title">SHIPPING ADRESS</div>
                                    <div className="order-form">
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            className="order-form__input"
                                            placeholder="Bangladesh"
                                        />
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            className="order-form__input"
                                            placeholder="State"
                                        />
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            className="order-form__input"
                                            placeholder="Postcode / Zip"
                                        />
                                        <textarea
                                            name=""
                                            id=""
                                            placeholder="Your quote"
                                            className="order-form__input order-form__input_ta"
                                        ></textarea>
                                        <button className="order-form__add">GET A QUOTE</button>
                                    </div>
                                </div>
                                <div className="order-counting">
                                    <div className="order-counting__sub">
                                        <span>SUB TOTAL </span>
                                        <span> ${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="order-counting__grand">
                                        <span>GRAND TOTAL </span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <button className="order-submit">PROCEED TO CHECKOUT</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="cart-text">NOT PRODUCTS</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
