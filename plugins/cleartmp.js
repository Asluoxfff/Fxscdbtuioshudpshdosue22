const fs = require('fs');
const path = require('path');

const deleteFilesInDirectory = (directory) => {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Terjadi kesalahan:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Gagal menghapus file ${file}:`, err);
        } else {
          console.log(`File ${file} berhasil dihapus.`);
        }
      });
    });
  });
};

const handler = async (m, { conn }) => {
  const directory = './tmp';
  deleteFilesInDirectory(directory);
  m.reply('Berhasil menghapus semua file pada folder tmp.');
};

handler.command = handler.help = ['cleartmp'];
handler.tags = ['owner'];
handler.rowner = true;

module.exports = handler;