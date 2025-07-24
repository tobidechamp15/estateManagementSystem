// app/api/auth/check-code/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  await dbConnect();

  try {
    // Get accessCode from both possible sources (query params and body)
    const { searchParams } = new URL(request.url);
    const accessCodeFromQuery = searchParams.get("accessCode");

    // Try to get from body if not in query
    let accessCode = accessCodeFromQuery;
    if (!accessCode) {
      try {
        const body = await request.json();
        accessCode = body.accessCode;
      } catch (e) {
        // Ignore JSON parse error if body is empty
      }
    }

    if (!accessCode) {
      return NextResponse.json(
        { message: "Access code is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ accessCode });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid access code" },
        { status: 404 }
      );
    }

    // Check if user has set password (is activated)
    if (user.password) {
      return NextResponse.json({
        exists: true,
        email: user.email,
        message: "Account exists, please login",
      });
    } else {
      return NextResponse.json({
        exists: false,
        userData: {
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          address: user.address,
        },
        message: "Please set your password to activate account",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// Add other HTTP methods if needed
export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
