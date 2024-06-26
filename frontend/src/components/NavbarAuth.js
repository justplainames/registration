import React from "react";
import {
  Flex,
  Button,
  HStack,
  Text,
  Avatar,
  useToast,
  IconButton,
  MenuItem,
  MenuDivider,
  MenuList,
  Menu,
  VStack,
  MenuButton,
  Box,
  Stack,
  Collapse,
} from "@chakra-ui/react";
import "../styles/styles.css"; // Import the CSS file
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate, useLocation, Link, NavLink } from "react-router-dom";
import { IconLogout } from "@tabler/icons-react";
import { useAuth0 } from "@auth0/auth0-react";

export default function NavbarAuth({ isOpen, toggleNavbar }) {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();
  const { logout } = useAuth0();

  const showToast = async () => {
    sessionStorage.removeItem("eventName");
    sessionStorage.removeItem("eventId");
    logout({ logoutParams: { returnTo: window.location.origin } });
    toast({
      title: "Logged Out",
      description: "Successfully logged out",
      duration: 3000,
      isClosable: true,
      status: "success",
      variant: "solid",
      position: "top",
      variant: "toastSuccess",
      icon: <IconLogout />,
    });
    navigate("/");
  };

  const toCreateEvent = () => {
    navigate("/createEvent");
  };

  const LinkItems = [
    { name: "Home", link: "/dashboard" },
    { name: "Participants", link: "/participants" },
    { name: "Scoreboard", link: "/scoring" },
    { name: "Profile", link: "/profile" },
    { name: "Brackets", link: "/brackets" },
    { name: "Fullstack", link: "/fullstack" },
  ];

  return (
    <Flex
      justifyContent={
        location.pathname === "/"
          ? "space-between"
          : { base: "space-between", md: "flex-end" }
      }
      alignItems="center"
      borderBottomWidth="1px"
      borderBottomColor="gray.600"
    >
      {location.pathname === "/" && (
        <Flex display={{ base: "none", md: "flex" }} ml={10}>
          <DesktopNav
            props={LinkItems}
            role={user["http://localhost:3000/roles"][0]}
          />
        </Flex>
      )}
      {location.pathname === "/" && (
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={() => {
            toggleNavbar();
          }}
          variant="outline"
          aria-label="open menu"
          icon={<HamburgerIcon w={5} h={5} color="white" />}
          color="white"
        />
      )}
      {location.pathname === "/" && (
        <Collapse in={isOpen} animateOpacity>
          <MobileNav
            props={LinkItems}
            role={user["http://localhost:3000/roles"][0]}
          />
        </Collapse>
      )}
      {location.pathname === "/" && (
        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          textColor="white"
          color="white"
        >
          Logo
        </Text>
      )}
      {location.pathname !== "/" && (
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={() => {
            toggleNavbar();
          }}
          variant="outline"
          aria-label="open menu"
          icon={<HamburgerIcon w={5} h={5} color="white" />}
          color="white"
        />
      )}
      {location.pathname !== "/" && (
        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          textColor="white"
        >
          Logo
        </Text>
      )}
      <HStack spacing={{ base: "0", md: "6" }}>
        {user["http://localhost:3000/roles"][0] === "Admin" && (
          <Button
            bg="rgb(237,137,51)"
            textColor="gray.900"
            _hover={{
              textDecoration: "none",
              bg: "rgb(213,123,45)",
            }}
            onClick={toCreateEvent}
          >
            Create Event
          </Button>
        )}
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size="sm" bg="orange.400" />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
              </HStack>
            </MenuButton>
            <MenuList bg="gray.900" borderColor="gray.700">
              <MenuItem bg="gray.600" color="white" _hover={{ bg: "gray.700" }}>
                Profile
              </MenuItem>
              <MenuItem bg="gray.600" color="white" _hover={{ bg: "gray.700" }}>
                Settings
              </MenuItem>
              <MenuItem bg="gray.600" color="white" _hover={{ bg: "gray.700" }}>
                Billing
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  showToast();
                }}
                bg="gray.600"
                color="white"
                _hover={{ bg: "gray.700" }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
}

const MobileNavLinks = (props) => {
  const { link } = props;

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
      <NavLink
        color="white"
        key={link.name}
        className="nav-link"
        to={link.link}
      >
        {link.name}
      </NavLink>
    </Box>
  );
};

const DesktopNav = ({ props, role }) => {
  return (
    <Stack direction={"row"} spacing={4}>
      {props.map((link) => {
        if (sessionStorage.getItem("eventId") || link.name === "Home") {
          if (
            role === "Admin" ||
            link.name === "Home" ||
            link.name === "Profile" ||
            link.name === "Brackets"
          )
            return <DesktopNavLinks key={link.name} link={link} />;
        }
      })}
    </Stack>
  );
};

const DesktopNavLinks = (props) => {
  const linkHoverColor = "gray.700";
  const { link } = props;

  return (
    <Box
      color="white"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: linkHoverColor,
      }}
    >
      <NavLink
        color="white"
        key={link.name}
        className="nav-link"
        to={link.link}
      >
        {link.name}
      </NavLink>
    </Box>
  );
};

const MobileNav = ({ props, role }) => {
  const BackgroundColor = "gray.800";
  return (
    <Stack bg={BackgroundColor} p={4} display={{ md: "none" }}>
      {props.map((link) => {
        if (sessionStorage.getItem("eventId") || link.name === "Home") {
          if (
            role === "Admin" ||
            link.name === "Home" ||
            link.name === "Profile" ||
            link.name === "Brackets"
          ) {
            return (
              <MobileNavLinks key={link.name} link={link}>
                {link}
              </MobileNavLinks>
            );
          }
        }
      })}
    </Stack>
  );
};
