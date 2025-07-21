"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  const [menuOpen, setMenuOpen] = useState(false);
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
            <Link href="/">
              <span className="text-[#8C5BFF] text-xl md:text-2xl font-semibold cursor-pointer hover:text-[#615fa1] transition">
                Marvedge
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-[#313053] font-medium">
            <NavButton href="/aboutus">About Us</NavButton>
            <NavButton href="/blog">Blog</NavButton>
          </div>

          <button
            className="md:hidden flex items-center justify-center w-10 h-10 bg-transparent transition relative z-[1003]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
            style={{ border: 'none', boxShadow: 'none', background: 'none', padding: 0, margin: 0 }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="5" width="24" height="2.5" rx="1.25" fill="#313053" />
              <rect y="11" width="24" height="2.5" rx="1.25" fill="#313053" />
              <rect y="17" width="24" height="2.5" rx="1.25" fill="#313053" />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden absolute top-[60px] left-0 right-0 w-[100vw] bg-white rounded-b-lg shadow-lg py-4 px-0 flex flex-col items-center gap-4 text-[#313053] font-medium z-[1004] border-b border-x border-[#ede7ff]" style={{marginTop:'2px'}}>
            <Link href="/aboutus" className="text-lg w-full" onClick={() => setMenuOpen(false)}>
              <button className="w-full text-center py-3 hover:bg-[#f6f3ff] transition" style={{background:'none',border:'none',padding:0,margin:0}}>
                About Us
              </button>
            </Link>
            <Link href="/blog" className="text-lg w-full" onClick={() => setMenuOpen(false)}>
              <button className="w-full text-center py-3 hover:bg-[#f6f3ff] transition" style={{background:'none',border:'none',padding:0,margin:0}}>
                Blog
              </button>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
