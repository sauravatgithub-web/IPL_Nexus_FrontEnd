import React, { Suspense, lazy, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { server } from './Assests/config.js';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { userExists, userNotExists } from './redux/reducers/auth.js';
import { LayoutLoader } from './Components/Loaders.jsx'
import ProtectRoute from './Components/Auth/ProtectRoute.jsx'
import Cart from './Components/Cart.jsx'

const Authentication = lazy(() => import("./Pages/Authentication.js"));
const ErrorPage = lazy(() => import("./Pages/ErrorPage.js"));
const FrontPage = lazy(() => import("./Pages/FrontPage.js"));
const DashBoard = lazy(() => import("./Pages/DashBoard.js"));
const RootPage = lazy(() => import("./Pages/RootPage.js"));

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(server);
  
  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data.user)) )
      .catch((err) => dispatch(userNotExists()) )
  }, [dispatch])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectRoute user = {!user} redirect = '/app' />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <FrontPage />, },
        { path: "auth/:mode",  element: <Authentication /> },
      ],
    },
    {
      path: "/app",
      element: <ProtectRoute user = {user} />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <RootPage />,
          children: [
            { index: true, element: <DashBoard /> },
            { path: "cart", element: <Cart /> },
          ]
        },
      ],
    },
  ]);

  return (
    <>
      <Suspense fallback = {<LayoutLoader />}>
        <RouterProvider router={router}/>
      </Suspense>
      <Toaster position = 'bottom-center' />
    </>
  );
}

export default App;
