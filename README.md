# FreyTheBot
A javascript based speech recog llm discord bot.

Project is currently being built...

Changelog 1.2

old methods<br>
!join used to join the channel you want it to listen in.<br>
!disc used to make it leave voicechannel.<br>
!savegpt -- saves the prompt locally<br>
!runVoice -- plays the prompt via discord<br>

Cleaned up a lot of messy code and comments.<br>

Changed gpt to automatically output the question directly however there does seem to be some sorta problem with the audio player just deciding to stop randomly. I am still not sure what causes this
connection to discord lost, some sorta bug in the audioplayer, hmm. sometimes it works fine.
So frey now sends a response back which in turn activates her to speak.<br>

!gpt -- generates the prompt sent to gpt takes a user input after the command. example : !gpt what is a dog<br>

To run this, you need to have a .env file setup with the right values<br>
an api key from your prefered llm, and if not openai you need to change the api calls<br>
if you prefer a different voice to read, you can look into the pay voices, the big ones, azure,google,whisper. or train your own neural voice.

todo<br>
Fix the speech recog to work so methods aren't needed<br>
change the vc to be dynamically set.<br>
