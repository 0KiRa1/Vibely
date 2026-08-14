import React from "react";
import { assets } from "../assets/assets";
import { Star } from "lucide-react";
import { SignIn } from "@clerk/react";

const Login = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Background */}
      <img
        src={assets.bgImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover scale-110 -z-20"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] -z-10" />

      {/* Floating Logo */}
      <img
        src={assets.Vibely2}
        alt="Vibely"
        className="absolute top-8 left-8 lg:left-16 h-14 md:h-16 z-20"
      />

      {/* Main Layout */}
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-8 md:px-16 lg:px-24 xl:px-32 pt-36 lg:pt-40 gap-16">

        {/* Left Hero Section */}
        <div className="flex-1 max-w-2xl">

          {/* Trust Card */}
          <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-2xl border border-white/70 shadow-xl rounded-2xl px-6 py-4 mb-12">

            <img
              src={assets.group_users}
              alt="Users"
              className="h-10"
            />

            <div>
              <div className="flex gap-1 mb-1">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <Star
                      key={index}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
              </div>

              <p className="text-sm font-medium text-slate-700">
                Trusted by 12,000+ active members
              </p>
            </div>

          </div>

          {/* Hero Heading */}
          <h1 className="text-5xl md:text-7xl xl:text-8xl font-black leading-[0.88] tracking-[-0.05em]">

            <span className="block text-slate-900">
              Connect
            </span>

            <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Smarter
            </span>

            <span className="block text-slate-900">
              Together.
            </span>

          </h1>

          {/* Description */}
          <p className="mt-8 text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
            Build meaningful relationships, discover communities,
            share your thoughts, and connect with people who inspire
            your journey every day.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 mt-12">

            <div>
              <h3 className="text-3xl font-bold text-slate-900">
                12K+
              </h3>
              <p className="text-slate-600">
                Active Users
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-slate-900">
                150+
              </h3>
              <p className="text-slate-600">
                Communities
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-slate-900">
                50+
              </h3>
              <p className="text-slate-600">
                Countries
              </p>
            </div>

          </div>

        </div>

        {/* Right Sign In Section */}
        <div className="flex-1 flex justify-center items-center w-full">
            <SignIn
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-none bg-transparent",
                },
              }}
            />
        </div>

      </div>
    </div>
  );
};

export default Login;