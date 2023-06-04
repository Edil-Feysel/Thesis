import { Routes, Route } from "react-router-dom";
import Login from "./pages/global/Login/Login";
import ForbidenPage from "./pages/global/RequireAuth/ForbidenPage";
import RequireAuth from "./pages/global/RequireAuth/RequireAuth";
import Dashboard from "./pages/dashboard/index";
import Event from "./pages/Event/index";
// import Contacts from "./pages/contacts";
import Form from "./pages/form";
import Calendar from "./pages/calendar";
// import Line from "./pages/line";
import AskAdmin from "./pages/dashboard/askMembership";
import Admin from "./pages/Admin";
import MembershipForm from "./pages/Admin/membershipForm";
import Notificaton from "./pages/global/Notification";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Forbiden" element={<ForbidenPage />} />
        <Route
          element={<RequireAuth Autherization={["User", "Member", "Admin"]} />}
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/askMembership" element={<AskAdmin />} />
          <Route path="/notification" element={<Notificaton />} />
        </Route>
        <Route element={<RequireAuth Autherization={["Member", "Admin"]} />}>
          <Route path="/event" element={<Event />} />
          <Route path="/form" element={<Form />} />
          <Route path="/calendar" element={<Calendar />} />
        </Route>
        <Route element={<RequireAuth Autherization={["Admin"]} />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/membershipForm" element={<MembershipForm />} />
        </Route>
        {/* <Route path="/contacts" element={<Contacts />} /> */}
        {/* <Route path="/line" element={<Line />} /> */}
      </Routes>
    </>
  );
};

export default App;
