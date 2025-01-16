"use client";
import React, { useEffect, useState } from "react";
import "@/styles/verifyemail.css";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
// import { useRouter } from "next/router";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  // const router = useRouter();

  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/verify-email", token);
      console.log(response);
      setIsVerified(true);
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "It's seems your token is already get used or expired.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Pure JavaScript
    const urlToken = window.location.search.split("=")[1];
    const tokenString = JSON.stringify(urlToken);
    setToken(tokenString || "");

    // Nextjs Utillization
    // const { query } = router;
    // const urlToken = query.token;
    // console.log(urlToken);

    // if (typeof urlToken === "string") {
    //   setToken(urlToken);
    // }
  }, []);

  return (
    <div className="w-full min-h-screen d-flex justify-center items-center">
      <div className="bg-gradient-to-r from-purple-300 to-blue-200">
        <div className="w-6/12 m-auto py-16 min-h-screen flex items-center justify-center">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
            <div className="border-t border-gray-200 text-center pt-8">
              <p className="text-2xl pb-8 px-12 font-medium">
                Click the verify button to verify your email <br />
                {isVerified ? "Congrats! your email get verified." : ""}
              </p>
              <button
                className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-2 rounded-md mr-6"
                onClick={verifyUserEmail}
                disabled={loading}
              >
                {loading ? "Verifing ..." : "Verify"}
              </button>
              <Link href={"/signin"}>
                <button className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-500 text-white font-semibold px-6 py-2 rounded-md">
                  Log In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
