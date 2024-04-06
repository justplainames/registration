import React, { useContext, useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import "../styles/styles.css"; // Import the CSS file
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { IconLogout } from "@tabler/icons-react";
import { EventContext } from "../helpers/EventContext";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";
import { RoleContext } from "../helpers/RoleContext";
const apiPath = process.env.REACT_APP_API_PATH;

export default function NavbarAuth({ isOpen, toggleNavbar }) {
  const navigate = useNavigate();
  const toast = useToast();
  const { eventState } = useContext(EventContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const { roleState, setRoleState } = useContext(RoleContext);
  const [headingText, setHeadingText] = useState({});
  const apiPath = process.env.REACT_APP_API_PATH;

  const showToast = async () => {
    await axios.get(`${apiPath}oauth/logout`).then((response) => {});
    setAuthState({ isAuthenticated: false });
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
    setHeadingText(eventState);
  }, [eventState, authState]);
  const backgroundColor = "gray.800";
  return (
    <Flex
      height="20"
      alignItems="center"
      bg={backgroundColor}
      borderBottomWidth="1px"
      borderBottomColor="gray.600"
      justifyContent={{ base: "space-between", md: "flex-end" }}
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
