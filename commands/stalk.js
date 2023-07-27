const { joinVoiceChannel, VoiceConnectionStatus } = require("@discordjs/voice")
require("dotenv").config()

module.exports = (message) => {
    if (!message.member.voice?.channel)
        return message.channel.send(
            "Where am I supposed to go? Connect to a Voice Channel bish."
        )

    const voiceChannel = message.member.voice?.channel

    const voiceConnection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    })

    voiceConnection.on("stateChange", (oldState, newState) => {
        console.log(
            `Connection transitioned from ${oldState.status} to ${newState.status}`
        )
        if (
            oldState.status === VoiceConnectionStatus.Ready &&
            newState.status === VoiceConnectionStatus.Connecting
        ) {
            voiceConnection.configureNetworking()
        }
    })

    message.channel.send("boutta stalk you *real* good bby gurl ;)")
}
