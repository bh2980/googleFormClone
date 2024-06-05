import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { Provider } from 'react-redux';
import { store } from './store/store';

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Editor from './pages/Editor';
import Preview from './pages/Preview';
import Result from './pages/Result';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'/editor'} replace />,
    errorElement: <>error page</>,
  },
  {
    path: '/editor',
    element: <Editor />,
    errorElement: <>error page</>,
  },
  {
    path: '/preview',
    element: <Preview />,
    errorElement: <>error page</>,
  },
  {
    path: '/result',
    element: <Result />,
    errorElement: <>error page</>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
