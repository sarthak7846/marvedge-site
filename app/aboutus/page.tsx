"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ContactFormSection() {
  return (
    <section
      id="contact"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "48px 0 0 0",
      }}
    >
      <form
        style={{
          width: "90%",
          maxWidth: 900,
          background:
            "radial-gradient(ellipse at 60% 40%, #ede7ff 0%, #f6f3ff 100%)",
          borderRadius: 32,
          boxShadow: "0 4px 32px #e6e0fa33",
          padding: "48px 32px 40px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={(e) => e.preventDefault()}
      >
        <div
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: "#3c3450",
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Get In <span style={{ color: "#8C5BFF" }}>Touch</span>
        </div>
        <div
          style={{
            color: "#6d6a7c",
            fontSize: 20,
            fontWeight: 400,
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          Let&apos;s bring your ideas to life, reach out and say hello.
        </div>
        <div
          className="about-contact-names-row"
          style={{ display: "flex", gap: 24, width: "100%", marginBottom: 18 }}
        >
          <input
            type="text"
            placeholder="Enter your First Name"
            required
            style={{
              flex: 1,
              padding: "16px 18px",
              fontSize: 18,
              borderRadius: 8,
              border: "1.5px solid #b9aaff",
              outline: "none",
              background: "#fff",
              color: "#313053",
              fontWeight: 500,
              transition: "border 0.2s",
            }}
          />
          <input
            type="text"
            placeholder="Enter your Last Name"
            required
            style={{
              flex: 1,
              padding: "16px 18px",
              fontSize: 18,
              borderRadius: 8,
              border: "1.5px solid #b9aaff",
              outline: "none",
              background: "#fff",
              color: "#313053",
              fontWeight: 500,
              transition: "border 0.2s",
            }}
          />
        </div>
        <input
          type="email"
          placeholder="Enter your email"
          required
          style={{
            width: "100%",
            padding: "16px 18px",
            fontSize: 18,
            borderRadius: 8,
            border: "1.5px solid #b9aaff",
            outline: "none",
            background: "#fff",
            color: "#313053",
            fontWeight: 500,
            marginBottom: 18,
            transition: "border 0.2s",
          }}
        />
        <input
          type="tel"
          placeholder="Enter your phone number"
          style={{
            width: "100%",
            padding: "16px 18px",
            fontSize: 18,
            borderRadius: 8,
            border: "1.5px solid #b9aaff",
            outline: "none",
            background: "#fff",
            color: "#313053",
            fontWeight: 500,
            marginBottom: 18,
            transition: "border 0.2s",
          }}
        />
        <textarea
          placeholder="Enter your message"
          required
          rows={4}
          style={{
            width: "100%",
            padding: "16px 18px",
            fontSize: 18,
            borderRadius: 8,
            border: "1.5px solid #b9aaff",
            outline: "none",
            background: "#fff",
            color: "#313053",
            fontWeight: 500,
            marginBottom: 28,
            resize: "vertical",
            transition: "border 0.2s",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            background: "#8C5BFF",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontSize: 22,
            fontWeight: 600,
            padding: "14px 0",
            cursor: "pointer",
            boxShadow: "0 2px 8px #8C5BFF22",
            transition: "background 0.2s",
          }}
        >
          Send Message
        </button>
      </form>
    </section>
  );
}

// Carousel for Team Section
const teamMembers = [
  {
    name: "Joyce Wallin",
    role: "Specialised Support",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Alex Kim",
    role: "Product Designer",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Priya Singh",
    role: "Frontend Developer",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
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
  const [centerIdx, setCenterIdx] = useState(2); // Start with the middle image

  useEffect(() => {
    const interval = setInterval(() => {
      setCenterIdx((prev) => (prev + 1) % teamMembers.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Helper to get the correct index with wrap-around
  const getIdx = (offset: number) =>
    (centerIdx + offset + teamMembers.length) % teamMembers.length;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1500,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: 32,
        position: "relative",
        height: 320,
        margin: "40px auto 24px auto",
        overflowX: "auto",
        padding: "0 0 24px 0",
      }}
    >
      {[-2, -1, 0, 1, 2].map((offset: number) => {
        const idx = getIdx(offset);
        const member = teamMembers[idx];
        const isCenter = offset === 0;
        return (
          <div
            key={idx}
            style={{
              position: "relative",
              zIndex: isCenter ? 2 : 1,
              transition: "all 0.5s cubic-bezier(.4,2,.6,1)",
              transform: isCenter
                ? "scale(1.18) translateY(-18px)"
                : offset === -1 || offset === 1
                ? "scale(0.92) translateY(10px)"
                : "scale(0.8) translateY(30px)",
              filter: isCenter ? "none" : "blur(3px) grayscale(0.5)",
              opacity: isCenter ? 1 : 0.7,
              boxShadow: isCenter
                ? "0 8px 32px #8C5BFF33"
                : "0 2px 8px #e6e0fa33",
              borderRadius: 24,
              background: "#f6f3ff",
              width: 260,
              minWidth: 260,
              height: 280,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              margin: 0,
            }}
          >
            <Image
              src={member.img}
              alt={member.name}
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                transition: "filter 0.5s, transform 0.5s",
              }}
            />
            <div
              style={{
                background: "#8C5BFF",
                color: "#fff",
                width: "100%",
                padding: "20px 0 14px 0",
                textAlign: "center",
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: 0.2,
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
              }}
            >
              {member.name}
              <div
                style={{
                  fontWeight: 400,
                  fontSize: 16,
                  color: "#e6e0fa",
                  marginTop: 4,
                }}
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
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff 60%, #f6f3ff 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      {/* HERO SECTION */}
      <section
        style={{
          width: "100%",
          minHeight: "48vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px 0 32px 0",
          background: "#FAFEF6",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            textAlign: "center",
            width: "100%",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              color: "#a18fff",
              fontWeight: 700,
              fontSize: 24,
              marginBottom: 18,
              marginTop: 48,
            }}
          >
            Discover Our Story
          </div>
          <h1
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#3c3450",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            We&apos;re Building the future of
            <br />
            <span style={{ color: "#8C5BFF" }}>Digital Innovation</span>
          </h1>
          <div
            style={{
              margin: "38px 0 0 0",
              color: "#6d6a7c",
              fontSize: 22,
              fontWeight: 400,
            }}
          >
            Empowering every SaaS product to deliver an interactive demo in
            under 60 seconds 2D 2D
            <br />
            no developers, designers, or sales teams needed.
          </div>
        </div>
        {/* Decorative horizontal lines */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 40,
            height: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
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
      {/* IMAGE SECTION */}
      <section
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 0 32px 0",
        }}
      >
        <div
          style={{
            width: "90%",
            maxWidth: 1300,
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 4px 32px #e6e0fa33",
            background: "#fff",
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
            alt="Team working on tablet"
            width={1300}
            height={650}
            style={{ width: "100%", height: "auto", display: "block" }}
            priority
          />
        </div>
      </section>
      {/* STORY, MISSION, VISION & TEAM INTRO SECTION */}
      <section
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 0 0 0",
        }}
      >
        {/* Top: Story, Mission, Vision */}
        <div
          className="about-columns-row"
          style={{
            width: "90%",
            maxWidth: 1400,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 32,
            marginBottom: 64,
          }}
        >
          {/* Story */}
          <div style={{ flex: 1, textAlign: "center", padding: "0 16px" }}>
            <div
              style={{
                fontSize: 38,
                fontWeight: 700,
                color: "#3c3450",
                marginBottom: 8,
              }}
            >
              Our <span style={{ color: "#8C5BFF" }}>Story</span>
            </div>
            <div
              style={{
                color: "#b3b3b3",
                fontSize: 22,
                fontWeight: 500,
                marginBottom: 18,
              }}
            >
              Why We Started it?
            </div>
            <div
              style={{
                color: "#6d6a7c",
                fontSize: 20,
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              We are an early-stage, fast-growing SaaS startup helping
              product-led teams{" "}
              <span
                style={{
                  color: "#8C5BFF",
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
              >
                create interactive demos
              </span>{" "}
              for their tools,{" "}
              <span
                style={{
                  color: "#8C5BFF",
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
              >
                without
              </span>{" "}
              writing a single line of code or a video editor.
            </div>
          </div>
          {/* Divider */}
          <div
            style={{
              width: 2,
              background: "linear-gradient(180deg, #ede7ff 0%, #8C5BFF22 100%)",
              height: 180,
              alignSelf: "center",
              opacity: 0.4,
              borderRadius: 1,
            }}
          />
          {/* Mission */}
          <div style={{ flex: 1, textAlign: "center", padding: "0 16px" }}>
            <div
              style={{
                fontSize: 38,
                fontWeight: 700,
                color: "#3c3450",
                marginBottom: 8,
              }}
            >
              Our <span style={{ color: "#8C5BFF" }}>Mission</span>
            </div>
            <div
              style={{
                color: "#b3b3b3",
                fontSize: 22,
                fontWeight: 500,
                marginBottom: 18,
              }}
            >
              Why We Started it?
            </div>
            <div
              style={{
                color: "#6d6a7c",
                fontSize: 20,
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              To transform the way SaaS products are showcased and to equalize
              the access to{" "}
              <span
                style={{
                  color: "#8C5BFF",
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
              >
                high quality product
              </span>{" "}
              demos, empower early-stage startups to drive conversions through
              self-serve experiences.
            </div>
          </div>
          {/* Divider */}
          <div
            style={{
              width: 2,
              background: "linear-gradient(180deg, #ede7ff 0%, #8C5BFF22 100%)",
              height: 180,
              alignSelf: "center",
              opacity: 0.4,
              borderRadius: 1,
            }}
          />
          {/* Vision */}
          <div style={{ flex: 1, textAlign: "center", padding: "0 16px" }}>
            <div
              style={{
                fontSize: 38,
                fontWeight: 700,
                color: "#3c3450",
                marginBottom: 8,
              }}
            >
              Our <span style={{ color: "#8C5BFF" }}>Vision</span>
            </div>
            <div
              style={{
                color: "#b3b3b3",
                fontSize: 22,
                fontWeight: 500,
                marginBottom: 18,
              }}
            >
              Why We Started it?
            </div>
            <div
              style={{
                color: "#6d6a7c",
                fontSize: 20,
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              To enable every SaaS product to be experienced in{" "}
              <span
                style={{
                  color: "#8C5BFF",
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
              >
                under 60 seconds
              </span>{" "}
              through interactive demos, without needing a team of developers,
              editors, designers, or salespeople.
            </div>
          </div>
        </div>
        {/* Meet the Team Intro */}
        <div style={{ textAlign: "center", margin: "32px 0 0 0" }}>
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: "#3c3450",
              marginBottom: 12,
            }}
          >
            Meet{" "}
            <span
              style={{
                fontFamily: "monospace",
                fontWeight: 900,
                fontSize: 44,
                verticalAlign: "middle",
                color: "#8C5BFF",
                margin: "0 2px",
              }}
            ></span>
            our beautiful <span style={{ color: "#8C5BFF" }}>Team</span>
          </div>
          <div
            style={{
              color: "#8C5BFF99",
              fontSize: 22,
              fontWeight: 400,
              marginBottom: 32,
            }}
          >
            Our philosophy is simple, hire great and give them the resources
            support to do their best work.
          </div>
          <a
            href="#contact"
            style={{
              background: "#8C5BFF",
              color: "#fff",
              border: "none",
              borderRadius: 14,
              fontSize: 26,
              fontWeight: 600,
              padding: "18px 80px",
              boxShadow: "0 2px 8px #8C5BFF22",
              cursor: "pointer",
              marginTop: 8,
              textDecoration: "none",
              display: "inline-block",
              transition: "background 0.2s",
            }}
          >
            Get in Touch
          </a>
        </div>
      </section>
      {/* TEAM CARDS & QUOTE SECTION */}
      <section
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "48px 0 0 0",
        }}
      >
        {/* Team Cards Row */}
        <TeamCarousel />
        {/* Quote Section */}
        <div
          style={{ textAlign: "center", margin: "48px 0 0 0", maxWidth: 900 }}
        >
          <div
            style={{
              color: "#6d6a7c",
              fontSize: 24,
              fontWeight: 400,
              marginBottom: 32,
              fontStyle: "normal",
            }}
          >
            “It’s a statement of who we are and where we’re headed. Building it
            right demands a team that is not only skilled but aligned in
            mindset, values, and commitment to excellence.”
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Soumya Ranjan Nayak"
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: 8,
              }}
            />
            <div style={{ fontWeight: 700, fontSize: 18, color: "#3c3450" }}>
              Soumya Ranjan Nayak
            </div>
            <div style={{ color: "#8C5BFF", fontSize: 16, fontWeight: 500 }}>
              CEO, Marvedge
            </div>
          </div>
        </div>
      </section>
      {/* CONTACT FORM SECTION (Client Component) */}
      <ContactFormSection />
      {/* TEAM / MISSION SECTION */}
      <section
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          margin: "32px 0 0 0",
        }}
      >
        <div
          style={{
            width: "90%",
            maxWidth: 1400,
            display: "flex",
            flexDirection: "row",
            gap: 64,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          {/* Mission */}

          {/* Team */}
        </div>
      </section>
      {/* CONTACT / CTA SECTION */}

      {/* FOOTER */}
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
