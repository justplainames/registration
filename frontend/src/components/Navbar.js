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

const links = [
  { name: "About Us", link: "aboutUs" },
  { name: "Features", link: "features" },
  { name: "How It Works", link: "howItWorks" },
];

export default function Navbar({ scrollToSection }) {
  const navigate = useNavigate();
  const toast = useToast();
  const { eventState } = useContext(EventContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const { roleState, setRoleState } = useContext(RoleContext);
  const [headingText, setHeadingText] = useState({});
  const apiPath = process.env.REACT_APP_API_PATH;
  const { isOpen, onToggle } = useDisclosure();

  // const showToast = async () => {
  //   console.log("entered here");
  //   await axios.get(`${apiPath}oauth/logout`).then((response) => {
  //     console.log("Logged Out");
  //   });
  //   setAuthState(null);
  //   // .catch((err) => {
  //   //   console.log("error = ", err);
  //   // });
  //   toast({
  //     title: "Logged Out",
  //     description: "Successfully logged out",
  //     duration: 5000,
  //     isClosable: true,
  //     status: "success",
  //     position: "top",
  //     icon: <IconLogout />,
  //   });
  //   navigate("/");
  // };

  const toCreateEvent = () => {
    navigate("/createEvent");
  };

  useEffect(() => {
    setHeadingText(eventState);
  }, [eventState, authState]);

  return (
    <Box>
      <Flex
        // bg={useColorModeValue("white", "gray.800")}
        bg={"gray.800"}
        // color={useColorModeValue("gray.600", "white")}
        color="white"
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        // borderColor={useColorModeValue("gray.200", "gray.900")}
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
            // color={useColorModeValue("gray.800", "white")}
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
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href={"#"}
            onClick={auth}
          >
            Sign In
          </Button>
          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"orange.400"}
            href={"#"}
            _hover={{
              bg: "orange.300",
            }}
            onClick={auth}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav props={links} />
      </Collapse>
      {/* {isOpen ? <MobileNav /> : null} */}
    </Box>
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

const MobileNavLinks = (props) => {
  const { children } = props;
  // const textColor=useColorModeValue('gray.600', 'gray.200')
  // const onHoverLink = useColorModeValue("gray.200", "gray.700");

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
  // const linkColor = useColorModeValue('gray.600', 'gray.200')
  // const linkHoverColor = useColorModeValue('gray.800', 'white')
  console.log("SCROLL to SECTION =", scrollToSection);
  console.log("PROPS = ", props);

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
  // const linkColor = useColorModeValue('gray.600', 'gray.200')
  // const linkHoverColor = useColorModeValue('gray.200', 'gray.700')
  const linkHoverColor = "gray.700";
  const linkColor = "gray.200";
  console.log("PROPS in DESKTOPNAVLINKS ", props);
  const { link, scrollToSection } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: linkHoverColor,
      }}
      onClick={() => scrollToSection(link.link)}
      //href={"#"}
    >
      <NavLink className="nav-link">{link.name}</NavLink>
    </Box>
  );
};

const MobileNav = ({ props }) => {
  // const BackgroundColor = useColorModeValue("white", "gray.800")
  const BackgroundColor = "gray.800";
  return (
    <Stack bg={BackgroundColor} p={4} display={{ md: "none" }}>
      {props.map((link) => {
        return <MobileNavLinks key={link.name}>{link}</MobileNavLinks>;
      })}
    </Stack>
  );
};

// const NavLink = (props) => {
//   const { children } = props;
//   console.log(children);

//   return (
//     <Box
//       as="a"
//       px={2}
//       py={1}
//       rounded={"md"}
//       _hover={{
//         textDecoration: "none",
//         bg: useColorModeValue("gray.200", "gray.700"),
//       }}
//       href={"#"}
//     >
//       {children}
//     </Box>
//   );
// };

// const NavLinks = (props) => {
//   const {children}
//   return (
//     <Box
//       as="a"
//       px={2}
//       py={1}
//       rounded={"md"}
//       _hover={{
//         textDecoration: "none",
//         bg: useColorModeValue("gray.200", "gray.700"),
//       }}
//       href={props.links}
//     >
//       {props.name}
//     </Box>
//   );
// };
