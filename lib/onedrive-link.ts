import { encodeBase64Url } from "@std/encoding";

export const toDirectDownloadUrl = (url: string) =>
  `https://api.onedrive.com/v1.0/shares/u!${encodeBase64Url(url)}/root/content`;
