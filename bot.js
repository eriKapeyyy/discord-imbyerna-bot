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
  else if(input === 'gago' || input === 'gago ka') {
    msg.channel.send('Mas gago ka ulul');
  }
  else if(input === 'fancy') {
    msg.channel.send('youuu');
  }
  else if(input === 'you make me') {
    msg.channel.send('feel special');
  }
});

/*display avatar*/
client.on('message', msg => {
  if (msg.content === 'ano avatar ko') {
    msg.channel.send('Ayan na putangina ka\n' + msg.author.avatarURL);
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

/*music bot*/
const {
    prefix,
    token
} = require('./package.json');
const ytdl = require('ytdl-core');
const queue = new Map();

client.on('message', async message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
  
  const serverQueue = queue.get(message.guild.id);
  
  if(message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  }
  else if(message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  }
  else if(message.content.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
    return;
  }
});

async function execute(message, serverQueue) {
  const args = message.content.split(' ');
  const voiceChannel = message.member.voiceChannel;
  const permissions = voiceChannel.permissionsFor(message.client.user);
  
  if(!voiceChannel) {
    return message.channel.send('Hoy nasa voice channel ka dapat tanga');
  }
  
  if(!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
    return message.channel.send('Hoy kailangan ko ng permission para makasali sa voice channel gunggong');
  }
  
  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.title,
    url: songInfo.video_url,
  };
  
  if(!serverQueue) {
    const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
			return message.channel.send(err);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		return message.channel.send(`Ayan na! ${song.title} nadagdag na sa pa-queue!`);
  }
}

function skip(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('Tanga nasa voice channel ka dapat para maskip yung music!');
	if (!serverQueue) return message.channel.send('Walang isskip shunga!');
	serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('Tanga nasa voice channel ka dapat para matigil yung music!');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', () => {
			console.log('Tapos na tangina!');
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => {
			console.error(error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}

client.login(process.env.BOT_TOKEN)
