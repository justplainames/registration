import React from "react";
import Seed from "./Seed";
import { HStack } from "@chakra-ui/react";

function RoundMiddle() {
  return (
    <HStack>
      <Seed
        nextMatch={null}
        seedNumber={1}
        bracket={"finals"}
        xDirection="middle"
      />
    </HStack>
  );
}

export default RoundMiddle;
