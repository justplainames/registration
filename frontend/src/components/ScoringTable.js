// ReusableTable.jsx

import React, { useState, useEffect, useContext } from "react";
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
import { EventContext } from "../helpers/EventContext";
import axios from "axios";

const ScoringTable = ({ headers, data }) => {
  const apiPath = "https://registartion-backend.fly.dev/";
  // const apiPath = "http://localhost:3000/";
  const { eventState } = useContext(EventContext);
  const [dataset, setDataset] = useState(null);
  const [headerDataset, setHeaderDataset] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [scoreTracker, setScoreTracker] = useState(null);
  const [totalScoreTracker, setTotalScoreTracker] = useState(null);
  const toast = useToast();

  useEffect(() => {
    console.log("Entered UseEffect-1 in Scoring Table");
    setTotalScoreTracker(null);

    setDataset(data.listOfParticipants);
    setHeaderDataset(headers);
    setCurrentCategory(data.currentCategory);
  }, [data]);

  useEffect(() => {
    console.log("Entered UseEffect-2 in Scoring Table");
    // Set up scoreTracker, a map that points that uses 'event_id-cat_id-participant_id-judge_id'
    console.log("Data = ", dataset);
    console.log("Current-Category = ", currentCategory);
    const score = new Map();
    if (dataset) {
      // console.log("dataset in UE2 - ", dataset);
      dataset.map((row) => {
        row.judges.map((judge) => {
          score.set(
            `${eventState.eventId}-${currentCategory}-${row.participant_id}-${judge.judge_id}`,
            judge.score
          );
        });
      });
    }
    setScoreTracker(score);
  }, [dataset]);

  useEffect(() => {
    const totalScore = new Map();
    // Set up scoreTracker, a map that points that uses 'event_id-cat_id-participant_id'
    if (dataset) {
      // console.log("dataset in UE2 - ", dataset);
      dataset.map((row) => {
        let total = 0;
        row.judges.map((judge) => {
          total += parseFloat(judge.score);
        });
        totalScore.set(
          `${eventState.eventId}-${currentCategory}-${row.participant_id}`,
          total
        );
      });
    }
    setTotalScoreTracker(totalScore);
  }, [scoreTracker]);

  // useEffect(() => {
  //   console.log({ totalScoreTracker });
  // }, [totalScoreTracker]);

  //   console.log(headerDataset);
  // });

  // useEffect(() => {
  //   setDataset(data.listOfParticipants);
  //   setHeaderDataset(headers);
  //   setCurrentCategory(data.currentCategory);
  //   const editTracker = new Map();
  //   // dataset.map((participant) => {
  //   //   participant.judges.map((entry) => {
  //   //     editTracker.set(
  //   //       `${participant.participant_id}-${entry.judge_name}-${currentCategory}`,
  //   //       entry.score
  //   //     );
  //   //   });
  //   // });
  //   setEditingState(editTracker);
  // }, [data, headers]);

  const handleSubmit = (
    value,
    event_id,
    category_id,
    participant_id,
    judge_id
  ) => {
    console.log("EVEOKFHJSKL:FHJSDKLF =", event_id);
    const test = dataset;
    const to_update = dataset.find(
      (data) => data.participant_id === participant_id
    );
    const index = test.findIndex(
      (participant) => participant.participant_id === participant_id
    );
    const updatedDataset = [...test];
    if (
      isNaN(value) === false &&
      parseFloat(value) <= 10 &&
      parseFloat(value) >= 0
    ) {
      to_update.judges.find((judge) => judge.judge_id === judge_id).score =
        value;

      updatedDataset[index] = to_update;
      axios
        .put(
          `${apiPath}score/updateScore/${event_id}/${category_id}/${judge_id}/${participant_id}`,
          { new_score: value }
        )
        .then((response) => {
          console.log(response);
        });
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

    // console.log();
  };
  return dataset && headerDataset && scoreTracker && totalScoreTracker ? (
    <Box p={4}>
      {" "}
      TESTING
      <Table variant="striped" colorScheme="purple">
        <Thead>
          <Tr>
            {headerDataset &&
              headerDataset.map((header, index) => (
                <Th key={index}>{header}</Th>
              ))}
          </Tr>
        </Thead>
        <Tbody>
          {/* {dataset &&
            Array.isArray(dataset) &&
            dataset.map((participant) => (
              <Tr key={participant.participant_id_pk}>
                <Td>{participant.participant_name}</Td>
                <Td>{participant.participant_instagram}</Td>
                {participant.judges &&
                  Array.isArray(participant.judges) &&
                  headerDataset
                    .filter(
                      (header) =>
                        header !== "Name" &&
                        header !== "Instagram Handle" &&
                        header !== "Total Score"
                    ) // Exclude non-judge headers
                    .map((judgeName) => (
                      <td key={judgeName}>
                        <Editable
                          defaultValue={
                            participant.judges.find(
                              (judge) => judge.judge_name === judgeName
                            )?.score
                          }
                          onSubmit={(newValue) =>
                            handleSubmit(
                              judgeName,
                              currentCategory,
                              participant.participant_id_pk,
                              newValue
                            )
                          }
                        >
                          <EditablePreview />
                          <EditableInput />
                        </Editable>
                      </td>
                    ))}
                <Td>{participant.total_score}</Td>
              </Tr>
            ))} */}
          {dataset.map((participant) => (
            <Tr key={participant.participant_id_pk}>
              <Td>{participant.participant_name}</Td>
              <Td>{participant.participant_instagram}</Td>
              {/* <Td>{participant.participant_phone_number}</Td>
              <Td>{participant.participant_email}</Td> */}
              {headerDataset
                .filter(
                  (header) =>
                    header !== "Name" &&
                    header !== "Instagram Handle" &&
                    header !== "Total Score"
                )
                .map((judge_name) => {
                  const judge = participant.judges.find((judge) => {
                    return judge.judge_name === judge_name;
                  });

                  const score = scoreTracker.get(
                    `${eventState.eventId}-${currentCategory}-${participant.participant_id}-${judge.judge_id}`
                  );
                  const event_id = eventState.eventId;

                  return score ? (
                    <Td>
                      <Editable
                        key={`${eventState.eventId}-${currentCategory}-${participant.participant_id}-${judge.judge_id}`}
                        defaultValue={score}
                        onSubmit={(value, key) =>
                          handleSubmit(
                            value,
                            event_id,
                            currentCategory,
                            participant.participant_id,
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
                  `${eventState.eventId}-${currentCategory}-${participant.participant_id}`
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  ) : (
    <Box>Loading</Box>
  );
};

export default ScoringTable;
