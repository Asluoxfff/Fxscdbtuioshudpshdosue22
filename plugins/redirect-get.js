const axios = require('axios');

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply("Masukkan link dengan benar.");

  try {
    let realUrl = await getOriginalUrl(text);
    
    if (realUrl) {
      m.reply(`Original URL: ${realUrl}`);
    } else {
      m.reply("Tidak ada redirect URL ditemukan.");
    }
  } catch (error) {
    m.reply(`Terjadi kesalahan: ${error.message}`);
  }
};

handler.help = ["getredirecturl <url>"];
handler.tags = ["tools"];
handler.command = ["getredirecturl"];

module.exports = handler;

async function getOriginalUrl(redirectUrl) {
  try {
    const response = await axios.get(redirectUrl, {
      maxRedirects: 0,
      validateStatus: function (status) {
        return status >= 300 && status < 400;
      },
    });

    const originalUrl = response.headers.location;
    return originalUrl;
  } catch (error) {
    throw new Error(`Gagal mendapatkan URL asli: ${error.message}`);
  }
}