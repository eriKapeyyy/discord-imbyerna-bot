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
  if(msg.content.includes === 'pakyu') {
    msg.channel.send('Pakyu ka rin');
  }
  else if(msg.content.includes.toLowerCase() === 'tangina' || msg.content.includes.toLowerCase() === 'tang ina' || msg.content.includes.toLowerCase() === 'tangina mo' || msg.content.includes.toLowerCase() === 'tang ina mo') {
    msg.channel.send('Hoy tangina ka bawal magmura rito');
  }
  else if(msg.content.includes.toLowerCase() === 'mahal niya ba ako?' || msg.content.includes.toLowerCase() === 'mahal ba ko?' || msg.content.includes.toLowerCase() === 'mahal niya ba ko' || msg.content.includes.toLowerCase() === 'mahal ba ko' || msg.content.includes.toLowerCase() === 'mahal nya ba ko') {
    msg.channel.send('Di ka niya mahal');
  }
  else if(msg.content.includes.toLowerCase() === 'iloveyou' || msg.content.includes.toLowerCase() === 'mahal kita' || msg.content.includes.toLowerCase() === 'i love you' || msg.content.includes.toLowerCase() === 'ily') {
    msg.channel.send('Di kita mahal');
  }
});

/*send a message in a given time interval
client.on('message', function(msg) {
  if (msg.content === "$loop") {
    var interval = setInterval(function() {
      msg.channel.send('Hoy magrun na kayo @everyone')
      .catch(console.error);
    }, 1 * 1000);
  }
});*/

client.login(process.env.BOT_TOKEN)
