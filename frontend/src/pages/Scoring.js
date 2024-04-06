import React, { useEffect, useState } from "react";
import {
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Box,
  TabIndicator,
  useToast,
} from "@chakra-ui/react";
import ScoringTable from "../components/ScoringTable";
import axios from "axios";

function Scoring() {
  const [listOfCategories, setListOfCategories] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [headers, setHeaders] = useState(null);
  const [listOfParticipants, setListOfParticipants] = useState(null);
  const toast = useToast();

  const apiPath = process.env.REACT_APP_API_PATH;
  const original = ["Name", "Instagram Handle"];

  useEffect(() => {
    console.log("useEffect");
    axios
      .get(
        `${apiPath}addParticipant/getCategories/${sessionStorage.getItem(
          "eventId"
        )}`
      )
      .then((response) => {
        console.log("first api call");
        setListOfCategories(response.data);
        setCurrentCategory(response.data[0].category_id_pk);
        const first_data = response.data[0];
        axios
          .get(
            `${apiPath}score/${sessionStorage.getItem("eventId")}/${
              first_data.category_id_pk
            }`
          )
          .then((response) => {
            console.log("second api call");
            if (response.data.error) {
              console.error(response.data.error);
              toast({
                title: "No Participants",
                description:
                  "Check to see if participant attendance were marked/added",
                duration: 5000,
                isClosable: true,
                status: "error",
                position: "top",
              });
            } else {
              setHeaders([
                ...original,
                ...response.data[0].judges.map((item) => item.judge_name),
                "Total Score",
              ]);
              setListOfParticipants(response.data);
            }
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
    axios
      .get(
        `${apiPath}score/${sessionStorage.getItem("eventId")}/${
          category.category_id_pk
        }`
      )
      .then((response) => {
        if (response.data.error) {
          console.error(response.data.error);
          toast({
            title: "No Participants",
            description:
              "Check to see if participant attendance were marked/added",
            duration: 5000,
            isClosable: true,
            status: "error",
            position: "top",
          });
        } else {
          setCurrentCategory(category.category_id_pk);
          setHeaders([
            ...original,
            ...response.data[0].judges.map((item) => item.judge_name),
            "Total Score",
          ]);
          setListOfParticipants(response.data);
        }
      });
  };

  return listOfCategories && currentCategory ? (
    <Tabs p={3} variant="unstyled" defaultIndex={0} overflow="auto">
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
