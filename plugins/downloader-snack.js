let cheerio = require('cheerio');
let fetch = require('node-fetch')
let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) throw `Use ${usedPrefix + command} https://s.snackvideo.com/p/j9jKr9dR`
  conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
try {
  let res= await snack(text) 
  let capt = `username : ${res.author}\nlike : ${res.like}\ncomment : ${res.comment}\nshare : ${res.share}`
  conn.sendFile(m.chat, res.media, '', capt, m)
} catch (e) {
  console.log(e);
  m.reply('failed');
  }
}

// please follow the channel https://whatsapp.com/channel/0029VaddOXtAInPl84jp7Q1p for the next feature

handler.help = ['snack']
handler.tags = ['downloader'];
handler.command = /^(snack|snackvid|snackvideo)$/i;
module.exports = handler;

// SCRAPERS BY KAVIAN [ github.com/kaviaann ]

async function snack(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(url).then((v) => v.text());
      const $ = cheerio.load(res);
      const video = $("div.video-box").find("a-video-player");
      const author = $("div.author-info");
      const attr = $("div.action");
      const data = {
        title: $(author)
          .find("div.author-desc > span")
          .children("span")
          .eq(0)
          .text()
          .trim(),
        thumbnail: $(video)
          .parent()
          .siblings("div.background-mask")
          .children("img")
          .attr("src"),
        media: $(video).attr("src"),
        author: $("div.author-name").text().trim(),
        authorImage: $(attr).find("div.avatar > img").attr("src"),
        like: $(attr).find("div.common").eq(0).text().trim(),
        comment: $(attr).find("div.common").eq(1).text().trim(),
        share: $(attr).find("div.common").eq(2).text().trim(),
      };
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
}