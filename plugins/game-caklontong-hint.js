let handler = async (m, { conn }) => {
    conn.cakaluxi = conn.cakaluxi ? conn.cakaluxi : {}
    let id = m.chat
    if (!(id in conn.cakaluxi)) throw false
    let json = conn.cakaluxi[id][1]
    let ans = json.jawaban
    let clue = ans.replace(/[AIUEO]/gi, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^calo$/i

// handler.limit = true

module.exports = handler