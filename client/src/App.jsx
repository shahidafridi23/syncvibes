import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthSuccess from "./components/AuthSuccess";
import Logo from "./components/Logo";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/register",
      element: (
        <AuthProvider>
          <Register />
        </AuthProvider>
      ),
    },
    {
      path: "/login",
      element: (
        <AuthProvider>
          <Login />
        </AuthProvider>
      ),
    },
    {
      path: "/auth-success",
      element: (
        <AuthProvider>
          <AuthSuccess />
        </AuthProvider>
      ),
    },
    {
      path: "/:username",
      element: (
        <AuthProvider>
          <Logo />
        </AuthProvider>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
