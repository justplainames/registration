// ReusableTable.jsx

import React from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const ScoringTable = ({ headers, data }) => {
  return (
    <Box p={4}>
      <Table variant="striped" colorScheme="purple">
        <Thead>
          <Tr>
            {headers &&
              headers.map((header, index) => <Th key={index}>{header}</Th>)}
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            Array.isArray(data) &&
            data.map((participant) => (
              <Tr key={participant.participant_id_pk}>
                <Td>{participant.participant_name}</Td>
                <Td>{participant.participant_instagram}</Td>
                {participant.judges &&
                  Array.isArray(participant.judges) &&
                  headers
                    .filter(
                      (header) =>
                        header !== "Name" && header !== "Instagram Handle"
                    ) // Exclude non-judge headers
                    .map((judgeName) => (
                      <td key={judgeName}>
                        {
                          participant.judges.find(
                            (judge) => judge.judge_name === judgeName
                          )?.score
                        }
                      </td>
                    ))}
              </Tr>
            ))}
          {/* {data.map((participant) => (
            <Tr key={participant.participant_id_pk}>
              <Td>{participant.participant_name}</Td>
              <Td>{participant.participant_instagram}</Td>
              <Td>{participant.participant_phone_number}</Td>
              <Td>{participant.participant_email}</Td>
              {participant.judges.map((judge) => (
                <td>Hello</td>
              ))}
            </Tr>
          ))} */}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ScoringTable;
