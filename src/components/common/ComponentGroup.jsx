import React from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { ControllerButton, SWIPER_PARAMS } from "../Home/Testimonials";
const ComponentGroup = ({ className, components,customGap }) => {
  return (
    <div className={`${className} w-full`}>
      <div className={`grid ${customGap?customGap:'grid-cols-4 max-xs:grid-cols-1 max-xs:gap-y-8  max-lg:gap-12 max-sm:gap-5 max-lg:grid-cols-2 gap-12'} w-full  max-sm:hidden `}>
        {components?.map((component, index) => (
          <div className="w-full" key={index}>
            {component}
          </div>
        ))}
      </div>
      <div className="hidden max-sm:block w-full relative">
        <ControllerButton className="swiper-prev-btn -translate-x-[20%] shadow-lg hover:shadow-xl left-0 z-[100]" />
        <ControllerButton
          className="swiper-next-btn translate-x-[20%] shadow-lg hover:shadow-xl right-0 z-[100]"
          isNext={true}
        />
        <Swiper
          loop={true}
          slidesPerView={1}
          breakpoints={{ 670: { slidesPerView: 2 }, 900: { slidesPerView: 3 } }}
          navigation={{
            nextEl: ".swiper-next-btn",
            prevEl: ".swiper-prev-btn",
          }}
          {...SWIPER_PARAMS}
        >
          {components?.map((component, index) => (
            <SwiperSlide key={index}>{component}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};


export default ComponentGroup;