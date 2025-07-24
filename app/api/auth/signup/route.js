// app/api/auth/activate-account/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  await dbConnect();

  try {
    const { accessCode, password } = await request.json();

    // Validate input
    if (!accessCode || !password) {
      return NextResponse.json(
        { message: "Access code and password are required" },
        { status: 400 }
      );
    }

    // Find user by access code
    const user = await User.findOne({ accessCode });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid access code" },
        { status: 404 }
      );
    }

    // Check if user already activated
    if (user.password) {
      return NextResponse.json(
        { message: "Account already activated" },
        { status: 400 }
      );
    }

    // Hash password and activate account
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.isActive = true;
    await user.save();

    return NextResponse.json({
      message: "Account activated successfully",
      email: user.email,
    });
  } catch (error) {
    console.error("Activation error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// Add other methods if needed
export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
