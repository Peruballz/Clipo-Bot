const Discord = require('discord.js');
const client = new Discord.Client();
const {token} = require('./config.json');
require('events').EventEmitter.defaultMaxListeners = 35
const ytdl = require('ytdl-core');
const PREFIX = '?'
const Canvas = require('canvas');
const {MessageAttachment} = require('discord.js');


// Al inicio del bot.
client.on('ready', () => {
    console.log('Hola Mundo!') // Mensaje al enviar cuando se active.
    client.user.setActivity('Windows 98.',{ type:'STREAMING' })
});
//Comando Si
client.on('message', msg => {
    if(msg.content.startsWith(`?si`)) {
      msg.reply('Sí.')
   }
});
// Comando HELP
client.on('message', msg => {
    if(msg.content.startsWith(`?help`)) {
    const help = new Discord.MessageEmbed()
    .setTitle('📎 Clipo-Bot 📎')
    .setDescription('Soy un clip.')
    .addField('🔒 | Moderación', '`ban kick say embedsay poll`, más info: `hmod`', false)
    .addField('💿 | Música', '`join leave play(Sólo Links) stop`', false)
    .addField('🏓 | Diversión', '`guess confession 8ball buscaminas(BETA) impostor dado moneda`', false)
    .addField('📄 | Información', '`ping invite covid19`', false)
    .addField('📸 | Imágenes', '`gay avatar icono`', false)
    .setColor(0xffffff)
    .setFooter('sí');
    msg.channel.send(help)
    }
});
// Comando SAY
client.on('message', msg => {
    if(msg.content.startsWith(`?say`)) {
    const sayMessage = msg.content.substring(4)
    if(!sayMessage) return msg.channel.send('Escribe algo, lol.')
    msg.delete().catch(O_o=>{});
    msg.channel.send(sayMessage)
    }
});
// Comando KICK
client.on('message', message => {
    if (!message.guild) return;
  
    if (message.content.startsWith(`?kick`)) {
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member
            .kick('Razon opcional')
            .then(() => {
              // Cuando se pudo kickear al usuario.
              message.reply(`Ha sido kickeado ${user.tag} exitosamente 8).`);
            })
            .catch(err => {
              // Por si ocurre un error al kickear al usuario.
              message.reply('No se pudo kickear al usuario, lol.');
              // Se muestra el error en la consola.
              console.error(err);
            });
        } else {
          // Cuando el usuario no se ha encontrado.
          message.reply("Usuario no encontrado.");
        }
        // Cuando el usuario no es mencionado.
      } else {
        message.reply("No has mencionado al usuario, lmao");
      }
    }
  });
// Comando BAN
  client.on('message', message => {
    if (!message.guild) return;
    if (message.content.startsWith('?ban')) {
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member
            .ban({
              reason: 'Nose!',
            })
            .then(() => {
              message.reply(`Se ha baneado a ${user.tag} exitosamente 8).`);
            })
            .catch(err => {
              message.reply('No se pudo banear al usuario 8(.');
              console.error(err);
            });
        } else {
          message.reply("No se pudo encontrar al usuario.");
        }
      } else {
        message.reply("No has mencionado al usuario xd...");
      }
    }
  });
// Comando JOIN
client.on('message', async message => {
    if(message.content.startsWith(`?join`)) {	// Cuando alguien escribe algo que comienze con ?join
        if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join(); // Hará que el bot se conecte al canal de voz donde estás.
        message.channel.send('Me he conectado correctamente.') // Mensaje a enviar.
         }
    } // Comando LEAVE
    if(message.content.startsWith(`?leave`)) {
        if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.leave();
        message.channel.send('Me he desconectado correctamente.')
         }
    }
});
// Comando EMBEDSAY
client.on('message', message => {
  if(message.content.startsWith(`?embedsay`)) {
  const sayMessage = message.content.substring(9)
  if(!sayMessage) return message.channel.send('eSCRIBE ALGO CSM.')
  const embedSay = new Discord.MessageEmbed()
  .setTitle('')
  .setDescription(sayMessage);
  message.delete().catch(O_o=>{});
  message.channel.send(embedSay)
  }
});
// Comando HMOD
client.on('message', message => {
  if(message.content.startsWith(`?hmod`)) {
  const hmod = new Discord.MessageEmbed()
  .setTitle('Comandos de Moderación')
  .setDescription('Información de los comandos de Moderación.')
  .setColor(0x0000ff)
  .addField('Kick', 'Expulsa a un usuario.', false)
  .addField('Ban', 'Banea a un usuario.', false)
  .addField('Say', 'Escribe algo después del comando, el bot lo repetirá.', false)
  .addField('Poll', 'Crea una encuesta.', false)
  .addField('Embedsay', 'Escribe algo después del comando, el bot lo repetirá, pero en un Embed.', false)
  .setFooter('Nose Bot | nose');
  message.channel.send(hmod)
  }
});

