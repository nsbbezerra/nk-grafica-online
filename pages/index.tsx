import type { NextPage } from "next";
import { Fragment } from "react";
import HeadApp from "../components/Head";
import Header from "../components/Header";
import Panel from "../components/Panel";
import "swiper/css/navigation";
import { Medal, Trophy } from "phosphor-react";
import Card from "../components/layout/Card";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  return (
    <Fragment>
      <HeadApp title="NK Gráfica Online | Impressões digitais e offset" />
      <Header />
      <Panel />

      <div className="hidden lg:block pt-16 container mx-auto max-w-6xl px-5 xl:px-0">
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          <SwiperSlide>
            <a className="w-36 h-36 mb-10 flex justify-center items-center flex-col cursor-pointer hover:underline">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-sky-100 dark:ring-zinc-800">
                <Image
                  src={
                    "https://img.freepik.com/psd-gratuitas/modelo-de-modelo-de-cartao-de-visita-isometrico_1051-3064.jpg?w=2000"
                  }
                  alt="NK Gráfica online banner"
                  layout="responsive"
                  width={600}
                  height={600}
                  objectFit="cover"
                />
              </div>
              <span className="text-sm text-sky-700 dark:text-zinc-400 text-center mt-3">
                Cartão de visita
              </span>
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a className="w-36 h-36 mb-10 flex justify-center items-center flex-col cursor-pointer hover:underline">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-sky-100 dark:ring-zinc-800">
                <Image
                  src={
                    "https://img.freepik.com/psd-gratuitas/modelo-de-modelo-de-cartao-de-visita-isometrico_1051-3064.jpg?w=2000"
                  }
                  alt="NK Gráfica online banner"
                  layout="responsive"
                  width={600}
                  height={600}
                  objectFit="cover"
                />
              </div>
              <span className="text-sm text-sky-700 dark:text-zinc-400 text-center mt-3">
                Cartão de visita
              </span>
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a className="w-36 h-36 mb-10 flex justify-center items-center flex-col cursor-pointer hover:underline">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-sky-100 dark:ring-zinc-800">
                <Image
                  src={
                    "https://img.freepik.com/psd-gratuitas/modelo-de-modelo-de-cartao-de-visita-isometrico_1051-3064.jpg?w=2000"
                  }
                  alt="NK Gráfica online banner"
                  layout="responsive"
                  width={600}
                  height={600}
                  objectFit="cover"
                />
              </div>
              <span className="text-sm text-sky-700 dark:text-zinc-400 text-center mt-3">
                Cartão de visita
              </span>
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a className="w-36 h-36 mb-10 flex justify-center items-center flex-col cursor-pointer hover:underline">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-sky-100 dark:ring-zinc-800">
                <Image
                  src={
                    "https://img.freepik.com/psd-gratuitas/modelo-de-modelo-de-cartao-de-visita-isometrico_1051-3064.jpg?w=2000"
                  }
                  alt="NK Gráfica online banner"
                  layout="responsive"
                  width={600}
                  height={600}
                  objectFit="cover"
                />
              </div>
              <span className="text-sm text-sky-700 dark:text-zinc-400 text-center mt-3">
                Cartão de visita
              </span>
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a className="w-36 h-36 mb-10 flex justify-center items-center flex-col cursor-pointer hover:underline">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-sky-100 dark:ring-zinc-800">
                <Image
                  src={
                    "https://img.freepik.com/psd-gratuitas/modelo-de-modelo-de-cartao-de-visita-isometrico_1051-3064.jpg?w=2000"
                  }
                  alt="NK Gráfica online banner"
                  layout="responsive"
                  width={600}
                  height={600}
                  objectFit="cover"
                />
              </div>
              <span className="text-sm text-sky-700 dark:text-zinc-400 text-center mt-3">
                Cartão de visita
              </span>
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a className="w-36 h-36 mb-10 flex justify-center items-center flex-col cursor-pointer hover:underline">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-sky-100 dark:ring-zinc-800">
                <Image
                  src={
                    "https://img.freepik.com/psd-gratuitas/modelo-de-modelo-de-cartao-de-visita-isometrico_1051-3064.jpg?w=2000"
                  }
                  alt="NK Gráfica online banner"
                  layout="responsive"
                  width={600}
                  height={600}
                  objectFit="cover"
                />
              </div>
              <span className="text-sm text-sky-700 dark:text-zinc-400 text-center mt-3">
                Cartão de visita
              </span>
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a className="w-36 h-36 mb-10 flex justify-center items-center flex-col cursor-pointer hover:underline">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-sky-100 dark:ring-zinc-800">
                <Image
                  src={
                    "https://img.freepik.com/psd-gratuitas/modelo-de-modelo-de-cartao-de-visita-isometrico_1051-3064.jpg?w=2000"
                  }
                  alt="NK Gráfica online banner"
                  layout="responsive"
                  width={600}
                  height={600}
                  objectFit="cover"
                />
              </div>
              <span className="text-sm text-sky-700 dark:text-zinc-400 text-center mt-3">
                Cartão de visita
              </span>
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a className="w-36 h-36 mb-10 flex justify-center items-center flex-col cursor-pointer hover:underline">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-sky-100 dark:ring-zinc-800">
                <Image
                  src={
                    "https://img.freepik.com/psd-gratuitas/modelo-de-modelo-de-cartao-de-visita-isometrico_1051-3064.jpg?w=2000"
                  }
                  alt="NK Gráfica online banner"
                  layout="responsive"
                  width={600}
                  height={600}
                  objectFit="cover"
                />
              </div>
              <span className="text-sm text-sky-700 dark:text-zinc-400 text-center mt-3">
                Cartão de visita
              </span>
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a className="w-36 h-36 mb-10 flex justify-center items-center flex-col cursor-pointer hover:underline">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-sky-100 dark:ring-zinc-800">
                <Image
                  src={
                    "https://img.freepik.com/psd-gratuitas/modelo-de-modelo-de-cartao-de-visita-isometrico_1051-3064.jpg?w=2000"
                  }
                  alt="NK Gráfica online banner"
                  layout="responsive"
                  width={600}
                  height={600}
                  objectFit="cover"
                />
              </div>
              <span className="text-sm text-sky-700 dark:text-zinc-400 text-center mt-3">
                Cartão de visita
              </span>
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a className="w-36 h-36 mb-10 flex justify-center items-center flex-col cursor-pointer hover:underline">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-sky-100 dark:ring-zinc-800">
                <Image
                  src={
                    "https://img.freepik.com/psd-gratuitas/modelo-de-modelo-de-cartao-de-visita-isometrico_1051-3064.jpg?w=2000"
                  }
                  alt="NK Gráfica online banner"
                  layout="responsive"
                  width={600}
                  height={600}
                  objectFit="cover"
                />
              </div>
              <span className="text-sm text-sky-700 dark:text-zinc-400 text-center mt-3">
                Cartão de visita
              </span>
            </a>
          </SwiperSlide>
        </Swiper>
      </div>

      <section className="container mx-auto pt-10 lg:pt-5 px-5 xl:px-0 max-w-6xl">
        <div className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl w-fit font-extrabold border-b-2 border-b-sky-700 dark:border-b-sky-300 pr-3">
          <Trophy className="text-sky-700 dark:text-sky-300" />
          <span>Os mais vendidos</span>
        </div>

        <Card />
      </section>

      <section className="container mx-auto pt-16 px-5 xl:px-0 max-w-6xl">
        <div className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl w-fit font-extrabold border-b-2 border-b-sky-700 dark:border-b-sky-300 pr-3">
          <Medal className="text-sky-700 dark:text-sky-300" />
          <span>Destaques</span>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="card">
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
            <a className="p-2 flex flex-col hover:underline cursor-pointer">
              <strong>Campanha política</strong>
              <span>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </span>
            </a>
          </div>
          <div className="card">
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
            <a className="p-2 flex flex-col hover:underline cursor-pointer">
              <strong>Campanha política</strong>
              <span>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </span>
            </a>
          </div>
          <div className="card">
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
            <a className="p-2 flex flex-col hover:underline cursor-pointer">
              <strong>Campanha política</strong>
              <span>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </Fragment>
  );
};

export default Home;
