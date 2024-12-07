let fetch = require("node-fetch");
let handler = async (m, { args, usedPrefix, command }) => {
	let lang, text
	if (args.length >= 2) {
		(lang = args[0] ? args[0] : "id"), (text = args.slice(1).join(" "));
	} else if (m.quoted && m.quoted.text) {
		(lang = args[0] ? args[0] : "id"), (text = m.quoted.text)
	} else throw `Use ${usedPrefix + command} id hello world`
	try {
	m.reply(wait)
		const prompt = text.trim()
		let res = await tr(prompt, lang)
		let supp = `error : the lang "${lang}" is not supported`;
		let Detect = res[1].toUpperCase() ? res[1].toUpperCase() : "US"
		let ToLang = lang.toUpperCase()
		let key = await conn.reply(m.chat, 
`[ T R A N S L A T E ] \n\nDari: ${Detect}		
Ke : ${ToLang}\nTunggu sebentar, Memproses permintaan anda...`, m) 
		conn.reply(m.chat, res[0].trim(), key) 
	} catch (e) {
	  console.log(e) 
      m.reply('failed')
	}
};

// please follow the channel https://whatsapp.com/channel/0029VaddOXtAInPl84jp7Q1p for the next feature

handler.help = ['translate']
handler.tags = ['tools']
handler.command = /^(tran(slate)|tr?)$/i
module.exports = handler

async function tr(query = "", lang) {
	if (!query.trim()) return ""
	const url = new URL("https://translate.googleapis.com/translate_a/single")
	url.searchParams.append("client", "gtx")
	url.searchParams.append("sl", "auto")
	url.searchParams.append("dt", "t")
	url.searchParams.append("tl", lang)
	url.searchParams.append("q", query)
	try {
		const response = await fetch(url.href)
		const data = await response.json()
		if (data) {
			return [data[0].map((item) => item[0].trim()).join("\n"), data[2]]
		} else {
			return ""
		}
	} catch (err) {
		throw err
	}
}