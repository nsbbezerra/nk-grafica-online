import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Fragment } from "react";
import Image from "next/image";
import "swiper/css/navigation";

export default function Panel() {
  return (
    <Fragment>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        autoplay
        pagination={true}
      >
        <SwiperSlide>
          <div className="w-full">
            <Image
              src={"/img/banner.jpg"}
              alt="NK Gráfica online banner"
              layout="responsive"
              width={1920}
              height={600}
              objectFit="cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full">
            <Image
              src={"/img/banners-pic.jpg"}
              alt="NK Gráfica online banner"
              layout="responsive"
              width={1920}
              height={600}
              objectFit="cover"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </Fragment>
  );
}
