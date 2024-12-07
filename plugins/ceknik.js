let fetch = require("node-fetch")
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `ex ${usedPrefix + command} 3326160107400474`
  if (!/^\d+$/.test(text)) throw `invαlid formαt\nex ${usedPrefix + command} 3326160107400474` 
  conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }});
  try {
    let res = await (await fetch("https://api.kyuurzy.site/api/search/ceknik?query=" + text)).json()
    conn.reply(m.chat, 
`{
  status: true,
  data: {
    nik: ${res.result.data.nik},
    gender: ${res.result.data.kelamin},
    lahir: ${res.result.data.lahir},
    provinsi: ${res.result.data.provinsi},
    kabupaten: ${res.result.data.kotakab},
    kecamatan: ${res.result.data.kecamatan},
    uniqcode: ${res.result.data.uniqcode},
    kodepos: ${res.result.data.tambahan.kodepos},
    usia: ${res.result.data.tambahan.usia},
    zodiak: ${res.result.data.tambahan.zodiak}
   }
}`, m) 
  } catch (e) {
    console.log(e)
    conn.reply(m.chat, `NIK not found it`, m)
  }
}

// please follow the channel https://whatsapp.com/channel/0029VaddOXtAInPl84jp7Q1p for the next feature

handler.help = ["ceknik"]
handler.tags = ["tools"]
handler.command = /^(ceknik)$/i
handler.register = true
module.exports = handler