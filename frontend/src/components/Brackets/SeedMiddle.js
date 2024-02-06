import React, { useRef, useEffect, useContext, useState } from "react";
import { Grid, Box, Flex, Text, Checkbox, Spacer } from "@chakra-ui/react";
import { GridContext } from "../../helpers/GridContext";

function LeftMiddleSeed() {
  const { gridWidth } = useContext(GridContext);
  const horizontalLineMiddleRef = useRef(null);
  const seedRef = useRef(null);

  useEffect(() => {
    const horizontalLineMiddle = horizontalLineMiddleRef.current;
    const seedValues = seedRef.current;

    if (horizontalLineMiddle && seedRef) {
      horizontalLineMiddle.style.width = `${
        gridWidth.width / gridWidth.splits
      }px`;
      horizontalLineMiddle.style.left = `-${
        (gridWidth.width / gridWidth.splits - seedValues.offsetWidth) / 2
      }px`;
    }
  }, [gridWidth.width]);

  return (
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
        ref={horizontalLineMiddleRef}
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
  );
}

function SeedMiddle() {
  return (
    <Box minWidth="120px">
      <LeftMiddleSeed />
    </Box>
  );
}

export default SeedMiddle;
