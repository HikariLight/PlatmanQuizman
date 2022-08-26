const { createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const fs = require("fs");
require('dotenv').config()

const client = new Client({
        partials: [
            Partials.Channel
        ],
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildVoiceStates
            ]
});

const prefix = "&";
const player = createAudioPlayer({
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Play
    }
});

fs.readdir("./events/", (err, files) => {
    files.forEach(file => {
      const eventHandler = require(`./events/${file}`);
      const eventName = file.split(".")[0];
      client.on(eventName, (...args) => eventHandler(client, prefix, player, ...args));
    });
});

client.login(process.env.DISCORD_TOKEN);