	const sha256 = require('sha256')
	
	const Blockchain = {
		chain: [],
		pendingTransactions:  [],
		getLastBlock: function() {		// if define function will show in cmd function: getlastblock
			return this.chain[ this.chain.length - 1 ]
		}
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

  	this.pendingTransactions = []
  	this.chain.push(newBlock)
  	return newBlock
  }

	Blockchain.createNewTransaction = function(amount, sender, recippient){
		const newtransaction = {
			amount: amount,
			sender: sender,
			recippient: recippient
		}
		this.pendingTransactions.push(newtransaction)
		return this.getLastBlock()['index'] + 1
	}

	Blockchain.hashBlock = function(previousBlockHash, currentBlockData, nonce){
		const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData)
		const hash = sha256(dataAsString)
		return hash
	}

	Blockchain.proofOfWork = function(previousBlockHash, currentBlockData){
		let nonce = 0
		let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce)
		while(hash.substring(0,4) !== '0000'){
			nonce++
			hash = this.hashBlock(previousBlockHash,currentBlockData, nonce)
			//console.log(hash)
		}
		return nonce
	}

Blockchain.createNewBlock(100, '0', '0') //default value

module.exports = Blockchain

//es6 function
//export default Blockchain;

//name function several export
//export {Blockchain};
