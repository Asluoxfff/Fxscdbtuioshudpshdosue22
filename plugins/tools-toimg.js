let { webp2png } = require('../lib/webp2mp4')
let handler = async (m, { conn, usedPrefix, command }) => {
const ppUrl = await conn
      .profilePictureUrl(m.sender, "image")
      .catch((_) => "https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg");
  if (!m.quoted) throw `balas stiker dengan caption *${usedPrefix + command}*`
  let mime = m.quoted.mimetype || ''
  if (!/webp/.test(mime)) throw `balas stiker dengan caption *${usedPrefix + command}*`
  let media = await m.quoted.download()
  let out = Buffer.alloc(0)
  if (/webp/.test(mime)) {
    out = await webp2png(media)
  }
  await conn.sendFile(m.chat, out, 'out.png', '*DONE*', m, false, {
    thumbnail: Buffer.alloc(0)
  , contextInfo: {
        isForwarded: true,
        externalAdReply: {
          title: `⬡ Name : [ ${m.name} ]\n⬡ Runtime : ${global.Func.toTime(process.uptime() * 1000)}`,
          body: `ALUXI - MD`,
          thumbnailUrl: ppUrl,
          sourceUrl: "https://whatsapp.com/channel/0029VaWy0QM6LwHmgNIFOo04",
          mediaType: 1,
          renderLargerThumbnail: false,
        },
      }})
}
handler.help = ['toimg (reply)']
handler.tags = ['sticker']
handler.command = ['toimg']
handler.limit = true
handler.register = true
module.exports = handler