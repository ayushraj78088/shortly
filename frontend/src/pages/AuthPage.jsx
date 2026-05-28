import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthPage = () => {
  const [loginForm, setLoginForm] = useState(true);

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-center items-center text-black">
      {loginForm ? (
        <LoginForm state={setLoginForm} />
      ) : (
        <RegisterForm state={setLoginForm} />
      )}
    </div>
  );
};
export default AuthPage;
