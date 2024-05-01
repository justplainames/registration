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
import { useAuth0 } from "@auth0/auth0-react";

function Scoring() {
  const { getAccessTokenSilently } = useAuth0();
  const [listOfCategories, setListOfCategories] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [headers, setHeaders] = useState(null);
  const [listOfParticipants, setListOfParticipants] = useState(null);
  const toast = useToast();

  const apiPath = process.env.REACT_APP_API_PATH;
  const original = ["Name", "Instagram Handle"];

  useEffect(() => {
    const getScores = async () => {
      try {
        const token = await getAccessTokenSilently();

        const categories = await axios.get(
          `${apiPath}/addParticipant/getCategories/${sessionStorage.getItem(
            "eventId"
          )}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setListOfCategories(categories.data);
        setCurrentCategory(categories.data[0].category_id_pk);

        await fetchScores(token, categories.data[0].category_id_pk);
      } catch (error) {
        if (error.response.data.error === "Unauthorized") {
          window.location.href = "/";
        } else {
          console.error("Error making axios request:", error);
        }
      }
    };
    getScores();
  }, []);

  const fetchScores = async (token, categoryId) => {
    const selectedCategoryScores = await axios.get(
      `${apiPath}/score/${sessionStorage.getItem("eventId")}/${categoryId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (selectedCategoryScores.data.error) {
      setListOfParticipants(null);
      toast({
        title: "No Participants",
        description: "Check to see if participant attendance were marked/added",
        duration: 5000,
        isClosable: true,
        status: "error",
        position: "top",
      });
    } else {
      setHeaders([
        ...original,
        ...selectedCategoryScores.data[0].judges.map((item) => item.judge_name),
        "Total Score",
      ]);
      setListOfParticipants(selectedCategoryScores.data);
    }
    try {
    } catch (error) {
      console.error("Error fetching scores: ", error);
    }
  };

  const handleChange = async (category) => {
    try {
      const token = await getAccessTokenSilently();
      await fetchScores(token, category.category_id_pk);
      setCurrentCategory(category.category_id_pk);
    } catch (error) {
      console.error("Error changing category: ", error);
    }
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
