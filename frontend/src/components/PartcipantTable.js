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
          {data.map((user) => (
            <Tr key={user.user_id_pk}>
              <Td>{user.user_name}</Td>
              <Td>{user.user_instagram}</Td>
              <Td>{user.user_phone_number}</Td>
              <Td>{user.user_email}</Td>
              {/* <Td>{user.user_paid ? "Yes" : "No"}</Td> */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ParticipantTable;
