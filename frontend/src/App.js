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
import { addParticipantAction } from "./pages/AddParticipant";
import { createEventAction } from "./pages/CreateEvent";
import { EventContext } from "./helpers/EventContext";
import { useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="fullstackTest" element={<FullstackTest />} />
      <Route path="scoring" element={<Scoring />} />
      <Route path="brackets" element={<Brackets />} />
      <Route path="participants" element={<Participants />} />
      <Route path="landingPage" element={<LandingPage />} />
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

  return (
    <EventContext.Provider value={{ eventState, setEventState }}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </EventContext.Provider>
  );
}

export default App;
