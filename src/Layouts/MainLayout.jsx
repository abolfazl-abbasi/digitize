import Footer from "../components/Footer";
import HeaderDesktop from "../components/HeaderDesktop";
import HeaderMobile from "../components/HeaderMobile";

const Layout = ({ onSearch, children, title }) => {
  return (
    <>
      <HeaderDesktop onSearch={onSearch} />
      <HeaderMobile onSearch={onSearch} title={title} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
