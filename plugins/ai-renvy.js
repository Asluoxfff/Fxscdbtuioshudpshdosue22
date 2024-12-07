/*════════════════════════════════════
  ├ Weem Gweh Jier
  ├ WhatsApp: wa.me/62857021072505
  ├ Jangan Perjual Belikan Esce Ini!  
═════════════════════════════════════
*/
const axios = require('axios');

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Example: ${command} halo`;
  let pz = await axios.get(`https://api.pan.alvianuxio.my.id/api/renvy?message=${text}`)
  let p = pz.data
  m.reply(p)
};
handler.command = handler.help = ['renvy'];
handler.tags = ['ai'];
handler.premium = false;
handler.register = true
module.exports = handler;