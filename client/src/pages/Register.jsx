import Logo from "@/components/Logo";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <MaxWidthWrapper className="hero-bg lg:min-h-screen">
      <nav className="w-full py-10">
        <Link to={"/"}>
          <Logo />
        </Link>
      </nav>
    </MaxWidthWrapper>
  );
};

export default Register;
