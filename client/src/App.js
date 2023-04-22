import { useState } from "react";
import { Navigate, BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./components/Home";
import Login from "./components/Login";
import AccountProvider from "./context/AccountProvider";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ?
    <>
      <Outlet />
    </> : <Navigate replace to='/' />
};

function App() {

  const [isAuthenticated, setAuthentication] = useState(false);

  const clientId = "903792860251-ol3uilnqhg3bgn7c0adhit0vle4gncpb.apps.googleusercontent.com";
  return (
    <AccountProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <div className="app">
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Login isUserAuthenticated={setAuthentication} />} />
              <Route path='/home' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path='/home' element={<Home />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </GoogleOAuthProvider>
    </AccountProvider>
  );
}

export default App;
