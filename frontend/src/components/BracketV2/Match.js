import React, { useState, useEffect, useContext } from "react";
import { MatchContext } from "../../helpers/MatchContext";
import Seed from "./Seed";
import RoundLeft from "./RoundLeft";
import { HStack, Box } from "@chakra-ui/react";
import RoundMiddle from "./RoundMiddle";
import RoundRight from "./RoundRight";
function Match(data) {
  const [matchData, setMatchData] = useState(null);
  const [toRender, setToRender] = useState(null);

  useEffect(() => {
    setMatchData(data);
    updateMatchData();
    console.log("TEST");
  }, [matchData]); // Only run once on mount

  const top16Contestants = [
    { stage_name: "Team Name: Number 1", position: 1 },
    { stage_name: "Team Name: Number 2", position: 2 },
    { stage_name: "Team Name: Number 3", position: 3 },
    { stage_name: "Team Name: Number 4", position: 4 },
    { stage_name: "Team Name: Number 5", position: 5 },
    { stage_name: "Team Name: Number 6", position: 6 },
    { stage_name: "Team Name: Number 7", position: 7 },
    { stage_name: "Team Name: Number 8", position: 8 },
    { stage_name: "Team Name: Number 9", position: 9 },
    { stage_name: "Team Name: Number 10", position: 10 },
    { stage_name: "Team Name: Number 11", position: 11 },
    { stage_name: "Team Name: Number 12", position: 12 },
    { stage_name: "Team Name: Number 13", position: 13 },
    { stage_name: "Team Name: Number 14", position: 14 },
    { stage_name: "Team Name: Number 15", position: 15 },
    { stage_name: "Team Name: Number 16", position: 16 },
  ];

  const updateMatchData = () => {
    const to_modify = { ...matchData };
    if (matchData) {
      switch (matchData.data.matchType) {
        case "Top-16":
          to_modify.data.matches.top16.forEach((match) => {
            const first_name = top16Contestants.find(
              (data) => match.seed * 2 === data.position
            );
            const second_name = top16Contestants.find(
              (data) => match.seed * 2 - 1 === data.position
            );
            match.first = { ...match.first, stage_name: first_name.stage_name };
            match.second = {
              ...match.second,
              stage_name: second_name.stage_name,
            };
          });

          setToRender([<RoundLeft />, <RoundMiddle />, <RoundRight />]);
          break;

        default:
          break;
      }
    }
  };

  return (
    <MatchContext.Provider value={{ matchData, setMatchData }}>
      {matchData ? (
        <HStack spacing="30px">
          {toRender &&
            toRender.map((comp, index) => (
              <React.Fragment key={index}>{comp}</React.Fragment>
            ))}
        </HStack>
      ) : (
        <div>Loading...</div>
      )}
    </MatchContext.Provider>
  );
}

export default Match;
