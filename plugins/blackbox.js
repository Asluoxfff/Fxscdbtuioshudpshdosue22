let axios = require('axios');
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Use ${usedPrefix + command} hi`;
  conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });
  try {
    let res = await blackbox(m, text);
    await m.reply(res);
  } catch (e) {
    console.log
    await m.reply(e);
  }
};

// please follow the channel https://whatsapp.com/channel/0029VaddOXtAInPl84jp7Q1p for the next feature

handler.help = ['blackbox'];
handler.tags = ['ai'];
handler.command = /^(blackbox)$/i;
module.exports = handler;

async function blackbox(m, text) {
  try {
    let id = m.sender.split("@")[0];
    let json = {
      messages: [{ id: id, content: text, role: "user" }],
      id: id,
      previewToken: null,
      userId: "4d112c20-3201-46a5-afc6-6b308d98a450",
      codeModelMode: true,
      agentMode: {},
      trendingAgentMode: {},
      isMicMode: false,
      isChromeExt: false,
      githubToken: null,
    };
    let { data } = await axios.post("https://www.blackbox.ai/api/chat", json);
    return data;
  } catch (e) {
    throw e
  }
}