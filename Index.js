//by adcrs i am a inntermidiate scripter im good at lua in bad at js so dont ask why code is so messed and bad
const {
    Client,
    Intents,
    MessageEmbed
} = require("discord.js");
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    getVoiceConnection,
    AudioPlayer,
    StreamType,
    entersState,
    VoiceConnectionStatus
} = require("@discordjs/voice");
const {
    addSpeechEvent
} = require("discord-speech-recognition");
const translate = require('@iamtraction/google-translate');
const fs = require('fs')
const {
    getAudioUrl

} = require('google-tts-api')

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
});

const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

addSpeechEvent(client);

client.on("messageCreate", (msg) => {
    const content = msg.content.toLowerCase()

    if (!msg.channel.type === 'DM') return false

    if (content == "ben wanna talk?") {
        const voiceChannel = msg.member?.voice.channel;
        if (voiceChannel) {
            joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                selfDeaf: false,
            });

            const connection = getVoiceConnection(msg.guild.id)
            const player = createAudioPlayer();
            const resource = createAudioResource("./Sounds/Ben.mp3", );
            async function play() {
                await player.play(resource)
                connection.subscribe(player);
            }


            play()

        } else {
            msg.channel.send("Ben cant work he grumy,join the voice channel")
        }
    }

    if (content == "ben help") {


        const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('TIP! ben takes 2-3 seconds to process your voice **ALSO HE CAN LEAVE ANYTIME IF HE HATES YOU**')
            .setURL('https://discord.gg/jExcmbpw')
            .setAuthor({
                name: 'Ben',
                iconURL: 'https://cdn.discordapp.com/attachments/953998048537755658/954253812154122270/Z.png',
                url: 'https://www.google.com'
            })
            .setDescription('Ben helps')

            .addFields({
                name: 'ben help',
                value: 'sends help'
            }, {
                name: 'leave + "ur chat/question"',
                value: 'Ask him to leave vc',
                inline: true
            }, {
                name: 'ben wanna talk?',
                value: 'join a vc to talk with ben',
                inline: true
            }, {
                name: 'hello + "ur chat/question"',
                value: 'Ask him question',
                inline: true
            }, {
                name: 'eat"',
                value: 'Fat dog eats something',
                inline: true
            }, {
                name: 'do you love god"',
                value: 'nopp.',
                inline: true
            })



            .setTimestamp()
            .setFooter({
                text: 'Insert ben',
                iconURL: 'https://cdn.discordapp.com/attachments/953998048537755658/954253812154122270/Z.png'
            });

        msg.channel.send({
            embeds: [exampleEmbed]
        });

    }

});
var randoms = [
    "./Sounds/hoho.mp3",

    "./Sounds/yes.mp3",
    "./Sounds/no.mp3",
    "./Sounds/ugh.mp3"
]
var eats = [
    "./Sounds/drink.mp3",
    "./Sounds/eat.mp3",
]

var splits = [
    'translate'
]
const eating = false
client.on("speech", (msg) => {
    if (eating == true) {} else {
        var dr = Math.random(1, 10)
        if (dr == 8) {

            const connection = getVoiceConnection(msg.guild.id)
            const player = createAudioPlayer();
            const resource = createAudioResource("./Sounds/hang.mp3");
            async function play() {
                await player.play(resource)
                connection.subscribe(player);
            }


            play()
            eating = true

            setTimeout(function() {
                connection.destroy()
            }, 3000);
        } else {
            if (msg.content) {




                var msg1 = msg.content.toLowerCase();

                console.log(msg1)




                if (msg1.includes("hello")) {
                    const Response = Math.floor(Math.random() * randoms.length);

                    console.log("Got Prom")
                    const connection = getVoiceConnection(msg.guild.id)
                    const player = createAudioPlayer();
                    const resource = createAudioResource(randoms[Response]);
                    async function play() {
                        await player.play(resource)
                        connection.subscribe(player);
                    }


                    play()

                }
                if (msg1.includes("left")) {

                    const connection = getVoiceConnection(msg.guild.id)
                    console.log("left")

                    connection.destroy()

                }
                if (msg1.includes("do you love god")) {
                    const connection = getVoiceConnection(msg.guild.id)
                    const player = createAudioPlayer();
                    const resource = createAudioResource("./Sounds/god.mp3");
                    async function play() {
                        await player.play(resource)
                        connection.subscribe(player);
                    }

                    const voiceChannel = msg.member?.voice.channel;
                    voiceChannel.members.forEach((x) => {
                        try {
                            if (x.id !== "954278215810174976") {
                                x.voice.setMute(true)
                            } else {



                            }
                        } catch (err) {

                            //let's catch, inform about error and log it

                            return console.log(err);
                        }
                    })

                    play()
                    setTimeout(function() {
                        const voiceChannel = msg.member?.voice.channel;
                        voiceChannel.members.forEach((x) => {
                            try {
                                x.voice.setMute(false)
                                if (x.id !== "954278215810174976") {
                                    x.voice.disconnect();
                                } else {



                                }

                            } catch (err) {

                                //let's catch, inform about error and log it

                                return console.log(err);
                            }
                        })


                        connection.destroy()
                    }, 20000);
                }
                if (msg1.includes("eat")) {
                    const Response = Math.floor(Math.random() * eats.length);

                    console.log("Got Prom")
                    const connection = getVoiceConnection(msg.guild.id)
                    const player = createAudioPlayer();
                    const resource = createAudioResource(eats[Response]);
                    async function play() {
                        await player.play(resource)
                        connection.subscribe(player);
                    }


                    play()
                    eating = true

                    setTimeout(function() {
                        eating = false
                    }, 10000);

                }
            }
        }

    }
});


client.on('voiceStateUpdate', (oldState, newState) => {


    if (oldState.channelID !== oldState.guild.me.voice.channelID || newState.channel)
        return;

    if (!oldState.channel.members.size - 1)
        setTimeout(() => {
            if (!oldState.channel.members.size - 1)
                oldState.channel.leave();
        }, 300000);
});

client.on("ready", () => {
    console.log("Ready!");
    client.user.setActivity('IShowSPEED and adcrs', {
        type: 'WATCHING'
    });
});

client.login("OTU0Mjc4MjE1ODEwMTc0OTc2.YjQy2A.eymm83_D9iNejw_XiEDn1uwSIoU");
