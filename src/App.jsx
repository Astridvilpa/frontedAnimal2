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
import Appointment from "./pages/appointments/Appointments"
import UserProfile from "./pages/user_profile/UserProfile";

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
      <Route path="appointment" element={<Appointment />} />
      <Route path="user_profile" element={<UserProfile />} />
    </Routes>
  );
}

export default App;
