let handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} *[@user amount]*`;
  
  let who;
  if (m.isGroup) who = m.mentionedJid[0];
  else who = m.chat;

  if (!who) throw "*• Example :* .addmoney *[@user amount]*";
  
  let txt = text.replace("@" + who.split`@`[0], "").trim();
  console.log("Amount text:", txt);  // Debug: log the amount text
  
  // Function to parse numbers with M, JT, and K suffixes
  function parseAmount(input) {
    if (input.endsWith("Q")) {
      return parseInt(input.slice(0, -1)) * 1000000000000000; // Quadrillion
    } else if (input.endsWith("M")) {
      return parseInt(input.slice(0, -1)) * 1000000000; // Billion
    } else if (input.endsWith("JT")) {
      return parseInt(input.slice(0, -2)) * 1000000; // Million
    } else if (input.endsWith("K")) {
      return parseInt(input.slice(0, -1)) * 1000; // Thousand
    } else if (!isNaN(input)) {
      return parseInt(input); // Plain number
    } else {
      throw "*• Example :* .addmoney *[@user amount]*";
    }
  }

  let poin;
  try {
    poin = parseAmount(txt);
  } catch (error) {
    console.error("Error parsing amount:", error);  // Debug: log error if any
    throw error;
  }
  
  console.log("Parsed amount:", poin);  // Debug: log the parsed amount

  let users = global.db.data.users;
  if (!users[who]) {
    throw "User not found in database!";
  }

  if (users[m.sender].owner == true) {
    users[who].money += poin;
    conn.reply(
      m.chat,
      `Congratulations @${who.split`@`[0]}. You get +${poin.toLocaleString()} Money!`,
      m,
      {
        contextInfo: {
          mentionedJid: [who],
        },
      }
    );
  } else {
    users[who].money += poin;
    conn.reply(
      m.chat,
      `Selamat @${who.split`@`[0]}. Kamu mendapatkan +${poin.toLocaleString()} Money!`,
      m,
      {
        contextInfo: {
          mentionedJid: [who],
        },
      }
    );
  }
};

handler.help = ["addmoney *[@user, amount]*", "addbalance *[@user, amount]*"];
handler.tags = ["owner"];
handler.command = ["addmoney", "addbalance"];
handler.rowner = true;

module.exports = handler;