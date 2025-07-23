import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  // Extract id from the URL
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
  }

  try {
    await prisma.blog.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  // Extract id from the URL
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
  }

  const data = await req.json();

  try {
    const updated = await prisma.blog.update({
      where: { id },
      data: {
        title: data.title,
        summary: data.summary,
        category: Array.isArray(data.category)
          ? data.category
          : data.category.split(",").map((s: string) => s.trim()),
        img: data.img,
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  // Extract id from the URL
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
  }

  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch  {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

