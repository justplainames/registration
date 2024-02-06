import React, { useRef, useEffect, useContext, useState } from "react";
import { Grid, Box, Flex, Text, Checkbox, Spacer } from "@chakra-ui/react";
import { GridContext } from "../../helpers/GridContext";

function LeftMiddleSeed() {
  const { gridWidth } = useContext(GridContext);
  const horizontalLineTopLeftRef = useRef(null);
  const seedRef = useRef(null);

  useEffect(() => {
    const horizontalLineTopLeft = horizontalLineTopLeftRef.current;
    const verticalLineTopLeft = horizontalLineTopLeft.nextSibling;

    const seedValues = seedRef.current;

    if (horizontalLineTopLeft && seedRef && verticalLineTopLeft) {
      const seedWidth = seedValues.offsetWidth;

      // console.log("1:", horizontalLineTopLeft);
      // console.log("2", seedWidth);
      // console.log("3", verticalLineTopLeft);

      horizontalLineTopLeft.style.width = `${
        gridWidth.width / gridWidth.splits
      }px`;

      horizontalLineTopLeft.style.minWidth = `${
        seedWidth + (170 - seedWidth) / 2
      }px`;

      horizontalLineTopLeft.style.left = `-${
        (gridWidth.width / gridWidth.splits - seedValues.offsetWidth) / 2
      }px`;

      const horizontalLineTopLeftWidth = horizontalLineTopLeft.offsetWidth;
      const horizontalLineTopLeftHeight = horizontalLineTopLeft.offsetHeight;
      verticalLineTopLeft.style.top = `${horizontalLineTopLeftHeight + 113}px`;
      verticalLineTopLeft.style.right = `-${
        horizontalLineTopLeftWidth - 144
      }px`;
      verticalLineTopLeft.style.width = "199%";
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
        ref={horizontalLineTopLeftRef}
      ></Box>
      <Box
        content="''"
        border="2px"
        bg="black"
        position="relative"
        transform="rotate(90deg)"
      ></Box>

      <Flex direction="row" maxWidth="150px" margin="2px">
        <Flex direction="column" maxWidth="110px">
          <Text maxW="90px">It's14CharLong</Text>
        </Flex>

        <Flex>
          <Checkbox borderColor="black"></Checkbox>
        </Flex>
      </Flex>
    </Box>
  );
}

function LeftSeedNextTop() {
  return (
    <Box minWidth="120px">
      <LeftMiddleSeed />
    </Box>
  );
}

export default LeftSeedNextTop;
