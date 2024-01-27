import React, { useEffect, useContext, useState } from "react";
import {
  Button,
  Spacer,
  Tab,
  TabList,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import ScoringTable from "../components/ScoringTable";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EventContext } from "../helpers/EventContext";

const headers = ["Name", "Instagram Handle", "Phone Number", "Email", "Paid"];
const data = [
  ["John Doe", "@JohnDoe", "Popping 1v1"],
  ["Jane Smith", "@JaneSmith", "Locking 1v1"],
];

function Participants() {
  const { eventState } = useContext(EventContext);
  const [listOfCategories, setListOfCategories] = useState([]);
  const [selectedCategory, setSelectedCategories] = useState(0);
  const [listOfParticipants, setListOfParticipants] = useState([]);
  const navigate = useNavigate();

  const AddParticipant = () => {
    navigate("/addParticipant");
  };

  const handleChange = (category) => {
    axios
      .get(
        `https://registartion-backend.fly.dev/getParticipants/${eventState.eventId}/${category.category_id_pk}`
      )
      // .get(`http://localhost:3000/addParticipant/getParticipants/${eventState.eventId}/${category.category_id_pk}`)
      .then((res) => {
        setListOfParticipants(res.data);
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://registartion-backend.fly.dev/getParticipants/${eventState.eventId}`
      )
      // .get(
      //   `http://localhost:3000/addParticipant/getCategories/${eventState.eventId}`
      // )
      .then((res) => {
        setListOfCategories(res.data);
        const first_data = res.data[0];
        setSelectedCategories(first_data);
        axios
          .get(
            `https://registartion-backend.fly.dev/getParticipants/${eventState.eventId}/${first_data.category_id_pk}`
          )
          // .get(
          //   `http://localhost:3000/addParticipant/getParticipants/${eventState.eventId}/${first_data.category_id_pk}`
          // )
          .then((res) => {
            setListOfParticipants(res.data);
          });
      });
  }, []);

  useEffect(() => {}, [eventState]);

  return (
    <Tabs
      mt="40px"
      p="20px"
      colorScheme="purple"
      variant="enclosed"
      defaultIndex={0}
    >
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
        <Spacer />
        <Button
          roundedBottom="none"
          colorScheme="purple"
          px="40px"
          mr="1px"
          onClick={AddParticipant}
        >
          Add Participant
        </Button>
      </TabList>
      <TabPanels>
        <TabPanels>
          <ScoringTable headers={headers} data={listOfParticipants} />
        </TabPanels>
      </TabPanels>
    </Tabs>
  );
}

export default Participants;
