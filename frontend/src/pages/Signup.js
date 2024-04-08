import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, redirect } from "react-router-dom";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Button,
  Heading,
} from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";

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
    <Box p={4} height="100%">
      <Heading
        textColor="white"
        textAlign={"center"}
        fontWeight="normal"
        mb="2%"
        w="100%"
      >
        Sign Up
      </Heading>
      <Form method="post" action="/signup">
        <FormControl textColor="white" mt="2%">
          <FormLabel>Name: </FormLabel>
          <Input
            textColor="white"
            focusBorderColor="orange.400"
            type="text"
            name="user_name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <FormHelperText>Enter your name here</FormHelperText>
        </FormControl>

        <FormControl textColor="white" mt="2%">
          <FormLabel>Instagram: </FormLabel>
          <Input
            textColor="white"
            focusBorderColor="orange.400"
            type="text"
            name="user_instagram"
          />
          <FormHelperText>
            Enter your instagram account if you have
          </FormHelperText>
        </FormControl>

        <FormControl textColor="white" mt="2%">
          <FormLabel>Email: </FormLabel>
          <Input
            textColor="white"
            focusBorderColor="orange.400"
            type="text"
            name="user_email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <FormHelperText>Enter your email</FormHelperText>
        </FormControl>

        <FormControl textColor="white" mt="2%">
          <FormLabel>Mobile Number: </FormLabel>
          <Input
            textColor="white"
            focusBorderColor="orange.400"
            type="text"
            name="user_phone_number"
          />
          <FormHelperText></FormHelperText>
        </FormControl>

        <Button
          mt="2%"
          bg="rgb(237,137,51)"
          textColor="gray.900"
          _hover={{
            textDecoration: "none",
            bg: "rgb(213,123,45)",
          }}
          type="submit"
        >
          Submit
        </Button>
      </Form>
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

  try {
    const response = await axios.post(`${apiPath}signup/`, user);
    // Redirect to dashboard upon successful signup
    return redirect("/dashboard");
  } catch (error) {
    console.error("Error making axios request:", error);
    // Handle the error as needed
    throw error; // Re-throw the error to propagate it
  }
};
