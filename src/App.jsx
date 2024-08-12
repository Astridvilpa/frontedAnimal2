import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Admin from "./pages/admin/Admin";
import Centro from "./pages/centro/Centro";
import Galeria from "./pages/galeria/Galeria";
import Veterinarios from "./pages/veterinarios/Veterinarios";
import UserProfile from "./pages/user_profile/UserProfile";
import PetListContainer from "./components/user_profile/PetListContainer";
import ServiceListContainer from "./components/user_profile/ServiceListContainer";
import AppointmentListContainer from "./components/user_profile/AppointmentListContainer";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="profile" element={<Profile />} />
      <Route path="Admin" element={<Admin />} />
      <Route path="centro" element={<Centro />} />
      <Route path="galeria" element={<Galeria />} />
      <Route path="veterinarios" element={<Veterinarios />} />
      <Route path="appointment" element={<AppointmentListContainer />} />
      <Route path="user_profile" element={<UserProfile />} />
      <Route path="pets" element={<PetListContainer />} />
      <Route path="services" element={<ServiceListContainer />} />
      
      
    </Routes>
  );
}

export default App;
