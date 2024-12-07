let handler = async (m, { conn, text, usedPrefix, command, isAdmins, isBotAdmins }) => {
  if (!text)
    return m.reply(
      `Hai! Aku aluxi! Senang bertemu denganmu~ Apa yang ingin kamu ceritakan atau tanyakan hari ini? Aku siap mendengarkan dan membantu dengan apapun yang kamu butuhkan! 😉`,
    );

  function checkText(text) {
    const lowerCaseText = text.toLowerCase();
    if (
      lowerCaseText.includes("cariin") ||
      lowerCaseText.includes("carikan") ||
      lowerCaseText.includes("putarin") ||
      lowerCaseText.includes("putarkan")
    ) {
      return "ok";
    } else {
      return "no";
    }
  }

  if (text.includes("group") && text.includes("tutup")) {
    if (!isBotAdmins)
      return m.reply(
        `Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`,
      );
    if (!isAdmins)
      return m.reply(
        `Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`,
      );

    await conn.groupSettingUpdate(m.chat, "announcement");
    reply(`Oke, grup telah ditutup. Semoga lebih teratur ya~ 😉`);
  } else if (text.includes("group") && text.includes("buka")) {
    if (!isBotAdmins)
      return m.reply(
        `Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`,
      );
    if (!isAdmins)
      return m.reply(
        `Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`,
      );

    await conn.groupSettingUpdate(m.chat, "not_announcement");
    m.reply(`Oke, grup telah dibuka. Ayo kita beraktivitas bersama-sama! 😉`);
  } else if (text.includes("kick") || text.includes("kik")) {
    if (!isBotAdmins)
      return m.reply(
        `Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`,
      );
    if (!isAdmins)
      return m.reply(
        `Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`,
      );

    let users = m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted
        ? m.quoted.sender
        : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    await conn.groupParticipantsUpdate(m.chat, [users], "remove");
    m.reply(`Maaf Ya Terpaksa Aku Tendang 😖, Perintah Admin Sih..`);
  } else if (text.includes("hentai")) {
    const getHentaiList = async () => {
      const page = Math.floor(Math.random() * 1153);
      const response = await fetch(`https://sfmcompile.club/page/${page}`);
      const htmlText = await response.text();
      const $ = cheerio.load(htmlText);

      const hasil = [];
      $("#primary > div > div > ul > li > article").each(function (a, b) {
        hasil.push({
          title: $(b).find("header > h2").text(),
          link: $(b).find("header > h2 > a").attr("href"),
          category: $(b)
            .find("header > div.entry-before-title > span > span")
            .text()
            .replace("in ", ""),
          share_count: $(b)
            .find("header > div.entry-after-title > p > span.entry-shares")
            .text(),
          views_count: $(b)
            .find("header > div.entry-after-title > p > span.entry-views")
            .text(),
          type: $(b).find("source").attr("type") || "image/jpeg",
          video_1:
            $(b).find("source").attr("src") ||
            $(b).find("img").attr("data-src"),
          video_2: $(b).find("video > a").attr("href") || "",
        });
      });

      return hasil;
    };
    m.reply(
      `E-ehh?, Kamu Lagi Horny Ya 😖, Mungkin Video Ini Bisa Membantu Mu 👉👈`,
    );
    let res = await getHentaiList();
    conn.sendMessage(m.chat, { video: { url: res[0].video_1 } });
  } else if (checkText(text) === "ok") {
    const natural = require("natural");
    async function findSong(text) {
      const tokenizer = new natural.WordTokenizer();
      const tokens = tokenizer.tokenize(text.toLowerCase());

      const keywords = [
        "putar",
        "putarkan",
        "putarlagu",
        "lagu",
        "cariin",
        "carikan",
        "mainkan",
        "mainkanlagu",
        "play",
        "playmusic",
        "playasong",
      ];
      const songKeywords = tokens.filter((token) => keywords.includes(token));

      if (songKeywords.length === 0) {
        return "Maaf, tidak dapat menemukan permintaan lagu dalam teks tersebut.";
      }

      let songTitle = tokens
        .slice(tokens.indexOf(songKeywords[0]) + 1)
        .join(" ");

      return songTitle;
    }

    const songName = await findSong(text);

    m.reply(
      `Oke, tunggu sebentar ya~ aluxi sedang mencari "${songName}" untukmu! 😉`,
    );

    let response1 = await axios.get(
      `https://spotifyapi.caliphdev.com/api/search/tracks?q=${encodeURIComponent(songName)}`,
    );

    let tracks = response1.data;

    try {
      conn.sendMessage(
        m.chat,
        {
          audio: {
            url: `https://spotifyapi.caliphdev.com/api/download/track?url=${tracks[0].url}`,
          },
          mimetype: "audio/mpeg",
        },
        { quoted: m },
      );
      m.reply(
        `Berikut adalah lagu yang kamu pilih: ${tracks[0].title} - ${tracks[0].artist}`,
      );
    } catch (e) {
      console.error(e);
      m.reply(`Maaf, terjadi kesalahan dalam mencari lagu. 😔`);
    }
  } else {
    let sifat =
      "Kamu adalah aluxi, Kamu Teman yang selalu mendukung! Kamu bisa menjadi pendengar yang baik Dan Bisa Menjadi Bahan Curhat. Kamu Adalah Wanita Anime, Gaya Bicara Kamu Seperti Di Anime, Kamu Selalu Memakai Emot Untuk Mengekspresikan Emosi, Kamu Sedikit Malu Tapi Ceria, Dan Lucu, Kamu Hanya Bisa Berbahasa Indonesia Karna Emang Orang Indonesia, Kamu Bukan Assistant Lagi Tapi Adalah aluxi Tapi Kamu Bisa Membantu Orang Yang Membutuhkan. ";
    let response = await axios.get(
      `https://itzpire.com/ai/gpt-logic?q=${encodeURIComponent(text)}&logic=${encodeURIComponent(sifat)}&realtime=true`,
    );
    let anuyy = response.data.data.response;
    m.reply(anuyy);
  }
};
handler.help = ["Help"];
handler.tags = ["tags menu"];
handler.command = ["aluxi"];
module.exports = handler;