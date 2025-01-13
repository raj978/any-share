import { UserButton } from "@clerk/nextjs";
import { AlignJustify } from "lucide-react";
import React from "react";

function TopHeader({ toggleSideNav }) {
  return (
    <div className="flex p-5 border-b items-center justify-between md:justify-end">
      <AlignJustify
        className="md:hidden cursor-pointer"
        onClick={toggleSideNav}
      />
      <UserButton />
    </div>
  );
}

export default TopHeader;
