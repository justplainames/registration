import {
  Box,
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  useEditableControls,
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
} from "@chakra-ui/react";
import react, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
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
      console.log(response.data);
      setUserData(response.data);
    });

    axios.get(`${apiPath}profile/getEvents`).then((response) => {
      setUserEvents(response.data);
      console.log(response.data);
    });
  }, []);
  const handleSubmit = () => {
    axios.put(`${apiPath}profile/updateInfo`, userData).then((response) => {
      console.log(response.data);
    });
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setIsEditing(!isEditing);
    setUserData({ ...userDataRef.current });
    axios.get(`${apiPath}profile/getInfo`).then((response) => {
      userDataRef.current = response.data;
      console.log(response.data);
      setUserData(response.data);
    });
    console.log(userData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Tabs
      mt="40px"
      p="20px"
      colorScheme="purple"
      variant="enclosed"
      defaultIndex={0}
    >
      <TabList>
        <Tab>Profile Settings</Tab>
        <Tab>Joined Events</Tab>
        <Spacer />
      </TabList>
      <TabPanels>
        <TabPanel>
          {userData && (
            <FormControl>
              <FormLabel>Name:</FormLabel>
              <Input
                name="user_name"
                value={userData.user_name}
                readOnly={isEditing}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <FormLabel>Email:</FormLabel>
              <Input
                name="user_email"
                value={userData.user_email}
                readOnly={isEditing}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              ></Input>
              <FormLabel>Instagram:</FormLabel>
              <Input
                name="user_instagram"
                value={userData.user_instagram}
                readOnly={isEditing}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              ></Input>
              <FormLabel>Phone Number:</FormLabel>
              <Input
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
            <Button onClick={() => setIsEditing(!isEditing)}>
              {" "}
              Edit Settings
            </Button>
          ) : (
            <>
              <Button onClick={() => handleSubmit()}>Submit</Button>
              <Button onClick={() => handleCancel()}>Cancel</Button>
            </>
          )}
        </TabPanel>
        <TabPanel>
          <SimpleGrid spacing={10} minChildWidth="300px">
            {userEvents ? (
              Object.keys(userEvents).map((event_id) => (
                <Card
                  key={event_id}
                  borderTop="8px"
                  borderColor="purple.400"
                  bg="white"
                >
                  <CardHeader>
                    <Flex gap={5}>
                      {/* <Avatar src={event.img} /> */}
                      <Box>
                        <Heading as="h3" size="sm">
                          {event_id}
                        </Heading>
                        <Text>{event_id}</Text>
                      </Box>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    {userEvents[event_id].map((category, index) => (
                      <Text key={index}>
                        {category["Category.category_name"]}
                      </Text>
                    ))}
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

{
  /* function EditableControls() {
    // Access this 4 components
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    // Get Default onClick behavior for the submit button
    const handleDefaultSubmit = getSubmitButtonProps().onClick;

    // Create a custom onClick Behaviour and add the handleDeafaultSubmit behaviour
    const handleCustomSubmit = (event) => {
      event.preventDefault();
      console.log("Submitted", event.target.value);
      axios.put(`${apiPath}profile/updateInfo`);

      handleDefaultSubmit();
    };

    // Get Default onClick behavior for the cancel button
    const handleDefaultCancel = getCancelButtonProps().onClick;
    // Create a custom onClick Behaviour and add the handleDeafaultCancel behaviour
    const handleCustomCancel = (event) => {
      event.preventDefault();
      console.log("Cancelling", userNameRef.current);
      setUserName(userNameRef.current);
      handleDefaultCancel();
    };

    // Now get the default submit button behaviour and change the onClick behaviour with customised button above
    const customSubmitButtonProps = {
      ...getSubmitButtonProps(),
      onClick: handleCustomSubmit,
    };

    const customCancelbuttonProps = {
      ...getCancelButtonProps(),
      onClick: handleCustomCancel,
    };

    return isEditing ? (
      <ButtonGroup>
        <Button {...customSubmitButtonProps}> Submit! </Button>
        <Button {...customCancelbuttonProps}> Cancel </Button>
      </ButtonGroup>
    ) : (
      <Button {...getEditButtonProps()}>Edit</Button>
    );
  } */
}
