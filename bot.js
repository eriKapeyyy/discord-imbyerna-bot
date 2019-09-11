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
  else if(msg.content.toLowerCase() === 'mahal niya ba ako?' || msg.content.toLowerCase() === 'mahal ba ko?' || msg.content.toLowerCase() === 'mahal niya ba ko' || msg.content.toLowerCase() === 'mahal ba ko' || msg.content.toLowerCase() === 'mahal nya ba ko') {
    msg.channel.send('Di ka niya mahal');
  }
  else if(msg.content.toLowerCase() === 'iloveyou' || msg.content.toLowerCase() === 'mahal kita' || msg.content.toLowerCase() === 'i love you' || msg.content.toLowerCase() === 'ily') {
    msg.channel.send('Di kita mahal');
  }
  else if(msg.content.toLowerCase() === 'putangina'|| msg.content.toLowerCase() === 'putang ina' || msg.content.toLowerCase() === 'putangina mo' || msg.content.toLowerCase() === 'putang ina mo') {
    msg.channel.send('Putangina mo rin inaano ka ba diyan gago ka');
  }
});

/*display avatar*/
client.on('message', message => {
  if (message.content === 'ano avatar ko') {
    message.channel.send('Ayan na putangina ka\n' + message.author.avatarURL);
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
