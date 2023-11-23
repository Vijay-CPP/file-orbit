import React, { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const { forgotPassword } = useUserAuth();
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    try {
      // User exists, proceed with password reset
      await forgotPassword(email);
      toast.success("Password reset email sent!");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-indigo-200">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <label htmlFor="email" className="block text-gray-700 text-sm mb-2">
          Email Address:
        </label>
        <input
          type="email"
          id="email"
          className="w-full p-2 border rounded-md mb-4"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md font-bold"
          onClick={handleForgotPassword}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
