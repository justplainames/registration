// ReusableTable.jsx

import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Editable,
  EditablePreview,
  EditableInput,
  useToast,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const ScoringTable = ({ headers, data }) => {
  const apiPath = process.env.REACT_APP_API_PATH;

  const [dataset, setDataset] = useState(null);
  const [headerDataset, setHeaderDataset] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [scoreTracker, setScoreTracker] = useState(null);
  const [totalScoreTracker, setTotalScoreTracker] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const toast = useToast();

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const setUpPage = async () => {
      const score = new Map();
      const totalScore = new Map();
      setAccessToken(await getAccessTokenSilently());
      setTotalScoreTracker(null);
      setDataset(data.listOfParticipants);
      setHeaderDataset(headers);
      setCurrentCategory(data.currentCategory);

      // Set up scoreTracker, a map that points that uses 'event_id-cat_id-user_id-judge_id'
      if (data.listOfParticipants) {
        data.listOfParticipants.map((row) => {
          if (row) {
            row.judges.map((judge) => {
              score.set(
                `${sessionStorage.getItem("eventId")}-${data.currentCategory}-${
                  row.user_id
                }-${judge.judge_id}`,
                judge.score
              );
            });
          }
        });

        // Set up scoreTracker, a map that points that uses 'event_id-cat_id-user_id'
        data.listOfParticipants.map((row) => {
          if (row) {
            let total = 0;
            row.judges.map((judge) => {
              total += parseFloat(judge.score);
            });
            totalScore.set(
              `${sessionStorage.getItem("eventId")}-${data.currentCategory}-${
                row.user_id
              }`,
              total
            );
          }
        });
      }
      setScoreTracker(score);
      setTotalScoreTracker(totalScore);
    };
    setUpPage();
  }, [data]);

  const handleUpdateScoreSubmit = async (
    value,
    event_id,
    category_id,
    user_id,
    judge_id
  ) => {
    try {
      const test = dataset;
      const to_update = dataset.find((data) => data.user_id === user_id);
      const index = test.findIndex((user) => user.user_id === user_id);
      const updatedDataset = [...test];
      if (
        isNaN(value) === false &&
        parseFloat(value) <= 10 &&
        parseFloat(value) >= 0
      ) {
        to_update.judges.find((judge) => judge.judge_id === judge_id).score =
          value;

        updatedDataset[index] = to_update;
        await axios.put(
          `${apiPath}/score/updateScore/${event_id}/${category_id}/${judge_id}/${user_id}`,
          { new_score: value },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        const totalScore = new Map();
        dataset.map((row) => {
          if (row) {
            let total = 0;
            row.judges.map((judge) => {
              total += parseFloat(judge.score);
            });
            totalScore.set(
              `${sessionStorage.getItem("eventId")}-${data.currentCategory}-${
                row.user_id
              }`,
              total
            );
          }
        });
        setTotalScoreTracker(totalScore);
        setDataset(updatedDataset);
      } else {
        toast({
          title: "Invalid Input",
          description: "Please submit a number from 1-10",
          duration: 5000,
          isClosable: true,
          status: "error",
          position: "top",
        });
      }
    } catch (error) {
      console.log("Error updating score", error);
    }
  };
  return dataset && headerDataset && scoreTracker && totalScoreTracker ? (
    <Box p={4}>
      <Table variant="simple" color="white">
        <Thead>
          <Tr my=".8rem" pl="0px" color="gray.400">
            {headerDataset &&
              headerDataset.map((header, index) => (
                <Th key={index}>{header}</Th>
              ))}
          </Tr>
        </Thead>
        <Tbody>
          {dataset.map(
            (user) =>
              user && (
                <Tr key={user.user_id_pk}>
                  <Td fontSize="md" color="white" minWidth="100%">
                    {user.user_name}
                  </Td>
                  <Td fontSize="md" color="white" minWidth="100%">
                    {user.user_instagram}
                  </Td>
                  {headerDataset
                    .filter(
                      (header) =>
                        header !== "Name" &&
                        header !== "Instagram Handle" &&
                        header !== "Total Score"
                    )
                    .map((judge_name) => {
                      const judge = user.judges.find((judge) => {
                        return judge.judge_name === judge_name;
                      });

                      const score = scoreTracker.get(
                        `${sessionStorage.getItem(
                          "eventId"
                        )}-${currentCategory}-${user.user_id}-${judge.judge_id}`
                      );
                      const event_id = sessionStorage.getItem("eventId");

                      return score ? (
                        <Td>
                          <Editable
                            key={`${sessionStorage.getItem(
                              "eventId"
                            )}-${currentCategory}-${user.user_id}-${
                              judge.judge_id
                            }`}
                            defaultValue={score}
                            onSubmit={(value, key) =>
                              handleUpdateScoreSubmit(
                                value,
                                event_id,
                                currentCategory,
                                user.user_id,
                                judge.judge_id
                              )
                            }
                          >
                            <EditableInput />
                            <EditablePreview />
                          </Editable>
                        </Td>
                      ) : (
                        <Td>Loading</Td>
                      );
                    })}
                  <Td>
                    {totalScoreTracker.get(
                      `${sessionStorage.getItem(
                        "eventId"
                      )}-${currentCategory}-${user.user_id}`
                    )}
                  </Td>
                </Tr>
              )
          )}
        </Tbody>
      </Table>
    </Box>
  ) : (
    <Box>Loading</Box>
  );
};

export default ScoringTable;
