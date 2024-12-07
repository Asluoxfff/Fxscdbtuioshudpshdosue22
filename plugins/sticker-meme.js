const { sticker5 } = require("../lib/sticker.js");
const axios = require("axios");
const uploadImage = require("../lib/uploadFile.js");

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [atas, bawah] = text.split('|')
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    
    if (!mime) throw `balas gambar dengan perintah\n\n${usedPrefix + command} <${atas ? atas : 'teks atas'}>|<${bawah ? bawah : 'teks bawah'}>\n${usedPrefix + command} <|${bawah ? bawah : 'teks bawah'}>\n${usedPrefix + command} <${atas ? atas : 'teks atas'}>`
    
    let img = await q.download()
    m.reply(wait)
    let url = await uploadImage(img)
    
    if (!atas && bawah) {
        atas = ' '
    }
    
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas ? atas : '')}/${encodeURIComponent(bawah ? bawah : '')}.png?background=${url}`
    
    let stiker = await sticker5(false, meme, global.packname, global.author)
    if (stiker) await conn.sendFile(m.chat, stiker, '', author, m, '', { asSticker: 1 })
}

handler.help = ['smeme <teks atas>|<teks bawah>']
handler.tags = ['tools']
handler.command = /^(smeme)$/i
handler.limit = true
module.exports = handler