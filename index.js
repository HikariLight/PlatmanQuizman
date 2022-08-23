const { Client, GatewayIntentBits, ActivityType, Partials } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource, getVoiceConnections } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
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
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildVoiceStates
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

        if(command[0] == "play"){
            const player = createAudioPlayer();
            const stream = ytdl(command[1], { filter: 'audioonly' });
            const resource = createAudioResource(stream);

            const [voiceConnection] = getVoiceConnections().values(); // Idk what's going on with getVoiceConnection so I have to use this.

            try{
                voiceConnection.subscribe(player);
                player.play(resource);
                message.channel.send("Playing!");

                if(command[2] !== undefined){
                    setTimeout(() => player.pause(), parseInt(command[2]) * 1000);
                }

            } catch(error){
                console.log(error);
            }
        }

        if(command[0] == "pause"){
            try{
                player.pause()
                message.channel.send("Paused.");
            } catch(error){
                console.log(error);
            }
        }
    }

    if(message.guildId !== null && message.content[0] == prefix){
        console.log(`====SERVER message====\n${message}`);
        const command = message.content.split(prefix);

        if(command[1] == "stalk"){

            const voiceChannel = client.channels.cache.get(vcId);

            const voiceConnection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            })

            voiceConnection.on('stateChange', (oldState, newState) => {
                console.log(`Connection transitioned from ${oldState.status} to ${newState.status}`);
            });

            message.channel.send("boutta stalk you *real* good bby gurl ;)");
        }

        if(command[1] == "caught"){
            const voiceConnection = getVoiceConnection(message.guildId);

            if(voiceConnection !== undefined){
                voiceConnection.destroy();
                message.channel.send("NUUUU IT WASNT ME OFFICER!!");
            }
        }
    }
})