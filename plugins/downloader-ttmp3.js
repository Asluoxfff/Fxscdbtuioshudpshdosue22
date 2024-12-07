let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} *[Tiktok Url]*`;
  if (!Func.isUrl(text))
    throw `*• Example :* ${usedPrefix + command} *[Tiktok Url]*`;
  m.reply(wait);
  try {
    let fetch = await Scraper["Download"].tiktok.v1(text);
    let { data } = fetch;
    if (data.images) {
      for (let i of data.images) {
        await conn.sendMessage(
          m.chat,
          {
            image: {
              url: i,
            },
            caption: `*[ TIKTOK SLIDE DOWNLOADER ]*\n*• Title :* ${data.title}\n*• ID :* *[ ${data.id} ]*\n*• Views :* ${Func.formatNumber(data.play_count)}\n*• Likes :* ${Func.formatNumber(data.digg_count)}\n*• Comment :* ${Func.formatNumber(data.comment_count)}\n*• Author :* ${data.author.nickname}`,
          },
          { quoted: m },
        );
      }
    } else {
      
      await conn.sendMessage(m.chat, { 
      audio: { url: data.play }, 
      mimetype: 'audio/mpeg' 
    }, { quoted: m });
    }
  } catch (e) {
    try {
      let tiktok = await Scraper["Download"].tiktok.v2(text);
      let cap = `*[ TIKTOK V2 DOWNLOADER ]*
*• Caption :* ${tiktok.caption}`;
      
     let key = await conn.sendMessage(m.chat, { 
      audio: { url: tiktok.server1.url }, 
      mimetype: 'audio/mpeg' 
    }, { quoted: m });  
    } catch (e) {
      throw eror;
    }
  }
};
handler.help = ["ttmp3", "tiktokmp3"].map((a) => a + " *[Tiktok Url]*");
handler.tags = ["downloader"];
handler.command = ["ttmp3", "tiktokmp3"];
handler.limit = true;
module.exports = handler;