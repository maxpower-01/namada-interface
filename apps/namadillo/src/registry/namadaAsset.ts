import { Asset } from "@chain-registry/types";
import namadaShieldedSvg from "./assets/namada-shielded.svg";

export const namadaAsset: Asset = {
  name: "Namada",
  base: "unam",
  display: "nam",
  symbol: "NAM",
  denom_units: [
    { denom: "unam", exponent: 0 },
    { denom: "nam", exponent: 6 },
  ],
  logo_URIs: { svg: namadaShieldedSvg },
};