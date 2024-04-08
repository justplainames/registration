import React, { useState, useEffect } from "react";
import axios from "axios";
import { Heading, Button, Box } from "@chakra-ui/react";
import { IconPoo } from "@tabler/icons-react";
import { Icon } from "@chakra-ui/react";

function FullstackTest() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("https://registartion-backend.fly.dev/home")
      .then((response) => {
        setCount(response.data.counts);
      })
      .catch((error) => {
        console.error("Error Fetching Data: ", error);
      });
  }, []);

  const increaseNumber = () => {
    axios
      .put("https://registartion-backend.fly.dev/home")
      .then(() => {
        axios
          .get("https://registartion-backend.fly.dev/home")
          .then((response) => {
            setCount(response.data.counts);
            console.log("Value Increased");
          })
          .catch((error) => {
            console.log("Error fetcing updated data: ", error);
          });
      })
      .catch((error) => {
        console.log("Error increasing data: ", error);
      });
  };

  return (
    <Box
      as="section"
      height="100vh" // Set height to 100% of viewport height
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Icon as={IconPoo} boxSize={100} ml={2} color="purple.400" />
      <Heading p="10px" style={{ textAlign: "center" }}>
        {count}
      </Heading>
      <Button
        onClick={() => {
          increaseNumber();
        }}
      >
        Increase
      </Button>
    </Box>
  );
}

export default FullstackTest;
