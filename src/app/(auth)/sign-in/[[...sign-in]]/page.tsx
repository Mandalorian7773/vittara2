"use client";

import React from "react";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const SignInPage = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#F5F1EA] via-[#E9DCCF] to-[#DDD0BF] overflow-hidden">
      
      {/* Decorative Ornaments - keeping it subtle */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#D2691E]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D2691E]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-md px-4 flex flex-col items-center">
        
        {/* Logo */}
        <div className="mb-8 relative w-48 h-16 transform transition-transform hover:scale-105 duration-500">
           <Link href="/">
              <Image 
                src="/images/logo2.png"
                alt="Manyavar Mohey Logo"
                fill
                className="object-contain"
                priority
              />
           </Link>
        </div>

        {/* Card */}
        <div className="w-full bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 flex flex-col items-center animate-scale-in transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            
            <h2 className="text-3xl font-bold text-[#2C1810] mb-2 font-serif text-center">Welcome Back</h2>
            <p className="text-[#8B4513]/80 text-center mb-8 text-sm max-w-xs">
              Sign in to continue your journey through our exclusive collection.
            </p>

            <SignIn 
                appearance={{
                    elements: {
                        rootBox: "w-full",
                        card: "bg-transparent shadow-none w-full border-none p-0",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton: "bg-white border-2 border-[#E9DCCF] hover:bg-[#F5F1EA] hover:border-[#D2691E]/30 text-[#2C1810] transition-all duration-200 rounded-xl py-2.5",
                        socialButtonsBlockButtonText: "font-semibold",
                        dividerLine: "bg-[#E9DCCF]",
                        dividerText: "text-[#8B4513]/60 bg-transparent",
                        formFieldLabel: "text-[#2C1810] font-semibold",
                        formFieldInput: "bg-white border-2 border-[#E9DCCF] focus:border-[#D2691E] text-[#2C1810] rounded-xl py-2.5 transition-all duration-200",
                        formButtonPrimary: "bg-gradient-to-r from-[#D2691E] to-[#B8541A] hover:bg-[#A04815] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 rounded-xl py-3 font-bold tracking-wide normal-case",
                        footerActionLink: "text-[#D2691E] hover:text-[#B8541A] font-semibold underline decoration-2 decoration-transparent hover:decoration-[#D2691E] transition-all",
                        identityPreviewText: "text-[#2C1810]",
                        formFieldInputShowPasswordButton: "text-[#D2691E] hover:text-[#B8541A]",
                    },
                    layout: {
                        socialButtonsPlacement: "top",
                        logoPlacement: "none"
                    }
                }}
            />
        </div>

        {/* Back Link */}
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-[#8B4513] hover:text-[#D2691E] font-medium transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </div>

       <style jsx global>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.98);
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1);
            transform: translateY(0);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default SignInPage;
