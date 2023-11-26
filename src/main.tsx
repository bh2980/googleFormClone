import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./store/store.ts";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Editor from "./pages/editor.tsx";
import Form from "./pages/Form.tsx";
import Result from "./pages/Result.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <>error page</>,
    children: [
      {
        path: "/editor",
        element: <Editor />,
      },
      {
        path: "/form",
        element: <Form />,
      },
      {
        path: "/result",
        element: <Result />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
