const fetch = require("node-fetch");
const crypto = require("crypto");
const fs = require("fs");
let handler = async (
  m,
  { conn, text, args, command, usedPrefix, isOwner, isGroup, groupMetadata },
) => {
  const eggid = 15;
  const location = 26;
  const prefix = usedPrefix;
  const tanggal = new Date();
  const akiraa = conn;
  const pler = JSON.parse(fs.readFileSync("./database/idgrup.json").toString());
  const jangan = m.isGroup ? pler.includes(m.chat) : false;
  const pp = await conn
    .profilePictureUrl(m.sender, "image")
    .catch((_) => "https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg");
  switch (command) {
    case "pannel":
      {
      m.reply(`*☁️ LIST PANNEL YANG TERSEDIA*
*• 1GB ✅*
*• 2GB ✅*
*• 3GB ✅*
*• 4GB ✅*
*• 5GB ✅*
*• 6GB ✅*
*• 7GB ✅*
*• 8GB ✅*`)
      }
      break;
    case "addgc":
      if (!isOwner) return m.reply(`Khusus Owner`);
      pler.push(m.chat);
      fs.writeFileSync("./database/idgrup.json", JSON.stringify(pler));
      m.reply(`*GROUP ${groupMetadata.subject}*\n_Sukses Addgc✅_`);
      break;
    case "delgc":
      if (!isOwner) return m.reply(`Khusus Owner`);
      var ini = pler.indexOf(m.chat);
      pler.splice(ini, 1);
      fs.writeFileSync("./database/idgrup.json", JSON.stringify(pler));
      m.reply(`*GROUP ${groupMetadata.subject}*\n_Sukses Delgc✅_`);

      break;
    case "1gb":
      {
        if (!jangan)
          return m.reply(
            "*[ System Notice ]* the group can't access this feature"
          );
        let t = text.split(",");
        if (t.length < 2)
          return m.reply(`*• Example :* ${usedPrefix + command} *[username, number]*`);
        let username = t[0];
        let u = m.quoted
          ? m.quoted.sender
          : t[1]
            ? t[1].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
            : m.mentionedJid[0];
        let name = username;
        let egg = "15";
        let loc = "1";
        let memo = "1024";
        let cpu = "30";
        let disk = "1024";
        let email = username + "@bsstore.id";
        if (!u) return;
        let d = (await akiraa.onWhatsApp(u.split`@`[0]))[0] || {};
        let password = d.exists ? Func.makeId(8) : t[3];
        let f = await fetch(domain + "/api/application/users", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            language: "en",
            password: password.toString(),
          }),
        });
        let data = await f.json();
        if (data.errors)
          return m.reply(JSON.stringify(data.errors[0], null, 2));
        let user = data.attributes;
        let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        let { key } = await akiraa.sendMessage(
          m.chat,
          { text: "*[ CREATING SERVER.... ]*" },
          { quoted: m },
        );
        ctf = `*[ 📦 BERIKUT DATA PANNEL ANDA ]*
*• Username :* ${user.username}
*• Password :* ${password.toString()}
*• Login :* ${domain}
-------------------------------------------------------------------------------------
*🔴 Jangan Hilangkan Data Panel anda, Simpan history chat ini sebagai bukti claim garansi jika server mati/down*`;
        akiraa.sendMessage(u, { text: `${ctf}` }, { quoted: null });
        let data2 = await f2.json();
        let startup_cmd = data2.attributes.startup;

        let f3 = await fetch(domain + "/api/application/servers", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            name: "🟢 " + name + " Server",
            description: "© Terimakasih telah order di BS STORE",
            user: user.id,
            egg: parseInt(egg),
            docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
            startup: startup_cmd,
            environment: {
              INST: "npm",
              USER_UPLOAD: "0",
              AUTO_UPDATE: "0",
              CMD_RUN: "npm start",
            },
            limits: {
              memory: memo,
              swap: 0,
              disk: disk,
              io: 500,
              cpu: cpu,
            },
            feature_limits: {
              databases: 5,
              backups: 5,
              allocations: 5,
            },
            deploy: {
              locations: [parseInt(loc)],
              dedicated_ip: false,
              port_range: [],
            },
          }),
        });
        let res = await f3.json();
        if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2));
        let server = res.attributes;
        let p = `*[ SUCCESS CREATING SERVER ]*
*• User ID :* ${user.id}
*• Server ID :* ${server.id}

*• Detail Users :* \`\`\`${Func.jsonFormat(user)}\`\`\`

• Detail Server :* \`\`\`${Func.jsonFormat(user)}\`\`\`

*© 🇮🇩 BS STORE 2023 - 2024*`;
        await conn.sendMessage(m.chat, { text: p, edit: key }, { quoted: m });
      }
      break;
  }
};
handler.command = handler.help = [
  "sh",
  "pannel",
  "addgc",
  "delgc",
  "1gb"
];
handler.tags = ["cpanel"];
module.exports = handler;