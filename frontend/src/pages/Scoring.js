import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanels, Tabs, Box } from "@chakra-ui/react";
import ScoringTable from "../components/ScoringTable";
import { useContext } from "react";
import { EventContext } from "../helpers/EventContext";
import axios from "axios";

function Scoring() {
  const { eventState } = useContext(EventContext);
  const [listOfCategories, setListOfCategories] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [headers, setHeaders] = useState(null);
  const [listOfParticipants, setListOfParticipants] = useState(null);

  // const apiPath = "https://registartion-backend.fly.dev/";
  const apiPath = "http://localhost:3000/";
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
            console.log("Entered UseEffect-1 in Scoring Page (Second)");
            setHeaders([
              ...original,
              ...response.data[0].judges.map((item) => item.judge_name),
              "Total Score",
            ]);
            setListOfParticipants(response.data);
          });
      })
      .catch((error) => {
        console.error("Error making axios request:", error);
        // Handle the error as needed
      });
  }, []);

  const handleChange = (category) => {
    console.log("Handling Change");
    axios
      .get(`${apiPath}score/${eventState.eventId}/${category.category_id_pk}`)
      .then((response) => {
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
    <Tabs mt="40px" p="20px" colorScheme="purple" variant="enclosed">
      <TabList>
        {listOfCategories.map((category, index) => (
          <Tab
            key={index}
            _selected={{ bg: "purple.400", color: "white" }}
            value={category}
            onClick={() => {
              handleChange(category);
            }}
          >
            {category.category_name}
          </Tab>
        ))}
      </TabList>
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
