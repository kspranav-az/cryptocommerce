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
import { getAddress } from 'ethers';


const navigation = [
  { name: "Tracker", href: "/Tracker" },
  { name: "WareHouse", href: "/Warehouse" },
];

const Commonheader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [accounts, setAccount] = useState(null) 

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


const connectHandler = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  
  const account = getAddress(accounts[0]); 
  setAccount(account);
};


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="h-fit overflow-hidden overscroll-x-none z-10">
          <header className="bg-[#170E46]">
            <nav
              className="flex items-center justify-between p-6 lg:px-8"
              aria-label="Global"
            >
              <div className="flex lg:flex-1 justify-start items-center">
                <a href="/" className="">
                  <img
                    src="/static/img/finallogo.png"
                    alt="logo.png"
                    className="h-20 w-20"
                  />
                </a>
                <a href="/" className=" ">
                  <h1 className="text-white font-extrabold text-xl">
                    SafeTransit
                  </h1>
                </a>
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
              <div className="hidden lg:flex lg:gap-x-12">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <h1
                      className={` text-base  font-semibold leading-6 hover:font-extrabold hover:underline hover:shadow-xl shadow-black  ${
                        router.pathname === item.href
                          ? "text-green-300"
                          : "text-white"
                      }`}
                    >
                      {item.name}
                    </h1>
                  </Link>
                ))}
              </div>

              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <div className="pr-5">
                  {accounts ? (
                    <button type="button" className="nav__connect ">
                      {accounts.slice(0, 6) + "..." + accounts.slice(38, 42)}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="nav__connect"
                      onClick={connectHandler}
                    >
                      Connect to your wallet
                    </button>
                  )}
                </div>
                {isLoggedIn ? (
                  <Link href={"/Userprofile"}>
                    <h1 className="text-xl font-semibold leading-6  text-white ">
                      User &rarr;
                    </h1>
                  </Link>
                ) : (
                  <button
                    onClick={handleSignIn}
                    className="text-sm font-semibold leading-6 text-white"
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
              <div className="fixed inset-0 z-50" />
              <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <Link href="#" className="-m-1.5 p-1.5">
                    <h1 className="text-black font-extrabold text-2xl">
                      SafeTransit
                    </h1>
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
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <h1 className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50">
                            {item.name}
                          </h1>
                        </Link>
                      ))}
                    </div>
                    <div className="text-black">
                      {accounts ? (
                        <button type="button" className="nav__connect ">
                          {accounts.slice(0, 6) + "..." + accounts.slice(38, 42)}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="nav__connect"
                          onClick={connectHandler}
                        >
                          Connect to your wallet
                        </button>
                      )}
                    </div>
                    <div className="py-6">
                      {isLoggedIn ? (
                        <Link href={"/Userprofile"}>
                          <h1 className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:font-extrabold hover:underline hover:shadow-xl shadow-white">
                            User
                          </h1>
                        </Link>
                      ) : (
                        <button
                          onClick={handleSignIn}
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-50 hover:font-extrabold hover:underline hover:shadow-xl shadow-white"
                        >
                          Log in
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog>
          </header>
        </div>
      )}
    </>
  );
};

export default Commonheader;
