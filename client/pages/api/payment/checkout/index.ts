import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const authHeader = req.headers.authorization || "";

    const response = await axios.post(
      "http://order-service:4000/api/orders/create",
      req.body,
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Checkout error:", error?.response?.data || error.message);
    const status = error?.response?.status || 500;
    const message = error?.response?.data?.message || "Checkout failed";
    res.status(status).json({ message });
  }
}
