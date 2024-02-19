import React from "react";
import { Box, Text } from "@chakra-ui/react";
import break1 from "./break1.jpg";

function LandingPage() {
  return (
    <Box
      position="relative"
      backgroundImage={`url(${break1})`}
      height="100vh"
      width="100vh"
      // backgroundColor="blue"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        height="100%"
        background="linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.5))"
      >
        <Text color="white" fontSize="5xl" w="50%">
          Just Dance.
        </Text>
      </Box>
    </Box>
  );
}

export default LandingPage;
