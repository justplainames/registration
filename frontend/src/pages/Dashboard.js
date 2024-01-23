import React, { useState, useEffect } from "react";
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

function Dashboard() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/db.json"); // Assuming db.json is in the public folder
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SimpleGrid spacing={10} minChildWidth="300px">
      {events && events.events ? (
        events.events.map((event) => (
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
                  <Text>Year {event.event_date}</Text>
                </Box>
              </Flex>
            </CardHeader>
            <CardBody color="gray.500">
              <Text>{event.description}</Text>
            </CardBody>
            <Divider borderColor="gray.350" />
            <CardFooter textAlign="center">
              <Button w="300px" mx="auto">
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
