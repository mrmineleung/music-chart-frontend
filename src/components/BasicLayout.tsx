import { Outlet } from "react-router-dom";
import AnimateIn from "./ui/animate-in";
import ScrollToTopButton from "./ScrollToTopButton";
import Header from "./Header";
import { useAuth } from "@/provider/AuthProvider";
import { useEffect } from "react";
// import Footer from "./Footer";

const BasicLayout = () => {
  const { getCurrentUser } = useAuth();
  
  useEffect(() => {
    const fetchUser = async () => {
      await getCurrentUser();
    };
    fetchUser();
  }, []);

  return (
    <>
    <Header />
    <AnimateIn
              from="opacity-0 translate-y-4"
              to="opacity-100 translate-y-0 translate-x-0"
              duration={500}
            >
    <div className="max-w-4xl m-auto mb-32 px-2">
      <Outlet />
      <div className="sticky mt-auto ml-auto max-w-12 bottom-32 right-5 flex flex-row justify-end space-x-2">

          <ScrollToTopButton></ScrollToTopButton>
        </div>
    </div>
     </AnimateIn>
     {/* <Footer /> */}
     </>
  );
};

export default BasicLayout;
