// External Libraries
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

// Icons
import { IconClick } from "@tabler/icons-react";

// Chakra UI Components
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";

// Additional Contexts
import { EventContext } from "../helpers/EventContext";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const { setEventState } = useContext(EventContext);
  const { user, getAccessTokenSilently } = useAuth0();
  const [isTooltipOpen, setIsTooltipOpen] = useState({});
  const [categories, setCategories] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const apiPath = process.env.REACT_APP_API_PATH;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  // // Fetch role of the user when the component mount
  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessTokenSilently();
      try {
        const response = await axios.get(`${apiPath}/dashboard/getEvents`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Error making axios request:", error);
      }
    };

    fetchData();
  }, []);

  // Handle Select Event
  // Calls API to retrieve event information
  const handleSelectEvent = async (event_name, event_id) => {
    try {
      const token = await getAccessTokenSilently();
      setEventState(event_id);
      sessionStorage.setItem("eventName", event_name);
      sessionStorage.setItem("eventId", event_id);
      if (user["http://localhost:3000/roles"][0] === "user") {
        axios
          .get(
            `${apiPath}/addParticipant/getCategories/${sessionStorage.getItem(
              "eventId"
            )}`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((response) => {
            setCategories(response.data);
          });
        onOpen();
      } else {
        navigate(`/eventInfo`);
      }
    } catch (error) {
      console.error("Error in handleSelectEvent in page (Dashboard):", error);
    }
  };

  const handleJoinSubmit = async () => {
    const token = await getAccessTokenSilently();
    try {
      axios.post(
        `${apiPath}/addParticipant/${sessionStorage.getItem("eventId")}`,
        {
          user_categories: selectedCategories,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error in handleJoinSubmit in page (Dashboard)", error);
    }

    handleOnClose();
  };

  const handleOnClose = () => {
    setSelectedCategories([]);
    onClose();
  };

  return (
    <SimpleGrid spacing={10} minChildWidth="300px" p={3} justifyItems="center">
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
                          {category.category_name}
                        </Checkbox>
                      </Tooltip>
                    ) : (
                      <Checkbox
                        textColor="white"
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
                onClick={handleJoinSubmit}
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
            key={event.event_id_pk}
            bg="gray.900"
            boxShadow="2xl"
            rounded="md"
            maxW="380px"
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
              <Heading color="white" fontSize={"2xl"} fontFamily={"body"}>
                {event.event_name}
              </Heading>
              <Text color={"gray.500"}>{event.event_description}</Text>
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
                onClick={() =>
                  handleSelectEvent(event.event_name, event.event_id_pk)
                }
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
