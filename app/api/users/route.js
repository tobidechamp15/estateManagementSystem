import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { convertImageToBase64 } from "@/utils/imageConverter";

export async function POST(request) {
  await dbConnect();

  try {
    let requestData;
    const contentType = request.headers.get("content-type");

    // Handle FormData (file uploads)
    if (contentType?.includes("multipart/form-data")) {
      const formData = await request.formData();
      requestData = Object.fromEntries(formData.entries());
    }
    // Handle JSON
    else if (contentType?.includes("application/json")) {
      requestData = await request.json();
    }
    // Unsupported content type
    else {
      return NextResponse.json(
        { message: "Unsupported content type" },
        { status: 415 }
      );
    }

    const { accessCode, fullName, email, phone, address, image } = requestData;

    // Validate required fields
    if (!accessCode || !fullName || !email || !phone || !address) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check for existing user
    const existingUser = await User.findOne({
      $or: [{ accessCode }, { email }],
    });

    if (existingUser) {
      const conflictField =
        existingUser.accessCode === accessCode ? "access code" : "email";
      return NextResponse.json(
        { message: `User with this ${conflictField} already exists` },
        { status: 409 }
      );
    }

    // Handle image conversion
    const imageBase64 = await convertImageToBase64(image);

    // Create new user
    const newUser = await User.create({
      accessCode,
      fullName,
      email,
      phone,
      address,
      isActive: false,
      image: imageBase64,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: newUser._id,
          accessCode: newUser.accessCode,
          fullName: newUser.fullName,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("User creation error:", error);
    return NextResponse.json(
      { message: "Server error during user creation" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();
  try {
    const users = await User.find({}, { password: 0 }); // Exclude passwords
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
