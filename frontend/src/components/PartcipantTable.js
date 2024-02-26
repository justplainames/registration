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
} from "@chakra-ui/react";
import axios from "axios";

const ParticipantTable = ({ headers, event_id_pk, category_id_pk }) => {
  const apiPath = process.env.REACT_APP_API_PATH;
  const { listOfParticipants, setListOfParticipants } =
    useContext(participantContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [generatingNumber, setGeneratingNumber] = useState(false);
  const [updatingDatabase, setUpdatingDatabase] = useState(false);
  // const headers = ["Name", "Instagram Handle", "Email", "Number", "Paid"];
  // const data = [
  //   ["John Doe", "@JohnDoe", "Popping 1v1"],
  //   ["Jane Smith", "@JaneSmith", "Locking 1v1"],
  // ];
  console.log("THIS IS", listOfParticipants);
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
    event_id_pk = event_id_pk
  ) {
    try {
      setGeneratingNumber(true);
      const response = await axios.get(
        `${apiPath}addParticipant/usedNumbers/${event_id_pk}/${category_id_pk}`
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
            const order = await getNumber(category_id_pk, event_id_pk);
            console.log("Order changed to ", order);
            const to_update = { ...row, order: order };
            if (order) {
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
                {user.order ? <Td>{user.order}</Td> : <Td>{0}</Td>}
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
