import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "../App";
import Home from "../Pages/Home";
import MyWork from '../Pages/MyWork'
import EditWork from "../Pages/EditWork";
import {
  createBrowserRouter,
} from "react-router-dom";
import CreateJob from "../Pages/CreateJob";
import Login from "../Pages/Login";
import PrivateRoute from "./PrivateRoute";
import AllWorks from "../Pages/AllWorks";
import PublicRoute from "./PublicRoute";
const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path:"/home", element: <Home/>,
        },
        {
          path:"/create-job",element:<PrivateRoute element={<CreateJob />} />,
        },
        {
          path:"/jobs-internships",element:<PrivateRoute element={<AllWorks />} />,
        },
        {
          path:"/my-work",element:<PrivateRoute element={<MyWork />} />
        },
        {
          path:"/edit-work/:id",
          element:<PrivateRoute element={<EditWork />} />,
          loader:({params})=>fetch(`http://localhost:3000/all-works/${params.id}`)
        },
        {
          path:"/login",
          element: <Login /> ,
        }
      ]
    },
  ]);

export default router;