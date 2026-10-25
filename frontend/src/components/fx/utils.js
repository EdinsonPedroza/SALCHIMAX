// Shared easing — same curve the rest of the site uses.
export const EASE = [0.16, 1, 0.3, 1];

// Framer calls transformTemplate with "" when every transform value is at its
// default. Returning "none" then (instead of a bare perspective()) means an
// element at rest keeps no 3D transform, so it doesn't stay a composited layer.
export const perspectiveTemplate =
  (px) =>
  (_, generated) =>
    generated ? `perspective(${px}px) ${generated}` : "none";
