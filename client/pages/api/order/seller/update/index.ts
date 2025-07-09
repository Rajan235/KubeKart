import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") return res.status(405).end();

  try {
    const authHeader = req.headers.authorization || "";
    const { id, status } = req.body;

    const response = await axios.patch(
      `http://order-service:8080/api/orders/seller/${id}/status`,
      { status },
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    res.status(response.status).json(response.data);
  } catch {
    res.status(500).json({ message: "Failed to update order status" });
  }
}
