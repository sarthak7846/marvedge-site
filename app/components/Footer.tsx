"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  easeOut,
  useScroll,
  useTransform,
} from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const socialIcons = [
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
  { icon: Linkedin, label: "LinkedIn" },
];

const LinkSection: React.FC<{
  title: string;
  items: string[];
  index: number;
}> = ({ title, items, index }) => (
  <motion.div
    className="min-w-[100px]"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: easeOut, delay: index * 0.1 }}
  >
    <h3 className="text-white font-semibold mb-2 text-base sm:text-lg">
      {title}
    </h3>
    <ul className="text-gray-300 space-y-1.5 text-sm sm:text-base">
      {items.map((item, itemIndex) => (
        <motion.li
          key={itemIndex}
          className="hover:text-[#a68cff] cursor-pointer transition-colors duration-200"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            ease: easeOut,
            delay: index * 0.1 + itemIndex * 0.05,
          }}
          whileHover={{ x: 5, scale: 1.05 }}
        >
          {item}
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

const Footer: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.01, 1]);

  return (
    <div
      ref={sectionRef}
      className="w-full bg-[#2d2347] py-16 relative overflow-hidden"
    >
      <motion.div
        className="absolute top-20 left-1/4 w-32 h-32 bg-purple-900 rounded-full opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-1/3 w-24 h-24 rounded-full opacity-10"
        animate={{
          scale: [1, 1.3, 1],
          y: [0, -40, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <section className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:gap-24 relative z-10">
        <motion.div
          className="flex flex-col w-full md:w-1/3 gap-8 mb-8 md:mb-0"
          initial={{ opacity: 0, y: 60 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 60,
          }}
          transition={{ duration: 0.8, ease: easeOut }}
          style={{ y }}
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{
              opacity: isInView ? 1 : 0,
              y: isInView ? 0 : 60,
            }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
          >
            <div className="flex items-center space-x-3 mb-4">
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
            <p className="text-gray-300 text-sm sm:text-base">
              Transform your product URLs into compelling demo videos with the
              power of AI. Boost conversations and save time with automated
              video creation.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex-1 w-full"
          initial={{ opacity: 0, y: 60 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 60,
          }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.4 }}
          style={{ scale }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3  gap-6">
            {/* Company Links */}
            <LinkSection
              title="Company"
              items={["About Us", "Blog"]}
              index={0}
            />

            {/* Social Icons */}
            <motion.div
              className="min-w-[100px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: easeOut,
                delay: 0.2,
              }}
            >
              <h3 className="text-white font-semibold mb-2 text-base sm:text-lg">
                Social
              </h3>
              <div className="flex gap-4 items-center">
                {socialIcons.map((icon, i) => (
                  <motion.button
                    key={i}
                    className="bg-[#3c3160] hover:bg-[#a68cff] transition-colors rounded-[1.5rem] w-14 h-14 flex items-center justify-center shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: easeOut,
                      delay: i * 0.1,
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <icon.icon className="text-white w-7 h-7 md:w-8 md:h-8" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <motion.footer
        className="w-full flex flex-col items-center py-6 px-4 relative z-10"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 60 }}
        transition={{ duration: 0.8, ease: easeOut, delay: 0.6 }}
      >
        <motion.p
          className="text-gray-300 text-xs sm:text-sm font-semibold mt-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 1.0 }}
        >
          Copyright © 2025. All rights reserved. Created with 🩶 for better
          conversation.
        </motion.p>
      </motion.footer>
    </div>
  );
};

export default Footer;
