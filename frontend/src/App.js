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
import ProtectedAuthRole from "./pages/ProtectedAuthRole";
import EventInfo from "./pages/EventInfo";
import Profile from "./pages/Profile";
import { addParticipantAction } from "./pages/AddParticipant";
import { createEventAction } from "./pages/CreateEvent";
import { AuthContext } from "./helpers/AuthContext";
import { RoleContext } from "./helpers/RoleContext";
import { EventContext } from "./helpers/EventContext";
import { useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Signup, { signUpAction } from "./pages/Signup";
import { checkboxTheme } from "./customThemes/Checkbox";
import { editableTheme } from "./customThemes/Editable";
import { toastTheme } from "./customThemes/Toast";
import { useAuth0 } from "@auth0/auth0-react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="fullstackTest" element={<FullstackTest />} />
      <Route path="scoring" element={<Scoring />} />
      <Route path="eventInfo" element={<EventInfo />} />
      <Route path="brackets" element={<Brackets />} />
      <Route path="profile" element={<Profile />} />
      <Route path="participants" element={<Participants />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="verification" element={<Verification />} />
      <Route path="signup" element={<Signup />} action={signUpAction} />
      <Route
        path="addParticipant"
        element={<AddParticipant />}
        action={addParticipantAction}
      />
      <Route
        path="createEvent"
        element={<CreateEvent />}
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
  // const [authState, setAuthState] = useState({ isAuthenticated: false });
  // const [roleState, setRoleState] = useState({ role: null });
  const [eventState, setEventState] = useState({});
  return (
    <ChakraProvider theme={theme}>
      {/* <AuthContext.Provider value={{ authState, setAuthState }}>
        <RoleContext.Provider value={{ roleState, setRoleState }}> */}
      <EventContext.Provider value={{ eventState, setEventState }}>
        <RouterProvider router={router}></RouterProvider>
      </EventContext.Provider>
      {/* </RoleContext.Provider>
      </AuthContext.Provider> */}
    </ChakraProvider>
  );
}

export default App;
