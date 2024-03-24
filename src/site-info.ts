// Site Info
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

// Cloudinary
export const CLOUDINARY_UPLOAD_PRESET = "ladies-sign-preset";

// Steadfast
// api format /api/v1/{endpoint}
export const STEADFAST_BASE_URL = process.env
  .NEXT_PUBLIC_STEADFAST_BASE_URL as string;
export const STEADFAST_API_KEY = process.env
  .NEXT_PUBLIC_STEADFAST_API_KEY as string;
export const STEADFAST_SECRECT_KEY = process.env
  .NEXT_PUBLIC_STEADFAST_SECRECT_KEY as string;
