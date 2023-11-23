import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserAuth } from "../../context/UserAuthContext";
import { FcGoogle } from "react-icons/fc";
import {LuOrbit} from "react-icons/lu"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await logIn(email, password);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen  flex flex-col items-center justify-center gap-y-3">
        <div className="text-center flex gap-3 items-center justify-center mb-2">
          <LuOrbit className="text-3xl text-sky-800" />
          <h1 className="font-medium text-2xl text-blue-950">File Orbit</h1>
        </div>
        <div className="bg-white p-8 rounded-md shadow-md w-[95vw] sm:w-96">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>

            <div className="text-center pt-4">
              <h1>
                Don't have an account ?{" "}
                <Link to="/signup" className="text-blue-600 font-medium">
                  Sign Up
                </Link>
              </h1>
            </div>
          </form>

          <Link to={"/forgot-password"}>
            <p className="text-center text-teal-600 m-1 font-medium">
              {" "}
              Forgot Password
            </p>
          </Link>

          <div
            className="rounded bg-gray-100 shadow-md p-3 text-center mx-auto w-full hover:shadow-md hover:shadow-slate-400 transition-all gap-x-3 mt-4 cursor-pointer flex justify-center items-center"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="text-3xl my-auto" />{" "}
            <p className="text-md text-gray-700">Sign In with Google</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
