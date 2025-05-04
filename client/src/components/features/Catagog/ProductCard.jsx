import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as CartIcon } from "../../../assets/images/pages/products/cart.svg";
import { addToCart } from "../../../redux/slices/cartSlice";

const ProductCard = ({ product }) => {
    const { id, images, name, description, price } = product;
    const dispatch = useDispatch();

    return (
        <div className="product-card">
            <div className="product-card__img">
                <img src={`${process.env.REACT_APP_UPLOADS}products/${images[0]}`} alt={`${images[0]}`} />
                <div className="product-card__add">
                    <div className="product-card__btn" onClick={() => dispatch(addToCart(product))}>
                        <CartIcon className="icon" />
                        Add to Cart
                    </div>
                </div>
            </div>
            <div className="product-card__info">
                <Link to={`/products/${id}`} className="product-card__title">
                    {name}
                </Link>
                <div className="product-card__text">{description}</div>
                <div className="product-card__price">${price}</div>
            </div>
        </div>
    );
};

export default ProductCard;
