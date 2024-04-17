import React, { useEffect, useState } from "react";
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
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

function Participants() {
  const { getAccessTokenSilently } = useAuth0();
  const [listOfCategories, setListOfCategories] = useState([]);
  const [listOfParticipants, setListOfParticipants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const apiPath = process.env.REACT_APP_API_PATH;
  const navigate = useNavigate();

  useEffect(() => {
    const getParticipantList = async () => {
      const token = await getAccessTokenSilently();
      try {
        const categories = await axios.get(
          `${apiPath}/addParticipant/getCategories/${sessionStorage.getItem(
            "eventId"
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setListOfCategories(categories.data);
        const firstData = categories.data[0];
        setSelectedCategory(firstData.category_id_pk);

        const participants = await axios.get(
          `${apiPath}/addParticipant/getParticipants/${sessionStorage.getItem(
            "eventId"
          )}/${firstData.category_id_pk}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setListOfParticipants(participants.data);
      } catch (error) {
        if (error.response.data.error === "Unauthorized") {
          window.location.href = "/";
        } else {
          console.error("Error making axios request:", error);
        }
      }
    };
    getParticipantList();
  }, []);

  const AddParticipant = () => {
    navigate("/addParticipant");
  };

  const handleChange = async (category) => {
    try {
      const token = await getAccessTokenSilently();
      const participants = await axios.get(
        `${apiPath}/addParticipant/getParticipants/${sessionStorage.getItem(
          "eventId"
        )}/${category.category_id_pk}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedCategory(category.category_id_pk);
      setListOfParticipants(participants.data);
    } catch (error) {
      console.error("Error changing category: ", error);
    }
  };

  return (
    <Tabs p={3} variant="unstyled" defaultIndex={0} overflow="auto">
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
              event_id_pk={sessionStorage.getItem("eventId")}
            />
          </participantContext.Provider>
        </TabPanels>
      </TabPanels>
    </Tabs>
  );
}

export default Participants;
