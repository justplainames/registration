import { Checkbox, Box, Text, Flex, useToast } from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from "react";
import { MatchContext } from "../../helpers/MatchContext";
import { RoleContext } from "../../helpers/RoleContext";
import axios from "axios";

// Seed ID will be eventNumber-CatNumber-bracket-(1-64)
function Seed({
  nextMatch,
  seedNumber,
  bracket,
  connectorHeight,
  y_direction,
  x_direction,
}) {
  // const apiPath = "https://registartion-backend.fly.dev/";
  const { roleState } = useContext(RoleContext);
  const apiPath = process.env.REACT_APP_API_PATH;
  const toast = useToast();
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
  const { matchData, setMatchData } = useContext(MatchContext);
  const data = matchData;
  let next_match_info;
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

    next_match_info =
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
  let styler1 = {};
  let styler2 = {};
  let styler3 = {};
  if (x_direction === "right") {
    styler3 = {
      position: "absolute",
      left: "219px",
      top: "26px",
      width: "16px",
      height: "1px",
      backgroundColor: "white",
    };
    if (next_match_info.round === 2) {
    } else {
      if (y_direction === "down") {
        styler1 = {
          position: "absolute",
          transform: "rotate(90deg)",
          left: `-${connectorLength / 2 - 16}px`,
          top: `${connectorLength / 2}px`,
          width: `${connectorLength}px`,
          height: "1px",
          backgroundColor: "white",
        };
        styler2 = {
          position: "absolute",
          left: `${16}px`,
          top: `${connectorLength}px`,
          width: "14px",
          height: "1px",
          backgroundColor: "white",
        };
      } else {
        styler1 = {
          position: "absolute",
          transform: "rotate(90deg)",
          left: `-${connectorLength / 2 - 16}px`,
          bottom: `${connectorLength / 2}px`,
          width: `${connectorLength}px`,
          height: "1px",
          backgroundColor: "white",
        };
        styler2 = {
          position: "absolute",
          left: `${16}px`,
          bottom: `${connectorLength - 5}px`,
          width: "14px",
          height: "1px",
          backgroundColor: "white",
        };
      }
    }
  } else if (x_direction == "left") {
    styler3 = {
      position: "absolute",
      left: "-16px",
      top: "26px",
      width: "16px",
      height: "1px",
      backgroundColor: "white",
    };
    if (next_match_info.round == 2) {
    } else {
      if (y_direction === "down") {
        styler1 = {
          position: "absolute",
          transform: "rotate(90deg)",
          right: `-${connectorLength / 2 - 16}px`,
          top: `${connectorLength / 2}px`,
          width: `${connectorLength}px`,
          height: "1px",
          backgroundColor: "white",
        };
        styler2 = {
          position: "absolute",
          right: `${16}px`,
          top: `${connectorLength}px`,
          width: "15px",
          height: "1px",
          backgroundColor: "white",
        };
      } else {
        styler1 = {
          position: "absolute",
          transform: "rotate(90deg)",
          left: `-${connectorLength / 2}px`,
          bottom: `${connectorLength / 2}px`,
          width: `${connectorLength}px`,
          height: "1px",
          backgroundColor: "white",
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
  } else {
    styler2 = {
      position: "absolute",
      left: "219px",
      top: "26px",
      width: "16px",
      height: "1px",
      backgroundColor: "white",
    };

    styler1 = {
      position: "absolute",
      left: "-16px",
      top: "26px",
      width: "16px",
      height: "1px",
      backgroundColor: "white",
    };
  }

  const handleClick = () => {
    if (match.prevMatch === null) {
      if (secondResult === null || secondResult === false) {
        setFirstResult(false);
        setSecondResult(true);

        if (next_slot === "first") {
          next_match_info.first.stage_name = secondOppenent;
        } else {
          next_match_info.second.stage_name = secondOppenent;
        }

        match.first.status = false;
        match.second.status = true;
        setMatchData({ ...matchData });
      } else {
        setFirstResult(true);
        setSecondResult(false);
        if (next_slot === "first") {
          next_match_info.first.stage_name = firstOppenent;
        } else {
          next_match_info.second.stage_name = firstOppenent;
        }
        match.first.status = true;
        match.second.status = false;
        setMatchData({ ...matchData });
      }
      match.seed_status = true;
      axios
        .post(
          `${apiPath}bracket/updateStatus/${data.data.eventId}/${data.data.catId}/${type}`,
          matchData
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

          if (next_match_info) {
            if (next_slot === "first") {
              next_match_info.first.stage_name = secondOppenent;
            } else {
              next_match_info.second.stage_name = secondOppenent;
            }
          }

          match.first.status = false;
          match.second.status = true;
          setMatchData({ ...matchData });
        } else {
          setFirstResult(true);
          setSecondResult(false);

          if (next_match_info) {
            if (next_slot === "first") {
              next_match_info.first.stage_name = firstOppenent;
            } else {
              next_match_info.second.stage_name = firstOppenent;
            }
          }

          match.first.status = true;
          match.second.status = false;
          setMatchData({ ...matchData });
        }
        match.seed_status = true;
        axios
          .post(
            `${apiPath}bracket/updateStatus/${data.data.eventId}/${data.data.catId}/${type}`,
            matchData
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
        width="100%"
        py="1px"
        px="2px"
        justifyContent="space-between"
        onClick={roleState.role === "admin" ? handleClick : null}
        borderBottom="1px solid white"
        _hover={{
          background: "gray.800",
          color: "white",
          "& > .seedStatusNull": {
            background: "gray.700",
            color: "white",
          },
          "& > .seedStatusLost": {
            background: "rgb(130,31,34)",
            color: "black",
          },
          "& > .seedStatusWon": {
            background: "rgb(213, 125, 47)",
            color: "black",
          },
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
        }}
      >
        <Text marginLeft="5px">{firstOppenent}</Text>
        {firstResult === null ? (
          <Text
            borderTopRightRadius="15px"
            borderLeftRadius="3px"
            width="50px"
            bg="gray.600"
            px="3px"
            className="seedStatusNull"
          >
            NULL
          </Text>
        ) : firstResult === false ? (
          <Text
            borderTopRightRadius="15px"
            borderLeftRadius="3px"
            textColor="white"
            width="50px"
            px="3px"
            bg="#9b2226"
            isTruncated
            className="seedStatusLost"
          >
            LOST
          </Text>
        ) : (
          <Text
            borderTopRightRadius="15px"
            borderLeftRadius="3px"
            textColor="gray.900"
            bg="rgb(237,137,51)"
            width="50px"
            px="3px"
            isTruncated
            className="seedStatusWon"
          >
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
          background: "gray.800",
          color: "white",
          "& > .seedStatusNull": {
            background: "gray.700",
            color: "white",
          },
          "& > .seedStatusLost": {
            background: "rgb(130,31,34)",
            color: "black",
          },
          "& > .seedStatusWon": {
            background: "rgb(213, 125, 47)",
            color: "black",
          },
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
        }}
        onClick={roleState.role === "admin" ? handleClick : null}
      >
        <Text marginLeft="5px">{secondOppenent}</Text>
        {secondResult === null ? (
          <Text
            borderBottomRightRadius="15px"
            borderLeftRadius="3px"
            width="50px"
            bg="gray.600"
            px="3px"
            isTruncated
            className="seedStatusNull"
          >
            NULL
          </Text>
        ) : secondResult === false ? (
          <Text
            borderBottomRightRadius="15px"
            borderLeftRadius="3px"
            textColor="white"
            bg="#9b2226"
            width="50px"
            px="3px"
            isTruncated
            className="seedStatusLost"
          >
            LOST
          </Text>
        ) : (
          <Text
            borderBottomRightRadius="15px"
            borderLeftRadius="3px"
            textColor="gray.900"
            bg="rgb(237,137,51)"
            width="50px"
            px="3px"
            isTruncated
            className="seedStatusWon"
          >
            WON
          </Text>
        )}
      </Flex>
    </Box>
  );
}

export default Seed;
