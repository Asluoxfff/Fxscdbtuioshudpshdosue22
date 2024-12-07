<=============================================>>
    AKIRAA BOT V19
  BY BANG SYAII
<============================================>>
✅ Thank Sudah beli, Script ini secara legal ke @bang_syaii, sebelum run lu. wajib baca ini

🔴 Note : Dilarang  Jual-beli kan script ini ke orang lain, ketahuan jual gw blacklist dari grup, gak bakal gw kasih update lagi, udah di kasih no enc ngelunjak 😹


☁️ Command For Run bot :

 FOR TERMUX
   • Pkg update && pkg upgrade 
   • Pkg Install nodejs 
   • Pkg Install ffmpeg
   • Pkg Install libwebp
   • Pkg Install imagemagick
   • termux-setup-storage
   • > Yes
   • cd sdcard
   • cd AkiraaBot
   • npm install 
   • npm start
   
  FOR PANEL
   • npm install 
   • npm start

Tutorial cara pake function beton :
 [ Button Quick reply ]
let button = [
   ["INFO OWNER",".owner"]
   ["INFO SCRIPT",".sc"]
   ]
conn.sendButton(m.chat, button, m, {
body: "Welcome To AkiraaBot",
footer: "Create by BangSyaii"
})

[ Button Quick Reply With Media ]
let button = [
   ["INFO OWNER",".owner"]
   ["INFO SCRIPT",".sc"]
   ]
conn.sendButton(m.chat, button, m, {
body: "Welcome To AkiraaBot",
footer: "Create by BangSyaii",
url: "htttps://linkmedia.com", //Isi pake url poto/video
})

[ Button List Message ]
let array = [{
headers: "🎉 WELCOME TO AKIRAABOT",
rows: [{
   headers: "INFO SCRIPT",
   title: "Informasi Script bot",
   body: "Script by Bang Syaii",
  command: ".sc"
   },{
   headers: "INFO OWNER",
   title: "Klik untuk melihat list  owner",
   body: "Owner nya ganteng hati-hati 😹",
  command: ".owner"
   }]
}]
conn.sendList(m.chat,"Click Here", array, m, {
body: "WELCOME TO AKIRAABOT,
footer: "Create by Bang syaii"
})

[ Button List Message With Media ]
let array = [{
headers: "🎉 WELCOME TO AKIRAABOT",
rows: [{
   headers: "INFO SCRIPT",
   title: "Informasi Script bot",
   body: "Script by Bang Syaii",
  command: ".sc"
   },{
   headers: "INFO OWNER",
   title: "Klik untuk melihat list  owner",
   body: "Owner nya ganteng hati-hati 😹",
  command: ".owner"
   }]
}]
conn.sendList(m.chat,"Click Here", array, m, {
body: "WELCOME TO AKIRAABOT,
footer: "Create by Bang syaii",
url: "https://Linkmedia.com" //isi pake url poto/video
})

FITUR ERROR?, TAMBAHIN NOMOR GW DI GLOBAL OWNER NANTI GW FIX LANGSUNG DI TEMPAT
<============================================>>