let handler = async (m, { conn, args }) => {
	let list = Object.entries(global.db.data.users)
	let lim = !args || !args[0] ? 100: isNumber(args[0]) ? parseInt(args[0]) : 200
	lim = Math.max(1, lim)
	list.map(([user, data], i) => (Number(data.limit = lim)))
		conn.reply(m.chat, `*Berhasil direset ${lim} / user*`, m)
		let grup = Object.keys(db.data.chats).filter(v => v.endsWith('@g.us'));
		for (let gc of grup) {
                await conn.reply(gc, '\`\`\`Limit semua user telah direset\n\nMasing-masing user mendapatkan:\n200 Limit\`\`\`', null);
await conn.delay(5000)
            }
}
handler.help = ['limit'].map(v => 'reset' + v)
handler.tags = ['owner']
handler.command = /^(resetlimit)$/i 

handler.owner = true
module.exports = handler 

function isNumber(x = 0) {
  x = parseInt(x)
  return !isNaN(x) && typeof x == 'number'
}