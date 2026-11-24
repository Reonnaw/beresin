/** The fields of a Sketchfab v3 search result this app reads. */
export type SketchfabSearchModel = {
  uid: string;
  name: string;
  faceCount: number;
  viewerUrl: string;
  user: { displayName: string; profileUrl: string };
  license?: { label: string } | null;
  archives?: { glb?: { size: number } | null } | null;
};

export type ShowcaseModelMeta = {
  uid: string;
  name: string;
  author: string;
  authorUrl: string;
  viewerUrl: string;
  licenseLabel: string;
};

/** Keeps the hero download light enough for a phone on mobile data. */
export const MAX_GLB_BYTES = 5_000_000;
export const MAX_FACES = 30_000;

/**
 * First result that is really a laptop and small enough to load in the hero.
 * Search ranking returns props and whole desks too, so the name has to say laptop.
 */
export function pickShowcaseModel(results: readonly SketchfabSearchModel[]): ShowcaseModelMeta | null {
  const model = results.find(
    (m) =>
      /laptop|notebook/i.test(m.name) &&
      m.faceCount > 0 &&
      m.faceCount <= MAX_FACES &&
      m.archives?.glb != null &&
      m.archives.glb.size <= MAX_GLB_BYTES,
  );
  if (!model) return null;

  return {
    uid: model.uid,
    name: model.name,
    author: model.user.displayName,
    authorUrl: model.user.profileUrl,
    viewerUrl: model.viewerUrl,
    licenseLabel: model.license?.label ?? "CC Attribution",
  };
}
