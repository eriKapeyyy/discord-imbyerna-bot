const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

/*attendance*/
client.on('message', msg => {
  if(msg.content === '!present') {
    msg.reply('you already have attendance for today!');
  }
});

/*new member server*/
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'general');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});

/*imbyerna*/
client.on('message', msg => {
  if(msg.content.toLowerCase() === 'pakyu') {
    msg.channel.send('Pakyu ka rin');
  }
  else if(msg.content.toLowerCase() === 'tangina' || msg.content.toLowerCase() === 'tang ina' || msg.content.toLowerCase() === 'tangina mo' || msg.content.toLowerCase() === 'tang ina mo') {
    msg.channel.send('Hoy tangina ka bawal magmura rito');
  }
});

client.login(process.env.BOT_TOKEN)
