import Logo from "@/components/Logo";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <MaxWidthWrapper>
      <nav className="w-full py-10">
        <Link to={"/"}>
          <Logo />
        </Link>
      </nav>
    </MaxWidthWrapper>
  );
};

export default Login;