client.on('message', message => {
  if (message.content.startsWith(`?ping`)) {  
    message.channel.send(`📡Latencia: ${Date.now() - message.createdTimestamp}ms. Discord API: ${Math.round(client.ws.ping)}ms`);
  }
});

var guesses;
var num = 0;

client.on('message', message => {
    var mes = message.content.split(" ");
    if(message.content == '?pick') {
        message.channel.send('Se ha elegido un número aleatorio entre 1 y 100, responde con ?guess (número) ');
        num = Math.floor((Math.random() * 100) + 1);
        guesses = 0;
    }
    if(mes[0] == '?guess') {
        if (num == 0)
        {
            message.channel.send('Se ha elegido un número aleatorio entre 1 y 100, responde con ?guess (número)');
            num = Math.floor((Math.random() * 100) + 1);
            guesses = 0;
        }
        else if(mes[1] == num)
        {
            guesses++;
            message.channel.send('Lo conseguiste! Solo tomó ' + guesses + ' intentos.');
            num = Math.floor((Math.random() * 100) + 1);
            guesses = 0;
        }
        else if(mes[1] < num)
        {
            message.reply(mes[1] + ' es muy bajo!');
            guesses++;
        }
        else if(mes[1] > num)
        {
            message.reply(mes[1] + ' es muy grande!');
            guesses++;
        }
    }
  

});
client.on('message', message => {
  if(message.content ==='bale👍') {
    message.react('👍')
  }
});

client.on('message', message => {
  if(message.content ==='<@520751349093367840>') {
    message.react('🖕')
  }
});

client.on('message', message => {
  if(message.content ==='<@670092576027705354>') {
    message.react('🌭')
  }
});

client.on('message', message => {
  if(message.content.startsWith(`?confession`)) {
  const sayMessage = message.content.substring(12)
  if(!sayMessage) return message.channel.send('No te falta algo más?')
  const embedSays = new Discord.MessageEmbed()
  .setTitle('*🤫 Confesión*')
  .setDescription(sayMessage)
  .setFooter('Si es una confesión, no se puede saber el autor.')
  message.delete().catch(O_o=>{});
  message.channel.send(embedSays)
  }
});

client.on('message', message =>{
  if(message.content.startsWith(`?8ball`)) {
    var rpts = ["Sí.", "No.", "¿Por qué?", "Tal vez.", "No sé.", "Definitivamente", " ¡Claro!", "Depende.", "No estés tán seguro de eso...", "No puedo responderte a eso."];
    if (!message) return message.reply(`Escriba una pregunta.`);
    const embedBall = new Discord.MessageEmbed()
    .setTitle('🎱 Bola Mágica')
    .setDescription('Responde tus dudas.')
    .addField('Pregunta', message.content.substring(7), false)
    .addField('Respuesta', rpts[Math.floor(Math.random() * rpts.length)]+'', false);
    message.channel.send(embedBall)
   }
})

client.on('message', message => {
 if (message.content.startsWith('?avatar')) {
   let user = message.mentions.users.first();
   if(!user) user = message.author;
   let color = message.member.displayHexColor;
   if (color == '#000000') color = message.member.hoistRole.hexColor;
   const embed = new Discord.MessageEmbed()
   .setTitle(user.username)
   .setImage(user.avatarURL())
   .setColor(color);
    message.channel.send({embed});
 }
});

client.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

  const messageArray = message.content.split(' ');
	const cmd = messageArray[0];
	const args = messageArray.slice(0);

    if (cmd === '?poll'){
        let pollChannel = message.mentions.channels.first();
        let pollDescription = args.slice(1).join(' ');
       if (!pollDescription) return message.reply(`No me jodas, escribe algo!`);

        let embedPoll = new Discord.MessageEmbed()
        .setTitle('Encuesta!')
        .setDescription(pollDescription)
        .setColor('YELLOW')
        let msgEmbed = await message.channel.send(embedPoll);
        await msgEmbed.react('👍')
        await msgEmbed.react('👎')
    }

});

