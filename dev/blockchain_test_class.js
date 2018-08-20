class Blockchain {

	this.chain =  [];
	this.newTransactions =  [];

  createNewBlock(nonce, previousBlockHash, hash){
  	const newBlock = {
  		index: this.chain.length + 1,
  		timestamp: Date.now(),
  		transactions: this.newTransactions,
  		nonce: nonce,
  		hash:hash,
  		previousBlockHash: previousBlockHash
  	};

  	this.newTransactions = [];
  	this.chain.push(newBlock);
  	return newBlock;
  }

  static getLastBlock() {
  	return this.cain[ this.cain.length - 1 ];
  }
}

const obj = new Blockchain();
const p = obj.createNewBlock(100,'sdad','dasdsad');
console.log(Blockchain.getLastBlock());
//es5 module
//module.exports Blockchain;

//es6 function
//export default Blockchain;

//name function several export
//export {Blockchain};
