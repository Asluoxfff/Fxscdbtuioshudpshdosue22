let levelling = require('../lib/levelling');
const canvafy = require("canvafy");
let fetch = require("node-fetch");
const { RankCardBuilder, Font } = require('canvacord');

let handler = async (m, { conn, command }) => {
  let user = global.db.data.users[m.sender];
  let ppUrl = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/1a2ce69ce7445f80d1421.png");

  if (!levelling.canLevelUp(user.level, user.exp, global.multiplier)) {
    let { min, xp, max } = levelling.xpRange(user.level, global.multiplier);
    let pp = await (await fetch(ppUrl)).buffer();
    let curr = user.exp - min;
    let minxp = max - user.exp;
    let textinfo = `*GAGAL NAIK LEVEL*

Level *➠ ${user.level}*
Role  *➠ ${user.role}*
Xp    *➠ ${min - user.exp}/${max - user.exp}*
XP kamu tidak mencukupi!\n
Kurang ${xp}XP lagi\n
Mainkan game untuk mendapatakan XP agar bisa naik level!`.trim();
m.reply(textinfo)
    /*const rank = new RankCardBuilder()
            .setAvatar(ppUrl)
            .setCurrentXP(curr)
            .setLevel(user.level, "RANK", true)
            .setRank(user.level, "LEVEL", true)
            .setLevelColor("#2B2E35", "#2B2E35")
            .setRankColor("#FFFFFF", "#6636E5")
            .setRequiredXP(xp)
            .setStatus("streaming")
            .setProgressBar("#6636E5", "COLOR")
            .setProgressBarTrack("#FFFFFF")
            .setUsername(user.name)
            .setDiscriminator(`0001`)
            .setFontSize(1.5);
        
    rank.build()
        .then(data => {
            conn.sendFile(m.chat, data, "RankCard.png", textinfo, m);
        });*/
  }

  let before = user.level * 1;
  while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++;
  if (before !== user.level) {
    const levelUp = await new canvafy.LevelUp()
    .setAvatar(ppUrl)
    .setBackground("image", "https://telegra.ph/file/3f02ef79a183e515398c7.jpg")
    .setUsername(user.name)
    .setBorder("#000000")
    .setAvatarBorder("#ff0000")
    .setOverlayOpacity(0.7)
    .setLevels(before,user.level)
    .build();

    let ages = `*❑ NAIK LEVEL*

Dari: *[ ${before} ]* ➠ *[ ${user.level} ]*
Selamat, Kamu naik level!🎉🎉`.trim();
    await conn.sendFile(m.chat, levelUp, 'lvlup.jpg', ages, m);
  }
};

handler.help = ['levelup'];
handler.tags = ['xp'];
handler.command = /^levelup|lvlup$/i;
module.exports = handler;