import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../config/ProtectedRoute";
import ConsultingStaffLayout from "../layout/ConsultingStaffLayout";
import CustomerLayout from "../layout/CustomerLayout";
import ValuationStaffLayout from "../layout/ValuationStaffLayout";
import CalculateDiamond from "../pages/CalculateDiamond";
import CaratSection from "../pages/CaratSection";
import ClaritySection from "../pages/ClaritySection";
import ColorSection from "../pages/ColorSection";
import Conclusion from "../pages/Conclusion";
import Order from "../pages/ConsultingStaff/Order";
import RequestDetailConsul from "../pages/ConsultingStaff/RequestDetail";
import CustomerRequest from "../pages/CustomerRequest";
import CutSection from "../pages/CutSection";
import Education from "../pages/Education";
import ErrorPage from "../pages/ErrorPage";
import ForgotPassword from "../pages/ForgotPassword";
import Guides from "../pages/Guides";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Pricing from "../pages/Pricing";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import Service from "../pages/Service";
import Request from "../pages/ValuationStaff/Request";
import RequestDetail from "../pages/ValuationStaff/RequestDetail";
import Valuation from "../pages/ValuationStaff/Valuation";
import ValuationResult from "../pages/ValuationStaff/ValuationResult";

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
        path: "/request",
        element: (
          <ProtectedRoute requiredRoles={["Customer"]}>
            <CustomerRequest />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile/:id",
        element: (
          <ProtectedRoute requiredRoles={["Customer"]}>
            <Profile />
          </ProtectedRoute>
        ),
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
