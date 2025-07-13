import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, Play } from "lucide-react";

const LandingPage = () => {
  return (
    <section className="pt-32 bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden h-[650px]">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-[650px] object-cover z-0"
      >
        <source src="/animated/landing_page_animated.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-10">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-20 animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-30 animate-float-medium"></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full opacity-25 animate-float-fast"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      </div>

      <div className="max-w-2xl px-4 pb-12 sm:px-6 lg:px-8 relative z-20 h-full flex items-end">
        {/* Left Content */}
        <div className="text-left max-w-2xl">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200 animate-pulse-slow">
              🚀 Cross-Chain Fan Token Protocol
            </span>
          </div>

          <div>
            <h1 className="text-4xl font-awesome md:text-6xl mb-2 font-bold text-gray-900 leading-tight">
              Your Gateway
              <br />
              <span className="text-transparent  bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 animate-gradient">
                to Fan Tokens
              </span>
            </h1>

            <p className="text-xl text-gray-700 mb-6 max-w-xl leading-relaxed">
              Pepper Protocol lets you swap, lend, and borrow fan tokens across
              Ethereum, Base, and Chiliz — without ever touching a bridge.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
              <Button className="h-12 rounded-full" variant="secondary">
                <span className="font-inter text-xs">
                  Stake and Get your Fan Token
                </span>
                <div className="ml-8 rounded-full px-2 py-2 bg-blue-500 flex items-center ">
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                    color="white"
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        {/* <div className="mt-16 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl blur-lg opacity-20 animate-pulse"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 transform hover:scale-105 transition-transform duration-300">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="group">
                  <div className="text-3xl font-bold text-blue-600 group-hover:scale-110 transition-transform">
                    3+
                  </div>
                  <div className="text-sm text-gray-600">Supported Chains</div>
                </div>
                <div className="group">
                  <div className="text-3xl font-bold text-green-600 group-hover:scale-110 transition-transform">
                    100+
                  </div>
                  <div className="text-sm text-gray-600">Fan Tokens</div>
                </div>
                <div className="group">
                  <div className="text-3xl font-bold text-orange-600 group-hover:scale-110 transition-transform">
                    $50M+
                  </div>
                  <div className="text-sm text-gray-600">Volume Traded</div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default LandingPage;
