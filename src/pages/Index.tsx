import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";


const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Outlet/>
      <ToastContainer/>
      <Footer />
    </div>
  );
};

export default Index;
