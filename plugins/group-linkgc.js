let handler = async (m, { conn, text, usedPrefix, command }) => {
m.reply(wait)
  m.reply(
    `Link Group : \nhttps://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}`,
  );
};
handler.help = ["linkgc"].map((a) => a + " *[get link group]*");
handler.tags = ["group"];
handler.command = ["linkgc", "linkgroup", "gclink", "link"];
handler.group = true;
handler.botAdmin = true;
handler.admin = true;
module.exports = handler;