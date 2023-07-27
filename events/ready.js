const { ActivityType } = require("discord.js")

module.exports = (client) => {
    console.log("Ready!")
    client.user.setActivity("you through your window.", {
        type: ActivityType.Watching,
    })
}
