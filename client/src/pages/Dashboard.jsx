import CreateRoom from "@/components/CreateRoom";
import JoinRoom from "@/components/JoinRoom";
import Loder from "@/components/Loder";
import Logo from "@/components/Logo";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Rooms from "@/components/Rooms";
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

      <section className="flex flex-col md:block items-center justify-center">
        <div className="md:flex justify-between w-60 md:w-full my-32 md:my-0">
          <JoinRoom />
          <div className="md:hidden flex items-center justify-center my-4">
            <div className="h-px w-full bg-gray-300"></div>
            <span className="mx-4 text-gray-400">Or</span>
            <div className="h-px w-full bg-gray-300"></div>
          </div>
          <CreateRoom />
        </div>

        <Rooms />
      </section>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
