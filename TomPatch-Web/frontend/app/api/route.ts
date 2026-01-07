// app/api/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;

    return NextResponse.json({
      status: "✅ Connection Successful",
      db_time: result,
    });
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json(
      {
        status: "❌ Connection Failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
