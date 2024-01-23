import React, { useState } from "react";
import { Form, redirect } from "react-router-dom";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select } from "chakra-react-select";

export default function CreateEvent() {
  const options = [
    { value: "popping 1v1", label: "Popping 1v1" },
    { value: "locking 1v1", label: "Locking 1v1" },
    { value: "hiphop 1v1", label: "HipHop 1v1" },
  ];
  const [startDate, setStartDate] = useState(new Date());

  return (
    <Box maxW="480px">
      <Form method="post" action="/createEvent">
        <FormControl mb="40px">
          <FormLabel>Event Name</FormLabel>
          <Input type="text" name="event_name" />
          <FormHelperText>Enter event name</FormHelperText>
        </FormControl>

        <FormControl mb="40px">
          <FormLabel>Event Date</FormLabel>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            name="event_date"
          />
          <FormHelperText>Enter the event date</FormHelperText>
        </FormControl>

        <FormControl mb="40px" style={{ maxWidth: "none" }}>
          <FormLabel>Categories:</FormLabel>
          <Select
            options={options}
            colorScheme="purple"
            focusBorderColor="purple.400"
            selectedOptionColorScheme="purple"
            isMulti
            name="categories"
          />
        </FormControl>

        <Button type="submit"> Submit </Button>
      </Form>
    </Box>
  );
}

export const createEventAction = async ({ request }) => {
  const data = await request.formData();

  const event = {
    event_name: data.get("event_name"),
    event_date: data.get("event_date"),
    categories: data.getAll("categories"),
  };

  console.log(event);

  return redirect("/");
};
