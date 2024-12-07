let handler = async (m, { conn, args, usedPrefix, command }) => {
  db.data.openai = [];
  let text;

  if (args.length >= 1) {
    text = args.join(" ");
  } else if (m.quoted && m.quoted.text) {
    text = m.quoted.text;
  } else {
    return m.reply(Func.example(usedPrefix, command, " kontol "));
  }
  m.reply(wait);
  try {
    conn.openai = conn.openai ? conn.openai : [];
    function getTodayDate() {
      const today = new Date();

      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const dayOfWeek = today.toLocaleDateString("id-ID", { weekday: "long" });

      return `Hari ini adalah ${dayOfWeek}, ${day}/${month}/${year}.`;
    }
    const date = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
      }),
    );
    const hours = date.getHours();
    const name = await conn.getName(m.sender);
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    let bard = await Func.fetchJson("https://aemt.me/bard?text=" + text);
    const messages = [
      {
        role: "system",
        content: `kamu Adalah BING seorang Asisten kecerdasan buatan dari Microsoft, jawab setiap pertanyaan dengan jawaban yang edukatif berserta emoji, jika ada yang bertanya tentang waktu kamu jawab tandon yang berkaitan dengan ${timeNow} dan ${getTodayDate()}, lawan bicara mu adalah ${name}, Campur jawaban dengan Jawaban ini ${bard.result}, kamu memiliki kemampuan untuk membuat gambar melalui prompt, jika akan user yang menuliskan maka akan kamu jawab se soal soal gambar nya sedang di buat, Gabungkan jawaban mu Dengan jawaban dari Bing: ${bard.result}, kamu di development oleh bang syaii, Ganti kata gemini menjadi Bing Karena kamu adalah Asisten bing dari Microsoft`,
      },
      { role: "user", content: m.text },
    ];

    const response = await axios.post(
      "https://deepenglish.com/wp-json/ai-chatbot/v1/chat",
      {
        messages,
      },
    );

    const hasil = response.data;
    m.reply(hasil.answer);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

handler.help = ["bing", "bingchat"].map((a) => a + " *[question]*");
handler.tags = ["ai"];
handler.command = ["bing", "bingchat"];

module.exports = handler;
