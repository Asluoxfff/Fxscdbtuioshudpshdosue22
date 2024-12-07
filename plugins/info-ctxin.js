let handler = async (m, { conn, args, usedPrefix, command }) => {
  let code =
    '```Context Info\n\ncontextInfo: {\nmentionedJid: conn.parseMention or [mention],\nexternalAdReply: {\ntitle: `title`,\nbody: `body`,\nthumbnailUrl: thumbnail url,\nsourceUrl: link nya,\nmediaType: 1,\nrenderLargerThumbnail: true,\n},\n}```';
  await m.reply(code);
};
handler.help = ["example"].map((a) => a + " *[example code]*");
handler.tags = ["info"];
handler.command = ["ctxin"];
module.exports = handler;