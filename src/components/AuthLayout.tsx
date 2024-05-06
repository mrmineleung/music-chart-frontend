import { Outlet, useNavigate } from "react-router-dom";
// import Header from "./Header";
import { useAuth } from "@/provider/AuthProvider";
import { useEffect } from "react";

const AuthLayout = () => {
  const { getCurrentUser } = useAuth();

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        return navigate("/user/setting");
      }
    };
    fetchUser();
  }, [getCurrentUser, navigate]);

return (
  <>
        {/* <Header /> */}
        <div className="flex min-h-screen w-full flex-col">
          <Outlet />
        </div>
  </>
);
};

export default AuthLayout;
