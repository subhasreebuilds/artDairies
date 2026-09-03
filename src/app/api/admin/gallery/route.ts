import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// Fetch all custom artworks
export async function GET() {
  try {
    const artworks = await prisma.customArtwork.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ artworks });
  } catch (error) {
    console.error("Error fetching custom artworks:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Create a new custom artwork
export async function POST(req: NextRequest) {
  try {
    const { title, description, imageUrl, publicId } = await req.json();

    if (!title || !imageUrl || !publicId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const artwork = await prisma.customArtwork.create({
      data: {
        title,
        description,
        imageUrl,
        publicId,
      },
    });

    return NextResponse.json(artwork);
  } catch (error) {
    console.error("Error saving custom artwork:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Delete a custom artwork (Will just delete from DB for now, Cloudinary deletion requires API Secret)
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.customArtwork.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting custom artwork:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
