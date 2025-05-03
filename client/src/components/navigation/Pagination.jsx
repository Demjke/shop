import React from "react";
import { useSelector } from "react-redux";
import { ReactComponent as LeftIcon } from "../../assets/images/pages/catalog/pag-left.svg";
import { ReactComponent as RightIcon } from "../../assets/images/pages/catalog/pag-right.svg";

const Paginations = ({ setPage }) => {
    const { currentPage, totalPages } = useSelector(state => state.products);

    return (
        <div className="paginations">
            <div className="container">
                <div className="paginations-wrapper">
                    <div className="paginations-left" onClick={() => setPage(prev => (prev === 1 ? prev : prev - 1))}>
                        <LeftIcon className="icon" />
                    </div>
                    <div className="paginations-nums">
                        {Array(totalPages)
                            .fill()
                            .map((_, index) => {
                                return (
                                    <div
                                        className="paginations-num"
                                        style={{
                                            color: `${
                                                index + 1 === currentPage ? "rgb(239, 91, 112)" : "rgb(196, 196, 196)"
                                            }`,
                                        }}
                                        key={index}
                                        onClick={() => setPage(index + 1)}
                                    >
                                        {index + 1}
                                    </div>
                                );
                            })}
                    </div>
                    <div
                        className="paginations-right"
                        onClick={() => setPage(prev => (prev === totalPages ? prev : prev + 1))}
                    >
                        <RightIcon className="icon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Paginations;
