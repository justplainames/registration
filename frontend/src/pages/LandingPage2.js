import React from "react";
import {
  Box,
  Text,
  Stack,
  Flex,
  Heading,
  Button,
  Image,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
// import break1 from "./break1.jpg";
import SmoothScrollLinks from "./SmoothScrollLinks";

function LandingPage2() {
  return (
    <div id="landingPage2">
      <Flex
      // w={"full"}
      // h={"100vh"}
      // backgroundImage={`radial-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1609602726003-77a7bf096919?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`}
      // backgroundSize={"cover"}
      // backgroundPosition={"center center"}
      >
        <VStack
          w={"full"}
          justify={"center"}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
        >
          <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
            <Text
              color={"white"}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
            >
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
              eiusmod tempor
            </Text>
            <Stack direction={"row"}>
              <Button
                bg={"orange.400"}
                rounded={"full"}
                color={"white"}
                _hover={{ bg: "orange.500" }}
              >
                Show me more
              </Button>
              <Button
                bg={"whiteAlpha.300"}
                rounded={"full"}
                color={"white"}
                _hover={{ bg: "whiteAlpha.500" }}
              >
                Show me more
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
      <SmoothScrollLinks />
    </div>
  );
}

export default LandingPage2;
