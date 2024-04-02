import {
  Flex,
  Icon,
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Text,
  CloseButton,
  IconButton,
  Menu,
  MenuButton,
  HStack,
  Avatar,
  VStack,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import {
  IconHome,
  IconScoreboard,
  IconTournament,
  IconFriends,
  IconPoo,
} from "@tabler/icons-react";
import { List, ListItem } from "@chakra-ui/react";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { EventContext } from "../helpers/EventContext";
import { RoleContext } from "../helpers/RoleContext";

export default function Sidebar({ isOpen, toggleNavbar }) {
  console.log("sidebar rendering");
  const { eventState } = useContext(EventContext);
  const { roleState } = useContext(RoleContext);
  const handleToggleNavbar = () => {
    toggleNavbar(); // Invoke toggleNavbar function when Flex is clicked
  };
  // const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(eventState);
  const SidebarContent = ({ onClose, isOpen, toggleNavbar, ...rest }) => {
    return (
      <Box
        transition="3s ease"
        name="SidebarContent"
        minHeight="100vh"
        // bg={useColorModeValue("white", "gray.900")}
        bg="gray.800"
        // pos="fixed"
        h="full"
        {...rest}
      >
        <Flex
          name="sidebar-content-Flex"
          h="20"
          alignItems="center"
          mx="8"
          justifyContent="space-between"
          // display={{ base: "none", md: "block" }}
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
          if (link.name == "Home" || eventState.eventId != null) {
            // if (
            //   link.name == "Participants" ||
            //   (link.name == "Scoreboard" && roleState.role != "admin")
            // ) {
            //   return <></>;
            // } else {

            return (
              <NavItem key={link.name} icon={link.icon} link={link.link}>
                {link.name}
              </NavItem>
            );
            // }
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
      // borderRightColor={useColorModeValue("gray.200", "gray.700")}
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
      {/* mobilenav */}
      {/* <MobileNav onOpen={onOpen} /> */}
      {/* <Box ml={{ base: 0, md: 60 }} p="4"> */}
      {/* Content */}
      {/* </Box> */}
    </Box>
  );
  //   <List color="white" fontSize="1.2em" spacing={4}>
  //     <ListItem>
  //       <NavLink to="/dashboard">
  //         <Flex align="center">
  //           <Icon as={IconHome} boxSize={5} mr={2} />
  //           Dashboard
  //         </Flex>
  //       </NavLink>
  //     </ListItem>

  //     {eventState.eventName !== "Select Event" && (
  //       <>
  //         {roleState.role === "admin" && (
  //           <ListItem>
  //             <NavLink to="/participants">
  //               <Flex align="center">
  //                 <Icon as={IconFriends} boxSize={5} mr={2} />
  //                 Participants List
  //               </Flex>
  //             </NavLink>
  //           </ListItem>
  //         )}
  //         {roleState.role === "admin" && (
  //           <ListItem>
  //             <NavLink to="/scoring">
  //               <Flex align="center">
  //                 <Icon as={IconTournament} boxSize={5} mr={2} />
  //                 Scoring
  //               </Flex>
  //             </NavLink>
  //           </ListItem>
  //         )}

  //         <ListItem>
  //           <NavLink to="/profile">
  //             <Flex align="center">
  //               <Icon as={IconScoreboard} boxSize={5} mr={2} />
  //               Profile
  //             </Flex>
  //           </NavLink>
  //         </ListItem>

  //         <ListItem>
  //           <NavLink to="/brackets">
  //             <Flex align="center">
  //               <Icon as={IconScoreboard} boxSize={5} mr={2} />
  //               Brackets
  //             </Flex>
  //           </NavLink>
  //         </ListItem>
  //       </>
  //     )}

  //     <ListItem>
  //       <NavLink to="/fullstackTest">
  //         <Flex align="center">
  //           <Icon as={IconPoo} boxSize={5} mr={2} />
  //           Test Counter
  //         </Flex>
  //       </NavLink>
  //     </ListItem>
  //   </List>
  // );
}

const NavItem = ({ key, icon, link, children, ...rest }) => {
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
