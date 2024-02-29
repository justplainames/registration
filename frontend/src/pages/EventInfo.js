import React, { useContext, useEffect, useState } from "react";
import { EventContext } from "../helpers/EventContext";
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
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useNavigate } from "react-router-dom";

function EventInfo() {
  const { eventState, setEventState } = useContext(EventContext);
  const navigate = useNavigate();
  const apiPath = process.env.REACT_APP_API_PATH;
  const [rawData, setRawData] = useState(null);
  // const [selectedCategories, setSelectedCategories] = useState(null);
  const [availableCategories, setAvailableCategories] = useState(null);
  const [availableJudges, setAvailableJudges] = useState(null);
  // const [selectedJudges, setSelectedJudges] = useState({});
  const [selectedData, setSelectedData] = useState(null);
  const [eventInfo, setEventInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
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
  // const [toRemove, setToRemove] = useState(null);

  useEffect(() => {
    axios
      .get(`${apiPath}editEvent/getEventInfo/${eventState.eventId}`)
      .then((response) => {
        console.log("Respnse", response.data);
        setRawData(response.data);
      });
  }, []);

  useEffect(() => {
    if (rawData) {
      console.log("rawData", rawData);
      setEventInfo(rawData.event_info);
      setAvailableJudges(rawData.available_judges);
      setSelectedData(rawData.selection_data);
      setAvailableCategories(rawData.available_categories);
      // setSelectedCategories(
      //   rawData.selection_data.map((category) => {
      //     return {
      //       category_id_fk: category.category_id_fk,
      //       category_name: category["Category.category_name"],
      //     };
      //   })
      // );
      // setSelectedJudges(
      //   rawData.selection_data.reduce(
      //     (acc, category) => ({
      //       ...acc,
      //       [category.category_id_fk]: category.judges,
      //     }),
      //     {}
      //   )
      // );
    }
  }, [rawData]);

  // useEffect(() => {
  //   if (rawData) {
  // ToRemove Select already itnernally keeps track based on
  // map through every availbel cat if i
  // const final_available_categories = rawData.available_categories.filter(
  //   (availableRow) => {
  //     // iterate through every Available cat, if available inside selected.category_id_fk inside return true
  //     // True means that it has already been selected. Make it false
  //     const result = selectedCategories.find((selectedRow) => {
  //       return selectedRow.category_id_fk === availableRow.category_id_pk;
  //     });
  //     console.log(result);
  //     return !result;
  //   }
  // );
  // setAvailableCategories(final_available_categories);
  //     setAvailableCategories(rawData.available_categories);
  //   }
  // }, [selectedCategories]);

  // useEffect(() => {
  //   console.log("\n\n\n");
  //   console.log(selectedCategories);
  //   console.log(selectedJudges);
  // }, [selectedJudges]);

  // useEffect(() => {}, [availableCategories]);

  const handleSubmit = () => {
    setIsEditing(false);
    axios
      .put(`${apiPath}editEvent/editEventInfo`, {
        selected_data: selectedData,
        event_info: eventInfo,
      })
      .then((response) => {
        setEventState({
          eventId: eventInfo.event_id_fk,
          eventName: eventInfo.event_name,
        });
        confirmationOnClose();
      })
      .catch((error) => {
        console.error("Error while making PUT request:", error);
      });
  };

  const handleCancel = () => {
    setIsEditing(false);
    console.log("cancel");
  };

  const handleCategoryChange = (selectedOptions) => {
    console.log("Selected Options Before anything", selectedOptions);
    console.log("selected Data before anything", selectedData);
    const to_add = [];
    selectedOptions.map((newOption) => {
      if (
        !selectedData.find(
          (oldOption) => oldOption.category_id_fk === newOption.value
        )
      ) {
        to_add.push({
          category_id_fk: newOption.value,
          event_id_fk: eventState.eventId,
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

    console.log("Data after deletion", new_data);

    setSelectedData(new_data.concat(to_add));

    // const new_selected_options = [];
    // const removed_options = [];
    // check for new elements
    //New -- selectedOptionsRow
    //Old -- SelectedCategoriesRow
    //   selectedOptions.map((selectedOptionsRow) => {
    //     if (
    //       !selectedCategories.find(
    //         (selectedCategoriesRow) =>
    //           selectedOptionsRow.value === selectedCategoriesRow.category_id_fk
    //       )
    //     ) {
    //       setSelectedJudges((prev) => [
    //         ...prev,
    //         { [selectedOptionsRow.value]: {} },
    //       ]);
    //     }
    //     new_selected_options.push({
    //       category_id_fk: selectedOptionsRow.value,
    //       category_name: selectedOptionsRow.label,
    //     });
    //   });
    //   selectedCategories.map((selectedCategoriesRow) => {
    //     if (
    //       !selectedOptions.find(
    //         (selectedOptionsRow) =>
    //           selectedOptionsRow.value === selectedCategoriesRow.category_id_fk
    //       )
    //     ) {
    //       removed_options.push(selectedCategoriesRow.category_id_fk);
    //     }
    //   });
    //   removed_options.forEach((id) => {
    //     setSelectedJudges((prev) => {
    //       const updatedPrev = { ...prev };
    //       delete updatedPrev[id];
    //       return updatedPrev;
    //     });
    //   });
    //   console.log(selectedOptions);
    //   console.log(selectedCategories);
    //   console.log(selectedJudges);
    //   // selectedCategories;
  };
  const handleJudgeChange = (selectedOptions, category_id_fk) => {
    console.log(selectedOptions);
    console.log(selectedData);
    const transformedArray = selectedOptions.map((item) => ({
      "Judge.judge_name": item.label,
      category_id_fk: category_id_fk,
      event_id_fk: eventState.eventId,
      judge_id_fk: item.value,
    }));
    console.log(transformedArray);
    setSelectedData((prev) =>
      prev.map((item) =>
        item.category_id_fk === category_id_fk
          ? { ...item, judges: transformedArray }
          : item
      )
    );
    //   console.log(selectedJudges);
    //   // console.log(selectedJudges);
  };
  // useEffect(() => {
  //   const final_available_judges = availableJudges.filter()
  //   // setAvailableJudges(response.data.availableJudges);
  //   console.log("Result = ", selectedJudges);
  // }, [selectedJudges]);

  const handleDelete = () => {
    onOpen();
  };

  const handleOnClose = () => {
    onClose();
  };
  const handleDeleteSubmit = () => {
    console.log(eventInfo);
    axios
      .delete(`${apiPath}editEvent/deleteEvent`, {
        data: eventInfo,
      })
      .then((response) => {
        onClose();
        setEventState({ eventName: "Select Event", eventId: null });
        navigate("/dashboard");
        console.log(response);
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

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={handleOnClose} m="40px">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader m="40px">Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody m="40px">
            Deleting the event will remove all information tied to this event,
            inclulding participant history. This action is irreversible. Click
            on cancel to go back.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="outline"
              colorScheme="red"
              onClick={handleDeleteSubmit}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Confirmation for Editing Event, handleWarning*/}
      <Modal isOpen={warningIsOpen} onClose={handleWarningOnClose} m="40px">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader m="40px">Warning:</ModalHeader>
          <ModalCloseButton />
          <ModalBody m="40px">
            Removing certain data will remove and restart information tied to
            the removed judges and removed categories.
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="purple"
              mr={3}
              onClick={() => {
                setIsEditing(!isEditing);
                warningOnClose();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              colorScheme="green"
              onClick={() => {
                warningOnClose();
              }}
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={confirmationIsOpen}
        onClose={handleConfirmationOnClose}
        m="40px"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader m="40px">Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody m="40px">
            Changes are all permanent and Irreversible.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="outline" colorScheme="red" onClick={handleSubmit}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <FormControl>
        <FormLabel>Event Name</FormLabel>
        <Input
          value={eventInfo.event_name}
          onChange={(e) =>
            setEventInfo({ ...eventInfo, event_name: e.target.value })
          }
          readOnly={!isEditing}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Event Location</FormLabel>
        <Input
          readOnly={!isEditing}
          value={eventInfo.event_location}
          onChange={(e) =>
            setEventInfo({ ...eventInfo, event_location: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Event Description</FormLabel>
        <Input
          readOnly={!isEditing}
          value={eventInfo.event_description}
          onChange={(e) =>
            setEventInfo({ ...eventInfo, event_description: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Event Date</FormLabel>
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
      <FormControl>
        <FormLabel>Categories:</FormLabel>
        {selectedData && availableCategories && (
          <>
            <Select
              isReadOnly={!isEditing}
              options={availableCategories.map((category) => ({
                value: category.category_id_pk,
                label: category.category_name,
              }))}
              colorScheme="purple"
              focusBorderColor="purple.400"
              selectedOptionColorScheme="purple"
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
            <FormControl mb="40px" style={{ maxWidth: "none" }}>
              <FormLabel>{`Judges for ${category["Category.category_name"]}:`}</FormLabel>
              <Select
                isReadOnly={!isEditing}
                name="judges"
                options={availableJudges.map((judge) => ({
                  value: judge.judge_id_pk,
                  label: judge.judge_name,
                }))}
                colorScheme="purple"
                focusBorderColor="purple.400"
                selectedOptionColorScheme="purple"
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
        <Button colorScheme="purple" onClick={() => handleEditButton()}>
          Edit Event
        </Button>
      ) : (
        <Flex>
          <Button
            colorScheme="purple"
            onClick={() => {
              confirmationOnOpen();
            }}
          >
            Submit
          </Button>
          <Button colorScheme="purple" onClick={() => handleCancel()}>
            Cancel
          </Button>
          <Spacer />
          <Button colorScheme="red" onClick={() => handleDelete()}>
            Delete Event
          </Button>
        </Flex>
      )}
    </Box>
  );
}

export default EventInfo;
