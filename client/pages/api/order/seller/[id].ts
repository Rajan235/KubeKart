import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const authHeader = req.headers.authorization || "";

  try {
    const response = await axios.get(
      `http://order-service:8080/api/seller/orders/${id}`,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    res.status(response.status).json(response.data);
  } catch {
    res.status(500).json({ message: "Fetching seller order failed" });
  }
}
