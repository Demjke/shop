import React, { useEffect, useRef, useState } from "react";
import SortItem from "./SortItem";

const Sort = () => {
    const [characteristics, setCharacteristics] = useState({
        size: false,
        price: false,
    });

    const [sizeItems, setSizeItems] = useState([
        { label: "XS", checked: false },
        { label: "S", checked: false },
        { label: "M", checked: false },
        { label: "L", checked: false },
    ]);

    const [priceItems, setPriceItems] = useState([
        { label: "from 0 to 5000", checked: false },
        { label: "from 5000 to 20000", checked: false },
        { label: "over 20000", checked: false },
    ]);

    const sortRef = useRef(null);

    const toggleSection = key => setCharacteristics(prev => ({ ...prev, [key]: !prev[key] }));

    const handleSizeChange = (index, newChecked) => {
        setSizeItems(prev => prev.map((item, i) => (i === index ? { ...item, checked: newChecked } : item)));
    };

    const handlePriceChange = (index, newChecked) => {
        setPriceItems(prev => prev.map((item, i) => (i === index ? { ...item, checked: newChecked } : item)));
    };

    useEffect(() => {
        const handleClickOutside = event => {
            if (sortRef.current && !sortRef.current.contains(event.target)) {
                setCharacteristics({ size: false, price: false });
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="sort" ref={sortRef}>
            <SortItem
                title="SIZE"
                items={sizeItems}
                isOpen={characteristics.size}
                onToggle={() => toggleSection("size")}
                onItemChange={handleSizeChange}
            />
            <SortItem
                title="PRICE"
                items={priceItems}
                isOpen={characteristics.price}
                onToggle={() => toggleSection("price")}
                onItemChange={handlePriceChange}
            />
        </div>
    );
};

export default Sort;
