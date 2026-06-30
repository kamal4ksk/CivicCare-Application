import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiMegaphone,
} from "react-icons/hi2";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

export default function SignInPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  email: "",
  password: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleLogin = async () => {
  try {
    const response = await loginUser(formData);

    // Save JWT Token
    localStorage.setItem("token", response.data.token);

    // Optional: Save logged-in user
    localStorage.setItem("user", JSON.stringify(response.data.user));

    alert("Login Successful");

    navigate("/home");
  } catch (error) {
    alert(error.response?.data?.message || "Login Failed");
  }
};

  return (
<div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12 bg-gradient-to-br from-[#eff6ff] via-[#faf5ff] to-[#fdf2f8] relative overflow-hidden">
      {/* Background Blobs */}
     <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl -translate-x-40 -translate-y-40" />

<div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl translate-x-40 translate-y-40" />

<div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 w-full max-w-md">

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors mb-6"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Logo */}
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-[#2b7fff] to-[#9810fa] flex items-center justify-center shadow-xl shadow-purple-200">
            <HiMegaphone className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-12" />
          </div>

          <h1 className="mt-4 sm:mt-5 text-2xl sm:text-3xl font-extrabold text-slate-900 text-center">
            Welcome Back
          </h1>

          <p className="text-slate-500 text-sm mt-2 text-center">
            Sign in to continue to CivicCare
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-slate-100 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.08)] p-5 sm:p-8">

          {/* Email */}
          <div className="mb-5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Email Address
            </label>

            <div className="relative">
              <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
<input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
                className="w-full h-12 sm:h-14 pl-12 pr-4 rounded-2xl border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Password
            </label>

            <div className="relative">
              <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />

             <input
  type="password"
  name="password"
  value={formData.password}
  onChange={handleChange}
                className="w-full h-12 sm:h-14 pl-12 pr-4 rounded-2xl border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
              />
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4 mb-6">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" />
              Remember me
            </label>

            <button className="text-sm font-semibold text-blue-600 hover:text-purple-600 text-left sm:text-right">
              Forgot Password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
  onClick={handleLogin}
            className="w-full h-12 sm:h-14 rounded-2xl bg-gradient-to-r from-[#2b7fff] to-[#9810fa] text-white font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            Sign In
            <FiArrowRight />
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs font-bold text-slate-400 uppercase">
              Or
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Google Button */}
         <button className="w-full h-14 rounded-2xl border border-slate-200 bg-white flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
  <img
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="Google"
    className="w-5 h-5"
  />

  <span className="font-semibold text-slate-700">
    Continue with Google
  </span>
</button>
          {/* Footer */}
          <p className="text-center text-sm text-slate-500 mt-8">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-bold text-blue-600 hover:text-purple-600"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}