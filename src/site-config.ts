export const site = {
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL as string,

  // for JWT
  JWT_SECRET: process.env.NEXT_PUBLIC_JWT_SECRET as string,

  // for cloudinary
  CLOUDINARY_UPLOAD_PRESET: process.env
    .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string,

  // for Steadfast
  STEADFAST_BASE_URL: process.env.NEXT_PUBLIC_STEADFAST_BASE_URL as string,
  STEADFAST_API_KEY: process.env.NEXT_PUBLIC_STEADFAST_API_KEY as string,
  STEADFAST_SECRECT_KEY: process.env
    .NEXT_PUBLIC_STEADFAST_SECRECT_KEY as string,
};