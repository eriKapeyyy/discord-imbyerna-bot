const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

/*attendance*/
client.on('message', msg => {
  if(msg.content === '!present') {
    msg.reply('You already have attendance for today!')
  }
});

/*new member server*/
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'member-log');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});

client.login(process.env.BOT_TOKEN)
