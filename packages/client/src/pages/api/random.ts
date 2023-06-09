import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  console.log(req.url);
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  return new Response(email);
}
