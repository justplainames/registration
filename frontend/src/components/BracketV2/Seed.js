import { Checkbox, Box, Text, Flex } from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { MatchContext } from "../../helpers/MatchContext";
import axios from "axios";

// Seed ID will be eventNumber-CatNumber-bracket-(1-64)
function Seed({
  seedNumber,
  bracket,
  connectorHeight,
  y_direction,
  x_direction,
}) {
  // const apiPath = "https://registartion-backend.fly.dev/";
  const apiPath = "http://localhost:3000/";
  const { matchData, setMatchData } = useContext(MatchContext);
  const data = matchData;
  const match = data.data.matches[bracket].find(
    (match) => match.seed === seedNumber
  ); //

  const [firstResult, setFirstResult] = useState(match.first.status);
  const [secondResult, setSecondResult] = useState(match.second.status);
  const seedType =
    match.prevMatch === null && match.nextMatch === null
      ? "middle"
      : match.prevMatch === null
      ? "outer"
      : "last";

  // if (matchData) {
  //   setFirstResult(match.first.status);
  //   setFirstResult(match.second.status);
  // }

  const seedId = `${data.eventId}-${data.catId}-${data.matchType}-${seedNumber}`;
  const firstOppenent = match.first.stage_name;
  const secondOppenent = match.second.stage_name;

  const connectorLength = connectorHeight;
  let styler1 = {};
  let styler2 = {};
  let styler3 = {};
  if (x_direction === "right") {
    styler3 = {
      position: "absolute",
      left: "219px",
      top: "26px",
      // transform="translate(-50%, -50%)",
      width: "16px",
      height: "1px",
      backgroundColor: "black",
    };
    if (y_direction === "down") {
      styler1 = {
        position: "absolute",
        transform: "rotate(90deg)",
        left: `-${connectorLength / 2 - 16}px`,
        top: `${connectorLength / 2}px`,
        width: `${connectorLength}px`,
        height: "1px",
        backgroundColor: "black",
      };
      styler2 = {
        position: "absolute",
        left: `${16}px`,
        top: `${connectorLength}px`,
        width: "14px",
        height: "1px",
        backgroundColor: "black",
      };
    } else {
      styler1 = {
        position: "absolute",
        transform: "rotate(90deg)",
        left: `-${connectorLength / 2 - 16}px`,
        bottom: `${connectorLength / 2}px`,
        width: `${connectorLength}px`,
        height: "1px",
        backgroundColor: "black",
      };
      styler2 = {
        position: "absolute",
        left: `${16}px`,
        bottom: `${connectorLength - 5}px`,
        width: "14px",
        height: "1px",
        backgroundColor: "black",
      };
    }
  } else {
    styler3 = {
      position: "absolute",
      left: "-16px",
      top: "26px",
      // transform="translate(-50%, -50%)",
      width: "16px",
      height: "1px",
      backgroundColor: "black",
    };
    if (y_direction === "down") {
      styler1 = {
        position: "absolute",
        transform: "rotate(90deg)",
        right: `-${connectorLength / 2 - 16}px`,
        top: `${connectorLength / 2}px`,
        width: `${connectorLength}px`,
        height: "1px",
        backgroundColor: "black",
      };
      styler2 = {
        position: "absolute",
        right: `${16}px`,
        top: `${connectorLength}px`,
        width: "15px",
        height: "1px",
        backgroundColor: "black",
      };
    } else {
      styler1 = {
        position: "absolute",
        transform: "rotate(90deg)",
        left: `-${connectorLength / 2}px`,
        bottom: `${connectorLength / 2}px`,
        width: `${connectorLength}px`,
        height: "1px",
        backgroundColor: "black",
      };
      styler2 = {
        // position: "absolute",
        // left: `${16}px`,
        // bottom: `${connectorLength - 5}px`,
        // width: "14px",
        // height: "1px",
        // backgroundColor: "black",
      };
    }
  }

  const handleClick = () => {
    if (secondResult === null || secondResult === false) {
      setFirstResult(false);
      setSecondResult(true);
      match.first.status = false;
      match.second.status = true;
    } else {
      setFirstResult(true);
      setSecondResult(false);
      match.first.status = true;
      match.second.status = false;
    }
    // const temp = matchData;
    // console.log(temp.data.matches[bracket][seedNumber - 1]);
    axios.post(`${apiPath}bracket/888/888`, matchData).catch((error) => {
      console.error("Error making axios request:", error);
      // Handle the error as needed
    });
  };

  return (
    <Box
      my="1px"
      border="1px"
      height="55px"
      width="220px"
      key={seedId}
      position="relative"
    >
      <Box {...styler3}>
        <Box {...styler1}></Box>
        <Box {...styler2} />
      </Box>

      <Flex
        width="100%"
        py="1px"
        px="2px"
        justifyContent="space-between"
        _hover={{
          background: "teal",
          color: "white",
          "& > *": {
            background: "teal",
            color: "white",
          },
        }}
        onClick={handleClick}
        borderBottom="1px solid black"
      >
        <Text>{firstOppenent}</Text>
        {firstResult === null ? (
          <Text width="50px" bg="pink.100" px="3px" isTruncated>
            NULL
          </Text>
        ) : firstResult === false ? (
          <Text width="50px" bg="pink.100" px="3px" isTruncated>
            LOST
          </Text>
        ) : (
          <Text width="50px" bg="pink.100" px="3px" isTruncated>
            WON
          </Text>
        )}
      </Flex>
      <Flex
        width="100%"
        py="1px"
        px="2px"
        justifyContent="space-between"
        _hover={{
          background: "teal",
          color: "white",
          "& > *": {
            background: "teal",
            color: "white",
          },
        }}
        onClick={handleClick}
      >
        <Text>{secondOppenent}</Text>
        {secondResult === null ? (
          <Text width="50px" bg="pink.100" px="3px" isTruncated>
            NULL
          </Text>
        ) : secondResult === false ? (
          <Text width="50px" bg="pink.100" px="3px" isTruncated>
            LOST
          </Text>
        ) : (
          <Text width="50px" bg="pink.100" px="3px" isTruncated>
            WON
          </Text>
        )}
      </Flex>
    </Box>
  );
}

export default Seed;
