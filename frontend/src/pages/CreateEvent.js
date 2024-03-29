import React, { useState, useEffect, useContext } from "react";
import { Form, redirect } from "react-router-dom";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Button,
  Heading,
  Flex,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select } from "chakra-react-select";
import axios from "axios";
import { EventContext } from "../helpers/EventContext";

export default function CreateEvent() {
  const [startDate, setStartDate] = useState(new Date());
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [judgeOptions, setJudgeOptions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [judgesByCategory, setJudgesByCategory] = useState({});
  const apiPath = process.env.REACT_APP_API_PATH;
  const { eventState, setEventState } = useContext(EventContext);

  useEffect(() => {
    axios.get(`${apiPath}createEvent/getJudges`).then((response) => {
      setJudgeOptions(response.data);
    });

    axios
      .get(`${apiPath}createEvent/getCategories`)
      .then((response) => {
        setCategoryOptions(response.data);
      })
      .catch((error) => {
        if (error.response.data.error === "Unauthorized") {
          window.location.href = "/";
        } else {
          console.error("Error making axios request:", error);
        }
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

  const chakraStyles = {
    control: (provided, state) => ({
      ...provided,
      // borderWidth: "10px",
      // borderColor: "rgb(237,137,51)",
      borderWidth: "1px",
      "& > div > span > span": {
        paddingY: "1px",
      },
      "& > div > span > div > svg > path": {
        fill: "gray.900",
      },
      textColor: "white",
      // _hover: { borderColor: "rgb(237,137,51)" },
      _focusVisible: {
        borderColor: "rgb(237,137,51)",
        borderWidth: "2px",
        outline: "none", // Remove default focus outline
      },
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      background: "transparent",
    }),
    crossIcon: (provided, state) => ({
      ...provided,
      textColor: "white",
    }),
    menuList: (provided, state) => ({
      ...provided,
      background: "gray.900",
      textColor: "white",
    }),
    multiValue: (provided, state) => ({
      ...provided,
      background: "rgb(237,137,51)",
      textColor: "gray.900",
    }),
    option: (provided, state) => ({
      ...provided,
      background: "gray.900",
      _hover: { background: "rgb(237,137,51)", textColor: "gray.900" },
    }),
    // input: (provided, state) => ({
    //   ...provided,
    //   background: "red",
    //   padding: "2px",
    // }),
  };

  return (
    <Box p={4}>
      <Heading
        textColor="white"
        textAlign={"center"}
        fontWeight="normal"
        mb="2%"
        w="100%"
      >
        Create Event
      </Heading>

      <Form method="post" action="/createEvent">
        <input
          type="hidden"
          name="judges_by_categories"
          value={JSON.stringify(judgesByCategory)}
        />
        <Flex>
          <FormControl textColor="white" mr="5%">
            <FormLabel fontWeight={"normal"}>Event Name</FormLabel>
            <Input
              focusBorderColor="orange.400"
              textColor="white"
              type="text"
              name="event_name"
            />
            <FormHelperText>Enter event name</FormHelperText>
          </FormControl>

          <FormControl textColor="white">
            <FormLabel>Event Location</FormLabel>
            <Input
              textColor="white"
              focusBorderColor="orange.400"
              type="text"
              name="event_location"
            />
            <FormHelperText>Enter event location</FormHelperText>
          </FormControl>
        </Flex>
        <FormControl textColor="white" mt="2%">
          <FormLabel>Event Descripton</FormLabel>
          <Input
            textColor="white"
            focusBorderColor="orange.400"
            type="textarea"
            name="event_description"
          />
          <FormHelperText>Enter event description</FormHelperText>
        </FormControl>

        <FormControl textColor="white" mt="2%">
          <FormLabel>Event Date</FormLabel>
          <DatePicker
            colorScheme="orange"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            name="event_date"
            dateFormat="dd/MM/yyyy"
            dayStyle={{ color: "green" }}
            calendarStyles={{ color: "red" }}
          />
          <FormHelperText>Enter the event date</FormHelperText>
        </FormControl>

        <FormControl textColor="white" mt="2%">
          <FormLabel>Categories:</FormLabel>
          <Select
            chakraStyles={chakraStyles}
            options={categoryOptions}
            selectedOptionColorScheme="orange"
            focusBorderColor="orange.400"
            selectedOptionStyle="color"
            isMulti
            name="categories"
            onChange={handleCategoryChange}
          />
        </FormControl>

        {selectedCategories.map((category) => (
          <FormControl
            key={category.value.category_id_pk}
            textColor="white"
            mt="2%"
            style={{ maxWidth: "none" }}
          >
            <FormLabel>{`Judges for ${category.value.category_name}:`}</FormLabel>
            <Select
              name="judges"
              options={judgeOptions}
              colorScheme="orange"
              focusBorderColor="orange.400"
              selectedOptionColorScheme="orange"
              isMulti
              chakraStyles={chakraStyles}
              onChange={(selectedOptions) =>
                handleJudgeChange(
                  selectedOptions,
                  category.value.category_id_pk
                )
              }
            />
          </FormControl>
        ))}

        <Button
          mt="2%"
          bg="rgb(237,137,51)"
          textColor="gray.900"
          _hover={{
            textDecoration: "none",
            bg: "rgb(213,123,45)",
          }}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </Box>
  );
}

export const createEventAction = async ({ request }) => {
  const apiPath = process.env.REACT_APP_API_PATH;
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
