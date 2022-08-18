import React, { useState, useEffect } from "react";
import './App.css';
import "./Fonts.css";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";
import Axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./Pages/Home";


import Navbar, { useDarkMode } from "./Components/Navbar";
import { darkTheme, lightTheme } from "./Constants/Theme";

import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";

import { Button, Modal } from 'react-bootstrap';

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
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    handleShow();
  }, [loginStatus]);

  // console.log(themeMode)

  const AgeModal = () => {
    console.log();
    return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Whisky Bar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>To visit our website, you must be of legal drinking/purchasing age in your location of residence. If there is no legal age for consuming alcohol in your location, you must be over 21.</p>
          <br />
          <h2>ARE YOU 21 YEARS OF AGE?</h2>
          <p>By clicking YES, you confirm that you are the required age of your country to visit our website, you accept Terms and Conditions and you declare that you have read our Privacy & Cookies notice.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            NO
          </Button>
          <Button variant="primary" onClick={handleClose}>
            YES, I AM
          </Button>
        </Modal.Footer>
      </Modal>
    );

  }

  return (
    <React.Fragment>
      <ThemeProvider theme={themeMode}>
        <Router>
          <Navbar
            theme={theme}
            toggleTheme={toggleTheme}
            loginStatus={loginStatus}
          />
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
          <AgeModal />
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
