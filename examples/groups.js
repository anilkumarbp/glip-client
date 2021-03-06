require('dotenv').config()
const GlipClient = require('../src/glip-client')

const gc = new GlipClient({
  server: 'https://platform.ringcentral.com',
  appKey: process.env.APP_KEY,
  appSecret: process.env.APP_SECRET,
  appName: 'My Glip Client',
  appVersion: '1.0.0'
})
gc.authorize({
  username: process.env.USERNAME,
  extension: '',
  password: process.env.PASSWORD
}).then((response) => {
  console.log('logged in')

  gc.groups().get().then((response) => { // get groups and teams
    console.log(`${response.records.length} groups/teams were found.`)
  })

  gc.groups().get({ type: 'Group' }).then((response) => { // get groups
    console.log(`${response.records.length} groups were found.`)
  })

  gc.groups().get({ type: 'Team' }).then((response) => { // get teams
    console.log(`${response.records.length} teams were found.`)
  })

  gc.groups().get({ groupId: 19203244034 }).then((response) => { // get group/team by id
    console.log(response)
  })

  gc.groups().subscribe((message) => { // monitor group events, such as GroupAdded, GroupChanged and GroupRemoved
    console.log(message)
  })
})
