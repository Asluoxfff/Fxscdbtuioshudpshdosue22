var handler = async (m, { conn, usedPrefix: _p }) => {
  const text = m.text.toLowerCase();

  if (text === 'p' || text === 'pe' || text === 'woy' || text === 'cuk' || text === 'coy' || text === 'cuy' || text === 'cok' || text === 'woi' || text === 'tol') {
    let info = `HARAP SALAM DON'T`;
    let tsm = text;
    let greetings = {
      'islam': ' Assalamualaikum',
      'kristen': ' Shalom',
      'hindu': ' Swastyastu',
      'buddha': ' Sotthi Jitu',
      'konghucu': ' Wei De Dong Tian',
    };

    greetings['Atheis • Gapunya Agama'] = text;

    // buat greetings info
    let greetingsInfo = Object.keys(greetings)
      .map((key) => `${key}: ${greetings[key]}`)
      .join('\n');

    let caption = `> ${info} ${tsm}\n\n${greetingsInfo}`;

    await conn.reply(m.chat, caption, m);
    await conn.sendMessage(m.chat, {
      react: {
        text: '😡',
        key: m.key,
      },
    });
    return; // Skip deh
  }

  let info = `Iyaaa? ada apa. orang nya sedang tidak ada saat ini. tapi pesan kamu tetap terkirim kok.😇`;
  await conn.reply(m.chat, info, m);
  await conn.sendMessage(m.chat, {
    react: {
      text: '😇',
      key: m.key,
    },
  });
};

// UNTUK handler.customPrefix TAMBAHIN YANG KALIAN MAU YA DAN JANGAN LUPA JUGA DIGANTI PADA BAGIAN if text
handler.command = /^(kakak|p|om|om xnuvers|om sora|pe|woy|cuk|cok|coy|woi|cuy|bapak|pak|ibu|bu|min|admin|tol)$/i;

module.exports = handler;