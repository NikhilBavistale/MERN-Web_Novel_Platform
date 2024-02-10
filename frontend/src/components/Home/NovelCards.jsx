//NovelCards.jsx
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
const NovelCards = ({ headline, novels }) => {
  return (
    <div className="my-16 px-4 lg:px-24">
      <h2 className="text-5xl text-center font-bold text-black my-5">
        {headline}
      </h2>
      {/* cards */}
      <div className="mt-12">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper w-full h-full"
        >
          {novels.map((novel) => (
            <SwiperSlide key={novel._id}>
              <Link to={`/novel/${novel._id}`}>
                <div className="relative">
                  <img src={novel.imageURL} alt="" />
                  <div className="absolute top-3 right-3 bg-blue-600 hover:bg-black p-2 rounded">
                    <FaCartShopping className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <div>
                    <h3>{novel.title}</h3>
                    <p>{novel.authorName}</p>
                  </div>
                  <div>
                    <p>Price</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NovelCards;
