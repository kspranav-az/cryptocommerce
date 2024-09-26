"use client";
import React, { useState, useEffect } from "react";
import { update, ref, get } from "firebase/database";
import { db, auth } from "@/firebaseConfig";

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    phonenumber: "",
    address: "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const name = user.displayName;
        setDisplayName(name);
      } else {
        setDisplayName("");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const userDetailsRef = ref(db, `newuser/userdetail/${displayName}`);
        const userDetailsSnapshot = await get(userDetailsRef);
        if (userDetailsSnapshot.exists()) {
          setUserDetails(userDetailsSnapshot.val());
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    };
    if (displayName) {
      fetchUserDetails();
    }
  }, [displayName]);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setLoading(true);
    update(ref(db, `newuser/userdetail/${userDetails.name}`), userDetails)
      .then(() => {
        setLoading(false);
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
        setLoading(false);
      });
  };

  return (
    <div className="container min-h-screen flex flex-col justify-center items-center py-2">
      <div
        id="main-profile-form"
        className="flex flex-col sm:flex-row justify-around items-center w-[500px] h-auto gap-4 bg-navBackground shadow-sm rounded-md border-violet-800 border-1 p-6"
      >
        <div className="flex flex-col justify-around w-full h-full text-white">
          <h3 className="text-lg font-semibold mb-2">Personal Details</h3>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label htmlFor="name" className="font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                disabled={!editMode}
                className={`border rounded-md p-2 ${
                  editMode ? "border-gray-400" : "border-gray-200"
                } w-[250px]`}
              />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="phonenumber" className="font-medium">
                Phone Number
              </label>
              <input
                id="phonenumber"
                type="text"
                name="phonenumber"
                value={userDetails.phonenumber}
                onChange={handleChange}
                disabled={!editMode}
                className={`border rounded-md p-2 ${
                  editMode ? "border-gray-400" : "border-gray-200"
                } w-[250px]`}
              />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="address" className="font-medium">
                Address
              </label>
              <input
                id="address"
                type="text"
                name="address"
                value={userDetails.address}
                onChange={handleChange}
                disabled={!editMode}
                className={`border rounded-md p-2 ${
                  editMode ? "border-gray-400" : "border-gray-200"
                } w-[250px]`}
              />
            </div>

            <div className="flex justify-center mt-4">
              {editMode ? (
                <button
                  onClick={handleSave}
                  className="bg-violet-950 w-52 text-white py-2 px-4 rounded-md hover:bg-violet-900 transition duration-300"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={handleEdit}
                  className="bg-violet-950 text-black py-2 px-4 rounded-md hover:bg-violet-900 transition duration-300"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
