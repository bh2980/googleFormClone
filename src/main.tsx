import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./store/store.ts";

import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Editor from "./pages/Editor.tsx";
import Form from "./pages/Form.tsx";
import Result from "./pages/Result.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/editor"} replace />,
    errorElement: <>error page</>,
  },
  {
    path: "/editor",
    element: <Editor />,
    errorElement: <>error page</>,
  },
  {
    path: "/form",
    element: <Form />,
    errorElement: <>error page</>,
  },
  {
    path: "/result",
    element: <Result />,
    errorElement: <>error page</>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
