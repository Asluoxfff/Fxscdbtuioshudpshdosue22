let syaii = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw "*• Example:* " + usedPrefix + command + " halo";
  m.reply(wait);
  let a = await(await fetch("https://itzpire.site/ai/you?q=" + text)).json();
  m.reply("*[ YOU - AI ]*\n" + a.result.message);
};

syaii.help = ["aiy", "youbot", "aiyou", "youai"].map(
  (a) => a + " *[question]*",
);
syaii.tags = ["ai"];
syaii.command = ["aiy", "youbot", "aiyou", "youai"];

module.exports = syaii;