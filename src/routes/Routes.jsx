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
import RequestDetail from "../pages/ValuationStaff/RequestDetail";
import Valuation from "../pages/ValuationStaff/Valuation";
import ValuationResult from "../pages/ValuationStaff/ValuationResult";
import RequestDetailConsul from "../pages/ConsultingStaff/RequestDetail";
import CalculateDiamond from "../pages/CalculateDiamond";
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
      {
        path: "/calculateDiamond",
        element: <CalculateDiamond />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/consultingStaff",
    element: (
      <ProtectedRoute requiredRoles={['Consulting Staff']}>
        <ConsultingStaffLayout />
      </ProtectedRoute>),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Order />,
      },
      {
        path: "requests/detail/:id",
        element: <RequestDetailConsul />,
      },
    ],
  },
  {
    path: "/valuationStaff",
    element: (
      <ProtectedRoute requiredRoles={['Valuation Staff']}>
        <ValuationStaffLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Request />,
      },
      {
        path: "requests/detail/:id",
        element: <RequestDetail />,
      },
      {
        path: "valuation/:id",
        element: <Valuation />,
      },
      {
        path: "valuationResult",
        element: <ValuationResult />,
      }
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
