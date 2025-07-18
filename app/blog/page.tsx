"use client";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useState, useRef } from "react";

function BlogCard({
  img,
  title,
  summary,
  category,
}: {
  img: string;
  title: string;
  summary: string;
  category: string[];
}) {
  return (
    <div
      style={{
        background: "#f6f3ff",
        borderRadius: 32,
        boxShadow: "0 4px 32px #e6e0fa55",
        width: 370,
        minHeight: 480,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        marginBottom: 32,
      }}
    >
      <Image
        src={img}
        alt="Blog"
        width={320}
        height={180}
        style={{
          borderRadius: 20,
          objectFit: "cover",
          width: 320,
          height: 180,
          marginBottom: 18,
        }}
      />
      <div
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}
      >
        {category.map((cat, i) => (
          <span
            key={i}
            style={{
              background: "#e6e0fa",
              color: "#8C5BFF",
              borderRadius: 8,
              padding: "4px 14px",
              fontWeight: 600,
              fontSize: 15,
              width: "fit-content",
            }}
          >
            {cat}
          </span>
        ))}
      </div>
      <h3
        style={{ fontSize: 26, fontWeight: 700, color: "#4c3c4c", margin: 0 }}
      >
        {title}
      </h3>
      <p style={{ color: "#6d6a7c", fontSize: 18, margin: "10px 0 16px 0" }}>
        {summary}
      </p>
      <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
        <span
          style={{
            background: "#e6e0fa",
            color: "#8C5BFF",
            borderRadius: 8,
            padding: "4px 14px",
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          Finance
        </span>
        <span
          style={{
            background: "#e6e0fa",
            color: "#8C5BFF",
            borderRadius: 8,
            padding: "4px 14px",
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          Website
        </span>
        <span
          style={{
            background: "#e6e0fa",
            color: "#8C5BFF",
            borderRadius: 8,
            padding: "4px 14px",
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          Case Study
        </span>
      </div>
      <Link
        href="#"
        style={{
          color: "#8C5BFF",
          fontWeight: 600,
          fontSize: 18,
          textDecoration: "none",
          marginTop: "auto",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        Learn more <span style={{ fontSize: 20 }}>→</span>
      </Link>
    </div>
  );
}

export default function BlogPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    img: "",
    summary: "",
    category: ["Finance"],
  });
  const defaultBlogs = [
    {
      title: "The Importance of Blogging for Business",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
      summary: "Discover how blogging can boost your business growth.",
      category: ["Finance"],
    },
    {
      title: "10 Tips for Successful Blogging",
      img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      summary: "Learn how to create engaging blog content that drives traffic.",
      category: ["Website"],
    },
    {
      title: "How to Build a Personal Brand Online",
      img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
      summary:
        "Tips and tricks for building your personal brand in the digital age.",
      category: ["Marketing"],
    },
    {
      title: "Case Study: SaaS Growth Hacking",
      img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
      summary: "A real-world example of how a SaaS company scaled rapidly.",
      category: ["Case Study"],
    },
    {
      title: "The Future of Product Design",
      img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
      summary: "Exploring trends and innovations in product design.",
      category: ["Product"],
    },
    {
      title: "Tech Stack Essentials for Startups",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      summary: "Choosing the right technology stack for your startup success.",
      category: ["Tech"],
    },
  ];
  const [blogs, setBlogs] = useState<any[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [showContact, setShowContact] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const handleCategorySelect = (cat: string) => {
    if (newBlog.category.includes(cat)) {
      setNewBlog({
        ...newBlog,
        category: newBlog.category.filter((c) => c !== cat),
      });
    } else {
      setNewBlog({ ...newBlog, category: [...newBlog.category, cat] });
    }
  };

  const handleRemoveCategory = (cat: string) => {
    setNewBlog({
      ...newBlog,
      category: newBlog.category.filter((c) => c !== cat),
    });
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setBlogs([{ ...newBlog }, ...blogs]);
    setShowCreate(false);
    setNewBlog({ title: "", img: "", summary: "", category: ["Finance"] });
    setImagePreview(""); // Clear preview on publish
  };

  const handleContactInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! (Demo only)");
    setContact({ name: "", email: "", message: "" });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setNewBlog({ ...newBlog, img: url });
    }
  };

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setShowCategoryDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      {/* Main content wrapper */}
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* --- HERO SECTION --- */}
        <section
          style={{
            width: "100%",
            minHeight: "70vh",
            background: "#FAFEF6",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "48px 0 0 0",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span
              style={{
                color: "#8C5BFF",
                fontWeight: 600,
                fontSize: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 22, margin: "18px 0" }}>✦</span> Latest
            </span>
            <h1
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: "#313053",
                margin: "8px 0",
              }}
            >
              Discover our <span style={{ color: "#8C5BFF" }}>Insights</span>
            </h1>
            <p
              style={{
                color: "#6d6a7c",
                fontSize: 22,
                fontWeight: 400,
                marginTop: 8,
              }}
            >
              Stay updated with our latest uploaded blogs
            </p>
          </div>
          <div
            className="blog-feature-section"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "stretch",
              background: "#f6f3ff",
              borderRadius: 32,
              boxShadow: "0 4px 32px #e6e0fa55",
              maxWidth: 1100,
              width: "90%",
              minHeight: 400,
              margin: "0 auto",
              padding: 32,
              gap: 40,
            }}
          >
            {/* Blog image */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
                alt="Blog visual"
                width={350}
                height={350}
                style={{
                  borderRadius: 32,
                  objectFit: "cover",
                  width: 350,
                  height: 350,
                }}
              />
            </div>
            {/* Blog content */}
            <div
              style={{
                flex: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  background: "#e6e0fa",
                  color: "#8C5BFF",
                  borderRadius: 8,
                  padding: "4px 16px",
                  fontWeight: 600,
                  fontSize: 18,
                  width: "fit-content",
                  marginBottom: 16,
                }}
              >
                All
              </span>
              <h2
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#4c3c4c",
                  margin: 0,
                }}
              >
                10 Tips for Successful Blogging
              </h2>
              <p
                style={{
                  color: "#6d6a7c",
                  fontSize: 20,
                  margin: "16px 0 32px 0",
                }}
              >
                Learn how to create engaging blog content that drives traffic
              </p>
              <button
                style={{
                  background: "#8C5BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "16px 40px",
                  fontSize: 20,
                  fontWeight: 600,
                  cursor: "pointer",
                  marginBottom: 32,
                  boxShadow: "0 2px 8px #8C5BFF22",
                }}
              >
                Discover Now
              </button>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginTop: "auto",
                }}
              >
                <Image
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Joya Mathur"
                  width={40}
                  height={40}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
                <div style={{ color: "#4c3c4c", fontSize: 16 }}>
                  <div style={{ fontWeight: 600 }}>Joya Mathur</div>
                  <div style={{ fontSize: 14, color: "#a1a1b5" }}>
                    12 July 2025
                  </div>
                </div>
                <div style={{ flex: 1 }} />
                <span
                  style={{
                    color: "#a1a1b5",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 16,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 18.333A8.333 8.333 0 1 1 10 1.667a8.333 8.333 0 0 1 0 16.666Zm0-7.5a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333Zm0 0V10"
                      stroke="#a1a1b5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  5 min read
                </span>
              </div>
            </div>
          </div>
        </section>
        {/* --- BLOG CARDS SECTION --- */}
        <section
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #fff 60%, #f6f3ff 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "32px 0 64px 0",
          }}
        >
          <div
            className="blog-header-row"
            style={{
              width: "90%",
              maxWidth: 1400,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 32,
            }}
          >
            <h2
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: "#313053",
                margin: 0,
              }}
            >
              All <span style={{ color: "#8C5BFF" }}>Blog Posts</span>
            </h2>
            <div className="blog-header-controls" style={{display:'flex',alignItems:'center',gap:12}}>
              <span style={{ color: "#4c3c4c", fontSize: 22 }}>🔽 Sort By :</span>
              <select
                style={{
                  background: "#8C5BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 20,
                  fontWeight: 500,
                  padding: "12px 32px",
                  boxShadow: "0 2px 8px #8C5BFF22",
                  outline: "none",
                  cursor: "pointer",
                  minWidth: 180,
                }}
                defaultValue="Category One"
              >
                <option>Category One</option>
                <option>Category Two</option>
                <option>Category Three</option>
              </select>
              <button
                style={{
                  background: "#8C5BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 20,
                  fontWeight: 600,
                  padding: "12px 32px",
                  boxShadow: "0 2px 8px #8C5BFF22",
                  cursor: "pointer",
                  marginLeft: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
                onClick={() => setShowCreate((v) => !v)}
              >
                ➕ Create New Blog
              </button>
            </div>
          </div>
          {showCreate && (
            <form
              onSubmit={handleCreate}
              style={{
                width: "100%",
                maxWidth: 600,
                margin: "0 auto 32px auto",
                background: "#f6f3ff",
                borderRadius: 24,
                boxShadow: "0 4px 24px #e6e0fa33",
                padding: 32,
                display: "flex",
                flexDirection: "column",
                gap: 18,
                alignItems: "center",
                position: "relative",
              }}
            >
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                style={{
                  position: "absolute",
                  top: 18,
                  right: 18,
                  background: "#ede7ff",
                  border: "1.5px solid #b9aaff",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  color: "#8C5BFF",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px #e6e0fa22",
                  zIndex: 2,
                }}
                aria-label="Close"
              >
                ×
              </button>
              <h3
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#8C5BFF",
                  margin: 0,
                }}
              >
                Create New Blog
              </h3>
              <input
                name="title"
                value={newBlog.title}
                onChange={handleInput}
                placeholder="Blog Title"
                required
                style={{
                  width: "100%",
                  padding: 12,
                  fontSize: 18,
                  borderRadius: 8,
                  border: "1.5px solid #b9aaff",
                  background: "#f6f3ff",
                }}
              />
              {/* Image file input and preview */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ width: "100%", padding: 8, fontSize: 16, borderRadius: 8, border: "1.5px solid #b9aaff", background: "#fff" }}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: 180, height: 120, objectFit: "cover", borderRadius: 12, margin: "8px 0" }}
                />
              )}
              {/* End image file input and preview */}
              {/* Custom Multi-Select Category UI */}
              <div
                ref={categoryRef}
                style={{
                  width: "100%",
                  position: "relative",
                  background: "#f6f3ff",
                  border: "1.5px solid #b9aaff",
                  borderRadius: 8,
                  minHeight: 48,
                  padding: "6px 12px",
                  cursor: "pointer",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 6,
                }}
                onClick={() => setShowCategoryDropdown((v) => !v)}
              >
                {newBlog.category.length === 0 && (
                  <span style={{ color: "#b9aaff", fontSize: 18 }}>
                    Select categories...
                  </span>
                )}
                {newBlog.category.map((cat) => (
                  <span
                    key={cat}
                    style={{
                      background: "#e6e0fa",
                      color: "#8C5BFF",
                      borderRadius: 8,
                      padding: "4px 10px 4px 14px",
                      fontWeight: 600,
                      fontSize: 15,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {cat}
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveCategory(cat);
                      }}
                      style={{
                        marginLeft: 4,
                        color: "#8C5BFF",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontSize: 16,
                        padding: "0 2px",
                      }}
                    >
                      ×
                    </span>
                  </span>
                ))}
                <span style={{ flex: 1 }} />
                <span
                  style={{ color: "#b9aaff", fontSize: 18, marginRight: 4 }}
                >
                  ▼
                </span>
                {showCategoryDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 48,
                      width: "100%",
                      background: "#f6f3ff",
                      border: "1.5px solid #b9aaff",
                      borderRadius: 8,
                      boxShadow: "0 4px 24px #e6e0fa33",
                      zIndex: 10,
                      padding: 6,
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    {[
                      "Finance",
                      "Website",
                      "Case Study",
                      "Marketing",
                      "Product",
                      "Tech",
                      "Other",
                    ].map((cat) => (
                      <div
                        key={cat}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategorySelect(cat);
                        }}
                        style={{
                          padding: "8px 12px",
                          borderRadius: 6,
                          background: newBlog.category.includes(cat)
                            ? "#8C5BFF22"
                            : "transparent",
                          color: newBlog.category.includes(cat)
                            ? "#8C5BFF"
                            : "#313053",
                          fontWeight: 500,
                          fontSize: 17,
                          cursor: "pointer",
                          transition: "background 0.2s",
                        }}
                      >
                        {cat}
                        {newBlog.category.includes(cat) && (
                          <span style={{ marginLeft: 8, fontWeight: 700 }}>
                            ✓
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* End Custom Multi-Select Category UI */}
              <textarea
                name="summary"
                value={newBlog.summary}
                onChange={handleInput}
                placeholder="Short Summary"
                required
                rows={3}
                style={{
                  width: "100%",
                  padding: 12,
                  fontSize: 18,
                  borderRadius: 8,
                  border: "1.5px solid #b9aaff",
                  background: "#f6f3ff",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#8C5BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 20,
                  fontWeight: 600,
                  padding: "12px 40px",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px #8C5BFF22",
                  marginTop: 8,
                }}
              >
                Publish Blog
              </button>
            </form>
          )}
          <div
            style={{
              width: "90%",
              maxWidth: 1400,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: 32,
              justifyItems: "center",
              alignItems: "stretch",
            }}
          >
            {blogs.concat(defaultBlogs).map((blog, idx) => (
              <BlogCard
                key={idx}
                img={blog.img}
                title={blog.title}
                summary={blog.summary}
                category={blog.category}
              />
            ))}
          </div>
          {/* Second row of blog cards */}
          <div
            style={{
              width: "90%",
              maxWidth: 1400,
              display: "flex",
              gap: 32,
              flexWrap: "wrap",
              justifyContent: "flex-start",
              marginTop: 0,
            }}
          >
            {/* Blog cards are now rendered from blogs state above */}
          </div>
          {/* Load More Button */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: 24,
            }}
          >
            <button
              style={{
                background: "#8C5BFF",
                color: "#fff",
                border: "none",
                borderRadius: 16,
                fontSize: 24,
                fontWeight: 600,
                padding: "18px 80px",
                boxShadow: "0 2px 8px #8C5BFF22",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 12,
                transition: "background 0.2s",
              }}
            >
              Load More{" "}
              <span
                style={{
                  fontSize: 28,
                  display: "inline-block",
                  transform: "translateY(2px)",
                }}
              >
                ↗
              </span>
            </button>
          </div>
        </section>
        {/* --- NEWSLETTER SECTION --- */}
        <section
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "48px 0 0 0",
          }}
        >
          <div
            style={{
              width: "90%",
              maxWidth: 1400,
              background: "linear-gradient(135deg, #fff 60%, #f6f3ff 100%)",
              borderRadius: 48,
              boxShadow: "0 4px 32px #e6e0fa33",
              padding: "64px 32px 48px 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                fontSize: 56,
                fontWeight: 800,
                color: "#313053",
                margin: 0,
                textAlign: "center",
              }}
            >
              Stay Updated{" "}
              <span style={{ color: "#8C5BFF" }}>With Our Newsletter</span>
            </h2>
            <p
              style={{
                color: "#6d6a7c",
                fontSize: 28,
                fontWeight: 400,
                margin: "32px 0 40px 0",
                textAlign: "center",
                maxWidth: 800,
              }}
            >
              Subscribe to our newsletter for the latest updates and insights
              <br />
              on no-code / low code development.
            </p>
            <form
              className="newsletter-form"
              onSubmit={(e) => {
                e.preventDefault();
                const email = (
                  e.currentTarget.elements.namedItem(
                    "newsletterEmail"
                  ) as HTMLInputElement
                )?.value;
                if (email) {
                  window.location.href = `/?waitlist=${encodeURIComponent(
                    email
                  )}#waitlist-form-section`;
                }
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 24,
                width: "100%",
                maxWidth: 700,
                marginBottom: 24,
              }}
            >
              <input
                name="newsletterEmail"
                type="email"
                placeholder="Enter Your Email"
                required
                style={{
                  flex: 1,
                  padding: "18px 24px",
                  fontSize: 22,
                  borderRadius: 12,
                  border: "2px solid #e6e0fa",
                  outline: "none",
                  background: "#fff",
                  color: "#313053",
                  fontWeight: 500,
                  transition: "border 0.2s",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#8C5BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 24,
                  fontWeight: 600,
                  padding: "0 48px",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px #8C5BFF22",
                  transition: "background 0.2s",
                }}
              >
                Join Now
              </button>
            </form>
            <div
              style={{
                color: "#8C5BFF",
                fontSize: 18,
                marginTop: 8,
                textAlign: "center",
              }}
            >
              By joining you Agree to our{" "}
              <span style={{ textDecoration: "underline", cursor: "pointer" }}>
                Terms and Conditions
              </span>
              .
            </div>
          </div>
        </section>
        {/* --- FAQ SECTION --- */}
        <section
          className="faq-section-container"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            margin: "64px 0 0 0",
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
            {/* Left Side */}
            <div style={{ flex: 1, minWidth: 340 }}>
              <h2
                style={{
                  fontSize: 48,
                  fontWeight: 800,
                  color: "#313053",
                  margin: 0,
                }}
              >
                Frequently Asked{" "}
                <span style={{ color: "#8C5BFF" }}>Questions</span>
              </h2>
              <p
                style={{
                  color: "#6d6a7c",
                  fontSize: 24,
                  fontWeight: 400,
                  margin: "32px 0 0 0",
                  maxWidth: 400,
                }}
              >
                Find answers to common questions about our no code/ low code
                development service
              </p>
              <div style={{ marginTop: 40 }}>
                <div
                  style={{
                    color: "#a1a1b5",
                    fontWeight: 700,
                    fontSize: 22,
                    marginBottom: 12,
                  }}
                >
                  For more Querries:
                </div>
                <button
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
                  }}
                  onClick={() => setShowContact((v) => !v)}
                >
                  Contact Us
                </button>
                {showContact && (
                  <div
                    style={{
                      marginTop: 24,
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <form
                      style={{
                        width: "100%",
                        maxWidth: 500,
                        background: "#f6f3ff",
                        borderRadius: 24,
                        boxShadow: "0 4px 24px #e6e0fa33",
                        padding: 32,
                        display: "flex",
                        flexDirection: "column",
                        gap: 18,
                        alignItems: "center",
                        position: "relative",
                      }}
                      onSubmit={handleContactSubmit}
                    >
                      <button
                        type="button"
                        onClick={() => setShowContact(false)}
                        style={{
                          position: "absolute",
                          top: 18,
                          right: 18,
                          background: "#ede7ff",
                          border: "1.5px solid #b9aaff",
                          borderRadius: "50%",
                          width: 36,
                          height: 36,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 22,
                          color: "#8C5BFF",
                          cursor: "pointer",
                          boxShadow: "0 2px 8px #e6e0fa22",
                          zIndex: 2,
                        }}
                        aria-label="Close"
                      >
                        ×
                      </button>
                      <h3
                        style={{
                          fontSize: 28,
                          fontWeight: 700,
                          color: "#8C5BFF",
                          margin: 0,
                        }}
                      >
                        Contact Us
                      </h3>
                      <input
                        name="name"
                        placeholder="Your Name"
                        required
                        value={contact.name}
                        onChange={handleContactInput}
                        style={{
                          width: "100%",
                          padding: 12,
                          fontSize: 18,
                          borderRadius: 8,
                          border: "1.5px solid #b9aaff",
                          background: "#fff",
                        }}
                      />
                      <input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        required
                        value={contact.email}
                        onChange={handleContactInput}
                        style={{
                          width: "100%",
                          padding: 12,
                          fontSize: 18,
                          borderRadius: 8,
                          border: "1.5px solid #b9aaff",
                          background: "#fff",
                        }}
                      />
                      <textarea
                        name="message"
                        placeholder="Your Message"
                        required
                        rows={4}
                        value={contact.message}
                        onChange={handleContactInput}
                        style={{
                          width: "100%",
                          padding: 12,
                          fontSize: 18,
                          borderRadius: 8,
                          border: "1.5px solid #b9aaff",
                          background: "#fff",
                        }}
                      />
                      <button
                        type="submit"
                        style={{
                          background: "#8C5BFF",
                          color: "#fff",
                          border: "none",
                          borderRadius: 10,
                          fontSize: 20,
                          fontWeight: 600,
                          padding: "12px 40px",
                          cursor: "pointer",
                          boxShadow: "0 2px 8px #8C5BFF22",
                          marginTop: 8,
                        }}
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
            {/* Right Side (Accordion) */}
            <div style={{ flex: 2, minWidth: 400 }}>
              {/* Expanded answer */}
              <div
                style={{
                  background: "#f6f3ff",
                  borderRadius: 32,
                  boxShadow: "0 4px 32px #e6e0fa33",
                  padding: "32px 40px 32px 40px",
                  marginBottom: 24,
                  fontSize: 22,
                  color: "#4c3c4c",
                  fontWeight: 500,
                  position: "relative",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 26, marginBottom: 8 }}>
                  What is no-code?
                </div>
                <div
                  style={{ color: "#6d6a7c", fontWeight: 400, fontSize: 22 }}
                >
                  No-code is a development method that allows people to build
                  apps or websites without coding, using visual tools and
                  drag-and-drop interfaces.
                </div>
                <span
                  style={{
                    position: "absolute",
                    top: 24,
                    right: 32,
                    fontSize: 36,
                    color: "#c2b6e6",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  aria-label="Close"
                >
                  ×
                </span>
              </div>
              {/* Collapsed questions */}
              {[
                "What are the benefits?",
                "Can I integrate with existing systems?",
                "What services do you offer?",
                "How can I get started?",
              ].map((q, i) => (
                <div
                  key={q}
                  style={{
                    background: "#fff",
                    border: "2px solid #e6e0fa",
                    borderRadius: 18,
                    padding: "28px 40px",
                    marginBottom: 18,
                    fontSize: 22,
                    color: "#6d6a7c",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    transition: "background 0.2s, border 0.2s",
                  }}
                >
                  {q}
                  <span
                    style={{ fontSize: 32, color: "#c2b6e6", marginLeft: 16 }}
                  >
                    +
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      {/* --- FOOTER --- */}
      <Footer />
      <style jsx global>{`
        @media (max-width: 900px) {
          .blog-card-grid {
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)) !important;
            gap: 20px !important;
          }
          .blog-form, .newsletter-form {
            max-width: 98vw !important;
            padding: 18px !important;
          }
          .blog-section, .newsletter-section {
            padding: 24px 0 !important;
          }
          .blog-card {
            min-width: 0 !important;
            width: 100% !important;
            padding: 12px !important;
          }
        }
        @media (max-width: 600px) {
          .blog-card-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .blog-form, .newsletter-form {
            max-width: 100vw !important;
            padding: 8px !important;
          }
          .blog-section, .newsletter-section {
            padding: 12px 0 !important;
          }
          .blog-card {
            min-width: 0 !important;
            width: 95vw !important;
            max-width: 95vw !important;
            padding: 12px 8px !important;
            border-radius: 18px !important;
            margin: 0 auto 18px auto !important;
            box-sizing: border-box !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .blog-card img {
            order: 0 !important;
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 4/3 !important;
            border-radius: 12px !important;
            margin-bottom: 10px !important;
            object-fit: cover !important;
          }
          .blog-card > *:not(img) {
            order: 1 !important;
          }
          .blog-card h3, .blog-card p {
            font-size: 1rem !important;
          }
          .blog-btn, .newsletter-btn {
            width: 100% !important;
            font-size: 1rem !important;
            padding: 12px 0 !important;
          }
          .blog-card > * {
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          .blog-feature-section {
            flex-direction: column !important;
            gap: 18px !important;
            padding: 16px !important;
            min-height: unset !important;
          }
          .blog-feature-section img {
            width: 100% !important;
            height: auto !important;
            border-radius: 18px !important;
            margin-bottom: 12px !important;
          }
          @media (max-width: 600px) {
            .blog-feature-section {
              flex-direction: column !important;
              gap: 12px !important;
              padding: 12px 4px !important;
              min-height: unset !important;
              max-width: 98vw !important;
              width: 98vw !important;
              border-radius: 18px !important;
              box-shadow: 0 2px 12px #e6e0fa33 !important;
              margin: 0 auto 18px auto !important;
            }
            .blog-feature-section > div:first-child img {
              width: 100% !important;
              height: auto !important;
              aspect-ratio: 16/9 !important;
              border-radius: 14px !important;
              margin-bottom: 10px !important;
              object-fit: cover !important;
              display: block !important;
              max-width: 100% !important;
            }
            .blog-feature-section h2 {
              font-size: 1.2rem !important;
              margin: 8px 0 4px 0 !important;
            }
            .blog-feature-section p, .blog-feature-section span, .blog-feature-section button {
              font-size: 1rem !important;
            }
            .blog-feature-section button {
              width: 100% !important;
              font-size: 1rem !important;
              padding: 12px 0 !important;
              margin: 10px 0 !important;
            }
            .blog-header-row {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 10px !important;
              width: 98vw !important;
              max-width: 98vw !important;
              margin-bottom: 18px !important;
            }
            .blog-header-row > * {
              width: 100% !important;
              margin: 0 0 6px 0 !important;
              font-size: 1.1rem !important;
            }
            .blog-header-row h2 {
              font-size: 1.4rem !important;
              margin-bottom: 2px !important;
            }
            .blog-header-row select, .blog-header-row button {
              font-size: 1rem !important;
              padding: 10px 0 !important;
              width: 100% !important;
              margin-bottom: 6px !important;
            }
          }
          @media (max-width: 600px) {
            .blog-header-row {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 18px !important;
              width: 98vw !important;
              max-width: 98vw !important;
              margin-bottom: 18px !important;
              border-bottom: 1.5px solid #ece6ff;
              padding-bottom: 10px;
            }
            .blog-header-row h2 {
              font-size: 2rem !important;
              margin-bottom: 6px !important;
              color: #7C55D7 !important;
              letter-spacing: 0.5px;
              text-shadow: 0 2px 8px #e6e0fa33;
            }
            .blog-header-controls {
              width: 100% !important;
              background: #f6f3ff !important;
              border-radius: 16px !important;
              box-shadow: 0 2px 8px #e6e0fa22 !important;
              padding: 12px 10px !important;
              display: flex !important;
              flex-direction: column !important;
              align-items: stretch !important;
              gap: 10px !important;
              margin-top: 4px !important;
            }
            .blog-header-controls > * {
              width: 100% !important;
              font-size: 1.1rem !important;
              margin: 0 0 4px 0 !important;
            }
            .blog-header-controls select, .blog-header-controls button {
              font-size: 1rem !important;
              padding: 12px 0 !important;
              width: 100% !important;
              margin-bottom: 4px !important;
            }
          }
          @media (max-width: 600px) {
            .newsletter-outer {
              flex-direction: column !important;
              width: 100vw !important;
              margin: 18px 0 0 0 !important;
              align-items: stretch !important;
              justify-content: flex-start !important;
              padding: 0 !important;
            }
            .newsletter-outer > * {
              width: 100% !important;
              max-width: 100vw !important;
            }
            .newsletter-form {
              flex-direction: column !important;
              gap: 10px !important;
              width: 100% !important;
              max-width: 100vw !important;
              align-items: stretch !important;
            }
            .newsletter-form input, .newsletter-form button {
              width: 100% !important;
              font-size: 1rem !important;
              padding: 14px 0 !important;
              margin: 0 !important;
              box-sizing: border-box !important;
            }
          }
          @media (max-width: 927px) {
            .faq-section-container {
              flex-direction: column !important;
              gap: 0 !important;
              width: 98vw !important;
              max-width: 98vw !important;
              align-items: stretch !important;
              justify-content: flex-start !important;
              margin: 0 auto !important;
              padding: 0 !important;
            }
            .faq-section-container > *,
            .faq-section-container > * > *,
            .faq-section-container > * > * > * {
              width: 100% !important;
              min-width: 0 !important;
              max-width: 100vw !important;
              box-sizing: border-box !important;
              float: none !important;
              display: block !important;
            }
            .faq-section-container > *:first-child {
              margin-bottom: 24px !important;
            }
            .faq-section-container .faq-card, .faq-section-container .faq-item {
              margin-bottom: 10px !important;
              border-radius: 14px !important;
              font-size: 1rem !important;
              padding: 16px 10px !important;
            }
          }
        `}</style>
    </div>
  );
}
