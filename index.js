const { Client, GatewayIntentBits, ActivityType, Partials } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');
require('dotenv').config()

const prefix = "&";
const vcId = process.env.vcId;

const client = new Client({
        partials: [
            Partials.Channel
        ],
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
            ]
});

client.once("ready", () => {
    console.log("Ready!");
    client.user.setActivity("you through your window.", {type: ActivityType.Watching});
})

client.login(process.env.DISCORD_TOKEN);

client.on("messageCreate", (message) => {

    if(message.guildId === null){
        console.log(`====DIRECT Message====\n${message}`);
        const command = message.content.split(" ");
    }
    
    if(message.guildId !== null && message.content[0] == prefix){
        console.log(`====SERVER message====\n${message}`);
        const command = message.content.split(prefix);

        if(command[1] == "stalk"){

            const channel = client.channels.cache.get(vcId);

            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            })
        }

        if(command[1] == "caught"){
            const connection = getVoiceConnection(message.guildId);
            connection.destroy();
        }
    }
})