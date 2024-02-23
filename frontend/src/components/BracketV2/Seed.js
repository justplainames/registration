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
  console.log("NEXT MATCH ", nextMatch);
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
    // let next_match;
    // if (next_match_info) {
    //   const split = next_match_info.split("-");
    //   const bracket = `top${split[0]};`;
    //   console.log("fl;sdkhfsdkl;h", bracket);
    //   const seed = split[1];
    //   next_match = data.data.matches[bracket].find((match) => {
    //     return match.seed === seed;
    //   });
    // }

    // console.log("Current Match = ", match);
    // console.log("Next Match = ", next_match);
  }
  console.log("NEXT MATCH ", next_match_info);
  console.log("NEXT MATCH ", next_slot);

  useEffect(() => {}, [matchData]);

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

  const seedId = `${data.data.eventId}-${data.data.catId}-${data.data.matchType}-${seedNumber}`;
  const firstOppenent = match.first.stage_name;
  const secondOppenent = match.second.stage_name;
  const type = data.data.matchType.split("-").join("").toLocaleLowerCase();
  console.log("MAtchTYpE is ? = ", type);
  console.log("ASKLDJHASLKDHLASKJDHLASKJHDKLAJSDHKLAJSDH\n\n\n");
  console.log("MATCH INFO = ", match);
  console.log("NEXT MATCH INFO", next_match_info);

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
    }
  } else if (x_direction == "left") {
    styler3 = {
      position: "absolute",
      left: "-16px",
      top: "26px",
      // transform="translate(-50%, -50%)",
      width: "16px",
      height: "1px",
      backgroundColor: "black",
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
  } else {
    styler2 = {
      position: "absolute",
      left: "219px",
      top: "26px",
      // transform="translate(-50%, -50%)",
      width: "16px",
      height: "1px",
      backgroundColor: "black",
    };

    styler1 = {
      position: "absolute",
      left: "-16px",
      top: "26px",
      // transform="translate(-50%, -50%)",
      width: "16px",
      height: "1px",
      backgroundColor: "black",
    };
  }
  console.log("DATA IS ", data.data.matches);
  const handleClick = () => {
    console.log("Handle Click match", match);
    if (match.prevMatch === null) {
      console.log("So it came in here");
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
      // const temp = matchData;
      // console.log(temp.data.matches[bracket][seedNumber - 1]);
      axios
        .post(
          `${apiPath}bracket/updateStatus/${data.data.eventId}/${data.data.catId}/${type}`,
          matchData
        )
        .catch((error) => {
          console.error("Error making axios request:", error);
          // Handle the error as needed
        });
    } else {
      console.log("IT CAME HERE");
      if (
        data.data.matches[`top${match.prevMatch[0].split("-")[0]}`].find(
          (round) => {
            console.log("1", round.seed, match.prevMatch[0].split("-")[1]);
            return round.seed === parseInt(match.prevMatch[0].split("-")[1]);
          }
        ).seed_status != null &&
        data.data.matches[`top${match.prevMatch[1].split("-")[0]}`].find(
          (round) => {
            console.log("2", round.seed, match.prevMatch[0].split("-")[1]);
            return round.seed === parseInt(match.prevMatch[1].split("-")[1]);
          }
        ).seed_status != null
      ) {
        console.log(
          "IT PASSED DATA 1 =",
          data.data.matches[`top${match.prevMatch[0].split("-")[0]}`].find(
            (data) => {
              return data.seed === parseInt(match.prevMatch[0].split("-")[1]);
            }
          )
        );

        console.log(
          "IT PASSED DATA 2 =",
          data.data.matches[`top${match.prevMatch[1].split("-")[0]}`].find(
            (data) => {
              return data.seed === parseInt(match.prevMatch[1].split("-")[1]);
            }
          )
        );
        if (secondResult === null || secondResult === false) {
          console.log("ENTERED SECOND RESULT CHECK");
          setFirstResult(false);
          setSecondResult(true);

          if (next_match_info) {
            if (next_slot === "first") {
              console.log("ENTERED SECOND RESULT CHECK - First");
              next_match_info.first.stage_name = secondOppenent;
            } else {
              next_match_info.second.stage_name = secondOppenent;
            }
          }

          match.first.status = false;
          match.second.status = true;
          setMatchData({ ...matchData });
        } else {
          console.log("ENTERED First RESULT CHECK Failed");
          setFirstResult(true);
          setSecondResult(false);

          if (next_match_info) {
            if (next_slot === "first") {
              console.log("ENTERED First  RESULT CHECK - First");
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
        // const temp = matchData;
        // console.log(temp.data.matches[bracket][seedNumber - 1]);
        axios
          .post(
            `${apiPath}bracket/updateStatus/${data.data.eventId}/${data.data.catId}/${type}`,
            matchData
          )
          .catch((error) => {
            console.error("Error making axios request:", error);
            // Handle the error as needed
          });
      } else {
        showToast();
      }
    }
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
        onClick={roleState === "admin" ? handleClick : null}
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
        onClick={roleState === "admin" ? handleClick : null}
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
