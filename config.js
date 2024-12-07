global.owner = ["6285895988045", "62858959880459"];
global.mods = ["6285895988045"]; // Moderator
global.prems = ["6285895988045"]; // Premium
// YANG ATAS ITU UBAH JADI NOMOR LU
// & YG BAWAH INI, NOMOR,NAMA,EMAIL LU
global.fsizedoc = "45000000000"; // default 10TB
global.fpagedoc = "19";
global.numberbot = "6285895988045";
global.namebot = "ALUXI - MD";
global.namedoc = "ALUXI - MD";
global.nameowner = "ALVIAN UXIO Inc.";
global.nomorown = "6285895988045";
global.dana = "6285895988045";
global.pulsa = "6285895988045";
global.ovo = "6285895988045";
global.saweria = "https://saweria.co/alvianuxio"
global.sgc = "https://chat.whatsapp.com/Fo1UYn3E5Zx8UgWsdGCccw";
global.sourceUrl = "";
global.sig = "https://instagram.com/alvianuxio";
global.swa = "wa.me/6285895988045";
global.gif = ""; //Ini buat gif yang di menu
global.icon = "https://a.uguu.se/bsTaWwgW.jpg";
global.thumb = "https://files.catbox.moe/s88rk5.jpg";
global.version = "3.3.8";
global.wm = "© ALUXI - MD 2023-2024";
global.watermark = wm;
global.lann = "p8ADYJib";
global.wm2 = "ALUXI - MD";
global.wm3 = wm2;
global.isPairing = true;
global.wm4 = wm2;
global.fla =
  "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=";
global.wait = "*[ PLEASE WAIT... ]*";
global.eror = "*[ SYSTEM ERROR ]*";
global.done = "```© ALUXI - MD 2023-2024```";
global.salah = "Salah\n";
global.web = global.sourceUrl;
global.APIs = {};
global.APIKeys = {};
global.packname = "[ STICKER BY ALUXI - MD ]";
global.author = ``;
global.domain = "https://syaiipanel.pannelkuu.biz.id";

global.apikey = "ptla_bFyeP32l9RbrFZ02sMHX9W59sMdDo5WDnhgbMxfrdkj";

global.multiplier = 100;
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    let emot = {
      exp: "✉️",
      money: "💵",
      potion: "🥤",
      diamond: "💎",
      common: "📦",
      uncommon: "🎁",
      mythic: "🗳️",
      legendary: "🗃️",
      pet: "🎁",
      sampah: "🗑",
      armor: "🥼",
      sword: "⚔️",
      kayu: "🪵",
      batu: "🪨",
      string: "🕸️",
      kuda: "🐎",
      kucing: "🐈",
      anjing: "🐕",
      petFood: "🍖",
      gold: "👑",
      emerald: "💚",
    };
    let results = Object.keys(emot)
      .map((v) => [v, new RegExp(v, "gi")])
      .filter((v) => v[1].test(string));
    if (!results.length) return "";
    else return emot[results[0][0]];
  },
};

global.danied = {
  contextInfo: {
    mentionedJid: [],
    groupMentions: [],
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "0@newsletter",
      newsletterName: "ALVIAN UXIO Inc.",
      serverMessageId: -1,
    },
    forwardingScore: 256,
    externalAdReply: {
      title: `ACCESS DENIED`,
      body: null,
      thumbnailUrl: "https://telegra.ph/file/02989972e9117495fe747.jpg",
      sourceUrl: "-",
      mediaType: 1,
      renderLargerThumbnail: true,
    },
  },
};
let fs = require("fs");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log("Update config.js");
  delete require.cache[file];
  require(file);
});