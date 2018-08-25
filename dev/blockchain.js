const sha256 = require('sha256');
const uuid = require('uuid/v1')

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
		recippient: recippient,
		transactionId: uuid().split('-').join('')
	}
	return newtransaction
	//this.pendingTransactions.push(newtransaction)
	//return this.getLastBlock()['index'] + 1
}

Blockchain.prototype.addTransactionToPendingTransactions = function(transactionobj){
	this.pendingTransactions.push(transactionobj)
	return this.getLastBlock()['index'] + 1
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

Blockchain.prototype.chainIsValid = function(blockchain){
	let validChain = true
	for(let i = 1;i < blockchain.length; i++){
		const currentBlock = blockchain[i]
		const prevBlock = blockchain[i - 1]
		// prevBlock.hash or prevBlock['hash']..
		const blockHash = this.hashBlock(prevBlock.hash, { transactions: currentBlock.transactions,index: currentBlock.index }, currentBlock.nonce)
		console.log(blockHash)
		if(blockHash.substring(0,4) !== '0000') validChain = false
		if(currentBlock.previousBlockHash !== prevBlock.hash) validChain = false
	}
	console.log('blockchain amount:',blockchain.length)
	const genesisBlock = blockchain[0] // print object
	const correctNonce = genesisBlock.nonce === 100;
	const correctPreviousBlockHash = genesisBlock.previousBlockHash === '0'
	const correctHash = genesisBlock.hash === '0'
	const correctTransactions = genesisBlock.transactions.length === 0

	if(!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) validChain = false
	return validChain
}

module.exports = Blockchain;

//es module
//export default Blockchain;

//name module several export
//export {Blockchain};
