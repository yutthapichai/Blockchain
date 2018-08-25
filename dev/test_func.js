const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();
const bc1 = {
"chain": [
{
"index": 1,
"timestamp": 1535170074063,
"transactions": [],
"nonce": 100,
"hash": "0",
"previousBlockHash": "0"
},
{
"index": 2,
"timestamp": 1535170498361,
"transactions": [],
"nonce": 18140,
"hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
"previousBlockHash": "0"
},
{
"index": 3,
"timestamp": 1535170533234,
"transactions": [
{
"amount": 12.5,
"sender": "00",
"recippient": "70d94d00a81c11e8a8d333093340a52d",
"transactionId": "6dc5d600a81d11e8a8d333093340a52d"
},
{
"amount": 10,
"sender": "yut",
"recippient": "boom",
"transactionId": "76320e30a81d11e8a8d333093340a52d"
},
{
"amount": 20,
"sender": "yut",
"recippient": "boom",
"transactionId": "78eb3ac0a81d11e8a8d333093340a52d"
},
{
"amount": 30,
"sender": "yut",
"recippient": "boom",
"transactionId": "7bdba3f0a81d11e8a8d333093340a52d"
}
],
"nonce": 49960,
"hash": "0000b8afb27e0b781af8f23f3cb36579a2f4bc332b15e84faa5d92cd0f5ccc48",
"previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
},
{
"index": 4,
"timestamp": 1535170572590,
"transactions": [
{
"amount": 12.5,
"sender": "00",
"recippient": "70d94d00a81c11e8a8d333093340a52d",
"transactionId": "82898a50a81d11e8a8d333093340a52d"
},
{
"amount": 40,
"sender": "yut",
"recippient": "boom",
"transactionId": "8e464d10a81d11e8a8d333093340a52d"
},
{
"amount": 50,
"sender": "yut",
"recippient": "boom",
"transactionId": "91aca990a81d11e8a8d333093340a52d"
},
{
"amount": 60,
"sender": "yut",
"recippient": "boom",
"transactionId": "94e9ac20a81d11e8a8d333093340a52d"
}
],
"nonce": 33663,
"hash": "000082855b03ec88096f8764aaa083c11eaa54cdfdd6a72db80ecaf19a07d9bb",
"previousBlockHash": "0000b8afb27e0b781af8f23f3cb36579a2f4bc332b15e84faa5d92cd0f5ccc48"
}
],
"pendingTransactions": [
{
"amount": 12.5,
"sender": "00",
"recippient": "70d94d00a81c11e8a8d333093340a52d",
"transactionId": "99fea300a81d11e8a8d333093340a52d"
}
],
"networkNodes": [],
"currentNodeUrl": "http://localhost:3001"
}
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
// const transactions = bitcoin.createNewTransaction(1000,'yut_sender','boom_recipient')
// create block for store transactions
// const block2 = bitcoin.createNewBlock(100,'prehash','curhash')
// ckeck last block
// const lastblock = bitcoin.getLastBlock();
//console.log(bitcoin);

console.log('Valid :', bitcoin.chainIsValid(bc1.chain))

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
