import next from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const config = [...next, ...typescript, { ignores: ["out/**", ".next/**"] }];

export default config;
