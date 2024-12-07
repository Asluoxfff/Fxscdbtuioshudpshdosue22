let handler = async (m, { conn }) => {
    conn.tbkgmbr = conn.tbkgmbr ? conn.tbkgmbr : {}
    let id = m.chat
    if (!(id in conn.tbkgmbr)) throw false
    let json = conn.tbkgmbr[id][1]
    let ans = json.jawaban.trim()
    let clue = ans.replace(/[AIUEOaiueo]/g, '_')
    conn.reply(m.chat, '```' + clue + '```\nBalas soalnya, bukan pesan ini', conn.tbkgmbr[id][0])
}
handler.command = /^hint$/i
handler.limit = true

module.exports = handler