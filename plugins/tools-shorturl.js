const axios = require("axios");

let handler = async (m, { text, conn, args, command, usedPrefix}) => {
  if (!text) throw `[!] *Invalid*\n*Example*: ${usedPrefix+command} https://your-link.com`
    
	conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})
shortlink(text).then(a => {
conn.reply(m.chat, '*Link* : ' + a.data, m)
})
 
}

handler.help = ['shorturl'].map(v => v + ' <link>')
handler.tags = ['tools']
handler.command = /^tinyurl|short|shorturl$/i
handler.premium = true
handler.limit = true
module.exports = handler

async function shortlink(url){
let isurl = /https?:\/\//.test(url)
return isurl ? axios.get('https://tinyurl.com/api-create.php?url='+encodeURIComponent(url)) : ''}