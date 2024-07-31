import { AdminModel } from "@/models/admin.model";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const page = request.nextUrl.searchParams.get("page");
    const limit = request.nextUrl.searchParams.get("limit");
    const search = request.nextUrl.searchParams.get("search");

    // filter by params
    const filterBy: "default" | "search" = request.nextUrl.searchParams.get(
      "filterBy",
    ) as "default" | "search";

    // check the types are number
    if (typeof page !== "string" || typeof limit !== "string") {
      throw new Error("page and limit must be numbers");
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // empty array initialization
    let result: any = [];

    // filter by default
    if (filterBy === "default") {
      result = await AdminModel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));
    }

    // filter by search
    if (filterBy === "search") {
      result = await AdminModel.find({
        $or: [
          { invoice: { $regex: search, $options: "i" } },
          { name: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ],
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));
    }

    return Response.json(
      {
        success: true,
        data: result,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
}
