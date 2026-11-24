import { cacheLife } from "next/cache";

import { MAX_FACES, pickShowcaseModel, type SketchfabSearchModel, type ShowcaseModelMeta } from "./pick-model";

const API_URL = "https://api.sketchfab.com/v3";
const TIMEOUT_MS = 6000;

export type ShowcaseModel = ShowcaseModelMeta & {
  /** Signed S3 link, valid for about five minutes. */
  glbUrl: string;
};

// Server-only: the key has no NEXT_PUBLIC_ prefix, so it is never inlined into client code.
async function sketchfabGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: `Token ${process.env.SKETCHFAB_API_KEY}` },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`Sketchfab ${path.split("?")[0]} responded ${response.status}`);
  }
  return (await response.json()) as T;
}

async function findShowcaseModel(): Promise<ShowcaseModelMeta | null> {
  "use cache";
  // Search results barely move; caching them keeps us far from the rate limit.
  cacheLife("hours");

  const params = new URLSearchParams({
    type: "models",
    q: "laptop",
    downloadable: "true",
    // CC BY only: commercial use allowed, attribution shown under the canvas.
    license: "by",
    max_face_count: String(MAX_FACES),
    sort_by: "-likeCount",
    count: "24",
  });
  const { results } = await sketchfabGet<{ results: SketchfabSearchModel[] }>(`/search?${params}`);
  return pickShowcaseModel(results);
}

async function getGlbUrl(uid: string): Promise<string> {
  "use cache";
  // Sketchfab signs download links for 300 s, so a cached link must expire well before that.
  cacheLife({ stale: 30, revalidate: 60, expire: 180 });

  const { glb } = await sketchfabGet<{ glb?: { url: string } }>(`/models/${uid}/download`);
  if (!glb) throw new Error(`Sketchfab model ${uid} has no glb download`);
  return glb.url;
}

/**
 * Laptop model for the homepage hero, or null when Sketchfab is not configured,
 * down, rate limited or has nothing suitable. Null means "render the procedural laptop".
 */
export async function getShowcaseModel(): Promise<ShowcaseModel | null> {
  if (!process.env.SKETCHFAB_API_KEY) return null;

  try {
    const meta = await findShowcaseModel();
    if (!meta) return null;
    return { ...meta, glbUrl: await getGlbUrl(meta.uid) };
  } catch (error) {
    console.warn("Sketchfab unavailable, the hero falls back to the procedural laptop.", error);
    return null;
  }
}
