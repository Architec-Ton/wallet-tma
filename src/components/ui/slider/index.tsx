// Import Swiper React components
import { Swiper, SwiperProps } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './index.css'

// import required modules
import { Pagination } from 'swiper/modules';

type SliderPropsType = {
  children: React.ReactNode
  settings?: SwiperProps
  className?: string
}

const Slider = ({ children, settings = {}, className }: SliderPropsType) => {
  return (
    <Swiper className={className} modules={[Pagination]} {...settings}>
      {children}
    </Swiper>
  )
}

export default Slider