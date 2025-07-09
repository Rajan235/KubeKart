// import type { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") return res.status(405).end();
//   console.log("hi from bff cart add 1");

//   try {
//     const authHeader = req.headers.authorization || "";

//     const response = await axios.post(
//       "http://cart-service:8080/api/cart/user/add",
//       req.body,
//       {
//         headers: {
//           Authorization: authHeader,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     res.status(response.status).json(response.data);
//   } catch (err) {
//     res.status(500).json({ message: "Cart add failed" });
//     console.error("Cart add failed:", err);
//   }
// }
// /pages/api/cart/add/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("✅ BFF handler hit");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const response = await axios.post(
      "http://cart-service:8081/api/cart/user/add", // or whatever internal DNS you're using
      req.body,
      {
        headers: {
          // "Content-Type": "application/json",
          Authorization: req.headers.authorization || "", // pass along auth token if present
        },
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error(
      "❌ Error forwarding to cart service:",
      error?.response?.data || error.message
    );
    return res.status(error?.response?.status || 500).json({
      error: error?.response?.data || "Internal Server Error",
    });
  }
}
