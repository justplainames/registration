import React, { useContext, useState, useEffect } from "react";
import { Form, redirect } from "react-router-dom";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Checkbox,
  Flex,
  Button,
  CheckboxGroup,
} from "@chakra-ui/react";
import { EventContext } from "../helpers/EventContext";
import axios from "axios";

export default function AddParticipant() {
  const { eventState } = useContext(EventContext);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://registartion-backend.fly.dev/addParticipant/getCategories/${eventState.eventId}`
      )
      // .get(
      //   `http://localhost:3000/addParticipant/getCategories/${eventState.eventId}`
      // )
      .then((response) => {
        setCategoryOptions(response.data);
      })
      .catch((error) => {
        console.error("Error making axios request:", error);
        // Handle the error as needed
      });
  }, []);

  useEffect(() => {}, [eventState]);

  const handleCheckboxChange = (event) => {
    console.log(event.target.name);
    const categoryId = parseInt(event.target.name);
    console.log(categoryId);
    setSelectedCategories((prev) => {
      const current = [...prev];
      if (current.includes(categoryId)) {
        current.splice(categoryId, 1);
      } else {
        current.push(categoryId);
      }
      return current;
    });
    console.log(selectedCategories);
  };

  const handlePaid = () => {
    if (!paid) {
      setPaid(true);
    } else {
      setPaid(false);
    }
  };

  return (
    <Box maxW="480px">
      <Form method="post" action="/addParticipant">
        <Input type="hidden" name="event_id_pk" value={eventState.eventId} />

        <input
          type="hidden"
          name="selected_categories"
          value={JSON.stringify(selectedCategories)}
        />

        <input type="hidden" name="participant_paid" value={paid} />

        <FormControl mb="40px">
          <FormLabel>Participant Name</FormLabel>
          <Input type="text" name="participant_name" />
          <FormHelperText>Enter participant name</FormHelperText>
        </FormControl>

        <FormControl mb="40px">
          <FormLabel>Participant Instagram</FormLabel>
          <Input type="text" name="participant_instagram" />
          <FormHelperText>Enter the participant's Instagram</FormHelperText>
        </FormControl>

        <FormControl mb="40px">
          <FormLabel>Phone Number</FormLabel>
          <Input type="text" name="participant_phone_number" />
          <FormHelperText>Enter the participant's Phone Number</FormHelperText>
        </FormControl>

        <FormControl mb="40px">
          <FormLabel>Participant Email</FormLabel>
          <Input type="text" name="participant_email" />
          <FormHelperText>Enter participant email</FormHelperText>
        </FormControl>

        <FormControl mb="40px" style={{ maxWidth: "none" }}>
          <FormLabel>Categories:</FormLabel>
          <CheckboxGroup name="test">
            <Flex alignItems="center">
              {categoryOptions.map((category) => (
                <Flex alignItems="center" mr={4}>
                  <Checkbox
                    name={category.category_id_pk}
                    size="lg"
                    onChange={(event) => {
                      handleCheckboxChange(event);
                    }}
                  />
                  <FormLabel ml={2} mb={0}>
                    {category.category_name}
                  </FormLabel>
                </Flex>
              ))}
            </Flex>
          </CheckboxGroup>
        </FormControl>

        <FormControl mb="40px" style={{ maxWidth: "none" }}>
          <Flex alignItems="center" mr={4}>
            <Checkbox
              name="participant_paid"
              size="lg"
              onChange={() => {
                handlePaid();
              }}
            />
            <FormLabel ml={2} mb={0}>
              Has the participant paid?
            </FormLabel>
          </Flex>
        </FormControl>
        <Button type="submit"> Submit </Button>
      </Form>
    </Box>
  );
}

export const addParticipantAction = async ({ request }) => {
  const data = await request.formData();

  const participant = {
    participant_name: data.get("participant_name"),
    participant_email: data.get("participant_email"),
    participant_instagram: data.get("participant_instagram"),
    participant_phone_number: data.get("participant_phone_number"),
    participant_categories: JSON.parse(data.get("selected_categories")),
    participant_paid: JSON.parse(data.get("participant_paid")),
  };

  console.log(participant);

  axios
    .post(
      `https://registartion-backend.fly.dev/addParticipant/${data.get(
        "event_id_pk"
      )}`,
      // `http://localhost:3000/addParticipant/${data.get("event_id_pk")}`,
      participant
    )
    .catch((error) => {
      console.error("Error making axios request:", error);
      // Handle the error as needed
    });
  return redirect("/participants");
};
