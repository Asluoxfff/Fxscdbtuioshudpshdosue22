const uploadFile = require("../lib/uploadFile.js");
const uploadImage = require("../lib/uploadImage.js");
const Uploader = require("../lib/uploader.js");
const fs = require("fs");
const fetch = require("node-fetch");
const FormData = require("form-data");
const { fromBuffer } = require("file-type");
const uploadPomf2 = async (media) => {
  try {
    const formData = new FormData();
    formData.append("files[]", media, "upload.jpg"); // Pastikan ada nama file

    const res = await fetch("https://pomf2.lain.la/upload.php", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error(`Gagal mengunggah ke Pomf2: ${res.statusText}`);

    const json = await res.json();

    if (!json.success || !json.files || json.files.length === 0) {
      throw new Error("Response tidak valid dari server Pomf2");
    }

    return json.files[0].url;
  } catch (err) {
    console.error("Error saat upload ke Pomf2:", err);
    throw new Error("Tidak dapat mengunggah file ke Pomf2. Silakan coba lagi.");
  }
};
const uploadImgur = async (buffer) => {
  try {
    const formData = new FormData();
    formData.append("image", buffer.toString("base64")); // Gambar dalam bentuk base64

    const res = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: "Client-ID YOUR_CLIENT_ID", // Ganti dengan Client ID Anda
      },
      body: formData,
    });

    const json = await res.json();

    // Cek apakah respon berhasil
    if (!json.success) {
      throw new Error(json.data.error || "Error saat mengunggah gambar ke Imgur.");
    }

    // Mengembalikan URL gambar
    return json.data.link; 
  } catch (error) {
    console.error("Error Imgur:", error.message || error);
    return false;
  }
};
let handler = async (m) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime) throw 'Tidak ada media yang ditemukan';

  await conn.sendMessage(m.chat, {
    react: {
      text: "🕓",
      key: m.key,
    }
  });

  m.reply(wait);
  let media = await q.download();
  let name = conn.getName(m.sender);
  let isTele = /image\/(png|jpeg|jpg|webp|gif)|video\/mp4|mp3|opus/.test(mime);

  // Mengunggah ke berbagai layanan
  let link1 = await await uploadImgur(media);
  let link2 = await Uploader.catbox(media);
  let tmpfileLink = await Uploader.tmpfiles(media);
  let Pomf2 = await uploadPomf2(media);
  let ucareLink = await Uploader.ucarecdn(media);

  // Membuat URL pendek
  let short1 = await shortUrl(link1);
  let short2 = await shortUrl(link2);
  let shortTmpfile = await shortUrl(tmpfileLink);
  let shortPomf = await shortUrl(Pomf2);
  let shortUcare = await shortUrl(ucareLink);

  let max = `Generated Successfully

Link 1: ${link1}
Link 2: ${link2}
Link 3: ${tmpfileLink}
Link 4: ${ucareLink}
Link 5: ${Pomf2}

Short 1: ${short1}
Short 2: ${short2}
Short 3: ${shortTmpfile}
Short 4: ${shortUcare}
Short 5: ${shortPomf}

${global.wm}`;
  conn.sendMessage(m.chat, {
    document: fs.readFileSync('./package.json'),
    fileName: `Hi [ ${name} ]`,
    mimetype: "application/msword",
    fileLength: `${media.length}`,
    jpegThumbnail: fs.readFileSync('./media/thum.jpg'),
    description: 'hello',
    caption: max,
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterName: "ALVIAN UXIO Inc.",
        newsletterJid: "120363199957492480@newsletter",
        serverMessageId: -1
      },
      businessMessageForwardInfo: {
        businessOwnerJid: conn.user.jid
      },
      externalAdReply: {
        showAdAttribution: false,
        title: "ALUXI - MD",
        body: "FILE UPLOADER",
        thumbnailUrl: "https://telegra.ph/file/7ca40b45be5e7e8ab2cd2.jpg",
        sourceUrl: "",
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  });

  await conn.sendMessage(m.chat, {
    react: {
      text: "✅",
      key: m.key,
    }
  });
};

handler.help = ['tourl <reply image/video>'];
handler.tags = ['tools'];
handler.command = /^(tourl|upload)$/i;
handler.limit = true;

module.exports = handler;

async function shortUrl(url) {
  let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`);
  return await res.text();
}