client.on('message', message => {
  if(message.content === '?buscaminas') {
  const choices = ["||:zero:||", "||:one:||", "||:two:||", "||:three:||", "||:four:||", "||:five:||", "||:six:||", "||:seven:||", "||:eight:||","||:bomb:||"];
  const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 
  const bomb = 9; 
  let bombas = 20; 
  
  let row = number[Math.floor(Math.random() * number.length)];
  let column = number[Math.floor(Math.random() * number.length)];
  
  var buscaminas=new Array(10); 

  for (let i = 0; i < 10; i++){
    buscaminas[i]=new Array(10); 
  }

  for (let i = 0; i<10; i++){
    for (let j = 0; j<10 ;j++){
      buscaminas[i][j] = 0;		
    }
  }
  while (bombas != 0) { 
    while(buscaminas[row][column]==9){ 
        row = number[Math.floor(Math.random() * number.length)]; 
        column = number[Math.floor(Math.random() * number.length)];
    }
    
      bombas = bombas-1;
      buscaminas[row][column] = 9;
      
    
     let iteri = 3; 

		for (let i = 0; i < iteri; i++) {
			let iterj = 3; 
			if (row == 0 && i == 0)
				i++; 
			if (row == 10 - 1 && i == 0)
				iteri--; 
			for (let j = 0; j < iterj; j++) {
				if (column == 0 && j == 0)
					j++; 
				if (column == 10 - 1 && j == 0)
					iterj--;
				if (i != 1 || j != 1)
					if (buscaminas[row + i - 1][column - 1 + j] != bomb) 
						buscaminas[row + i - 1][column - 1 + j]++;
			}
		}
      
    }
  
   
  for (let i = 0; i<10; i++){
    for (let j = 0; j<10;j++){
        buscaminas[i][j] = choices[buscaminas[i][j]];
    }
  }
  
  return message.channel.send(buscaminas);
  }
});
client.on('message', message => {
if(message.content === '?impostor') {
const mencionado = message.mentions.members.first() 
let impostor = [
"No era el impostor",
"Era el impostor"
] 

if(!mencionado)

 return message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.

　　　.　　　 　　.　　　　　。　　 。　. 　

.　　 。　　　　　 ඞ 。 . 　　 • 　　　　•

　　ﾟ　　 ${message.author.username} ${impostor[Math.floor(Math.random() * impostor.length)]} 　 。　.

　　'　　　 ${Math.floor(Math.random() * 3) + 1} Impostores restantes 　 　　。

　　ﾟ　　　.　　　. ,　　　　.　 .`) 
message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.

　　　.　　　 　　.　　　　　。　　 。　. 　

.　　 。　　　　　 ඞ 。 . 　　 • 　　　　•

　　ﾟ　　 ${mencionado.user.username} ${impostor[Math.floor(Math.random() * impostor.length)]} 　 。　.

　　'　　　 ${Math.floor(Math.random() * 3) + 1} Impostores restantes 　 　　。

　　ﾟ　　　.　　　. ,　　　　.　 .`)
}
});


client.on('message', message => {
  if(message.content === '?comandos') {
    message.channel.send('Usa ?help para continuar, si tienes idea de comandos, no dudes en sugerirmelas.')
  }
});

client.on('message', message => {
  if(message.content === '?raid') {
    message.channel.send('¿Qué pensabas que iba a pasar?, LOOOL')
  }
});

client.on('message', message => {
  if(message.content ==='Clipo, tas?') {
    message.react('📎')
  }
});

client.on('message', message => {
if(message.content === '?gay'){

  let persona = message.mentions.users.first(); 
  if (!persona) persona = message.author; 
  let link = `https://api.alexflipnote.dev/filter/gay?image=${persona.displayAvatarURL({ format: "png" })}`;

  let embedGay = new Discord.MessageEmbed() 
      .setImage(link)
      .setColor("RANDOM");
  
  message.channel.send(embedGay) 
 } 
});

client.on('message', message => {
  if(message.content.startsWith(`${PREFIX}dado`)){ // Si el mensaje empieza con ?dado
  const dado = // Constante dado.
  ['1', '2', '3', '4', '5', '6']; // Valor de la constante.
  
  message.channel.send('🎲 Ha salido: ' +  dado[Math.floor(dado.length * Math.random())]); //Enviará el embed con valor aleatorio con respecto a dado
  }
});
// Reacciones Test
client.on('message', message => {
  if(message.content ==='a💩') {
    message.react('🇦')
    message.react('💩')
  }
});
// Reacciones Test
client.on('message', message => {
  if(message.content.startsWith(`${PREFIX}invitar`)) { // Si el mensaje empieza con ?invitar:
    message.channel.send('Invítame a tu servidor dándole al sgte link: ???') // Enviará este mensaje.
  }
});

