let fetch = require("node-fetch");
let uploadImage = require("../lib/uploadImage.js");

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/^image/.test(mime) && !/webp/.test(mime)) {
      const img = await q.download();
      const out = await uploadImage(img);
      m.reply(wait);
      const api = await fetch(`https://api.betabotz.eu.org/api/tools/removebg?url=${out}&apikey=p8ADYJib`);
      const image = await api.json();
      const url = image.url.result;
        conn.sendFile(m.chat, url, null, wm, fkontak);
    } else {
      m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim.`);
    }
  } catch (e) {
    console.error(e);
    throw `*Server Error*`
  }
}

handler.help = ['removebg']
handler.tags = ['internet']
handler.command = /^(removebg|nobg)$/i
handler.limit = true
module.exports = handler;