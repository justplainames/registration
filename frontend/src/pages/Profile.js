import {
  Badge,
  Stack,
  Image,
  Button,
  FormControl,
  Input,
  FormLabel,
  Tabs,
  Tab,
  TabList,
  Spacer,
  TabPanels,
  TabPanel,
  Card,
  Heading,
  Text,
  CardBody,
  SimpleGrid,
  Divider,
  Flex,
  CardHeader,
  CardFooter,
  TabIndicator,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
const Profile = () => {
  const apiPath = process.env.REACT_APP_API_PATH;
  const [userData, setUserData] = useState(null);
  const [userEvents, setUserEvents] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const userDataRef = useRef({});

  useEffect(() => {
    axios.get(`${apiPath}profile/getInfo`).then((response) => {
      userDataRef.current = response.data;
      setUserData(response.data);
    });

    axios.get(`${apiPath}profile/getEvents`).then((response) => {
      setUserEvents(response.data);
    });
  }, []);
  const handleSubmit = () => {
    axios.put(`${apiPath}profile/updateInfo`, userData).then((response) => {});
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setIsEditing(!isEditing);
    setUserData({ ...userDataRef.current });
    axios.get(`${apiPath}profile/getInfo`).then((response) => {
      userDataRef.current = response.data;
      setUserData(response.data);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Tabs p={3} variant="unstyled" defaultIndex={0} overflow="auto">
      <TabList>
        <Tab textColor="gray.200" _selected={{ textColor: "white" }}>
          Profile Settings
        </Tab>
        <Tab textColor="gray.200" _selected={{ textColor: "white" }}>
          Joined Events
        </Tab>
        <Spacer />
      </TabList>
      <TabIndicator
        mt="-1.5px"
        height="2px"
        bg="orange.400"
        borderRadius="1px"
      />
      <TabPanels>
        <TabPanel>
          {userData && (
            <FormControl textColor="white" mt="2%">
              <FormLabel>Name:</FormLabel>
              <Input
                focusBorderColor="orange.400"
                textColor="white"
                name="user_name"
                value={userData.user_name}
                readOnly={isEditing}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <FormLabel mt="2%">Email:</FormLabel>
              <Input
                focusBorderColor="orange.400"
                textColor="white"
                name="user_email"
                value={userData.user_email}
                readOnly={isEditing}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              ></Input>
              <FormLabel mt="2%">Instagram:</FormLabel>
              <Input
                focusBorderColor="orange.400"
                textColor="white"
                name="user_instagram"
                value={userData.user_instagram}
                readOnly={isEditing}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              ></Input>
              <FormLabel mt="2%">Phone Number:</FormLabel>
              <Input
                focusBorderColor="orange.400"
                textColor="white"
                name="user_phone_number"
                value={userData.user_phone_number}
                readOnly={isEditing}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              ></Input>
            </FormControl>
          )}

          {isEditing ? (
            <Button
              mt="2%"
              mr="2%"
              w="7rem"
              bg="rgb(237,137,51)"
              textColor="gray.900"
              _hover={{
                textDecoration: "none",
                bg: "rgb(213,123,45)",
              }}
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit Settings
            </Button>
          ) : (
            <Flex>
              <Button
                mt="2%"
                mr="2%"
                w="7rem"
                bg="rgb(237,137,51)"
                textColor="gray.900"
                _hover={{
                  textDecoration: "none",
                  bg: "rgb(213,123,45)",
                }}
                onClick={() => handleSubmit()}
              >
                Submit
              </Button>
              <Button
                mt="2%"
                w="7rem"
                borderColor="rgb(49, 212, 237)"
                backgroundColor="gray.200"
                onClick={() => handleCancel()}
              >
                Cancel
              </Button>
            </Flex>
          )}
        </TabPanel>
        <TabPanel>
          <SimpleGrid spacing={10} minChildWidth="300px">
            {userEvents ? (
              Object.keys(userEvents).map((event_id) => (
                <Card
                  key={event_id}
                  maxW={"320px"}
                  w={"full"}
                  bg="gray.900"
                  rounded={"lg"}
                  overflow={"hidden"}
                  textAlign={"center"}
                  borderTop="8px"
                  borderColor="orange.400"
                >
                  <CardHeader px="0" py="0">
                    <Image
                      src={
                        "https://images.unsplash.com/photo-1611435263641-4656c4b188c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGFuY2UlMjBiYXR0bGV8ZW58MHx8MHx8fDA%3D"
                      }
                      h={"215px"}
                      w={"full"}
                    />
                    <Heading textColor="white" as="h3" size="sm" mt="2%">
                      {userEvents[event_id][0]["Event.event_name"]}
                    </Heading>
                    <Text fontSize={"sm"} color={"gray.500"}>
                      Followers
                    </Text>
                  </CardHeader>
                  <CardBody>
                    <Stack
                      align={"center"}
                      justify={"center"}
                      direction={"row"}
                      wrap={"wrap"}
                    >
                      {userEvents[event_id].map((category, index) => (
                        <Badge
                          textColor="white"
                          px={2}
                          py={1}
                          bg="gray.800"
                          fontWeight={"400"}
                        >
                          {category["Category.category_name"]}
                        </Badge>
                      ))}
                    </Stack>
                  </CardBody>
                  <Divider borderColor="gray.350" />
                  <CardFooter textAlign="center"></CardFooter>
                </Card>
              ))
            ) : (
              <Heading>No Event Available</Heading>
            )}
          </SimpleGrid>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Profile;
