import { Box, Text, Flex, useToast } from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from "react";
import { MatchContext } from "../../helpers/MatchContext";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {
  bottomSeedFlex,
  bottomSeedTextLost,
  bottomSeedTextNull,
  bottomSeedTextWon,
  getSeedStyles,
  topSeedFlex,
  topSeedTextLost,
  topSeedTextNull,
  topSeedTextWon,
} from "../../customThemes/SeedStyles";

// Seed ID will be eventNumber-CatNumber-bracket-(1-64)
function Seed({
  nextMatch,
  seedNumber,
  bracket,
  connectorHeight,
  yDirection,
  xDirection,
}) {
  const apiPath = process.env.REACT_APP_API_PATH;
  const toast = useToast();
  const { getAccessTokenSilently, user } = useAuth0();
  const { matchData, setMatchData } = useContext(MatchContext);

  const showToast = () => {
    toast({
      title: "Prior Bracket Not Chosen",
      description: "There's no result from the previous round",
      duration: 5000,
      isClosable: true,
      status: "error",
      position: "top",
    });
  };

  // change to seed data
  const data = matchData;
  let nextMatchInfo;
  let next_slot;
  const match = data.data.matches[bracket].find(
    (match) => match.seed === seedNumber
  ); //
  if (nextMatch) {
    let bracket = `top${nextMatch.split("-")[0]}`;

    if (bracket == "top2") {
      bracket = "finals";
    } else {
    }

    nextMatchInfo =
      data.data.matches[bracket].find(
        (match) => match.seed === parseInt(`${nextMatch.split("-")[1]}`)
      ) || null;

    next_slot = (() => {
      if (seedNumber % 2 === 0) {
        if (parseInt(nextMatch.split("-")[1]) * 2 === seedNumber) {
          return "second";
        } else {
          return "first";
        }
      } else {
        if (seedNumber === parseInt(nextMatch.split("-")[1]) * 2 + 1) {
          return "second";
        } else {
          return "first";
        }
      }
    })();
  }

  useEffect(() => {}, [matchData]);

  const [firstResult, setFirstResult] = useState(match.first.status);
  const [secondResult, setSecondResult] = useState(match.second.status);

  const seedId = `${data.data.eventId}-${data.data.catId}-${data.data.matchType}-${seedNumber}`;
  const firstOppenent = match.first.stage_name;
  const secondOppenent = match.second.stage_name;
  const type = data.data.matchType.split("-").join("").toLocaleLowerCase();

  const connectorLength = connectorHeight;
  const { styler1, styler2, styler3 } = getSeedStyles(
    xDirection,
    yDirection,
    connectorLength,
    nextMatchInfo
  );

  const handleClick = async () => {
    const token = await getAccessTokenSilently();
    if (match.prevMatch === null) {
      if (secondResult === null || secondResult === false) {
        setFirstResult(false);
        setSecondResult(true);

        if (next_slot === "first") {
          nextMatchInfo.first.stage_name = secondOppenent;
        } else {
          nextMatchInfo.second.stage_name = secondOppenent;
        }

        match.first.status = false;
        match.second.status = true;
        setMatchData({ ...matchData });
      } else {
        setFirstResult(true);
        setSecondResult(false);
        if (next_slot === "first") {
          nextMatchInfo.first.stage_name = firstOppenent;
        } else {
          nextMatchInfo.second.stage_name = firstOppenent;
        }
        match.first.status = true;
        match.second.status = false;
        setMatchData({ ...matchData });
      }
      match.seed_status = true;
      axios
        .post(
          `${apiPath}/bracket/updateStatus/${data.data.eventId}/${data.data.catId}/${type}`,
          matchData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .catch((error) => {
          console.error("Error updating the bracket status", error);
        });
    } else {
      if (
        data.data.matches[`top${match.prevMatch[0].split("-")[0]}`].find(
          (round) => {
            return round.seed === parseInt(match.prevMatch[0].split("-")[1]);
          }
        ).seed_status != null &&
        data.data.matches[`top${match.prevMatch[1].split("-")[0]}`].find(
          (round) => {
            return round.seed === parseInt(match.prevMatch[1].split("-")[1]);
          }
        ).seed_status != null
      ) {
        if (secondResult === null || secondResult === false) {
          setFirstResult(false);
          setSecondResult(true);

          if (nextMatchInfo) {
            if (next_slot === "first") {
              nextMatchInfo.first.stage_name = secondOppenent;
            } else {
              nextMatchInfo.second.stage_name = secondOppenent;
            }
          }

          match.first.status = false;
          match.second.status = true;
          setMatchData({ ...matchData });
        } else {
          setFirstResult(true);
          setSecondResult(false);

          if (nextMatchInfo) {
            if (next_slot === "first") {
              nextMatchInfo.first.stage_name = firstOppenent;
            } else {
              nextMatchInfo.second.stage_name = firstOppenent;
            }
          }

          match.first.status = true;
          match.second.status = false;
          setMatchData({ ...matchData });
        }
        match.seed_status = true;
        axios
          .post(
            `${apiPath}/bracket/updateStatus/${data.data.eventId}/${data.data.catId}/${type}`,
            matchData,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .catch((error) => {
            console.error("Error updating bracket status: ", error);
          });
      } else {
        showToast();
      }
    }
  };

  return (
    <Box
      bg="gray.700"
      my="1px"
      border="1px"
      height="55px"
      width="220px"
      key={seedId}
      position="relative"
      borderRadius="15px"
    >
      <Box {...styler3}>
        <Box {...styler1}></Box>
        <Box {...styler2} />
      </Box>

      <Flex
        {...topSeedFlex}
        onClick={
          user["http://localhost:3000/roles"][0] === "Admin"
            ? handleClick
            : null
        }
      >
        <Text marginLeft="5px">{firstOppenent}</Text>
        {firstResult === null ? (
          <Text {...topSeedTextNull}>NULL</Text>
        ) : firstResult === false ? (
          <Text {...topSeedTextLost}>LOST</Text>
        ) : (
          <Text {...topSeedTextWon}>WON</Text>
        )}
      </Flex>
      <Flex
        {...bottomSeedFlex}
        onClick={
          user["http://localhost:3000/roles"][0] === "Admin"
            ? handleClick
            : null
        }
      >
        <Text marginLeft="5px">{secondOppenent}</Text>
        {secondResult === null ? (
          <Text {...bottomSeedTextNull}>NULL</Text>
        ) : secondResult === false ? (
          <Text {...bottomSeedTextLost}>LOST</Text>
        ) : (
          <Text {...bottomSeedTextWon}>WON</Text>
        )}
      </Flex>
    </Box>
  );
}

export default Seed;
