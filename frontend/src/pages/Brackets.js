import React, { useEffect, useState, useContext } from "react";
import {
  TabList,
  Tabs,
  Tab,
  TabPanels,
  Box,
  Spacer,
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
  TabIndicator,
  Text,
  FormControl,
  VStack,
} from "@chakra-ui/react";
import Match from "../components/BracketV2/Match";
import { top8, top16, top32, top64 } from "./dataset.js";
import axios from "axios";
import { EventContext } from "../helpers/EventContext.js";
import { RoleContext } from "../helpers/RoleContext.js";
import { Select } from "chakra-react-select";

const Brackets = () => {
  const apiPath = process.env.REACT_APP_API_PATH;
  const [bracketData, setBracketData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [listOfCategories, setListOfCategories] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [checkedState, setCheckedState] = useState(null);
  const [chosenName, setChosenNames] = useState(null);
  const [toChoose, setToChoose] = useState(null);
  const { eventState, setEventState } = useContext(EventContext);
  const { roleState } = useContext(RoleContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userErrorMessage, setUserErrorMessage } = "Loading";

  const toast = useToast();

  const showToast = () => {
    toast({
      title: "Select the Right Amount",
      description: `Requires ${toChoose.to_choose}, You Either didn't choose enough or too much`,
      duration: 5000,
      isClosable: true,
      status: "error",
      variant: "toastFail",
      position: "top",
    });
  };

  const showTiebreakerToast = () => {
    toast({
      title: "Tiebreaker!",
      description: `Tiebreaker rounds required`,
      duration: 5000,
      isClosable: true,
      status: "warning",
      variant: "toastInfo",
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
      variant: "toastFail",
      status: "error",
      position: "top",
    });
  };

  // Calls API on render.
  // API retrieves categories of the particular event and sets the options ("top4 as default")
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

  // Calls API on change of selectedCategory and Current Category
  // Re-renders when user chooses a different category or on first render
  useEffect(() => {
    setBracketData(null);
    if (selectedData) {
      console.log("Checking the categories", listOfCategories, currentCategory);
      axios
        .get(
          `${apiPath}bracket/${eventState.eventId}/${currentCategory}/${selectedData}`
        )
        .then((response) => {
          console.log("THIS is a response", response);
          // Theres an error with the brackets only show to admin. Users get something else
          if (response.data.to_choose) {
            if (roleState.role === "admin") {
              console.log("SETTING", response.data);
              setToChoose(response.data);
              onOpen();
            }
            showTiebreakerToast();
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

  // When there's a tiebreaker toChoose gets set, triggering this effect
  // Should not be called when user
  useEffect(() => {
    if (toChoose) {
      setCheckedState(new Array(toChoose.data.length).fill(false));
    }
  }, [toChoose]);

  const handleSelect = (selected) => {
    console.log("Handle Select = ", selected);
    setSelectedData(selected.value);
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

  const chakraStyles = {
    control: (provided, state) => ({
      ...provided,
      // borderWidth: "10px",
      // borderColor: "rgb(237,137,51)",
      borderWidth: "1px",
      "& > div > span > span": {
        paddingY: "1px",
      },
      "& > div > span > div > svg > path": {
        fill: "gray.900",
      },
      textColor: "white",
      // _hover: { borderColor: "rgb(237,137,51)" },
      _focusVisible: {
        borderColor: "rgb(237,137,51)",
        borderWidth: "2px",
        outline: "none", // Remove default focus outline
      },
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      background: "transparent",
    }),
    crossIcon: (provided, state) => ({
      ...provided,
      textColor: "white",
    }),
    menuList: (provided, state) => ({
      ...provided,
      background: "gray.900",
      textColor: "white",
    }),
    value: (provided, state) => ({
      ...provided,
      background: "rgb(237,137,51)",
      textColor: "gray.900",
    }),
    option: (provided, state) => ({
      ...provided,
      background: "gray.900",
      _hover: { background: "rgb(237,137,51)", textColor: "gray.900" },
    }),
    // input: (provided, state) => ({
    //   ...provided,
    //   background: "red",
    //   padding: "2px",
    // }),
  };

  return listOfCategories ? (
    <Box p={3}>
      <Modal isOpen={isOpen} onClose={handleOnClose} m="40px">
        <ModalOverlay />

        {toChoose ? (
          <ModalContent
            maxW={"300px"}
            w={"full"}
            bg="gray.900"
            boxShadow={"2xl"}
            rounded={"lg"}
            p={5}
            textAlign={"center"}
          >
            <ModalHeader textColor="white" fontSize={"2xl"} fontFamily={"body"}>
              Select {toChoose.to_choose}{" "}
              {toChoose.to_choose == 1 ? "User" : "Users"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody textAlign="left" color="gray.400" px={3}>
              <FormControl display="flex">
                <CheckboxGroup>
                  {checkedState ? (
                    <VStack align="start">
                      {toChoose.data.map((row, index) => (
                        <Checkbox
                          checked={checkedState[index]}
                          onChange={() => handleCheckboxChange(index)}
                        >
                          {row["User.user_name"]}
                        </Checkbox>
                      ))}
                    </VStack>
                  ) : (
                    <Box>Loading</Box>
                  )}
                </CheckboxGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter alignContent="center" justifyContent="center">
              <Stack mt={8} direction={"row"} spacing={4}>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  _focus={{
                    bg: "gray.200",
                  }}
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  outlineColor="rgb(237,137,51)"
                  textColor="white"
                  bg="transparent"
                  _hover={{
                    bg: "rgb(237,137,51)",
                    textColor: "gray.900",
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        ) : (
          <ModalContent>
            <ModalHeader>Loading</ModalHeader>
            <ModalCloseButton />
          </ModalContent>
        )}
      </Modal>
      <Tabs textColor="white" p={3} variant="unstyled" defaultIndex={0}>
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

          <Select
            chakraStyles={chakraStyles}
            maxW="150px"
            onChange={(e) => {
              handleSelect(e);
            }}
            options={[
              { value: "top4", label: "Top 4" },
              { value: "top8", label: "Top 8" },
              { value: "top16", label: "Top 16" },
            ]}
          >
            {/* <option value="top2">Finals</option> */}

            <option value="top4">Top 4</option>
            <option value="top8">Top 8</option>
            <option value="top16">Top 16</option>
          </Select>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="orange.400"
          borderRadius="1px"
        />
        {bracketData ? (
          <TabPanels mt="2%" height="100%" w="100%" overflow="auto">
            <Match data={bracketData} />
          </TabPanels>
        ) : (
          <TabPanels mt="2%" bg="transparent">
            <Text textColor="white">No Data / Data not Right</Text>
          </TabPanels>
        )}
      </Tabs>
    </Box>
  ) : (
    <Box>LOADING</Box>
  );
};

export default Brackets;
