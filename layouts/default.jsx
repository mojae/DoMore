import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DefaultLayout({ children }) {
  return (
    <>
      <div className="layout">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
