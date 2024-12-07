/*════════════════════════════════════
  ├ Weem Gweh Jier
  ├ WhatsApp: wa.me/62857021072505
  ├ Jangan Perjual Belikan Esce Ini!  
═════════════════════════════════════
*/
const axios = require('axios');

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Example: ${command} halo`;
  let pz = await axios.get(`https://api.pan.alvianuxio.my.id/api/letmegpt?message=${text}`)
  let p = pz.data
  conn.sendMessage(m.chat, {
                text: "`[ ALUXI - AI ]`\n\n" + `${p}`,
                contextInfo: {
                    externalAdReply: {
                        title: "ChatGPT",
                        body: "Artificial Intelligence",
                        thumbnailUrl: "https://telegra.ph/file/b70c17d01e41146501827.jpg",
                        sourceUrl: "",
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: true
                    }
                }
          }, {quoted: fkontak})
};
handler.command = handler.help = ['ai'];
handler.tags = ['openai'];
handler.premium = false;
handler.register = true
module.exports = handler;