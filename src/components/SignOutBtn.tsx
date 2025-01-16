import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function SignOutBtn() {
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/sign-out");
      if (response.status === 200 && response.statusText === "OK") {
        toast(response?.data?.message);
        setTimeout(() => {
          router.push("/signin");
        }, 1000);
      } else {
        toast(response?.data?.message || "Unauthorized request!");
      }
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div
      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-3"
      onClick={logout}
    >
      LogOut
    </div>
  );
}

export default SignOutBtn;
