type TransformOpts = {
  w?: number;
  h?: number;
  ar?: string; // e.g. "16:9"
  c?: string; // e.g. "fill", "fit", "crop"
  q?: string; // e.g. "auto:good"
  f?: string; // e.g. "auto"
};

export function cloudinaryTransform(url: string, opts: TransformOpts): string {
  if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;

  const transformParts: string[] = [];
  if (opts.f !== undefined) transformParts.push(`f_${opts.f}`);
  else transformParts.push(`f_auto`);
  if (opts.q !== undefined) transformParts.push(`q_${opts.q}`);
  else transformParts.push(`q_auto:good`);
  if (opts.w) transformParts.push(`w_${opts.w}`);
  if (opts.h) transformParts.push(`h_${opts.h}`);
  if (opts.ar) transformParts.push(`ar_${opts.ar}`);
  if (opts.c) transformParts.push(`c_${opts.c}`);

  const transform = transformParts.join(',');
  return `${parts[0]}/upload/${transform}/${parts[1]}`;
}

export function cloudinarySrcSet(url: string, widths: number[]): string {
  return widths
    .map((w) => `${cloudinaryTransform(url, { w })} ${w}w`)
    .join(', ');
}


