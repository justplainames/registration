// External Libraries
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

// Chakra UI Components
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

// Custom Components
import Match from "../components/BracketV2/Match";

// Custom Themes
import { Select } from "chakra-react-select";
import { chakraSelectStyles } from "../customThemes/ChakraStyles";

const Brackets = () => {
  const apiPath = process.env.REACT_APP_API_PATH;
  const [bracketData, setBracketData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [listOfCategories, setListOfCategories] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [checkedState, setCheckedState] = useState(null);
  const [chosenName, setChosenNames] = useState(null);
  const [toChoose, setToChoose] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { getAccessTokenSilently, user } = useAuth0();

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
    toast({
      title: "Not Enough Participants",
      description: `Requires ${value} more participants`,
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
    const func = async () => {
      const token = await getAccessTokenSilently();
      axios
        .get(
          `${apiPath}/addParticipant/getCategories/${sessionStorage.getItem(
            "eventId"
          )}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          setListOfCategories(response.data);
          setCurrentCategory(response.data[0].category_id_pk);
          setSelectedData("top4");
        })
        .catch((error) => {
          console.error("There is a an error getting Categories: ", error);
        });
    };
    func();
  }, []);

  // Calls API on change of selectedCategory and Current Category
  // Re-renders when user chooses a different category or on first render
  useEffect(() => {
    const func = async () => {
      const token = await getAccessTokenSilently();

      setBracketData(null);
      if (selectedData) {
        axios
          .get(
            `${apiPath}/bracket/${sessionStorage.getItem(
              "eventId"
            )}/${currentCategory}/${selectedData}`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((response) => {
            // Theres an error with the brackets only show to admin. Users get something else
            if (
              response.data.message &&
              response.data.message === "Not Enough Participants"
            ) {
              showNotEnoughParticipantsToast(response.data.needed);
            } else {
              if (response.data.to_choose) {
                if (user["http://localhost:3000/roles"][0] === "Admin") {
                  setToChoose(response.data);
                  onOpen();
                }
                showTiebreakerToast();
              } else {
                setBracketData(response.data.bracket_data);
              }
            }
          })
          .catch((error) => {
            console.error("Error getting bracket information: ", error);
          });
      }
    };
    func();
  }, [selectedData, currentCategory]);

  // When there's a tiebreaker toChoose gets set, triggering this effect
  // Should not be called when user
  useEffect(() => {
    if (toChoose) {
      setCheckedState(new Array(toChoose.data.length).fill(false));
    }
  }, [toChoose]);

  const handleSelect = (selected) => {
    setSelectedData(selected.value);
  };

  const handleCategoryChange = (value) => {
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

    setChosenNames(new_chosenName);
  };

  //
  const handleTieBreakerSubmit = async () => {
    const token = await getAccessTokenSilently();
    if (chosenName.length !== toChoose.to_choose) {
      showToast();
    } else {
      axios
        .post(
          `${apiPath}/bracket/${sessionStorage.getItem(
            "eventId"
          )}/${currentCategory}/${selectedData}`,
          { number: toChoose.to_choose, data: chosenName },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          setBracketData(response.data);
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
                  onClick={handleTieBreakerSubmit}
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
                handleCategoryChange(category);
              }}
            >
              {category.category_name}
            </Tab>
          ))}
          <Spacer />

          <Select
            chakraStyles={chakraSelectStyles}
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
