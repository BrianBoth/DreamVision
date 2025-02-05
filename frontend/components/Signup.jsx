import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function signup() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Signup failed");
      }
      const parsedResponse = await response.json();
      console.log(parsedResponse);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error during signup: ", err.message);
    }
  };
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-white px-4"
      style={{ fontFamily: "Bubblegum Sans, sans-serif" }}
    >
      <div className="absolute inset-0 bg-[url('/darkmoon.jpeg')] bg-cover bg-center z-[-1]"></div>
      <div className="w-full max-w-md bg-opacity-60 bg-white/10 rounded-3xl shadow-lg backdrop-blur-md p-8 flex flex-col items-center gap-8">
        <h2 className="text-white text-4xl font-extrabold drop-shadow-md animate-fadeIn">
          A Few Steps to Dive into the Dream World!
        </h2>

        <form
          className="flex flex-col gap-6 w-full animate-slideUp"
          onSubmit={handleSignup}
        >
          <input
            type="text"
            name="username"
            id="username"
            className="placeholder-white border border-transparent rounded-2xl py-2 px-4 bg-opacity-60 bg-white/10 focus:border-white focus:outline-none focus:ring-2 transition-all"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
          <input
            type="email"
            name="email"
            id="email"
            className="placeholder-white border border-transparent rounded-2xl py-2 px-4 bg-opacity-60 bg-white/10 focus:border-white focus:outline-none focus:ring-2  transition-all"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            className="placeholder-white border border-transparent rounded-2xl py-2 px-4 bg-opacity-60 bg-white/10 focus:border-white focus:outline-none focus:ring-2  transition-all"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />

          <button className="cursor-pointer mt-4 bg-white text-black py-2 px-6 rounded-full font-semibold transition-all shadow-md">
            Signup
          </button>
        </form>
      </div>
    </section>
  );
}

export default signup;
