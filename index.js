const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
require('dotenv').config()

const client = new Client({ partials: ["CHANNEL"], intents: [GatewayIntentBits.Guilds] });

client.once("ready", () => {
    console.log("Ready!");
})

client.login(process.env.DISCORD_TOKEN);

client.on("ready", () => {
    client.user.setActivity("you from your window.", {type: ActivityType.Watching});
})