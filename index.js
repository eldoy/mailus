const path = require('path')
const mailer = require('waveorb-mailer')
const { exist, read, sleep } = require('extras')

module.exports = async function ({ command, campaign }) {
  const root = process.cwd()
  const dir = path.join(root, 'campaigns')
  if (!exist(dir)) {
    return console.log(`Directory 'campaigns' not found`)
  }
  const paths = {
    campaign: path.join(dir, campaign),
    contacts: path.join(dir, campaign, 'contacts.json'),
    testContacts: path.join(dir, campaign, 'contacts.test.json'),
    email: path.join(dir, campaign, 'email.json'),
    message: path.join(dir, campaign, 'message.md'),
    config: path.join(root, 'mailus.json'),
    testConfig: path.join(root, 'mailus.test.json')
  }

  if (!exist(paths.config)) {
    return console.log(`Config file does not exist: ${paths.config}`)
  }

  if (command == 'test' && !exist(paths.testConfig)) {
    return console.log(`Test config file does not exist: ${paths.testConfig}`)
  }

  if (!exist(paths.campaign)) {
    return console.log(`Campaign does not exist: ${campaign}`)
  }

  if (!exist(paths.contacts)) {
    return console.log(`Contacts file not found: ${paths.contacts}`)
  }

  if (command == 'test' && !exist(paths.testContacts)) {
    return console.log(`Test contacts file not found: ${paths.testContacts}`)
  }

  if (!exist(paths.email)) {
    return console.log(`Email file not found: ${paths.email}`)
  }

  if (!exist(paths.message)) {
    return console.log(`Message file not found: ${paths.message}`)
  }

  let config = command == 'test' ? read(paths.testConfig) : read(paths.config)

  console.log({ command, campaign })

  console.log(`Using config:`)
  console.log(JSON.stringify(config, null, 2))

  let contacts =
    command == 'test' ? read(paths.testContacts) : read(paths.contacts)

  const email = read(paths.email)
  const message = read(paths.message)

  console.log(contacts)
  console.log(email)
  console.log(message)

  const client = mailer(config.server)
  const $ = {}

  for (const contact of contacts) {
    console.log(`Sending message to ${contact.email}...`)
    await sleep(1)
    await client.send(
      {
        content: message,
        format: 'markdown'
      },
      $,
      {
        to: contact.email,
        from: config.from
      },
      contact
    )
  }
}
