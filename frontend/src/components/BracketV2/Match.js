import React, { useState, useEffect, useContext } from "react";
import { MatchContext } from "../../helpers/MatchContext";
import RoundLeft from "./RoundLeft";
import { HStack } from "@chakra-ui/react";
import RoundMiddle from "./RoundMiddle";
import RoundRight from "./RoundRight";
import { useAuth0 } from "@auth0/auth0-react";
function Match(data) {
  const { user } = useAuth0();
  const [matchData, setMatchData] = useState(null);
  const [toRender, setToRender] = useState([]);
  const [roleState, setRoleState] = useState("");

  useEffect(() => {
    setRoleState(user["http://localhost:3000/roles"][0]);
    setMatchData(data);
    updateMatchData();
  }, []);

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
    <MatchContext.Provider value={{ matchData, setMatchData, roleState }}>
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
