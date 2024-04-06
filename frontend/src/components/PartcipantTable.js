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

  const showToast = () => {
    toast({
      title: "Number already assigned",
      description:
        "Number has already been assigned to participant. Refresh Page.",
      duration: 5000,
      isClosable: true,
      status: "info",
      variant: "custom",
      position: "top",
    });
  };

  //
  async function updateOrder(to_update, to_remove) {
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
    }
  }

  // Function to retrieve a usable number of the user.
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
      setGeneratingNumber(false);
      return response.data;
    } catch (error) {
      setGeneratingNumber(false);
      onClose();
      return null;
    }
  }
  const handleCheckboxChange = async (e) => {
    onOpen();
    const updatedList = await Promise.all(
      listOfParticipants.map(async (row) => {
        if (row.user_id_fk === e.target.name) {
          if (row.order === null) {
            const order = await getNumber(
              category_id_pk,
              event_id_pk,
              e.target.name
            );
            if (order.status === "assigned") {
              showToast();
              setGeneratingNumber(false);
              setUpdatingDatabase(false);
              setListOfParticipants(order.data);
              onClose();
              const to_update = { ...row, order: order.data };
              return to_update;
            }
            const to_update = { ...row, order: order.data };
            if (order.data) {
              await updateOrder(to_update, false);
              return to_update;
            }
          } else {
            const to_update = { ...row, order: null };
            await updateOrder(row, true);
            return to_update;
          }
        } else {
          return row;
        }
      })
    );

    setListOfParticipants(updatedList);
  };

  const handleOrderChange = async (e, user_id) => {
    setListOfParticipants((prev) => {
      return prev.map((user) => {
        if (user.user_id_fk === user_id) {
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
    const user_info = listOfParticipants.find((user) => {
      return user.user_id_fk === user_id_fk;
    });
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
        <Table variant="simple" color={"white"}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              {headers.map((header, index) => (
                <Th color="gray.400" key={index}>
                  {header}
                </Th>
              ))}
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {listOfParticipants.map((user) => (
              <Tr key={user.user_id_fk}>
                <Td fontSize="md" color="white" minWidth="100%">
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
                <Td fontSize="md" color="white" minWidth="100%">
                  {user.user_name}
                </Td>
                <Td fontSize="md" color="white" minWidth="100%">
                  {user.user_instagram}
                </Td>
                <Td fontSize="md" color="white" minWidth="100%">
                  {user.user_phone_number}
                </Td>
                <Td fontSize="md" color="white" minWidth="100%">
                  {user.user_email}
                </Td>
                <Td fontSize="md" color="white" minWidth="100%">
                  {user.user_paid ? "Yes" : "No"}
                </Td>
                <Td fontSize="md" color="white" minWidth="100%">
                  <Checkbox
                    name={user.user_id_fk}
                    isChecked={user.order ? true : false}
                    onChange={(e) => {
                      handleCheckboxChange(e);
                    }}
                  ></Checkbox>
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
