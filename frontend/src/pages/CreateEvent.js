import React, { useState, useEffect } from "react";
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
import axios from "axios";

export default function CreateEvent() {
  const [startDate, setStartDate] = useState(new Date());
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [judgeOptions, setJudgeOptions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [judgesByCategory, setJudgesByCategory] = useState({});
  const apiPath = "https://registartion-backend.fly.dev/";
  // const apiPath = "http://localhost:3000/";

  useEffect(() => {
    axios.get(`${apiPath}createEvent/getJudges`).then((response) => {
      setJudgeOptions(response.data);
    });

    axios.get(`${apiPath}createEvent/getCategories`).then((response) => {
      setCategoryOptions(response.data);
    });
  }, []);

  const handleCategoryChange = (selectedOptions) => {
    setJudgesByCategory((prev) => {
      const judgesByCategoryObj = { ...prev };

      // Update judgesByCategory object for each selected category
      selectedOptions.forEach((category) => {
        if (!judgesByCategoryObj[category.value.category_id_pk]) {
          judgesByCategoryObj[category.value.category_id_pk] = [];
        }
      });

      Object.keys(judgesByCategoryObj).forEach((categoryId) => {
        if (
          !selectedOptions.find(
            (category) => category.value.category_id_pk === categoryId
          )
        ) {
          delete judgesByCategoryObj[categoryId];
        }
      });

      return judgesByCategoryObj;
    });

    // Update the selected categories state
    setSelectedCategories(selectedOptions);
  };

  const handleJudgeChange = (selectedOptions, categoryId) => {
    setJudgesByCategory((prev) => {
      const updatedJudgesByCategory = { ...prev };

      if (updatedJudgesByCategory[categoryId] && selectedOptions.length === 0) {
        delete updatedJudgesByCategory[categoryId];
      } else {
        updatedJudgesByCategory[categoryId] = selectedOptions;
      }

      return updatedJudgesByCategory;
    });
  };

  return (
    <Box maxW="480px">
      <Form method="post" action="/createEvent">
        <input
          type="hidden"
          name="judges_by_categories"
          value={JSON.stringify(judgesByCategory)}
        />

        <FormControl mb="40px">
          <FormLabel>Event Name</FormLabel>
          <Input type="text" name="event_name" />
          <FormHelperText>Enter event name</FormHelperText>
        </FormControl>

        <FormControl mb="40px">
          <FormLabel>Event Location</FormLabel>
          <Input type="text" name="event_location" />
          <FormHelperText>Enter event location</FormHelperText>
        </FormControl>

        <FormControl mb="40px">
          <FormLabel>Event Descripton</FormLabel>
          <Input type="textarea" name="event_description" />
          <FormHelperText>Enter event description</FormHelperText>
        </FormControl>

        <FormControl mb="40px">
          <FormLabel>Event Date</FormLabel>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            name="event_date"
            dateFormat="dd/MM/yyyy"
          />
          <FormHelperText>Enter the event date</FormHelperText>
        </FormControl>

        <FormControl mb="40px" style={{ maxWidth: "none" }}>
          <FormLabel>Categories:</FormLabel>
          <Select
            options={categoryOptions}
            colorScheme="purple"
            focusBorderColor="purple.400"
            selectedOptionColorScheme="purple"
            isMulti
            name="categories"
            onChange={handleCategoryChange}
          />
        </FormControl>

        {selectedCategories.map((category) => (
          <FormControl
            key={category.value.category_id_pk}
            mb="40px"
            style={{ maxWidth: "none" }}
          >
            <FormLabel>{`Judges for ${category.value.category_name}:`}</FormLabel>
            <Select
              name="judges"
              options={judgeOptions}
              colorScheme="purple"
              focusBorderColor="purple.400"
              selectedOptionColorScheme="purple"
              isMulti
              onChange={(selectedOptions) =>
                handleJudgeChange(
                  selectedOptions,
                  category.value.category_id_pk
                )
              }
            />
          </FormControl>
        ))}

        <Button type="submit">Submit</Button>
      </Form>
    </Box>
  );
}

export const createEventAction = async ({ request }) => {
  const apiPath = "https://registartion-backend.fly.dev/";
  // const apiPath = "http://localhost:3000/";
  const data = await request.formData();

  const event = {
    event_name: data.get("event_name"),
    event_date: data.get("event_date"),
    event_description: data.get("event_description"),
    event_location: data.get("event_location"),
    event_information: data.get("judges_by_categories"),
  };

  axios
    .post(`${apiPath}createEvent/updateEvent`, event)
    .then((res) => console.log(res));

  return redirect("/");
};
