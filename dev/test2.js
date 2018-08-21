//import Blockchain from './blockchain_test_obj'; // es6 module
const Blockchain = require('./blockchain_test_obj');
// import { Blockchain } from './blockchain_test_obj'; //name module

const bitcion = Blockchain;

//nonce, previousBlockHash, hash
bitcion.createNewBlock(1000, 'sssss', 'aaaaaa');

//amount, sender, recippient
bitcion.createNewTransaction(100,'yutsending','boomgetmonney');
bitcion.createNewBlock(2000, 'sssss', 'aaaaaa');


bitcion.createNewTransaction(200,'yutsending2','boomgetmonney2');
bitcion.createNewTransaction(1200,'yutsending3','boomgetmonney3');
bitcion.createNewTransaction(5200,'yutsending4','boomgetmonney4');

bitcion.createNewBlock(3000, 'sssss', 'aaaaaa');

console.log(bitcion);
