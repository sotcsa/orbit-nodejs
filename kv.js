const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
const Identities = require('orbit-db-identity-provider')

// optional settings for the ipfs instance
const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true
  }
}
const options = { id: 'sotcsa' }

async function main() {

    const ipfs = await IPFS.create(ipfsOptions)
    const identity = await Identities.createIdentity(options)
    const orbitdb = await OrbitDB.createInstance(ipfs, { identity: identity })

    console.log(identity.toJSON())
 
    const kv = await orbitdb.keyvalue('seedin-settings')

    await kv.put('min.bounty', '0').then(() => {
      console.log(kv.get('min.bounty'))
    })

    const address = kv.address.toString()

    console.log(address, 'kv database address')


}
  
main()