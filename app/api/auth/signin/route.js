// app/api/auth/login/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  await dbConnect();

  try {
    const { email, password } = await request.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user with password field explicitly included
    const user = await User.findOne({ email }).select("+password");

    // User not found case
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" }, // Generic message for security
        { status: 401 }
      );
    }

    // Critical check: Account not activated (no password set)
    if (!user.password) {
      return NextResponse.json(
        {
          message:
            "Account not activated. Please complete your registration first.",
          code: "ACCOUNT_NOT_ACTIVATED",
        },
        { status: 403 }
      );
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Successful login
    const { password: _, ...userWithoutPassword } = user.toObject();
    return NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 }
    );
  }
}
