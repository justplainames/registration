import React from "react";
import {
  Button,
  Spacer,
  Tab,
  TabList,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import ScoringTable from "../components/ScoringTable";
import { useNavigate } from "react-router-dom";

const headers = ["Name", "Instagram Handle", "Category"];
const data = [
  ["John Doe", "@JohnDoe", "Popping 1v1"],
  ["Jane Smith", "@JaneSmith", "Locking 1v1"],
];

function Participants() {
  const navigate = useNavigate();

  const AddParticipant = () => {
    navigate("/addParticipant");
  };

  return (
    <Tabs mt="40px" p="20px" colorScheme="purple" variant="enclosed">
      <TabList>
        <Tab _selected={{ bg: "purple.400", color: "White" }}>Popping 1v1</Tab>
        <Tab _selected={{ bg: "purple.400", color: "White" }}>Locking 1v1</Tab>
        <Spacer />
        <Button
          roundedBottom="none"
          colorScheme="purple"
          px="40px"
          mr="1px"
          onClick={AddParticipant}
        >
          Add Participant
        </Button>
      </TabList>
      <TabPanels>
        <TabPanels>
          <ScoringTable headers={headers} data={data} />
        </TabPanels>
      </TabPanels>
    </Tabs>
  );
}

export default Participants;
