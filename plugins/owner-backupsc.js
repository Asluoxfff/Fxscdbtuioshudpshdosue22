const fs = require("fs");
const archiver = require("archiver");
const path = require("path");

let handler = async (m, { conn }) => {
  m.reply("*ꜱᴇᴅᴀɴɢ ʙᴀᴄᴋᴜᴩ ꜱᴄʀɪᴩᴛ ᴅᴀɴ ᴍᴇɴɢɪʀɪᴍ ᴋᴇ ᴄʜᴀᴛ ᴩʀɪʙᴀᴅɪ*");
  let backupName = `[ Backup ] AkiraaBot.zip`;
  let output = fs.createWriteStream(backupName);
  let archive = archiver("zip", { zlib: { level: 9 } });

  output.on("close", async function () {
    let caption = `*[ BACKUP SCRIPT ]*
> • *Nama file:* ${backupName}\n> • *Ukuran file:* ${Func.formatSize(archive.pointer())}`;
    await conn.sendMessage(
      m.sender,
      {
        document: {
          url: backupName,
        },
        fileName: backupName,
        caption: caption,
        mimetype: "application/zip",
      },
      { quoted: m },
    );

    setTimeout(() => {
      fs.rmSync(backupName);
    }, 5000);
  });

  archive.on("warning", function (err) {
    if (err.code === "ENOENT") {
      console.warn(err);
    } else {
      throw err;
    }
  });

  archive.on("error", function (err) {
    throw err;
  });

  archive.pipe(output);
  archive.glob("**/*", {
    cwd: path.resolve(__dirname, "../"),
    ignore: [
      "node_modules/**",
      "tmp/**",
      "**/flyaudio/**",
      "**.pm2/**",
      ".npm/**",
      "session/**",
      backupName,
    ],
  });
  archive.finalize();
};

handler.help = ["backup"].map((a) => a + " *[backup file]*");
handler.tags = ["owner"];
handler.command = ["backup"];
handler.owner = true;

module.exports = handler;
