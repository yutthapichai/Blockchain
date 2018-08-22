const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();
/*
const previousBlockHash = 'sdasdsadsadsaad';
const currentBlockData = [
  {
    amount:100,
    render: 'yut',
    recipient: 'boom'
  },
  {
    amount:200,
    render: 'yut2',
    recipient: 'boom2'
  },
  {
    amount:300,
    render: 'yut3',
    recipient: 'boom3'
  }
];

const nonce = 103286;
*/

//const result = bitcoin.hashBlock(previousBlockHash, currentBlockData,nonce);
//const result_proof = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
const transactions = bitcoin.createNewTransaction(1000,'yut_sender','boom_recipient')
// create block for store transactions
const block2 = bitcoin.createNewBlock(100,'prehash','curhash')
// ckeck last block
const lastblock = bitcoin.getLastBlock();

console.log(bitcoin);

console.log(lastblock)

/* Lv1
//nonce, previousBlockHash, hash
bitcoin.createNewBlock(1000, 'sssss', 'aaaaaa');
//amount, sender, recippient
bitcoin.createNewTransaction(100,'yutsending','boomgetmonney');
bitcoin.createNewBlock(2000, 'sssss', 'aaaaaa');
bitcoin.createNewTransaction(200,'yutsending2','boomgetmonney2');
bitcoin.createNewTransaction(1200,'yutsending3','boomgetmonney3');
bitcoin.createNewTransaction(5200,'yutsending4','boomgetmonney4');
bitcoin.createNewBlock(3000, 'sssss', 'aaaaaa');
*/
