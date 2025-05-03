import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as FilterIcon } from "../../../assets/images/pages/catalog/filter.svg";
import Filter from "./Filter";

const Filters = () => {
    const { categories } = useSelector(state => state.categories);
    const { brands, designers } = useSelector(state => state.products);
    const [isOpen, setIsOpen] = useState(false);
    const [toggled, setToggled] = useState({ category: false, brands: false, designer: false });
    const filterRef = useRef(null);

    useEffect(() => {
        const handleFilterClick = e => {
            if (filterRef.current && !filterRef.current.contains(e.target)) setIsOpen(false);
        };

        document.addEventListener("mousedown", handleFilterClick);

        return () => document.removeEventListener("mousedown", handleFilterClick);
    }, []);

    const handleShowFilters = () => {
        setIsOpen(prev => !prev);
    };

    const handleToogle = filterName => {
        setToggled(prev => ({
            ...prev,
            [filterName]: !prev[filterName],
        }));
    };

    return (
        <div className="filter" ref={filterRef}>
            <div className="filter-btn" onClick={handleShowFilters}>
                FILTER
                <FilterIcon className="icon" />
            </div>
            {isOpen && (
                <div className="filter-list">
                    <Filter
                        handleToogle={handleToogle}
                        toggled={toggled}
                        categories={categories}
                        brands={brands}
                        designers={designers}
                    />
                </div>
            )}
        </div>
    );
};

export default Filters;
