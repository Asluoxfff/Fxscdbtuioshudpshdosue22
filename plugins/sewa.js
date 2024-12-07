let handler = async (m, { conn, text, usedPrefix, command }) => {
  let sewa = `SEWA BOT\n\n10k/bulan\n15k/bulan( 2 premium )\n20k/2bulan\n25k/3bulan\n35k/4bulan\n60k/6bulan`
m.reply(sewa)
}
handler.help = ["sewa"]
handler.tags = ["main"]
handler.command = ["sewa", "sewabot"]
module.exports = handler