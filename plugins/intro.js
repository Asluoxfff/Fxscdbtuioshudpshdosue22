let handler = async (m, { conn, text, usedPrefix, command }) => {
  let sdm2 = `╭─── *「 Kartu Intro 」*
│       
│ *Nama     :* 
│ *Gender   :* 
│ *Umur      :* 
│ *Hobby    :* 
│ *Kelas      :* 
│ *Asal         :* 
│ *Agama    :* 
│ *Status     :* 
╰──────────────`
m.reply(sdm2)
}
handler.help = ["introduction"]
handler.tags = ["main"]
handler.command = ["intro", "introduction"]
module.exports = handler