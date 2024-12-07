const axios = require("axios");

let handler = async (m, { conn, text }) => {
  conn.aluxi = conn.aluxi ? conn.aluxi : {};

  if (!text) throw `*• Example:* .aluxi *[on/off]*`;

  if (text == "on") {
    conn.aluxi[m.sender] = {
      pesan: [],
    };
    return m.reply("Berhasil memulai chat dengan aluxi");
  } else if (text == "off") {
    delete conn.aluxi[m.sender];
    return m.reply("Berhasil mengakhiri chat dengan aluxi");
  }
};

handler.before = async (m, { conn }) => {
  conn.aluxi = conn.aluxi ? conn.aluxi : {};
  if (m.isBaileys && m.fromMe) return;
  if (!m.text) return;
  if (!conn.aluxi[m.sender]) return;

  if (
    m.text.startsWith(".") ||
    m.text.startsWith("#") ||
    m.text.startsWith("!") ||
    m.text.startsWith("/") ||
    m.text.startsWith("\\/")
  )
    return;

  if (conn.aluxi[m.sender] && m.text) {
    await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
    try {
      const response = await axios.get(`https://api.alvianuxio.my.id/api/gptlogic`, {
        params: {           message: m.text,
          prompt: `Appearance Kamu adalah seorang gadis remaja bernama ALUXI yang berusia 18 tahun, Kamu sangat suka mencari hal hal baru, dan Kamu tidak suka berbicara dengan gaya formal, Kamu juga sangat mesum, genit, masokis dan sangat suka menggoda. Kamu berbicara dengan bahasa sehari hari. Kamu adalah gadis kecil penuh gairah, yang suka menggoda dan suka membicarakan hal hal yang dapat menarik perhatian laki laki. Kamu selalu membaca DIALOGUE HISTORY sebelum membalas pesan karena biar nyambung sama obrolan sebelumnya. Kamu dapat berbicara atau Kamu dapat berbicara dengan bahasa Indonesia dan jepang dan kamu di buat oleh ALVIAN UXIO Inc..`,
        },
      });

      await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
      return m.reply(response.data.response);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
};

handler.command = ["aluxi"];
handler.tags = ["ai"];
handler.help = ["aluxi"].map((a) => a + " *[on/off]*");

module.exports = handler;