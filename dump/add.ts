import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  console.log("hi from bff cart add 1");

  try {
    const authHeader = req.headers.authorization || "";

    const response = await axios.post(
      "http://cart-service:8080/api/cart/user/add",
      req.body,
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Cart add failed" });
    console.error("Cart add failed:", err);
  }
}
