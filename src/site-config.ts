export const site = {
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL as string,

  // for JWT
  JWT_SECRET: process.env.NEXT_PUBLIC_JWT_SECRET as string,

  // bearer token
  bearer_token: process.env.NEXT_PUBLIC_bearer_token as string,
};
