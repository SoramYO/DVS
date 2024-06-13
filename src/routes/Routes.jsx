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
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ProtectedRoute from "../config/ProtectedRoute";
import RequestDetail from "../pages/ValuationStaff/RequestDetail";
import Valuation from "../pages/ValuationStaff/Valuation";
import ValuationResult from "../pages/ValuationStaff/ValuationResult";
import RequestDetailConsul from "../pages/ConsultingStaff/RequestDetail";
import CalculateDiamond from "../pages/CalculateDiamond";
import Education from "../pages/Education";
import Guides from "../pages/Guides";
import CutSection from "../pages/CutSection";
import ColorSection from "../pages/ColorSection";
import ClaritySection from "../pages/ClaritySection";
import CaratSection from "../pages/CaratSection";
import Conclusion from "../pages/Conclusion";
import Service from "../pages/Service";
import Pricing from "../pages/Pricing";
import Profile from "../pages/Profile";
import CustomerRequest from "../pages/CustomerRequest";

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
        path: "/forgot-password",
        element: <ForgotPassword />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
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
      {
        path: "/education",
        element: <Education />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/guides",
        element: <Guides />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/cut",
        element: <CutSection />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/color",
        element: <ColorSection />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/clarity",
        element: <ClaritySection />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/carat",
        element: <CaratSection />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/conclusion",
        element: <Conclusion />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/services",
        element: <Service />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/request",
        element: (
          <ProtectedRoute requiredRoles={["Customer"]}>
            <CustomerRequest />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/consultingStaff",
    element: (
      <ProtectedRoute requiredRoles={["Consulting Staff"]}>
        <ConsultingStaffLayout />
      </ProtectedRoute>
    ),
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
      <ProtectedRoute requiredRoles={["Valuation Staff"]}>
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
