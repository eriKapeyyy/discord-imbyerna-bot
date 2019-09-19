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
  var words = {"pakyu", "tangina", "putangina"};
  var inc = input.includes(words);
  var i; /*index*/
  
  for(i = 0; i < input.length; i++) {
    if(inc === 'pakyu') {
      msg.channel.send('Pakyu ka rin');
    }
    else if(inc === 'tangina' || inc === 'tang ina' || inc === 'tangina mo' || inc === 'tang ina mo') {
      msg.channel.send('Hoy tangina ka bawal magmura rito');
    }
    /*else if(inc === 'mahal niya ba ako?' || inc === 'mahal ba ko?' || inc === 'mahal niya ba ko' || inc === 'mahal ba ko' || inc === 'mahal nya ba ko') {
      msg.channel.send('Di ka niya mahal');
    }
    else if(inc === 'iloveyou' || inc === 'mahal kita' || inc === 'i love you' || inc === 'ily') {
      msg.channel.send('Di kita mahal');*/
    }
    else if(inc === 'putangina'|| inc === 'putang ina' || inc === 'putangina mo' || inc === 'putang ina mo') {
      msg.channel.send('Putangina mo rin inaano ka ba diyan gago ka');
    }
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
