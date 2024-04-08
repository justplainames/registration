import React, { useContext, useState, useEffect } from "react";
import { Form, redirect } from "react-router-dom";
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
import { EventContext } from "../helpers/EventContext";
import axios from "axios";

export default function AddParticipant() {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [availableOptions, setAvailableOptions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [paid, setPaid] = useState(false);
  const [listOfUsers, setListOfUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isTooltipOpen, setIsTooltipOpen] = useState({});
  const apiPath = process.env.REACT_APP_API_PATH;

  useEffect(() => {
    try {
      axios
        .get(
          `${apiPath}addParticipant/getCategories/${sessionStorage.getItem(
            "eventId"
          )}`
        )
        .then((response) => {
          setCategoryOptions(response.data);
          setAvailableOptions(response.data);

          axios.get(`${apiPath}addParticipant/getUsers`).then((response) => {
            setListOfUsers(response.data);
          });
        })
        .catch((error) => {
          if (error.response.data.error === "Unauthorized") {
            window.location.href = "/";
          } else {
            console.error("Error making axios request:", error);
          }
        });
    } catch (error) {
      console.error("Error caught ");
    }
  }, []);

  useEffect(() => {
    setSelectedUser(listOfUsers[0]);
    try {
      axios
        .get(
          `${apiPath}addParticipant/getUserCategory/${sessionStorage.getItem(
            "eventId"
          )}/${listOfUsers[0].user_id_pk}`
        )
        .then((response) => {
          setAvailableOptions((prev) => {
            return response.data;
          });
        });
    } catch (error) {
      console.error("Error fetching user category data:", error);
    }
  }, [listOfUsers]);

  useEffect(() => {
    setIsTooltipOpen((prev) => {
      const newObj = {};

      categoryOptions.forEach((row) => {
        newObj[row.category_id_pk] = false;
      });

      return newObj;
    });
  }, [categoryOptions]);

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
      const response = await axios.get(
        `${apiPath}addParticipant/getUserCategory/${sessionStorage.getItem(
          "eventId"
        )}/${event.value}`
      );
      setAvailableOptions((prev) => {
        return response.data;
      });
    } catch (error) {
      console.error("Error fetching user category data:", error);
    }
  };

  useEffect(() => {}, isTooltipOpen);

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
    const category_id_fk = e;
    setIsTooltipOpen((prev) => ({
      ...prev,
      [e]: false,
    }));
  };

  const chakraStyles = {
    control: (provided, state) => ({
      ...provided,
      borderWidth: "1px",
      "& > div > span > span": {
        paddingY: "1px",
      },
      "& > div > span > div > svg > path": {
        fill: "gray.900",
      },
      textColor: "white",
      _focusVisible: {
        borderColor: "rgb(237,137,51)",
        borderWidth: "2px",
        outline: "none", // Remove default focus outline
        textColor: "white",
      },
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      background: "transparent",
      textColor: "white",
    }),
    crossIcon: (provided, state) => ({
      ...provided,
      textColor: "white",
    }),
    menuList: (provided, state) => ({
      ...provided,
      background: "gray.900",
      textColor: "white",
    }),

    option: (provided, state) => ({
      ...provided,
      background: "gray.900",
      _hover: { background: "rgb(237,137,51)", textColor: "gray.900" },
    }),
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
        chakraStyles={chakraStyles}
        options={listOfUsers.map((user) => ({
          value: user.user_id_pk,
          label: user.user_name,
        }))}
      />

      <Form method="post" action="/addParticipant">
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

export const addParticipantAction = async ({ request }) => {
  const data = await request.formData();
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
    .post(`${apiPath}addParticipant/${data.get("event_id_pk")}`, user)
    .catch((error) => {
      console.error("Error making axios request:", error);
      // Handle the error as needed
    });
  return redirect("/participants");
};
