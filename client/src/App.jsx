import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthSuccess from "./components/AuthSuccess";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import MusicRoom from "./pages/MusicRoom";

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
          <Dashboard />
        </AuthProvider>
      ),
    },
    {
      path: "/:username/:code",
      element: (
        <AuthProvider>
          <MusicRoom />
        </AuthProvider>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
