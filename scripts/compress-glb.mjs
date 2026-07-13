// Compress public/models/cartoon-boy.glb in place (writes a .orig backup once).
// Weight is Draco'd skinned geometry: drop tangents, weld + simplify, re-encode
// Draco with tighter quantization; textures → WebP capped at 1024px.
// Run: node scripts/compress-glb.mjs
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS, KHRDracoMeshCompression } from "@gltf-transform/extensions";
import {
  dedup,
  prune,
  resample,
  simplify,
  textureCompress,
  weld,
} from "@gltf-transform/functions";
import { MeshoptSimplifier } from "meshoptimizer";
import draco3d from "draco3d";
import sharp from "sharp";
import { copyFileSync, existsSync, statSync } from "node:fs";

const SRC = "public/models/cartoon-boy.glb";
const BACKUP = "public/models/cartoon-boy.orig.glb";
const SIMPLIFY_RATIO = 0.5; // keep ~half the triangles; avatar is viewed from 2m+

const mb = (p) => (statSync(p).size / 1024 / 1024).toFixed(2) + " MB";

if (!existsSync(BACKUP)) copyFileSync(SRC, BACKUP);
console.log("input:", mb(BACKUP));

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
  "draco3d.decoder": await draco3d.createDecoderModule(),
  "draco3d.encoder": await draco3d.createEncoderModule(),
});

const doc = await io.read(BACKUP);

// tangents: three.js derives them per-fragment for normal maps — not worth the bytes
const dropTangents = (d) => {
  for (const mesh of d.getRoot().listMeshes())
    for (const prim of mesh.listPrimitives()) prim.setAttribute("TANGENT", null);
};

// Only these clips are referenced in the app (see Avatar poses props). Each
// unused clip costs ~1500 JSON accessors/samplers — the real file weight.
const KEEP_CLIPS = ["tpose", "pose 29", "pose 7"];
const norm = (s) => s.replace(/\s+/g, " ").trim().toLowerCase();
const dropUnusedClips = (d) => {
  for (const anim of d.getRoot().listAnimations()) {
    const name = norm(anim.getName() || "");
    if (!KEEP_CLIPS.some((k) => name === k || name.endsWith(`|${k}`) || name.includes(k))) {
      for (const ch of anim.listChannels()) ch.dispose();
      for (const s of anim.listSamplers()) s.dispose();
      anim.dispose();
      console.log(" dropped clip:", name);
    }
  }
};

await doc.transform(
  dedup(),
  (d) => dropUnusedClips(d),
  resample(),
  dedup(), // again: resample leaves thousands of identical tiny time-input accessors
  (d) => dropTangents(d),
  weld(),
  simplify({ simplifier: MeshoptSimplifier, ratio: SIMPLIFY_RATIO, error: 0.001 }),
  prune(),
  textureCompress({ encoder: sharp, targetFormat: "webp", resize: [1024, 1024] })
);

doc
  .createExtension(KHRDracoMeshCompression)
  .setRequired(true)
  .setEncoderOptions({
    quantizationBits: { POSITION: 12, NORMAL: 8, TEX_COORD: 10, COLOR: 8, GENERIC: 8 },
  });

await io.write(SRC, doc);
console.log("output:", mb(SRC));
