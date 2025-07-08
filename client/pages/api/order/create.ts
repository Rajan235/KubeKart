import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const authHeader = req.headers.authorization || "";
    const response = await axios.post(
      "http://order-service:8080/api/orders/user",
      req.body,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );
    res.status(response.status).json(response.data);
  } catch {
    res.status(500).json({ message: "Order creation failed" });
  }
}
