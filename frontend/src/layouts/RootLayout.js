import { Outlet } from "react-router-dom";
import { Grid, GridItem, extendTheme } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "@fontsource/inter";

export default function RootLayout() {
  return (
    <Grid templateColumns="repeat(10, 1fr)" bg="gray.50" minHeight="100vh">
      <GridItem
        as="aside"
        colSpan={{ base: 10, lg: 2, xl: 2 }}
        bg="purple.400"
        minHeight={{ lg: "100%" }}
        p={{ base: "20px", lg: "30px" }}
      >
        <Sidebar />
      </GridItem>

      <GridItem as="main" colSpan={{ base: 10, lg: 8, xl: 8 }} p="40px">
        <Navbar />
        <Outlet />
      </GridItem>
    </Grid>
  );
}
