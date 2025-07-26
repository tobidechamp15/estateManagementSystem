import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request, { params }) {
  await dbConnect();
  try {
    const user = await User.findById(params.id, { password: 0 });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  await dbConnect();
  try {
    const updates = await request.json();
    const user = await User.findByIdAndUpdate(params.id, updates, {
      new: true,
      select: "-password",
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  try {
    const user = await User.findByIdAndDelete(params.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
