import React, { useState, useEffect } from "react";
import { auth } from "@/firebaseConfig";
import Loading from "./Loading";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Move dropdown state to the top level

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false); // Set loading state after checking user
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        router.push("/User");
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
      });
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev); // Toggle the dropdown visibility
  };

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <p>Please sign in to view your profile.</p>;
  }

  return (
    <div className="w-full h-max-16 p-4 bg-mainbackground">
      <div className="flex items-center justify-between mb-2 pl-2 pr-2">
        <div className="flex-cols justify-center items-center">
          <img
            src="/static/img/finallogo.png"
            alt="logo"
            className="h-24 w-24" // Adjusted size of the logo
          />
          <h1 className="text-lg">
            Hi, <strong>{user.displayName}</strong>
          </h1>
        </div>
        <div className="flex justify-content-center items-center">
          <div className="relative">
            <div className="cursor-pointer" onClick={toggleDropdown}>
              {user?.photoURL && (
                <img
                  src={user.photoURL}
                  alt="User profile"
                  className="w-12 h-12 rounded-full mr-2" // Reduced size of user profile image
                />
              )}
            </div>
            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <ul className="flex flex-col">
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 text-blue-950 hover:bg-gray-200"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  </li>
                  <li>
                    <Link
                      href={"/User"}
                      className="block w-full text-left px-4 py-2 text-blue-950 hover:bg-gray-200"
                    >
                      Go Back
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
