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
import { useAuth0 } from "@auth0/auth0-react";
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

function Participants() {
  const { eventState } = useContext(EventContext);
  const { user, getAccessTokenSilently } = useAuth0();
  const [listOfCategories, setListOfCategories] = useState([]);
  const [listOfParticipants, setListOfParticipants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const apiPath = process.env.REACT_APP_API_PATH;
  const navigate = useNavigate();

  useEffect(() => {
    const func = async () => {
      const token = await getAccessTokenSilently();

      axios
        .get(
          `${apiPath}/addParticipant/getCategories/${sessionStorage.getItem(
            "eventId"
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setListOfCategories(res.data);
          const first_data = res.data[0];
          axios
            .get(
              `${apiPath}/addParticipant/getParticipants/${sessionStorage.getItem(
                "eventId"
              )}/${first_data.category_id_pk}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              setSelectedCategory(first_data.category_id_pk);
              setListOfParticipants(res.data);
            });
        })
        .catch((error) => {
          console.log("pass", error);
          if (error.response.data.error === "Unauthorized") {
            window.location.href = "/";
          } else {
            console.error("Error making axios request:", error);
          }
        });
    };
    func();
  }, []);

  const AddParticipant = () => {
    navigate("/addParticipant");
  };

  const handleChange = (category) => {
    const func = async () => {
      try {
        const token = await getAccessTokenSilently();
        axios
          .get(
            `${apiPath}/addParticipant/getParticipants/${sessionStorage.getItem(
              "eventId"
            )}/${category.category_id_pk}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )

          .then((res) => {
            setSelectedCategory(category.category_id_pk);
            setListOfParticipants(res.data);
          });
      } catch (error) {
        console.error(error);
      }
    };

    func();
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
