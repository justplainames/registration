// ReusableTable.jsx

import React, { useState, useEffect, useContext } from "react";
import { participantContext } from "../helpers/ParticipantContext";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Spinner,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  useDisclosure,
  Text,
  Editable,
  EditableInput,
  EditablePreview,
  useToast,
  Icon,
} from "@chakra-ui/react";
import axios from "axios";
import { IconTrash } from "@tabler/icons-react";

const ParticipantTable = ({ headers, event_id_pk, category_id_pk }) => {
  const apiPath = process.env.REACT_APP_API_PATH;
  const { listOfParticipants, setListOfParticipants } =
    useContext(participantContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [generatingNumber, setGeneratingNumber] = useState(false);
  const [updatingDatabase, setUpdatingDatabase] = useState(false);
  const toast = useToast();
  // const headers = ["Name", "Instagram Handle", "Email", "Number", "Paid"];
  // const data = [
  //   ["John Doe", "@JohnDoe", "Popping 1v1"],
  //   ["Jane Smith", "@JaneSmith", "Locking 1v1"],
  // ];
  console.log("ASLDKHASL", listOfParticipants);

  const showToast = () => {
    toast({
      title: "Number already assigned",
      description:
        "Number has already been assigned to participant. Refresh Page.",
      duration: 5000,
      isClosable: true,
      status: "info",
      position: "top",
    });
  };

  //
  async function updateOrder(to_update, to_remove) {
    console.log("Entered Update Order function");
    try {
      setUpdatingDatabase(true);
      await axios
        .put(`${apiPath}addParticipant/updateOrder`, {
          to_update: to_update,
          to_remove: to_remove,
        })
        .then((response) => {
          setUpdatingDatabase(false);
          onClose();
        });
    } catch (error) {
      setUpdatingDatabase(false);
      console.log("Error Updating Order", error);
    }
  }

  //
  async function getNumber(
    category_id_pk = category_id_pk,
    event_id_pk = event_id_pk,
    user_id_pk
  ) {
    try {
      setGeneratingNumber(true);
      const response = await axios.get(
        `${apiPath}addParticipant/usedNumbers/${event_id_pk}/${category_id_pk}/${user_id_pk}`
      );
      console.log("returning response.data", response.data);
      setGeneratingNumber(false);
      return response.data;
    } catch (error) {
      setGeneratingNumber(false);
      onClose();
      console.log("Error Getting an order Number", error);
      return null;
    }
  }
  const handleCheckboxChange = async (e) => {
    onOpen();
    const updatedList = await Promise.all(
      listOfParticipants.map(async (row) => {
        if (row.user_id_fk === e.target.name) {
          console.log("Hit");
          if (row.order === null) {
            console.log("Value is null");
            const order = await getNumber(
              category_id_pk,
              event_id_pk,
              e.target.name
            );
            console.log("CHEKCING =", order);
            if (order.status === "assigned") {
              showToast();
              setGeneratingNumber(false);
              setUpdatingDatabase(false);
              console.log("inside the assigned", listOfParticipants);
              console.log("inside the assigned", order.data);
              setListOfParticipants(order.data);
              onClose();
              const to_update = { ...row, order: order.data };
              return to_update;
            }
            console.log("Order changed to ", order);
            const to_update = { ...row, order: order.data };
            if (order.data) {
              console.log("returning", to_update);
              await updateOrder(to_update, false);
              return to_update;
            }
          } else {
            console.log("Value is not Null");
            const to_update = { ...row, order: null };
            await updateOrder(row, true);
            console.log("returning", to_update);
            return to_update;
          }
        } else {
          console.log("Miss");
          return row;
        }
      })
    );

    console.log("updated klist", updatedList);
    setListOfParticipants(updatedList);
  };

  const handleOrderChange = async (e, user_id) => {
    setListOfParticipants((prev) => {
      return prev.map((user) => {
        if (user.user_id_fk === user_id) {
          console.log(typeof e);
          if (parseInt(e) === 0) {
            return {
              ...user,
              order: null,
            };
          }
          return {
            ...user,
            order: e,
          };
        }
        return user;
      });
    });
  };

  const handleOnClickDelete = (user_id_fk) => {
    console.log(user_id_fk);
    const user_info = listOfParticipants.find((user) => {
      return user.user_id_fk === user_id_fk;
    });
    console.log(user_info);
    axios
      .delete(`${apiPath}addParticipant/deleteParticipant`, {
        data: user_info,
      })
      .then((res) => {
        if (res.data === "ok") {
          setListOfParticipants((prev) => {
            return prev.filter((user) => user.user_id_fk === user_id_fk);
          });
        }
      });
  };

  const handleOrderSubmit = async (e, user_id, event_id, category_id) => {
    setUpdatingDatabase(true);
    console.log(e, user_id);

    const user_info = listOfParticipants.find((row) => {
      return row.user_id_fk === user_id;
    });

    axios
      .put(`${apiPath}addParticipant/manual/updateOrder`, {
        value: e,
        user_info: user_info,
      })
      .then((response) => {
        if (response.data !== "ok") {
          setListOfParticipants((prev) => {
            return prev.map((user) => {
              if (user.user_id_fk === user_id) {
                return {
                  ...user,
                  order: response.data,
                };
              }
              return user;
            });
          });
          showToast();
          setUpdatingDatabase(false);
        } else {
          setUpdatingDatabase(false);
        }
      });
  };

  return (
    <Box p={4}>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay isLazy={true} />
        <ModalContent>
          <ModalHeader
            justifyContent="center"
            display="flex"
            alignItems="center"
          >
            Loading
          </ModalHeader>
          <ModalBody
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="teal"
              size="xl"
              alignItems="center"
            />
            <Text>
              {generatingNumber
                ? "Generating Number"
                : updatingDatabase
                ? "Updating Database"
                : "Completed"}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
      {listOfParticipants ? (
        <Table variant="striped" colorScheme="purple">
          <Thead>
            <Tr>
              {headers.map((header, index) => (
                <Th key={index}>{header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {listOfParticipants.map((user) => (
              <Tr key={user.user_id_fk}>
                <Td>
                  <Editable
                    value={user.order ? user.order : 0}
                    onChange={(e) => {
                      handleOrderChange(e, user.user_id_fk);
                    }}
                    onSubmit={(e) => {
                      handleOrderSubmit(e, user.user_id_fk);
                    }}
                  >
                    <EditableInput />
                    <EditablePreview />
                  </Editable>
                </Td>
                <Td>{user.user_name}</Td>
                <Td>{user.user_instagram}</Td>
                <Td>{user.user_phone_number}</Td>
                <Td>{user.user_email}</Td>
                <Td>{user.user_paid ? "Yes" : "No"}</Td>
                <Td>
                  <Checkbox
                    name={user.user_id_fk}
                    isChecked={user.order ? true : false}
                    onChange={(e) => {
                      handleCheckboxChange(e);
                    }}
                  >
                    {String(user.order)}
                  </Checkbox>
                </Td>
                <Td>
                  <Icon
                    onMouseEnter={(e) => {
                      e.target.style.cursor = "pointer";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.cursor = "auto";
                    }}
                    id={user.user_id_fk}
                    as={IconTrash}
                    onClick={() => {
                      handleOnClickDelete(user.user_id_fk);
                    }}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <div>Table loading</div>
      )}
    </Box>
  );
};

export default ParticipantTable;
