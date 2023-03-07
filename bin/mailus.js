#!/usr/bin/env node
const COMMANDS = ['test', 'send']
const command = process.argv[3]

function usage() {
  console.log(
    [
      '\nUsage:',
      '  send - mailus send <campaign-name>',
      '  test - mailus test <campaign-name>\n'
    ].join('\n')
  )
}

if (!COMMANDS.includes(command)) {
  console.log(`\nUnknown command: ${command}`)
  usage()
  process.exit()
}

const campaign = process.argv[4]

const mailus = require('../index.js')

mailus({ command, campaign })
