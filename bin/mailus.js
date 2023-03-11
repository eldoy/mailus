#!/usr/bin/env node
const campaignName = process.argv[2]
const listName = process.argv[3]
const serverName = process.argv[4]

function usage(msg) {
  console.log(`\n${msg}`)
  console.log(
    [
      '\nUsage:',
      '  mailus <campaign> <list> <server>\n'      
    ].join('\n')
  )
  process.exit()
}

if (!campaignName) {  
  usage(`Campaign name missing!`)  
}

if (!listName) {  
  usage(`List name missing!`)  
}

if (!serverName) {  
  usage(`Server name missing!`)  
}

const mailus = require('../index.js')
mailus({ campaignName, listName, serverName })
