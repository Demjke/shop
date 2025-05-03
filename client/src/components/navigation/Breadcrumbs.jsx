import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter(item => item.trim() !== "");

    return (
        <div className="catalog-breadcrumbs breadcrumbs">
            <div className="container">
                <div className="breadcrumbs-wrapper">
                    <div className="breadcrumbs-title">{pathSegments[pathSegments.length - 1]}</div>
                    <div className="breadcrumbs-list">
                        {pathSegments.map((segment, index) =>
                            pathSegments.length - 1 === index ? (
                                <div className="breadcrumbs-list__item" key={index}>
                                    {segment}
                                </div>
                            ) : (
                                <Link
                                    to={`/${pathSegments.slice(0, index + 1).join("/")}`}
                                    className="breadcrumbs-list__item"
                                    key={index}
                                >
                                    {segment}
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumbs;
