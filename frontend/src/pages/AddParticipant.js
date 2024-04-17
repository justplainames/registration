// External Libraries
import React, { useState, useEffect } from "react";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

// Styling Libraries
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Flex,
  Button,
  CheckboxGroup,
  Tooltip,
  Heading,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { chakraSelectStyles } from "../customThemes/ChakraStyles";

export default function AddParticipant() {
  // const [userData, setUserData] = useState({

  // })
  const [availableOptions, setAvailableOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [listOfUsers, setListOfUsers] = useState([]);
  const [isTooltipOpen, setIsTooltipOpen] = useState({});
  const [paid, setPaid] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const apiPath = process.env.REACT_APP_API_PATH;
  const eventId = sessionStorage.getItem("eventId");

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessTokenSilently();
      try {
        const [categories, users] = await Promise.all([
          await axios.get(
            `${apiPath}/addParticipant/getCategories/${eventId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          await axios.get(`${apiPath}/addParticipant/getUsers`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const firstUserData = await axios.get(
          `${apiPath}/addParticipant/getUserCategory/${eventId}/${users.data[0].user_id_pk}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setSelectedUser(users.data[0] || null);
        setCategoryOptions(categories.data);
        setAvailableOptions(firstUserData.data);
        setListOfUsers(users.data);

        setIsTooltipOpen(
          categories.data.reduce((acc, current) => {
            acc[current.category_id_pk] = false;
            return acc;
          }, {})
        );
      } catch (error) {
        console.error(
          "Error fetching data needed to add participants: ",
          error
        );
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (event) => {
    const category_id = parseInt(event.target.name);

    setSelectedCategories((prev) => {
      const current = [...prev];
      if (current.includes(category_id)) {
        const index = current.indexOf(category_id);
        current.splice(index, 1);
      } else {
        current.push(category_id);
      }
      return current;
    });
  };

  const handleUserChange = async (event) => {
    const user = listOfUsers.find((row) => row.user_id_pk === event.value);
    setSelectedUser(user || null);

    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get(
        `${apiPath}/addParticipant/getUserCategory/${sessionStorage.getItem(
          "eventId"
        )}/${event.value}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAvailableOptions(response.data);
    } catch (error) {
      console.error("Error fetching user category data:", error);
    }
  };

  const handlePaid = () => {
    if (!paid) {
      setPaid(true);
    } else {
      setPaid(false);
    }
  };

  const handleTooltipEnter = (e) => {
    setIsTooltipOpen((prev) => ({
      ...prev,
      [e]: true,
    }));
  };

  const handleTooltipExit = (e) => {
    setIsTooltipOpen((prev) => ({
      ...prev,
      [e]: false,
    }));
  };

  const handleSubmit = async (event, navigate) => {
    event.preventDefault();
    const token = await getAccessTokenSilently();
    const formData = new FormData(event.target);

    // Call the action with required parameters
    addParticipantAction({ formData, token, navigate });
  };

  return (
    <Box shadow="1px 1px 3px rgba(0,0,0,0.3)" p={6} m="10px auto">
      <Heading
        w="100%"
        textAlign={"center"}
        textColor="white"
        fontWeight="normal"
        mb="2%"
      >
        Add Participant
      </Heading>
      <Select
        name="user"
        w="100%"
        textAlign={"center"}
        mb="2%"
        value={
          selectedUser
            ? { value: selectedUser.user_id_pk, label: selectedUser.user_name }
            : { value: "", label: "" }
        }
        onChange={(selectedUser) => handleUserChange(selectedUser)}
        chakraStyles={chakraSelectStyles}
        options={listOfUsers.map((user) => ({
          value: user.user_id_pk,
          label: user.user_name,
        }))}
      />

      <Form
        method="post"
        action="/addParticipant"
        onSubmit={(event) => handleSubmit(event, navigate)}
      >
        <Input
          type="hidden"
          name="event_id_pk"
          value={sessionStorage.getItem("eventId")}
        />
        <Input
          type="hidden"
          name="user_id_pk"
          value={selectedUser ? selectedUser.user_id_pk : ""}
        />

        <input
          type="hidden"
          name="selected_categories"
          value={JSON.stringify(selectedCategories)}
          margin="40px"
        />

        <input type="hidden" name="user_paid" value={paid} />

        <FormControl textColor="white" mt="2%">
          <FormLabel>Participant Name</FormLabel>
          <Input
            focusBorderColor="orange.400"
            textColor="white"
            type="text"
            name="user_name"
            value={selectedUser ? selectedUser.user_name : ""}
            readOnly
          />
        </FormControl>

        <FormControl textColor="white" mt="2%">
          <FormLabel>user Instagram</FormLabel>
          <Input
            focusBorderColor="orange.400"
            textColor="white"
            type="text"
            name="user_instagram"
            value={selectedUser ? selectedUser.user_instagram : ""}
            readOnly
          />
        </FormControl>

        <FormControl textColor="white" mt="2%">
          <FormLabel>Phone Number</FormLabel>
          <Input
            focusBorderColor="orange.400"
            textColor="white"
            type="text"
            name="user_phone_number"
            value={selectedUser ? selectedUser.user_phone_number : ""}
            readOnly
          />
        </FormControl>

        <FormControl textColor="white" mt="2%">
          <FormLabel>Participant Email</FormLabel>
          <Input
            focusBorderColor="orange.400"
            textColor="white"
            type="text"
            name="user_email"
            value={selectedUser ? selectedUser.user_email : ""}
            readOnly
          />
        </FormControl>

        <FormControl textColor="white" mt="2%" style={{ maxWidth: "none" }}>
          <FormLabel>Categories:</FormLabel>
          <CheckboxGroup name="test">
            <Flex alignItems="center">
              {availableOptions.length !== 0 ? (
                categoryOptions.map((category) =>
                  availableOptions.find(
                    (row) => row.category_id_pk === category.category_id_pk
                  ) ? (
                    <Flex alignItems="center" mr={4}>
                      <Checkbox
                        name={category.category_id_pk}
                        size="lg"
                        onChange={(event) => {
                          handleCheckboxChange(event);
                        }}
                      />
                      <FormLabel ml={2} mb={0}>
                        {category.category_name}
                      </FormLabel>
                    </Flex>
                  ) : (
                    <Flex alignItems="center" mr={4}>
                      <Tooltip
                        name={category.category_id_pk}
                        label="User has already joined this category"
                        placement="top"
                        isOpen={isTooltipOpen[category.category_id_pk]}
                      >
                        <Checkbox
                          name={category.category_id_pk}
                          size="lg"
                          isDisabled={true}
                          onMouseEnter={() => {
                            handleTooltipEnter(category.category_id_pk);
                          }}
                          onMouseLeave={() => {
                            handleTooltipExit(category.category_id_pk);
                          }}
                        />
                      </Tooltip>
                      <FormLabel
                        ml={2}
                        mb={0}
                        textColor="gray.700"
                        style={{ textDecoration: "line-through" }}
                      >
                        {category.category_name}
                      </FormLabel>
                    </Flex>
                  )
                )
              ) : (
                <div>User has already joined all events</div>
              )}
            </Flex>
          </CheckboxGroup>
        </FormControl>

        <FormControl textColor="white" mt="2%" style={{ maxWidth: "none" }}>
          <Flex alignItems="center" mr={4}>
            <Checkbox
              name="user_paid"
              size="lg"
              onChange={() => {
                handlePaid();
              }}
            />
            <FormLabel ml={2} mb={0}>
              Has the participant paid?
            </FormLabel>
          </Flex>
        </FormControl>
        <Button
          type="submit"
          mt="2%"
          mr="2%"
          w="7rem"
          bg="rgb(237,137,51)"
          textColor="gray.900"
          _hover={{
            textDecoration: "none",
            bg: "rgb(213,123,45)",
          }}
        >
          Submit
        </Button>
      </Form>
    </Box>
  );
}

export const addParticipantAction = async ({ formData, token, navigate }) => {
  const data = formData;
  const apiPath = process.env.REACT_APP_API_PATH;

  const user = {
    user_id_pk: data.get("user_id_pk"),
    user_name: data.get("user_name"),
    user_email: data.get("user_email"),
    user_instagram: data.get("user_instagram"),
    user_phone_number: data.get("user_phone_number"),
    user_categories: JSON.parse(data.get("selected_categories")),
    // user_paid: JSON.parse(data.get("user_paid")),
  };

  axios
    .post(`${apiPath}/addParticipant/${data.get("event_id_pk")}`, user, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => {
      console.error("Error making axios request:", error);
      // Handle the error as needed
    });
  return navigate("/participants");
};
