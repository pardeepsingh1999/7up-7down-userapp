import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ErrorNotFound from "./Components/ErrorNotFound";
import Dashboard from "./pages/protected/Dashboard";
import Layout from "./containers/Layout";
import SignIn from "./pages/public/SignIn";
import SignUp from "./pages/public/SignUp";
import PublicRoute from "./Components/routes/PublicRoute";
import ProtectedRoute from "./Components/routes/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="" element={<PublicRoute redirectRoute={"/dashboard"} />}>
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/Signup" element={<SignUp />} />

            <Route index element={<Navigate replace to="/signin" />} />
          </Route>

          <Route path="" element={<ProtectedRoute redirectRoute={"/signin"} />}>
            <Route exact path="/dashboard" element={<Dashboard />} />

            <Route index element={<Navigate replace to="/dashboard" />} />
          </Route>

          <Route path="*" element={<Navigate replace to="/dashboard" />} />

          <Route element={<ErrorNotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
