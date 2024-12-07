let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} *[name chara]*`;
  m.reply(wait);
  try {
    let chara = await Func.fetchJson(
      "https://api-blue-archive.vercel.app/api/characters/students?name=" +
        text,
    );
    let poto = await Scraper["Other"].searchPinterest(
      `${text} Blue archive Icon`,
    );
    let ava = await Func.random(poto.result);

    let cap = `*[ CHARA BLUE ARCHIVE INFO ]*
 *• Name :* ${chara.data[0].names.japanName} *[ ${chara.data[0].names.firstName} ${chara.data[0].names.lastName} ]*
*• Age :* ${chara.data[0].age} TH
*• Birthday :* ${chara.data[0].birthday}
*• Study In :* ${chara.data[0].school}
*• Hobbies :* ${chara.data[0].hobbies.map((a) => a + ", ").join(" ")}
*• Height:* ${chara.data[0].height}
*• Use Weapon :* ${chara.data[0].weapon}
        ${chara.data[0].background}`;

    if (chara.data.length < 1) {
      cap = "*[ CHARA NOT FOUND ]*";
    }
    await conn.sendMessage(
      m.chat,
      { image: { url: ava }, caption: cap },
      { quoted: m },
    );
  } catch (e) {
    throw eror;
  }
};

handler.help = ["bluearchive", "ba"].map((a) => a + " *[name chara]*");
handler.tags = ["anime"];
handler.command = ["bluearchive", "ba"];

module.exports = handler;
