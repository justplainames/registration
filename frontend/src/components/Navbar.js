import React from "react";
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
export default function Navbar() {
  const navigate = useNavigate();
  const toast = useToast();

  const showToast = () => {
    toast({
      title: "Logged Out",
      description: "Successfully logged out",
      duration: 5000,
      isClosable: true,
      status: "success",
      position: "top",
      icon: <IconLogout />,
    });
  };

  const toCreateEvent = () => {
    navigate("/createEvent");
  };

  return (
    <Flex mb="40px" as="nav" p="10px" alignItems="center">
      <Heading as="h1">Event Manager</Heading>
      <Spacer />

      <HStack spacing="20px">
        <Button colorScheme="purple" onClick={toCreateEvent}>
          Create Event
        </Button>
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
    </Flex>
  );
}
