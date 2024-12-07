/*
SCRIPT AKIRAA BOT BY BANG SYAII 
* ig: Akira_art12
*WhatsApp: wa.me/6283842839555
*,Jangan Perjual belikan script ini jika ada yang menjual tanpa izin mohon laporkan ke saya dan jangan harap ada update Script ini kedepannya !!!
*/

let similarity = require('similarity')
const threshold = 0.72

let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    let benarnya = 'https://telegra.ph/file/ab725c3de31e39bf3a08a.jpg'
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hint/i.test(m.quoted.text) || /.*hint/i.test(m.text))
        return !0
    conn.tbkgmbr = conn.tbkgmbr ? conn.tbkgmbr : {}
    if (!(id in conn.tbkgmbr))
        return conn.reply(m.chat, 'Soal itu telah berakhir', m)
    if (m.quoted.id == conn.tbkgmbr[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(conn.tbkgmbr[id][3])
            delete conn.tbkgmbr[id]
            return conn.reply(m.chat, '*Yah Menyerah :( !*', m)
        }
        let json = JSON.parse(JSON.stringify(conn.tbkgmbr[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += conn.tbkgmbr[id][2]
            m.reply(`*Benar!*\n+${conn.tbkgmbr[id][2]} XP`)
            clearTimeout(conn.tbkgmbr[id][3])
            delete conn.tbkgmbr[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
            m.reply(`*Dikit Lagi!*`)
        else
            conn.reply(m.chat, `*Salah!*`, m)
    }
    return !0
}
handler.exp = 0
module.exports = handler