import { Routes, Route, useLocation } from 'react-router-dom';

import ContactUs from './pages/ContactUs';
import Playlist from './pages/Playlist';
import Home from './pages/Home';
import Charts from './pages/Charts';
import BasicLayout from './components/BasicLayout';
import ErrorBoundary from './ErrorBoundary';
import ChartsLanding from './pages/ChartsLanding';
import NotFound from './pages/NotFound';
import ChartsType from './pages/ChartsType';
import AboutUs from './pages/AboutUs';



const MainRoutes = () => {
  const location = useLocation();
  return (
  <Routes location={location} key={location.key}>
      {/* <Route path="/login" element={<Login />} /> */}
      <Route element={<BasicLayout/>} errorElement={<ErrorBoundary/>}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/playlist" element={<Playlist />} />
      <Route path="/charts/:charts/types/:types" element={<Charts />} />
      <Route path="/charts/:charts" element={<ChartsType />}/>
      <Route path="/charts" element={<ChartsLanding />}/>
      <Route path="*" element={<NotFound />} />
      </Route>
      
  </Routes>
)}

export default MainRoutes;