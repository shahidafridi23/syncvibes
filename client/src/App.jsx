import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthSuccess from "./components/AuthSuccess";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import MusicRoom from "./pages/MusicRoom";
import { SocketProvider } from "./contexts/SocketContext";
import { useEffect, useState } from "react";
import axios from "axios";
import WokeUp from "./components/WokeUp";
import { useToast } from "./hooks/use-toast";

const App = () => {
  const [isWokeUp, setIsWokeUp] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const wakeUp = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/wakeup`
        );

        const { message, wokeup } = response?.data;
        if (wokeup) {
          setIsWokeUp(false);
        }
        toast({ title: message });
      } catch (error) {
        console.log(error);
      }
    };

    wakeUp();
  }, []);

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
          <SocketProvider>
            <MusicRoom />
          </SocketProvider>
        </AuthProvider>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />;
      <WokeUp isWokeUp={isWokeUp} />
    </>
  );
};

export default App;
