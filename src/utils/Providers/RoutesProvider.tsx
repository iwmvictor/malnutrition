import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminRoute from "./AuthContextProvider";
// import { LandingPage } from "../../components/LandingPage";
import { ParentDashboard } from "../../components/ParentDashboard";
import { HealthAdvisorDashboard } from "../../components/HealthAdvisorDashboard";
import { AdminDashboard } from "../../components/AdminDashboard";
import ErrorPage from "../../pages/ErrorPage";
import NotFound from "../../pages/NotFound";
import LoginForm from "../../components/LoginForm";
import { useApp } from "../../context/AppContext";
import LandingHome from "../../components/Landing";

const RoutesProvider = () => {
  const { state } = useApp();
  const userProfile = state.user;

  const renderDashboard = () => {
    if (!userProfile) return null;

    switch (userProfile.roles[0]) {
      case "PARENT":
        return <ParentDashboard />;
      case "VILLAGE":
        return <HealthAdvisorDashboard />;
      case "CELL":
        return <AdminDashboard adminLevel="cell" />;
      case "SECTOR":
        return <AdminDashboard adminLevel="sector" />;
      case "DISTRICT":
        return <AdminDashboard adminLevel="district"/>;
      case "MINISTRY":
        return <AdminDashboard adminLevel="ministry" />;
      default:
        return <ParentDashboard  />;
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingHome />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/dashboard",
      element: <AdminRoute>{renderDashboard()}</AdminRoute>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/auth",
      element: <LoginForm />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "login",
          element: <LoginForm />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RoutesProvider;
