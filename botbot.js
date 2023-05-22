//botbot.js requirements they will be slimmed down later on.
const { Client, IntentsBitField, GatewayIntentBits, VoiceState, VoiceStateManager,voiceAdapterCreator, VoiceChannel, Events } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
const { joinVoiceChannel, createAudioPlayer } = require('@discordjs/voice');
const { getVoiceConnection, createAudioResource, StreamType } = require('@discordjs/voice');
const { createReadStream } = require('node:fs');
const { join } = require('node:path');
const gTTS = require('gtts');
const fs = require('fs');
const { exec } = require('child_process');

//currently not in use
//var SpeechRecognition = SpeechRecognition;
//var recognition = new SpeechRecognition();
//const { speech_recognition } = require('spech_recognition') 
//import speech_recognition as sr
//const { createAudioPlayer } = require('@discordjs/voice');

//variables
const chanJo ="281552655912927242";
var joined = 0;
var chanJoined = "";
const voiceChannel="";
const iloc=525;
const GUILD_ID = process.env.Guild_ID;
const CLIENT_ID = process.env.Client_ID;
var word1 = 'Uwu Uwu Uwu Uwu Uwu Uwu Uwu Uwu Uwu Uwu Uwu';
var word2 = '';
var primp = '';
//var gtts = new gTTS(word1, 'en');
const keyword = 'genius'; // Keyword to detect
//var random1 =""; //unused


//intents for bot, don't really like how they do these, why not set them on the developer api page. constantly changeing it seems.
const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.GuildMessageTyping,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.DirectMessageReactions,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildInvites,
] });

/** 
//const client = new Client({ intents: [
IntentsBitField.Flags.Guilds,
IntentsBitField.Flags.GuildMessages,
IntentsBitField.Flags.MessageContent,
IntentsBitField.Flags.GuildMembers,
IntentsBitField.Flags.GuildVoiceStates,
IntentsBitField.Flags.DirectMessages,
IntentsBitField.Flags.GuildMessageTyping,
IntentsBitField.Flags.GuildMessageReactions,
IntentsBitField.Flags.DirectMessageReactions,
IntentsBitField.Flags.GuildVoiceStates,
IntentsBitField.Flags.GuildInvites,
]})
*/

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

var prampts ="";

 async function prompty(prampts) {
const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: prampts,
  max_tokens: 1200,
  n: 1,
  stop: null,
  temperature: 0.5,                            //change prampts to make requests.
});
console.log(completion.data.choices[0].text);
primp = completion.data.choices[0].text;
return completion.data.choices[0].text;
}

var petty ="";
//this function will set our personality prompt
async function setPet(petty) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: petty,
    max_tokens: 1200,
    n: 1,
    stop: null,
    temperature: 0.5,                            //change this to a physical file on the drive, to put all this information into a text file.
  });
  console.log(completion.data.choices[0].text);
  }

function getPrompt(){} //this will read our notecard and set the personality later on.

function sleep(ms) { //Some dumb function to time things, this is probably really poor code.
  return new Promise((resolve) => setTimeout(resolve, ms));
}


//var primp = prompty() setting this variable will change sendTTs methods input

async function saveTTS(primp){
  //word2 = primp; //d1 = primp; //change this to change the text it saves into mp3
  var gtts =  new gTTS(primp, 'en');
  gtts.save('file.mp3', function (err, result) {
    if(err) { throw new Error(err) }
    //console.log('Success! Open file file.mp3 to hear result.');
  });

  //const audio = connection.receiver.createStream(user, { mode: 'pcm' });
  //audio.pipe(fs.createWriteStream('user_audio'));

  //let resource = createAudioResource(join(__dirname, 'file.mp3'));

  //player.play(resource);


}//will handle all our sound output most likely will take our prompty functions output

