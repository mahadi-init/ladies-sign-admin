// using as enum, because doesn't allow dynamic value
export const AccessToken = {
  SUPER_ADMIN: process.env.NEXT_PUBLIC_SUPER_ADMIN_TOKEN as string,
  ADMIN: process.env.NEXT_PUBLIC_ADMIN_TOKEN as string,
  EDITOR: process.env.NEXT_PUBLIC_EDITOR_TOKEN as string,
  SELLER: process.env.NEXT_PUBLIC_SELLER_TOKEN as string,
};
