import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// import { tokenLoader } from './Util/auth';
import ErrorPage from "./pages/Error";
// import AuthForm from "./Component/Layout/authForm";
// import { action as logoutAction } from "./pages/AdminPage/Logout";
import RootAdmin from "./Component/AdminPage/RootAdmin";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import User from "./pages/User";
import Song, { loader as SongLoader, action as SongAction } from "./pages/Song";
import NewSong from "./pages/NewSong";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootAdmin />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "user", element: <User /> },
        { path: "category", element: <Category /> },
        {
          path: "song",
          id: "song",
          element: <Song />,
          loader: SongLoader,
          action: SongAction,
        },
        { path: "gallery", element: <NewSong /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
