let axios = require('axios') 
let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) throw `Use ${usedPrefix + command} 12345678`
  conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
  try {
  let res = await ffstalk(text) 
  let capt = 
`username : ${res.result.name}
level : ${res.result.name}
region : ${res.result.region}
like : ${res.result.like}
bio : ${res.result.bio}`
  conn.reply(m.chat, capt, m) 
   } catch (e) {
    console.log(e);
    conn.reply(m.chat, 'failed response', m) 
  }
}

// please follow the channel https://whatsapp.com/channel/0029VaddOXtAInPl84jp7Q1p for the next feature

handler.help = ['ffstalk'];
handler.tags = ['tools'];
handler.command = /^(ffstalk)$/i;
module.exports = handler;

 // SCRAPERS BY [! whatsapp.com/channel/0029VaFNnRTHLHQR6G0fC01O !]
 
async function ffstalk(id) {
  try {
    const response = await axios.get(`https://allstars-apis.vercel.app/freefire?id=${id}`);
    const data = response.data;
    const result = {
      status: true,
      result: {
        name: data.BasicInfo.Name,
        level: data.BasicInfo.Level,
        region: data.BasicInfo.Region,
        like: data.BasicInfo.Likes,
        bio: data.BasicInfo.Bio,
      },
    };
    return result;
  } catch (error) {
    console.error(error);
  }
}