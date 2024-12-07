const { translate } = require("@vitalets/google-translate-api");
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} *Good Night*`;
  m.reply(wait);
  try {
    let txt = await (
      await translate(text, { to: "ja", autoCorrect: true }).catch((_) => null)
    ).text.toString();
    let buffer = `https://onesytex.my.id/api/voicevox-synthesis?text=${txt}&speaker=20`;
    m.reply(wm, buffer);
  } catch (e) {
    throw eror;
  }
};
handler.help = ["voicevox"].map((a) => a + " *[input text]*");
handler.tags = ["ai"];
handler.command = ["voicevox"];
module.exports = handler;
