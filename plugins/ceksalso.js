/*
SCRIPT AKIRAA BOT BY BANG SYAII 
* ig: Akira_art12
*WhatsApp: wa.me/6283842839555
*,Jangan Perjual belikan script ini jika ada yang menjual tanpa izin mohon laporkan ke saya dan jangan harap ada update Script ini kedepannya !!!
*/

let { h2k } = require('../lib/functions.js')
let handler = async (m, { conn, text, usedPrefix, command }) => {
 let user = global.db.data.users[m.sender]
let saldo = await h2k(user.saldo)
  
  let hasil = ` *ALUXI SALDO*\n• Nama: *${conn.getName(m.sender)}*\n• Saldo: ${saldo || 0}\n✅ Ketik *.deposit* untuk mengisi saldo`
  
  await conn.sendMessage(m.chat, {
    text: hasil,
    contextInfo: {
      externalAdReply: {  
        title: "• Berikut Saldo anda",
        body: '',
        thumbnailUrl: 'https://telegra.ph/file/dacaf65239b4130ea3501.jpg',
        sourceUrl: null,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })
}

handler.command = handler.help = ["mysaldo","ceksaldo"]
handler.tags = ["store"]
handler.register = true
module.exports = handler

function separateNumberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}