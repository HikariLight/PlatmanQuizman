const fs = require("fs")

module.exports = async (message) => {
    message.channel.send("Training to maximize my stalker stats >:)")

    const messages = []

    let messagePointer = await message.channel.messages
        .fetch({ limit: 1 })
        .then((messagePage) =>
            messagePage.size === 1 ? messagePage.at(0) : null
        )

    while (messagePointer) {
        await message.channel.messages
            .fetch({ limit: 100, before: messagePointer.id })
            .then((messagePage) => {
                messagePage.forEach((msg) =>
                    messages.push({
                        author: msg.author.username,
                        content: msg.content,
                        timestamp: msg.createdTimestamp,
                    })
                )

                messagePointer =
                    0 < messagePage.size
                        ? messagePage.at(messagePage.size - 1)
                        : null
            })
    }

    const saveFileName = `${message.channel.guild.name}-${message.channel.name}.json`
    const data = JSON.stringify(messages)
    fs.appendFile(saveFileName, data, (err) => {
        if (err) throw err
        console.log("Saved messages!")
    })
}
