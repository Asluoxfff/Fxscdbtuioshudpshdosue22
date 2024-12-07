const uploadImage = require("../lib/uploadFile");
let handler = async (m, { conn, args, usedPrefix, command }) => {
  let text;
  if (args.length >= 1) {
    text = args.slice(0).join(" ");
  } else if (m.quoted && m.quoted.text) {
    text = m.quoted.text;
  } else return m.reply("• *Example :* .bard halo");
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  await m.reply(wait);
  if (!mime) {
    try {
      let res = await GoogleBard(text);
      await m.reply(res.result);
    } catch (e) {
      console.log(e);
      await m.reply(eror);
    }
  } else {
    let media = await q.download();
    let isTele = /image\/(png|jpe?g)/.test(mime);
    let link = await uploadImage(media);
    let res = await GoogleBardImg(text, link);
    await m.reply(res.result);
  }
};
handler.help = ["bard"].map((a) => a + " *[query]*");
handler.tags = ["ai"];
handler.command = ["bard"];
handler.premium = true;
module.exports = handler;

async function GoogleBard(query) {
  return (await fetch("https://aemt.me/bard?text=" + query)).json();
}

async function GoogleBardImg(query, url) {
  return (
    await fetch(`https://aemt.me/bardimg?url=${url}&text=${query}`)
  ).json();
}
