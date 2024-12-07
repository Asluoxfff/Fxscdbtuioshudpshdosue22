let handler = async (m, { conn }) => {
    conn.siapaaluxi = conn.siapaaluxi ? conn.siapaaluxi : {}
    let id = m.chat
    if (!(id in conn.siapaaluxi)) throw false
    let json = conn.siapaaluxi[id][1]
    let ans = json.jawaban
    let clue = ans.replace(/[bcdfghjklmpqrstvwxyz]/ig, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^who$/i

// handler.limit = true

module.exports = handler