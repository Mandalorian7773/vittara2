"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserProfile,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import { motion } from "framer-motion";
import {
  FaUserShield,
  FaUser,
  FaCrown,
  FaChartBar,
  FaUsers,
  FaCog,
} from "react-icons/fa";

// Admin emails list - Add your admin emails here
const ADMIN_EMAILS = [
  "admin@example.com", // Replace with actual admin emails
  "owner@yourstore.com", // Add more admin emails as needed
];

// Check if user is admin
const isUserAdmin = (email: string | undefined): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
};

// Profile SVG Illustration - Enhanced
const ProfileIllustration = () => (
  <motion.div
    initial={{ scale: 0, rotate: -180, opacity: 0 }}
    animate={{ scale: 1, rotate: 0, opacity: 1 }}
    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
    className="flex justify-center mb-6"
  >
    <motion.svg
      viewBox="0 0 200 200"
      className="w-32 h-32"
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Outer ring animation */}
      <motion.circle
        cx="100"
        cy="100"
        r="90"
        stroke="url(#gradient1)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
      />

      {/* Inner circle with gradient */}
      <motion.circle
        cx="100"
        cy="100"
        r="60"
        fill="url(#gradient2)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
      />

      {/* Animated stars around the circle */}
      {[...Array(8)].map((_, i) => {
        const angle = i * 45 * (Math.PI / 180);
        const radius = 120;
        const x = 100 + Math.cos(angle) * radius;
        const y = 100 + Math.sin(angle) * radius;

        return (
          <motion.g key={i}>
            <motion.circle
              cx={x}
              cy={y}
              r="4"
              fill="white"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                delay: 1.8 + i * 0.2,
                repeat: Infinity,
                repeatDelay: 4,
              }}
            />
            <motion.path
              d={`M ${x - 3} ${y} L ${x + 3} ${y} M ${x} ${y - 3} L ${x} ${
                y + 3
              }`}
              stroke="white"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 2,
                delay: 2 + i * 0.3,
                repeat: Infinity,
                repeatDelay: 5,
              }}
            />
          </motion.g>
        );
      })}

      {/* Gradient definitions */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="50%" stopColor="#000000" />
          <stop offset="100%" stopColor="#F4A460" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="100%" stopColor="#F4A460" />
        </linearGradient>
      </defs>
    </motion.svg>
  </motion.div>
);

// Floating particles background animation
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-gradient-to-r from-[#000000] to-[#F4A460] rounded-full opacity-20"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [-20, -100],
          x: [0, Math.random() * 100 - 50],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 5,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    ))}
  </div>
);

