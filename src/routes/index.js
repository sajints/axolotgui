// src/components/RouteComponent.js
import { Routes, Route } from "react-router-dom";
import { Layout } from "../layout";
import Dashboard from "../scenes/dashboard";
import Team from "../scenes/team";
import Contacts from "../scenes/contacts";
import Settings from "../scenes/settings";
import Form from "../scenes/form";
import Bar from "../scenes/bar";
import Pie from "../scenes/pie";
import Line from "../scenes/line";
import FAQ from "../scenes/faq";
import Therapy from "../scenes/therapy/therapy";
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
        <Route path="form" element={<PrivateRoute element={Form} />} />
        <Route path="bar" element={<PrivateRoute element={Bar} />} />
        <Route path="pie" element={<PrivateRoute element={Pie} />} />
        <Route path="line" element={<PrivateRoute element={Line} />} />
        <Route path="faq" element={<PrivateRoute element={FAQ} />} />
        <Route path="therapy" element={<PrivateRoute element={Therapy} />} />
        <Route path="geography" element={<PrivateRoute element={Geography} />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
