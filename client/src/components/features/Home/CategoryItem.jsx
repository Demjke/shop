import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
    const { id, name, image, descriptions, info } = category;

    return (
        <Link to={`catalog/${name}`} className="category-item">
            <div className="category-item__img">
                <img src={`${process.env.REACT_APP_UPLOADS}categories/${image}`} alt={`category-${id}`} />
            </div>
            <div className="category-item__info">
                <div className="category-item__subtitle">{info}</div>
                <div className="category-item__title">{descriptions}</div>
            </div>
        </Link>
    );
};

export default CategoryItem;
