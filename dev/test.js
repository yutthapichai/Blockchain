const Blockchain = require('./blockchain');

const bitcion = new Blockchain();

bitcion.createNewBlock(1000, 'sssss', 'aaaaaa');
bitcion.createNewBlock(2000, 'wwwww', 'bbbbbb');
bitcion.createNewBlock(3000, 'ttttt', 'cccccc');

console.log(bitcion);
