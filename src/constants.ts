export const BE_URL =
  import.meta.env.VITE_BE_URL || "https://dev.architecton.site/api/v2/wallet"/*"http://localhost:8000/api/v2/wallet"*/;

export const FE_URL = import.meta.env.VITE_FE_URL || "/wallet";

export const MANIFEST_URL =
  import.meta.env.VITE_MANIFEST_URL ||
  "https://architecton.site/tonconnect-manifest.json";

export const TA_URL = 
  import.meta.env.VITE_TA_URL ||
  "https://ton.architecton.site/api/v2/"