client.on('message', async message => {
  if(message.content === '?covid19') {
    try{
    let res = await require('node-fetch')(`https://corona.lmao.ninja/v2/all?yesterday=false`);
    let data = await res.json();
    let covid = new Discord.MessageEmbed() 
    .setTitle('Covid-19') 
    .addField('Casos', data.cases.toLocaleString(), true)
    .addField('Casos hoy', data.todayCases.toLocaleString(), true) 
    .addField('Muertes', data.deaths.toLocaleString(), true) 
    .addField('Muertes hoy', data.todayDeaths.toLocaleString(), true) 
    .addField('Condición critica', data.critical.toLocaleString(), true) 
    .addField('Recuperados', data.recovered.toLocaleString(), true) 
    .setColor('RANDOM')
    message.channel.send(covid)
}catch(e){
message.channel.send('Ha ocurrido un error!')  // Enviará en el canal este mensaje si se presenta un error.
}
  }
})

client.on('message', message => {
  if(message.content.startsWith(`${PREFIX}moneda`)){ // Si el mensaje empieza con ?moneda.
  const coin = ['Cara', 'Sello']; // Constante coin.
  
  message.channel.send('🪙 Ha salido: ' +  coin[Math.floor(coin.length * Math.random())]); // Enviará un mensaje en el cual saldrá un valor aleatorio con respecto a "coin"
  }
});

client.on('message', message => {
  if(message.content.startsWith(`${PREFIX}clipo`)) { // Si el mensaje empieza con ?clipo.
    const clipo = new Discord.MessageEmbed() // Constante clipo crea un nuevo Embed.
    .setTitle('_**Información de Clipo**_')
    .setDescription('Información de Clipo (?')
    .addField('Nombre:', '`Clipo`', false)
    .addField('Creado el:', '`04/08/2020`', false)
    .addField('Librería:', '`Discord.js v12.4.1`', false)
    .addField('Servidores en donde estoy:', '`5`', false)
    .addField('Desarrollador:', '`oBal0n_#1864`', false)
    .addField('¿Handler?', '`Nope.`', false)
    .setThumbnail(`???`)
    .setFooter('Sí.');
    message.channel.send(clipo)
  }
});

client.on('message', async message => {

  const args = message.content.substring(PREFIX.length).split(' ') // Constante args.

  if(message.content.startsWith(`${PREFIX}play`)) { // Si el mensaje empieza con ?play.
  const canaldeVoz = message.member.voice.channel // Constante canaldeVoz.
  if(!canaldeVoz) return message.channel.send('Debes estar en un canal de voz.') // Si el ejecutor del comando, no está en un canal de voz, enviará este mensaje.
  const permisos = voiceChannel.permissionsFor(message.client.user) // Constante permisos.
  if(!permisos.has('CONNECT')) return message.channel.send('No tengo permisos para conectar al canal de voz.') // Si el bot, le falta los permisos de conectar
  if(!permisos.has('SPEAK')) return message.channel.send('No tengo permisos para hablar en el canal de voz.') // Si el bot, le falta los permisos para hablar, enviará este mensaje.

  try {
    const conexion = await canaldeVoz.join() // Constante conexion.
  } catch (error) {
    console.log('Hubo un error al conectarse al canal.') // Si hay un error, la consola enviará este.
    return message.channel.send('Hubo un error al conectar.') // Enviará un mensaje al canal donde se ejecutó el comando.
  }
  
  const dispatcher = conexion.play(ytdl(args[1]))
  .on('finish', () => {
    message.channel.send('Terminé de reproducir.') // Al terminar, enviará este mensaje.
  })
  .on('error', error => {
    console.log(error) // Enviara a la consola el error.
  }) 
  dispatcher.setVolumeLogarithmic(5 / 5)
  } else if (message.content.startsWith(`${PREFIX}stop`)) { // Si el mensaje que se envia empieza con ?stop.
    if(!message.member.voice.channel) return message.channel.send('Necesitas estar en un canal de voz.') // Si hay un error.
    message.member.voice.channel.leave() // Salida del bot del canal de voz.
    return undefined
  }
});
client.on('message', async message => {
	if (message.content.startsWith(`${PREFIX}icono`)) {// Si el mensaje enviado empieza con ?icono,
    const servidor = message.guild; // Nueva constante llamada server.
    const iconoEmbed = new Discord.MessageEmbed() // Constante iconoEmbed creará un mensaje embed.
        .setColor(0xffffff) // El color a elegir es el blanco.
        .setTitle(servidor.name) // Nombre del servidor.
        .setURL(servidor.iconURL({dynamic: true}))  // Si va ser dinámico.
        .setImage(servidor.iconURL({size : 4096, dynamic: false})); // Dimensiones de la imagen. (Recomendada) 
message.channel.send(iconoEmbed) // Enviará el mensaje embed.
	}
});
client.login(process.env.TOKEN)
