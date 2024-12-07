let handler = async (m, { conn, args, usedPrefix, command }) => {
    const caption = `–––––『 OPTIONS 』–––––
📄 Type: simi
📊 Status: Success ✅
🔧 Options: Enable
📢 For: This Chats

「 CATOZOLALA 」`;

    // Define buttons
    const buttons = [
        { buttonId: `${usedPrefix}disable`, buttonText: { displayText: "❌ Disable" }, type: 1 },
        { buttonId: `${usedPrefix}menu`, buttonText: { displayText: "🎀 Menu" }, type: 1 }
    ];

    // Define button message structure
    const buttonMessage = {
        text: caption,
        footer: ' ', // Optional footer
        buttons: buttons,
        headerType: 1
    };

    // Send button message
    await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
};

// Define help, tags, and command for handler
handler.help = ["example"];
handler.tags = ["info"];
handler.command = ["testbtn"];

module.exports = handler;