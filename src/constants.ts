export const BE_URL =
  import.meta.env.VITE_BE_URL ||
  'https://dev.architecton.site/api/v2/wallet'; /*"http://localhost:8000/api/v2/wallet"*/

export const FE_URL = import.meta.env.VITE_FE_URL || '/wallet';

export const MANIFEST_URL =
  import.meta.env.VITE_MANIFEST_URL ||
  'https://architecton.site/tonconnect-manifest.json';

export const TA_URL =
  import.meta.env.VITE_TA_URL || 'https://ton.architecton.site/api/v2/';

export const TONAPI_KEY = import.meta.env.VITE_TONAPI_KEY || null;

export const BANK_JETTON_MASTER_ADDRESS =
  import.meta.env.VITE_BANK_JETTON_MASTER_ADDRESS ||
  'kQDDm3AwW9NAP2sv3ZjKPje9hY5zEiM68GxoUVtMX616n6Cm';

export const BANK_CROWDSALE_ADDRESS =
  import.meta.env.VITE_BANK_CROWDSALE_ADDRESS ||
  'kQBmyiov17J71ontt2u1F_dwKTfcUoghCMVyfIsDRM9NNvhp';

export const BANK_GAS_AMOUNT = import.meta.env.VITE_BANK_GAS_AMOUNT || '0.07';
