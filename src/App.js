import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./utils/main.scss";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/dashboard/Dashboard";
import AllTransaction from "./pages/allTransaction/AllTransaction";
import Account from "./pages/account/Account";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { AlertMessage } from "./features/alertMessage/AlertMessage";
import { useDispatch } from "react-redux";
import { getUser } from "./utils/utils";
import { setUser } from "./features/userProfile/userSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getTokenAndUser = async () => {
      const token = localStorage.getItem("ET-token");
      if(token){
        const { user } = await getUser(token);
        dispatch(setUser(user));
      }
    }
    getTokenAndUser();
  },[])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path={"login"} element={<Auth />} />
            <Route path={"registration"} element={<Auth />} />
            <Route path={"forgot-password"} element={<Auth />} />
            <Route path={"reset-password/:token"} element={<Auth />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/alltransaction" element={<AllTransaction />} />
            <Route path="/account" element={<Account />} />
          </Route>
        </Routes>
      </Router>
      <AlertMessage/>
    </div>
  );
};

export default App;
