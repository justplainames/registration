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
} from "@chakra-ui/react";
import { EventContext } from "../helpers/EventContext";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

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
  console.log("ENTERED DASHBOARD");

  const handleClick = async (event_name, event_id) => {
    console.log("EVENT = ", event_id);
    axios.get(`${apiPath}addParticipant/joinEvent/getRole`).then((response) => {
      if (response.data.role === "user") {
        axios
          .get(`${apiPath}addParticipant/getCategories/${event_id}`)
          .then((response) => {
            setCategories(response.data);
            console.log("Response from getting categories = ", response.data);
          });
        onOpen();
      }
    });

    setEventState({ eventName: event_name, eventId: event_id });
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
    setAuthState(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiPath}dashboard/getEvents`);
        setEvents(response.data);

        axios
          .get(`${apiPath}addParticipant/joinEvent/getRole`)
          .then((response) => {
            setRoleState(response.data.role);
          });
      } catch (error) {
        console.error("Error making axios request:", error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {}, [eventState]);

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
    <SimpleGrid spacing={10} minChildWidth="300px">
      <Modal isOpen={isOpen} onClose={handleOnClose} m="40px">
        <ModalOverlay />

        <ModalContent>
          <ModalHeader m="40px">{authState}</ModalHeader>
          <ModalCloseButton />
          <ModalBody m="40px">
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
          <FormControl m="40px">
            <FormLabel>Categories: </FormLabel>
            <CheckboxGroup
              colorScheme="purple"
              onChange={(values) => {
                setSelectedCategories(values); // Update selectedCategories state
              }}
              value={selectedCategories}
            >
              {categories ? (
                categories.map((category) => (
                  <Box m="20px">
                    {category.joined ? (
                      <Tooltip
                        key={`${category.category_id}_${category.category_id_pk}`}
                        label="You have already joined"
                        aria-label="A tooltip"
                        isOpen={isTooltipOpen[category.category_id_pk]}
                      >
                        <Checkbox
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
            <Button colorScheme="purple" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="outline"
              colorScheme="purple"
              onClick={handleSubmit}
            >
              Yes!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {events ? (
        events.map((event) => (
          <Card
            key={event.id}
            borderTop="8px"
            borderColor="purple.400"
            bg="white"
          >
            <CardHeader>
              <Flex gap={5}>
                <Avatar src={event.img} />
                <Box>
                  <Heading as="h3" size="sm">
                    {event.event_name}
                  </Heading>
                  <Text>{event.event_date}</Text>
                </Box>
              </Flex>
            </CardHeader>
            <CardBody color="gray.500">
              <Text>{event.event_description}</Text>
            </CardBody>
            <Divider borderColor="gray.350" />
            <CardFooter textAlign="center">
              <Button
                w="300px"
                mx="auto"
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
