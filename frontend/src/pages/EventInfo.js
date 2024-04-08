import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Modal,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalHeader,
  useDisclosure,
  ModalOverlay,
  ModalCloseButton,
  Heading,
  Textarea,
  Stack,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "../customThemes/custom-datepicker.css";
import { EventContext } from "../helpers/EventContext";

function EventInfo() {
  const navigate = useNavigate();
  const apiPath = process.env.REACT_APP_API_PATH;
  const [rawData, setRawData] = useState(null);
  const [availableCategories, setAvailableCategories] = useState(null);
  const [availableJudges, setAvailableJudges] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [eventInfo, setEventInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { setEventState } = useContext(EventContext);
  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();
  const {
    isOpen: warningIsOpen,
    onOpen: warningOnOpen,
    onClose: warningOnClose,
  } = useDisclosure();
  const {
    isOpen: confirmationIsOpen,
    onOpen: confirmationOnOpen,
    onClose: confirmationOnClose,
  } = useDisclosure();

  // Get selected event info on component mount
  useEffect(() => {
    axios
      .get(
        `${apiPath}editEvent/getEventInfo/${sessionStorage.getItem("eventId")}`
      )
      .then((response) => {
        setRawData(response.data);
      })
      .catch((error) => {
        console.error(
          "Error in getting selected event information for editing",
          error
        );
      });
  }, []);

  // Get selected event info on component mount
  // Set the state of available judges, data and categories
  useEffect(() => {
    if (rawData) {
      setEventInfo(rawData.event_info);
      setAvailableJudges(rawData.available_judges);
      setSelectedData(rawData.selection_data);
      setAvailableCategories(rawData.available_categories);
    }
  }, [rawData]);

  const handleEditEventSubmit = () => {
    setIsEditing(false);
    axios
      .put(`${apiPath}editEvent/editEventInfo`, {
        selected_data: selectedData,
        event_info: eventInfo,
      })
      .then((response) => {
        confirmationOnClose();
      })
      .catch((error) => {
        console.error(
          "Error while making PUT request to update and edit event information:",
          error
        );
      });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // Handle changing of categories
  const handleCategoryChange = (selectedOptions) => {
    const to_add = [];
    selectedOptions.map((newOption) => {
      if (
        !selectedData.find(
          (oldOption) => oldOption.category_id_fk === newOption.value
        )
      ) {
        to_add.push({
          category_id_fk: newOption.value,
          event_id_fk: sessionStorage.getItem("eventId"),
          "Category.category_name": newOption.label,
          judges: [],
        });
      }
    });

    const new_data = selectedData.filter((old) =>
      selectedOptions.some(
        (newOption) => old.category_id_fk === newOption.value
      )
    );

    setSelectedData(new_data.concat(to_add));
  };

  // Handle changing of judges
  const handleJudgeChange = (selectedOptions, category_id_fk) => {
    const transformedArray = selectedOptions.map((item) => ({
      "Judge.judge_name": item.label,
      category_id_fk: category_id_fk,
      event_id_fk: sessionStorage.getItem("eventId"),
      judge_id_fk: item.value,
    }));
    setSelectedData((prev) =>
      prev.map((item) =>
        item.category_id_fk === category_id_fk
          ? { ...item, judges: transformedArray }
          : item
      )
    );
  };

  const handleDeleteEvent = () => {
    onOpen();
  };

  const handleOnClose = () => {
    onClose();
  };
  const handleDeleteSubmit = () => {
    axios
      .delete(`${apiPath}editEvent/deleteEvent`, {
        data: eventInfo,
      })
      .then((response) => {
        sessionStorage.removeItem("eventId");
        sessionStorage.removeItem("eventName");
        onClose();
        setEventState(null);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error in deleting event: ", error);
      });
  };
  const handleWarningOnClose = () => {
    warningOnClose();
  };

  const handleConfirmationOnClose = () => {
    confirmationOnClose();
  };

  const handleEditButton = () => {
    setIsEditing(!isEditing);
    warningOnOpen();
  };

  const chakraStyles = {
    control: (provided, state) => ({
      ...provided,
      borderWidth: "1px",
      "& > div > span > span": {
        paddingY: "1px",
      },
      "& > div > span > div > svg > path": {
        fill: "gray.900",
      },
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
    }),
    multiValue: (provided, state) => ({
      ...provided,
      background: "rgb(237,137,51)",
      textColor: "gray.900",
    }),
    option: (provided, state) => ({
      ...provided,
      background: "gray.900",
      _hover: { background: "rgb(237,137,51)", textColor: "gray.900" },
    }),
  };

  return (
    <Box shadow="1px 1px 3px rgba(0,0,0,0.3)" p={6} m="10px auto">
      <Modal isOpen={isOpen} onClose={handleOnClose} m="40px">
        <ModalOverlay />
        <ModalContent
          maxW={"320px"}
          w={"full"}
          bg="gray.900"
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
        >
          <ModalHeader textColor="white" fontSize={"2xl"} fontFamily={"body"}>
            Are you sure?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"} color="gray.400" px={3}>
            Deleting the event will remove all information tied to this event,
            inclulding participant history. This action is irreversible. Click
            on cancel to go back.
          </ModalBody>
          <ModalFooter>
            <Stack mt={8} direction={"row"} spacing={4}>
              <Button
                flex={1}
                fontSize={"sm"}
                _focus={{
                  bg: "gray.200",
                }}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                flex={1}
                fontSize={"sm"}
                outlineColor="rgb(237,49,86)"
                textColor="white"
                bg="transparent"
                _hover={{
                  bg: "rgb(237,49,86)",
                  textColor: "black",
                }}
                onClick={handleDeleteSubmit}
              >
                Delete
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Confirmation for Editing Event, handleWarning*/}
      <Modal isOpen={warningIsOpen} onClose={handleWarningOnClose}>
        <ModalOverlay />
        <ModalContent
          maxW={"320px"}
          w={"full"}
          bg="gray.900"
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
        >
          <ModalHeader textColor="white" fontSize={"2xl"} fontFamily={"body"}>
            Warning:
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"} color="gray.400" px={3}>
            Removing certain data will remove and restart information tied to
            the removed judges and removed categories.
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Stack mt={8} direction={"row"} spacing={4}>
              <Button
                flex={1}
                fontSize={"sm"}
                _focus={{
                  bg: "gray.200",
                }}
                onClick={() => {
                  setIsEditing(!isEditing);
                  warningOnClose();
                }}
              >
                Cancel
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
                onClick={() => {
                  warningOnClose();
                }}
              >
                Continue
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={confirmationIsOpen}
        onClose={handleConfirmationOnClose}
        m="40px"
      >
        <ModalOverlay />
        <ModalContent
          maxW={"320px"}
          w={"full"}
          bg="gray.900"
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
        >
          <ModalHeader textColor="white" fontSize={"2xl"} fontFamily={"body"}>
            Are you sure?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"} color="gray.400" px={3}>
            Changes are all permanent and Irreversible.
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Stack mt={8} direction={"row"} spacing={4}>
              <Button
                flex={1}
                fontSize={"sm"}
                _hover={{
                  bg: "gray.300",
                }}
                onClick={handleConfirmationOnClose}
              >
                Cancel
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
                onClick={handleEditEventSubmit}
              >
                Confirm
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Heading
        w="100%"
        textAlign={"center"}
        textColor="white"
        fontWeight="normal"
        mb="2%"
      >
        User Registration
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel textColor="white">Event Name</FormLabel>
          <Input
            textColor="white"
            value={eventInfo.event_name}
            onChange={(e) =>
              setEventInfo({ ...eventInfo, event_name: e.target.value })
            }
            readOnly={!isEditing}
          />
        </FormControl>
        <FormControl textColor="white">
          <FormLabel>Event Location</FormLabel>
          <Input
            textColor="white"
            readOnly={!isEditing}
            value={eventInfo.event_location}
            onChange={(e) =>
              setEventInfo({ ...eventInfo, event_location: e.target.value })
            }
          />
        </FormControl>
      </Flex>
      <FormControl textColor="white" mt="2%">
        <FormLabel>Event Description</FormLabel>
        <Textarea
          readOnly={!isEditing}
          value={eventInfo.event_description}
          onChange={(e) =>
            setEventInfo({ ...eventInfo, event_description: e.target.value })
          }
        />
      </FormControl>
      <FormControl mt="2%">
        <FormLabel textColor="white">Event Date</FormLabel>
        <DatePicker
          readOnly={!isEditing}
          selected={
            eventInfo.event_date ? new Date(eventInfo.event_date) : null
          }
          onChange={(date) => setEventInfo({ ...eventInfo, event_date: date })}
          name="event_date"
          dateFormat="dd/MM/yyyy"
        />
      </FormControl>
      <FormControl textColor="white" mt="2%">
        <FormLabel>Categories:</FormLabel>
        {selectedData && availableCategories && (
          <>
            <Select
              isReadOnly={!isEditing}
              options={availableCategories.map((category) => ({
                value: category.category_id_pk,
                label: category.category_name,
              }))}
              chakraStyles={chakraStyles}
              // components={{
              //   MultiValueLabel: CustomMultiValueLabel, // Use custom MultiValueLabel
              // }}
              // colorScheme="purple"
              // focusBorderColor="purple.400"
              // selectedOptionColorScheme="purple"
              isMulti
              name="categories"
              value={selectedData.map((category) => ({
                value: category.category_id_fk,
                label: category["Category.category_name"],
              }))}
              onChange={(selectedOptions) =>
                handleCategoryChange(selectedOptions)
              }
            />
          </>
        )}
      </FormControl>

      {selectedData &&
        availableJudges &&
        selectedData.map((category) => (
          <div key={category.category_id_fk}>
            <FormControl textColor="white" style={{ maxWidth: "none" }} mt="2%">
              <FormLabel>{`Judges for ${category["Category.category_name"]}:`}</FormLabel>
              <Select
                chakraStyles={chakraStyles}
                isReadOnly={!isEditing}
                name="judges"
                options={availableJudges.map((judge) => ({
                  value: judge.judge_id_pk,
                  label: judge.judge_name,
                }))}
                // colorScheme="purple"
                // focusBorderColor="purple.400"
                // selectedOptionColorScheme="purple"
                isMulti
                onChange={(selectedOptions) =>
                  handleJudgeChange(selectedOptions, category.category_id_fk)
                }
                value={category.judges.map((judge) => ({
                  value: judge.judge_id_fk,
                  label: judge["Judge.judge_name"],
                }))}
              />
            </FormControl>
          </div>
        ))}
      {!isEditing ? (
        <Button
          mt="2%"
          bg="rgb(237,137,51)"
          textColor="gray.900"
          _hover={{
            textDecoration: "none",
            bg: "rgb(213,123,45)",
          }}
          onClick={() => handleEditButton()}
        >
          Edit Event
        </Button>
      ) : (
        <Flex>
          <Button
            mt="2%"
            mr="2%"
            w="7rem"
            bg="rgb(237,137,51)"
            textColor="gray.900"
            _hover={{
              textDecoration: "none",
              bg: "rgb(213,123,45)",
            }}
            onClick={() => {
              confirmationOnOpen();
            }}
          >
            Submit
          </Button>
          <Button
            mt="2%"
            w="7rem"
            borderColor="rgb(49, 212, 237)"
            backgroundColor="gray.200"
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
          <Spacer />
          <Button
            mt="2%"
            bg="rgb(237,49,86)"
            textColor={"white"}
            _hover={{
              textDecoration: "none",
              bg: "rgb(213,44,77)",
            }}
            onClick={() => handleDeleteEvent()}
          >
            Delete Event
          </Button>
        </Flex>
      )}
    </Box>
  );
}

export default EventInfo;
