const path = require('path')
const mailer = require('waveorb-mailer')
const { exist, read } = require('extras')

module.exports = async function ({ command, campaign }) {
  const root = process.cwd()
  const dir = path.join(root, 'campaigns')
  if (!exist(dir)) {
    return console.log(`Directory 'campaigns' not found`)
  }
  const paths = {
    campaign: path.join(dir, campaign),
    list: path.join(dir, campaign, 'list.json'),
    email: path.join(dir, campaign, 'email.md'),
    config: path.join(root, 'mailus.json')
  }

  if (!exist(paths.campaign)) {
    return console.log(`Campaign does not exist: ${campaign}`)
  }

  if (!exist(paths.list)) {
    return console.log(`List file not found`)
  }

  if (!exist(paths.email)) {
    return console.log(`Email file not found`)
  }

  const config = exist(paths.config) ? read(paths.config) : {}

  console.log(`Using config:`)
  console.log(JSON.stringify(config, null, 2))
  console.log({ command, campaign })

  if (command == 'test' && !config.test) {
    return console.log(`Can not find test email in config`)
  }

  const list = read(paths.list)
  const email = read(paths.email)

  console.log(list)
  console.log(email)

  const client = mailer()
  const $ = {}
  if (command == 'test') {
    const data = list[0] || {}
    client.send(
      {
        content: email,
        format: 'markdown'
      },
      $,
      {
        to: config.test,
        from: config.test
      },
      data
    )
  }
}
