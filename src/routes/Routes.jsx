import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../config/ProtectedRoute";
import ConsultingStaffLayout from "../layout/ConsultingStaffLayout";
import CustomerLayout from "../layout/CustomerLayout";
import ValuationStaffLayout from "../layout/ValuationStaffLayout";
import ActivateAccount from "../pages/ActivateAccount";
import CalculateDiamond from "../pages/CalculateDiamond";
import CaratSection from "../pages/CaratSection";
import CheckPriceByCertificateID from "../pages/CheckPriceByCertificateID";
import ClaritySection from "../pages/ClaritySection";
import ColorSection from "../pages/ColorSection";
import Conclusion from "../pages/Conclusion";
import FinishRequest from "../pages/ConsultingStaff/FinishRequest";
import Order from "../pages/ConsultingStaff/Order";
import RequestDetailConsul from "../pages/ConsultingStaff/RequestDetail";
import TakedRequest from "../pages/ConsultingStaff/TakenRequest";
import TakenRequestDetail from "../pages/ConsultingStaff/TakenRequestDetail";
import CustomerRequest from "../pages/CustomerRequest";
import CutSection from "../pages/CutSection";
import Education from "../pages/Education";
import ErrorPage from "../pages/ErrorPage";
import ForgotPassword from "../pages/ForgotPassword";
import Guides from "../pages/Guides";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import PaymentSucces from "../pages/PaymentSucces";
import Pricing from "../pages/Pricing";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import Service from "../pages/Service";
import Request from "../pages/ValuationStaff/Request";
import TakedRequestByValuation from "../pages/ValuationStaff/TakedRequestByValuation";
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
        path: "/activateAccount",
        element: <ActivateAccount />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/calculateDiamond",
        element: <CalculateDiamond />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/checkPriceByCertificateID",
        element: <CheckPriceByCertificateID />,
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
        path: "/paymentSuccess",
        element: <PaymentSucces />,
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
        path: "requestReceived/detail/:id",
        element: <RequestDetailConsul />,
      },
      {
        path: "takedRequest",
        element: <TakedRequest />,
      },
      {
        path: "takedRequest/detail/:id",
        element: <TakenRequestDetail />,
      },
      {
        path: "finishRequest",
        element: <FinishRequest />,
      }
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
        path: "takedRequest",
        element: <TakedRequestByValuation />,
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
