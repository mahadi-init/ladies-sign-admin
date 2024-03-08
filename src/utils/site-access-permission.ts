import { AccessToken } from "@/types/token.t";

export function hasSiteAccessPermission(accessToken?: string) {
  if (!accessToken) {
    return false;
  }

  let access = false;

  switch (accessToken) {
    case AccessToken.SUPER_ADMIN:
      access = true;
      break;

    case AccessToken.ADMIN:
      access = true;
      break;

    case AccessToken.EDITOR:
      access = true;
      break;

    default:
      access = false;
  }

  return access;
}