//this should in theory record audio to to a user_audio.pcm file
function recordtoFile(){
  const audio = connection.receiver.createStream(user, { mode: 'pcm' });
  audio.pipe(fs.createWriteStream('user_audio.pcm'));
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
    //sendTTS();
    //setPet() uncomment this to use the personality prompt later.      
})
  
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  //var member0 = message.guild.members.cache.get(process.env.Client_ID);
  const guild = message.guild
  const myVoiceChannel = guild.channels.cache.find(channel => channel.type === 'GUILD_VOICE' && channel.members.has(message.author.id));
  const connection = getVoiceConnection(GUILD_ID);
  const member = message.guild.members.cache.get(CLIENT_ID);

  if (message.content === '!join'){  //make this boii join our channel, we gotta do some bot manipulation
    if (!chanJo) return console.error("channel is missing or wrong id");
    if (joined == 0) {
    //message.reply("joining channel...");

    joinVoiceChannel({
        channelId: chanJo,
        guildId: GUILD_ID,
        selfDeaf: false,
        selfMute: false,
        adapterCreator: message.guild.voiceAdapterCreator
    })

    joined = 1;

    chanJoined = chanJo;
    //while (true){listenTTS();}
  }}
  
  if (message.content === '!disconnect' || message.content === '!disc'){
    try {connection.destroy(); joined = 0;
  }
    catch (error){
      console.error('error occured trying to leave vc');
    }
  }

  //trying to understand how audioplayer works here.
  //AudioPlayer#pause(), AudioPlayer#unpause(), and AudioPlayer#stop().

  //const resource = createAudioResource('/home/user/voice/track.mp3'); example of user source to play.
  
  if (message.content === '!test') {
    const resource = createAudioResource('file.mp3');
    const player = createAudioPlayer();
    const sam = connection.subscribe(player);
    sam.player.play(resource);
  }

  if (message.content.startsWith('!gpt')) {
    //message.content // we need to read this bullshit for everything after !gpt
    var mans = message.content;
    //console.log('message content is :' , message.content);
    var not = mans.trim();
    //console.log('error : 1');
    var hot = not.length;
    //console.log('error : 2');
    var skraa = not.substring(5, hot);
    //console.log('error : 3');
    var ting = skraa;
    //console.log('error : 4', ting);
    var quest = prompty(ting); //we gotta set the question here.
    //sleep(9000);
    //console.log('error : 5', quest);
    //primp = quest;
    //console.log('error : 6', primp);
    //saveTTS(primp);    
  }

  if(message.content ===('!savegpt')){
    saveTTS(primp);
  }

  //var slimp = "";
  function listenTTS(){ //allright we should describe what is going on here. setting up the listening interface. from voiceconnection.
    const channel = message.member.voice.channel;
    //const connection = await channel.join();
    const receiver = connection.receiver;

  receiver.speaking.on('start', (userId) => { //triggers an event on user speaking, gets a user returs their username
      const user = client.users.cache.get(userId);
      console.log(`Bot is now listening to ${user.username}`);
      convertAudioToText(data);
      //where we need to listen for keyword, if keyword is not heard, do not record audio.
    });

    receiver.speaking.on('end', (userId) => {
      const user = client.users.cache.get(userId);
      //when keyword has been spoken and user stops speaking
      console.log(`Bot stopped listening to ${user.username}`);
    });

    //def transcribe_audio_to_text(filename):     
    //with sr.AudioFile(filename) as source:
    //    audio = recognizer.record(source)
    //    try:
    //        return recognizer.recognize_google(audio)
    //    except:
    //        print('Skipping unknown error')
    //converting audio to text takes a filename
  }

  function tatt(fefifofum){
    const command = `ffmpeg -f s16le -ar 48k -ac 2 -i ${fefifofum} -acodec pcm_s16le -f wav -`;
    exec(command, ( error,stdout,stderr) => {
      if (error) {
        console.error('Error converting audio:', error);
        return;
      }
      const recognizedText = stdout.toString();
      console.log('Recognized text:', recognizedText);
    }
    )
  }
  
  function convertAudioToText(audioData) { // Implement your speech recognition logic here convert audio to text

    var textda = "";
    return textda;
  } // This function should return the recognized text from the audio data
  
  if (message.content === '!ping') {  //just a leftover method from discord bot beginner example.
    message.channel.send('pong');
  }

})

//connection.on(VoiceConnectionStatus.Ready, () => {
//	console.log('The connection has entered the Ready state - ready to play audio!');
//});

client.login(process.env.DISCORD_TOKEN);    //if nothing happens we are running the bot here, takes our token.


//Section of garbage i may not need later.

