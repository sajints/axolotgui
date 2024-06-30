import { Route, Routes } from "react-router-dom"
import { Layout } from "../layout"
import Dashboard from "../scenes/dashboard"
import Team from "../scenes/team"
import Contacts from "../scenes/contacts"
import Settings from "../scenes/settings"
import Form from "../scenes/form"
import Bar from "../scenes/bar"
import Pie from "../scenes/pie"
import Line from "../scenes/line"
import FAQ from "../scenes/faq"
import Therapy from "../scenes/therapy/therapy"
import Login from "../scenes/login"
import Geography from "../scenes/geography"

export const RouteComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route  index element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/therapy" element={<Therapy />} />
                <Route path="/geography" element={<Geography />} />
            </Route>
            <Route path="/login" element={<Login />} />

        </Routes>
    )
}