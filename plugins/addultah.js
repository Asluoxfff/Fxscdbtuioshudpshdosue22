let handler = async(m, {conn, command, usedPrefix, text}) => {
  let fail = '*format salah!!*\n\n*example:* ' +usedPrefix+command+ ' 02/04/2003 RezaOffc|harapan saya semoga tahun ini gak jomblo'
  global.db.data.users[m.sender].ultah = global.db.data.users[m.sender].ultah || []
  let ultah = global.db.data.users[m.sender].ultah
  let split = text.split('|')
  let title = split[0]
  let isi = split[1]
  if (ultah.includes(title)) return m.reply('Maaf text di bisa digunakan!\n\nText Mungkin : Sudah di pakai')
  if (!title || !isi) return m.reply(fail)
  let cttn = {
    'title': title,
    'isi': isi
  }
  global.db.data.users[m.sender].ultah.push(cttn)
  conn.reply(m.chat, `Berhasil membuat daftar ultah\nMelihat list ultah ketik: ${usedPrefix}listultah`, m, false, {
    contextInfo: {
      mentionedJid: conn.parseMention(text)
    }
  })
}

handler.help = ['addultah <title|isi>']
handler.tags = ['fun']
handler.command = /^addultah$/i
handler.group = true
module.exports = handler