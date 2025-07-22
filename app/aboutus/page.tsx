"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ContactFormSection() {
  return (
    <section
      id="contact"
      className="w-full flex justify-center items-center mt-12"
    >
      <form
        className="w-[90%] max-w-[900px] bg-gradient-radial-ellipse-60-40 rounded-[32px] shadow-[0_4px_32px_#e6e0fa33] p-12 flex flex-col items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="text-[40px] font-extrabold text-[#3c3450] mb-2 text-center">
          Get In <span className="text-[#8C5BFF]">Touch</span>
        </div>
        <div className="text-[#6d6a7c] text-[20px] font-normal mb-8 text-center">
          Let&apos;s bring your ideas to life, reach out and say hello.
        </div>
        <div className="about-contact-names-row flex gap-6 w-full mb-4">
          <input
            type="text"
            placeholder="Enter your First Name"
            required
            className="flex-1 px-4 py-4 text-[18px] rounded-[8px] border border-[#b9aaff] outline-none bg-white text-[#313053] font-medium transition-colors duration-200"
          />
          <input
            type="text"
            placeholder="Enter your Last Name"
            required
            className="flex-1 px-4 py-4 text-[18px] rounded-[8px] border border-[#b9aaff] outline-none bg-white text-[#313053] font-medium transition-colors duration-200"
          />
        </div>
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="w-full px-4 py-4 text-[18px] rounded-[8px] border border-[#b9aaff] outline-none bg-white text-[#313053] font-medium mb-4 transition-colors duration-200"
        />
        <input
          type="tel"
          placeholder="Enter your phone number"
          className="w-full px-4 py-4 text-[18px] rounded-[8px] border border-[#b9aaff] outline-none bg-white text-[#313053] font-medium mb-4 transition-colors duration-200"
        />
        <textarea
          placeholder="Enter your message"
          required
          rows={4}
          className="w-full px-4 py-4 text-[18px] rounded-[8px] border border-[#b9aaff] outline-none bg-white text-[#313053] font-medium mb-7 resize-y transition-colors duration-200"
        />
        <button
          type="submit"
          className="w-full bg-[#8C5BFF] text-white border-none rounded-[10px] text-[22px] font-semibold py-3 cursor-pointer shadow-[0_2px_8px_#8C5BFF22] transition-colors duration-200"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}

const teamMembers = [
  {
    name: "Joyce Wallin",
    role: "Specialised Support",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Ajit Kumar Shankhwar",
    role: "Frontend Developer",
    img: "/images/Ajit.jpg",
  },
  {
    name: "Ashish Kumar Mishra",
    role: "Full Stack Developer",
    img: "/images/Ashish.jpg",
  },
  {
    name: "Carlos Rivera",
    role: "Backend Engineer",
    img: "https://randomuser.me/api/portraits/men/85.jpg",
  },
  {
    name: "Lina Chen",
    role: "Marketing Lead",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

function TeamCarousel() {
  const [centerIdx, setCenterIdx] = useState(2); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCenterIdx((prev) => (prev + 1) % teamMembers.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const getIdx = (offset: number) =>
    (centerIdx + offset + teamMembers.length) % teamMembers.length;

  return (
    <div
      className="w-full max-w-[1500px] flex justify-center items-center flex-end gap-14 relative h-[450px] mx-auto mb-8 overflow-x-auto pb-8"
    >
      {[-2, -1, 0, 1, 2].map((offset: number) => {
        const idx = getIdx(offset);
        const member = teamMembers[idx];
        const isCenter = offset === 0;
        return (
          <div
            key={idx}
            className={`relative z-${isCenter ? 2 : 1} transition-all duration-500 ${
              isCenter
                ? "scale-118 translate-y-[-18px]"
                : offset === -1 || offset === 1
                ? "scale-92 translate-y-[10px]"
                : "scale-80 translate-y-[30px]"
            } ${isCenter ? "" : "grayscale-50 opacity-70"} ${
              isCenter ? "shadow-[0_8px_32px_#8C5BFF33]" : "shadow-[0_2px_8px_#e6e0fa33]"
            } rounded-[24px] border-top-left-radius-[24px] border-top-right-radius-[24px] bg-[#f6f3ff] p-0 m-0 flex flex-col items-center justify-end min-w-[180px] max-w-[320px] w-auto`}
          >
            <div
              className="w-full flex items-center justify-center bg-transparent rounded-top-left-24 rounded-top-right-24 p-0 min-h-[180px] max-h-[320px] overflow-hidden"
            >
              <Image
                src={member.img}
                alt={member.name}
                width={isCenter ? 220 : 140}
                height={isCenter ? 300 : 200}
                className="max-w-full max-h-full object-contain h-auto transition-all duration-500 bg-transparent block mx-auto"
                unoptimized
              />
            </div>
            <div
              className="bg-[#8C5BFF] text-white w-full text-center font-bold text-[22px] leading-tight tracking-wider pb-4 rounded-bottom-left-24 rounded-bottom-right-24"
            >
              {member.name}
              <div
                className="text-[#e6e0fa] text-[16px] font-normal mt-1"
              >
                {member.role}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AboutUsPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-white to-f6f3ff flex flex-col"
    >
      <Navbar />
      <section
        className="w-full min-h-[48vh] flex flex-col items-center justify-center py-16 bg-[#FAFEF6] relative overflow-hidden"
      >
        <div
          className="text-center w-full max-w-[1100px] mx-auto"
        >
          <div className="text-[#a18fff] font-bold text-[24px] mb-3 mt-16">
            Discover Our Story
          </div>
          <h1 className="text-[56px] font-extrabold text-[#3c3450] leading-tight">
            We&apos;re Building the future of
            <br />
            <span className="text-[#8C5BFF]">Digital Innovation</span>
          </h1>
          <div className="text-[#6d6a7c] text-[22px] font-normal mt-5">
            Empowering every SaaS product to deliver an interactive demo in
            under 60 seconds 2D 2D
            <br />
            no developers, designers, or sales teams needed.
          </div>
        </div>
        <div
          className="absolute left-0 right-0 bottom-16 h-0 z-0 pointer-events-none"
        >
          <svg
            width="100%"
            height="32"
            viewBox="0 0 1200 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="20"
              y1="16"
              x2="1180"
              y2="16"
              stroke="#a18fff"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.18"
            />
            <circle cx="20" cy="16" r="3" fill="#a18fff" opacity="0.18" />
            <circle cx="1180" cy="16" r="3" fill="#a18fff" opacity="0.18" />
          </svg>
        </div>
      </section>
      <section
        className="w-full flex justify-center items-center mb-12"
      >
        <div
          className="w-[90%] max-w-[1300px] rounded-[24px] overflow-hidden shadow-[0_4px_32px_#e6e0fa33] bg-white"
        >
          <Image
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
            alt="Team working on tablet"
            width={1300}
            height={650}
            className="w-full h-auto block"
            priority
          />
        </div>
      </section>
      <section
        className="w-full flex flex-col items-center justify-center py-12"
      >
        <div
          className="about-columns-row flex flex-row justify-between items-start gap-12 mb-24"
        >
          <div className="flex-1 text-center px-8">
            <div className="text-[38px] font-bold text-[#3c3450] mb-2">
              Our <span className="text-[#8C5BFF]">Story</span>
            </div>
            <div className="text-[#b3b3b3] text-[22px] font-medium mb-6">
              Why We Started it?
            </div>
            <div className="text-[#6d6a7c] text-[20px] font-normal leading-relaxed">
              We are an early-stage, fast-growing SaaS startup helping
              product-led teams{" "}
              <span
                className="text-[#8C5BFF] font-semibold underline"
              >
                create interactive demos
              </span>{" "}
              for their tools,{" "}
              <span
                className="text-[#8C5BFF] font-semibold underline"
              >
                without
              </span>{" "}
              writing a single line of code or a video editor.
            </div>
          </div>
          <div
            className="w-1 bg-gradient-to-b from-[#ede7ff] to-[#8C5BFF22] h-full self-center opacity-40 rounded-full"
          />
          <div className="flex-1 text-center px-8">
            <div className="text-[38px] font-bold text-[#3c3450] mb-2">
              Our <span className="text-[#8C5BFF]">Mission</span>
            </div>
            <div className="text-[#b3b3b3] text-[22px] font-medium mb-6">
              Why We Started it?
            </div>
            <div className="text-[#6d6a7c] text-[20px] font-normal leading-relaxed">
              To transform the way SaaS products are showcased and to equalize
              the access to{" "}
              <span
                className="text-[#8C5BFF] font-semibold underline"
              >
                high quality product
              </span>{" "}
              demos, empower early-stage startups to drive conversions through
              self-serve experiences.
            </div>
          </div>
          <div
            className="w-1 bg-gradient-to-b from-[#ede7ff] to-[#8C5BFF22] h-full self-center opacity-40 rounded-full"
          />
          <div className="flex-1 text-center px-8">
            <div className="text-[38px] font-bold text-[#3c3450] mb-2">
              Our <span className="text-[#8C5BFF]">Vision</span>
            </div>
            <div className="text-[#b3b3b3] text-[22px] font-medium mb-6">
              Why We Started it?
            </div>
            <div className="text-[#6d6a7c] text-[20px] font-normal leading-relaxed">
              To enable every SaaS product to be experienced in{" "}
              <span
                className="text-[#8C5BFF] font-semibold underline"
              >
                under 60 seconds
              </span>{" "}
              through interactive demos, without needing a team of developers,
              editors, designers, or salespeople.
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <div className="text-[48px] font-extrabold text-[#3c3450] mb-3">
            Meet{" "}
            <span
              className="font-monospace font-bold text-[44px] align-middle text-[#8C5BFF] inline-block mx-1"
            ></span>
            our beautiful <span className="text-[#8C5BFF]">Team</span>
          </div>
          <div className="text-[#8C5BFF99] text-[22px] font-normal mb-12">
            Our philosophy is simple, hire great and give them the resources
            support to do their best work.
          </div>
          <a
            href="#contact"
            className="bg-[#8C5BFF] text-white border-none rounded-[14px] text-[26px] font-semibold py-4 px-20 shadow-[0_2px_8px_#8C5BFF22] cursor-pointer mt-4 text-decoration-none inline-block transition-colors duration-200"
          >
            Get in Touch
          </a>
        </div>
      </section>
      <section
        className="w-full flex flex-col items-center justify-center mb-24"
      >
        <TeamCarousel />
        <div
          className="text-center mt-24 max-w-[900px]"
        >
          <div className="text-[#6d6a7c] text-[24px] font-normal mb-12 font-normal">
            “It&apos;s a statement of who we are and where we&apos;re headed. Building it
            right demands a team that is not only skilled but aligned in
            mindset, values, and commitment to excellence.”
          </div>
          <div
            className="flex flex-col items-center"
          >
            <Image
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Soumya Ranjan Nayak"
              width={48}
              height={48}
              className="border-radius-50% object-cover mb-3"
            />
            <div className="text-[#3c3450] text-[18px] font-bold">
              Soumya Ranjan Nayak
            </div>
            <div className="text-[#8C5BFF] text-[16px] font-medium">
              CEO, Marvedge
            </div>
          </div>
        </div>
      </section>
      <ContactFormSection />
      <section
        className="w-full flex justify-center items-start mt-24"
      >
        <div
          className="w-[90%] max-w-[1400px] flex flex-row gap-16 items-start justify-center"
        >
        </div>
      </section>

      <Footer />
      <style jsx global>{`
        @media (max-width: 900px) {
          .team-carousel {
            max-width: 98vw !important;
            gap: 12px !important;
          }
          .about-section,
          .about-form {
            padding: 18px !important;
          }
          .about-card,
          .team-card {
            min-width: 180px !important;
            width: 180px !important;
            height: 200px !important;
            font-size: 1rem !important;
          }
          .about-form input,
          .about-form textarea {
            font-size: 1rem !important;
            padding: 10px !important;
          }
        }
        @media (max-width: 600px) {
          .team-carousel {
            max-width: 100vw !important;
            gap: 6px !important;
            overflow-x: auto !important;
            padding-bottom: 8px !important;
          }
          .about-section,
          .about-form {
            padding: 8px !important;
          }
          .about-card,
          .team-card {
            min-width: 120px !important;
            width: 120px !important;
            height: 120px !important;
            font-size: 0.9rem !important;
          }
          .about-form input,
          .about-form textarea {
            font-size: 0.9rem !important;
            padding: 6px !important;
          }
          .about-btn {
            width: 100% !important;
            font-size: 1rem !important;
            padding: 10px 0 !important;
          }
          .about-columns-row {
            flex-direction: column !important;
            width: 98vw !important;
            max-width: 98vw !important;
            gap: 0 !important;
            margin-bottom: 24px !important;
          }
          .about-columns-row > * {
            width: 100% !important;
            max-width: 100vw !important;
            margin-bottom: 24px !important;
            box-sizing: border-box !important;
          }
          .about-contact-names-row {
            flex-direction: column !important;
            gap: 10px !important;
            width: 100% !important;
            flex-wrap: wrap !important;
            min-height: unset !important;
            overflow: visible !important;
          }
          .about-contact-names-row input {
            width: 100% !important;
            min-width: 0 !important;
            box-sizing: border-box !important;
            display: block !important;
            position: static !important;
            visibility: visible !important;
          }
        }
      `}</style>
    </div>
  );
}
