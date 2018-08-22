//import Blockchain from './blockchain_object'; // es6 module
const Blockchain = require('./blockchain_object');
// import { Blockchain } from './blockchain_object'; //name module

const bitcoin = Blockchain;

//nonce, previousBlockHash, hash
// first transaction
bitcoin.createNewTransaction(1000,'yut_sender','boom_recipient');
// two block and first is in object file.js
bitcoin.createNewBlock(300, 'phash', 'hash');

const getlast = bitcoin.getLastBlock()

// check all blockchain
console.log(bitcoin)
// check value transaction
console.log(getlast)
