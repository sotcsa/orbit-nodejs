const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

// optional settings for the ipfs instance
const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true
  }
}

async function main() {

    const ipfs = await IPFS.create(ipfsOptions)
    const orbitdb = await OrbitDB.createInstance(ipfs)

    const jobs = await orbitdb.docs('seedin-jobs')

    await jobs.put({ 
      _id: '1', 
      name: 'web3 backend developer', 
      skills: 'near' 
    })
    const address = jobs.address.toString()

    console.log(address, 'jobs database address')


}
  
main()