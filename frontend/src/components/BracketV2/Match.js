import React, { useState, useEffect, useContext } from "react";
import { MatchContext } from "../../helpers/MatchContext";
import Seed from "./Seed";
import RoundLeft from "./RoundLeft";
import { HStack, Box } from "@chakra-ui/react";
import RoundMiddle from "./RoundMiddle";
import RoundRight from "./RoundRight";
function Match(data) {
  const [matchData, setMatchData] = useState(null);
  const [toRender, setToRender] = useState([]);

  useEffect(() => {
    setMatchData(data);
    updateMatchData();
  }, []);

  useEffect(() => {
    setMatchData(data);
  }, [data]);

  useEffect(() => {
    updateMatchData();
  }, [matchData]);

  const updateMatchData = () => {
    if (matchData) {
      const roundLeft = <RoundLeft />;
      const roundMiddle = <RoundMiddle />;
      const roundRight = <RoundRight />;
      setToRender([roundLeft, roundMiddle, roundRight]);
    }
  };

  return (
    <MatchContext.Provider value={{ matchData, setMatchData }}>
      {matchData ? (
        <HStack spacing="30px">
          {toRender.map((comp, index) => (
            <React.Fragment key={index}>{comp}</React.Fragment>
          ))}
        </HStack>
      ) : (
        <div>Loading...matchData</div>
      )}
    </MatchContext.Provider>
  );
}

export default Match;
