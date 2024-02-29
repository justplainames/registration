import React, { useContext, useState, useEffect } from "react";
import { Form, redirect } from "react-router-dom";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Checkbox,
  Flex,
  Button,
  CheckboxGroup,
  Select,
  Tooltip,
} from "@chakra-ui/react";
import { EventContext } from "../helpers/EventContext";
import axios from "axios";

export default function AddParticipant() {
  const { eventState, setEventState } = useContext(EventContext);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [availableOptions, setAvailableOptions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [paid, setPaid] = useState(false);
  const [listOfUsers, setListOfUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isTooltipOpen, setIsTooltipOpen] = useState({});
  const apiPath = process.env.REACT_APP_API_PATH;

  useEffect(() => {
    axios
      .get(`${apiPath}addParticipant/getCategories/${eventState.eventId}`)
      .then((response) => {
        console.log("First Category Options = ", response.data);
        setCategoryOptions(response.data);
        setAvailableOptions(response.data);

        axios
          .get(`${apiPath}addParticipant/getUsers`)
          // .get(`${apiPath}addParticipant/getUsers/${eventState.eventId}`)
          .then((response) => {
            console.log("Response from adding participant page", response.data);
            setListOfUsers(response.data);
          });
      })
      .catch((error) => {
        console.log("ERROR = ", error);
        if (error.response.data.error === "Unauthorized") {
          window.location.href = "/";
        } else {
          console.error("Error making axios request:", error);
        }
      });
  }, []);

  useEffect(() => {
    console.log("setting first user through UseEffect", listOfUsers[0]);
    setSelectedUser(listOfUsers[0]);
    try {
      axios
        .get(
          `${apiPath}addParticipant/getUserCategory/${eventState.eventId}/${listOfUsers[0].user_id_pk}`
        )
        .then((response) => {
          console.log("Response ", response.data);
          setAvailableOptions((prev) => {
            return response.data;
          });
        });
    } catch (error) {
      console.error("Error fetching user category data:", error);
    }
  }, [listOfUsers]);

  useEffect(() => {
    console.log(
      "Category Options through second useEffect = ",
      categoryOptions
    );
    console.log(
      "Available Options through second useEffect = ",
      availableOptions
    );
    setIsTooltipOpen((prev) => {
      const newObj = {};

      categoryOptions.forEach((row) => {
        console.log(row);
        newObj[row.category_id_pk] = false;
      });

      return newObj;
    });
  }, [categoryOptions]);

  useEffect(() => {}, [eventState]);

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

  // const handleUserChange = async (event) => {
  //   console.log("1", event.target.value);
  //   try {
  //     const response = await axios.get(
  //       `${apiPath}addParticipant/getUserCategory/${eventState.eventId}/${event.target.value}`
  //     );
  //     console.log("Response ", response);
  //     console.log("2", event.target.value);

  //     const user = listOfUsers.find(
  //       (row) => row.user_id_pk === event.target.value
  //     );
  //     console.log("3", event.target.value);

  //     setSelectedUser(user || null);
  //     console.log("4", event.target.value);
  //   } catch (error) {
  //     console.error("Error fetching user category data:", error);
  //   }
  // };

  const handleUserChange = async (event) => {
    // console.log("laskdjs", categoryOptions);
    // console.log("Selected User iNfo = ", selectedUser);
    const user = listOfUsers.find(
      (row) => row.user_id_pk === event.target.value
    );
    setSelectedUser(user || null);
    // console.log(event.target.value);
    try {
      const response = await axios.get(
        `${apiPath}addParticipant/getUserCategory/${eventState.eventId}/${event.target.value}`
      );
      console.log("Response ", response.data);
      setAvailableOptions((prev) => {
        return response.data;
      });
    } catch (error) {
      console.error("Error fetching user category data:", error);
    }
  };

  useEffect(() => {
    // console.log("dklsjhflaskdjhfasdk", isTooltipOpen);
  }, isTooltipOpen);

  const handlePaid = () => {
    if (!paid) {
      setPaid(true);
    } else {
      setPaid(false);
    }
  };

  const handleTooltipEnter = (e) => {
    const category_id_fk = e;
    // console.log("E", e);
    // console.log("Is ToolTIP OPEN ", isTooltipOpen);
    setIsTooltipOpen((prev) => ({
      ...prev,
      [e]: true,
    }));
  };

  const handleTooltipExit = (e) => {
    // console.log("Is ToolTIP OPEN ", isTooltipOpen);
    const category_id_fk = e;
    setIsTooltipOpen((prev) => ({
      ...prev,
      [e]: false,
    }));
  };

  return (
    <Box maxW="480px">
      <Select
        name="user"
        margin="40px"
        value={selectedUser ? selectedUser.user_id_pk : ""}
        onChange={handleUserChange}
      >
        {listOfUsers.map((user) => (
          <option value={user.user_id_pk} key={user.id}>
            {user.user_name}
          </option>
        ))}
      </Select>
      <Form method="post" action="/addParticipant">
        <Input type="hidden" name="event_id_pk" value={eventState.eventId} />
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

        <FormControl m="40px">
          <FormLabel>Participant Name</FormLabel>
          <Input
            type="text"
            name="user_name"
            value={selectedUser ? selectedUser.user_name : ""}
            readOnly
          />
        </FormControl>

        <FormControl m="40px">
          <FormLabel>user Instagram</FormLabel>
          <Input
            type="text"
            name="user_instagram"
            value={selectedUser ? selectedUser.user_instagram : ""}
            readOnly
          />
        </FormControl>

        <FormControl m="40px">
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="text"
            name="user_phone_number"
            value={selectedUser ? selectedUser.user_phone_number : ""}
            readOnly
          />
        </FormControl>

        <FormControl m="40px">
          <FormLabel>Participant Email</FormLabel>
          <Input
            type="text"
            name="user_email"
            value={selectedUser ? selectedUser.user_email : ""}
            readOnly
          />
        </FormControl>

        <FormControl m="40px" style={{ maxWidth: "none" }}>
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

        <FormControl m="40px" style={{ maxWidth: "none" }}>
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
        <Button type="submit" margin="40px">
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

  console.log(user);

  axios
    .post(`${apiPath}addParticipant/${data.get("event_id_pk")}`, user)
    .catch((error) => {
      console.error("Error making axios request:", error);
      // Handle the error as needed
    });
  return redirect("/participants");
};
