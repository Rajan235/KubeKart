import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("hi from bff handeler product");
  try {
    if (req.method !== "GET") {
      console.log("hi from bff handeler produc1111111t");
      return res.status(405).end();
    }
    const response = await axios.get(
      "http://product-service:4000/api/products"
    );
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Failed to list products" });
    console.error("Failed to list products:", err);
  }
}
