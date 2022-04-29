import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useUserData, useUserDataDispatcher } from "../Providers/SignProvider";
const queryString = require("query-string");

const SignupPage = () => {
  const his = useHistory();
  const loc = useLocation();

  const userData = useUserData();
  const { setUserData } = useUserDataDispatcher();

  if (userData) {
    his.push("/");
  }

  const query = queryString.parse(loc.search);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const passRegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^.\^$\^&\*])(?=.{8,})/;

  const validationSchema = Yup.object({
    name: Yup.string("لطفا نام صحیح خود را وارد کنید.").required(
      "لطفا نام را خود وارد کنید."
    ),
    email: Yup.string()
      .email("لطفا ایمیل صحیح خود را وارد کنید.")
      .required("لطفا ایمیل خود را وارد کنید."),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "لطفا شماره صحیح خود را وارد کنید.")
      .required("لطفا شماره خود را وارد کنید."),
    password: Yup.string()
      .matches(
        passRegExp,
        "رمز عبور باید شامل کارکترها . کلمات . اعداد و ... باشد."
      )
      .required("لطفا رمز عبور خود را وارد کنید"),
    passwordConformation: Yup.string()
      .oneOf([Yup.ref("password"), null], "با رمز عبور اولیه مطابقت ندارد!")
      .required("لطفا تایید رمز عبور خود را وارد کنید"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      passwordConformation: "",
    },
    onSubmit: async (values) => {
      await axios
        .post("http://localhost:5000/api/user/register", {
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
          password: values.password,
        })
        .then((res) => {
          const { data } = res;

          setUserData({
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            password: values.password,
          });

          localStorage.setItem(
            "userSignData",
            JSON.stringify({
              email: data.email,
              password: values.password,
            })
          );

          formik.setValues({
            name: "",
            email: "",
            phoneNumber: "",
            password: "",
            passwordConformation: "",
          });

          formik.setErrors({});
          formik.setTouched({});
          formik.setFieldError({});

          toast.success(res.statusText, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          setTimeout(() => {
            if (query.redirect) return his.push(query.redirect);
            return his.push("/");
          }, 2000);
        })
        .catch((err) => {
          toast.error("ایمل یا شماره تلفن قبلا ثبت شده است!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    },
    validationSchema,
    validateOnMount: true,
  });

  const formsData = [
    { title: "نام", name: "name", type: "text" },
    { title: "ایمیل", name: "email", type: "email" },
    { title: "شماره تلفن", name: "phoneNumber", type: "text" },
    { title: "رمز عبور", name: "password", type: "password" },
    { title: "تایید رمز عبور", name: "passwordConformation", type: "password" },
  ];

  return (
    <>
      <ToastContainer />
      <div className="h-full w-screen items-center justify-center lg:flex lg:h-screen lg:min-h-full">
        <div className="flex h-full w-full flex-col items-center justify-center bg-white py-8 lg:w-7/12 ">
          <h1 className="text-6xl">
            <svg
              width="200"
              height="50"
              viewBox="0 0 99 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.74402 1.40941V5.42118H4.73226V1.40941H8.74402ZM10.6852 12.9788C10.8577 12.9788 10.944 13.0651 10.944 13.2376V17.7412C10.944 17.9137 10.8577 18 10.6852 18H9.6499C9.37383 18 9.17539 17.9914 9.05461 17.9741C8.96834 19.182 8.71814 20.2086 8.30402 21.0541C7.8899 21.9169 7.22559 22.7106 6.31108 23.4353C5.41383 24.16 4.15422 24.9192 2.53226 25.7129L0.746376 21.7271C1.95422 21.0024 2.79971 20.4157 3.28285 19.9671C3.76598 19.5184 4.05932 19.0784 4.16285 18.6471C4.28363 18.2157 4.34402 17.5169 4.34402 16.5506V7.49177H9.10637V12.4094C9.10637 12.582 9.14951 12.72 9.23579 12.8235C9.33932 12.9271 9.47736 12.9788 9.6499 12.9788H10.6852ZM19.3572 12.7459C19.3572 13.6949 19.1243 14.5749 18.6584 15.3859C18.1925 16.1796 17.5627 16.818 16.769 17.3012C15.9752 17.7671 15.0952 18 14.129 18H10.6866C10.5141 18 10.4278 17.9137 10.4278 17.7412V13.2376C10.4278 13.0651 10.5141 12.9788 10.6866 12.9788H14.0772C14.2152 12.9788 14.336 12.9271 14.4396 12.8235C14.5431 12.72 14.5948 12.5906 14.5948 12.4353V6.76706H19.3572V12.7459ZM19.409 20.0706V24.0824H11.3854V20.0706H19.409ZM26.0939 18C25.1276 18 24.2476 17.7671 23.4539 17.3012C22.6602 16.818 22.0304 16.1796 21.5645 15.3859C21.0986 14.5749 20.8657 13.6949 20.8657 12.7459V0.322355H25.628V12.4353C25.628 12.6078 25.6711 12.7459 25.7574 12.8494C25.8609 12.9357 25.9904 12.9788 26.1457 12.9788H27.7245C27.897 12.9788 27.9833 13.0651 27.9833 13.2376V17.7412C27.9833 17.9137 27.897 18 27.7245 18H26.0939ZM35.7977 0.684708V4.69647H27.7742V0.684708H35.7977ZM31.0354 6.76706H35.7977V12.7459C35.7977 13.6949 35.5648 14.5749 35.0989 15.3859C34.633 16.1796 34.0032 16.818 33.2095 17.3012C32.4158 17.7671 31.5358 18 30.5695 18H27.7225C27.5499 18 27.4636 17.9137 27.4636 17.7412V13.2376C27.4636 13.0651 27.5499 12.9788 27.7225 12.9788H30.5177C30.6558 12.9788 30.7766 12.9271 30.8801 12.8235C30.9836 12.72 31.0354 12.5906 31.0354 12.4353V6.76706Z"
                fill="#222F5D"
              />
              <path
                d="M56.7374 12.9788C56.9099 12.9788 56.9962 13.0651 56.9962 13.2376V17.7412C56.9962 17.9137 56.9099 18 56.7374 18H56.0127C56.0472 18.3106 56.0644 18.5435 56.0644 18.6988C56.0644 19.7341 55.8056 20.6918 55.288 21.5718C54.7703 22.4518 54.0715 23.142 53.1915 23.6424C52.3115 24.16 51.3452 24.4188 50.2927 24.4188H44.1844C42.9076 24.4188 41.7256 24.0996 40.6386 23.4612C39.5515 22.8227 38.6888 21.96 38.0503 20.8729C37.4119 19.7859 37.0927 18.6039 37.0927 17.3271V10.4941H41.855V17.0682C41.855 17.7067 42.0793 18.2502 42.528 18.6988C42.9939 19.1647 43.546 19.3976 44.1844 19.3976H50.3703C50.5774 19.3976 50.7499 19.3286 50.888 19.1906C51.026 19.0525 51.095 18.8886 51.095 18.6988C51.095 18.509 51.026 18.3451 50.888 18.2071C50.7499 18.069 50.5774 18 50.3703 18H44.7021V12.9788H56.7374ZM56.739 18C56.5664 18 56.4802 17.9137 56.4802 17.7412V13.2376C56.4802 13.0651 56.5664 12.9788 56.739 12.9788H62.5366C63.71 12.9788 64.7108 12.6165 65.539 11.8918L67.5837 10.08L64.6072 8.63059C64.3657 8.52706 64.1759 8.47529 64.0378 8.47529C63.7272 8.47529 63.4166 8.61333 63.1061 8.88941L60.4143 11.8659L57.1013 8.96706L59.819 5.65412C60.3712 4.99843 61.0182 4.52392 61.7602 4.23059C62.5021 3.92 63.2441 3.76471 63.9861 3.76471C64.8488 3.76471 65.6684 3.97177 66.4449 4.38588L71.9837 6.97412C72.07 7.00863 72.139 7.02588 72.1908 7.02588C72.2598 7.02588 72.3115 7.02588 72.3461 7.02588H75.5296V11.6847H72.2166V12.4094C72.2166 12.582 72.2598 12.72 72.3461 12.8235C72.4496 12.9271 72.5876 12.9788 72.7602 12.9788H75.9955C76.168 12.9788 76.2543 13.0651 76.2543 13.2376V17.7412C76.2543 17.9137 76.168 18 75.9955 18H72.7602C71.7421 18 70.9053 17.7584 70.2496 17.2753C69.6111 16.7749 69.0849 16.0502 68.6708 15.1012L68.1531 15.6188C67.2904 16.3953 66.3155 16.9906 65.2284 17.4047C64.1413 17.8016 63.0284 18 61.8896 18H56.739ZM59.9484 20.0706H63.9602V24.0824H59.9484V20.0706ZM84.6697 12.7459C84.6697 13.6949 84.4367 14.5749 83.9709 15.3859C83.505 16.1796 82.8752 16.818 82.0815 17.3012C81.2877 17.7671 80.4077 18 79.4415 18H75.9991C75.8266 18 75.7403 17.9137 75.7403 17.7412V13.2376C75.7403 13.0651 75.8266 12.9788 75.9991 12.9788H79.3897C79.5277 12.9788 79.6485 12.9271 79.752 12.8235C79.8556 12.72 79.9073 12.5906 79.9073 12.4353V6.76706H84.6697V12.7459ZM84.7215 20.0706V24.0824H76.6979V20.0706H84.7215ZM93.037 12.9788C93.4856 12.9788 93.7099 12.7976 93.7099 12.4353C93.7099 12.2973 93.6581 12.1851 93.5546 12.0988C93.4511 11.9953 93.2095 11.8141 92.8299 11.5553L87.0064 7.54353L89.724 3.60941L96.324 8.19059C97.0315 8.74275 97.5664 9.32941 97.9287 9.95059C98.2911 10.5718 98.4723 11.3482 98.4723 12.28C98.4723 13.3671 98.2048 14.3506 97.6699 15.2306C97.1523 16.0933 96.4448 16.7749 95.5476 17.2753C94.6503 17.7584 93.6754 18 92.6228 18H86.1781V12.9788H93.037Z"
                fill="#FF755C"
              />
            </svg>
          </h1>
          <form
            className="mt-8 flex w-8/12 flex-col space-y-5 lg:w-7/12 xl:w-5/12"
            onSubmit={formik.handleSubmit}
          >
            {formsData.map((form) => (
              <label className="relative flex flex-col">
                <span className="absolute right-2 -top-2 bg-white  px-1 pr-1 text-gray-500">
                  {form.title}
                </span>
                <input
                  className={`bg-white0 mt-1 h-14 w-full rounded-md border border-gray-400 px-4 text-sm ${
                    formik.errors[form.name] && formik.touched[form.name]
                      ? "border-2 border-red-400"
                      : ""
                  } ${
                    formik.touched[form.name] && !formik.errors[form.name]
                      ? "border-2 border-green-400"
                      : ""
                  }`}
                  {...formik.getFieldProps(form.name)}
                  type={form.type}
                />
                {formik.touched[form.name] && (
                  <div className="px-1 text-xs text-red-500">
                    {formik.errors[form.name]}
                  </div>
                )}
              </label>
            ))}

            <div className="space-y-3 text-center">
              <button
                type="submit"
                className="rounded !bg-green-700 px-4 py-3 text-white disabled:opacity-40"
                disabled={!formik.isValid}
              >
                ساخت اکانت
              </button>
              <div className="text-sm font-bold">
                <span> آیا اکانت دارید؟</span>{" "}
                <Link to={"/login"} className="text-blue-500">
                  وارد شوید.
                </Link>
              </div>
            </div>
          </form>
          <h1 className="mb-5 mt-8 text-xl">OR</h1>
          <div className="flex w-5/12 items-center">
            <button className="ml-1 flex w-1/2 items-center justify-center border-gray-400 lg:border">
              <img
                src={require("./../assets/img/Google.png")}
                className="ml-2"
                alt=""
              />
              <span className="hidden text-gray-700 lg:block">
                Continue with Google
              </span>
            </button>
            <button className="mr-1 flex w-1/2 items-center justify-center border-gray-400 lg:border">
              <img
                src={require("./../assets/img/GitHub.png")}
                className="ml-2"
                alt=""
              />
              <span className="hidden text-gray-700 lg:block">
                Continue with Github
              </span>
            </button>
          </div>
        </div>
        <div className="hidden h-full w-5/12 overflow-hidden bg-blue-400 lg:block">
          <img
            src={require(`./../assets/img/alex-quezada-3omrjtFuarY-unsplash.jpg`)}
            alt=""
            className="h-full w-full xl:h-auto xl:w-auto"
          />
        </div>
      </div>
    </>
  );
};

export default SignupPage;
