const sha256 = require('sha256');
const currentNodeUrl = process.argv[3]
//or function Blockcain(){}
const Blockchain = function() {
	this.chain =[]
	this.pendingTransactions = []

	this.networkNodes = []
	this.currentNodeUrl = currentNodeUrl

	this.createNewBlock(100, '0', '0'); //default value
}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
	const newBlock = {
		index: this.chain.length + 1,
		timestamp: Date.now(),
		transactions: this.pendingTransactions,
		nonce: nonce,
		hash:hash,
		previousBlockHash: previousBlockHash
	};

	this.pendingTransactions = [];
	this.chain.push(newBlock);
	return newBlock;
}

Blockchain.prototype.getLastBlock = function() {
	return this.chain[ this.chain.length - 1 ];
}

Blockchain.prototype.createNewTransaction = function(amount, sender, recippient){
	const newtransaction = {
		amount: amount,
		sender: sender,
		recippient: recippient
	}
	this.pendingTransactions.push(newtransaction);
	return this.getLastBlock()['index'] + 1;
}

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce){
	const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
	const hash = sha256(dataAsString);
	return hash;
}

Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData){
	let nonce = 0;
	let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
	while(hash.substring(0,4) !== '0000'){
		nonce++;
		hash = this.hashBlock(previousBlockHash,currentBlockData, nonce);
		//console.log(hash);
	}
	return nonce;
}

module.exports = Blockchain;

//es module
//export default Blockchain;

//name module several export
//export {Blockchain};
