import {
  Flex,
  Icon,
  Box,
  Drawer,
  DrawerContent,
  Text,
  CloseButton,
} from "@chakra-ui/react";
import {
  IconHome,
  IconScoreboard,
  IconTournament,
  IconFriends,
  IconPoo,
} from "@tabler/icons-react";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Sidebar({ isOpen, toggleNavbar }) {
  const handleToggleNavbar = () => {
    toggleNavbar(); // Invoke toggleNavbar function when Flex is clicked
  };
  const { user } = useAuth0();

  const SidebarContent = ({ onClose, isOpen, toggleNavbar, ...rest }) => {
    return (
      <Box
        transition="3s ease"
        name="SidebarContent"
        minHeight="100vh"
        bg="gray.800"
        h="full"
        {...rest}
      >
        <Flex
          name="sidebar-content-Flex"
          h="20"
          alignItems="center"
          mx="8"
          justifyContent="space-between"
        >
          <Text
            textColor="white"
            fontSize="2xl"
            fontFamily="monospace"
            fontWeight="bold"
          >
            Logo
          </Text>
          <CloseButton
            color="white"
            display={{ base: "flex", md: "none" }}
            onClick={handleToggleNavbar}
          />
        </Flex>

        {LinkItems.map((link) => {
          if (link.name == "Home" || sessionStorage.getItem("eventId")) {
            if (
              user["http://localhost:3000/roles"][0] === "Admin" ||
              link.name === "Home" ||
              link.name === "Profile" ||
              link.name === "Brackets"
            )
              return (
                <NavItem
                  key={link.name}
                  icon={link.icon}
                  link={link.link}
                  // onClick={handleToggleNavbar}
                >
                  {link.name}
                </NavItem>
              );
          }
        })}
      </Box>
    );
  };

  return (
    <Box
      name="Sidebar Big Box"
      minH="100vh"
      bg="gray.800"
      borderRight="1px"
      display={{ base: "none", md: "block" }}
      borderRightColor="gray.600"
    >
      <SidebarContent
        name="sidebar content 2"
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        name="Drawer"
        isOpen={isOpen}
        placement="left"
        returnFocusOnClose={false}
        onOverlayClick={toggleNavbar}
        size="full"
      >
        <DrawerContent>
          <SidebarContent />
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

const NavItem = ({ icon, link, children, ...rest }) => {
  return (
    <Box style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <NavLink to={link}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "orange.400",
            color: "white",
          }}
          {...rest}
          textColor="white"
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
              textColor="white"
            />
          )}
          {children}
        </Flex>
      </NavLink>
    </Box>
  );
};

const LinkItems = [
  { name: "Home", icon: IconHome, link: "/dashboard" },
  { name: "Participants", icon: IconFriends, link: "/participants" },
  { name: "Scoreboard", icon: IconTournament, link: "/scoring" },
  { name: "Profile", icon: IconScoreboard, link: "/profile" },
  { name: "Brackets", icon: IconScoreboard, link: "/brackets" },
  { name: "Fullstack", icon: IconPoo, link: "/fullstack" },
];
