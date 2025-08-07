import dbConnect from "@/lib/mongodb";
import Visitor from "@/models/Visitor";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    const visitor = await Visitor.findById(id).populate(
      "resident",
      "fullName email"
    );

    if (!visitor) {
      return Response.json({ error: "Visitor not found" }, { status: 404 });
    }

    return Response.json(visitor, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to retrieve visitor" },
      { status: 500 }
    );
  }
}
