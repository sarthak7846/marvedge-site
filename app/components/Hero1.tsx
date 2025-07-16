"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useInView,
  easeOut,
  useScroll,
  useTransform,
} from "framer-motion";
import Hero2 from "./Hero2";

interface TiltCardProps {
  title: string;
  description: string;
  icon: string;
  linkText?: string;
  index: number;
}

const TiltCard: React.FC<TiltCardProps> = ({
  title,
  description,
  icon,
  linkText = "Learn more →",
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(x, springConfig);
  const rotateY = useSpring(y, springConfig);
  const isInView = useInView(cardRef, { once: false, margin: "-50px" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const maxTilt = 15;
    const tiltX = -(mouseY / (rect.height / 2)) * maxTilt;
    const tiltY = (mouseX / (rect.width / 2)) * maxTilt;
    x.set(tiltX);
    y.set(tiltY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const iconBgColors = [
    "bg-[#f3ebff]",
    "bg-[#e6f1ff]",
    "bg-[#e9fbe9]",
    "bg-[#fff2e5]",
    "bg-[#ebf6ff]",
    "bg-[#ffeef1]",
  ];

  return (
    <motion.div
      ref={cardRef}
      className="bg-white rounded-2xl shadow-md p-8 text-center w-full"
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        boxShadow: `${rotateY.get() * 0.1}px ${rotateX.get() * 0.1}px ${
          10 + Math.abs(rotateX.get()) * 0.2 + Math.abs(rotateY.get()) * 0.2
        }px rgba(0, 0, 0, 0.2)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
        y: -10,
      }}
      initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: -15 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 60,
        scale: isInView ? 1 : 0.9,
        rotateX: isInView ? 0 : -15,
      }}
      transition={{
        duration: 0.8,
        ease: easeOut,
        delay: index * 0.1,
      }}
    >
      <motion.div
        className={`relative w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center  ${
          iconBgColors[index % iconBgColors.length]
        }`}
        animate={{
          rotate: [0, 5, -5, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span className="text-2xl">{icon}</span>
      </motion.div>
      <div className="relative w-full h-32 mb-4"></div>
      <h3 className="text-xl font-semibold text-gray-800 mt-2">{title}</h3>
      <p className="mt-2 text-gray-600 text-base">{description}</p>
      <motion.a
        href="#"
        className="mt-4 inline-block text-[#6B46C1] text-base hover:underline"
        whileHover={{ x: 5, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {linkText}
      </motion.a>
    </motion.div>
  );
};

const Hero1: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);

  const cards = [
    {
      title: "URL to Video Magic",
      description:
        "Simply paste your product URL and watch our AI create a professional demo video in minutes, not hours.",
      icon: "🔗",
    },
    {
      title: "Smart Content Analysis",
      description:
        "Our AI understands your product features, benefits, and target audience to create relevant, engaging content.",
      icon: "🧠",
    },
    {
      title: "Conversion Optimized",
      description:
        "Every video is designed with proven conversion techniques to turn viewers into customers effectively.",
      icon: "📈",
    },
    {
      title: "Video Quality Enhancement",
      description:
        "Improve video resolution and clarity with our AI-driven upscaling technology in real-time.",
      icon: "🎥",
    },
    {
      title: "Multi-Format Export",
      description:
        "Export video optimized for web, social media, email campaigns, and presentations with one click.",
      icon: "📱",
    },
    {
      title: "Audience Engagement",
      description:
        "Boost interaction with personalized video content tailored to your audience's preferences.",
      icon: "👥",
    },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <motion.div
        className="absolute bottom-20 right-1/3 w-24 h-24 bg-blue-100 rounded-full opacity-30"
        animate={{
          scale: [1, 1.4, 1],
          y: [0, -30, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h1
          className="mt-6 max-sm:mt-10 text-3xl md:text-4xl font-extrabold text-gray-600 leading-tight text-center"
          initial={{ opacity: 0, y: 60, rotateX: -15 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 60,
            rotateX: isInView ? 0 : -15,
          }}
          transition={{
            duration: 0.8,
            ease: easeOut,
          }}
          style={{ y }}
        >
          Automated Video Creation{" "}
          <span className="text-[#6B46C1]">Powered by AI</span>
        </motion.h1>
        <motion.p
          className="mt-4 max-sm:mt-8 text-gray-600 text-lg max-w-2xl mx-auto text-center translate-x-2 sm:translate-x-4 md:translate-x-6"
          initial={{ opacity: 0, y: 60 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 60,
          }}
          transition={{
            duration: 0.8,
            ease: easeOut,
            delay: 0.2,
          }}
        >
          Our advanced AI technology analyzes your product, understands your
          audience, and creates compelling demo videos that drive conversions
          automatically.
        </motion.p>

        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ scale }}
        >
          {cards.slice(0, 3).map((card, index) => (
            <TiltCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              index={index}
            />
          ))}
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ scale }}
        >
          {cards.slice(3).map((card, index) => (
            <TiltCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              index={index}
            />
          ))}
        </motion.div>
      </div>
      <div className="mt-24">
        <Hero2 />
      </div>
    </section>
  );
};

export default Hero1;
