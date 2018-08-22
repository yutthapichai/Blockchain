const Blockchain = require('./blockchain_class')

// or new Blockchain()
const bitcoin = new Blockchain

// transaction 1 is in block 2
const transactions = bitcoin.createNewTransaction(1000,'yut_sender','boom_recipient');
// block 2
const result = bitcoin.createNewBlock(100, 'prehash','curhash')

// check
const lastblock = bitcoin.getLastBlock()

console.log(bitcoin)
console.log(lastblock)
