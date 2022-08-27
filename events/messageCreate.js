const stalk = require("../commands/stalk");
const caught = require("../commands/caught");
const help = require("../commands/help");
const play = require("../commands/play");
const pause = require("../commands/pause");
const unpause = require("../commands/unpause");
const allowedUsers = require("../data.json")["allowedUsers"];

module.exports = (client, prefix, player, message) => {

    if(allowedUsers.includes(message.author.id)){
        if(message.guildId === null){
            const command = message.content.split(" ");

            console.log(`Direct message: ${message.content}`);

            switch(command[0]){
                case "play":
                    play(message, command, player);
                    break;

                case "pause":
                    pause(message, player);
                    break;

                case "unpause":
                    unpause(message, player);
                    break;
                default:
                    message.channel.send("Uh.. Try that again. The right way this time.");
            }
        }

        else if(message.guildId !== null && message.content.startsWith(prefix)){
            const command = message.content.split(prefix);

            console.log(`Server message: ${message.content}`);

            switch(command[1]){
                case "stalk":
                    stalk(message);
                    break;

                case "caught":
                    caught(message);
                    break;
                
                case "help":
                    help(message);
                    break;

                default:
                    message.channel.send("Tf did you just say to me?");
            }
        }
    }
}