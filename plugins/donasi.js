/*
SCRIPT AKIRAA BOT BY BANG SYAII 
* ig: Akira_art12
*WhatsApp: wa.me/6283842839555
*,Jangan Perjual belikan script ini jika ada yang menjual tanpa izin mohon laporkan ke saya dan jangan harap ada update Script ini kedepannya !!!
*/

let fs = require('fs')
let handler = async (m, { conn }) => {
let name = conn.getName(m.sender)
let numberowner = global.numberowner
let anu = `Hallo Kak 👋 ${name}
Silahkan donasi agar bot tetap aktif

╭─『  Donasi • E-money  』
├⬡ Dana : .dana
├⬡ Gopay : .gopay
├⬡ Qris : *Chat Owner*
╰───

Berapapun donasi kalian akan sangat berarti

⬡ Info selengkapnya : wa.me/${global.nomorown}

*❒ Keuntungan Donasi Bagi Bot* 
⬡ Buat sewa VPS supaya bot bisa aktif 24 jam
⬡ Buat beli limit apikey fitur
⬡ Supaya bot terus update & aktif

*❒ Keuntungan Donasi Bagi Para Donasi*
⬡ Bisa dapat exp
⬡ Bisa dapat limit
⬡ Bisa dapat money

*[ DEVELOPER ALUXI - MD ]*`
  await conn.sendMessage(m.chat, {
text: anu,
contextInfo: {
externalAdReply: {  
title: 'SUPPORT DEVELOPER',
body: namebot,
thumbnailUrl: global.thumb,
sourceUrl: '',
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
m.reply("Informasi payment telah dikirim di pribadi chat")
conn.reply(m.sender, "PAYMENT `DANA`\n\n085895988045", m)
}
handler.help = ['donasi', 'donate']
handler.tags = ['xp', 'info']
handler.command = /^(donasi|donate|payment|dana|gopay)$/i

module.exports = handler