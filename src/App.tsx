import { ThemeProvider } from "@/provider/ThemeProvider";
// import Header from "./components/Header";
import Footer from "./components/Footer";
import PlaylistProvider from "./provider/PlaylistProvider";
import { RouterProvider } from "react-router-dom";
import routes from "./MainRoutes";
import AuthProvider from "./provider/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <PlaylistProvider>
            {/* <Header /> */}
            <RouterProvider router={routes} />
            <Footer />
            <Toaster />
          </PlaylistProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
