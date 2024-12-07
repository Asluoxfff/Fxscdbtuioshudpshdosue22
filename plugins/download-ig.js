const fetch = require("node-fetch");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example:* ${usedPrefix + command} *[Instagram url]*`;
  m.reply("*[ PROCESSING.... ]*");
  try {
    let response = await fetch(`https://api.alvianuxio.my.id/api/instagram?message=${text}&apikey=aluxi`);
    let fb = await response.json();
    
    // Cek apakah status respons berhasil dan ada media yang bisa diambil
    if (fb.data && fb.data.response && fb.data.response.status === 200 && fb.data.response.media.length > 0) {
      let mediaUrl = fb.data.response.media[0]; // Mengambil URL media pertama
      
      conn.sendMessage(
        m.chat,
        {
          video: {
            url: mediaUrl,
          },
          caption: "*[ INSTAGRAM DOWNLOADER ]* \n© ALUXI - MD",
        },
        { quoted: m },
      );
    } else {
      throw "*[ ERROR: NO MEDIA FOUND OR INVALID RESPONSE ]*";
    }
  } catch (e) {
    throw "*[ ERROR CAN'T DOWNLOAD INSTAGRAM ]*";
  }
};
handler.help = ["ig", "instagram", "igdl"].map((a) => a + " *[Instagram url]*");
handler.tags = ["downloader"];
handler.command = ["ig", "instagram", "igdl"];
module.exports = handler;