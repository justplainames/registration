// Third-party imports
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Local imports
import "./App.css";
import "@fontsource/inter";
import Dashboard from "./pages/Dashboard";
import RootLayout from "./layouts/RootLayout";
import Scoring from "./pages/Scoring";
import Brackets from "./pages/Brackets";
import Participants from "./pages/Participants";
import AddParticipant from "./pages/AddParticipant";
import CreateEvent from "./pages/CreateEvent";
import FullstackTest from "./pages/FullstackTest";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Verification from "./pages/Verification";
import ProtectedAuth from "./pages/ProtectedAuth";
import ProtectedRole from "./pages/ProtectedRole";
import { addParticipantAction } from "./pages/AddParticipant";
import { createEventAction } from "./pages/CreateEvent";
import { EventContext } from "./helpers/EventContext";
import { AuthContext } from "./helpers/AuthContext";
import { RoleContext } from "./helpers/RoleContext";
import { useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Signup, { signUpAction } from "./pages/Signup";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="fullstackTest" element={<FullstackTest />} />
      <Route
        path="scoring"
        element={
          <ProtectedAuth>
            <ProtectedRole>
              <Scoring />{" "}
            </ProtectedRole>
          </ProtectedAuth>
        }
      />
      <Route
        path="brackets"
        element={
          <ProtectedAuth>
            <Brackets />
          </ProtectedAuth>
        }
      />
      <Route
        path="participants"
        element={
          <ProtectedAuth>
            <ProtectedRole>
              <Participants />
            </ProtectedRole>
          </ProtectedAuth>
        }
      />
      <Route path="login" element={<Login />} />
      <Route
        path="dashboard"
        element={
          <ProtectedAuth>
            <Dashboard />
          </ProtectedAuth>
        }
      />
      <Route path="verification" element={<Verification />} />
      <Route path="signup" element={<Signup />} action={signUpAction} />
      <Route
        path="addParticipant"
        element={
          <ProtectedAuth>
            <ProtectedRole>
              <AddParticipant />
            </ProtectedRole>
          </ProtectedAuth>
        }
        action={addParticipantAction}
      />
      <Route
        path="createEvent"
        element={
          <ProtectedAuth>
            <ProtectedRole>
              <CreateEvent />
            </ProtectedRole>
          </ProtectedAuth>
        }
        action={createEventAction}
      />
    </Route>
  )
);

const theme = extendTheme({
  fonts: {
    heading: `'inter', 'sans-serif'`,
    body: `'inter', 'sans-serif'`,
  },
});

function App() {
  const [eventState, setEventState] = useState({
    eventName: "Select Event",
    eventId: null,
  });

  const [authState, setAuthState] = useState(null);
  const [roleState, setRoleState] = useState(null);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <RoleContext.Provider value={{ roleState, setRoleState }}>
        <EventContext.Provider value={{ eventState, setEventState }}>
          <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
          </ChakraProvider>
        </EventContext.Provider>
      </RoleContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
