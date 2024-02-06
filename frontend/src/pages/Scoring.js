import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import ScoringTable from "../components/ScoringTable";
import { useContext } from "react";
import { EventContext } from "../helpers/EventContext";
import axios from "axios";

function Scoring() {
  const { eventState } = useContext(EventContext);
  const [listOfCategories, setListOfCategories] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [listOfParticipants, setListOfParticipants] = useState([]);
  const apiPath = "https://registartion-backend.fly.dev/";
  // const apiPath = "http://localhost:3000/";
  const original = ["Name", "Instagram Handle"];

  const handleChange = (category) => {
    axios
      .get(`${apiPath}${eventState.eventId}/${category.category_id_pk}`)

      .then((response) => {
        setHeaders([
          ...original,
          ...response.data[0].judges.map((item) => item.judge_name),
        ]);
        setListOfParticipants(response.data);
      });
  };

  useEffect(() => {
    axios
      .get(`${apiPath}addParticipant/getCategories/${eventState.eventId}`)
      .then((response) => {
        setListOfCategories(response.data);
        const first_data = response.data[0];
        axios
          .get(
            `http://localhost:3000/score/${eventState.eventId}/${first_data.category_id_pk}`
          )
          .then((response) => {
            console.log(response.data);
            setHeaders([
              ...original,
              ...response.data[0].judges.map((item) => item.judge_name),
            ]);

            setListOfParticipants(response.data);
          });
      })
      .catch((error) => {
        console.error("Error making axios request:", error);
        // Handle the error as needed
      });
  }, []);

  useEffect(() => {}, [eventState]);

  return (
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
          <ScoringTable headers={headers} data={listOfParticipants} />
        </TabPanels>
      </TabPanels>
    </Tabs>
  );
}

export default Scoring;
