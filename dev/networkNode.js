const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const uuid = require('uuid/v1')
const rp = require('request-promise')

const Blockchain = require('./blockchain')

const port = process.argv[2]

const bitcoin = new Blockchain()

const nodeAddress = uuid().split('-').join('') // how to generate id auto

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extened: false}))

app.get('/blockchain', (req, res) => {
  res.send(bitcoin)
})

app.post('/transaction', (req,res) => {
  const newTransaction = req.body;
  const blockIndex = bitcoin.addTransactionToPendingTransactions(newTransaction)
  res.json({ note: `Transaction will ass in block ${blockIndex}.`})
  // const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient)
  // res.json({ note: `Transaction will be add block in block ${blockIndex}` })
})

app.post('/transaction/broadcast', (req,res) => {
  const newTransaction = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient)
  bitcoin.addTransactionToPendingTransactions(newTransaction)

  const requestPromises = []
  bitcoin.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri: networkNodeUrl + '/transaction',
      method:'POST',
      body: newTransaction,
      json: true
    }
    requestPromises.push(rp(requestOptions))
  })
  Promise.all(requestPromises).then(
    data => {
      res.json({ note: "Transaction create and broadcast successfully"})
    }
  )
})

app.get('/mine', (req, res) => {
  const lastBlock = bitcoin.getLastBlock() // get array[0] then print object
  const previousBlockHash = lastBlock.hash //['0'] is in function createnewblock or lastBlock['hash']
  const currentBlockData = {
    transactions: bitcoin.pendingTransactions,
    index: lastBlock.index + 1
  }
  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData)
  const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce)
  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash)

  const requestPromises = []
  bitcoin.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri: networkNodeUrl + '/receive-new-block',
      method: 'POST',
      body: { newBlock: newBlock },
      json: true
    }
    requestPromises.push(rp(requestOptions))
  })

  Promise.all(requestPromises).then(
      data => {
        const requestOptions = {
          uri: bitcoin.currentNodeUrl + '/transaction/broadcast',
          method: 'POST',
          body: {
            amount: 12.5,
            sender: "00",
            recipient: nodeAddress
          },
          json: true
        }
        return rp(requestOptions)
  }).then(
    data => {
      res.json({
        note: "new block mined and broadcast successfully",
        block: newBlock
      })
    }
  ).catch( err => console.log(err))
})


app.post('/receive-new-block', (req,res) => {
  const newBlock = req.body.newBlock
  const lastBlock = bitcoin.getLastBlock()
  const correctHash = lastBlock.hash === newBlock.previousBlockHash
  const correctIndex = lastBlock['index'] + 1 === newBlock['index']

  if(correctHash && correctIndex){
    bitcoin.chain.push(newBlock)
    bitcoin.pendingTransactions = []
    res.json({
      note: 'New block receive and accepted',
      newBlock: newBlock
    })
  }else{
    res.json({
      note: 'New block rejected.',
      newBlock: newBlock
    })
  }
})

// register a node and broadcast it the node
app.post('/register-and-broadcast-node', (req, res) => {
  const newNodeUrl = req.body.newNodeUrl //  http://localhost:4002 each a link
  if(bitcoin.networkNodes.indexOf(newNodeUrl) == -1) bitcoin.networkNodes.push(newNodeUrl)

  const regNodesPromises = []
  bitcoin.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri: networkNodeUrl + '/register-node',
      method: 'POST',
      body: { newNodeUrl: newNodeUrl},
      json: true
    }
    regNodesPromises.push(rp(requestOptions))
  })
  Promise.all(regNodesPromises)
  .then(data => {
    const bulkRegisterOptions = {
      uri: newNodeUrl + '/register-nodes-bulk',
      method: 'POST',
      body: { allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl ] },
      json: true
    }
    return rp(bulkRegisterOptions)
  })
  .then(data => {
    res.json({ note: 'New node registered with network successfully'})
  })
})

// register a node with the network
app.post('/register-node', (req, res) => {
  const newNodeUrl = req.body.newNodeUrl
  const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1 // array have not null
  const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl
  if(nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(newNodeUrl)
  res.json({ note: 'New node registerd successfully with nodeS'})
})

//register multiply node
app.post('/register-nodes-bulk', (req, res) => {
  const allNetworkNodes = req.body.allNetworkNodes
  allNetworkNodes.forEach(networkNodeUrl => {
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1
    const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl
    if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl)
  })
  res.json({ note: 'Bulk register successfully'})
})


app.get('/consensus', (req,res) => {
  const requestPromises = []
  bitcoin.networkNodes.forEach(networkNodeUrl => {
    const requestOption = {
      uri: networkNodeUrl + '/blockchain',
      method: 'GET',
      json: true
    }
    requestPromises.push(rp(requestOption))
  })

  Promise.all(requestPromises).then(
    blockchains => {
      const currentChainLength = bitcoin.chain.length
      let maxChainLength = currentChainLength
      let newLongestChain = null
      let newPendingTransactions = null

      blockchains.forEach(
        blockchain => {
          if(blockchain.chain.length > maxChainLength){
            maxChainLength = blockchain.chain.length
            newLongestChain = blockchain.chain
            newPendingTransactions = blockchain.pendingTransactions
          }
        }
      )

      if(!newLongestChain || (newLongestChain && !bitcoin.chainIsValid(newLongestChain))){
        res.json({
          note: 'Current chain has not been replaced',
          chain: bitcoin.chain
        })
      }else if(newLongestChain && bitcoin.chainIsValid(newLongestChain)){
        bitcoin.chain = newLongestChain // amount all object
        bitcoin.pendingTransactions = newPendingTransactions
        res.json({
          note: 'this chain has been replaced',
          chain: bitcoin.chain
        })
      }
    }
  )
})

app.listen(port, () => {
  console.log(`Listening on port ${port}00000000`)
})
