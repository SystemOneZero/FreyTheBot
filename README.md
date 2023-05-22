# FreyTheBot
A javascript based speech recog llm discord bot.

Project is currently being built...

Changelog 1.1

old methods<br>
!join used to join the channel you want it to listen in.<br>
!disc used to make it leave voicechannel.

Added three methods that run currently to test it out a bit.

!gpt -- generates the prompt sent to gpt takes a user input after the command. example : !gpt what is a dog<br>
!savegpt -- saves the prompt locally<br>
!test -- plays the prompt via discord<br>

These are tempoary and only serve as proof of concept atm.

To run this, you need to have a .env file setup with the right values<br>
an api key from your prefered llm, and if not openai you need to change the api calls<br>
if you prefer a different voice to read, you can look into the pay voices, the big ones, azure,google,whisper. or train your own neural voice.

todo
Fix the speech recog to work so methods aren't needed
change the vc to be dynamically set.
