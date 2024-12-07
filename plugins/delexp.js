let handler = async (m, { conn, text }) => {
  if (!text) throw "*• Example :* .delexp *[@user amount]*";
  let who;
  if (m.isGroup) who = m.mentionedJid[0];
  else who = m.chat;
  if (!who) throw "*• Example :* .delexp *[@user amount]*";
  let txt = text.replace("@" + who.split`@`[0], "").trim();
  if (isNaN(txt)) throw "*• Example :* .delexp *[@user amount]*";
  let poin = parseInt(txt);
  let money = poin;
  let users = global.db.data.users;
  if (users[m.sender].owner == true) {
      users[who].exp -= poin;

      conn.reply(
        m.chat,
        `Congratulations @${who.split`@`[0]}. You get +${points} Delete Exp!`,
        m,
        {
          contextInfo: {
            mentionedJid: [who],
          },
        },
      );
    
  } else {
      users[who].exp -= poin;

      conn.reply(
        m.chat,
        `Selamat @${who.split`@`[0]}. Kamu mendapatkan +${poin} Delete Exp!`,
        m,
        {
          contextInfo: {
            mentionedJid: [who],
          },
        },
      );
    
  }
};

handler.help = ["delexp *[@user, amount]*"];
handler.tags = ["owner"];
handler.command = ["delexp"];
handler.rowner = true;

module.exports = handler;