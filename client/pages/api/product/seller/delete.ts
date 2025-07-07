import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") return res.status(405).end();

  const { id } = req.query;
  const authHeader = req.headers.authorization || "";

  try {
    const response = await axios.delete(
      `http://product-service:4000/api/products/seller/delete/${id}`,
      {
        headers: { Authorization: authHeader },
      }
    );
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
}
