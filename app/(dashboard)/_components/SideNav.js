"use client";
import React from "react";
import { Upload, File } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SideNav({ isOpen }) {
  const menuList = [
    {
      id: 1,
      name: "Upload",
      icon: Upload,
      path: "/upload",
    },
    {
      id: 2,
      name: "Files",
      icon: File,
      path: "/files",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div
      className={`flex flex-col h-full ${
        isOpen ? "block" : "hidden"
      } md:block bg-black`}>
      <div className="pt-5 pl-5 hidden md:block">
        <Link href={process.env.NEXT_PUBLIC_DOMAIN}>
          <Image src="/logo.svg" alt="Logo" width={200} height={100} />
        </Link>
      </div>
      <div className="flex flex-col w-full ">
        {menuList.map((item, index) => (
          <Link href={item.path} key={index}>
            <button
              key={index}
              className={`flex gap-2 p-4 px-6 hover:bg-gray-700 w-full text-gray-100 hover:text-green-500 ${
                activeIndex === index ? "bg-green-500 text-grey-100" : ""
              }`}
              onClick={() => setActiveIndex(index)}>
              <item.icon />
              <h2>{item.name}</h2>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
