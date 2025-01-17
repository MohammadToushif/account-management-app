"use client";
import React from "react";
import "@/styles/signup.css";
import Image from "next/image";
import { SignUpForm } from "@/components/index";

export default function SignUp() {
  return (
    <div className="relative min-h-screen flex ">
      <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
        <div
          className="sm:w-1/2 xl:w-2/5 h-full hidden md:flex flex-auto items-center justify-start p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
          style={{
            backgroundImage: "url(/signup-background.avif)",
          }}
        >
          <div className="absolute bg-gradient-to-b from-blue-900 to-gray-900 opacity-75 inset-0 z-0"></div>
          <div
            className="absolute triangle  min-h-screen right-0 w-16"
            style={{}}
          ></div>
          <div className="flex absolute top-5 text-center text-gray-100 focus:outline-none">
            <Image
              width={10}
              height={10}
              src="/next.svg"
              alt="next"
              className="object-cover mx-auto rounded-full w-10 h-10"
            />
            <p className="text-xl ml-3">
              md <strong>toushif</strong>
            </p>{" "}
          </div>
          <Image
            width={384}
            height={384}
            alt="jasper"
            src="/headphone.png"
            className="absolute -right-10"
          />
          <div className="w-full max-w-md z-10">
            <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
              Reference site about Lorem Ipsum..
            </div>
            <div className="sm:text-sm xl:text-md text-gray-200 font-normal">
              {" "}
              What is Lorem Ipsum Lorem Ipsum is simply dummy text of the
              printing and typesetting industry Lorem Ipsum has been the
              industrys standard dummy text ever since the 1500s when an unknown
              printer took a galley of type and scrambled it to make a type
              specimen book it has?
            </div>
          </div>
          <ul className="circles">
            {[...Array(10)].map((_, index) => (
              <li key={index}></li>
            ))}
          </ul>
        </div>
        <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full md:w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white ">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Join Us Today!
              </h2>
            </div>
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}
