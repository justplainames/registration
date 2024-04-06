import React, { useContext, useEffect, useState } from "react";
import {
  Flex,
  Button,
  Text,
  Box,
  IconButton,
  useDisclosure,
  useBreakpointValue,
  Stack,
  Collapse,
} from "@chakra-ui/react";
import "../styles/styles.css"; // Import the CSS file
import { NavLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";
import { RoleContext } from "../helpers/RoleContext";
const apiPath = process.env.REACT_APP_API_PATH;

async function auth() {
  axios.post(`${apiPath}request`).then((response) => {
    window.location.href = response.data.url;
  });
}

const links = [
  { name: "About Us", link: "aboutUs" },
  { name: "Features", link: "features" },
  { name: "How It Works", link: "howItWorks" },
];

export default function Navbar({ scrollToSection }) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={"gray.800"}
        color="white"
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"gray.900"}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <CloseIcon w={3} h={3} color="white" />
              ) : (
                <HamburgerIcon w={5} h={5} color="white" />
              )
            }
            variant="ghost"
            _hover={{ bg: "gray.600" }}
            aria-label="Toggle Navigation"
          />
        </Flex>

        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          alignItems="center"
        >
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color="white"
          >
            Logo
          </Text>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav props={links} scrollToSection={scrollToSection} />
          </Flex>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            _hover={{ cursor: "pointer" }}
            // href={"#"}
            onClick={auth}
          >
            Sign In
          </Button>
          <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"orange.400"}
            _hover={{ cursor: "pointer", bg: "orange.300" }}
            onClick={auth}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav props={links} />
      </Collapse>
    </Box>
  );
}

const MobileNavLinks = (props) => {
  const { children } = props;

  const onHoverLink = "gray.700";
  return (
    <Box
      py={1}
      px={2}
      justifyContent="space-between"
      alignItems="center"
      rounded={"md"}
      textColor={"gray.200"}
      _hover={{
        textDecoration: "none",
        bg: onHoverLink,
      }}
    >
      <NavLink>{children.name}</NavLink>
    </Box>
  );
};

const DesktopNav = ({ props, scrollToSection }) => {
  return (
    <Stack direction={"row"} spacing={4}>
      {props.map((link) => (
        <DesktopNavLinks
          key={link.name}
          link={link}
          scrollToSection={scrollToSection}
        />
      ))}
    </Stack>
  );
};

const DesktopNavLinks = (props) => {
  const linkHoverColor = "gray.700";
  const { link, scrollToSection } = props;

  return (
    <Box
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: linkHoverColor,
      }}
      onClick={() => scrollToSection(link.link)}
    >
      <NavLink className="nav-link">{link.name}</NavLink>
    </Box>
  );
};

const MobileNav = ({ props }) => {
  const BackgroundColor = "gray.800";
  return (
    <Stack bg={BackgroundColor} p={4} display={{ md: "none" }}>
      {props.map((link) => {
        return <MobileNavLinks key={link.name}>{link}</MobileNavLinks>;
      })}
    </Stack>
  );
};
