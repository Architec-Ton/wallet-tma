import { sha256_sync } from "@ton/crypto";
import CryptoES from "crypto-es";
import { TON_PINCODE_SALT } from "../constants";

const encodeMnemonic = (mnemonic: string, salt: string) => {
  return CryptoES.TripleDES.encrypt(
    mnemonic,
    sha256_sync(salt).toString()
  ).toString();
};

const decodeMnemonic = (hash: string, salt: string) => {
  return CryptoES.TripleDES.decrypt(
    hash,
    sha256_sync(salt).toString()
  ).toString(CryptoES.enc.Utf8);
};

export const encodePrivateKeyByPin = (mnemonics: string[], pincode: string) => {
  return encodeMnemonic(mnemonics.join(" "), `${pincode}-${TON_PINCODE_SALT}`);
};

export const decodePrivateKeyByPin = (hash: string, pincode: string) => {
  return decodeMnemonic(hash, `${pincode}-${TON_PINCODE_SALT}`).split(" ");
};
