export const site = {
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL as string,
  MONGO_URI: process.env.mongo_uri as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  STEADFAST_BASE_URL: process.env.STEADFAST_BASE_URL as string,
  STEADFAST_API_KEY: process.env.STEADFAST_API_KEY as string,
  STEADFAST_SECRECT_KEY: process.env.STEADFAST_SECRECT_KEY as string,
};