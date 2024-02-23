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
  useToast,
} from "@chakra-ui/react";
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

export default function Navbar() {
  const navigate = useNavigate();
  const toast = useToast();
  const { eventState } = useContext(EventContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const { roleState, setRoleState } = useContext(RoleContext);
  const [headingText, setHeadingText] = useState({});
  const apiPath = process.env.REACT_APP_API_PATH;

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
      duration: 5000,
      isClosable: true,
      status: "success",
      position: "top",
      icon: <IconLogout />,
    });
    navigate("/");
  };

  const toCreateEvent = () => {
    navigate("/createEvent");
  };

  useEffect(() => {
    setHeadingText(eventState);
  }, [eventState, authState]);

  return (
    <Flex mb="40px" as="nav" p="10px" alignItems="center">
      {authState ? (
        <>
          <Heading as="h1">Event Manager | {headingText.eventName}</Heading>
          <Spacer />
          <HStack spacing="20px">
            {roleState === "admin" && (
              <Button colorScheme="purple" onClick={toCreateEvent}>
                Create Event
              </Button>
            )}

            <Avatar bg="purple.500" name="Justplainames">
              <AvatarBadge w="1.3em" bg="teal.400">
                <Text fontSize="xs" color="white">
                  0
                </Text>
              </AvatarBadge>
            </Avatar>
            <Text>Justplainames</Text>
            <Button colorScheme="purple" onClick={showToast}>
              Logout
            </Button>
          </HStack>
        </>
      ) : (
        <Button colorScheme="purple" onClick={auth}>
          Login
        </Button>
      )}
    </Flex>
  );
}
