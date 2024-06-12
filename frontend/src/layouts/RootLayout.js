import { Outlet, useLocation } from "react-router-dom";
import { Grid, GridItem, extendTheme } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NavbarAuth from "../components/NavbarAuth";
import "@fontsource/inter";
// import { AuthContext } from "../helpers/AuthContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function RootLayout() {
  // const { authState, setAuthState } = useContext(AuthContext);
  const { isAuthenticated } = useAuth0();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const location = useLocation();
  const scrollToSection = (sectionName) => {
    document.getElementById(sectionName).scrollIntoView({ behavior: "smooth" });
  };

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <Grid templateColumns="repeat(10, 1fr)" bg="gray.800">
      {isAuthenticated ? (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname.startsWith("/signup") ? (
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
