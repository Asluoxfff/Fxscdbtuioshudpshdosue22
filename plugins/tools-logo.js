let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} Akiraa`;
  m.reply(
    `*• Result from :* ${text}`,
    `https://api.onesytex.my.id/api/create_animeAvatar?id=${Math.floor(Math.random() * 200)}&ignature=create+by+AkiraaBot&background_text=${text}&color=black`,
  );
};
handler.help = ["logo"].map((a) => a + " *[name logo]*");
handler.tags = ["tools"];
handler.command = ["logo"];
module.exports = handler;
