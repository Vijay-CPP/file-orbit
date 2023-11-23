import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { RiMenuFoldLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { LuOrbit } from "react-icons/lu";

const Navbar = () => {
  const { user, logOut } = useUserAuth();
  const [menu, setMenu] = useState(false);
  const location = useLocation();

  return (
    <div className="flex items-center justify-between px-[5vw] sm:px-[3vw] text-xl h-16 bg-sky-100">
      <Link to={"/"} className="flex items-center justify-center gap-3">
        <LuOrbit className="text-3xl text-sky-800" />
        <h1 className="font-medium text-blue-950">File Orbit</h1>
      </Link>

      <div className="hidden sm:block">
        {user ? (
          <div className="flex gap-5 items-center text-gray-800 h-full">
            <h1 className="font-medium text-md">
              Hi! 👋 {user.displayName ? user.displayName : "Buddy"}
            </h1>

            {location.pathname === "/" ? (
              <Link to={"/dashboard"}>
                <button className="px-3 py-1 bg-gray-500 text-white rounded-md shadow-md">
                  Dashboard
                </button>
              </Link>
            ) : null}

            <Link
              to={"/update-profile"}
              className="px-3 py-1 bg-sky-600 text-white rounded-md shadow-md"
            >
              Edit Profile
            </Link>
            <button
              onClick={logOut}
              className="px-3 py-1 bg-white rounded-md shadow-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-5">
            <Link to={"/login"}>
              <button className="px-3 py-1 bg-sky-500 text-white rounded-md shadow-md">
                Login
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="px-3 py-1 bg-white rounded-md shadow-md">
                Signup
              </button>
            </Link>
          </div>
        )}
      </div>

      {menu && (
        <div className="sm:hidden fixed h-screen w-screen top-0 left-0 flex flex-col items-center justify-center backdrop-blur-md animate__animated animate__fadeInDown animate__fast z-50">
          <div className="">
            {user ? (
              <div className="flex flex-col gap-5 items-center text-gray-800 h-full">
                <h1 className="font-medium text-md">
                  Hi! 👋 {user.displayName ? user.displayName : "Buddy"}
                </h1>

                {location.pathname === "/" ? (
                  <Link to={"/dashboard"}>
                    <button className="px-5 py-2 bg-gray-500 text-white rounded-md shadow-md">
                      Dashboard
                    </button>
                  </Link>
                ) : null}

                <Link
                  to={"/update-profile"}
                  className="px-5 py-2 bg-sky-600 text-white rounded-md shadow-md"
                >
                  Edit Profile
                </Link>
                <button
                  onClick={logOut}
                  className="px-5 py-2 bg-white rounded-md shadow-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-5">
                <Link to={"/login"}>
                  <button className="px-5 py-2 bg-sky-500 text-white rounded-md shadow-md">
                    Login
                  </button>
                </Link>
                <Link to={"/signup"}>
                  <button className="px-5 py-2 bg-white rounded-md shadow-md">
                    Signup
                  </button>
                </Link>
              </div>
            )}
          </div>

          <div
            className="p-3 bg-gray-200 mt-10 rounded-full shadow-lg"
            onClick={() => setMenu(false)}
          >
            <IoClose className="text-5xl text-sky-900  " />
          </div>
        </div>
      )}

      <RiMenuFoldLine
        className="sm:hidden text-3xl text-sky-900"
        onClick={() => setMenu(true)}
      />
    </div>
  );
};

export default Navbar;
