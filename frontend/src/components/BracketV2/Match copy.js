import React, { useState, useEffect, useContext } from "react";
import { MatchContext } from "../../helpers/MatchContext";
import Seed from "./Seed";
import RoundLeft from "./RoundLeft";
import { HStack, Box } from "@chakra-ui/react";
import RoundMiddle from "./RoundMiddle";
import RoundRight from "./RoundRight";
function Match(data) {
  const [matchData, setMatchData] = useState(null);
  // console.log(matchData);
  const [toRender, setToRender] = useState(null);

  useEffect(() => {
    setMatchData(data);
    updateMatchData();
  }, []); // Only run once on mount

  const top4Contestants = [
    { stage_name: "Team Name: Number 1", position: 1 },
    { stage_name: "Team Name: Number 2", position: 2 },
    { stage_name: "Team Name: Number 3", position: 3 },
    { stage_name: "Team Name: Number 4", position: 4 },
  ];

  const top8Contestants = [
    { stage_name: "Team Name: Number 1", position: 1 },
    { stage_name: "Team Name: Number 2", position: 2 },
    { stage_name: "Team Name: Number 3", position: 3 },
    { stage_name: "Team Name: Number 4", position: 4 },
    { stage_name: "Team Name: Number 5", position: 5 },
    { stage_name: "Team Name: Number 6", position: 6 },
    { stage_name: "Team Name: Number 7", position: 7 },
    { stage_name: "Team Name: Number 8", position: 8 },
  ];

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

  const top32Contestants = [
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
    { stage_name: "Team Name: Number 17", position: 17 },
    { stage_name: "Team Name: Number 18", position: 18 },
    { stage_name: "Team Name: Number 19", position: 19 },
    { stage_name: "Team Name: Number 20", position: 20 },
    { stage_name: "Team Name: Number 21", position: 21 },
    { stage_name: "Team Name: Number 22", position: 22 },
    { stage_name: "Team Name: Number 23", position: 23 },
    { stage_name: "Team Name: Number 24", position: 24 },
    { stage_name: "Team Name: Number 25", position: 25 },
    { stage_name: "Team Name: Number 26", position: 26 },
    { stage_name: "Team Name: Number 27", position: 27 },
    { stage_name: "Team Name: Number 28", position: 28 },
    { stage_name: "Team Name: Number 29", position: 29 },
    { stage_name: "Team Name: Number 30", position: 30 },
    { stage_name: "Team Name: Number 31", position: 31 },
    { stage_name: "Team Name: Number 32", position: 32 },
  ];

  const top64Contestants = [
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
    { stage_name: "Team Name: Number 17", position: 17 },
    { stage_name: "Team Name: Number 18", position: 18 },
    { stage_name: "Team Name: Number 19", position: 19 },
    { stage_name: "Team Name: Number 20", position: 20 },
    { stage_name: "Team Name: Number 21", position: 21 },
    { stage_name: "Team Name: Number 22", position: 22 },
    { stage_name: "Team Name: Number 23", position: 23 },
    { stage_name: "Team Name: Number 24", position: 24 },
    { stage_name: "Team Name: Number 25", position: 25 },
    { stage_name: "Team Name: Number 26", position: 26 },
    { stage_name: "Team Name: Number 27", position: 27 },
    { stage_name: "Team Name: Number 28", position: 28 },
    { stage_name: "Team Name: Number 29", position: 29 },
    { stage_name: "Team Name: Number 30", position: 30 },
    { stage_name: "Team Name: Number 31", position: 31 },
    { stage_name: "Team Name: Number 32", position: 32 },
    { stage_name: "Team Name: Number 33", position: 33 },
    { stage_name: "Team Name: Number 34", position: 34 },
    { stage_name: "Team Name: Number 35", position: 35 },
    { stage_name: "Team Name: Number 36", position: 36 },
    { stage_name: "Team Name: Number 37", position: 37 },
    { stage_name: "Team Name: Number 38", position: 38 },
    { stage_name: "Team Name: Number 39", position: 39 },
    { stage_name: "Team Name: Number 40", position: 40 },
    { stage_name: "Team Name: Number 41", position: 41 },
    { stage_name: "Team Name: Number 42", position: 42 },
    { stage_name: "Team Name: Number 43", position: 43 },
    { stage_name: "Team Name: Number 44", position: 44 },
    { stage_name: "Team Name: Number 45", position: 45 },
    { stage_name: "Team Name: Number 46", position: 46 },
    { stage_name: "Team Name: Number 47", position: 47 },
    { stage_name: "Team Name: Number 48", position: 48 },
    { stage_name: "Team Name: Number 49", position: 49 },
    { stage_name: "Team Name: Number 50", position: 50 },
    { stage_name: "Team Name: Number 51", position: 51 },
    { stage_name: "Team Name: Number 52", position: 52 },
    { stage_name: "Team Name: Number 53", position: 53 },
    { stage_name: "Team Name: Number 54", position: 54 },
    { stage_name: "Team Name: Number 55", position: 55 },
    { stage_name: "Team Name: Number 56", position: 56 },
    { stage_name: "Team Name: Number 57", position: 57 },
    { stage_name: "Team Name: Number 58", position: 58 },
    { stage_name: "Team Name: Number 59", position: 59 },
    { stage_name: "Team Name: Number 60", position: 60 },
    { stage_name: "Team Name: Number 61", position: 61 },
    { stage_name: "Team Name: Number 62", position: 62 },
    { stage_name: "Team Name: Number 63", position: 63 },
    { stage_name: "Team Name: Number 64", position: 64 },
  ];

  // const [matchData, setMatchData] = useState(data);

  const updateMatchData = () => {
    console.log("test");
    const to_modify = { ...matchData };
    // console.log("To modify", to_modify);
    if (matchData) {
      switch (matchData.data.matchType) {
        case "Top-4":
          to_modify.data.matches.top4.forEach((match) => {
            const first_name = top4Contestants.find(
              (data) => match.seed * 2 === data.position
            );
            const second_name = top4Contestants.find(
              (data) => match.seed * 2 - 1 === data.position
            );
            match.first = { ...match.first, stage_name: first_name.stage_name };
            match.second = {
              ...match.second,
              stage_name: second_name.stage_name,
            };
          });

          setToRender([<RoundLeft />, <RoundMiddle />]);

          break;

        case "Top-8":
          to_modify.data.matches.top8.forEach((match) => {
            const first_name = top8Contestants.find(
              (data) => match.seed * 2 === data.position
            );
            const second_name = top8Contestants.find(
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

          // setToRender([<RoundLeft />, <RoundMiddle />, <RoundRight />]);
          setToRender([<RoundLeft />, <RoundMiddle />, <RoundRight />]);
          break;

        case "Top-32":
          to_modify.data.matches.top32.forEach((match) => {
            const first_name = top32Contestants.find(
              (data) => match.seed * 2 === data.position
            );
            const second_name = top32Contestants.find(
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

        case "Top-64":
          to_modify.data.matches.top64.forEach((match) => {
            const first_name = top64Contestants.find(
              (data) => match.seed * 2 === data.position
            );
            const second_name = top64Contestants.find(
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

  // const matchId = matchData
  //   ? `${matchData.data.eventId}-${matchData.data.catId}-${matchData.data.matchType}`
  //   : null;
  //   console.log(matchData);

  return (
    <MatchContext.Provider value={{ matchData, setMatchData }}>
      <HStack spacing="30px">
        {toRender &&
          toRender.map((comp, index) => (
            <React.Fragment key={index}>{comp}</React.Fragment>
          ))}
      </HStack>
    </MatchContext.Provider>
  );
}

export default Match;
