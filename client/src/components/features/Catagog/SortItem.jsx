import React, { useRef } from "react";
import { ReactComponent as SortIcon } from "../../../assets/images/pages/catalog/arrow.svg";

const SortItem = ({ title, items, isOpen, onToggle, onItemChange }) => {
    const wrapperRef = useRef(null);

    return (
        <div className="sort-item" ref={wrapperRef}>
            <div className="sort-title" onClick={onToggle}>
                {title} <SortIcon className="icon" />
            </div>
            {isOpen && (
                <div className="sort-wrapper">
                    <div className="sort-list">
                        {items.map(({ label, checked }, i) => (
                            <label key={i} className="sort-list__item">
                                <input
                                    type="checkbox"
                                    value={label}
                                    checked={checked}
                                    onChange={() => onItemChange(i, !checked)}
                                />
                                {label}
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SortItem;
