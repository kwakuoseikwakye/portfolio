import sharp from "sharp";

/**
 * The avatar crop shared by the contact file and the Wallet pass.
 *
 * Defined once because these surfaces sit side by side in the same phone —
 * a contact photo and a pass thumbnail that framed the face differently would
 * read as two people.
 *
 * This is deliberately NOT the crop used on the printed card. The card wants
 * the full moody portrait; an avatar is shown as a small circle against a
 * light contact list, so it is framed tighter and lifted off the shadows.
 */
export const AVATAR_CROP = { left: 175, top: 200, width: 490, height: 490 };

const SOURCE = "public/card/portrait.jpg";

/** Square avatar at `size`, tuned to stay legible on light and dark UI. */
export function avatar(size) {
  return sharp(SOURCE)
    .extract(AVATAR_CROP)
    .resize(size, size)
    .modulate({ brightness: 1.18 })
    .gamma(1.12)
    .linear(1.06, -4);
}
