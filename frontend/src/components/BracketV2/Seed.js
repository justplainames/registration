import { Checkbox, Box, Text, Flex } from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { MatchContext } from "../../helpers/MatchContext";

// Seed ID will be eventNumber-CatNumber-bracket-(1-64)
function Seed({
  seedNumber,
  bracket,
  connectorHeight,
  y_direction,
  x_direction,
}) {
  console.log("y_direction = ", y_direction);
  const { matchData, setMatchData } = useContext(MatchContext);
  const data = matchData;
  const match = data.data.matches[bracket].find(
    (match) => match.seed === seedNumber
  );

  const [firstResult, setFirstResult] = useState(match.first.status);
  const [secondResult, setSecondResult] = useState(match.second.status);

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
        onClick={() => {
          if (firstResult === null || firstResult === false) {
            setFirstResult(true);
            setSecondResult(false);
          } else {
            setFirstResult(false);
            setSecondResult(true);
          }
        }}
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
        onClick={() => {
          if (secondResult === null || secondResult === false) {
            setFirstResult(false);
            setSecondResult(true);
          } else {
            setFirstResult(true);
            setSecondResult(false);
          }
        }}
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
