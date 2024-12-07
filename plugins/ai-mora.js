const axios = require("axios");
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`Example ${command} hello`)
const apiMora = await axios.get(`https://api.yanzbotz.my.id/api/ai/mora-ai?query=${text}`)
const response = apiMora.data.result
m.reply(response)
}
handler.help = ["mora"]
handler.tags = ["ai"]
handler.command = ["more", "moraai"]
module.exports = handler