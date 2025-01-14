import React, { useState, FormEvent } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const payloadObj = Object.fromEntries(formData.entries());

      // Validate payloadObj before sending
      if ((!payloadObj.username && !payloadObj.email) || !payloadObj.password) {
        toast.error("username or email and password is required");
        return;
      }

      // API Call
      const response = await axios.post("/api/users/sign-in", payloadObj);
      if (response.status === 200 && response.statusText === "OK") {
        toast(response?.data?.message || "Login Success");
        setTimeout(() => {
          router.push("/profile");
        }, 1500);
      } else {
        toast(response?.data?.message || "Login Faild");
      }
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <input type="hidden" name="remember" />
      <div className="relative">
        <div className="absolute right-3 top-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div className="content-center">
          <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
            Username
          </label>
          <input
            className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            placeholder="Username"
            autoComplete="off"
            name="username"
          />
        </div>
      </div>
      <div className="text-center">
        <span className="text-base text-gray-500">OR</span>
      </div>
      <div className="content-center">
        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
          Email
        </label>
        <input
          className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
          type="email"
          placeholder="mail@gmail.com"
          autoComplete="off"
          name="email"
        />
      </div>
      <div className="mt-8 content-center">
        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
          Password
        </label>
        <input
          className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
          type="password"
          placeholder="Enter your password"
          autoComplete="off"
          name="password"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
            id="remember"
            name="remember"
          />
          <label
            htmlFor="remember"
            className="ml-2 block text-sm text-gray-900"
          >
            Remember me
          </label>
        </div>
        <div className="text-sm">
          <a href="#" className="text-indigo-400 hover:text-blue-500">
            Forgot your password?
          </a>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Sign In"}
        </button>
      </div>
      <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
        <span>Dont have an account?</span>
        <Link href="/signup">
          <span className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300">
            Sign up
          </span>
        </Link>
      </p>
    </form>
  );
}

export default SignInForm;
