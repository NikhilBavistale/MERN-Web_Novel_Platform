//NovelCards.jsx
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteNovel } from "../../redux/user/userSlice";

const NovelCards = ({ headline, novels }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="px-4 py-8 lg:px-24">
      <h2 className="text-5xl text-center font-bold text-black my-1">
        {headline}
      </h2>
      <div className="mt-12">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          pagination={true}
          keyboard={true}
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
          modules={[Navigation, Pagination, Keyboard]}
          className="mySwiper w-full h-full"
        >
          {novels &&
            novels.map((novel) => (
              <SwiperSlide key={novel._id}>
                <Link
                  to={`/novels/${novel._id}`}
                  className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="relative">
                    <img
                      src={novel.imageURL}
                      alt=""
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-blue-600 hover:bg-black p-2 rounded cursor-pointer transition-colors duration-200">
                      <FaHeart
                        onClick={() => handleAddToFavorites(novel)}
                        className="w-4 h-4 text-white"
                      />
                    </div>
                  </div>
                  <div className="p-2">
                    <div>
                      <h3 className="text-lg font-bold">
                      {novel.title.length > 10
                      ? novel.title.substring(0, 20) + "..."
                      : novel.title}
                      </h3>
                      <p className="text-gray-500">{novel.authorName}</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-700">Rating: </p>
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
