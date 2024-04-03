import { ThemeProvider } from "@/provider/ThemeProvider";
// import Header from "./components/Header";
import Footer from "./components/Footer";
import PlaylistProvider from "./provider/PlaylistProvider";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./MainRoutes";

const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <PlaylistProvider>
          <BrowserRouter>
            {/* <Header /> */}
              <MainRoutes />
            <Footer />
          </BrowserRouter>
        </PlaylistProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
