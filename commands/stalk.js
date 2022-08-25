const { joinVoiceChannel } = require('@discordjs/voice');
require('dotenv').config()

const vcId = process.env.vcId;

module.exports = (client, message) => {
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