// Admin Dashboard Component
const AdminDashboard = () => {
  const { user } = useUser();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      {/* Admin Header */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-gradient-to-r from-[#8B0000] to-[#DC143C] text-white p-6 rounded-2xl relative overflow-hidden"
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="flex items-center gap-3 mb-4 relative z-10">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <FaCrown className="text-2xl text-yellow-300" />
          </motion.div>
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        </div>
        <p className="text-white/90 relative z-10">
          Welcome back, {user?.firstName || "Admin"}! You have administrative
          privileges.
        </p>
      </motion.div>

      {/* Admin Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            icon: FaUsers,
            title: "User Management",
            description: "Manage user accounts, permissions, and access levels",
            delay: 0.1,
          },
          {
            icon: FaChartBar,
            title: "Analytics",
            description: "View detailed analytics and performance metrics",
            delay: 0.2,
          },
          {
            icon: FaCog,
            title: "System Settings",
            description: "Configure system settings and preferences",
            delay: 0.3,
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: item.delay, duration: 0.6 }}
            whileHover={{
              scale: 1.02,
              y: -5,
              boxShadow: "0 20px 40px -10px rgba(139, 0, 0, 0.2)",
            }}
            className="bg-white p-6 rounded-xl shadow-lg border border-[#E5D3B3]/50 cursor-pointer relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#DC143C]/10 to-[#FF6347]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              layoutId={`background-${index}`}
            />

            <div className="flex items-center gap-3 mb-3 relative z-10">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <item.icon className="text-2xl text-[#000000]" />
              </motion.div>
              <h3 className="text-lg font-semibold text-[#000000]">
                {item.title}
              </h3>
            </div>
            <p className="text-[#000000]/70 text-sm relative z-10">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// User Dashboard Component
const UserDashboard = () => {
  const { user } = useUser();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      {/* User Header */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-gradient-to-r from-[#000000] to-[#000000] text-white p-6 rounded-2xl relative overflow-hidden"
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="flex items-center gap-3 mb-4 relative z-10">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaUser className="text-2xl text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold">User Dashboard</h2>
        </div>
        <p className="text-white/90 relative z-10">
          Welcome back, {user?.firstName || "User"}! Manage your account and
          preferences.
        </p>
      </motion.div>
    </motion.div>
  );
};

// Enhanced Welcome Message Component
const WelcomeMessage = ({ isAdmin }: { isAdmin: boolean }) => {
  const { user } = useUser();

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
      className="text-center mb-12 relative mt-16"
    >
      <FloatingParticles />

      {/* Profile Illustration Integration */}
      <ProfileIllustration />

      <motion.div className="flex items-center justify-center gap-3 mb-4">
        {isAdmin ? (
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <FaUserShield className="text-4xl text-[#DC143C]" />
          </motion.div>
        ) : (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaUser className="text-4xl text-[#000000]" />
          </motion.div>
        )}
      </motion.div>

      <motion.h1
        className="text-5xl md:text-6xl font-bold mb-4 pt-8"
        style={{
          background: isAdmin
            ? "linear-gradient(45deg, #8B0000, #DC143C, #FF6347, #8B0000)"
            : "linear-gradient(45deg, #000000, #000000, #F4A460, #000000)",
          backgroundSize: "300% 300%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        whileHover={{ scale: 1.05 }}
      >
        {isAdmin ? "Admin Panel" : "Account Dashboard"}
      </motion.h1>

      <motion.div
        className={`w-24 h-1 mx-auto mb-4 rounded-full ${
          isAdmin
            ? "bg-gradient-to-r from-[#DC143C] to-[#FF6347]"
            : "bg-gradient-to-r from-[#000000] to-[#F4A460]"
        }`}
        initial={{ width: 0 }}
        animate={{ width: 96 }}
        transition={{ duration: 1, delay: 0.8 }}
      />

      <motion.p
        className="text-[#000000]/70 text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {isAdmin
          ? `Welcome, ${user?.firstName}! You have administrative access.`
          : "Manage your profile and settings with style"}
      </motion.p>
    </motion.div>
  );
};

// Admin Verification Component
const AdminVerification = ({
  onBack,
  onVerified,
}: {
  onBack: () => void;
  onVerified: () => void;
}) => {
  const [adminCode, setAdminCode] = useState("");
  const [error, setError] = useState("");

  // Admin verification code - change this to your desired code
  const ADMIN_CODE = "ADMIN2024";

  const handleVerification = () => {
    if (adminCode === ADMIN_CODE) {
      setError("");
      onVerified();
    } else {
      setError("Invalid admin code. Please try again.");
      setAdminCode("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/98 backdrop-blur-xl shadow-2xl rounded-3xl p-8 md:p-12 text-center border border-[#DC143C]/50 relative overflow-hidden max-w-lg mx-auto mt-12 md:mt-24"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#8B0000] via-[#DC143C] to-[#FF6347] rounded-3xl p-[2px]"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="bg-white rounded-3xl w-full h-full" />
      </motion.div>

      <div className="relative z-10">
        <motion.div
          className="flex justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-[#8B0000] to-[#DC143C] rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <FaUserShield className="text-3xl text-white" />
          </motion.div>
        </motion.div>

        <motion.h2
          className="text-3xl mb-4 font-bold bg-gradient-to-r from-[#8B0000] via-[#DC143C] to-[#FF6347] bg-clip-text text-transparent"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Admin Verification
        </motion.h2>

        <motion.p
          className="text-[#000000]/80 mb-6 text-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Enter the admin verification code to continue
        </motion.p>

        <motion.div
          className="space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.input
            type="password"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
            placeholder="Enter admin code"
            className="w-full px-4 py-3 border-2 border-[#DC143C]/20 rounded-xl text-center text-lg font-mono tracking-widest focus:border-[#DC143C] focus:outline-none transition-colors"
            onKeyPress={(e) => e.key === "Enter" && handleVerification()}
            whileFocus={{ scale: 1.02 }}
          />

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm bg-red-50 p-2 rounded-lg"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            onClick={handleVerification}
            className="w-full px-6 py-3 bg-gradient-to-r from-[#8B0000] to-[#DC143C] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Verify Admin Access
          </motion.button>

          <motion.button
            onClick={onBack}
            className="w-full px-6 py-3 bg-gray-100 text-[#000000] rounded-xl font-medium hover:bg-gray-200 transition-colors cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Back to Login Options
          </motion.button>
        </motion.div>

        <motion.div
          className="mt-6 p-4 bg-gray-50 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-xs text-[#000000]/60 mb-2">Admin Code Required</p>
          <p className="text-sm text-[#000000]/80">
            Only authorized administrators have access to the verification code
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Login Type Selection Component
const LoginTypeSelection = () => {
  const [selectedType, setSelectedType] = useState<
    "user" | "admin" | "admin-verified" | null
  >(null);

  return (
    <div className="relative">
      <FloatingParticles />

      {!selectedType ? (
        // Login Type Selection
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/98 backdrop-blur-xl shadow-2xl rounded-3xl p-8 md:p-12 text-center border border-[#E5D3B3]/50 relative overflow-hidden max-w-4xl mx-auto mt-12 md:mt-24"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000] to-[#F4A460] rounded-3xl p-[2px]"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <div className="bg-white rounded-3xl w-full h-full" />
          </motion.div>

          <div className="relative z-10">
            <motion.div
              className="flex justify-center mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="w-24 h-24 bg-gradient-to-br from-[#000000] to-[#000000] rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 15 }}
              >
                <FaUser className="text-3xl text-white" />
              </motion.div>
            </motion.div>

            <motion.h2
              className="text-4xl mb-4 font-bold bg-gradient-to-r from-[#000000] via-[#000000] to-[#F4A460] bg-clip-text text-transparent"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Choose Login Type
            </motion.h2>

            <motion.p
              className="text-[#000000]/80 mb-10 text-lg leading-relaxed max-w-md mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Select whether you&apos;re signing in as a regular user or
              administrator
            </motion.p>

            {/* Login Type Buttons */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* User Login Button */}
              <motion.div
                onClick={() => setSelectedType("user")}
                className="p-8 bg-gradient-to-br from-[#000000] to-[#000000] text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden group"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <FaUser className="text-4xl mb-4 mx-auto" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">User Login</h3>
                <p className="text-white/90">
                  Access your personal account and manage your orders
                </p>
              </motion.div>

              {/* Admin Login Button */}
              <motion.div
                onClick={() => setSelectedType("admin")}
                className="p-8 bg-gradient-to-br from-[#8B0000] to-[#DC143C] text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden group"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <FaUserShield className="text-4xl mb-4 mx-auto" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">Admin Login</h3>
                <p className="text-white/90">
                  Administrative access to manage the system
                </p>
              </motion.div>
            </motion.div>

            <motion.p
              className="mt-8 text-[#000000]/60 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Not sure? Choose based on your account type
            </motion.p>
          </div>
        </motion.div>
      ) : selectedType === "admin" ? (
        // Admin Verification Screen
        <AdminVerification
          onBack={() => setSelectedType(null)}
          onVerified={() => setSelectedType("admin-verified")}
        />
      ) : selectedType === "user" ? (
        // User Login Form
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/98 backdrop-blur-xl shadow-2xl rounded-3xl p-12 text-center border border-[#E5D3B3]/50 relative overflow-hidden max-w-lg mx-auto mt-12 md:mt-24"
        >
          <motion.div
            className="absolute inset-0 rounded-3xl p-[3px] bg-gradient-to-r from-[#000000] via-[#000000] to-[#F4A460]"
            animate={{
              background: [
                "linear-gradient(45deg, #000000, #000000, #F4A460)",
                "linear-gradient(90deg, #000000, #F4A460, #000000)",
                "linear-gradient(135deg, #F4A460, #000000, #000000)",
                "linear-gradient(180deg, #000000, #000000, #F4A460)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="bg-white rounded-3xl w-full h-full" />
          </motion.div>

          <div className="relative z-10">
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <FaUser className="text-6xl text-[#000000]" />
              </motion.div>
            </motion.div>

            <motion.h2
              className="text-4xl mb-4 font-bold"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#000000] via-[#000000] to-[#F4A460]">
                User Login
              </span>
            </motion.h2>

            <motion.p
              className="text-[#000000]/80 mb-8 text-lg"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Sign in to your personal account
            </motion.p>

            <SignInButton mode="modal" forceRedirectUrl="/account">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(44, 24, 16, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-10 py-5 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform relative overflow-hidden group bg-gradient-to-r from-[#000000] via-[#000000] to-[#F4A460]"
              >
                <motion.span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#000000] via-[#F4A460] to-[#DEB887]" />
                <span className="relative z-10 flex items-center justify-center space-x-3 cursor-pointer">
                  <span>Sign In to Continue</span>
                  <motion.svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </motion.svg>
                </span>
              </motion.button>
            </SignInButton>

            <motion.button
              onClick={() => setSelectedType(null)}
              className="mt-6 text-[#000000]/60 hover:text-[#000000] text-sm underline cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              ← Back to login type selection
            </motion.button>
          </div>
        </motion.div>
      ) : selectedType === "admin-verified" ? (
        // Admin Login Form (after verification)
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/98 backdrop-blur-xl shadow-2xl rounded-3xl p-12 text-center border border-[#E5D3B3]/50 relative overflow-hidden max-w-lg mx-auto mt-12 md:mt-24"
        >
          <motion.div
            className="absolute inset-0 rounded-3xl p-[3px] bg-gradient-to-r from-[#8B0000] via-[#DC143C] to-[#FF6347]"
            animate={{
              background: [
                "linear-gradient(45deg, #8B0000, #DC143C, #FF6347)",
                "linear-gradient(90deg, #DC143C, #FF6347, #8B0000)",
                "linear-gradient(135deg, #FF6347, #8B0000, #DC143C)",
                "linear-gradient(180deg, #8B0000, #DC143C, #FF6347)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="bg-white rounded-3xl w-full h-full" />
          </motion.div>

          <div className="relative z-10">
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <FaUserShield className="text-6xl text-[#DC143C]" />
              </motion.div>
            </motion.div>

            <motion.h2
              className="text-4xl mb-4 font-bold"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8B0000] via-[#DC143C] to-[#FF6347]">
                Admin Login
              </span>
            </motion.h2>

            <motion.p
              className="text-[#000000]/80 mb-8 text-lg"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Sign in with your administrator credentials
            </motion.p>

            <SignInButton mode="modal" forceRedirectUrl="/account">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(139, 0, 0, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-10 py-5 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform relative overflow-hidden group bg-gradient-to-r from-[#8B0000] via-[#DC143C] to-[#FF6347]"
              >
                <motion.span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#DC143C] via-[#FF6347] to-[#FF4500]" />
                <span className="relative z-10 flex items-center justify-center space-x-3 cursor-pointer">
                  <span>Sign In as Admin</span>
                  <motion.svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </motion.svg>
                </span>
              </motion.button>
            </SignInButton>

            <motion.button
              onClick={() => setSelectedType(null)}
              className="mt-6 text-[#000000]/60 hover:text-[#000000] text-sm underline cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              ← Back to login type selection
            </motion.button>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
};

export default function AccountPage() {
  const { user, isLoaded } = useUser();
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  useEffect(() => {
    if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
      const adminStatus = isUserAdmin(user.primaryEmailAddress.emailAddress);
      setUserIsAdmin(adminStatus);
    }
  }, [user, isLoaded]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Enhanced Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#F9F6F1] via-[#FDF8F3] to-[#FFFFFF] mt-20 z-0"
        animate={{
          background: [
            "linear-gradient(to bottom right, #F9F6F1, #FDF8F3, #FFFFFF)",
            "linear-gradient(to bottom right, #FDF8F3, #FFFFFF, #F9F6F1)",
            "linear-gradient(to bottom right, #FFFFFF, #F9F6F1, #FDF8F3)",
            "linear-gradient(to bottom right, #F9F6F1, #FDF8F3, #FFFFFF)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Animated geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-[#000000]/20 to-[#F4A460]/20 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-tr from-[#000000]/10 to-[#000000]/10 rounded-full blur-2xl"
        animate={{
          y: [0, 30, 0],
          x: [0, -15, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Navbar - Fixed positioning with lower z-index than mobile menu */}
      <div className="relative z-40">
        <Navbar />
      </div>

      {/* Main content with lower z-index */}
      <main className="flex flex-1 items-center justify-center px-4 py-8 relative z-10 mt-12 md:mt-24">
        <SignedIn>
          <div className="w-full max-w-7xl">
            <WelcomeMessage isAdmin={userIsAdmin} />

            {/* Profile & Dashboard Section */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
              className="flex flex-col items-center justify-center space-y-6"
            >
              <div className="w-full max-w-6xl bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl border border-[#E5D3B3]/50 overflow-hidden relative">
                {/* Top gradient border */}
                <motion.div
                  className={`absolute top-0 left-0 w-full h-1 ${
                    userIsAdmin
                      ? "bg-gradient-to-r from-[#8B0000] via-[#DC143C] to-[#FF6347]"
                      : "bg-gradient-to-r from-[#000000] via-[#000000] to-[#F4A460]"
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5, delay: 2 }}
                />

                {/* Glowing corner accents */}
                <motion.div
                  className={`absolute top-0 right-0 w-20 h-20 rounded-bl-3xl ${
                    userIsAdmin
                      ? "bg-gradient-to-bl from-[#DC143C]/20 to-transparent"
                      : "bg-gradient-to-bl from-[#000000]/20 to-transparent"
                  }`}
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className={`absolute bottom-0 left-0 w-20 h-20 rounded-tr-3xl ${
                    userIsAdmin
                      ? "bg-gradient-to-tr from-[#FF6347]/20 to-transparent"
                      : "bg-gradient-to-tr from-[#F4A460]/20 to-transparent"
                  }`}
                  animate={{
                    opacity: [0.7, 0.3, 0.7],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <motion.div
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 2.2 }}
                  className="relative p-8 md:p-12"
                >
                  {/* Role-specific Dashboard */}
                  <div className="mb-8">
                    {userIsAdmin ? <AdminDashboard /> : <UserDashboard />}
                  </div>

                  {/* User Profile Section */}
                  <motion.div
                    className="border-t border-[#E5D3B3]/50 pt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3, duration: 0.8 }}
                  >
                    <motion.h3
                      className="text-2xl font-bold text-[#000000] mb-6 text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      Profile Settings
                    </motion.h3>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3.2, duration: 0.6 }}
                    >
                      <UserProfile
                        routing="hash"
                        appearance={{
                          elements: {
                            rootBox: "w-full",
                            card: "w-full bg-transparent shadow-none rounded-none border-none",
                            navbar: "hidden",
                            scrollBox: "p-0",
                            profileSectionPrimaryButton: userIsAdmin
                              ? "bg-[#8B0000] hover:bg-[#DC143C] transition-all duration-300 shadow-lg hover:shadow-xl"
                              : "bg-[#000000] hover:bg-[#000000] transition-all duration-300 shadow-lg hover:shadow-xl",
                            formButtonPrimary: userIsAdmin
                              ? "bg-[#8B0000] hover:bg-[#DC143C] transition-all duration-300 shadow-lg hover:shadow-xl"
                              : "bg-[#000000] hover:bg-[#000000] transition-all duration-300 shadow-lg hover:shadow-xl",
                            headerTitle:
                              "text-3xl font-bold text-[#000000] mb-2",
                            headerSubtitle: "text-[#000000]/70 text-lg",
                            profileSection: "mb-8",
                            profileSectionContent:
                              "bg-gray-50/50 rounded-xl p-6",
                          },
                          variables: {
                            colorPrimary: userIsAdmin ? "#8B0000" : "#000000",
                            colorDanger: "#DC2626",
                            colorSuccess: "#059669",
                            colorWarning: "#D97706",
                            colorTextOnPrimaryBackground: "#ffffff",
                            colorTextSecondary: "#000000",
                            borderRadius: "0.75rem",
                            spacingUnit: "1rem",
                          },
                        }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Sign Out Button */}
                  <motion.div
                    className="mt-8 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.5, duration: 0.6 }}
                  >
                    <SignOutButton>
                      <motion.button
                        whileHover={{
                          scale: 1.05,
                          boxShadow: userIsAdmin
                            ? "0 15px 30px -10px rgba(139, 0, 0, 0.3)"
                            : "0 15px 30px -10px rgba(44, 24, 16, 0.3)",
                        }}
                        whileTap={{ scale: 0.97 }}
                        className={`px-8 py-3 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                          userIsAdmin
                            ? "bg-gradient-to-r from-[#DC143C] via-[#FF6347] to-[#FF4500]"
                            : "bg-gradient-to-r from-[#000000] via-[#F4A460] to-[#DEB887]"
                        }`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          animate={{
                            x: ["-100%", "100%"],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 2,
                          }}
                        />
                        <span className="relative z-10">Sign Out</span>
                      </motion.button>
                    </SignOutButton>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </SignedIn>

        <SignedOut>
          <LoginTypeSelection />
        </SignedOut>
      </main>
    </div>
  );
}
