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

function TopRightSeed() {
  const { gridWidth } = useContext(GridContext);
  const horizontalLineTopRightRef = useRef(null);
  const seedRef = useRef(null);

  useEffect(() => {
    const horizontalLineTopRight = horizontalLineTopRightRef.current;
    const verticalLineTopRight = horizontalLineTopRight.nextSibling;
    const seedValues = seedRef.current;

    if (horizontalLineTopRight && verticalLineTopRight && seedValues) {
      const horizontalLineTopRightWidth = horizontalLineTopRight.offsetWidth;
      const horizontalLineTopRightHeight = horizontalLineTopRight.offsetHeight;
      const seedWidth = seedValues.offsetWidth;

      horizontalLineTopRight.style.minWidth = `${
        seedWidth + (170 - seedWidth) / 2
      }px`;
      horizontalLineTopRight.style.width = `${
        gridWidth.width / (gridWidth.splits * 2) + seedWidth / 2
      }px`;
      horizontalLineTopRight.style.left = `-${
        (gridWidth.width / gridWidth.splits - seedWidth) / 2 + 1
      }px`;

      verticalLineTopRight.style.top = `${horizontalLineTopRightHeight + 55}px`;
      verticalLineTopRight.style.right = `${
        horizontalLineTopRightWidth - 62
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
        ref={horizontalLineTopRightRef}
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

function BottomRightSeed() {
  const { gridWidth } = useContext(GridContext);
  const horizontalLineBottomRightRef = useRef(null);
  const seedRef = useRef(null);

  useEffect(() => {
    const horizontalLineBottomRight = horizontalLineBottomRightRef.current;
    const verticalLineBottomRight = horizontalLineBottomRight.nextSibling;
    const seedValues = seedRef.current;

    if (horizontalLineBottomRight && verticalLineBottomRight && seedValues) {
      const seedWidth = seedValues.offsetWidth;

      horizontalLineBottomRight.style.minWidth = `${
        seedWidth + (170 - seedWidth) / 2
      }px`;
      horizontalLineBottomRight.style.width = `${
        gridWidth.width / (gridWidth.splits * 2) + seedWidth / 2
      }px`;

      horizontalLineBottomRight.style.left = `-${
        (gridWidth.width / gridWidth.splits - seedWidth) / 2 + 1
      }px`;

      const horizontalLineBottomRightWidth =
        horizontalLineBottomRight.offsetWidth;
      const horizontalLineBottomRightHeight =
        horizontalLineBottomRight.offsetHeight;

      verticalLineBottomRight.style.top = `${
        horizontalLineBottomRightHeight - 62
      }px `;
      verticalLineBottomRight.style.right = `${
        horizontalLineBottomRightWidth - 62
      }px`;
      // verticalLineBottomRight.style.width = `70%`;
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
        ref={horizontalLineBottomRightRef}
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

function RightSeeds() {
  return (
    <Box minWidth="120px">
      <TopRightSeed />
      <BottomRightSeed />
    </Box>
  );
}

export default RightSeeds;
