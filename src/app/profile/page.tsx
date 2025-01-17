"use client";
import React, { useState, useEffect } from "react";
import "@/styles/profile.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Loader, LogoutBtn } from "@/components/index";

interface User {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Profile() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const router = useRouter();

  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/users/profile");
      if (
        response.status === 200 &&
        response.statusText === "OK" &&
        response.data
      ) {
        setUserData(response.data.data);
      } else {
        toast("No user found");
      }
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-gray-100">
          <div className="w-full text-white bg-main-color">
            <div className="p-4 flex flex-row items-center justify-between">
              <Link
                href="/"
                className="text-lg font-semibold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline"
              >
                My Profile
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                className="md:hidden rounded-lg focus:outline-none focus:shadow-outline"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  // Close Icon
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  // Hamburger Menu Icon
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>

              {/* Navigation Menu */}
              <nav
                className={`flex-col flex-grow pb-4 md:pb-0 ${
                  isMobileMenuOpen ? "flex" : "hidden"
                } md:flex md:justify-end md:flex-row`}
              >
                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    className="flex items-center gap-3 shadow-xl p-2"
                  >
                    <span>{userData?.username}</span>
                    <Image
                      className="inline rounded-full"
                      src="/next.svg"
                      alt="Profile Picture"
                      width={40}
                      height={40}
                    />
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className={`inline w-4 h-4 transition-transform duration-200 transform ${
                        isProfileDropdownOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-[166px]">
                      <div className="py-2 bg-white text-gray-800 text-sm rounded-sm border border-main-color shadow-sm">
                        <Link
                          className="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                          href="/settings"
                        >
                          Settings
                        </Link>
                        <Link
                          className="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                          href="/help"
                        >
                          Help
                        </Link>
                        <div className="border-b"></div>
                        {/* <Link
                          className="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                          href="/logout"
                        >
                          Logout
                        </Link> */}
                        <LogoutBtn />
                      </div>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>
          {/* End of Navbar  */}

          <div className="container mx-auto my-5 p-5">
            <div className="md:flex no-wrap md:-mx-2 ">
              {/* Left Side  */}
              <div className="w-full md:w-3/12 md:mx-2">
                {/* Profile Card  */}
                <div className="bg-white p-3 border-t-4 border-green-500">
                  <div className="image overflow-hidden">
                    <Image
                      className="w-full mx-auto"
                      src="/next.svg"
                      alt="text"
                      width={16}
                      height={16}
                    />
                  </div>
                  <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                    {userData?.username}
                  </h1>
                  <h3 className="text-gray-600 font-lg text-semibold leading-6">
                    Owner at Her Company Inc.
                  </h3>
                  <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Reprehenderit, eligendi dolorum sequi illum qui unde
                    aspernatur non deserunt
                  </p>
                  <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                    <li className="flex items-center py-3">
                      <span>Status</span>
                      <span className="ml-auto">
                        <span
                          className={`${
                            userData?.isVerified ? "bg-green-500" : "bg-red-500"
                          }  py-1 px-2 rounded text-white text-sm`}
                        >
                          {userData?.isVerified
                            ? "✅ Verified"
                            : "❌ Not Verified"}
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center py-3">
                      <span>Member since</span>
                      <span className="ml-auto">Nov 07, 2016</span>
                    </li>
                  </ul>
                </div>
                {/* End of profile card  */}
                <div className="my-4"></div>
                {/* Friends card  */}
                <div className="bg-white p-3 hover:shadow border-t-4 border-t-green-500">
                  <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                    <span className="text-green-500">
                      <svg
                        className="h-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </span>
                    <span>Similar Profiles</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-center my-2">
                      <Image
                        className="h-16 w-16 rounded-full mx-auto"
                        src="/next.svg"
                        alt="text"
                        width={64}
                        height={64}
                      />
                      <a href="#" className="text-main-color">
                        Kojstantin
                      </a>
                    </div>
                    <div className="text-center my-2">
                      <Image
                        className="h-16 w-16 rounded-full mx-auto"
                        src="/next.svg"
                        alt="text"
                        width={64}
                        height={64}
                      />
                      <a href="#" className="text-main-color">
                        James
                      </a>
                    </div>
                    <div className="text-center my-2">
                      <Image
                        className="h-16 w-16 rounded-full mx-auto"
                        src="/next.svg"
                        alt="text"
                        width={64}
                        height={64}
                      />
                      <a href="#" className="text-main-color">
                        Natie
                      </a>
                    </div>
                  </div>
                </div>
                {/* End of friends card  */}
              </div>
              {/* Right Side  */}
              <div className="w-full md:w-9/12 mx-2 h-64">
                {/* Profile tab  */}
                {/* About Section  */}
                <div className="bg-white p-3 shadow-sm rounded-sm">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span className="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">About</span>
                  </div>
                  <div className="text-gray-700">
                    <div className="grid md:grid-cols-2 text-sm">
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          First Name
                        </div>
                        <div className="px-4 py-2">Mohammad</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Last Name</div>
                        <div className="px-4 py-2">
                          {userData?.username || ""}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Gender</div>
                        <div className="px-4 py-2">Male</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Contact No.
                        </div>
                        <div className="px-4 py-2">+91 81020-59861</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Current Address
                        </div>
                        <div className="px-4 py-2">
                          Beech Creek, PA, Pennsylvania
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Permanant Address
                        </div>
                        <div className="px-4 py-2">
                          Arlington Heights, IL, Illinois
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Email.</div>
                        <div className="px-4 py-2">
                          <a
                            className="text-gray-800"
                            href={userData?.email || ""}
                          >
                            {userData?.email || ""}
                          </a>
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Birthday</div>
                        <div className="px-4 py-2">Dec 05, 1995</div>
                      </div>
                    </div>
                  </div>
                  <button className="block w-full text-zinc-800 text-sm font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 hover:shadow-xs focus:bg-gray-200 focus:outline-none focus:shadow-outline p-3 mt-4">
                    Show Full Information
                  </button>
                </div>
                {/* End of about section  */}

                <div className="my-4"></div>

                {/* Experience and education  */}
                <div className="bg-white p-3 shadow-sm rounded-sm">
                  <div className="grid grid-cols-2">
                    <div>
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                        <span className="text-green-500">
                          <svg
                            className="h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </span>
                        <span className="tracking-wide">Experience</span>
                      </div>
                      <ul className="list-inside space-y-2">
                        <li>
                          <div className="text-teal-600">
                            Owner at Her Company Inc.
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                        <li>
                          <div className="text-teal-600">
                            Owner at Her Company Inc.
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                        <li>
                          <div className="text-teal-600">
                            Owner at Her Company Inc.
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                        <li>
                          <div className="text-teal-600">
                            Owner at Her Company Inc.
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                        <span className="text-green-500">
                          <svg
                            className="h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path
                              fill="#fff"
                              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                            />
                          </svg>
                        </span>
                        <span className="tracking-wide">Education</span>
                      </div>
                      <ul className="list-inside space-y-2">
                        <li>
                          <div className="text-teal-600">
                            Masters Degree in Oxford
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                        <li>
                          <div className="text-teal-600">
                            Bachelors Degreen in LPU
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End of Experience and education grid  */}
                </div>
                {/* End of profile tab  */}
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="sticky-bottom w-full bg-main-color text-white pt-3 pb-2 text-center">
            <p>Designed by Code Aviators</p>
          </div>
        </div>
      )}
    </>
  );
}
