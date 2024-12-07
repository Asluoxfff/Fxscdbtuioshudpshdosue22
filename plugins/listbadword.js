let handler = async (m, { conn, args, usedPrefix, command }) => {
  let code =
    '| ⬡ anj(k|g)\n| ⬡ ajn?(g|k)\n| ⬡ a?njin(g|k)\n| ⬡ bajingan\n| ⬡ b(a?n)?gsa?t\n| ⬡ ko?nto?l\n| ⬡ me?me?(k|q)\n| ⬡ pe?pe?(k|q)\n| ⬡ meki\n| ⬡ titi(t|d)\n| ⬡ pe?ler\n| ⬡ tetek\n| ⬡ toket\n| ⬡ ngewe\n| ⬡ go?blo?k\n| ⬡ to?lo?l\n| ⬡ idiot\n| ⬡ (k|ng)e?nto?(t|d)\n| ⬡ jembut\n| ⬡ bego\n| ⬡ dajj?al\n| ⬡ janc(u|o)k\n| ⬡ pantek\n| ⬡ puki ?(mak)?\n| ⬡ kimak\n| ⬡ babi\n| ⬡ anj\n| ⬡ bangsad\n| ⬡ bgsd\n| ⬡ peler\n| ⬡ pantek\n| ⬡ ngentod\n| ⬡ kontol\n| ⬡ ngentd\n| ⬡ ngntod\n| ⬡ koncol\n| ⬡ kncl\n| ⬡ kncol\n| ⬡ kampang\n| ⬡ lonte\n| ⬡ col(i|mek?)\n| ⬡ pelacur\n| ⬡ henceu?t\n| ⬡ nigga\n| ⬡ fuck\n| ⬡ dick\n| ⬡ bitch\n| ⬡ tits\n| ⬡ bastard\n| ⬡ asshole\n| ⬡ a(su|sw|syu)\n| ⬡ anj(jiang|jing)\n| ⬡ cok\n| ⬡ cuk\n| ⬡ jan(cok|cuk)\n| ⬡ juancuk'
  await m.reply(code);
};
handler.help = ["listbadword"].map((a) => a + " *[badword]*");
handler.tags = ["group"];
handler.command = ["listbadword"];
module.exports = handler;