const fs = require('fs');

// Lokasi file database
const DB_PATH = './sewa.json';

// Fungsi untuk membaca database dari file JSON
function readDatabase() {
    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(DB_PATH));
}

// Fungsi untuk menulis database ke file JSON
function writeDatabase(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Inisialisasi database
let dbsewa = readDatabase();

// Fungsi untuk mengubah milidetik menjadi format waktu
function msToDate(ms) {
    if (ms <= 0) return `0 hari 0 jam 0 menit 0 detik`;

    // Konversi total waktu ke hari, jam, menit, detik
    const days = Math.floor(ms / (24 * 60 * 60 * 1000)); // Sisa dalam hari
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)); // Sisa dalam jam
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000)); // Sisa dalam menit
    const seconds = Math.floor((ms % (60 * 1000)) / 1000); // Sisa dalam detik

    // Formatkan hasilnya
    return `${days} hari ${hours} jam ${minutes} menit ${seconds} detik`;
}
const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} | ${hours}:${minutes}:${seconds}`;
};

// Fungsi untuk memeriksa masa sewa
async function checkSewa(conn) {
    let now = Date.now();

    for (let group of dbsewa) {
        let remainingTime = group.expired - now;

        if (remainingTime <= 0) {
            try {
                await conn.reply(group.id, `Masa sewa grup ini telah habis. Bot akan keluar.`, null);
                await conn.groupLeave(group.id);
                dbsewa = dbsewa.filter(g => g.id !== group.id);
                writeDatabase(dbsewa);
                console.log(`[INFO] Bot keluar dari grup ${group.id} karena masa sewa habis.`);
            } catch (err) {
                console.error(`[ERROR] Gagal keluar dari grup ${group.id}: ${err.message}`);
            }
        } else if (remainingTime <= 86400000 && !group.notified) {
            try {
                await conn.reply(
                    group.id,
                    `Masa sewa grup ini akan habis dalam ${msToDate(remainingTime)}.\n` +
                    `Mohon segera perpanjang untuk tetap menggunakan bot.`,
                    null
                );
                group.notified = true;
                writeDatabase(dbsewa);
            } catch (err) {
                console.error(`[ERROR] Gagal mengirim pemberitahuan ke grup ${group.id}: ${err.message}`);
            }
        }
    }
}

let handler = async (m, { conn, args, command, usedPrefix }) => {
    let now = new Date().getTime();

    if (command === 'addsewa') {
        if (!args[0] || !args[0].includes('https://chat.whatsapp.com/')) {
            throw `Gunakan format: ${usedPrefix + command} <link grup> <jumlah hari>`;
        }

        let groupInviteCode = args[0].split('https://chat.whatsapp.com/')[1];
        let jumlahHari = parseInt(args[1]);
        if (isNaN(jumlahHari) || jumlahHari <= 0) {
            throw `Masukkan jumlah hari sewa yang valid! Contoh: ${usedPrefix + command} <link grup> 30`;
        }

        try {
            let groupId = await conn.groupAcceptInvite(groupInviteCode);
            let groupIndex = dbsewa.findIndex(group => group.id === groupId);

            if (groupIndex === -1) {
                let msJumlahHari = 86400000 * jumlahHari;
                dbsewa.push({ id: groupId, expired: now + msJumlahHari, notified: false });
                writeDatabase(dbsewa);

                conn.reply(
                    m.chat,
                    `Berhasil join grup dan menetapkan masa sewa selama ${jumlahHari} hari.\n\nHitung Mundur: ${msToDate(now + msJumlahHari - now)}`,
                    m
                );
            } else {
                let msJumlahHari = 86400000 * jumlahHari;
                dbsewa[groupIndex].expired += msJumlahHari;
                dbsewa[groupIndex].notified = false;
                writeDatabase(dbsewa);

                conn.reply(
                    m.chat,
                    `Masa sewa grup ini telah diperpanjang selama ${jumlahHari} hari.\n\nHitung Mundur: ${msToDate(dbsewa[groupIndex].expired - now)}`,
                    m
                );
            }
        } catch (err) {
            console.error(`Gagal bergabung ke grup: ${err}`);
            throw `Gagal bergabung ke grup, pastikan link grup valid atau bot diizinkan bergabung!`;
        }
    }

    if (command === 'listsewa') {
    if (dbsewa.length === 0) {
        conn.reply(m.chat, `Tidak ada grup yang memiliki masa sewa aktif.`, m);
    } else {
        let listText = 'Grup dengan masa sewa aktif:\n\n';
        for (let group of dbsewa) {
            let remainingTime = group.expired - now;
            if (remainingTime > 0) {
                listText += `ID: ${group.id}\n` +
                            `Waktu Tersisa: ${msToDate(remainingTime)}\n` +
                            `Tanggal Berakhir: ${formatDate(group.expired)}\n\n`;
            }
        }
        conn.reply(m.chat, listText, m);
    }
}

    if (command === 'ceksewa') {
    let groupId = args[0] || m.chat;
    let groupData = dbsewa.find(group => group.id === groupId);

    if (!groupData) {
        conn.reply(
            m.chat,
            `Grup ini tidak memiliki masa sewa aktif atau ID grup tidak ditemukan.`,
            m
        );
    } else {
        let remainingTime = groupData.expired - now;

        if (remainingTime <= 0) {
            conn.reply(
                m.chat,
                `Masa sewa grup ini telah habis. Silakan perpanjang untuk melanjutkan penggunaan bot.`,
                m
            );
        } else {
            conn.reply(
                m.chat,
                `Masa sewa aktif di grup ini adalah:\n\n` +
                `*Waktu Tersisa*: ${msToDate(remainingTime)}\n` +
                `*Tanggal Berakhir*: ${formatDate(groupData.expired)}`,
                m
            );
        }
    }
}
};

setInterval(() => {
    checkSewa(global.conn);
}, 3600000);

handler.help = ['addsewa <link grup> <hari>', 'listsewa', 'ceksewa'];
handler.tags = ['owner'];
handler.command = /^(addsewa|ceksewa|listsewa)$/i;
handler.rowner = /^(addsewa|)$/i;

module.exports = handler;