import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const authHeader = req.headers.authorization || "";
    const response = await axios.get(
      "http://product-service:4000/api/products/admin/all",
      {
        headers: { Authorization: authHeader },
      }
    );
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch all products" });
  }
}
