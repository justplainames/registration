import React, { useState, useContext } from "react";
import { MatchContext } from "../../helpers/MatchContext";
import Seed from "./Seed";
import { HStack, Box, VStack } from "@chakra-ui/react";

function RoundLeft() {
  const { matchData, setMatchData } = useContext(MatchContext);
  let check = parseInt(matchData.data.matchType.split("-")[1]) || null;

  let fullComponents = [];
  const largest = check / 2;

  function calculateSpacing2(numberOfColumns, numberOfBlocks, columnIndex) {
    const numberOfSeeds = 2 ** numberOfColumns;
    const maxHeight = (largest * 55) / 2;
    const addedHeight = maxHeight + (largest / 2 - 1) * 30;

    if (maxHeight === numberOfBlocks * 55) {
      return 46;
    } else {
      const current =
        addedHeight - ((columnIndex - 1) ** 2 + (columnIndex - 1) + 1) * 85;

      const numberOfGaps = numberOfBlocks - 1;
      const totalGapSize = numberOfBlocks * 55;
      return (current - totalGapSize) / numberOfGaps / 2 + 31;
    }
  }
  let count = 0;
  if (matchData) {
    while (check !== 1 && matchData.data.matches[`top${check}`]) {
      const column = [];
      let counter = Math.floor(check / 4);
      matchData.data.matches[`top${check}`].every((array, _) => {
        if (parseInt(counter) === 0) {
          check = Math.floor(check / 2);
          return false;
        }
        if (array.seed % 2 === 1) {
          column.push(
            <Seed
              nextMatch={array.nextMatch}
              seedNumber={array.seed}
              bracket={`top${check}`}
              connectorHeight={calculateSpacing2(
                Math.log2(check) - 1,
                check / 4,
                count
              )}
              y_direction={Math.floor(array.seed / 2) % 2 === 1 ? "up" : "down"}
              x_direction="right"
            />
          );
          counter -= 1;
        }
        return true;
      });
      count += 1;
      fullComponents.push(column);
    }
  }

  const numberOfColumns = fullComponents.length;
  const numberOfSeeds = 2 ** numberOfColumns;
  const maxHeight = (numberOfSeeds * 55) / 2;
  const addedHeight = maxHeight + (numberOfSeeds / 2 - 1) * 30;

  function calculateSpacing(numberOfBlocks, columnIndex) {
    if (maxHeight === numberOfBlocks * 55) {
      return 30;
    } else {
      const current =
        addedHeight - ((columnIndex - 1) ** 2 + (columnIndex - 1) + 1) * 85;

      const numberOfGaps = numberOfBlocks - 1;
      const totalGapSize = numberOfBlocks * 55;
      return (current - totalGapSize) / numberOfGaps;
    }
  }
  return (
    <HStack spacing="30px">
      {fullComponents.map((column, columnIndex) => (
        <Box>
          <VStack spacing={`${calculateSpacing(column.length, columnIndex)}px`}>
            {column.map((seedComponent, seedIndex) => (
              <Box>{seedComponent}</Box>
            ))}
          </VStack>
        </Box>
      ))}
    </HStack>
  );
}

export default RoundLeft;
