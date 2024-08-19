// src/components/RouteComponent.js
import { Routes, Route } from "react-router-dom";
import { Layout } from "../layout";
import Dashboard from "../scenes/dashboard";
import Team from "../scenes/team";
import Contacts from "../scenes/contacts";
import Settings from "../scenes/settings";
import DevicePage from "../scenes/devicepage/index";
import Bar from "../scenes/bar";
import Pie from "../scenes/pie";
import Line from "../scenes/line";
import FAQ from "../scenes/faq";
import TherapyLog from "../scenes/therapylogpage/index";
import ErrorLog from "../scenes/errorlogpage/index";
import Login from "../scenes/login";
import Geography from "../scenes/geography";
import PrivateRoute from "./privateroute";  // Import the PrivateRoute component

export const RouteComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PrivateRoute element={Dashboard} />} />
        <Route path="team" element={<PrivateRoute element={Team} />} />
        <Route path="contacts" element={<PrivateRoute element={Contacts} />} />
        <Route path="settings" element={<PrivateRoute element={Settings} />} />
        <Route path="device" element={<PrivateRoute element={DevicePage} />} />
        <Route path="bar" element={<PrivateRoute element={Bar} />} />
        <Route path="pie" element={<PrivateRoute element={Pie} />} />
        <Route path="line" element={<PrivateRoute element={Line} />} />
        <Route path="faq" element={<PrivateRoute element={FAQ} />} />
        <Route path="therapy" element={<PrivateRoute element={TherapyLog} />} />
        <Route path="errorlog" element={<PrivateRoute element={ErrorLog} />} />
        <Route path="geography" element={<PrivateRoute element={Geography} />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
