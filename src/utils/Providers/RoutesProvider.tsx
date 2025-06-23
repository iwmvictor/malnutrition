import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminRoute from "./AuthContextProvider";
import { LandingPage } from "../../components/LandingPage";
import { ParentDashboard } from "../../components/ParentDashboard";
import { HealthAdvisorDashboard } from "../../components/HealthAdvisorDashboard";
import { AdminDashboard } from "../../components/AdminDashboard";
import ErrorPage from "../../pages/ErrorPage";
import NotFound from "../../pages/NotFound";
import {  useEffect, useState } from "react";
import LoginForm from "../../components/LoginForm";
import { IUser } from "../../types";

const RoutesProvider = () => {
 const [userProfile, setUserProfile] = useState<IUser | undefined>();

    useEffect(() => {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        if (JSON.stringify(parsedData) !== JSON.stringify(userProfile)) {
          setUserProfile(parsedData);
        }
      } else if (userProfile) {
        setUserProfile(undefined);
      }
    }, [userProfile]);

  const renderDashboard = () => {
    if (!userProfile) return null;

    switch (userProfile.roles[0]) {
      case "PARENT":
        return <ParentDashboard user={userProfile}/>;
      case "VILLAGE":
        return <HealthAdvisorDashboard user={userProfile}/>;
      case "CELL":
        return <AdminDashboard adminLevel="cell" user={userProfile} />;
      case "SECTOR":
        return <AdminDashboard adminLevel="sector" user={userProfile}/>;
      case "DISTRICT":
        return <AdminDashboard adminLevel="district" user={userProfile}/>;
      case "MINISTRY":
        return <AdminDashboard adminLevel="ministry" user={userProfile}/>;
      default:
        return <ParentDashboard user={userProfile}/>;
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
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
