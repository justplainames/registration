import React from "react";
import { TabList, Tabs, Tab, TabPanels } from "@chakra-ui/react";
import Match from "../components/BracketV2/Match";
import { top8, top16, top32, top64 } from "./dataset.js";

const Brackets = () => {
  return (
    <Tabs mt="40px" p="20px" colorScheme="purple" variant="enclosed">
      <TabList>
        <Tab _selected={{ bg: "purple.400", color: "white" }}>Tab No.1</Tab>
        <Tab _selected={{ bg: "purple.400", color: "white" }}>Tab No.2</Tab>
      </TabList>
      <TabPanels bg="purple.100" height="100%" w="100%" overflow="auto">
        <Match data={top16} />
      </TabPanels>
    </Tabs>
  );
};

export default Brackets;
