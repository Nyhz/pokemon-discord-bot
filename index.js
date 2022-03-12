require('dotenv').config()
const axios = require('axios')

const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.on('ready', (bot) => {
    console.log(`Bot: ${bot.user.username}\nStatus: ${bot.presence.status}`)
})

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('$')) {
        const pokemon = message.content.substring(1)
        try {
            const response = await axios.get(`${process.env.API_BASEURL}${pokemon}`)
            message.channel.send(response.data.sprites['front_default'])
        } catch (e) {
            console.log(e)
            message.channel.send('That Pokemon does not exist')
        }
    }
})

client.login(process.env.BOT_TOKEN)