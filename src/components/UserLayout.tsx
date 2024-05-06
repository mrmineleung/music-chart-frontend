import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useAuth } from "@/provider/AuthProvider";
import { useEffect } from "react";
import UserSideNavBar from "./UserSideNavBar";
// import Footer from "./Footer";

const UserLayout = () => {
  const { getCurrentUser } = useAuth();

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (!user) {
        navigate('/')
      }
    };
    fetchUser();
  }, [getCurrentUser, navigate]);

  return (
    <>
          <Header />
          <div className="flex min-h-screen w-full flex-col">
          <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4  p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <UserSideNavBar/>
            <Outlet />
            </div>
            </main>
          </div>
        </>
  );
};

export default UserLayout;
