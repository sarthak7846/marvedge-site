import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    await prisma.blog.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const data = await req.json();

  console.log("Updating blog with ID:", id);
  console.log("Received data:", data);

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
  } catch (err) {
    console.error("Error updating blog:", err);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
