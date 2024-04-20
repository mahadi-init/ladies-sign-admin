import { OrderSummaryType } from "@/types/order.t";
import { LocalResponse } from "@/types/response.t";

export async function sendOrder(
  order: OrderSummaryType
): Promise<LocalResponse> {
  try {
    // check courir response
    // const courirSentResult = await sendOrderToCourir(order);

    // if (courirSentResult) {
    //   // const res = await patchData(
    //   //   {
    //   //     status: "processing",
    //   //     trackingCode: courirSentResult.consignment.tracking_code,
    //   //   },
    //   //   `${BACKEND_URL}/api/order/update-status/${order._id}`,
    //   //   "orders",
    //   //   "Order added Successfully"
    //   // );
    //   // if (res.status === 200) {
    //   //   return {
    //   //     status: 200,
    //   //     message: res.message,
    //   //   };
    //   // }
    // }

    throw new Error();
  } catch (err) {
    return {
      status: 400,
      message: "Something went wrong",
    };
  }
}

// async function sendOrderToCourir(order: OrderSummaryType) {
//   const courirData = {
//     invoice: order.invoice,
//     recipient_name: order.name,
//     recipient_phone: order.contact,
//     recipient_address: `${order.address} ${order.city}`,
//     cod_amount: Number(order.shippingCost),
//     orderNote: order.note,
//   };

//   const res = await fetch(`${STEADFAST_BASE_URL}/api/v1/create_order`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Api-Key": STEADFAST_API_KEY,
//       "Secret-Key": STEADFAST_SECRECT_KEY,
//     },
//     body: JSON.stringify(courirData),
//     next: {
//       revalidate: 0,
//     },
//   });

//   const orderData = await res.json();
//   return orderData;
// }
