import React, { useState, useContext } from "react";
import { MatchContext } from "../../helpers/MatchContext";
import Seed from "./Seed";
import { HStack } from "@chakra-ui/react";

function RoundMiddle() {
  return (
    <HStack>
      <Seed
        nextMatch={null}
        seedNumber={1}
        bracket={"finals"}
        x_direction="middle"
      />
    </HStack>
  );
}

export default RoundMiddle;