/** import * from os
import discord
from discord.ext import commands
from discord.utils import get
import node
//trying to aquire the stuff we need from voice channels
VC = node.require('discordjs/voice')
from dotenv import load_dotenv
load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')
client = discord.Client(intents=discord.Intents.default())
@client.event
async def on_ready():
    print(f'{client.user} has connected to Discord!')   //next line should contain obligatory connect to the voice channel.

*/

//#    VC.joinVoiceChannel({

//#    }
//#    )

//lets try and connect it to a voice channel here??
//bot = commands.Bot(intents= discord.Intents.default(), command_prefix='!')
//voice = get(bot.voice_clients, guild=bot.guilds)
//channel = 'Voice1'
//if voice :
//voice.move_to(channel)
    
//async def main():{

//}

// client.run(TOKEN)

/**
#voice.channel.join()
#const { getVoiceConnection } = require('@discordjs/voice');
#const connection = getVoiceConnection(myVoiceChannel.guild.id);
#channy = client.fetch_channel()
#channy2 = client.get_channel ()
#channy2.connect (*,timeout: float = 60, reconnect: bool = True, cls: ((Client, Connectable) -> T@connect) = VoiceClient, 
#self_deaf: bool = False, self_mute: bool = False)
#((*, timeout: float = 60, reconnect: bool = True, cls: ((Client, Connectable) -> T@connect) = VoiceClient, 
#self_deaf: bool = False, self_mute: bool = False) -> Coroutine[Any, Any, T@connect]) | Any
#import requests
#discJs = node.require('discord.js')
#@bot.command()
# #async def join(ctx):
# # Check if the user is in a voice channel
# #if not ctx.author.voice:
# #   await ctx.send("You are not connected to a voice channel.")
# #return
# Get the voice channel that the user is connected to
#channel = ctx.author.voice.channel
# Connect to the voice channel
#voice = get(bot.voice_clients, guild=ctx.guild)
#else:
#voice = await channel.connect()
#await ctx.send(f"Connected to {channel}.")
*/

/*
openai.api_key = API_KEY

#initialize the speec to text engine
engine = pyttsx3.init()

#Voice Section we gonna fuck around here with the voice output replace converter with what you named your pyttsx3.init() variable
# Sets speed percent 
# Can be more than 100
#converter.setProperty('rate', 150)
# Set volume 0-1
#converter.setProperty('volume', 0.7)

#Setting the voice for the text to speech engine
voice_id = "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\TTS_MS_EN-GB_HAZEL_11.0"

#engine settings - setting the voice here
engine.setProperty('voice', voice_id)

recognizer = sr.Recognizer()

def transcribe_audio_to_text(filename):
     
    with sr.AudioFile(filename) as source:
        audio = recognizer.record(source)
        try:
            return recognizer.recognize_google(audio)
        except:
            print('Skipping unknown error')
                
def generate_response(prompt):
    response = openai.Completion.create(
        engine="text-davinci-001",
        prompt=prompt,
        max_tokens=1200,
        n=1,
        stop=None,
        temperature=0.5,
   )
    return response["choices"][0]["text"]

def speak_text(text):
    engine.say(text)
    engine.runAndWait()

def main():
    while True:
        # Wait for user tosay "Frey"
        print("Say 'genius' to start your question...")
        with sr.Microphone() as source:
            recognizer = sr.Recognizer()
            audio = recognizer.listen(source)
            try:
                transcription = recognizer.recognize_google(audio)
                if transcription.lower() == "genius":
                    #record audio
                    filename = "input.wav"
                    print("Say your question...")
                    with sr.Microphone() as source:
                        recognizer = sr.Recognizer()
                        source.pause_threshold = 1
                        audio = recognizer.listen(source, phrase_time_limit=None, timeout=None)
                        with open(filename, "wb") as f:
                            f.write(audio.get_wav_data())
                            
                    #transcribe audio to text
                    text = transcribe_audio_to_text(filename)
                    if text:
                        print(f"You said: {text}")
                        
                        #generate response using GPT-3
                        response = generate_response(text)
                        print(f"GPT-3 says: {response}")                        
                        #record audio with gtts for video
                        tts = gTTS(text=response, lang='en')
                        tts.save("sample.mp3")
                        #read response using text-to-speech
                        speak_text(response)
            except Exception as e:
                        print("an error occured: {}".format(e))
if __name__ == "__main__":
*/
