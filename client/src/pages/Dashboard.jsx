import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const { authState } = useAuth();

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate(`/@${authState.user.username}`);
    } else {
      navigate("/login");
    }
  }, [authState]);

  return <div>Dashboard</div>;
};

export default Dashboard;
