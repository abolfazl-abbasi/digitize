import React, { useState } from "react";
import {
  HiOutlineDeviceMobile,
  HiChevronDown,
  HiOutlineSearch,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineX,
} from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import singleProduct from "../../data/singleProduct";

function Product() {
  const [isShow, setIsShow] = useState(false);

  const handleShowSlider = () => {
    if (!isShow) {
      setIsShow(true);
      document.body.classList.add("overflow-hidden");
    } else {
      setIsShow(false);
      document.body.classList.remove("overflow-hidden");
    }
  };
  return (
    <>
      <header className="mt-5 md:hidden">
        <div className="container px-5 mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="bg-white p-1 rounded-md shadow-lg cursor-pointer">
                <HiChevronDown className="h-5 w-5 -rotate-90" />
              </div>
            </div>
            <h1 className="font-bold">آیفون 13 pro max</h1>
            <div className="bg-white p-1 rounded-md shadow-lg cursor-pointer">
              <HiOutlineSearch className="h-5 w-5" />
            </div>
          </div>
        </div>
      </header>
      <section className="mt-5 md:hidden">
        <div className="container mx-auto flex items-center text-[10px] font-bold px-6">
          <a href="##" className="text-orange-500">
            خانه
          </a>
          <HiChevronDown className="h-3 w-3 mx-2 rotate-90" />
          <a href="##" className="text-orange-500">
            گوشی هوشمند
          </a>
          <HiChevronDown className="h-3 w-3 mx-2 rotate-90" />
          <span>آیفون 13 pro max</span>
        </div>
      </section>
      <section className="px-5 md:hidden my-6">
        {console.log(singleProduct)}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center flex-col">
            <div className="flex items-center justify-center w-full">
              <Swiper
                onClick={handleShowSlider}
                modules={[Navigation]}
                className="w-screen h-1/4 flex items-center justify-center"
              >
                {singleProduct.images.map((image) => (
                  <SwiperSlide
                    className="flex items-center justify-center"
                    key={singleProduct.images.indexOf(image)}
                  >
                    <img
                      src={image}
                      className="w-2/5 sm:w-1/4"
                      alt={singleProduct.titleEn}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div
            className={`items-center flex-col z-50 ${
              !isShow ? "hidden" : "flex"
            }`}
          >
            <div className="flex justify-center fixed w-screen h-screen bg-white top-0 overflow-hidden">
              <button
                className="flex items-center justify-center absolute z-[9999] w-6 h-6 rounded-full bg-orange-100 top-4 right-4"
                onClick={handleShowSlider}
              >
                <HiOutlineX />
              </button>
              <Swiper
                modules={[Navigation]}
                className="w-screen h-4/5 flex items-center justify-center"
                id="swiper"
              >
                {singleProduct.images.map((image) => (
                  <SwiperSlide
                    className="flex items-center justify-center"
                    key={singleProduct.images.indexOf(image)}
                  >
                    <img
                      src={image}
                      className="w-72"
                      alt={`${singleProduct.titleEn}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="flex items-center px-4 py-2 overflow-auto fixed bottom-0">
                {singleProduct.images.map((image) => (
                  <div
                    key={singleProduct.images.indexOf(image)}
                    onClick={() =>
                      document
                        .getElementById("swiper")
                        .swiper.slideTo(singleProduct.images.indexOf(image))
                    }
                    className="ring-1 flex items-center ml-8 justify-center border-2 border-gray-400 p-2 rounded-lg w-1/4 sm:w-1/5 flex-shrink-0"
                  >
                    <img
                      src={image}
                      className="w-32"
                      alt={`${singleProduct.titleEn}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center text-center my-10 gap-1">
            <h1 className="text-lg font-bold">{singleProduct.titleFa}</h1>
            <p className="text-sm text-gray-600 font-light">
              {singleProduct.titleEn}
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            <span>انتخاب رنگ :</span>
            <div className="flex items-center">
              {singleProduct.color.map((color) => (
                <div
                  key={singleProduct.color.indexOf(color)}
                  className={`w-5 h-5 rounded-full bg-${color} -mr-[6px]`}
                ></div>
              ))}
            </div>
          </div>
          <div className="flex items-center flex-wrap justify-center gap-y-4 my-6">
            <div className="flex text-gray-700 items-center my-2">
              <div className="w-4 h-4 rounded-full bg-gray-300 mx-2">
                <HiOutlineDeviceMobile className="w-4 h-4 mr-[5px] mt-[5px]" />
              </div>
              <span className="text-xs mx-1">فروشنده :</span>
              <span className="text-[10px] font-bold mx-1">
                {singleProduct.services.seller}
              </span>
            </div>
            <div className="flex text-gray-700 items-center my-2">
              <div className="w-4 h-4 rounded-full bg-gray-300 mx-2">
                <HiOutlineShieldCheck className="w-4 h-4 mr-[5px] mt-[5px]" />
              </div>
              <span className="text-xs mx-1">گارانتی :</span>
              <span className="text-[10px] font-bold mx-1">
                {singleProduct.services.warranty}
              </span>
            </div>
            <div className="flex text-gray-700 items-center my-2">
              <div className="w-4 h-4 rounded-full bg-gray-300 mx-2">
                <HiOutlineTruck className="w-4 h-4 mr-[5px] mt-[5px]" />
              </div>
              <span className="text-xs mx-1">ارسال توسط :</span>
              <span className="text-[10px] font-bold mx-1">
                {singleProduct.services.postedBy}
              </span>
            </div>
          </div>
          <>
            <div className="w-full bg-white px-3 py-2 rounded-lg">
              <h2 className="mb-2">ویژگی ها : </h2>
              <ul className="gap-2 flex flex-col">
                <li className="flex gap-x-4 text-sm flex-col my-2">
                  <span className="propertyList text-sm text-gray-600">
                    حافظه داخلی :
                  </span>
                  <span className="text-gray-500 mr-8 mt-1">
                    {singleProduct.properties.memory}
                  </span>
                </li>
                <hr />
                <li className="flex gap-x-4 text-sm flex-col my-2">
                  <span className="propertyList text-sm text-gray-600">
                    اندازه صفحه نمایش :
                  </span>
                  <span className="text-gray-500 mr-8 mt-1">
                    {singleProduct.properties.resolution} اینچ
                  </span>
                </li>
                <hr />
                <li className="flex gap-x-4 text-sm flex-col my-2">
                  <span className="propertyList text-sm text-gray-600">
                    شبکه ها :
                  </span>
                  <span className="text-gray-500 mr-8 mt-1">
                    {singleProduct.properties.networks.map((net) => (
                      <p
                        className="inline-block ml-2"
                        key={singleProduct.properties.networks.indexOf(net)}
                      >
                        {net}
                      </p>
                    ))}
                  </span>
                </li>
              </ul>
            </div>
            <div className="w-full bg-white p-3 rounded-lg mt-4 flex flex-col px-5">
              <h2 className=" mb-3">نقد و بررسی این محصول</h2>
              <p className="text-xs text-gray-500 min-h-24 max-h-44 text-ellipsis overflow-hidden inline-block text-justify leading-6">
                {singleProduct.properties.review}
              </p>
              <button className="inline-block text-orange-500 self-end mt-3">
                ادامه مطلب
              </button>
            </div>
            <div className="w-full bg-white p-3 rounded-lg mt-4 flex flex-col">
              <div className="w-2/3 sm:w-1/2 mx-auto h-8 bg-gray-300 rounded-full overflow-hidden border">
                <button className="text-xs w-1/3 rounded-full h-full text-gray-700">
                  دروبین
                </button>
                <button className="text-xs w-1/3 rounded-full h-full text-gray-700 bg-white">
                  طراحی
                </button>
                <button className="text-xs w-1/3 rounded-full h-full text-gray-700">
                  باتری
                </button>
              </div>
              <div className="my-3 px-2">
                <h2 className="my-3">طراحی</h2>
                <p className="text-xs text-gray-500 text-justify leading-6">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                  تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                  آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم
                  افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
                  طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
                  صورت می توان امید داشت که تمام و دشواری موجود در ارائه
                  راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
                  حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای
                  موجود طراحی اساسا مورد استفاده قرار گیرد.
                </p>
              </div>
            </div>
          </>
        </div>
      </section>
    </>
  );
}

export default Product;
