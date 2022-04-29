import {
  HiOutlineLibrary,
  HiOutlineLogout,
  HiOutlineTruck,
} from "react-icons/hi";
import { Link, Route } from "react-router-dom";
import NavigatorMobile from "../components/NavigatorMobile";
import Layout from "../Layouts/MainLayout";
import { useUserData } from "../Providers/SignProvider";
import "swiper/css";
import OrdersPage from "./OrdersPage";

const ProfilePage = () => {
  const userData = useUserData();
  // const loc = useLocation();

  return (
    <>
      <Layout title={"پروفایل"}>
        <div
          className={`container mx-auto grid min-h-[56vh] grid-cols-12 gap-4 px-4 `}
        >
          <div className="order-2 col-span-12 mt-2 grid h-auto md:order-1 md:col-span-4 md:mt-0 lg:col-span-3">
            <div className="sticky top-24 h-auto max-h-48 w-full rounded-2xl bg-white md:shadow-lg">
              <ul className="px-2">
                <Link to={"/profile"}>
                  <button className="my-3 flex w-full items-center rounded-md p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
                    <span>
                      <HiOutlineLibrary className="ml-2 h-5 w-5" />
                    </span>
                    <span>پروفایل کاربری</span>
                  </button>
                </Link>
                <Link to={"/profile/orders"}>
                  <button className="my-3 flex w-full items-center rounded-md p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
                    <span>
                      <HiOutlineTruck className="ml-2 h-5 w-5" />
                    </span>
                    <span>خرید های قبلی</span>
                  </button>
                </Link>
                <hr />
                <button className="my-3 flex w-full items-center rounded-md p-2 text-gray-500 hover:bg-red-100 hover:text-red-600">
                  <span>
                    <HiOutlineLogout className="ml-2 h-5 w-5" />
                  </span>
                  <span>خروج از حساب</span>
                </button>
              </ul>
            </div>
          </div>
          <div className={`col-span-12 h-auto md:col-span-8 lg:col-span-9`}>
            <Route path={"/profile"} exact>
              <div className="min-h-96 order-1 mt-4 w-full space-y-4 rounded-2xl bg-white p-4 md:order-2 md:mt-0">
                <div className="space-y-1 rounded-xl bg-blue-600 px-6 py-4 text-justify text-white">
                  <div>سلام {userData?.name}</div>
                  <div>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                    تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
                    کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                    آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم
                    افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
                    طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
                    صورت می توان امید داشت که تمام و دشواری موجود در ارائه
                    راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز
                    شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل
                    دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                  </div>
                </div>
                <div className="space-y-1 rounded-xl bg-green-100 px-6 py-4 text-justify text-green-600">
                  <div>
                    در صورتی که در خدمات{" "}
                    <span className="font-semibold text-green-800">
                      غیر رایگان
                    </span>{" "}
                    ما سوال یا ابهامی داشتید میتوانید با پشتیبانی مشتریان تماس
                    بگیرید.
                  </div>
                </div>
              </div>
            </Route>
            <Route path={"/profile/orders"}>
              <OrdersPage />
            </Route>
          </div>
        </div>
      </Layout>
      <NavigatorMobile />
    </>
  );
};

export default ProfilePage;
