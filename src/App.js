import React, { useState, useEffect } from "react";
import './App.css';
import "./Fonts.css";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";
import Axios from "axios";
import Navbar from "./Components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./Pages/Home";


import ThemeToggler, { useDarkMode } from "./Components/ThemeToggler";
import { darkTheme, lightTheme } from "./Constants/Theme";

import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";

export const AppUrl = "http://localhost:3001";
// export const AppUrlNoPort = "http://localhost";
// export const SocketUrl = "http://localhost:3002";


const App = () => {
  const dispatch = useDispatch();

  const cookieConsent = getCookieConsentValue();
  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);

  const [necessaryConsent, updateNecessaryConsent] = useState("denied");
  const [analyticsConsent, updateAnalyticsConsent] = useState("denied");
  const [marketingConsent, updateMarketingConsent] = useState("denied");


  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  const [currency, setCurrency] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const getUserLoginStatus = () => {
    // Axios.get(`${AppUrl}/login`).then((response) => {
    //   if (response.data.loggedIn === true) {
    //     setLoginStatus(true);
    //   } else {
    //     // Navigate('/');
    //   }
    // });
  };

  useEffect(() => {
    getUserLoginStatus();
  }, [loginStatus]);

  // console.log(themeMode)

  return (
    <React.Fragment>
      <ThemeProvider theme={themeMode}>
        <Router>
          <ThemeToggler
            theme={theme}
            toggleTheme={toggleTheme}
            currency={currency}
          />
          <Navbar loginStatus={loginStatus} />
          {/* saves the user's response */}
          <CookieConsent
              onAccept={() => {
                updateNecessaryConsent("granted");
                if (checkedOne === true) {
                  console.log('YAY')
                  updateAnalyticsConsent("granted");
                }
                if (checkedTwo === true) {
                  updateMarketingConsent("granted");
                }
              }}
              buttonText="Accept Cookies"
              ariaAcceptLabel="Accept cookies"
              ariaDeclineLabel="Decline cookies"
              expires={150}
            >
              We use cookies and other tracking technologies to operate the website, measure and analyze the audience, present you with personalized advertising outside the site, and enable certain social networks to function.{" "}
              <br/><br/>
              For more detailed information about personal data collected via cookies and the cookies we use, click here.
          </CookieConsent>
          <Routes>
            {/* Unprotected Routes */}
            <Route path="/" element={<Home theme={theme} />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App;
