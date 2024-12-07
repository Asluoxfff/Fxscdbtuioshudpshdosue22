let handler = async (m, { conn }) => {
  let stats = Object.entries(db.data.stats).map(([key, val]) => {
    let name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help?.join(' , ') : plugins[key]?.help || key 
    if (/exec/.test(name)) return
    return { name, ...val }
  }).filter(Boolean);

  let totalHits = stats.reduce((sum, { total }) => sum + total, 0);

  let handlerMessage = `Total Hits of All Commands: ${totalHits}9`;

  conn.reply(m.chat, handlerMessage, m, {
      contextInfo: {
        mentionedJid: conn.parseMention(handlerMessage),
        groupMentions: [],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
newsletterName: "ALVIAN UXIO Inc.",
newsletterJid: "120363199957492480@newsletter",
serverMessageId: -1
            },
        externalAdReply: {
          title: `⬡ Name : [ ${m.name} ]\n⬡ Runtime : ${global.Func.toTime(process.uptime() * 1000)}`,
          body: `ALUXI - MD TOTAL HIT`,
          thumbnailUrl: "https://telegra.ph/file/cf4f28ed3b9ebdfb30adc.png",
          sourceUrl: "-",
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    });
};

handler.command = handler.help = ['totalhint', 'totalhit']
handler.tags = ['info']
module.exports = handler;

function formatTime(time) {
  const date = new Date(time);
  const month = getMonthName(date.getMonth());
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

function getMonthName(month) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[month];
}

function getTime(ms) {
  var now = parseMs(+new Date() - ms)
  if (now.days) return `${now.days} days ago`
  else if (now.hours) return `${now.hours} hours ago`
  else if (now.minutes) return `${now.minutes} minutes ago`
  else return `a few seconds ago`
}

function parseMs(ms) {
  if (typeof ms !== 'number') throw 'Parameters must be filled with numbers'
  return {
    days: Math.trunc(ms / 86400000),
    hours: Math.trunc(ms / 3600000) % 24,
    minutes: Math.trunc(ms / 60000) % 60,
    seconds: Math.trunc(ms / 1000) % 60,
    milliseconds: Math.trunc(ms) % 1000,
    microseconds: Math.trunc(ms * 1000) % 1000,
    nanoseconds: Math.trunc(ms * 1e6) % 1000
  }
}