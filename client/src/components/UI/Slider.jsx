import React, { useRef } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { ReactComponent as LeftSlider } from "../../assets/images/pages/products/slider-arrow-left.svg";
import { ReactComponent as RightSlider } from "../../assets/images/pages/products/slider-arrow-right.svg";

const Slider = ({ images = [] }) => {
    const swiperRef = useRef(null);

    if (!images || images.length === 0) {
        return <div className="slider-error">Нет изображений</div>;
    }

    return (
        <Swiper
            slidesPerView={1}
            loop={images.length > 1} // Включаем loop только если больше 1 слайда
            className="product-slider slider"
            onSwiper={swiper => (swiperRef.current = swiper)}
        >
            {images.map((img, index) => (
                <SwiperSlide className="slider-slide" key={index}>
                    <img src={`${process.env.REACT_APP_UPLOADS}products/${img}`} alt={`${img}`} />
                </SwiperSlide>
            ))}
            {images.length > 1 && (
                <>
                    <button className="slider-prev" onClick={() => swiperRef.current?.slidePrev()}>
                        <LeftSlider className="icon" />
                    </button>
                    <button className="slider-next" onClick={() => swiperRef.current?.slideNext()}>
                        <RightSlider className="icon" />
                    </button>
                </>
            )}
        </Swiper>
    );
};

export default Slider;
