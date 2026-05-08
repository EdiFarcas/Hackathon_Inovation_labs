import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newBuild = await prisma.mouseBuild.create({
      data: {
        baseColor: body.baseColor,
        switchType: body.switchType,
        leftArtwork: body.modules.left,
        rightArtwork: body.modules.right,
        backArtwork: body.modules.back,
        email: "demo@hackathon.ro", // Putem adăuga un câmp de email mai târziu
      },
    });

    return NextResponse.json({ success: true, id: newBuild.id });
  } catch (error) {
    console.error("Eroare salvare:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}