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

class BlockChain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }

  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const newBlock = new Block(this.getPrevHash(), this.blocks.length, data);
    this.blocks.push(newBlock);
  }
  public getBlocks() {
    return [...this.blocks];
  }
}

const blockChain = new BlockChain();

blockChain.addBlock("First One");
blockChain.addBlock("Seconde One");
blockChain.addBlock("Third One");

console.log(blockChain.getBlocks());
