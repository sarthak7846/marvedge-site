"use client";

import Navbar from "../app/components/Navbar";
import Hero from "../app/components/Hero";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div>Loading Hero...</div>}>
        <Hero />
      </Suspense>
    </div>
  );
}
