import React, { useEffect, useState, useContext } from "react";
import { TabList, Tabs, Tab, TabPanels } from "@chakra-ui/react";
import Match from "../components/BracketV2/Match";
import { top8, top16, top32, top64 } from "./dataset.js";
import axios from "axios";

const Brackets = () => {
  const apiPath = "https://registartion-backend.fly.dev/";
  // const apiPath = "http://localhost:3000/";
  const [bracketData, setBracketData] = useState(null);
  useEffect(() => {
    axios.get(`${apiPath}bracket/888/888`).then((response) => {
      setBracketData(response.data["bracket_data"]);
    });
  }, []);
  return (
    <Tabs mt="40px" p="20px" colorScheme="purple" variant="enclosed">
      <TabList>
        <Tab _selected={{ bg: "purple.400", color: "white" }}>Tab No.1</Tab>
        <Tab _selected={{ bg: "purple.400", color: "white" }}>Tab No.2</Tab>
      </TabList>
      <TabPanels bg="purple.100" height="100%" w="100%" overflow="auto">
        {bracketData ? (
          <Match data={bracketData} />
        ) : (
          <div>Loading (Brackets)</div>
        )}
      </TabPanels>
    </Tabs>
  );
};

export default Brackets;
