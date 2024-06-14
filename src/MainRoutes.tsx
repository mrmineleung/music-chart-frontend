import {
  createBrowserRouter,
} from "react-router-dom";

import ContactUs from "./pages/ContactUs";
// import Playlist from "./pages/UserPlaylist";
import Home from "./pages/Home";
import Charts from "./pages/Charts";
import BasicLayout from "./components/BasicLayout";
import ErrorBoundary from "./ErrorBoundary";
import ChartsLanding from "./pages/ChartsLanding";
import NotFound from "./pages/NotFound";
import ChartsType from "./pages/ChartsType";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import UserSetting from "./pages/UserSetting";
import UserLayout from "./components/UserLayout";
import AuthLayout from "./components/AuthLayout";
import UserPlaylist from "./pages/UserPlaylist";
import Explore from "./pages/Explore";
import VerifyEmail from "./pages/VerifyEmail";
import PublicPlaylist from "./pages/PublicPlaylist";
import ResetPassword from "./pages/ResetPassword";
import OAuthCallback from "./pages/OAuthCallback";
import Song from "./pages/Song";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      // {
      //   path: "playlist",
      //   element: <Playlist />,
      // },
      {
        path: "charts/:charts/types/:types",
        element: <Charts />,
      },
      {
        path: "charts/:charts",
        element: <ChartsType />,
      },
      {
        path: "charts",
        element: <ChartsLanding />,
      },
      {
        path: "explore",
        element: <Explore />,
      },
      {
        path: "playlists/:playlist_id",
        element: <PublicPlaylist />,
      },
      {
        path: "songs/:song_id",
        element: <Song />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    // errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "/verify-email/:token",
        element: <VerifyEmail />,
      },
      {
        path: "/oauth-callback/:provider",
        element: <OAuthCallback />,
      },
    ],
  },
  {
    path: "/user",
    element: <UserLayout />,
    // errorElement: <ErrorBoundary />,
    children: [
      {
        path: "setting",
        element: <UserSetting />,
      },
      {
        path: "playlist",
        element: <UserPlaylist />,
      },
    ],
  },
]);

export default routes;
