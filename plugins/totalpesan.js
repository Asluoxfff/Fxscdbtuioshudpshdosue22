/*
SCRIPT AKIRAA BOT BY BANG SYAII 
* ig: Akira_art12
* WhatsApp: wa.me/6283842839555
* Jangan Perjual belikan script ini jika ada yang menjual tanpa izin mohon laporkan ke saya dan jangan harap ada update Script ini kedepannya !!!
*/

let handler = async (m, { conn }) => {
    const chatId = m.chat;

    // Initialize chat data if not already present
    if (!global.db.data.chats[chatId].totalpesan) {
        global.db.data.chats[chatId].totalpesan = {};
    }

    // Get the sender's ID
    const jid = m.sender;

    // Increment the message count for the participant
    if (jid) {
        global.db.data.chats[chatId].totalpesan[jid] = (global.db.data.chats[chatId].totalpesan[jid] || 0) + 1;
    }

    // Check if the command is deltotalpesan
    if (/^deltotalpesan$/i.test(m.text)) {
        // Reset message counts for the chat only if it exists
        delete global.db.data.chats[chatId].totalpesan;
        await m.reply(`*Total pesan telah direset untuk grup ini.*`);
        return; // Exit after handling reset command
    }

    // Check if the command is totalpesan
    if (/^totalpesan$/i.test(m.text)) {
        const sortedData = Object.entries(global.db.data.chats[chatId].totalpesan)
            .sort((a, b) => b[1] - a[1]);

        const totalM = sortedData.reduce((acc, [, total]) => acc + total, 0);
        const totalPeople = sortedData.length;

        const pesan = sortedData
            .map(([jid, total], index) => `*${index + 1}.* ${jid.replace(/(\d+)@.+/, '@$1')}: *${total}* pesan`)
            .join('\n');

        await m.reply(`*Total Pesan*: *${totalM}* pesan dari *${totalPeople}* orang\n\n${pesan}`,
            null, {
                contextInfo: {
                    mentionedJid: sortedData.map(([jid]) => jid)
                }
            }
        );
    }
}

// Make sure to track incoming messages
handler.before = async (m, { conn }) => {
    const chatId = m.chat;
    
    // Initialize chat data if not already present
    if (!global.db.data.chats[chatId].totalpesan) {
        global.db.data.chats[chatId].totalpesan = {};
    }

    // Get the sender's ID
    const jid = m.sender;

    // Increment the message count for the participant
    if (jid) {
        global.db.data.chats[chatId].totalpesan[jid] = (global.db.data.chats[chatId].totalpesan[jid] || 0) + 1;
    }
}

handler.help = ['totalpesan', 'deltotalpesan'];
handler.tags = ['group'];
handler.command = /^(totalpesan|deltotalpesan)$/i;
handler.group = true;

module.exports = handler;