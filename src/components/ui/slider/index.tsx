import React from "react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import type { SwiperProps } from "swiper/react";
import { Swiper } from "swiper/react";

import "./index.css";

type SliderPropsType = {
  children: React.ReactNode;
  settings?: SwiperProps;
  className?: string;
};

const Slider = ({ children, settings = {}, className }: SliderPropsType) => (
  <Swiper className={className} modules={[Pagination]} {...settings}>
    {children}
  </Swiper>
);

export default Slider;
