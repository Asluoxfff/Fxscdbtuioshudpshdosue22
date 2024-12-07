const axios = require("axios");

let handler = async (m, { conn, isOwner, usedPrefix, command, text }) => {
if (!text) {
    return m.reply(`Contoh: ${command} hai luminai`);
  }

  const requestData = { content: text, user: m.sender };
  const quoted = m && (m.quoted || m);
m.reply(wait)
  try {
    let response;
    const mimetype = quoted?.mimetype || quoted?.msg?.mimetype;

    if (mimetype && /image/.test(mimetype)) {
      requestData.imageBuffer = await quoted.download();
    }

    response = (await axios.post('https://luminai.my.id', requestData)).data.result;
    m.reply(response);
  } catch (err) {
    m.reply(err.toString());
  }
}
handler.help = ['luminai']
handler.tags = ['ai']
handler.command = /^(luminai)$/i
handler.limit = true

module.exports = handler