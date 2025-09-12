import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Table from "./Table.tsx";
import Create from './Create.tsx';
import Details from './Details.tsx';
import Edit from './Edit.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { 
        index: true,
        element: <Table />,
      },
      {
        path: '/create',
        element: <Create />,
      },
      {
        path: '/details/:id',
        element: <Details />,
      },
      {
        path: '/edit/:id',
        element: <Edit />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
