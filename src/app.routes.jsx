import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const Login = lazy(() => import("./features/auth/pages/Login"));
const Register = lazy(() => import("./features/auth/pages/Register"));

const Feed = lazy(() => import("./features/posts/pages/Feed"));
const CreatePost = lazy(() => import("./features/posts/pages/CreatePost"));
const Profile = lazy(() => import("./features/profile/pages/Profile"));
import Messages from "./features/chat/pages/Messages";

import AppLayout from "./AppLayout";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Feed />,
      },
      {
        path: "create-post",
        element: <CreatePost />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
      },
      {
        path: "messages",
        element: <Messages />,
      }
    ],
  },
]);