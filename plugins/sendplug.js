const fs = require("fs");
const path = require("path");
const mime = require("mime-types");

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let pluginsDir = path.join("./plugins"); // Menggunakan folder './plugins'

  // Cek apakah folder plugin ada
  if (!fs.existsSync(pluginsDir)) {
    return m.reply("Folder plugin './plugins' tidak ditemukan.");
  }
  
  if (args.length === 0) {
    // Jika tidak ada nama file diberikan, tampilkan daftar plugin
    let pluginFiles = fs.readdirSync(pluginsDir).filter((file) => file.endsWith(".js"));
    if (pluginFiles.length === 0) {
      return m.reply("Tidak ada plugin yang tersedia di './plugins'.");
    }

    let pluginList = pluginFiles.map((file, index) => `${index + 1}. ${file}`).join("\n");
    return m.reply(`  Contoh: ${usedPrefix + command} [filename] @mentions\n` + `Daftar Plugin:\n\n${pluginList}\n\nCara menggunakan:\n` +
      `• Kirim plugin ke nomor: \n  ${usedPrefix + command} <namafile.js> <nomor>\n` +
      `  Contoh: ${usedPrefix + command} example.js 628123456789\n\n` +
      `• Kirim plugin ke mention:\n  ${usedPrefix + command} <namafile.js> @username\n`);
  } else {
    let fileName = args[0];
    let filePath = path.join(pluginsDir, fileName);

    if (!fs.existsSync(filePath)) {
      return m.reply(`❌ Plugin "${fileName}" tidak ditemukan di './plugins'.`);
    }

    // Validasi target (nomor atau mention)
    let target = args[1];
    if (!target) {
      return m.reply(`Harap tambahkan nomor atau mention sebagai tujuan.\n\nCara menggunakan:\n` +
        `• Kirim plugin ke nomor: \n  ${usedPrefix + command} ${fileName} <nomor>\n` +
        `  Contoh: ${usedPrefix + command} ${fileName} 628123456789\n\n` +
        `• Kirim plugin ke mention:\n  ${usedPrefix + command} ${fileName} @username`);
    }

    if (/^\d+$/.test(target)) {
      // Jika target berupa nomor telepon
      target = target + "@s.whatsapp.net";
    } else if (target.startsWith("@")) {
      // Jika target berupa mention
      target = target.replace("@", "") + "@s.whatsapp.net";
    } else {
      return m.reply("Target harus berupa nomor telepon atau mention (@username).");
    }

    try {
      // Tentukan mimetype berdasarkan file yang dikirim
      let mimetype = mime.lookup(filePath) || "application/octet-stream";

      // Mengirim file dengan nama asli, mimetype, dan sesuai ekstensi
      await conn.sendMessage(target, {
        document: { url: filePath }, // Path ke file
        mimetype: mimetype, // Mimetype berdasarkan ekstensi
        fileName: fileName, // Nama asli file
        caption: `Plugin: ${fileName}`,
      });
      m.reply(`Plugin "${fileName}" berhasil dikirim ke ${args[1]}`);
    } catch (err) {
      console.error(err);
      m.reply("Gagal mengirim plugin. Pastikan nomor atau pengguna valid.");
    }
  }
};

handler.help = ["sendplugin <namafile> <nomor/@username>", "sendplug <namafile> <nomor/@username>"];
handler.tags = ["tools"];
handler.command = ["sendplugin", "sendplug"];
handler.owner = true;

module.exports = handler;