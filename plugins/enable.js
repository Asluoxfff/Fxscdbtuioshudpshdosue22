const {
  generateWAMessageFromContent,
  proto,
  prepareWAMessageMedia,
} = require("@whiskeysockets/baileys");
let handler = async (m, {
	conn,
	usedPrefix,
	command,
	args,
	isOwner,
	isAdmin,
	isROwner
}) => {
	let isEnable = /true|enable|(turn)?on|1/i.test(command)
	let chat = global.db.data.chats[m.chat]
	let user = global.db.data.users[m.sender]
	let type = (args[0] || '').toLowerCase()
	let isAll = false
	let isUser = false
	let sd9 = `
	List options :
	
	• Welcome
	• Aluxi
	• antiporn
	• antidelete
	• antilink
	• antitoxic
	• grouponly 
	• private only
	• detect
	• public
	• self
	• simi
	• restrict
	• autoread
	• nyimak
	`

    let array = [{
headers: "SILAKAN PILIH UNTUK ENABLE/DISABLE",
rows: [{
   headers: "",
   title: "WELCOME",
   body: "Mengaktifkan atau menonaktifkan welcome",
  command: `${usedPrefix + command} welcome`
   },{
   headers: "",
   title: "ALUXI",
   body: "Artificial Intellegence",
  command: `${usedPrefix + command} aluxi`
   },{
   headers: "",
   title: "ANTI PORN",
   body: "Anti pornografi",
  command: `${usedPrefix + command} antiporn`
   },{
   headers: "",
   title: "ANTI DELETE",
   body: "Anti delete message",
  command: `${usedPrefix + command} antidelete`
   },{
   headers: "",
   title: "Ai",
   body: "Artificial intellegence",
  command: `${usedPrefix + command} ai`
   },{
   headers: "",
   title: "ANTI LINK",
   body: "menghapus link group lain",
  command: `${usedPrefix + command} antilink`
   },{
   headers: "",
   title: "ANTI TOXIC",
   body: "menghapus kata kata kasar / aneh",
  command: `${usedPrefix + command} antitoxic`
   },{
   headers: "",
   title: "SIMI",
   body: "artificial intellegence kasar / aneh",
  command: `${usedPrefix + command} simi`
   }]
}, {
headers: "FOR OWNERS",
rows: [{
   headers: "",
   title: "RESTRICT",
   body: "mengaktifkan atau menonaktifkan restrict",
  command: `${usedPrefix + command} restrict`
   },{
   headers: "",
   title: "AUTO READ",
   body: "membaca pesan secara otomatis",
  command: `${usedPrefix + command} autoread`
   },{
   headers: "",
   title: "NYIMAK",
   body: "bot online tetapi hanya membaca chat",
  command: `${usedPrefix + command} nyimak`
   },{
   headers: "",
   title: "GROUP ONLY",
   body: "bot hanya bisa digunakan di group",
  command: `${usedPrefix + command} gconly`
   },{
   headers: "",
   title: "PC ONLY",
   body: "bot hanya bisa digunakan di private chat",
  command: `${usedPrefix + command} pconly`
   },{
   headers: "",
   title: "PUBLIC",
   body: "mode public bot",
  command: `${usedPrefix + command} public`
   },{
   headers: "",
   title: "SELF",
   body: "mode self bot",
  command: `${usedPrefix + command} self`
   },{
   headers: "",
   title: "DETECT",
   body: "auto detect message",
  command: `${usedPrefix + command} detect`
   }]
},{
headers: "INFORMATION OWNER",
rows: [{
   headers: "",
   title: "INFO SCRIPT",
   body: "script by ALVIAN UXIO Inc.",
  command: ".sc"
   },{
   headers: "",
   title: "HUBUNGI OWNER",
   body: "report atau request fitur bot",
  command: ".owner"
   }]
}]

	switch (type) {
		case 'welcome':
			if (!m.isGroup) {
				if (!isOwner) {
					global.dfail('group', m, conn)
					throw false
				}
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			}
			chat.welcome = isEnable
			break
		case 'detect':
			if (!m.isGroup) {
				if (!isOwner) {
					global.dfail('group', m, conn)
					throw false
				}
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			}
			chat.detect = isEnable
			break
		case 'delete':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.delete = isEnable
			break
		case 'antidelete':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.delete = !isEnable
			case 'mute':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.mute = !isEnable
			break
		case 'autodelvn':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.autodelvn = isEnable
			break
		case 'document':
			chat.useDocument = isEnable
			break
		case 'public':
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['self'] = !isEnable
			break
		case 'antilink':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.antiLink = isEnable
			break
		case 'antisticker':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.antiSticker = isEnable
			break
case 'antipoto':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.antiFoto = isEnable
			break
		case 'autosticker':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.stiker = isEnable
			break
		case 'toxic':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.antiToxic = !isEnable
			break
		case 'antitoxic':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.antiToxic = isEnable
			break
		case 'autolevelup':
			isUser = true
			user.autolevelup = isEnable
			break
           case 'antibot':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiBot = isEnable
       break
		case 'mycontact':
		case 'mycontacts':
		case 'whitelistcontact':
		case 'whitelistcontacts':
		case 'whitelistmycontact':
		case 'whitelistmycontacts':
			if (!isOwner) {
				global.dfail('owner', m, conn)
				throw false
			}
			conn.callWhitelistMode = isEnable
			break
		case 'restrict':
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['restrict'] = isEnable
			break
		case 'nyimak':
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['nyimak'] = isEnable
			break
		case 'autoread':
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['autoread'] = isEnable
			break
		case 'pconly':
		case 'privateonly':
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['pconly'] = isEnable
			break
		case 'gconly':
		case 'grouponly':
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['gconly'] = isEnable
			break
		case 'swonly':
		case 'statusonly':
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['swonly'] = isEnable
			break
    case 'antiporn':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiPorn = isEnable
      break
		case 'viewonce':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.viewonce = isEnable
			break
case 'simi':
            if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
            }
            chat.simi = isEnable
            break
case 'ai':
            if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
            }
            chat.ai = isEnable
            break
           case 'hutao':
            if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
            }
            chat.aihutao = isEnable
            break
		default:
			if (!/[01]/.test(command)) return conn.sendList(m.chat,"PILIH OPTIONS", array, m, {
body: sd9,
footer: "ALVIAN UXIO Inc.",
url: "https://files.catbox.moe/0q7zy8.jpg" //isi pake url poto/video
})    
			throw false
	}
	m.reply(`
	*${type}* berhasil di *${isEnable ? 'nyala' : 'mati'}kan* ${isAll ? 'untuk bot ini' : isUser ? '' : 'untuk chat ini'}
`.trim())
}
handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['group', 'owner']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i
handler.admin = false
module.exports = handler