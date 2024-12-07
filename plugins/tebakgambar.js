/*
SCRIPT AKIRAA BOT BY BANG SYAII 
* ig: Akira_art12
*WhatsApp: wa.me/6283842839555
*,Jangan Perjual belikan script ini jika ada yang menjual tanpa izin mohon laporkan ke saya dan jangan harap ada update Script ini kedepannya !!!
*/

let { tebakgambar } = require('@bochilteam/scraper')

let timeout = 60000
let poin = 105
let handler = async (m, { conn, usedPrefix }) => {
    conn.tbkgmbr = conn.tbkgmbr ? conn.tbkgmbr : {}
    let id = m.chat
    if (id in conn.tbkgmbr) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tbkgmbr[id][0])
        throw false
    }
    let json = await tebakgambar()
    // if (!json.status) throw json
    let caption = `
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hint untuk hint
Bonus: ${poin} XP
> *Reply pesan ini jika ingin menjawab*
    `.trim()
    conn.tbkgmbr[id] = [
        await conn.sendMessage(m.chat,{image: { url: json.img },caption: caption},{ quoted : m }),
        json, poin,
        setTimeout(() => {
            if (conn.tbkgmbr[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tbkgmbr[id][0])
            delete conn.tbkgmbr[id]
        }, timeout)
    ]
}
handler.help = ['tebakgambar']
handler.tags = ['game']
handler.command = /^tebakgambar/i

module.exports = handler