const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();
const bc1 = {
"chain": [
{
"index": 1,
"timestamp": 1535168134572,
"transactions": [],
"nonce": 100,
"hash": "0",
"previousBlockHash": "0"
},
{
"index": 2,
"timestamp": 1535168143228,
"transactions": [],
"nonce": 18140,
"hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
"previousBlockHash": "0"
},
{
"index": 3,
"timestamp": 1535168145774,
"transactions": [
{
"amount": 12.5,
"sender": "00",
"recippient": "ecd275d0a81711e8b13c9dfdaa6ec30e",
"transactionId": "f2010f30a81711e8b13c9dfdaa6ec30e"
}
],
"nonce": 6425,
"hash": "000017cee911d3bf7e32cd92dd7e1bc12cd1e89857f20b62ab4e97af0742a8c7",
"previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
}
],
"pendingTransactions": [
{
"amount": 12.5,
"sender": "00",
"recippient": "ecd275d0a81711e8b13c9dfdaa6ec30e",
"transactionId": "f37fe700a81711e8b13c9dfdaa6ec30e"
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
