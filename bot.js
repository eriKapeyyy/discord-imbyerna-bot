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
  
  var input = msg.content.toLowerCase(); /*to lower case the whole string*/

  if(input === 'pakyu') {
    msg.channel.send('Pakyu ka rin');
  }
  else if(input === 'tangina' || input === 'tang ina' || input === 'tangina mo' || input === 'tang ina mo') {
    msg.channel.send('Hoy tangina ka bawal magmura rito');
  }
  else if(input === 'mahal niya ba ako?' || input === 'mahal ba ko?' || input === 'mahal niya ba ko' || input === 'mahal ba ko' || input === 'mahal nya ba ko') {
    msg.channel.send('Di ka niya mahal');
  }
  else if(input === 'iloveyou' || input === 'mahal kita' || input === 'i love you' || input === 'ily') {
    msg.channel.send('Di kita mahal');
  }
  else if(input === 'putangina'|| input === 'putang ina' || input === 'putangina mo' || input === 'putang ina mo') {
    msg.channel.send('Putangina mo rin inaano ka ba diyan gago ka');
  }
  else if(input === 'fancy') {
    msg.channel.send('youuu');
  }
});

/*display avatar*/
client.on('message', msg => {
  if (msg.content === '=avatar ' + '@' + msg.author.id) {
    msg.channel.send('Ayan na putangina ka\n' + msg.author.displayAvatarURL);
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
