import React, { useRef, useEffect, useContext, useState } from "react";
import { Grid, Box, Flex, Text, Checkbox, Spacer } from "@chakra-ui/react";
import { GridContext } from "../../helpers/GridContext";

function LeftMiddleSeed() {
  const { gridWidth } = useContext(GridContext);
  const horizontalLineBottomLeftRef = useRef(null);
  const seedRef = useRef(null);

  useEffect(() => {
    const horizontalLineBottomLeft = horizontalLineBottomLeftRef.current;
    const verticalLineBottomLeft = horizontalLineBottomLeft.nextSibling;

    const seedValues = seedRef.current;

    if (horizontalLineBottomLeft && seedRef && verticalLineBottomLeft) {
      const seedWidth = seedValues.offsetWidth;

      // console.log("1:", horizontalLineBottomLeft);
      // console.log("2", seedWidth);
      // console.log("3", verticalLineBottomLeft);

      horizontalLineBottomLeft.style.width = `${
        gridWidth.width / gridWidth.splits
      }px`;

      horizontalLineBottomLeft.style.minWidth = `${
        seedWidth + (170 - seedWidth) / 2
      }px`;

      horizontalLineBottomLeft.style.left = `-${
        (gridWidth.width / gridWidth.splits - seedValues.offsetWidth) / 2
      }px`;

      const horizontalLineBottomLeftWidth =
        horizontalLineBottomLeft.offsetWidth;
      const horizontalLineBottomLeftHeight =
        horizontalLineBottomLeft.offsetHeight;
      verticalLineBottomLeft.style.top = `-${
        horizontalLineBottomLeftHeight + 114
      }px`;
      verticalLineBottomLeft.style.left = `-${
        horizontalLineBottomLeftWidth - 28
      }px`;
      verticalLineBottomLeft.style.width = "199%";
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
        ref={horizontalLineBottomLeftRef}
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

        <Spacer />

        <Flex>
          <Checkbox borderColor="black"></Checkbox>
        </Flex>
      </Flex>
    </Box>
  );
}

function RightSeedNextBottom() {
  return (
    <Box minWidth="120px">
      <LeftMiddleSeed />
    </Box>
  );
}

export default RightSeedNextBottom;
