"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebaseConfig";
import { ref, set, get } from "firebase/database";
import { db } from "@/firebaseConfig";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Loading from "./Loading";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  const handleSignIn = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then(async (data) => {
        const signedInName = data.user.displayName || data.user.email;

        sessionStorage.setItem("email", data.user.email);
        sessionStorage.setItem("emailstatus", true);

        const userDetailsRef = ref(db, `newuser/userdetail/${signedInName}`);
        const userDetailsSnapshot = await get(userDetailsRef);
        if (!userDetailsSnapshot.exists()) {
          await set(userDetailsRef, {
            name: signedInName,
            regno: "",
            phonenumber: "",
            age: "",
            graduate: "",
            branch: "",
            yearofpassout: "",
          });
        }

        setIsLoggedIn(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error signing in:", error.message);
      });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="overflow-hidden overscroll-x-none z-10">
          <header className="bg-navBackground">
            <nav
              className="flex items-center justify-between p-6 lg:px-8"
              aria-label="Global"
            >
              {/* Logo and Logo Name */}
              <div className="flex items-center space-x-3">
                <img
                  src="static/img/finallogo.png"
                  className="w-16 h-16"
                  alt="SAFETRANSIT"
                />
                <a href="/" className="-m-1.5 p-1.5">
                  <h1 className="text-white font-semibold text-sm">
                    SafeTransit
                  </h1>
                </a>
              </div>

              {/* Profile Image and Profile Name */}
              <div className="hidden lg:flex lg:items-center lg:space-x-3">
                <span className="text-white text-sm">Profile</span>
                <img
                  src="static/img/Userprofile.png"
                  alt="profilepic"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>

              <div className="flex lg:hidden">
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                {isLoggedIn ? (
                  <Link href={"/Userprofile"}>
                    <h1 className="text-sm font-semibold leading-6 text-gray-900">
                      User &rarr;
                    </h1>
                  </Link>
                ) : (
                  <button
                    onClick={handleSignIn}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Log in <span aria-hidden="true">&rarr;</span>
                  </button>
                )}
              </div>
            </nav>

            <Dialog
              as="div"
              className="lg:hidden text-black"
              open={mobileMenuOpen}
              onClose={setMobileMenuOpen}
            >
              <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <Link href="#" className="-m-1.5 p-1.5">
                    <h1 className="text-black font-extrabold text-2xl">VP</h1>
                  </Link>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      {/* Other navigation items */}
                    </div>
                    <div className="py-6">
                      {isLoggedIn ? (
                        <Link href={"/User"}>
                          <h1 className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:font-extrabold hover:underline hover:shadow-xl shadow-black">
                            User
                          </h1>
                        </Link>
                      ) : (
                        <button
                          onClick={handleSignIn}
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-50 hover:font-extrabold hover:underline hover:shadow-xl shadow-black"
                        >
                          Log in
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog>

            <div className="fixed inset-0 z-50" />
          </header>
        </div>
      )}
    </>
  );
};
export default Navbar;
