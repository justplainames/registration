import React, { useState, useEffect, useContext } from "react";
import { IconClick } from "@tabler/icons-react";
import {
  Avatar,
  Divider,
  Icon,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Card,
  Text,
  CardHeader,
  CardBody,
  CardFooter,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Checkbox,
  CheckboxGroup,
  Tooltip,
  FormControl,
  FormLabel,
  Image,
  Stack,
} from "@chakra-ui/react";
import { EventContext } from "../helpers/EventContext";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { RoleContext } from "../helpers/RoleContext";
axios.defaults.withCredentials = true;

function Dashboard() {
  const [events, setEvents] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);
  const { eventState, setEventState } = useContext(EventContext);
  const { roleState, setRoleState } = useContext(RoleContext);
  const [isTooltipOpen, setIsTooltipOpen] = useState({});
  const [categories, setCategories] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const apiPath = process.env.REACT_APP_API_PATH;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  console.log("Dashboard rendered");

  const handleClick = async (event_name, event_id) => {
    console.log("EVENT = ", event_id);
    axios.get(`${apiPath}addParticipant/joinEvent/getRole`).then((response) => {
      setEventState({ eventName: event_name, eventId: event_id });
      console.log("response.data", response.data);
      if (response.data.role === "user") {
        axios
          .get(`${apiPath}addParticipant/getCategories/${event_id}`)
          .then((response) => {
            setCategories(response.data);
            console.log("Response from getting categories = ", response.data);
          });
        onOpen();
      } else {
        navigate(`/eventInfo`);
      }
    });
  };

  // Not neccesary to use when using checkbox group!
  // const handleCheckboxChange = (event) => {
  //   console.log(selectedCategories);
  //   setSelectedCategories((prev) => {
  //     const category_id = event.target.value;
  //     const current = [...prev];
  //     if (current.includes(category_id)) {
  //       const index = current.indexOf(category_id);
  //       current.splice(index, 1);
  //     } else {
  //       current.push(category_id);
  //     }
  //     return current;
  //   });
  // };

  useEffect(() => {
    console.log("Use efect [categories] - dashboard");
    if (categories) {
      const data = {};
      categories.forEach((category) => {
        if (category.joined) {
          data[category.category_id_pk] = false;
        }
      });
      setIsTooltipOpen(data);
    }
  }, [categories]);

  useEffect(() => {
    console.log("Use efect [] - dashboard");
    setAuthState(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiPath}dashboard/getEvents`);
        setEvents(response.data);

        axios
          .get(`${apiPath}addParticipant/joinEvent/getRole`)
          .then((response) => {
            setRoleState(response.data);
            console.log("role has been set");
          });
      } catch (error) {
        console.error("Error making axios request:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    axios.post(`${apiPath}addParticipant/${eventState.eventId}`, {
      user_categories: selectedCategories,
    });
    handleOnClose();
  };

  const handleOnClose = () => {
    setSelectedCategories([]);
    onClose();
  };

  if (!authState) {
    return <div>Loading...</div>;
  }

  return (
    <SimpleGrid spacing={10} minChildWidth="300px" p={3}>
      <Modal isOpen={isOpen} onClose={handleOnClose} m="40px">
        <ModalOverlay />

        <ModalContent
          maxW={"700px"}
          w={"full"}
          bg="gray.900"
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
        >
          <ModalHeader textColor="white" fontSize={"2xl"} fontFamily={"body"}>
            Event Registration
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"} color="gray.400" px={3}>
            {/* <CheckboxGroup colorScheme="purple">
                  <Stack spacing={[4, 1]} direction={["column", "row"]}>
                    {toChoose.data.map((row, index) => (
                      <Checkbox
                        checked={checkedState[index]}
                        onChange={() => handleCheckboxChange(index)}
                      >
                        {row["User.user_name"]}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup> */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at
            mattis dui. Aenean vestibulum rutrum dictum. Donec efficitur enim
            aliquam ligula blandit scelerisque. Mauris maximus elit vitae augue
            pretium, eget placerat augue ultrices. Aenean pretium, odio sed
            volutpat dapibus, nisl sem scelerisque ex, quis semper ex enim vitae
            tellus. Quisque consectetur, lacus vel ultricies laoreet, neque
            neque dictum ante, ac dapibus purus velit sed lorem. In dapibus
            consequat purus, nec molestie tortor commodo vitae. Cras efficitur
            viverra dolor, id vehicula nisl dictum ut. Mauris pellentesque erat
            in ante lobortis feugiat. Nam commodo vulputate nisl id aliquam.
            Donec mattis mauris vitae ornare egestas. Quisque dui erat,
            elementum nec aliquam placerat, posuere nec justo. Nam fringilla
            tincidunt ante vel mollis. Nunc pharetra ex ut auctor molestie. Cras
          </ModalBody>
          <FormControl mt="2%" textAlign="left">
            <FormLabel textColor="rgb(237,137,51)">Categories: </FormLabel>
            <CheckboxGroup
              onChange={(values) => {
                setSelectedCategories(values); // Update selectedCategories state
              }}
              value={selectedCategories}
            >
              {categories ? (
                categories.map((category) => (
                  <Box mt="2%">
                    {category.joined ? (
                      <Tooltip
                        key={`${category.category_id}_${category.category_id_pk}`}
                        label="You have already joined"
                        aria-label="A tooltip"
                        isOpen={isTooltipOpen[category.category_id_pk]}
                      >
                        <Checkbox
                          textColor="white"
                          control={{ bg: "red" }}
                          disabled={true}
                          title="hello"
                          key={`${category.category_id}_${category.category_id_pk}`}
                          value={String(category.category_id_pk)} // Set value to category ID
                          onMouseEnter={() =>
                            setIsTooltipOpen((prev) => {
                              const old = { ...prev };
                              old[category.category_id_pk] = true;
                              return old;
                            })
                          }
                          onMouseLeave={() =>
                            setIsTooltipOpen((prev) => {
                              const old = { ...prev };
                              old[category.category_id_pk] = false;
                              return old;
                            })
                          }
                        >
                          {category.category_name}{" "}
                          {/* Display category name as label */}
                        </Checkbox>
                      </Tooltip>
                    ) : (
                      <Checkbox
                        textColor="white"
                        title="hello"
                        key={`${category.category_id}_${category.category_id_pk}`}
                        value={String(category.category_id_pk)} // Set value to category ID
                      >
                        {category.category_name}
                      </Checkbox>
                    )}
                  </Box>
                ))
              ) : (
                <Box>Loading</Box>
              )}
            </CheckboxGroup>
          </FormControl>

          <ModalFooter>
            <Stack mt={8} direction={"row"} spacing={4}>
              <Button
                flex={1}
                fontSize={"sm"}
                _focus={{
                  bg: "gray.200",
                }}
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                flex={1}
                fontSize={"sm"}
                outlineColor="rgb(237,137,51)"
                textColor="white"
                bg="transparent"
                _hover={{
                  bg: "rgb(237,137,51)",
                  textColor: "gray.900",
                }}
                onClick={handleSubmit}
              >
                Yes!
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {events ? (
        events.map((event) => (
          <Card
            key={event.id}
            // borderColor="purple.400"
            // bg={useColorModeValue("white", "gray.900")}
            bg="gray.900"
            boxShadow={"2xl"}
            rounded={"md"}
          >
            <CardHeader h={"300px"}>
              <Image
                src={
                  "https://images.unsplash.com/photo-1611435263641-4656c4b188c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGFuY2UlMjBiYXR0bGV8ZW58MHx8MHx8fDA%3D"
                }
                alt="Example"
                w="100%"
                h="100%"
                objectFit="fit"
              />
            </CardHeader>
            <CardBody color="gray.500" overflow={"hidden"} maxH={"200px"}>
              <Text
                color={"orange.400"}
                textTransform={"uppercase"}
                fontWeight={800}
                fontSize={"sm"}
                letterSpacing={1.1}
              >
                Jam
              </Text>
              <Heading
                // color={useColorModeValue("gray.700", "white")}
                color="white"
                fontSize={"2xl"}
                fontFamily={"body"}
              >
                {event.event_name}
              </Heading>
              <Text color={"gray.500"}>{event.event_description}</Text>

              {/* <Text>{event.event_description}</Text> */}
            </CardBody>
            <Divider borderColor="gray.500" />
            <CardFooter textAlign="center" align={"center"}>
              <Button
                mt={2}
                w={"full"}
                bg={"orange.400"}
                color={"white"}
                rounded={"xl"}
                boxShadow={"0 5px 20px 0px rgb(255 167 38 / 43%)"}
                _hover={{
                  bg: "orange.500",
                }}
                _focus={{
                  bg: "orange.500",
                }}
                onClick={() => handleClick(event.event_name, event.event_id_pk)}
              >
                <Icon as={IconClick} />
                Select
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <Heading>No Event Available</Heading>
      )}
    </SimpleGrid>
  );
}

export default Dashboard;
