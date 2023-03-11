const mailer = require('waveorb-mailer')
const loader = require('conficurse')

const emailAddress = /[^\s@]+@[^\s@]+\.[^\s@]+/

module.exports = async function ({ campaignName, listName, serverName }) {
  const mailus = await loader.load('mailus')
  
  const campaign = mailus.campaigns[campaignName]
  if (!campaign) {
    return console.log(`Campaign not found: ${campaignName}`)
  }

  const list = mailus.lists[listName]
  if (!list) {
    return console.log(`List not found: ${listName}`)
  }

  const server = mailus.servers[serverName]
  if (!server) {
    return console.log(`Server not found: ${serverName}`)
  }
  
  if (!campaign.from) {
    return console.log(`Campaign from field missing`)
  }
  if (!campaign.subject) {
    return console.log(`Campaign subject field missing`)
  }  
  if (typeof campaign.message == 'undefined') {
    return console.log(`Campaign message field missing`)
  }  
  if (!campaign.subject) {
    return console.log(`Campaign subject field missing`)
  }  

  const message = mailus.messages[campaign.message]
  if (!message) {
    return console.log(`Message not found: ${campaign.message}`)
  }
    
  for (const contact of list) {
    if (!emailAddress.test(contact.email || '')) {
      const obj = JSON.stringify(contact, null, 2)
      return console.log(`Contact email invalid:\n${obj}`)
    }
  }

  const client = mailer(server)

  for (const contact of list) {
    console.log(`Sending message to ${contact.email}...`)
    await new Promise(r => setTimeout(r, 1000))
    await client.send(
      {
        content: message,
        format: 'markdown'
      },
      {},
      {
        to: contact.email,
        from: campaign.from,
        subject: campaign.subject
      },
      contact
    )
  }
}
