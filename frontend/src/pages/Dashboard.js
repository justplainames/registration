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
} from "@chakra-ui/react";
import { EventContext } from "../helpers/EventContext";
import axios from "axios";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const { eventState, setEventState } = useContext(EventContext);
  const apiPath = process.env.REACT_APP_API_PATH;

  const handleClick = (event_name, event_id) => {
    setEventState({ eventName: event_name, eventId: event_id });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get(`${apiPath}getEvents`).then((res) => {
          setEvents(res.data);
        });
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {}, [eventState]);

  return (
    <SimpleGrid spacing={10} minChildWidth="300px">
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
