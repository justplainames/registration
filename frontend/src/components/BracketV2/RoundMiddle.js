import React, { useState, useContext } from "react";
import { MatchContext } from "../../helpers/MatchContext";
import Seed from "./Seed";
import { HStack } from "@chakra-ui/react";

function RoundMiddle() {
  return (
    <HStack>
      <Seed seedNumber={1} bracket={"finals"} />
    </HStack>
  );
}

export default RoundMiddle;
