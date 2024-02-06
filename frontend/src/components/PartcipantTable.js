// ReusableTable.jsx

import React from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const ParticipantTable = ({ headers, data }) => {
  // const headers = ["Name", "Instagram Handle", "Email", "Number", "Paid"];
  // const data = [
  //   ["John Doe", "@JohnDoe", "Popping 1v1"],
  //   ["Jane Smith", "@JaneSmith", "Locking 1v1"],
  // ];

  console.log(data);

  return (
    <Box p={4}>
      <Table variant="striped" colorScheme="purple">
        <Thead>
          <Tr>
            {headers.map((header, index) => (
              <Th key={index}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((participant) => (
            <Tr key={participant.participant_id_pk}>
              <Td>{participant.participant_name}</Td>
              <Td>{participant.participant_instagram}</Td>
              <Td>{participant.participant_phone_number}</Td>
              <Td>{participant.participant_email}</Td>
              <Td>{participant.participant_paid ? "Yes" : "No"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ParticipantTable;
