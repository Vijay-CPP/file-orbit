import React, { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
  const { user, updateProfileData, updateProfileEmail, updateProfilePassword } =
    useUserAuth();

  const [newDisplayName, setNewDisplayName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    // Update profile data
    if (newDisplayName) {
      try {
        await updateProfileData({ displayName: newDisplayName });
        toast.success("Display name updated successfully");
      } catch (error) {
        toast.error("Error updating display name");
      }
    }

    // Update email
    if (newEmail) {
      try {
        await updateProfileEmail(newEmail);
        toast.success("Verification link sent to new Email ID!");
        toast.warning("If failed to verify then use old Email ID");
      } catch (error) {
        toast.error("Error updating email! Requires recent login!");
      }
    }

    // Update password
    if (newPassword) {
      try {
        await updateProfilePassword(newPassword);
        toast.success("Password updated successfully");
      } catch (error) {
        toast.error("Requires recent login! Please login & try again!");
      }
    }

    // Clear input fields
    setNewDisplayName("");
    setNewEmail("");
    setNewPassword("");
  };

  return (
    <div className="bg-sky-200 w-screen h-screen flex items-center justify-center">
      <div className="p-5 w-[90vw] md:w-[40vw] mx-auto bg-white rounded-md">
        <h2 className="text-2xl font-bold mb-4">Update Profile</h2>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Current Data</h3>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Display Name:</strong> {user.displayName || "Not set"}
          </p>
        </div>

        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Update Fields</h3>
            <p className="text-xs mb-3">
              *To change Email & Password user must be recently logged In, If
              you get error in doing same please login & try again
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Display Name
              </label>
              <input
                type="text"
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <button
              type="submit"
              className="bg-sky-700 text-white py-2 px-4 rounded-md"
            >
              Update Profile
            </button>
            <Link
              to={"/dashboard"}
              className="text-white mx-3 rounded-md bg-cyan-800 px-4 py-2"
            >
              Dashboard
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
