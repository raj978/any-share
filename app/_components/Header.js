"use client";

import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

function Header() {
  const { isSignedIn } = useUser();

  return (
    <div>
      <header className="bg-gray-800">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center px- sm:px-6 lg:px-8 border-b">
          <a href="#">
            <Image
              src="/logo.svg"
              alt="Logo Placeholder"
              width={175}
              height={40}
            />
          </a>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-white transition hover:text-gray-300"
                    href="/">
                    Home
                  </a>
                </li>

                <li>
                  <a
                    className="text-white transition hover:text-gray-300"
                    href="/upload">
                    Upload
                  </a>
                </li>

                <li>
                  <a
                    className="text-white transition hover:text-gray-300"
                    href="#">
                    About
                  </a>
                </li>

                <li>
                  <a
                    className="text-white transition hover:text-gray-300"
                    href="#">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                {!isSignedIn ? (
                  <>
                    <a
                      className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
                      href="/sign-in">
                      Login
                    </a>

                    <a
                      className="hidden rounded-md bg-gray-800 px-5 py-2.5 text-sm font-medium text-primary transition hover:text-teal-600/75 sm:block"
                      href="/sign-up">
                      Register
                    </a>
                  </>
                ) : (
                  <UserButton />
                )}
              </div>

              {/* Toggle button removed */}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
