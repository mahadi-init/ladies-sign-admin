import { TransactionModel } from "@/models/transaction.model";
import { Response } from "@/types/response";
import { revalidatePath } from "next/cache";

export async function remove<T>(_id?: string): Promise<Response<T>> {
  try {
    await TransactionModel.findByIdAndDelete(_id);
    revalidatePath("/dashboard/transaction");

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: "Delete failed",
    };
  }
}
