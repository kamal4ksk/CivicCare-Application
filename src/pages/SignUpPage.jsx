import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiMegaphone,
} from "react-icons/hi2";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleRegister = async () => {
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    await registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    alert("Registration Successful");

    navigate("/signin");
  } catch (error) {
    console.log("Full Error:", error);
    console.log("Response:", error.response);

    alert(
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Registration Failed"
    );
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
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-6"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#2b7fff] to-[#9810fa] flex items-center justify-center shadow-xl shadow-purple-200">
            <HiMegaphone className="w-10 h-10 text-white -rotate-12" />
          </div>

          <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold text-slate-900 text-center">
            Create Account
          </h1>

          <p className="text-slate-500 text-sm sm:text-base mt-2 text-center px-4">
            Join CivicCare and help improve your community
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-[32px] border border-white shadow-[0_25px_80px_-15px_rgba(0,0,0,0.08)] p-6 sm:p-8">

          {/* Full Name */}
          <div className="mb-5">
            <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Full Name
            </label>

            <div className="relative">
              <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />

              <input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Your full name"
                className="w-full h-14 pl-12 pr-4 rounded-2xl border border-slate-200 bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Email Address
            </label>

            <div className="relative">
              <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />

            <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="you@example.com"
                className="w-full h-14 pl-12 pr-4 rounded-2xl border border-slate-200 bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Password
            </label>

            <div className="relative">
              <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />

             <input
  type="password"
  name="password"
  value={formData.password}
  onChange={handleChange}
  placeholder="Minimum 6 characters"
                className="w-full h-14 pl-12 pr-4 rounded-2xl border border-slate-200 bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Confirm Password
            </label>

            <div className="relative">
              <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />

           <input
  type="password"
  name="confirmPassword"
  value={formData.confirmPassword}
  onChange={handleChange}
  placeholder="Confirm your password"
                className="w-full h-14 pl-12 pr-4 rounded-2xl border border-slate-200 bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
              />
            </div>
          </div>

          {/* Terms */}
          <div className="mt-5 mb-6">
            <label className="flex items-start gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                className="mt-1 rounded border-slate-300"
              />
              <span>
                I agree to the{" "}
                <span className="font-semibold text-blue-600 cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="font-semibold text-blue-600 cursor-pointer">
                  Privacy Policy
                </span>
              </span>
            </label>
          </div>

          {/* Create Account Button */}
          <button
  onClick={handleRegister}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#2b7fff] to-[#9810fa] text-white font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          >
            Create Account
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

          {/* Sign In Link */}
          <p className="text-center text-sm text-slate-500 mt-8">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-bold text-blue-600 hover:text-purple-600 transition-colors"
            >
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}