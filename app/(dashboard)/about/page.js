"use client";
import React from "react";
// Replace the react-icons import with lucide-react
import { ExternalLink } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex  justify-center p-5">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-6">About Any-Share</h1>
        <p className="text-lg mb-6">
          Any-Share is a secure and efficient file-sharing platform that allows
          you to easily upload, manage, and share your files with others. Built
          with modern technologies like Next.js, Firebase, Tailwind CSS, and
          Clerk for seamless authentication, Any-Share ensures your files are
          always accessible and protected.
        </p>
        <p className="text-lg mb-6">
          Whether you're sharing documents, images, or any other type of file,
          Any-Share provides a user-friendly interface and robust backend to
          handle all your sharing needs. With features like password protection,
          short URLs, and email sharing, managing your files has never been
          easier.
        </p>
        <div className="flex justify-center space-x-6 mt-8">
          <a
            href="https://rajatg.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition text-2xl"
            aria-label="Visit my personal website">
            <ExternalLink />
          </a>
          <a
            href="https://github.com/raj978/any-share/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition text-2xl"
            aria-label="View GitHub Repository">
            <img
              height={25}
              width={25}
              src="/github-mark-white.png"
              alt="GitHub Repository"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
