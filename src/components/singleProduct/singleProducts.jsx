import React from "react";
import {
  HiOutlineDeviceMobile,
  HiChevronDown,
  HiOutlineSearch,
  HiOutlineShieldCheck,
  HiOutlineTruck,
} from "react-icons/hi";

function Product() {
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

      <section className="px-5 md:hidden mb-6">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center flex-col">
            <div className="flex items-center justify-center w-full">
              <img
                src={require("./../../assets/img/Home/1.png")}
                className="w-3/4 sm:w-1/2"
                alt=""
              />
            </div>
            <div className="flex gap-x-4 items-center px-4 py-2 overflow-auto">
              <div className="ring-1 flex items-center justify-center border-2 border-gray-400 p-2 rounded-lg w-1/5 flex-shrink-0">
                <img
                  src={require("./../../assets/img/Single Product/Gallery - 2.png")}
                  className="w-3/4 sm:w-1/2"
                  alt=""
                />
              </div>
              <div className="ring-1 flex items-center justify-center border-2 border-gray-400 p-2 rounded-lg w-1/5 flex-shrink-0">
                <img
                  src={require("./../../assets/img/Single Product/Gallery - 3.png")}
                  className="w-3/4 sm:w-1/2"
                  alt=""
                />
              </div>
              <div className="ring-1 flex items-center justify-center border-2 border-gray-400 p-2 rounded-lg w-1/5 flex-shrink-0">
                <img
                  src={require("./../../assets/img/Single Product/Gallery - 4.png")}
                  className="w-3/4 sm:w-1/2"
                  alt=""
                />
              </div>
              <div className="ring-1 flex items-center justify-center border-2 border-gray-400 p-2 rounded-lg w-1/5 flex-shrink-0">
                <img
                  src={require("./../../assets/img/Single Product/Gallery - 4.png")}
                  className="w-3/4 sm:w-1/2"
                  alt=""
                />
              </div>
              <div className="ring-1 flex items-center justify-center border-2 border-gray-400 p-2 rounded-lg w-1/5 flex-shrink-0">
                <img
                  src={require("./../../assets/img/Single Product/Gallery - 4.png")}
                  className="w-3/4 sm:w-1/2"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center text-center my-10 gap-1">
            <h1 className="text-lg font-bold">آیفون 13 pro max</h1>
            <p className="text-sm text-gray-600 font-light">
              Apple iphone 13 pro max
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            <span>انتخاب رنگ :</span>
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-red-500 -mr-[6px]"></div>
              <div className="w-5 h-5 rounded-full bg-green-500 -mr-[6px]"></div>
              <div className="w-5 h-5 rounded-full bg-orange-500 -mr-[6px]"></div>
              <div className="w-5 h-5 rounded-full bg-pink-500 -mr-[6px]"></div>
              <div className="w-5 h-5 rounded-full bg-purple-500 -mr-[6px]"></div>
            </div>
          </div>
          <div className="flex items-center flex-wrap justify-center gap-y-4 my-6">
            <div className="flex text-gray-700 items-center">
              <div className="w-4 h-4 rounded-full bg-gray-300 mx-2">
                <HiOutlineDeviceMobile className="w-4 h-4 mr-[5px] mt-[5px]" />
              </div>
              <span className="text-xs mx-1">فروشنده :</span>
              <span className="text-[10px] font-bold mx-1">دیجیتایز</span>
            </div>
            <div className="flex text-gray-700 items-center">
              <div className="w-4 h-4 rounded-full bg-gray-300 mx-2">
                <HiOutlineShieldCheck className="w-4 h-4 mr-[5px] mt-[5px]" />
              </div>
              <span className="text-xs mx-1">گارانتی :</span>
              <span className="text-[10px] font-bold mx-1">
                18 ماهه زرین خدمت
              </span>
            </div>
            <div className="flex text-gray-700 items-center">
              <div className="w-4 h-4 rounded-full bg-gray-300 mx-2">
                <HiOutlineTruck className="w-4 h-4 mr-[5px] mt-[5px]" />
              </div>
              <span className="text-xs mx-1">ارسال توسط :</span>
              <span className="text-[10px] font-bold mx-1">انبار تهران</span>
            </div>
          </div>
          <div className="w-full bg-white px-3 py-2 rounded-lg">
            <h2 className="mb-4">ویژگی ها : </h2>
            <ul className="gap-2 flex flex-col">
              <li className="flex gap-x-4 text-sm flex-col">
                <span className="propertyList text-sm text-gray-600">
                  حافظه داخلی :
                </span>
                <span className="text-gray-500 mr-8 mt-1">128 گیگابایت</span>
              </li>
              <hr />
              <li className="flex gap-x-4 text-sm flex-col">
                <span className="propertyList text-sm text-gray-600">
                  اندازه صفحه نمایش :
                </span>
                <span className="text-gray-500 mr-8 mt-1">0.6 اینچ</span>
              </li>
              <hr />
              <li className="flex gap-x-4 text-sm flex-col">
                <span className="propertyList text-sm text-gray-600">
                  شبکه ها :
                </span>
                <span className="text-gray-500 mr-8 mt-1">2G 3G 4G 5G</span>
              </li>
            </ul>
          </div>
          <div className="w-full bg-white p-3 rounded-lg mt-4 flex flex-col px-5">
            <h2 className=" mb-3">نقد و بررسی این محصول</h2>
            <p className="text-xs text-gray-500 min-h-24 max-h-44 text-ellipsis overflow-hidden inline-block text-justify leading-6">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
              جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
              فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری
              موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد
              نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل
              دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
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
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Product;