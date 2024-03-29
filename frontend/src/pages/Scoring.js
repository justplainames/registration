import React, { useEffect, useState } from "react";
import {
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Box,
  TabIndicator,
} from "@chakra-ui/react";
import ScoringTable from "../components/ScoringTable";
import { useContext } from "react";
import { EventContext } from "../helpers/EventContext";
import axios from "axios";

function Scoring() {
  const { eventState, setEventState } = useContext(EventContext);
  const [listOfCategories, setListOfCategories] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [headers, setHeaders] = useState(null);
  const [listOfParticipants, setListOfParticipants] = useState(null);

  const apiPath = process.env.REACT_APP_API_PATH;
  const original = ["Name", "Instagram Handle"];

  useEffect(() => {
    console.log("Entered UseEffect-1 in Scoring Page");
    axios
      .get(`${apiPath}addParticipant/getCategories/${eventState.eventId}`)
      .then((response) => {
        setListOfCategories(response.data);
        setCurrentCategory(response.data[0].category_id_pk);
        const first_data = response.data[0];
        axios
          .get(
            `${apiPath}score/${eventState.eventId}/${first_data.category_id_pk}`
          )
          .then((response) => {
            console.log(response);
            console.log("Entered UseEffect-1 in Scoring Page (Second)");
            setHeaders([
              ...original,
              ...response.data[0].judges.map((item) => item.judge_name),
              "Total Score",
            ]);
            console.log(
              "Entered UseEffect-1 in Scoring Page (Second) Headers Set"
            );
            setListOfParticipants(response.data);
          });
      })
      .catch((error) => {
        if (error.response.data.error === "Unauthorized") {
          window.location.href = "/";
        } else {
          console.error("Error making axios request:", error);
        }
      });
  }, []);

  const handleChange = (category) => {
    console.log("Handling Change");
    axios
      .get(`${apiPath}score/${eventState.eventId}/${category.category_id_pk}`)
      .then((response) => {
        console.log("Response after change", response.data);
        setCurrentCategory(category.category_id_pk);
        setHeaders([
          ...original,
          ...response.data[0].judges.map((item) => item.judge_name),
          "Total Score",
        ]);
        setListOfParticipants(response.data);
      });
  };

  // useEffect(() => {}, [listOfParticipants]);

  return listOfCategories &&
    listOfParticipants &&
    headers &&
    currentCategory ? (
    <Tabs
      p={3}
      // colorScheme="orange"
      variant="unstyled"
      defaultIndex={0}
      overflow="auto"
    >
      <TabList>
        {listOfCategories.map((category, index) => (
          <Tab
            key={index}
            textColor="gray.200"
            _selected={{ textColor: "white" }}
            value={category}
            onClick={() => {
              handleChange(category);
            }}
          >
            {category.category_name}
          </Tab>
        ))}
      </TabList>
      <TabIndicator
        mt="-1.5px"
        height="2px"
        bg="orange.400"
        borderRadius="1px"
      />
      <TabPanels>
        <TabPanels>
          {listOfParticipants && headers ? (
            <ScoringTable
              headers={headers}
              data={{
                currentCategory: currentCategory,
                listOfParticipants: listOfParticipants,
              }}
            />
          ) : (
            <Box>Loading</Box>
          )}
        </TabPanels>
      </TabPanels>
    </Tabs>
  ) : (
    <Box>MAIN LOAD</Box>
  );
}

export default Scoring;
