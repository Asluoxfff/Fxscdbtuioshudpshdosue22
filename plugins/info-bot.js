const { createCanvas, loadImage, registerFont } = require("canvas");
let handler = async (m, { conn }) => {
try {
 const teks = `

${gpname}
Total Member: ${member}ᵗʰ Member's
Name: ${name} 👋
`;
  const blurRadius = 6900;
  const font = "Futura Bold Italic"; // Ganti dengan nama font yang sudah didaftarkan
  const fontSize = 27;
  const width = 650;
  const height = 365;
  const backgroundImageUrl = "https://files.catbox.moe/swt1ed.jpg";
  const avatarImageUrl = pp;
  let photo = await backgroundText(
    teks,
    blurRadius,
    font,
    fontSize,
    width,
    height,
    backgroundImageUrl,
    avatarImageUrl,
  );
  await conn.sendMessage(
    id,
    {
      image: photo,
      caption: text,
      contextInfo: {
        isForwarded: true,
        mentionedJid: conn.parseMention(text),
      },
    },
    { quoted: fkontak },
  );
  } catch (e) {
      throw eror;
    }
  };

handler.help = ["infobot"].map((a) => a + " *[get info bot]*");
handler.tags = ["main"];
handler.command = /^(infobot)$/i;
handler.limit = false;

module.exports = handler;

// Register the font
registerFont("./src/font/212BabyGirl.otf", { family: "Font Family Name" });