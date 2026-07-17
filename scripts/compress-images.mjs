import { glob } from "glob";
import sharp from "sharp";
import { stat } from "node:fs/promises";

const MIN_SIZE = 150 * 1024; // skip small icons/logos
const MAX_WIDTH = 2560;
const QUALITY = 78;

const files = await glob("public/**/*.png", { windowsPathsNoEscape: true });

let before = 0;
let after = 0;
const converted = [];

for (const file of files) {
  const { size } = await stat(file);
  if (size < MIN_SIZE) {
    console.log(`skip (small)  ${file}`);
    continue;
  }

  const out = file.replace(/\.png$/i, ".webp");
  await sharp(file)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);

  const { size: outSize } = await stat(out);
  before += size;
  after += outSize;
  converted.push(file);
  console.log(
    `${(size / 1024 / 1024).toFixed(2).padStart(6)} MB -> ${(outSize / 1024 / 1024)
      .toFixed(2)
      .padStart(6)} MB  ${file}`,
  );
}

console.log(
  `\nTotal: ${(before / 1024 / 1024).toFixed(1)} MB -> ${(after / 1024 / 1024).toFixed(1)} MB across ${converted.length} files`,
);
