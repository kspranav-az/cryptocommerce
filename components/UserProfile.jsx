import React, { useState, useEffect } from 'react';
import { update, ref, get } from 'firebase/database';
import { db, auth } from '@/firebaseConfig';

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [userDetails, setUserDetails] = useState({
    name: '',
    regno: '',
    phonenumber: '',
    age: '',
    graduate: '',
    branch: '',
    yearofpassout: '',
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const name = user.displayName;
        setDisplayName(name);
      } else {
        setDisplayName('');
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
        console.error('Error fetching user details:', error);
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
        console.error('Error updating user details:', error);
        setLoading(false);
      });
  };

  const [bookingDetails, setBookingDetails] = useState(null);
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        const bookingRef = ref(db, `newuser/bookings/${displayName}`);
        const bookingSnapshot = await get(bookingRef);
        if (bookingSnapshot.exists()) {
          const bookingData = bookingSnapshot.val();
          const vehicleRef = ref(db, `newuser/vechile1/${bookingData.vehicleNumber}`);
          const vehicleSnapshot = await get(vehicleRef);
          const v = vehicleSnapshot.val();
          if (vehicleSnapshot.exists()) {
            setBookingDetails({
              carNumber: bookingData.vehicleNumber,
              from: v.from,
              to: v.to,
              date: v.date,
            });
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching booking details:', error);
        setLoading(false);
      }
    };
    if (displayName) {
      fetchBookingDetails();
    }
  }, [displayName]); 

  return (
    <div className="container mx-auto px-4 py-8   h-[60rem] flex flex-col justify-center ">
      <div className="flex flex-col sm:flex-row justify-around h-[65vh] sm:h-[35vh] gap-8">
        <div className="mb-8 bg-gray-400 rounded-l-3xl w-full h-full shadow-black shadow-2xl">
          <h3 className="text-lg font-semibold mb-2 pl-4">Personal Details</h3>
          <div className="flex flex-col justify-around h-full text-black">
            <div className="flex justify-around">
              <h1>Reg Number</h1>
              <input
                type="text"
                name="regno"
                value={userDetails.regno}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="flex justify-around">
              <h1>Phone Number</h1>
              <input
                type="text"
                name="phonenumber"
                value={userDetails.phonenumber}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="flex justify-around">
              <h1>Age</h1>
              <input
                type="text"
                name="age"
                value={userDetails.age}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
          </div>
        </div>
        <div className="mb-8 bg-gray-400 rounded-r-3xl w-full h-full shadow-black shadow-2xl">
          <h3 className="text-lg font-semibold mb-2 pl-4 text-end pr-3">Academic Details</h3>
          <div className="flex flex-col justify-around h-full text-black">
            <div className="flex justify-around">
              <h1>Graduate</h1>
              <select
                name="graduate"
                value={userDetails.graduate}
                onChange={handleChange}
                disabled={!editMode}
              >
                <option value="UG">UG</option>
                <option value="PG">PG</option>
              </select>
            </div>
            <div className="flex justify-around">
              <h1>Branch</h1>
              <select
                name="branch"
                value={userDetails.branch}
                onChange={handleChange}
                disabled={!editMode}
              >
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
              </select>
            </div>
            <div className="flex justify-around">
              <h1>Year of Passout</h1>
              <select
                name="yearofpassout"
                value={userDetails.yearofpassout}
                onChange={handleChange}
                disabled={!editMode}
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-4 pb-4">
        {editMode ? (
          <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            Save
          </button>
        ) : (
          <button onClick={handleEdit} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            Edit
          </button>
        )}
      </div>
      <div className="mb-8 bg-gray-400 rounded-3xl p-3 ">
          <h3 className="text-lg font-semibold text-center mb-2 pl-4  pr-3">Booking Details</h3>
          {loading ? (
            <p>Loading...</p>
          ) : bookingDetails ? (
            <div className="flex justify-around   text-black">
              <div className="flex justify-around">
                <h1>Car Number: </h1>
                <p>{bookingDetails.carNumber}</p>
              </div>
              <div className="flex justify-around">
                <h1>From: </h1>
                <p>{bookingDetails.from}</p>
              </div>
              <div className="flex justify-around">
                <h1>To: </h1>
                <p>{bookingDetails.to}</p>
              </div>
              <div className="flex justify-around">
                <h1>Date: </h1>
                <p>{bookingDetails.date}</p>
              </div>
            </div>
          ) : (
            <p className='text-center text-black'>No booking details found</p>
          )}
        </div>
    </div>
  );
};

export default UserProfile;
