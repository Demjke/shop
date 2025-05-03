import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../../services/productsAPI";

const Filter = ({ handleToogle, toggled, categories, brands, designers }) => {
    const allSubcategories = categories.flatMap(category => category.subcategories);
    const subcategories = [...new Set(allSubcategories.map(sub => sub.name))];
    const dispatch = useDispatch();

    const [activeFilters, setActiveFilters] = useState({
        subcategoryId: null,
        brand: null,
        designer: null,
    });

    const handleFilterClick = (filterType, value) => {
        setActiveFilters({
            subcategoryId: null,
            brand: null,
            designer: null,
            [filterType]: value,
        });

        fetchProducts(dispatch, { params: { [filterType]: value } });
    };

    return (
        <div className="filter-wrapper">
            {Object.keys(toggled).map((toggle, index) => (
                <React.Fragment key={index}>
                    <div className="filter-title" onClick={() => handleToogle(toggle)}>
                        {toggle}
                    </div>
                    {toggled[toggle] && (
                        <ul className="filter-items">
                            {toggle === "category" &&
                                subcategories.map((sub, idx) => (
                                    <li
                                        key={idx}
                                        style={{
                                            color:
                                                activeFilters.subcategoryId === sub
                                                    ? "rgb(239, 91, 112)"
                                                    : "rgb(111, 110, 110)",
                                        }}
                                        className="filter-item"
                                        onClick={() => handleFilterClick("subcategoryId", ++idx)}
                                    >
                                        {sub}
                                    </li>
                                ))}
                            {toggle === "brands" &&
                                brands.map((brand, idx) => (
                                    <li
                                        key={idx}
                                        style={{
                                            color:
                                                activeFilters.brand === brand
                                                    ? "rgb(239, 91, 112)"
                                                    : "rgb(111, 110, 110)",
                                        }}
                                        className="filter-item"
                                        onClick={() => handleFilterClick("brand", brand)}
                                    >
                                        {brand}
                                    </li>
                                ))}
                            {toggle === "designer" &&
                                designers.map((designer, idx) => (
                                    <li
                                        key={idx}
                                        style={{
                                            color:
                                                activeFilters.designer === designer
                                                    ? "rgb(239, 91, 112)"
                                                    : "rgb(111, 110, 110)",
                                        }}
                                        className="filter-item"
                                        onClick={() => handleFilterClick("designer", designer)}
                                    >
                                        {designer}
                                    </li>
                                ))}
                        </ul>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Filter;
