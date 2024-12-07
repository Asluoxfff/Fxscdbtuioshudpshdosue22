let handler = async (m, { conn, text, usedPrefix, command }) => {
  let q = m.quoted || m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) throw `*• Example :* ${usedPrefix + command} *[send/reply media]*`;
  m.reply(wait);
  try {
    let buffer = await q.download();
    let link = await Uploader.catbox(buffer);
    let { data } = await axios.get(
      "https://api.vyturex.com/describe?url=" + link,
    );
    m.reply("*• Result :* " + "`" + data + "`");
  } catch (e) {
    throw eror;
  }
};
handler.help = ["prompt"].map((a) => a + " *[reply/send media]*");
handler.tags = ["ai"];
handler.command = ["prompt"];

module.exports = handler;
