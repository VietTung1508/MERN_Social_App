import { Routes, Route } from "react-router-dom";
import DefaultLayout from "../components/layout/defaultLayout";
import { Fragment } from "react";
import { ProtectedRoute, IsAuth } from "../ultils/ProtectedRout";
import { lazy } from "react";
// Use lazy to download component when user need it (avoid download all at the same time);

const Home = lazy(() => import("../pages/home/Home"));
const Detail = lazy(() => import("../pages/detail/Detail"));
const Following = lazy(() => import("../pages/following/Following"));
const User = lazy(() => import("../pages/user/User"));
const Upload = lazy(() => import("../pages/upload/Upload"));
const Login = lazy(() => import("../pages/auth/loginPage/Login"));
const Register = lazy(() => import("../pages/auth/registerPage/Register"));

const routes = [
  {
    path: "/",
    element: <Home />,
    layout: "Default",
  },
  {
    path: "/posts/:id",
    element: <Detail />,
    layout: "Default",
  },
  {
    path: "/following",
    element: (
      <ProtectedRoute>
        <Following />
      </ProtectedRoute>
    ),
    layout: "Default",
  },
  {
    path: "/upload",
    element: (
      <ProtectedRoute>
        <Upload />
      </ProtectedRoute>
    ),
    layout: "Default",
  },
  {
    path: "/user/:userId",
    element: (
      <ProtectedRoute>
        <User />
      </ProtectedRoute>
    ),
    layout: "Default",
  },
  {
    path: "/login",
    element: (
      <IsAuth>
        <Login />
      </IsAuth>
    ),
    layout: "Blank",
  },
  {
    path: "/register",
    element: (
      <IsAuth>
        <Register />
      </IsAuth>
    ),
    layout: "Blank",
  },
];

function Router() {
  return (
    <Routes>
      {routes.map((route, id) => (
        <Route
          key={id}
          path={route.path}
          element={
            route.layout === "Default" ? (
              <DefaultLayout>{route.element}</DefaultLayout>
            ) : (
              <Fragment>{route.element}</Fragment>
            )
          }
        />
      ))}
    </Routes>
  );
}

export default Router;
