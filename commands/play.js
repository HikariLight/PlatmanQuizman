const { createAudioResource, getVoiceConnections, getVoiceConnection, createAudioPlayer } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

const player = createAudioPlayer();

module.exports = (message, command) => {
    const stream = ytdl(command[1], { filter: 'audioonly' });
    const resource = createAudioResource(stream);

    const [voiceConnection] = getVoiceConnections().values();

    try{
        voiceConnection.subscribe(player);
        player.play(resource);
        message.channel.send("Playing!");

        if(command[2] !== undefined){
            let duration = parseInt(command[2]) + 1; // There's always a 1 second delay before playing starts which takes up actual playing time.
            setTimeout(() => player.pause(), duration * 1000);
        }

    } catch(error){
        console.log(error);
    }
}