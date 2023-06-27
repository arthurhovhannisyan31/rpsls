import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  res.end(`Post: ${slug}`);
  // new Response("Hello world!");
}
export const config = {
  runtime: "edge",
};
