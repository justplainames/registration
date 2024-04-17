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
import EventInfo from "./pages/EventInfo";
import Profile from "./pages/Profile";
import { addParticipantAction } from "./pages/AddParticipant";
import { createEventAction } from "./pages/CreateEvent";
import { EventContext } from "./helpers/EventContext";
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
      <Route path="fullstackTest" element={<FullstackTest />} />
      <Route path="scoring" element={<Scoring />} />
      <Route path="eventInfo" element={<EventInfo />} />
      <Route path="brackets" element={<Brackets />} />
      <Route path="profile" element={<Profile />} />
      <Route path="participants" element={<Participants />} />
      <Route path="dashboard" element={<Dashboard />} />
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
  const [eventState, setEventState] = useState({});
  return (
    <ChakraProvider theme={theme}>
      <EventContext.Provider value={{ eventState, setEventState }}>
        <RouterProvider router={router}></RouterProvider>
      </EventContext.Provider>
    </ChakraProvider>
  );
}

export default App;
