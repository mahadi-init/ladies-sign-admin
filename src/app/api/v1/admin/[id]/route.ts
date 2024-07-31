import { AdminModel } from "@/models/admin.model";
import { type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const admin = await AdminModel.findById(params.id);
    return Response.json(admin, { status: 200 });
  } catch (error) {
    return new Response("User not found", { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {}
