const moment = require("moment-timezone");
const PhoneNum = require("awesome-phonenumber");

const regionNames = new Intl.DisplayNames(['en'], {
  type: 'region'
});

const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command: cmd
}) => {
  let num = m.quoted?.sender || m.mentionedJid?.[0] || text;
  if (!num) throw `Ex: ${usedPrefix + cmd} @tag / 628xxx`;
  num = num.replace(/\D/g, '') + '@s.whatsapp.net';
  if (!(await conn.onWhatsApp(num))[0]?.exists) throw 'User tidak menggunakan WhatsApp atau tidak ada di WhatsApp';  
  let img = await conn.profilePictureUrl(num, 'image').catch(_ => 'https://btch.pages.dev/file/70e8de9b1879568954f09.jpg');
  m.reply(wait)
  let bio = await conn.fetchStatus(num).catch(_ => {});
  let name = await conn.getName(num);
  let business = await conn.getBusinessProfile(num);
  let format = PhoneNum(`+${num.split('@')[0]}`);
  let country = regionNames.of(format.getRegionCode('international'));
  let res = `*▾ WHATSAP STALK ▾*\n\n*° Country :* ${country.toUpperCase()}\n*° Name :* ${name ? name : 'Tidak di set'}\n*° Format Number :* ${format.getNumber('international')}\n*° Url Api :* wa.me/${num.split('@')[0]}\n*° Mentions :* @${num.split('@')[0]}\n*° Status :* ${bio?.status || 'Tidak di set'}\n*° Date Status :* ${bio?.setAt ? moment(bio.setAt.toDateString()).locale('id').format('LL') : 'Tidak di set'}\n\n${business ? `*▾ INFO BUSINESS ▾*\n\n*° BusinessId :* ${business.wid}\n*° Website :* ${business.website ? business.website : 'Tidak di set'}\n*° Email :* ${business.email ? business.email : 'Tidak di set'}\n*° Category :* ${business.category}\n*° Address :* ${business.address ? business.address : 'Tidak di set'}\n*° Timeone :* ${business.business_hours.timezone ? business.business_hours.timezone : 'Tidak di set'}\n*° Descripcion* : ${business.description ? business.description : 'Tidak di set'}` : '*Standard WhatsApp Account*'}`
  img ? await conn.sendMessage(m.chat, {
    image: {
      url: img
    },
    caption: res,
    mentions: [num]
  }, {
    quoted: m
  }) : m.reply(res);
};

handler.help = ['wastalk'];
handler.tags = ['tools'];
handler.command = /^(wa|whatsapp)stalk$/i;

module.exports = handler;