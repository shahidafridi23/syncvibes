import CreateRoom from "@/components/CreateRoom";
import Loder from "@/components/Loder";
import Logo from "@/components/Logo";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UserProfile from "@/components/UserProfile";

import { useAuth } from "@/contexts/AuthContext";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const { authState } = useAuth();

  const { user, err, loading } = authState;

  useEffect(() => {
    if (err) {
      navigate(`/login`);
    }
  }, [authState]);

  if (loading) {
    return <Loder />;
  }

  if (!user) {
    return <div>No User Found</div>;
  }

  return (
    <MaxWidthWrapper>
      <nav className="w-full py-10 flex items-center justify-between">
        <Logo />
        <UserProfile {...user} />
      </nav>

      <section>
        <CreateRoom />
      </section>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
