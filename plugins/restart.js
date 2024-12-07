let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (command === 'restart') {
    conn.reply(m.chat, `_Restarting Bot . . ._`, m);
    await sleep(3000); // Sleep for 3 seconds
    process.send("reset");
  }
}

handler.help = ["restart"];
handler.tags = ["owner"];
handler.command = ["restart"];
handler.rowner = true;

module.exports = handler;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));