const { getVoiceConnection } = require("@discordjs/voice");
module.exports = {
    name: "resume",
    description: "Resumes the current, paused Track",
    run: async (client, interaction, args, prefix) => {
        if(!interaction.member.voice.channelId) return interaction.reply("👎 **Please join a Voice-Channel first!**").catch(() => null);
        // get an old connection
        const oldConnection = getVoiceConnection(interaction.guild.id);
        if(!oldConnection) return interaction.reply("👎 **I'm not connected somewhere!**").catch(() => null);
        if(oldConnection && oldConnection.joinConfig.channelId != interaction.member.voice.channelId) return interaction.reply("👎 **We are not in the same Voice-Channel**!").catch(() => null);
        
        const queue = client.queues.get(interaction.guild.id); // get the queue
        if(!queue) { 
            return interaction.reply(`👎 **Nothing playing right now**`).catch(() => null);
        }
        // if already paused
        if(!queue.paused) return interaction.reply(`👎 **Track is not paused**`).catch(() => null);
        
        queue.paused = false;
        
        // skip the track
        oldConnection.state.subscription.player.unpause();
        
        return interaction.reply(`▶️ **Successfully resumed the Track**`).catch(() => null);
    },
};