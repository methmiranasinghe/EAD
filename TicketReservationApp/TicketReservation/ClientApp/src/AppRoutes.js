import BackOfficerDashboard from "./components/BackOfficerDashboard";
import BackOfficers from "./components/BackOfficers";
import CreateBackOfficer from "./components/CreateBackOfficer";
import CreateTraveller from "./components/CreateTraveller";
import Dashboard from "./components/Dashboard";
import EditBackOfficer from "./components/EditBackOfficer";
import EditTraveller from "./components/EditTraveller";
import TicketBooking from "./components/TicketBooking";
import TicketBookingManagement from "./components/TicketBookingManagement";
import Travellers from "./components/Travellers";
import UpdateStatusManagement from "./components/UpdateStatusManagement";
import UpdateTravellerStatus from "./components/UpdateTravellerStatus";



const AppRoutes = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: "/travellers",
    element: <Travellers />,
  },
  {
    path: "/backofficers",
    element: <BackOfficers />,
  },
  {
    path: "/edit-backofficers",
    element: <EditBackOfficer />,
  },
  {
    path: "/edit-travellers",
    element: <EditTraveller />,
  },
  {
    path: "/new-traveller",
    element: <CreateTraveller />,
  },
  {
    path: "/new-backofficer",
    element: <CreateBackOfficer />,
  },
  {
    path: "/backofficer-dashboard",
    element: <BackOfficerDashboard />,
  },
  {
    path: "/update-status-management",
    element: <UpdateStatusManagement />,
  },
  {
    path: "/update-traveller-status",
    element: <UpdateTravellerStatus />,
  },
  {
    path: "/ticket-booking-management",
    element: <TicketBookingManagement />,
  },
  {
    path: "/ticket-booking",
    element: <TicketBooking />,
  },
];

export default AppRoutes;
