"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });
exports.USDT_MINT_ADDRESS = exports.USDC_MINT_ADDRESS = exports.USDC_MINT_ADDRESS = exports.USER_KEYPAIR = exports.USER_PRIVATE_KEY = exports.WALLET_PRIVATE_KEY = exports.SOLANA_RPC_ENDPOINT = exports.ENV = void 0;
const bs58_1 = __importDefault(require("bs58"));
const web3_js_1 = require("@solana/web3.js");
require("dotenv").config();
// Endpoints, connection
exports.ENV = "mainnet-beta";
const fs = require('fs')
var result = JSON.parse(fs.readFileSync("read.json"))
    exports.WALLET_PRIVATE_KEY = result.WALLET_PRIVATE_KEY;
    exports.USDC_MINT_ADDRESS = result.MINT_ADDRESS;
    exports.OUT_MINT_ADDRESS = result.out_MINT_ADDRESS;
    exports.slippage = result.slippage;
    exports.srpc = result.srpc;
    exports.srpc1 = result.srpc1;
    exports.min = result.min;
    exports.max = result.max; 
    exports.cs = result.cs;
    exports.fee = result.fee;
    exports.coin = result.coin;
    exports.marketUrl = result.marketUrl
    exports.corelx=result.corelx
    exports.restrictIntermediateTokens= result.restrictIntermediateTokens;  
    const argument = process.argv ; 
  
// if(argument[2]!= undefined ) {
//     console.log(argument[2])
// };

exports.SOLANA_RPC_ENDPOINT = exports.ENV === "devnet"
    ? "https://api.devnet.solana.com"
    : "https://api.jup.ag/api/rpc/get-gengo-token";

    exports.USER_PRIVATE_KEY = bs58_1.default.decode(exports.WALLET_PRIVATE_KEY);
    exports.USER_KEYPAIR = web3_js_1.Keypair.fromSecretKey(exports.USER_PRIVATE_KEY);
/* // Sometimes, your RPC endpoint may reject you if you spam too many RPC calls. Sometimes, your PRC server
// may have invalid cache and cause problems.

// Wallets
exports.WALLET_PRIVATE_KEY = "4hhqHTLvndo9fQ2bGKNL8dUEtn7kvMuKdR17hQ73KpyCfV3QogN5FVtWRF7iM3BjB5rPK1uDwQfGgwTf4uDBc4dK";
exports.USER_PRIVATE_KEY = bs58_1.default.decode(exports.WALLET_PRIVATE_KEY);
exports.USER_KEYPAIR = web3_js_1.Keypair.fromSecretKey(exports.USER_PRIVATE_KEY);
// Token Mints
exports.USDC_MINT_ADDRESS = exports.ENV === "devnet"
    ? "So11111111111111111111111111111111111111112" // SOL
    : "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"; // USDC
exports.USDC_MINT_ADDRESS = exports.ENV === "devnet"
    ? "So11111111111111111111111111111111111111112" // SOL
    : "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"; // USDC
exports.USDT_MINT_ADDRESS = exports.ENV === "devnet"
    ? "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt" // SRM
    : "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"; // USDT
exports.min = 100;
exports.max = 100;
exports.address = "https://jupiter.genesysgo.net/"
exports.slippage = 0.3
//# sourceMappingURL=index.js.map "https://solana-mainnet.phantom.tech" */