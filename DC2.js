"use strict";
const loo = 3
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./constants/index");
const web3_js_1 = require("@solana/web3.js");
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
const jsbi_1 = __importDefault(require("jsbi"));
const decimal_js_1 = __importDefault(require("decimal.js"));
const core_1 = require("@jup-ag/core");
const constants_1 = require("./constants");
const superstruct = require('superstruct');
const { Wallet } =require ("@project-serum/anchor");
const wallet = new Wallet(
    constants_1.USER_KEYPAIR
  );
const getPossiblePairsTokenInfo = ({ tokens, routeMap, inputToken, }) => {
    try {
        if (!inputToken) {
            return {};
        };
        const possiblePairs = inputToken
            ? routeMap.get(inputToken.address) || []
            : []; // return an array of token mints that can be swapped with SOL
        const possiblePairsTokenInfo = {};
        possiblePairs.forEach((address) => {
            possiblePairsTokenInfo[address] = tokens.find((t) => {
                return t.address == address;
            });
        });
        // Perform your conditionals here to use other outputToken
        // const alternativeOutputToken = possiblePairsTokenInfo[USDT_MINT_ADDRESS]
        return possiblePairsTokenInfo;
    }
    catch (error) {
        console.log(error);
    }
};
var je = 0, cs = 0, slot = '',j=0

const inputMint1 = new web3_js_1.PublicKey(constants_1.USDC_MINT_ADDRESS); //USDC
//const inputMint1 = new web3_js_1.PublicKey( "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"); //SAY
const outputMint1 = inputMint1//new web3_js_1.PublicKey(constants_1.OUT_MINT_ADDRESS); 

const getRoutes = async ({ jupiter, inputToken, outputToken, inputAmount, slippage }) => {
    try {
        if (!inputToken || !outputToken) {
            return null;
        }
        const inputAmountInSmallestUnits = inputToken
        ? Math.round(inputAmount * Math.pow(10, inputToken.decimals))
        : 0;
        const blockhashWithExpiryBlockHeight =  (await jupiter.connection.getLatestBlockhash('processed'))
        const amount = jsbi_1.default.BigInt(inputAmountInSmallestUnits)
        const routesUsdcToUsdc = inputToken
            ? await jupiter.computeRoutes({   //计算路由
                inputMint: inputMint1,
                outputMint: outputMint1,
                amount: amount,
                slippageBps:slippage,
                forceFetch:false,

            })
            : null;


            if (routesUsdcToUsdc && routesUsdcToUsdc.routesInfos && routesUsdcToUsdc.routesInfos[0] && routesUsdcToUsdc.routesInfos[0].length === 0) {
                return null;
            }
        // console.log(routesUsdcToUsdc.routesInfos[0].marketInfos[0].outputMint.toBase58())
        const amoutold =routesUsdcToUsdc.routesInfos[0].otherAmountThreshold
       
       //  console.log(routes.marketInfos[0].outputMint.toBase58())//,routes.marketInfos[1].outputMint.toBase58())
        
        const routes = routesUsdcToUsdc.routesInfos[0];
        //console.log(routes);
        
        const Amount = routes.outAmount[0]
                var outAmountUsdcToUsdc = Number(new decimal_js_1.default(amoutold.toString())
                .div(Math.pow(10, outputToken.decimals)));
                    if (outAmountUsdcToUsdc >= inputAmount) {
                       async function ns() {  
                        executeSwap({ jupiter, routes, j,slippage,blockhashWithExpiryBlockHeight });
                       }
                       await Promise.all([ns()   , Ut.sleep(0)]);
                        j=j+1
                        // await Ut.sleep(10000)
                        // console.log(123)
                    }
               
                routes.out =outAmountUsdcToUsdc
                //  await Ut.sleep(10000);
            //  console.log(123)
       
        return routes
    }

    catch (error) {
        throw error;
    }
};
var suss = 0;
var fail = 0, tj = 0, s = 0
// const additionalComputeBudgetInstruction =  web3_js_1.ComputeBudgetProgram.requestUnits({
//     units: 400000,
//     additionalFee: 20,
//   });

