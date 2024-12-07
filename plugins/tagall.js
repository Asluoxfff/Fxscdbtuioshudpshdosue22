let handler = async (m, { conn, text, participants }) => {
    let teks = `
*MESSAGE : ${text ? text : 'No Message'}* \n──「 *Tag All Member* 」── \n`
let askj = `Tagger : ${m.sender.split('@')[0]}`
				for (let mem of participants) {
					teks += `• @${mem.id.split('@')[0]}\n`
				}
				conn.sendMessage(m.chat, {
					text: teks,
					mentions: participants.map(a => a.id)
				}, {
					quoted: m
				})
				conn.reply(
        m.chat,
        askj,
        m,
        {
          contextInfo: {
            mentionedJid: [m?.sender],
          },
        },
      )
  }
  
  handler.help = ['tagall']
  handler.tags = ['group']
  handler.command = ['tagall']
  handler.admin = true
  handler.group = true

module.exports = handler