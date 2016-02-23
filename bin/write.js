var Writer = require('burn-stream-writer')
var appConfig = require('burn-name/config').testnet
var BurnName = require('burn-name')
var constants = require('burn-name/constants')
var assert = require('assert')
var fs = require('fs')
var argv = require('minimist')(process.argv.slice(2))
var prompt = require('prompt')

assert(argv.t, 'You must pass in the -t argument')

var clientConfig = JSON.parse(fs.readFileSync('client-config.json'))

// Write
var writer = Writer(clientConfig, appConfig)

// TODO check address validity
assert(argv.address, 'You must pass in an address, --address')

var opts = argv

if (argv.name) {
  assert(!argv.data)
  assert(argv.amount)
  assert(BurnName.isValidName(argv.name), 'Invalid name')

  console.log('bid:', argv.amount)

  opts.message = Buffer.concat([Buffer([constants.MESSAGE_BID]), Buffer(argv.name, 'ascii')]).toString('hex')
} else if (argv.data) {
  assert(!argv.amount)
  assert(!argv.name)
  assert(argv.data)

  opts.message = Buffer.concat([Buffer([constants.MESSAGE_DATA]), Buffer(argv.data, 'ascii')]).toString('hex')
  opts.amount = 'min'
} else {
  assert.fail('You must specify either --name or --data')
}

writer.getUtxos(function (err, utxos) {
  assert.ifError(err)

  assert(utxos[0].address === argv.address, 'Need to implement utxo reordering')
  opts.utxos = utxos
  writer.createTx(opts, function (err, tx) {
    assert.ifError(err)

    console.log('send tx? y/n')
    prompt.get(['write'], function (err, result) {
      assert.ifError(err)

      if (result.write === 'y') {
        writer.send(tx.hex, function (err) {
          assert.ifError(err)
          console.log('write submitted successfully')
        })
      } else {
        console.log('not sending')
      }
    })
  })
})
