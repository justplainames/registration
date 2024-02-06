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

function TopLeftSeed() {
  const { gridWidth } = useContext(GridContext);
  const horizontalLineTopLeftRef = useRef(null);
  const seedRef = useRef(null);

  useEffect(() => {
    const horizontalLineTopLeft = horizontalLineTopLeftRef.current;
    const verticalLineTopLeft = horizontalLineTopLeft.nextSibling;
    const seedValues = seedRef.current;

    if (horizontalLineTopLeft && verticalLineTopLeft && seedValues) {
      const horizontalLineTopLeftWidth = horizontalLineTopLeft.offsetWidth;
      const horizontalLineTopLeftHeight = horizontalLineTopLeft.offsetHeight;
      const seedWidth = seedValues.offsetWidth;

      horizontalLineTopLeft.style.minWidth = `${
        seedWidth + (170 - seedWidth) / 2
      }px`;

      horizontalLineTopLeft.style.width = `${
        gridWidth.width / (gridWidth.splits * 2) + seedWidth / 2
      }px`;

      verticalLineTopLeft.style.top = `${horizontalLineTopLeftHeight + 55}px`;
      verticalLineTopLeft.style.right = `-${horizontalLineTopLeftWidth - 61}px`;
      // verticalLineTopLeft.style.width = `70%`;
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

function BottomLeftSeed() {
  const { gridWidth } = useContext(GridContext);
  const horizontalLineBottomLeftRef = useRef(null);
  const seedRef = useRef(null);

  useEffect(() => {
    const horizontalLineBottomLeft = horizontalLineBottomLeftRef.current;
    const verticalLineBottomLeft = horizontalLineBottomLeft.nextSibling;
    const seedValues = seedRef.current;

    if (horizontalLineBottomLeft && verticalLineBottomLeft && seedRef) {
      const horizontalLineBottomLeftWidth =
        horizontalLineBottomLeft.offsetWidth;
      const horizontalLineBottomLeftHeight =
        horizontalLineBottomLeft.offsetHeight;
      const seedWidth = seedValues.offsetWidth;

      horizontalLineBottomLeft.style.minWidth = `${
        seedWidth + (170 - seedWidth) / 2
      }px`;

      horizontalLineBottomLeft.style.width = `${
        gridWidth.width / (gridWidth.splits * 2) + seedWidth / 2
      }px`;

      verticalLineBottomLeft.style.top = `${
        horizontalLineBottomLeftHeight - 61
      }px `;
      verticalLineBottomLeft.style.right = `-${
        horizontalLineBottomLeftWidth - 61
      }px`;
      // verticalLineBottomLeft.style.width = `70%`;
    }
  }, [gridWidth]);

  return (
    <Box
      borderWidth="1px"
      borderColor="black"
      borderRadius="3px"
      maxWidth="150px"
      mb="100px"
      position="relative"
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

function Seed() {
  return (
    <Box minWidth="120px">
      <TopLeftSeed />
      <BottomLeftSeed />
    </Box>
  );
}

export default Seed;
