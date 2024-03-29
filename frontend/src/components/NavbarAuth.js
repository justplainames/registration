import React, { useContext, useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Button,
  Spacer,
  HStack,
  Text,
  Avatar,
  AvatarBadge,
  Box,
  useColorModeValue,
  useToast,
  Icon,
  IconButton,
  useDisclosure,
  useBreakpointValue,
  Stack,
  Collapse,
  DrawerContent,
  Drawer,
  MenuItem,
  MenuDivider,
  MenuList,
  Menu,
  VStack,
  MenuButton,
} from "@chakra-ui/react";
import "../styles/styles.css"; // Import the CSS file
import { NavLink } from "react-router-dom";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { IconLogout } from "@tabler/icons-react";
import { EventContext } from "../helpers/EventContext";
import { AuthContext } from "../helpers/AuthContext";
import { NavbarContext } from "../helpers/NavbarContext";
import axios from "axios";
import { RoleContext } from "../helpers/RoleContext";
const apiPath = process.env.REACT_APP_API_PATH;

async function auth() {
  console.log(apiPath);
  axios.post(`${apiPath}request`).then((response) => {
    console.log(response.data.url);
    // const data = response.json();
    // console.log(data);
    window.location.href = response.data.url;
  });
}

export default function NavbarAuth({ isOpen, toggleNavbar }) {
  console.log("navbarauth rendering");
  const navigate = useNavigate();
  const toast = useToast();
  const { eventState } = useContext(EventContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const { roleState, setRoleState } = useContext(RoleContext);
  const [headingText, setHeadingText] = useState({});
  const apiPath = process.env.REACT_APP_API_PATH;
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const showToast = async () => {
    console.log("entered here");
    await axios.get(`${apiPath}oauth/logout`).then((response) => {
      console.log("Logged Out");
    });
    setAuthState(null);
    // .catch((err) => {
    //   console.log("error = ", err);
    // });
    toast({
      title: "Logged Out",
      description: "Successfully logged out",
      duration: 200000,
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

  useEffect(() => {
    console.log("Activated");
    setHeadingText(eventState);
  }, [eventState, authState]);
  //   const backgroundColor = useColorModeValue("white", "gray.900")}
  const backgroundColor = "gray.800";
  return (
    <Flex
      // ml={{ base: 0, md: 60 }}
      // px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={backgroundColor}
      borderBottomWidth="1px"
      //   borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      borderBottomColor="gray.600"
      justifyContent={{ base: "space-between", md: "flex-end" }}
      //   {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={() => {
          toggleNavbar();
        }}
        variant="outline"
        aria-label="open menu"
        icon={<HamburgerIcon w={5} h={5} color="white" />}
        color="white"

        // icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        textColor={"white"}
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          //   icon={<FiBell />}
        /> */}
        {roleState && roleState.role === "admin" && (
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
                  {roleState && (
                    <Text fontSize="sm" color="white">
                      {roleState.user_name}
                    </Text>
                  )}

                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
              </HStack>
            </MenuButton>
            <MenuList
              //   bg={useColorModeValue("white", "gray.900")}
              //   borderColor={useColorModeValue("gray.200", "gray.700")}
              bg="gray.900"
              borderColor="gray.700"
            >
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

    // <Flex mb="40px" as="nav" p="10px" alignItems="center">
    //   {authState && roleState ? (
    //     <>
    //       <Heading as="h1">Event Manager | {headingText.eventName}</Heading>
    //       <Spacer />
    //       <HStack spacing="20px">
    //         {roleState.role === "admin" && (
    //           <Button colorScheme="purple" onClick={toCreateEvent}>
    //             Create Event
    //           </Button>
    //         )}

    //         <Avatar bg="purple.500" name="Justplainames">
    //           <AvatarBadge w="1.3em" bg="teal.400">
    //             <Text fontSize="xs" color="white">
    //               0
    //             </Text>
    //           </AvatarBadge>
    //         </Avatar>
    //         <Text>{roleState.user_name}</Text>
    //         <Button colorScheme="purple" onClick={showToast}>
    //           Logout
    //         </Button>
    //       </HStack>
    //     </>
    //   ) : (
    // <Button colorScheme="purple" onClick={auth}>
    //   Login
    // </Button>
    //   )}
    // </Flex>
  );
}

// const DesktopNavLinks = (props) => {
//   // const linkColor = useColorModeValue('gray.600', 'gray.200')
//   // const linkHoverColor = useColorModeValue('gray.200', 'gray.700')
//   const linkHoverColor = "gray.700";
//   const linkColor = "gray.200";

//   const { children } = props;
//   return (
//     <Box
//       as="a"
//       px={2}
//       py={1}
//       rounded={"md"}
//       _hover={{
//         textDecoration: "none",
//         bg: linkHoverColor,
//       }}
//       href={"#"}
//     >
//       <NavLink className="nav-link">{children.name}</NavLink>
//     </Box>
//   );
// };

// const MobileNavLinks = (props) => {
//   const { children } = props;
//   // const textColor=useColorModeValue('gray.600', 'gray.200')
//   // const onHoverLink = useColorModeValue("gray.200", "gray.700");

//   const onHoverLink = "gray.700";
//   return (
//     <Box
//       py={1}
//       px={2}
//       justifyContent="space-between"
//       alignItems="center"
//       rounded={"md"}
//       textColor={"gray.200"}
//       _hover={{
//         textDecoration: "none",
//         bg: onHoverLink,
//       }}
//     >
//       <NavLink>{children.name}</NavLink>
//     </Box>
//   );
// };

// const DesktopNav = ({ props }) => {
//   // const linkColor = useColorModeValue('gray.600', 'gray.200')
//   // const linkHoverColor = useColorModeValue('gray.800', 'white')

//   return (
//     <Stack direction={"row"} spacing={4}>
//       {props.map((link) => (
//         <DesktopNavLinks key={link.name}>{link}</DesktopNavLinks>
//       ))}
//     </Stack>
//   );
// };

// const MobileNav = ({ props }) => {
//   const BackgroundColor = "gray.800";
//   return (
//     <Stack bg={BackgroundColor} p={4} display={{ md: "none" }}>
//       {props.map((link) => {
//         return <MobileNavLinks key={link.name}>{link}</MobileNavLinks>;
//       })}
//     </Stack>
//   );
// };
