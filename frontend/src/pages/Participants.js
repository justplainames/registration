import React, { useEffect, useContext, useState } from "react";
import {
  Button,
  Spacer,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  TabIndicator,
} from "@chakra-ui/react";
import ParticipantTable from "../components/PartcipantTable";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EventContext } from "../helpers/EventContext";
import { participantContext } from "../helpers/ParticipantContext";

const headers = [
  "Order",
  "Name",
  "Instagram Handle",
  "Phone Number",
  "Email",
  "Paid",
  "Arrived?",
];
const data = [
  ["John Doe", "@JohnDoe", "Popping 1v1"],
  ["Jane Smith", "@JaneSmith", "Locking 1v1"],
];

function Participants() {
  const { eventState } = useContext(EventContext);
  const [listOfCategories, setListOfCategories] = useState([]);
  const [listOfParticipants, setListOfParticipants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isGeneratingNumber, setIsGeneratingNumber] = useState(false);
  const [isUpdatingDatabase, setIsUpdatingDatabase] = useState(false);
  const apiPath = process.env.REACT_APP_API_PATH;
  const navigate = useNavigate();
  console.log("Entering Participants Now");

  useEffect(() => {
    console.log("EVENT STATE = ", eventState);
    axios
      .get(`${apiPath}addParticipant/getCategories/${eventState.eventId}`)
      .then((res) => {
        setListOfCategories(res.data);
        const first_data = res.data[0];
        axios
          .get(
            `${apiPath}addParticipant/getParticipants/${eventState.eventId}/${first_data.category_id_pk}`
          )
          .then((res) => {
            console.log("ENTER RES");
            setSelectedCategory(first_data.category_id_pk);
            setListOfParticipants(res.data);
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

  const AddParticipant = () => {
    navigate("/addParticipant");
  };

  const handleChange = (category) => {
    axios
      .get(
        `${apiPath}addParticipant/getParticipants/${eventState.eventId}/${category.category_id_pk}`
      )

      .then((res) => {
        setSelectedCategory(category.category_id_pk);
        setListOfParticipants(res.data);
      });
  };

  useEffect(() => {}, [eventState.eventId]);

  return (
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
            out
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
          textColor="white"
          outlineColor={"orange.400"}
          bg="none"
          onClick={AddParticipant}
          _hover={{ bg: "orange.400", textColor: "gray.900" }}
        >
          Add Participant
        </Button>
      </TabList>
      <TabIndicator
        mt="-1.5px"
        height="2px"
        bg="orange.400"
        borderRadius="1px"
      />
      <TabPanels>
        <TabPanels>
          <participantContext.Provider
            value={{ listOfParticipants, setListOfParticipants }}
          >
            <ParticipantTable
              headers={headers}
              category_id_pk={selectedCategory}
              event_id_pk={eventState.eventId}
            />
          </participantContext.Provider>
        </TabPanels>
      </TabPanels>
    </Tabs>
  );
}

export default Participants;
