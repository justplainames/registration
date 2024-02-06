import React from "react";
import Seed from "./Seed";
import SeedMiddle from "./SeedMiddle";
import RightSeeds from "./RightSeeds";
import LeftSeedNextTop from "./LeftSeedNextTop";
import LeftSeedNextBottom from "./LeftSeedNextBottom";
import LeftSingleSeed from "./LeftSingleSeed";
import RightSingleSeed from "./RightSingleSeed";
import RightSeedNextBottom from "./RightSeedNextBottom";
import RightSeedNextTop from "./RightSeedNextTop";
import { Spacer, Text, Flex } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

function Rounds({ number, rounds }) {
  const components = () => {
    return number.map((number, index) => {
      let componentToRender;
      switch (number) {
        case 1:
          componentToRender = <Seed />;
          break;

        case 2:
          componentToRender = <SeedMiddle />;
          break;

        case 3:
          componentToRender = <RightSeeds />;
          break;
        case 4:
          componentToRender = <LeftSeedNextTop />;
          break;
        case 5:
          componentToRender = <LeftSeedNextBottom />;
          break;
        case 6:
          componentToRender = <RightSeedNextTop />;
          break;
        case 7:
          componentToRender = <RightSeedNextBottom />;
          break;
        case 8:
          componentToRender = <LeftSingleSeed />;
          break;
        case 9:
          componentToRender = <RightSingleSeed />;
          break;

        default:
          componentToRender = null; // or provide a default component
      }
      return componentToRender;
    });
  };

  return (
    <Box
      maxWidth="170px"
      minWidth="170px"
      minHeight="100%"
      display="flex"
      position="relative"
      flexDirection="column"
      id="round-column"
    >
      <Flex justifyContent="center" alignItems="center" marginBottom="50px">
        <Text>"MATCH TITLE"</Text>
      </Flex>
      {/* {Array.from({ length: 1 }).map((_, index) => (
        <Seed key={index} />
      ))} */}
      <Flex
        flex="1"
        justifyContent="space-around"
        alignItems="center"
        direction="column"
      >
        {components()}
      </Flex>
    </Box>
  );
}

export default Rounds;
