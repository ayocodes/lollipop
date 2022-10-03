import { App } from "./app.js";
import { Tx } from "./tx.js";
//declaring the constant with the node’s address
const RPC_URL = "https://mainnet.smartpy.io";
//declare the constant with the Everstake baker’s address
const ADDRESS = 'tz1YxMJRTHL2LMxU1y7iNX3dBTST73FQYsod'

//launch App that will broadcast the node’s address to the main function
// new App(RPC_URL).main();

//launching App, sending a link to the node, calling getBalance and sending it the address
new App(RPC_URL).getBalance(ADDRESS)

//call the function Tx, send it the testnet link, and ask to activate the account
// new Tx(RPC_URL).activateAccount();







  