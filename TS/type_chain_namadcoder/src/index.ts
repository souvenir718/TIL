// import { init, exit } from "./myPackage";

// init({
//   debug: true,
//   url: "test",
// });

// exit(3);

import crypto from "crypto";

interface BlockShpae {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShpae {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }

  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}
