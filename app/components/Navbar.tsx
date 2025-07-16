"use client";

import React from "react";
import Image from "next/image";
import Hero from "./Hero";
import Link from "next/link"; 

const NavButton: React.FC<{
  children: React.ReactNode;
  href: string;
  className?: string;
}> = ({ children, href, className = "" }) => (
  <Link
    href={href}
    className={`text-[#313053] hover:text-[#615fa1] cursor-pointer text-lg font-semibold transition ${className}`}
  >
    {children}
  </Link>
);

const Navbar: React.FC = () => {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[1002] bg-gradient-to-tr from-white via-[#f9fef4] to-[#e9f8c5] min-h-[60px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center w-full">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/Transparent logo.png"
              alt="Marvedge logo"
              width={80}
              height={80}
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
              priority
            />
            <span className="text-[#8C5BFF] text-xl md:text-2xl font-semibold">
              Marvedge
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-[#313053] font-medium">
            <NavButton href="/aboutus">About Us</NavButton>
            <NavButton href="/blog">Blog</NavButton>
          </div>
        </div>
      </nav>
      <Hero />
    </>
  );
};

export default Navbar;
