import dbConnect from "@/lib/mongodb";
import Visitor from "@/models/Visitor";
import { generateVisitorQRCode } from "@/utils/generateVisitorQRCode";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, phone, date, companions, resident } = body;

    if (!name || !phone || !date) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const visitor = new Visitor({
      name,
      phone,
      date,
      companions,
      resident, // or req.user.id
      status: "pending",
    });

    visitor.qrCode = await generateVisitorQRCode(visitor._id);
    await visitor.save();

    return Response.json(visitor, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// Handle GET: Get all visitors (optional filter by resident)
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const residentId = searchParams.get("resident");

    const query = residentId ? { resident: residentId } : {};

    const visitors = await Visitor.find(query)
      .sort({ date: -1 })
      .populate("resident", "fullName email");

    return Response.json(visitors, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch visitors" },
      { status: 500 }
    );
  }
}
