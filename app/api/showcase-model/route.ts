import { connection } from "next/server";

import { getShowcaseModel } from "@/lib/sketchfab/sketchfab-service";

/** The hero canvas asks for its Sketchfab model here, so the API key stays on the server. */
export async function GET() {
  // The signed download link expires, so this must never be prerendered at build time.
  await connection();
  return Response.json({ model: await getShowcaseModel() });
}
