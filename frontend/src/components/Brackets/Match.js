import { Grid, Box, Center } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Rounds from "./Rounds";
import { GridContext } from "../../helpers/GridContext";

function Match({ column_number = 9 }) {
  const [gridWidth, setGridWidth] = useState({
    width: 0,
    splits: column_number,
  });
  useEffect(() => {
    const grid = document.getElementById("scoring-panel-grid");

    const handleResize = () => {
      if (grid) {
        setGridWidth((prevState) => ({
          ...prevState,
          width: grid.scrollWidth,
        }));
      }
    };

    if (grid) {
      setGridWidth({
        width: grid.scrollWidth,
        splits: column_number,
      });

      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [gridWidth]);

  return (
    <GridContext.Provider value={{ gridWidth, setGridWidth }}>
      <Grid
        templateColumns={`repeat(${column_number}, 1fr)`}
        id="scoring-panel-grid"
      >
        <Center>
          <Rounds number={[1, 1, 1, 1]} />
        </Center>
        <Center>
          <Rounds number={[1, 1]} />
        </Center>
        <Center>
          <Rounds number={[4, 5]} />
        </Center>
        <Center>
          <Rounds number={[8]} />
        </Center>
        <Center>
          <Rounds number={[2]} />
        </Center>
        <Center>
          <Rounds number={[9]} />
        </Center>
        <Center>
          <Rounds number={[6, 7]} />
        </Center>
        <Center>
          <Rounds number={[3, 3]} />
        </Center>
        <Center>
          <Rounds number={[3, 3, 3, 3]} />
        </Center>
      </Grid>
    </GridContext.Provider>
  );
}

export default Match;
