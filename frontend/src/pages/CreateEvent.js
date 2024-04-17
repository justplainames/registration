// External Libraries
import React, { useState, useEffect, useContext } from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

// Chakra UI Components
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Flex,
} from "@chakra-ui/react";

// Additional Components
import DatePicker from "react-datepicker";
import { Select } from "chakra-react-select";

// Custom Themes
import { chakraSelectStyles } from "../customThemes/ChakraStyles";

// External CSS
import "react-datepicker/dist/react-datepicker.css";

export default function CreateEvent() {
  const { getAccessTokenSilently } = useAuth0();
  const [startDate, setStartDate] = useState(new Date());
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [judgeOptions, setJudgeOptions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [judgesByCategory, setJudgesByCategory] = useState({});
  const apiPath = process.env.REACT_APP_API_PATH;
  const navigate = useNavigate();

  // Get list of available judges and categories to use for event creation when component mount
  useEffect(() => {
    const func = async () => {
      const token = await getAccessTokenSilently();
      axios
        .get(`${apiPath}/createEvent/getJudges`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setJudgeOptions(response.data);
        })
        .catch((error) => {
          console.error("Error Fetching Judges", error);
        });

      axios
        .get(`${apiPath}/createEvent/getCategories`, {
          headers: { Authorization: `Bearer ${token}` },
        })
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
    };
    func();
  }, []);

  // handle select components to display selection of judges when categories are modified.
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

  // handle the state for selected judges.
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

  const handleSubmit = async (event, navigate) => {
    event.preventDefault();
    const token = await getAccessTokenSilently();
    const formData = new FormData(event.target);

    // Call the action with required parameters
    createEventAction({ formData, token, navigate });
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

      <Form method="post" onSubmit={(event) => handleSubmit(event, navigate)}>
        <input
          type="hidden"
          name="judges_by_categories"
          value={JSON.stringify(judgesByCategory)}
          isRequired
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
            chakraStyles={chakraSelectStyles}
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
              chakraStyles={chakraSelectStyles}
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

export const createEventAction = async ({ formData, token, navigate }) => {
  const apiPath = process.env.REACT_APP_API_PATH;
  const data = formData;
  const event = {
    event_name: data.get("event_name"),
    event_date: data.get("event_date"),
    event_description: data.get("event_description"),
    event_location: data.get("event_location"),
    event_information: data.get("judges_by_categories"),
  };

  axios
    .post(`${apiPath}/createEvent/updateEvent`, event, {
      headers: { Authorization: `Bearer ${token}` },
    })

    .catch((error) => {
      console.error("Unable to create event: ", error);
    });
  return navigate("/dashboard");
};
