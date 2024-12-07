/*
SCRIPT AKIRAA BOT BY BANG SYAII 
* ig: Akira_art12
*WhatsApp: wa.me/6283842839555
*,Jangan Perjual belikan script ini jika ada yang menjual tanpa izin mohon laporkan ke saya dan jangan harap ada update Script ini kedepannya !!!
*/

let fetch = require ("node-fetch");
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `*Example:* ${usedPrefix + command} Bang syaii`
try {
m.reply(wait)
let ah = await fetch (`https://api.lolhuman.xyz/api/stalktiktok/${text}?apikey=595a355759b2413843d90719`)
let json = await ah.json()
if (json.status !== 200) throw `User tidak di temukan`
let hasil = ` *[ T I K T O K.   S T A L K ]*
*•Username:* ${json.result.nickname}
*•Bio:* ${json.result.bio}
*•Following:* ${json.result.folowings}
*•Follower:* ${json.result.followers}
*•Liked =* ${json.result.likes}
`
conn.sendFile(m.chat, json.result.user_picture, '', hasil, m)
 } catch (e) {
m.reply("TIktok stalker Erorr")
}

}
handler.command = handler.help = ["ttstalk", "tiktokstalk"]
handler.tags = ["internet","search"]
module.exports = handler