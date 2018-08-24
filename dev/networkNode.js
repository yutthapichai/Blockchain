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
  const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient)
  res.json({ note: `Transaction will be add block in block ${blockIndex}` })
})

app.get('/mine', (req, res) => {
  const lastBlock = bitcoin.getLastBlock()
  const previousBlockHash = lastBlock['hash'] // is in function createnewblock
  const currentBlockData = {
    transaction: bitcoin.pendingTransactions,
    index: lastBlock['index'] + 1
  }

  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData)
  const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce)

  bitcoin.createNewTransaction(12.5, "00", nodeAddress)

  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash)
  res.json({
    note: "new block mined successfully",
    block: newBlock
  })
})

// register a node and broadcast it the node
app.post('/register-and-broadcast-node', (req, res) => {
  const newNodeUrl = req.body.newNodeUrl
  if(bitcoin.networkNodes.indexOf(newNodeUrl) == -1) bitcoin.networkNodes.push(newNodeUrl)

  const regNodesPromises = []
  bitcoin.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      url: networkNodeUrl + '/register-node',
      method: 'POST',
      body: { newNodeUrl: newNodeUrl},
      json: true
    }
    regNodesPromises.push(rp(requestOptions))
  })
  Promise.all(regNodesPromises)
  .then(data => {
    const bulkRegisterOptions = {
      url: newNodeUrl + '/register-node-bulk',
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
app.post('/register-node-bulk', (req, res) => {
  const allNetworkNodes = req.body.allNetworkNodes
  allNetworkNodes.forEach(networkNodeUrl => {
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1
    const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl
    if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl)
  })
  res.json({ note: 'Bulk register successfully'})
})

app.listen(port, () => {
  console.log(`Listening on port ${port}00000000`)
})
