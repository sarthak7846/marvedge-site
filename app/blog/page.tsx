"use client";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useState, useRef } from "react";
import { prisma } from "@/app/lib/prisma";

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
      className="bg-gradient-to-br from-white via-[#f6f3ff] to-[#ede7ff] border border-[#e6e0fa] rounded-[32px] shadow-2xl w-[420px] min-h-[480px] p-7 flex flex-col mb-8 transition-all duration-300 hover:shadow-[0_16px_48px_#b9aaff55] hover:border-[#b9aaff] hover:-translate-y-2 hover:scale-[1.035]"
    >
      <img
        src={img}
        alt="Blog"
        className="rounded-[22px] object-cover w-full h-[180px] mb-5"
        style={{ aspectRatio: '16/9' }}
      />
      <div className="flex items-center gap-2 text-[#9066F9] text-[16px] font-medium mb-2">
        <svg className="w-5 h-5" fill="none" stroke="#9066F9" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#9066F9" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" stroke="#9066F9" strokeWidth="2" /></svg>
        <span>5 min read</span>
      </div>
      <h3 className="text-[24px] font-bold text-[#3d2966] leading-tight mb-1">{title}</h3>
      <p className="text-[#6d6a7c] text-[17px] mb-4">{summary}</p>
      <div className="flex gap-2 flex-wrap mb-4">
        {category.map((cat, i) => (
          <span
            key={i}
            className="bg-[#e6e0fa] text-[#9066F9] rounded-[12px] px-4 py-1 font-semibold text-[15px] w-fit shadow-sm"
          >
            {cat}
          </span>
        ))}
      </div>
      <a
        href="#"
        className="text-[#9066F9] font-semibold text-[18px] mt-auto flex items-center gap-1.5 hover:text-[#7a4eea] transition"
      >
        Learn more <span className="text-[20px]">&gt;</span>
      </a>
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]); // State for selected filter categories
  const [showAll, setShowAll] = useState(false); // State to control if all blogs are shown after Load More
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
  const [blogs, setBlogs] = useState<
    {
      title: string;
      img: string;
      summary: string;
      category: string[];
    }[]
  >([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const blogListRef = React.useRef<HTMLDivElement>(null);
  const [multiDropdownOpen, setMultiDropdownOpen] = useState(false);
  const multiDropdownRef = useRef<HTMLDivElement>(null);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setNewBlog({ ...newBlog, img: url });
    }
  };

  // Filter blogs based on selected category
  const filteredBlogs = selectedCategories.includes("All")
    ? blogs.concat(defaultBlogs)
    : blogs
        .concat(defaultBlogs)
        .filter((blog) =>
          blog.category.some((cat) => selectedCategories.includes(cat))
        );

  // Logic for sorted/featured blog and the rest
  let featuredBlog = null;
  let otherBlogs: typeof filteredBlogs = [];
  if (selectedCategories.length === 1 && selectedCategories[0] !== "All") {
    featuredBlog = filteredBlogs[0];
  }
  // All blogs (from all categories)
  const allBlogs = blogs.concat(defaultBlogs);
  // Remove the featured blog from allBlogs (if present)
  const allOtherBlogs = featuredBlog
    ? allBlogs.filter(
        (blog) =>
          blog.title !== featuredBlog.title ||
          blog.summary !== featuredBlog.summary ||
          blog.img !== featuredBlog.img
      )
    : allBlogs;

  // Handler for sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    if (selectedOptions.includes("All")) {
      setSelectedCategories(["All"]);
    } else {
      setSelectedCategories(selectedOptions);
    }
    setShowAll(false); // Reset to only show featured blog
  };

  // Handler for Load More
  const handleLoadMore = () => {
    setShowAll(true);
  };

  // Handler for Discover Now button scroll
  const handleDiscoverNow = () => {
    if (blogListRef.current) {
      blogListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
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

  // Close multiselect dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        multiDropdownRef.current &&
        !multiDropdownRef.current.contains(event.target as Node)
      ) {
        setMultiDropdownOpen(false);
      }
    }
    if (multiDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [multiDropdownOpen]);

  // Handler for custom multiselect
  const handleMultiSelect = (cat: string) => {
    if (cat === "All") {
      setSelectedCategories(["All"]);
    } else {
      let newSelected = selectedCategories.includes(cat)
        ? selectedCategories.filter((c) => c !== cat)
        : [...selectedCategories.filter((c) => c !== "All"), cat];
      if (newSelected.length === 0) newSelected = ["All"];
      setSelectedCategories(newSelected);
    }
    setShowAll(false);
  };
  const handleRemoveSelected = (cat: string) => {
    if (cat === "All") return;
    const newSelected = selectedCategories.filter((c) => c !== cat);
    setSelectedCategories(newSelected.length ? newSelected : ["All"]);
  };

  // Available categories for both filter and blog creation
  const categories = [
    "Finance",
    "Website",
    "Case Study",
    "Marketing",
    "Product",
    "Tech",
    "Other",
  ];

  const allowedEmails = [
    "somya@marvedge.com",
    "hey@marvedge.com",
    "sandip@marvedge.com",
    "badal@marvedge.com",
    "ashish@marvedge.com",
    "kulkarniworkk@gmail.com",
  ];
  const userEmail =
    typeof window !== "undefined"
      ? localStorage.getItem("marvedgeUserEmail")
      : null;
  const canEdit = allowedEmails.includes(userEmail || "");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-f6f3ff flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col">
        <section className="w-full min-h-[70vh] bg-[#FAFEF6] flex flex-col items-center py-12">
          <div className="text-center mb-10">
            <h1 className="text-[48px] font-bold text-[#313053] mb-4">
              Discover our <span className="text-[#8C5BFF]">Insights</span>
            </h1>
            <p className="text-[#6d6a7c] text-[22px] font-normal mt-2">
              Stay updated with our latest uploaded blogs
            </p>
          </div>
          <div className="blog-feature-section flex flex-row items-stretch bg-[#f6f3ff] rounded-[32px] shadow-[0_4px_32px_#e6e0fa55] max-w-[1100px] w-full min-h-[400px] mx-auto p-12 gap-16">
            <div className="flex-1 flex items-center justify-center">
              <Image
                src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
                alt="Blog visual"
                width={350}
                height={350}
                className="rounded-[32px] object-cover w-[350px] h-[350px]"
              />
            </div>
            <div className="flex-2 flex flex-col justify-center">
              <span className="bg-[#e6e0fa] text-[#8C5BFF] rounded-[8px] px-[16px] py-1 font-semibold text-[18px] w-fit mb-4">
                All
              </span>
              <h2 className="text-[36px] font-bold text-[#4c3c4c] mb-0">
                10 Tips for Successful Blogging
              </h2>
              <p className="text-[#6d6a7c] text-[20px] mt-4 mb-8">
                Learn how to create engaging blog content that drives traffic
              </p>
              <div className="flex justify-center w-full mb-12">
                <button
                  className="bg-[#8C5BFF] text-white border-none rounded-[10px] px-12 py-4 text-[20px] font-semibold cursor-pointer shadow-[0_2px_8px_#8C5BFF22] transition hover:bg-[#7a4eea]"
                  onClick={handleDiscoverNow}
                >
                  Discover Now
                </button>
              </div>
              <div className="flex items-center gap-4 mt-auto">
                <Image
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Joya Mathur"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div className="text-[#4c3c4c] text-[16px]">
                  <div className="font-semibold">Joya Mathur</div>
                  <div className="text-[#a1a1b5] text-[14px]">12 July 2025</div>
                </div>
                <div className="flex-1" />
                <span className="text-[#a1a1b5] flex items-center gap-1.5 text-[16px]">
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
        <section
          ref={blogListRef}
          className="w-full bg-gradient-to-b from-white to-f6f3ff flex flex-col items-center py-24"
        >
          <div className="blog-header-row flex flex-row justify-between items-center mb-12 w-full max-w-[1400px] mx-auto px-4">
            <h2 className="text-[48px] font-bold text-[#313053] mb-0 text-left">
              All <span className="text-[#8C5BFF]">Blog Posts</span>
            </h2>
            <div className="blog-header-controls flex flex-row items-center gap-6 ml-auto">
              <span className="text-[#4c3c4c] text-[22px]">Sort By :</span>
              {/* Custom Multiselect Dropdown */}
              <div className="relative min-w-[180px]" ref={multiDropdownRef}>
                <button
                  type="button"
                  className="bg-[#9066F9] text-white border-none rounded-[14px] font-semibold text-[20px] px-8 py-3 shadow-[0_2px_8px_#9066F955] outline-none cursor-pointer flex justify-between items-center min-w-[180px] w-full transition hover:bg-[#7a4eea] focus:ring-2 focus:ring-[#b9aaff]"
                  onClick={() => setMultiDropdownOpen((v) => !v)}
                >
                  <span className="truncate text-white text-[18px] font-semibold text-left">
                    {selectedCategories[0] === "All"
                      ? "All"
                      : selectedCategories.join(", ")}
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform ${multiDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {multiDropdownOpen && (
                  <div className="absolute left-0 top-14 w-full bg-white border border-[#b9aaff] rounded-[12px] shadow-[0_4px_24px_#e6e0fa33] z-20 p-2 flex flex-col gap-1 animate-fade-in">
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer hover:bg-[#f6f3ff]"
                      onClick={() => handleMultiSelect("All")}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories[0] === "All"}
                        readOnly
                        className="accent-[#8C5BFF] w-4 h-4"
                      />
                      <span className="text-[#8C5BFF] font-semibold">All</span>
                    </div>
                    {categories.map((cat) => (
                      <div
                        key={cat}
                        className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer hover:bg-[#f6f3ff]"
                        onClick={() => handleMultiSelect(cat)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          readOnly
                          className="accent-[#8C5BFF] w-4 h-4"
                        />
                        <span className="text-[#4c3c4c] font-medium">
                          {cat}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {canEdit && (
                <button
                  className="bg-[#8C5BFF] text-white border-none rounded-[12px] font-semibold text-[20px] px-[32px] py-3 shadow-[0_2px_8px_#8C5BFF22] cursor-pointer flex items-center gap-1.5"
                  onClick={() => setShowCreate((v) => !v)}
                >
                  Create New Blog
                </button>
              )}
            </div>
          </div>
          {canEdit && showCreate && (
            <form
              onSubmit={handleCreate}
              className="w-full max-w-md mx-auto mb-12 bg-[#f6f3ff] rounded-[24px] shadow-[0_4px_24px_#e6e0fa33] p-12 flex flex-col gap-6 items-center relative"
            >
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="absolute top-4 right-4 bg-[#ede7ff] border border-[#b9aaff] rounded-full w-10 h-10 flex items-center justify-center font-semibold text-[22px] text-[#8C5BFF] cursor-pointer shadow-[0_2px_8px_#e6e0fa22] z-10"
                aria-label="Close"
              >
                ×
              </button>
              <h3 className="text-[28px] font-bold text-[#8C5BFF] mb-0">
                Create New Blog
              </h3>
              <input
                name="title"
                value={newBlog.title}
                onChange={handleInput}
                placeholder="Blog Title"
                required
                className="w-full px-6 py-3 text-[18px] rounded-[8px] border border-[#b9aaff] bg-[#f6f3ff]"
              />
              <input
                id="blog-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="blog-image-upload"
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-[#f6f3ff] text-[#8C5BFF] border border-[#b9aaff] rounded-[8px] font-semibold text-[18px] cursor-pointer hover:bg-[#ede7ff] transition mb-2 shadow-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="#8C5BFF" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                {imagePreview ? 'Change Image' : 'Upload Image'}
              </label>
              {imagePreview && (
                <div className="w-full h-48 bg-white rounded-[12px] flex items-center justify-center border border-[#b9aaff] mt-2">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={240}
                    height={240}
                    className="w-full h-full object-contain rounded-[10px] bg-transparent"
                  />
                </div>
              )}
              <div
                ref={categoryRef}
                className="w-full relative bg-[#f6f3ff] border border-[#b9aaff] rounded-[8px] min-h-[48px] px-6 py-3 cursor-pointer flex flex-wrap items-center gap-1.5"
                onClick={() => setShowCategoryDropdown((v) => !v)}
              >
                {newBlog.category.length === 0 && (
                  <span className="text-[#b9aaff] text-[18px]">
                    Select categories...
                  </span>
                )}
                {newBlog.category.map((cat) => (
                  <span
                    key={cat}
                    className="bg-[#e6e0fa] text-[#8C5BFF] rounded-[8px] px-[10px] py-1 font-semibold text-[15px] flex items-center gap-1"
                  >
                    {cat}
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveCategory(cat);
                      }}
                      className="ml-1 text-[#8C5BFF] font-bold cursor-pointer text-[16px] px-1"
                    >
                      ×
                    </span>
                  </span>
                ))}
                <span className="flex-1" />
                <span className="text-[#b9aaff] text-[18px] mr-1">▼</span>
                {showCategoryDropdown && (
                  <div className="absolute left-0 top-12 w-full bg-[#f6f3ff] border border-[#b9aaff] rounded-[8px] shadow-[0_4px_24px_#e6e0fa33] z-10 p-3 flex flex-col gap-1">
                    {categories.map((cat) => (
                      <div
                        key={cat}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategorySelect(cat);
                        }}
                        className="px-4 py-2 rounded-3 text-[#313053] font-semibold text-[17px] cursor-pointer transition-background"
                      >
                        {cat}
                        {newBlog.category.includes(cat) && (
                          <span className="ml-2 font-bold">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <textarea
                name="summary"
                value={newBlog.summary}
                onChange={handleInput}
                placeholder="Short Summary"
                required
                rows={3}
                className="w-full px-6 py-3 text-[18px] rounded-[8px] border border-[#b9aaff] bg-[#f6f3ff]"
              />
              <button
                type="submit"
                className="bg-[#8C5BFF] text-white border-none rounded-[10px] font-semibold text-[20px] px-[40px] py-3 cursor-pointer shadow-[0_2px_8px_#8C5BFF22] mt-2"
              >
                Publish Blog
              </button>
            </form>
          )}
          <div
            className="w-full max-w-[1400px] grid gap-12 justify-items-center items-stretch"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            }}
          >
            {/* If a sort is selected, show the featured blog at the top, then all blogs below after Load More */}
            {filteredBlogs.map((blog, idx) => (
              <BlogCard
                key={idx}
                img={blog.img}
                title={blog.title}
                summary={blog.summary}
                category={blog.category}
              />
            ))}
          </div>
          <div className="w-full flex justify-center mt-6">
            <button
              className="bg-[#8C5BFF] text-white border-none rounded-[16px] font-semibold text-[24px] px-[80px] py-[18px] shadow-[0_2px_8px_#8C5BFF22] cursor-pointer flex items-center gap-3 transition-background"
              onClick={handleLoadMore}
            >
              Load More
              <svg
                className="w-7 h-7 ml-2 -mt-0.5"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17L17 7M7 7h10v10"
                />
              </svg>
            </button>
          </div>
        </section>
        <section className="faq-section-container flex justify-center items-start mt-24">
          <div className="w-full max-w-[1400px] flex flex-row gap-24 items-start justify-center">
            <div className="flex-1 min-w-[340px]">
              <h2 className="text-[48px] font-bold text-[#313053] mb-0">
                Frequently Asked{" "}
                <span className="text-[#8C5BFF]">Questions</span>
              </h2>
              <p className="text-[#6d6a7c] text-[24px] font-normal mt-8 max-w-[400px]">
                Find answers to common questions about our no code/ low code
                development service
              </p>
              <div className="mt-16">
                <div className="text-[#a1a1b5] font-bold text-[22px] mb-3">
                  Company Contact
                </div>
                <div className="text-[#313053] text-[18px] mb-2">
                  Address: Plot no 4215, A.V. complex, Gadakana, Mancheshwar,
                  751017, Bhubaneswar, Odisha
                </div>
                <div className="text-[#313053] text-[18px] mb-2">
                  Email: hey@marvedge.com
                </div>
                <div className="text-[#313053] text-[18px] mb-2">
                  Phone: +91 7978141068
                </div>
              </div>
            </div>
            <div className="flex-2 min-w-[400px]">
              <div className="bg-[#f6f3ff] rounded-[32px] shadow-[0_4px_32px_#e6e0fa33] p-12">
                <div className="font-bold text-[26px] mb-8">
                  What is no-code?
                </div>
                <div className="text-[#6d6a7c] font-normal text-[22px]">
                  No-code is a development method that allows people to build
                  apps or websites without coding, using visual tools and
                  drag-and-drop interfaces.
                </div>
                <span
                  className="absolute top-6 right-12 text-[36px] text-[#c2b6e6] cursor-pointer user-select-none"
                  aria-label="Close"
                >
                  ×
                </span>
              </div>
              {[
                "What are the benefits?",
                "Can I integrate with existing systems?",
                "What services do you offer?",
                "How can I get started?",
              ].map((q) => (
                <div
                  key={q}
                  className="bg-white border border-[#e6e0fa] rounded-[18px] p-7 mb-6"
                >
                  <div className="text-[#6d6a7c] font-semibold text-[22px] mb-3">
                    {q}
                  </div>
                  <div className="text-[#6d6a7c] font-semibold text-[22px]">
                    +
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <style jsx global>{`
        @media (max-width: 900px) {
          .blog-card-grid {
            grid-template-columns: repeat(
              auto-fit,
              minmax(260px, 1fr)
            ) !important;
            gap: 20px !important;
          }
          .blog-form,
          .newsletter-form {
            max-width: 98vw !important;
            padding: 18px !important;
          }
          .blog-section,
          .newsletter-section {
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
          .blog-form,
          .newsletter-form {
            max-width: 100vw !important;
            padding: 8px !important;
          }
          .blog-section,
          .newsletter-section {
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
          .blog-card h3,
          .blog-card p {
            font-size: 1rem !important;
          }
          .blog-btn,
          .newsletter-btn {
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
          .blog-feature-section p,
          .blog-feature-section span,
          .blog-feature-section button {
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
          .blog-header-row select,
          .blog-header-row button {
            font-size: 1rem !important;
            padding: 10px 0 !important;
            width: 100% !important;
            margin-bottom: 6px !important;
          }
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
            color: #7c55d7 !important;
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
          .blog-header-controls select,
          .blog-header-controls button {
            font-size: 1rem !important;
            padding: 12px 0 !important;
            width: 100% !important;
            margin-bottom: 4px !important;
          }
          .newsletter-outer {
            flex-direction: column !important;
            width: 100vw !important;
            margin: 18px 0 0 0 !important;
            align-items: stretch !important;
            justifycontent: flex-start !important;
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
          .newsletter-form input,
          .newsletter-form button {
            width: 100% !important;
            font-size: 1rem !important;
            padding: 14px 0 !important;
            margin: 0 !important;
            box-sizing: border-box !important;
          }
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
          .faq-section-container .faq-card,
          .faq-section-container .faq-item {
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
