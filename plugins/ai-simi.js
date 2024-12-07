let axios = require("axios"); 
const handler = async (m, { conn, text, usedPrefix, command }) => {
const q = {
      "key": {
        "remoteJid": "status@broadcast",
        "participant": "0@s.whatsapp.net",
        "fromMe": false,
        "id": ""
      },
      "message": {
        "conversation": "*ALVIAN UXIO Inc.*"
      }
    };
 if (!text) return conn.reply(m.chat, `> apa sayangggggg`, q);
 let tus = `Bisa Sabar gak sih... Loading` 
   let hasil = await kaito(text)
  let ah = "> " + hasil
  conn.reply(m.chat, tus, q)
  await conn.reply(m.chat, ah, q)

};
handler.help = ["simi","chatbot"].map((a) => a + " *[question]*");
handler.tags = ["ai"];
handler.command = ["simi","chatbot"]

module.exports = handler


async function kaito(text) {
  const url = 'https://simsimi.vn/web/simtalk';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
    Referer: 'https://simsimi.vn/'
  };

  try {
    const response = await axios.post(url, `text=${encodeURIComponent(text)}&lc=id`, { headers });
    return response.data.success;
  } catch (error) {
    console.error('Error asking SimSimi:', error);
    throw error;
  }
}