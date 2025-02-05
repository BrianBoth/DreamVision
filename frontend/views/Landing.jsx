import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center text-white px-4"
      style={{ fontFamily: "Bubblegum Sans, sans-serif" }}
    >
      <div className="absolute inset-0 bg-[url('/darkmoon.jpeg')] bg-center z-[-1]"></div>

      <div className="absolute top-10 right-10 flex gap-4">
        <Link
          to="/login"
          className="bg-white text-black px-6 py-2 rounded-lg text-lg font-bold hover:bg-gray-300 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-blue-600 px-6 py-2 rounded-lg text-lg font-bold hover:bg-blue-800 transition"
        >
          Signup
        </Link>
      </div>

      <div className="flex flex-col items-center text-center gap-6 px-6">
        <h1 className="text-7xl font-extrabold">Good Morning</h1>
        <div className="text-2xl">
          <h4>Are you ready to create</h4>
          <h4>unforgettable dreams?</h4>
        </div>
      </div>
    </section>
  );
}

export default Landing;
