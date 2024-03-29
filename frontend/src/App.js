// Third-party imports
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Link,
  Routes,
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
import LandingPage2 from "./pages/LandingPage2";
import LandingPage3 from "./pages/LandingPage3";
import Login from "./pages/Login";
import Verification from "./pages/Verification";
import ProtectedAuth from "./pages/ProtectedAuth";
import ProtectedAuthRole from "./pages/ProtectedAuthRole";
import EventInfo from "./pages/EventInfo";
import Profile from "./pages/Profile";
import { addParticipantAction } from "./pages/AddParticipant";
import { createEventAction } from "./pages/CreateEvent";
import { EventContext } from "./helpers/EventContext";
import { AuthContext } from "./helpers/AuthContext";
import { RoleContext } from "./helpers/RoleContext";
import { useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Signup, { signUpAction } from "./pages/Signup";
import { checkboxTheme } from "./customThemes/Checkbox";
import { editableTheme } from "./customThemes/Editable";
import { toastTheme } from "./customThemes/Toast";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="landingPage2" element={<LandingPage2 />} />
      <Route path="landingPage3" element={<LandingPage3 />} />
      <Route path="fullstackTest" element={<FullstackTest />} />
      <Route
        path="scoring"
        element={
          <ProtectedAuthRole>
            <Scoring />
          </ProtectedAuthRole>
        }
      />
      <Route
        path="eventInfo"
        element={
          <ProtectedAuthRole>
            <EventInfo />
          </ProtectedAuthRole>
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
        path="profile"
        element={
          <ProtectedAuth>
            <Profile />
          </ProtectedAuth>
        }
      />
      <Route
        path="participants"
        element={
          <ProtectedAuthRole>
            <Participants />
          </ProtectedAuthRole>
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
          <ProtectedAuthRole>
            <AddParticipant />
          </ProtectedAuthRole>
        }
        action={addParticipantAction}
      />
      <Route
        path="createEvent"
        element={
          <ProtectedAuthRole>
            <CreateEvent />
          </ProtectedAuthRole>
        }
        action={createEventAction}
      />
    </Route>
  )
);

const theme = extendTheme({
  components: {
    Checkbox: checkboxTheme,
    Editable: editableTheme,
    Alert: toastTheme,
  },
});

function App() {
  const [eventState, setEventState] = useState({
    eventName: "Select Event",
    eventId: null,
  });
  console.log("Rendering APP");
  const [authState, setAuthState] = useState(null);
  const [roleState, setRoleState] = useState(null);

  return (
    <ChakraProvider theme={theme}>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <RoleContext.Provider value={{ roleState, setRoleState }}>
          <EventContext.Provider value={{ eventState, setEventState }}>
            <RouterProvider router={router}></RouterProvider>
          </EventContext.Provider>
        </RoleContext.Provider>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default App;
