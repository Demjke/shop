import React from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as RemoveIcon } from "../../../assets/images/pages/cart/close.svg";
import { addToCart, decrementItem, removeToCart } from "../../../redux/slices/cartSlice";

const CartItem = ({ cartItem: { count, item } }) => {
    const dispatch = useDispatch();

    const handleChange = e => {
        const newValue = +e.target.value;
        if (newValue > count) {
            dispatch(addToCart(item));
        } else {
            dispatch(decrementItem({ newValue, item }));
        }
    };

    return (
        <div className="cart-item">
            <RemoveIcon className="icon cart-item__remove" onClick={() => dispatch(removeToCart(item.id))} />
            <div className="cart-item__img">
                <img src={`${process.env.REACT_APP_UPLOADS}products/${item.images[0]}`} alt={`${item.images[0]}`} />
            </div>
            <div className="cart-item__info">
                <div className="cart-item__title">{item.name}</div>
                <div className="cart-item__list">
                    <div className="cart-item__list-item">
                        <span>Price:</span>
                        <span className="cart-item__list-item_color">${item.price}</span>
                    </div>
                    <div className="cart-item__list-item">
                        <span>Color: </span>
                        <span>Red</span>
                    </div>
                    <div className="cart-item__list-item">
                        <span>Size: </span>
                        <span> Xl</span>
                    </div>
                    <div className="cart-item__list-item cart-item__list-item_gp">
                        <span>Quantity: </span>
                        <input
                            className="cart-item__list-item_quantity"
                            type="number"
                            name="quantity"
                            value={count}
                            onInput={handleChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