const executeSwap = async ({ jupiter, routes, slippage,blockhashWithExpiryBlockHeight }) => {
    try {
const Mn2 = Number(constants_1.fee) > 0 ? e => web3_js_1.ComputeBudgetProgram.setComputeUnitPrice({ microLamports: Number(constants_1.fee) }) : null; //END CUSTOM

        tj = tj + 1
        const { transactions,execute } = await jupiter.exchange({
            routeInfo: routes,
            blockhashWithExpiryBlockHeight,Mn2
        });
        // const {wallet1} ={}
        // const { setupTransaction, swapTransaction, cleanupTransaction } = transactions
        // const signed = await wallet1.signTransaction(swapTransaction).serialize()
        // swapTransaction.sign(jupiter.user)
        // swapTransaction = swapTransaction.serialize()
        // swapTransaction.instructions.splice(0, 0, additionalComputeBudgetInstruction)
        // const txid = await jupiter.connection.sendTransaction(
        //     swapTransaction,
        //     [constants_1.USER_KEYPAIR],
        //     {
        //         skipPreflight: true,
        //         maxRetries: 0,
        //         encoding: "base64",
        //         preflightCommitment: 'processed',
        //       slippage: Number(slippage)
        //     }
        //   );
        //   const txResult = await connection.getTransaction(txid, {
        //     commitment: "confirmed",
        //   });
        // console.log(txid);
        // const signData = swapTransaction.serializeMessage();
        const swapResult = await execute();
        // const encodedTransaction = signData.toString('base64');
        // const args = [encodedTransaction, config];
        // const unsafeRes = await jupiter.connection._rpcRequest('sendTransaction', args);
        
        // const res =superstruct.create(unsafeRes, SendTransactionRpcResult);
        // const result = await this.sendEncodedTransaction(encodedTransaction, options); 
        if (swapResult.error) {
            
             fail =fail +1   
            console.log( "    fail:", swapResult.error.txid);
        }
        else { 
            suss = suss+ Number(swapResult.inputAmount)
            console.log("  succes: ", swapResult.txid); }
        
        // return false

    }
    catch (error) {
        throw error;
    }
};
// const connectionv = new web3_js_1.Connection(constants_1.srpc1, 'processed'); 
const connection = new web3_js_1.Connection(constants_1.srpc[0], 'processed');
const main = async () => {
    // Setup Solana RPC connection
   
    // constants_1.srpc.forEach((v, i) => {
    
    // }); // Setup Solana RPC connection
    const tokens = await (await (0, isomorphic_fetch_1.default)(core_1.TOKEN_LIST_URL[constants_1.ENV])).json(); // Fetch token list from Jupiter API
    // If you want to add platformFee as integrator: https://docs.jup.ag/jupiter-core/adding-platform-fees


    const coin = constants_1.coin//USDH
    const exlude = [""]
    var jupiter = await core_1.Jupiter.load({  //；加载jupiter实例
        connection,
        // connection1: connectionv,
        cluster: constants_1.ENV,
        user: constants_1.USER_KEYPAIR,
        routeCacheDuration: 0,
        restrictIntermediateTokens: constants_1.restrictIntermediateTokens,
        wrapUnwrapSOL: false,
        // inputMintString: constants_1.USDC_MINT_ADDRESS,
        // outputMintString:constants_1.OUT_MINT_ADDRESS,
        // quoteMintToReferrer: true,
        // platformFeeAndAccounts,
        marketUrl: constants_1.marketUrl,
        coin,exlude,
        ammsToExclude: { Serum: true, GooseFX: true, Raydium: false, Cykura: true, Saros: false, Aldrin: true, Invariant: false, Dradex: true, Deltafi: true, Crema: false, Meteora: false, Balansol: true, MarcoPolo: false}
        // options,
        // shouldLoadSerumOpenOrders:false,  //读取血清开放订单
    });


    // await Ut.sleep(5000);
    // block = (await jupiter.connection.getLatestBlockhash('finalized'))
    //  Get routeMap, which maps each tokenMint and their respective tokenMints that are swappable
    //    const routeMap = jupiter.getRouteMap();
    // If you know which input/output pair you want
    const inputToken = tokens.find((t) => t.address == index_1.USDC_MINT_ADDRESS); // USDC Mint Info
    const outputToken = inputToken//tokens.find((t) => t.address == index_1.USDC_MINT_ADDRESS); // USDT Mint Info
    // Alternatively, find all possible outputToken based on your inputToken
    // const possiblePairsTokenInfo = await getPossiblePairsTokenInfo({ //获取可能的令牌对信息
    //   tokens,
    //   routeMap,
    //   inputToken,
    // });


    const sleep = Number(constants_1.cs)
    var time1 = new Date().getTime();
    var time3 = time1, c = connection.length - 1, i = 0
    const slippage  =Math.ceil(constants_1.slippage / 100)
    while (true) {
        try {


            


            var randominputAmount =  randomIntFromInterval(constants_1.min, constants_1.max);

            const routes = await getRoutes({
                jupiter,
                inputToken,
                outputToken,
                inputAmount: randominputAmount ,
                slippage, // 1% slippage
                // inputRouteSegment,
            });

            // if (routes !== null) {
            //     // Routes are sorted based on outputAmount, so ideally the first route is the best.
            //     executeSwap({ jupiter, routeInfo: routes.routesInfos[0] });
            // }
       
        if (cs === 0) {
            var time2 = new Date().getTime();
            const t = time2 - time3
            console.log(slot, '  ', (t), "ms", "     ", constants_1.corelx, '   tj: ', tj, " suss: ", suss, " fail: ", fail, '   In: ', randominputAmount,
            " old: ",routes.out);
            // if(t<sleep){await Ut.sleep(sleep-t)}
            if ((time2 - time1) / 1000 >= 600) {
                process.exit(0);
            }
            time3 = time2
        }
     }
        catch (error) {
            console.log({ error });
        }

    }
};
function randomIntFromInterval(min, max) {
    return Math.floor((Math.random() * (max - min ) + min)*100)/100;
}
main();
//main("http://98.159.98.50:8886/?v=24soFTT");
class Ut {
    /**
    * 异步延迟
    * @param {number} time 延迟的时间,单位毫秒
    */
    static sleep(time = 0) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time);
        })
    };
}

function clone(a) {
    return JSON.parse(JSON.stringify(a));
}



