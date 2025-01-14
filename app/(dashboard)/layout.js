"use client";

import React from "react";
import SideNav from "./_components/SideNav";
import TopHeader from "./_components/TopHeader";
import { useState, useRef, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function layout({ children }) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const sideNavRef = useRef(null);

  const toggleSideNav = () => {
    setIsSideNavOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
        setIsSideNavOpen(false);
      }
    };
    if (isSideNavOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSideNavOpen]);

  return (
    <div className="flex h-screen">
      <div
        ref={sideNavRef}
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-black shadow-md transition-transform transform ${
          isSideNavOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:translate-x-0`}>
        <SideNav isOpen={isSideNavOpen} />
      </div>
      <div className="flex-1 flex flex-col">
        <TopHeader toggleSideNav={toggleSideNav} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
