// Third-party imports
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Local imports
import "./App.css";
import Dashboard from "./pages/Dashboard";
import RootLayout from "./layouts/RootLayout";
import Scoring from "./pages/Scoring";
import Brackets from "./pages/Brackets";
import Participants from "./pages/Participants";
import AddParticipant from "./pages/AddParticipant";
import CreateEvent from "./pages/CreateEvent";
import FullstackTest from "./pages/FullstackTest";
import { addParticipantAction } from "./pages/AddParticipant";
import { createEventAction } from "./pages/CreateEvent";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="fullstackTest" element={<FullstackTest />} />
      <Route path="scoring" element={<Scoring />} />
      <Route path="brackets" element={<Brackets />} />
      <Route path="participants" element={<Participants />} />
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
