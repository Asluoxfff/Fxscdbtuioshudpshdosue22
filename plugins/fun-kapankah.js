const fs = require("fs");
const fetch = require("node-fetch");
let handler = async (m, { text, args, command }) => {
  if (!args[0]) throw `Use example .${command} halo`
  m.reply(`
*Pertanyaan:* ${m.text}
*Jawaban:* ${pickRandom(global.kpnk)} ${pickRandom(global.motivai)} lagi
  `.trim(), null, m.mentionedJid ? {
  mentions: m.mentionedJid
} : {})
}
handler.help = ['kapankah'].map(v => v + ' <teks>')
handler.tags = ['fun']
handler.command = /^kapan(kah)$/i

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}

global.motivai = [
"detik", "menit", "jam", "hari", "minggu", "bulan", "tahun", "dekade", "abad",
]
global.kpnk = [
"1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
]