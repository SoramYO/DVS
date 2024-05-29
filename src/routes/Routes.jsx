import { createBrowserRouter } from "react-router-dom";
import CustomerLayout from "../layout/CustomerLayout";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import ConsultingStaffLayout from "../layout/ConsultingStaffLayout";
import Order from "../pages/ConsultingStaff/Order";
import ValuationStaffLayout from "../layout/ValuationStaffLayout";
import Request from "../pages/ValuationStaff/Request";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../config/ProtectedRoute";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/consultingStaff",
    element: <ProtectedRoute requiredRoles={['Consulting Staff']}><ConsultingStaffLayout /></ProtectedRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Order />,
      },
    ],
  },
  {
    path: "/valuationStaff",
    element: <ProtectedRoute requiredRoles={['Valuation Staff']}><ValuationStaffLayout /></ProtectedRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Request />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
]);
