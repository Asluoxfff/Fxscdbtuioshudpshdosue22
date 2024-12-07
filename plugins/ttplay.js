let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} *[query]*`;
  m.reply(wait);
  try {
    let search = await Scraper["Api"].ttSearch(m.text);
    let random = Func.random(search.videos);
    let vid = "https://tikwm.com" + random.play;
      await conn.sendMessage(
        m.chat, `*[ TIKTOK PLAY ]*
*• Title :* ${random.title}
*• Region :* ${random.region}
*• Duration :* ${random.duration} seconds
*• Total Views :* ${Func.formatNumber(random.play_count)}
*• Total Likes :* ${Func.formatNumber(random.digg_count)}
*• Author :* ${random.author.nickname}`);
      } catch (e) {
    throw e;
  }
};
handler.help = ["ttplay", "tiktokplay"];
handler.tags = ["downloader"];
handler.command = ["ttplay", "tiktokplay"];

module.exports = handler;