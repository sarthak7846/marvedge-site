"use client";

import React from "react";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";
import Footer from "./Footer";

const Hero3: React.FC = () => {
  return (
    <>
      <div className="w-full bg-gradient-to-br from-white via-purple-50 to-green-100 py-24 px-4 flex justify-center items-center">
        <motion.div
          className="w-full max-w-xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <p className="text-sm font-black text-purple-600 uppercase mb-3 tracking-wide">
            Get <span className="text-purple-400">Early Access</span>
          </p>

          <h2 className="text-[2.75rem] leading-tight md:text-[3rem] font-extrabold text-gray-900 mb-5">
            Join Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-700">
              Waitlist
            </span>
          </h2>

          <p className="text-gray-700 text-base md:text-lg mb-10">
            Be among the first to access Marvedge and transform your videos to eye catchy demo
          </p>

          <form className="space-y-5">
            {[
              { type: "email", placeholder: "Enter Your Email address" },
              { type: "text", placeholder: "Enter Your Full Name" },
              { type: "text", placeholder: "Enter Your Message" },
            ].map((input, index) => (
              <motion.input
                key={index}
                type={input.type}
                placeholder={input.placeholder}
                className="w-full px-6 py-4 rounded-[12px] border border-[#e0d8ff] bg-white placeholder-gray-500 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: easeOut,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
              />
            ))}

            <motion.button
              type="submit"
              className="w-full py-4 bg-[#9e7dff] hover:bg-[#8d6aff] text-white font-medium rounded-[10px] text-lg transition shadow-md"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: easeOut,
                delay: 0.4,
              }}
              viewport={{ once: true }}
            >
              Join the waitlist
            </motion.button>
          </form>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Hero3;
