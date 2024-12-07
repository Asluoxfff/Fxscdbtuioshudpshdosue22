const fs = require("fs");
const fetch = require("node-fetch");
let handler = async (m, { text, args, command }) => {
let who = m.mentionedJid[0] 
let mentionedJid = [who]
  m.reply(`
*Pertanyaan:* ${m.text}
*Jawaban:* ${pickRandom(global.motiasi)}
  `.trim(), null, m.mentionedJid ? {
  mentions: [who]
} : {})
}
handler.help = ['isidompet']
handler.tags = ['fun']
handler.limit = true
handler.command = /^cekdompet|isidompet$/i

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}

global.motiasi = [
"1k\n\nBuat apa bjir segitu", "5k\n\nCuma bisa buat beli cilok ini", "15k\n\nBisa kali ini sewa bot Aluxi-MD", "20K\n\nBisa beli premium ini", "30k\n\nBisa beli makanan ini", "40k\n\nBisa beli seblak full ini", "100k\n\nNah ini bisa borong makanan",
]