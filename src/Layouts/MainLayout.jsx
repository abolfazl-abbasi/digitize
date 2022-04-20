import Footer from "../components/Footer";
import HeaderDesktop from "../components/HeaderDesktop";
import HeaderMobile from "../components/HeaderMobile";

const Layout = ({ onSearch, children, title }) => {
  return (
    <>
      <HeaderDesktop />
      <HeaderMobile title={title} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
