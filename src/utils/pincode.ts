import { sha256_sync as sha256Sync } from "@ton/crypto";
import CryptoES from "crypto-es";

import { TON_PINCODE_SALT } from "../constants";

const encodeMnemonic = (mnemonic: string, salt: string) =>
  CryptoES.TripleDES.encrypt(mnemonic, sha256Sync(salt).toString()).toString();

const decodeMnemonic = (hash: string, salt: string) =>
  CryptoES.TripleDES.decrypt(hash, sha256Sync(salt).toString()).toString(CryptoES.enc.Utf8);

export const encodePrivateKeyByPin = (mnemonics: string[], pincode: string) =>
  encodeMnemonic(mnemonics.join(" "), `${pincode}-${TON_PINCODE_SALT}`);

export const decodePrivateKeyByPin = (hash: string, pincode: string) =>
  decodeMnemonic(hash, `${pincode}-${TON_PINCODE_SALT}`).split(" ");
