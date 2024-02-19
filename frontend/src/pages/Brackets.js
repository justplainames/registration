import React, { useEffect, useState, useContext } from "react";
import {
  TabList,
  Tabs,
  Tab,
  TabPanels,
  Box,
  Spacer,
  Select,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Checkbox,
  CheckboxGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";
import Match from "../components/BracketV2/Match";
import { top8, top16, top32, top64 } from "./dataset.js";
import axios from "axios";
import { EventContext } from "../helpers/EventContext.js";

const Brackets = () => {
  const apiPath = process.env.REACT_APP_API_PATH;
  const [bracketData, setBracketData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [listOfCategories, setListOfCategories] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [checkedState, setCheckedState] = useState(null);
  const [chosenName, setChosenNames] = useState(null);
  const [toChoose, setToChoose] = useState(null);
  const { eventState } = useContext(EventContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const showToast = () => {
    toast({
      title: "Select the Right Amount",
      description: `Requires ${toChoose.to_choose}, You Either didn't choose enough or too much`,
      duration: 5000,
      isClosable: true,
      status: "error",
      position: "top",
    });
  };

  const showNotEnoughParticipantsToast = (value) => {
    console.log(value);
    toast({
      title: "Not Enough Participants",
      description: `Requires ${value.error.needed} more participants`,
      duration: 5000,
      isClosable: true,
      status: "error",
      position: "top",
    });
  };

  useEffect(() => {
    axios
      .get(`${apiPath}addParticipant/getCategories/${eventState.eventId}`)
      .then((response) => {
        setListOfCategories(response.data);
        setCurrentCategory(response.data[0].category_id_pk);
        setSelectedData("top4");
        console.log("Entered useEffect in bracket,js", response);
      });
  }, []);

  useEffect(() => {
    if (selectedData) {
      console.log("Checking the categories", listOfCategories, currentCategory);
      axios
        .get(
          `${apiPath}bracket/${eventState.eventId}/${currentCategory}/${selectedData}`
        )
        .then((response) => {
          console.log("THIS is a response", response);
          if (response.data.to_choose) {
            console.log("SETTING", response.data);
            setToChoose(response.data);
            onOpen();
          } else {
            console.log("SETTING BRACKET DATA", response.data);
            setBracketData(response.data.bracket_data);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          showNotEnoughParticipantsToast(err.response.data);
        });
    }
  }, [selectedData, currentCategory]);

  useEffect(() => {
    if (toChoose) {
      setCheckedState(new Array(toChoose.data.length).fill(false));
    }
  }, [toChoose]);

  const handleSelect = (value) => {
    console.log(value);
    setSelectedData(value);
  };

  const handleChange = (value) => {
    setCurrentCategory(value.category_id_pk);
  };

  const handleCheckboxChange = (position) => {
    const new_setCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(new_setCheckedState);
    const new_chosenName = new Array();
    new_setCheckedState.map((value, index) => {
      if (value) {
        new_chosenName.push(toChoose.data[index]);
      }
    });
    console.log(new_chosenName);

    setChosenNames(new_chosenName);
  };

  const handleSubmit = () => {
    console.log(chosenName);
    console.log(toChoose.to_choose, chosenName.length);
    if (chosenName.length !== toChoose.to_choose) {
      console.log("Fail");
      showToast();
    } else {
      axios
        .post(
          `${apiPath}bracket/${eventState.eventId}/${currentCategory}/${selectedData}`,
          { number: toChoose.to_choose, data: chosenName }
        )
        .then((response) => {
          setBracketData(response.data);
          console.log(response);
        });
      handleOnClose();
    }
  };

  const handleOnClose = () => {
    setChosenNames(null);
    setCheckedState(null);
    onClose();
  };

  return listOfCategories ? (
    <Box>
      <Modal isOpen={isOpen} onClose={handleOnClose}>
        <ModalOverlay />

        {toChoose ? (
          <ModalContent>
            <ModalHeader>Select {toChoose.to_choose}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {checkedState ? (
                <CheckboxGroup colorScheme="purple">
                  <Stack spacing={[4, 1]} direction={["column", "row"]}>
                    {toChoose.data.map((row, index) => (
                      <Checkbox
                        checked={checkedState[index]}
                        onChange={() => handleCheckboxChange(index)}
                      >
                        {row["Participant.participant_name"]}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              ) : (
                <Box>Loading</Box>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="purple" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                variant="outline"
                colorScheme="purple"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        ) : (
          <ModalContent>
            <ModalHeader>Loading</ModalHeader>
            <ModalCloseButton />
          </ModalContent>
        )}
      </Modal>
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
          <Spacer />
          <Select
            focusBorderColor="purple.400"
            maxW="150px"
            onChange={(e) => {
              handleSelect(e.target.value);
            }}
            value={selectedData}
          >
            {/* <option value="top2">Finals</option> */}
            <option value="top4">Top 4</option>
            <option value="top8">Top 8</option>
            <option value="top16">Top 16</option>
          </Select>
        </TabList>
        <TabPanels bg="purple.100" height="100%" w="100%" overflow="auto">
          {bracketData ? (
            <Match data={bracketData} />
          ) : (
            <div>Loading (Brackets)</div>
          )}
        </TabPanels>
      </Tabs>
    </Box>
  ) : (
    <Box>LOADING</Box>
  );
};

export default Brackets;
