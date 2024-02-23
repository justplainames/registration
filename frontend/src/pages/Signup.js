import React, { useState, useEffect } from "react";
import axios from "axios";
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
} from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
const apiPath = process.env.REACT_APP_API_PATH;

// async function auth() {
//   axios.post(`${apiPath}request`).then((response) => {
//     console.log(response.data.url);
//     // const data = response.json();
//     // console.log(data);
//     window.location.href = response.data.url;
//   });
// }

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      setEmail(decodedToken.email);
      setName(decodedToken.name);
    }
  }, []);

  return (
    <Box maxW="480px">
      <Form method="post" action="/signup">
        <FormControl margin="40px">
          <FormLabel>Name: </FormLabel>
          <Input
            type="text"
            name="user_name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <FormHelperText>Enter your name here</FormHelperText>
        </FormControl>

        <FormControl margin="40px">
          <FormLabel>Instagram: </FormLabel>
          <Input type="text" name="user_instagram" />
          <FormHelperText>
            Enter your instagram account if you have
          </FormHelperText>
        </FormControl>

        <FormControl margin="40px">
          <FormLabel>Email: </FormLabel>
          <Input
            type="text"
            name="user_email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <FormHelperText>Enter your email</FormHelperText>
        </FormControl>

        <FormControl margin="40px">
          <FormLabel>Mobile Number: </FormLabel>
          <Input type="text" name="user_phone_number" />
          <FormHelperText></FormHelperText>
        </FormControl>

        <Button type="submit" colorScheme="purple">
          Submit
        </Button>
      </Form>
      {/* <Form method="post" action="/addParticipant">
        <input type="hidden" name="participant_paid" value={paid} />

        <FormControl mb="40px">
          <FormLabel>Participant Name</FormLabel>
          <Input type="text" name="participant_name" />
          <FormHelperText>Enter participant name</FormHelperText>
        </FormControl>

        <FormControl mb="40px">
          <FormLabel>Participant Instagram</FormLabel>
          <Input type="text" name="participant_instagram" />
          <FormHelperText>Enter the participant's Instagram</FormHelperText>
        </FormControl>

        <FormControl mb="40px">
          <FormLabel>Phone Number</FormLabel>
          <Input type="text" name="participant_phone_number" />
          <FormHelperText>Enter the participant's Phone Number</FormHelperText>
        </FormControl>

        <FormControl mb="40px">
          <FormLabel>Participant Email</FormLabel>
          <Input type="text" name="participant_email" />
          <FormHelperText>Enter participant email</FormHelperText>
        </FormControl>

        <Button type="submit"> Submit </Button>
      </Form> */}
    </Box>
  );
}

export const signUpAction = async ({ request }) => {
  const data = await request.formData();
  const apiPath = process.env.REACT_APP_API_PATH;
  const user = {
    user_name: data.get("user_name"),
    user_email: data.get("user_email"),
    user_instagram: data.get("user_instagram"),
    user_phone_number: data.get("user_phone_number"),
  };
  console.log(user);
  axios.post(`${apiPath}signup/`, user).catch((error) => {
    console.error("Error making axios request:", error);
    // Handle the error as needed
  });
  return redirect("/dashboard");
};
