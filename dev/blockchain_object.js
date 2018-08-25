	const sha256 = require('sha256')
	const uuid = require('uuid/v1')

	const currentNodeUrl = process.argv[3]

	const Blockchain = {
		chain: [],
		pendingTransactions:  [],

		networkNodes: [],
		currentNodeUrl: currentNodeUrl,

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
			recippient: recippient,
			transactionId: uuid().split('-').join('')
		}
		return newtransaction
		//this.pendingTransactions.push(newtransaction)
		//return this.getLastBlock()['index'] + 1
	}

	Blockchain.addTransactionToPendingTransactions = function(transactionobj){
		this.pendingTransactions.push(transactionobj)
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

	Blockchain.chainIsValid = function(blockchain){
		let validChain = true
		for(let i = 1;i < blockchain.length; i++){
			const currentBlock = blockchain[i]
			const prevBlock = blockchain[i - 1]
			// prevBlock.hash or prevBlock['hash']..
			const blockHash = this.hashBlock(prevBlock.hash, { transactions: currentBlock.transactions,index: currentBlock.index }, currentBlock.nonce)

			if(blockHash.substring(0,4) !== '0000') validChain = false
			if(currentBlock.previousBlockHash !== prevBlock.hash) validChain = false
		}

		const genesisBlock = blockchain[0] // print object
		const correctNonce = genesisBlock.nonce === 100;
		const correctPreviousBlockHash = genesisBlock.previousBlockHash === '0'
		const correctHash = genesisBlock.hash === '0'
		const correctTransactions = genesisBlock.transactions.length === 0

		if(!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) validChain = false
		return validChain
	}

	Blockchain.getBlock = function(blockHash){
		let correctBlock = null
		this.chain.forEach(block => {
			if(block.hash === blockHash) correctBlock = block
		})
		return correctBlock
	}


	Blockchain.getTransaction = function(transactionId){
		let correctTransaction = null
		let correctBlock = null
		this.chain.forEach(block => {
			block.transactions.forEach(transaction => {
				if(transaction.transactionId === transactionId){
					correctTransaction = transaction
					correctBlock = block
				}
			})
		})
		return { transaction: correctTransaction,block: correctBlock }
	}


	Blockchain.getAddressData = function(address){
		const addressTransactions = []
		this.chain.forEach(block => {
			block.transactions.forEach(transaction => {
				if(transaction.sender === address || transaction.recipient === address){
					addressTransactions.push(transaction)
				}
			})
		})
		let balance = 0
		addressTransactions.forEach(transaction => {
			if(transaction.recipient === address) balance += transaction.amount
			else if(transaction.sender === address) balance -= transaction.amount
		})

		return {
			addressTransactions: addressTransactions,
			addressBalance: balance
		}
	}

Blockchain.createNewBlock(100, '0', '0') //default value

module.exports = Blockchain

//es6 function
//export default Blockchain;

//name function several export
//export {Blockchain};
