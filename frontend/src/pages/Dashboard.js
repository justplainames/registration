import React, { useState, useEffect } from "react";
import events from "./db.json";
import { IconClick } from "@tabler/icons-react";
import { Avatar, Divider, Icon } from "@chakra-ui/react";

import {
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
  HStack,
} from "@chakra-ui/react";

function Dashboard() {
  return (
    <SimpleGrid spacing={10} minChildWidth="300px">
      {events.events.map((event) => (
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
      ))}
    </SimpleGrid>
  );
}

export default Dashboard;
