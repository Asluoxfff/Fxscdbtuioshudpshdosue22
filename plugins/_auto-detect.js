const { WAMessageStubType } = require('@whiskeysockets/baileys');

async function before(m, { conn, fkontak }) {
  if (!m.messageStubType || !m.isGroup) return;
  const edtr = `@${m.sender.split('@')[0]}`;

  const messages = {
    21: `*Perubahan Nama Grup* oleh ${edtr}\n*Baru:* ${m.messageStubParameters[0]}`,
    33: `*Perubahan Nomor* oleh ${edtr}`,
    22: `*Perubahan Ikon Grup* oleh ${edtr}`,
    1: `*Reset Link Grup* oleh ${edtr}`,
    23: `*Reset Link Grup* oleh ${edtr}`,
    132: `*Reset Link Grup* oleh ${edtr}`,
    24: `*Perubahan Deskripsi Grup* oleh ${edtr}:\n*Baru:* ${m.messageStubParameters[0]}`,
    25: `*Pengaturan Edit Info Grup* oleh ${edtr}\n*Hanya Admin:* ${m.messageStubParameters[0] == 'on' ? 'Ya' : 'Tidak'}`,
    26: `*Group telah ${m.messageStubParameters[0] == 'on' ? 'Ditutup' : 'Dibuka'} oleh ${edtr}*\nPesan: ${m.messageStubParameters[0] == 'on' ? 'Peserta tidak dapat mengirim pesan' : 'Peserta dapat mengirim pesan'}`,
    29: `selamat kepada @${m.messageStubParameters[0].split('@')[0]} telah menjadi admin group`,
    30: `*yah kamu di unadmin @${m.messageStubParameters[0].split('@')[0]}`,
    72: `*Perubahan Durasi Pesan Sementara* oleh ${edtr}\n*Durasi:* ${m.messageStubParameters[0]}`,
    123: `*Nonaktifkan Pesan Sementara* oleh ${edtr}`,
    45: `*Panggilan Video/Audio Dimulai* oleh ${edtr}`,
    46: `*Panggilan Video/Audio Dimulai* oleh ${edtr}`,
    71: `*Permintaan Bergabung* oleh ${edtr}`,
    74: `*Mengirim Media Sekali Tampil* oleh ${edtr}`,
    141: `*Bergabung Melalui Tautan* oleh ${edtr}`,
    142: `*Pembuatan Grup Komunitas* oleh ${edtr}`,
    143: `*Penghapusan Grup Komunitas* oleh ${edtr}`,
    156: `*Pemilihan Suara* oleh ${edtr}`,
  };

  const messageType = messages[m.messageStubType];

  if (messageType) {
    await conn.sendMessage(m.chat, { text: messageType, mentions: m.messageStubParameters[0] !== undefined ? [m.sender, m.messageStubParameters[0]] : [m.sender] }, { quoted: fkontak });
  } else {
    console.log({
      messageStubType: m.messageStubType,
      messageStubParameters: m.messageStubParameters,
      type: WAMessageStubType[m.messageStubType],
    });
  }
}

module.exports = { before, disabled: false };