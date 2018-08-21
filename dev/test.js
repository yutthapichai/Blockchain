const Blockchain = require('./blockchain');

const bitcion = new Blockchain();

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


//const result = bitcion.hashBlock(previousBlockHash, currentBlockData,nonce);
const result_proof = bitcion.proofOfWork(previousBlockHash, currentBlockData);
console.log(result_proof);

/* Lv1
//nonce, previousBlockHash, hash
bitcion.createNewBlock(1000, 'sssss', 'aaaaaa');
//amount, sender, recippient
bitcion.createNewTransaction(100,'yutsending','boomgetmonney');
bitcion.createNewBlock(2000, 'sssss', 'aaaaaa');
bitcion.createNewTransaction(200,'yutsending2','boomgetmonney2');
bitcion.createNewTransaction(1200,'yutsending3','boomgetmonney3');
bitcion.createNewTransaction(5200,'yutsending4','boomgetmonney4');
bitcion.createNewBlock(3000, 'sssss', 'aaaaaa');
*/
