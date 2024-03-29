import { Outlet } from "react-router-dom";
import { Grid, GridItem, extendTheme } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NavbarAuth from "../components/NavbarAuth";
import "@fontsource/inter";
import { AuthContext } from "../helpers/AuthContext";
import react, { useContext, useState } from "react";
import { NavbarContext } from "../helpers/NavbarContext";

export default function RootLayout() {
  const { authState, setAuthState } = useContext(AuthContext);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const scrollToSection = (sectionName) => {
    console.log("ENTERED FUNCTION", sectionName);
    const element = document.getElementById(sectionName);
    console.log("ELEMETBNT ", element);
    document.getElementById(sectionName).scrollIntoView({ behavior: "smooth" });
  };

  const toggleNavbar = () => {
    console.log(navbarOpen);
    setNavbarOpen(!navbarOpen);
  };

  console.log("Rootlayout");

  return (
    <NavbarContext.Provider>
      <Grid templateColumns="repeat(10, 1fr)" bg="gray.800">
        {authState ? (
          <>
            <GridItem colSpan={{ base: 0, md: 2 }}>
              <Sidebar isOpen={navbarOpen} toggleNavbar={toggleNavbar} />
            </GridItem>
            <GridItem colSpan={{ base: 10, md: 8 }}>
              <NavbarAuth isOpen={navbarOpen} toggleNavbar={toggleNavbar} />
              <Outlet />
            </GridItem>
          </>
        ) : (
          <GridItem as="main" colSpan={{ base: 10 }}>
            <Navbar id="navbar-unauth" scrollToSection={scrollToSection} />
            <Outlet id="outlet-unauth" scrollToSection={scrollToSection} />
          </GridItem>
        )}
      </Grid>
    </NavbarContext.Provider>
  );
}
