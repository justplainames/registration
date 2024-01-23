import React from "react";
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

export default function AddParticipant() {
  return (
    <Box maxW="480px">
      <Form method="post" action="/addParticipant">
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

        <FormControl mb="40px" style={{ maxWidth: "none" }}>
          <FormLabel>Categories:</FormLabel>
          <CheckboxGroup>
            <Flex alignItems="center">
              <Flex alignItems="center" mr={4}>
                <Checkbox name="category_name" value="popping 1v1" size="lg" />
                <FormLabel ml={2} mb={0}>
                  Popping 1v1
                </FormLabel>
              </Flex>

              <Flex alignItems="center" mr={4}>
                <Checkbox name="category_name" value="locking 1v1" size="lg" />
                <FormLabel ml={2} mb={0}>
                  Locking 1v1
                </FormLabel>
              </Flex>
            </Flex>
          </CheckboxGroup>
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
    participant_instagram: data.get("participant_instagram"),
    participant_phone_number: data.get("participant_phone_number"),
    participant_category: data.getAll("category_name"),
  };

  console.log(participant);

  return redirect("/participants");
};
