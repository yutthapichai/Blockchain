const sha256 = require('sha256')

class Blockchain {
  constructor(){
    this.chain =[]
    this.pendingTransactions = []
    this.createNewBlock(100, '0', '0') //default value
  }

  createNewBlock(nonce,previousBlockHash,hash) {
  	const newBlock = {
  		index: this.chain.length + 1,
  		timestamp: Date.now(),
  		transactions: this.pendingTransactions,
      nonce: nonce,
      previousBlockHash: previousBlockHash,
      hash: hash
  	}

  	this.pendingTransactions = []
  	this.chain.push(newBlock)
  	return newBlock
  }


  getLastBlock() {
  	return this.chain[ this.chain.length - 1 ]
  }

  createNewTransaction(amount, sender, recippient){
  	const newtransaction = {
  		amount: amount,
  		sender: sender,
  		recippient: recippient
  	}
  	this.pendingTransactions.push(newtransaction)
  	return this.getLastBlock()['index'] + 1
  }

  hashBlock(previousBlockHash, currentBlockData, nonce){
  	const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData)
  	const hash = sha256(dataAsString)
  	return hash
  }

  proofOfWork(previousBlockHash, currentBlockData){
  	let nonce = 0
  	let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce)
  	while(hash.substring(0,4) !== '0000'){
  		nonce++
  		hash = this.hashBlock(previousBlockHash,currentBlockData, nonce)
  		//console.log(hash)
  	}
  	return nonce
  }
} //end class
module.exports = Blockchain

//es module
//export default Blockchain;

//name module several export
//export {Blockchain};
