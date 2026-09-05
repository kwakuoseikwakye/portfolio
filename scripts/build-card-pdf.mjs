/**
 * Wraps the two captured card faces into a print-ready 2-page PDF.
 *
 *   node scripts/build-card-pdf.mjs
 *
 * The faces are captured at trim size (1004x650 = 85x55mm @300dpi). Printers
 * need 3mm of bleed, so each face is edge-replicated outward by 35px before
 * being placed on a 91x61mm page with a TrimBox marking where it gets cut.
 * Edge replication is safe here because every card edge is either flat colour
 * or the portrait's own out-of-focus backdrop.
 */
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const MM = 72 / 25.4; // PDF points per millimetre
const TRIM_W = 85 * MM;
const TRIM_H = 55 * MM;
const BLEED = 3 * MM;
const PAGE_W = TRIM_W + BLEED * 2;
const PAGE_H = TRIM_H + BLEED * 2;

const BLEED_PX = 35; // 3mm at 300dpi

async function faceJpeg(path) {
  const img = sharp(path).extend({
    top: BLEED_PX,
    bottom: BLEED_PX,
    left: BLEED_PX,
    right: BLEED_PX,
    extendWith: "copy",
  });
  const { width, height } = await img.metadata();
  const data = await img.jpeg({ quality: 96, chromaSubsampling: "4:4:4" }).toBuffer();
  return { data, width, height };
}

const faces = [
  await faceJpeg("public/card/card-front.png"),
  await faceJpeg("public/card/card-back.png"),
];

/* Minimal PDF writer: objects in order, byte offsets tracked for the xref. */
const chunks = [];
const offsets = [0];
let length = 0;

const push = (buf) => {
  const b = Buffer.isBuffer(buf) ? buf : Buffer.from(buf, "latin1");
  chunks.push(b);
  length += b.length;
};
const obj = (n, body, stream) => {
  offsets[n] = length;
  push(`${n} 0 obj\n${body}\n`);
  if (stream) {
    push("stream\n");
    push(stream);
    push("\nendstream\n");
  }
  push("endobj\n");
};

push("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");

const pageIds = faces.map((_, i) => 3 + i * 3);

obj(1, "<< /Type /Catalog /Pages 2 0 R >>");
obj(
  2,
  `<< /Type /Pages /Count ${faces.length} /Kids [${pageIds
    .map((id) => `${id} 0 R`)
    .join(" ")}] >>`,
);

faces.forEach((face, i) => {
  const pageId = pageIds[i];
  const imgId = pageId + 1;
  const contentId = pageId + 2;
  const name = i === 0 ? "Front" : "Back";

  // Full-page image placement; the TrimBox tells the printer where to cut.
  const content = `q\n${PAGE_W.toFixed(4)} 0 0 ${PAGE_H.toFixed(4)} 0 0 cm\n/Im0 Do\nQ`;

  obj(
    pageId,
    `<< /Type /Page /Parent 2 0 R ` +
      `/MediaBox [0 0 ${PAGE_W.toFixed(4)} ${PAGE_H.toFixed(4)}] ` +
      `/BleedBox [0 0 ${PAGE_W.toFixed(4)} ${PAGE_H.toFixed(4)}] ` +
      `/TrimBox [${BLEED.toFixed(4)} ${BLEED.toFixed(4)} ${(BLEED + TRIM_W).toFixed(4)} ${(BLEED + TRIM_H).toFixed(4)}] ` +
      `/Resources << /XObject << /Im0 ${imgId} 0 R >> >> ` +
      `/Contents ${contentId} 0 R >>`,
  );
  obj(
    imgId,
    `<< /Type /XObject /Subtype /Image /Name /Im0 ` +
      `/Width ${face.width} /Height ${face.height} ` +
      `/ColorSpace /DeviceRGB /BitsPerComponent 8 ` +
      `/Filter /DCTDecode /Length ${face.data.length} >>`,
    face.data,
  );
  obj(contentId, `<< /Length ${content.length} >>`, Buffer.from(content, "latin1"));
  void name;
});

const xrefAt = length;
const count = offsets.length;
let xref = `xref\n0 ${count}\n0000000000 65535 f \n`;
for (let n = 1; n < count; n++) {
  xref += `${String(offsets[n]).padStart(10, "0")} 00000 n \n`;
}
push(xref);
push(
  `trailer\n<< /Size ${count} /Root 1 0 R >>\nstartxref\n${xrefAt}\n%%EOF\n`,
);

const out = "public/card/kwaku-osei-kwakye-card.pdf";
await writeFile(out, Buffer.concat(chunks));

const bytes = (await readFile(out)).length;
console.log(
  `${out} — ${faces.length} pages, ${(PAGE_W / MM).toFixed(0)}x${(PAGE_H / MM).toFixed(0)}mm ` +
    `with 3mm bleed (trim ${(TRIM_W / MM).toFixed(0)}x${(TRIM_H / MM).toFixed(0)}mm), ` +
    `${Math.round(bytes / 1024)}KB`,
);
