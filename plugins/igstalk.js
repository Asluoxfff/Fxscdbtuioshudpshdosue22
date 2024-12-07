const cheerio = require('cheerio');
const axios = require('axios') 

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) throw `ex : ${usedPrefix + command} jokowi`
        conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
try {
    let res = await igStalk(text);
    let message = 
`username : ${res.username}
bio : ${res.bio}
post : ${res.posts}
follower : ${res.followers}
following : ${res.following}`;
      conn.sendMessage(m.chat, {
      text: message,
      contextInfo: {       
         externalAdReply: { showAdAttribution: false, 
           title: 'INSTAGRAM STALK', 
           body: `ALUXI - MD`, 
           thumbnailUrl: res.profile,
           mediaType: 1,
           renderLargerThumbnail: true
         }}}, { quoted: m });         
    } catch (e) {
      console.log(e) 
      m.reply('failed') 
    }
};

// please follow the channel https://whatsapp.com/channel/0029VaddOXtAInPl84jp7Q1p for the next feature

handler.help = ['igstalk'];
handler.tags = ['internet'];
handler.command = /^(igstalk)$/i
module.exports = handler;

// SCRAPERS BY MIFTAHGANZZ

async function igStalk(name) {
  try {
    const response = await axios.get(`https://dumpoir.com/v/${name}`);
    const html = response.data;
    const $ = cheerio.load(html);

    const profile = $('img.skeleton.rounded-full').attr('src');
    const username = $('h1.text-4xl.font-serif.text-stone-700.mb-1.w-full.inline.relative').text().trim();
    const fullName = $('h2.text-2xl.font-serif.text-stone-500.mb-3').text().trim();
    const bio = $('div.text-sm.font-serif').html().replace(/<br>/g, '\n').replace(/<\/?[^>]+(>|$)/g, "").trim();
    const posts = $('div.stats .stat').eq(0).find('.stat-value').text().trim();
    const followers = $('div.stats .stat').eq(1).find('.stat-value').text().trim();
    const following = $('div.stats .stat').eq(2).find('.stat-value').text().trim();

    const profileData = {
      profile,
      username,
      fullName,
      bio,
      posts,
      followers,
      following
    };

    console.log(profileData);
    return profileData;
  } catch (error) {
    console.log(error);
    return null;
  }
}