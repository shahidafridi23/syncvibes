import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthSuccess from "./components/AuthSuccess";
import Logo from "./components/Logo";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Logo />,
    },
    {
      path: "/auth-success",
      element: <AuthSuccess />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
