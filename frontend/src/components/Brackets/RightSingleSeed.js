import React, { useRef, useEffect, useContext } from "react";
import {
  Grid,
  Box,
  Flex,
  Text,
  Checkbox,
  Spacer,
  grid,
} from "@chakra-ui/react";
import { GridContext } from "../../helpers/GridContext";

function RightSingleSeed() {
  const { gridWidth } = useContext(GridContext);
  const horizontalLineRef = useRef(null);
  const seedRef = useRef(null);

  useEffect(() => {
    const horizontalLine = horizontalLineRef.current;
    const seedValues = seedRef.current;

    if (horizontalLine && seedValues) {
      const seedWidth = seedValues.offsetWidth;

      horizontalLine.style.minWidth = `${seedWidth + (170 - seedWidth) / 2}px`;

      horizontalLine.style.width = `${gridWidth.width / gridWidth.splits}px`;
      horizontalLine.style.left = `-${
        (gridWidth.width / gridWidth.splits - seedValues.offsetWidth) / 2
      }px`;
    }
  }, [gridWidth.width]);

  return (
    <Box minWidth="120px">
      <Box
        borderWidth="1px"
        borderColor="black"
        borderRadius="3px"
        maxWidth="150px"
        mb="100px"
        position="relative"
        justify="center"
        align="center"
        ref={seedRef}
      >
        <Flex
          direction="row"
          maxWidth="150px"
          margin="2px"
          justifyContent="space-between"
        >
          <Flex direction="column">
            <Text maxW="90px">It'asdfsdafasdfasdfasfsdafasdf</Text>
          </Flex>

          <Flex>
            <Checkbox borderColor="black"></Checkbox>
          </Flex>
        </Flex>

        <Box
          border="2px"
          bg="black"
          position="absolute"
          ref={horizontalLineRef}
        ></Box>

        <Flex direction="row" maxWidth="150px" margin="2px">
          <Flex direction="column" maxWidth="110px">
            <Text maxW="90px">It's14CharLong</Text>
          </Flex>

          <Spacer />

          <Flex>
            <Checkbox borderColor="black"></Checkbox>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

export default RightSingleSeed;
