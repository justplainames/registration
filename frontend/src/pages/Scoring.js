import React from "react";
import { Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import ScoringTable from "../components/ScoringTable";

const headers = ["Name", "Age", "Score"];
const data = [
  ["John Doe", 25, 3],
  ["Jane Smith", 30, 1],
];

function Scoring() {
  return (
    <Tabs mt="40px" p="20px" colorScheme="purple" variant="enclosed">
      <TabList>
        <Tab _selected={{ bg: "purple.400", color: "White" }}>Popping 1v1</Tab>
        <Tab _selected={{ bg: "purple.400", color: "White" }}>Locking 1v1</Tab>
      </TabList>
      <TabPanels>
        <TabPanels>
          <ScoringTable headers={headers} data={data} />
        </TabPanels>
      </TabPanels>
    </Tabs>
  );
}

export default Scoring;
