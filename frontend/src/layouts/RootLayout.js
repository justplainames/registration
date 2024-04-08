import { Outlet, useLocation } from "react-router-dom";
import { Grid, GridItem, extendTheme } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NavbarAuth from "../components/NavbarAuth";
import "@fontsource/inter";
import { AuthContext } from "../helpers/AuthContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

export default function RootLayout() {
  const { authState, setAuthState } = useContext(AuthContext);
  const apiPath = process.env.REACT_APP_API_PATH;
  const [navbarOpen, setNavbarOpen] = useState(false);
  const location = useLocation();
  const scrollToSection = (sectionName) => {
    document.getElementById(sectionName).scrollIntoView({ behavior: "smooth" });
  };

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };
  useEffect(() => {
    axios
      .get(`${apiPath}request/authenticate`)
      .then((response) => {
        if (response.data === "ok") {
          setAuthState({ isAuthenticated: true });
        } else {
          setAuthState({ isAuthenticated: false });
        }
      })
      .catch((error) => {
        console.error("There is an error: ", error);
      });
  }, []);
  return (
    <Grid templateColumns="repeat(10, 1fr)" bg="gray.800">
      {authState.isAuthenticated ? (
        location.pathname === "/" ? (
          <>
            <GridItem colSpan={{ base: 10, md: 10 }}>
              <NavbarAuth isOpen={navbarOpen} toggleNavbar={toggleNavbar} />
              <Outlet />
            </GridItem>
          </>
        ) : (
          <>
            <GridItem colSpan={{ base: 0, md: 2 }}>
              <Sidebar isOpen={navbarOpen} toggleNavbar={toggleNavbar} />
            </GridItem>
            <GridItem colSpan={{ base: 10, md: 8 }}>
              <NavbarAuth isOpen={navbarOpen} toggleNavbar={toggleNavbar} />
              <Outlet />
            </GridItem>
          </>
        )
      ) : (
        <GridItem as="main" colSpan={{ base: 10 }}>
          <Navbar id="navbar-unauth" scrollToSection={scrollToSection} />
          <Outlet id="outlet-unauth" scrollToSection={scrollToSection} />
        </GridItem>
      )}
    </Grid>
  );
}
