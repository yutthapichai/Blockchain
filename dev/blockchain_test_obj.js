const sha256 = require('sha256');
const Blockchain = {
	chain: [],
	pendingTransactions:  []
}

  Blockchain.createNewBlock = function(nonce, previousBlockHash, hash){
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
  },

	Blockchain.getLastBlock = function() {
		return this.chain[ this.chain.length - 1 ];
	}

	Blockchain.createNewTransaction = function(amount, sender, recippient){
		const newtransaction = {
			amount: amount,
			sender: sender,
			recippient: recippient
		}
		this.pendingTransactions.push(newtransaction);
		return this.getLastBlock()['index'] + 1;
	}

	Blockchain.hashBlock = function(previousBlockHash, currentBlockData, nonce){
		const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
		const hash = sha256(dataAsString);
		return hash;
	}



module.exports = Blockchain;

//es6 function
//export default Blockchain;

//name function several export
//export {Blockchain};
