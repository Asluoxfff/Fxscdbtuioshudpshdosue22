var { totalmem, freemem } = require("os");
var os = require("os");
var util = require("util");
var osu = require("node-os-utils");
var { performance } = require("perf_hooks");
var { sizeFormatter } = require("human-readable");
var format = sizeFormatter({
  std: "JEDEC", // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});
var handler = async (m, { conn }) => {
  const chats = Object.entries(conn.chats).filter(
    ([id, data]) => id && data.isChats,
  );
  const groupsIn = chats.filter(([id]) => id.endsWith("@g.us")); //groups.filter(v => !v.read_only)
  const used = process.memoryUsage();
  const cpus = os.cpus().map((cpu) => {
    cpu.total = Object.keys(cpu.times).reduce(
      (last, type) => last + cpu.times[type],
      0,
    );
    return cpu;
  });
  const cpu = cpus.reduce(
    (last, cpu, _, { length }) => {
      last.total += cpu.total;
      last.speed += cpu.speed / length;
      last.times.user += cpu.times.user;
      last.times.nice += cpu.times.nice;
      last.times.sys += cpu.times.sys;
      last.times.idle += cpu.times.idle;
      last.times.irq += cpu.times.irq;
      return last;
    },
    {
      speed: 0,
      total: 0,
      times: {
        user: 0,
        nice: 0,
        sys: 0,
        idle: 0,
        irq: 0,
      },
    },
  );
  var _muptime;
  if (process.send) {
    process.send("uptime");
    _muptime =
      (await new Promise((resolve) => {
        process.once("message", resolve);
        setTimeout(resolve, 1000);
      })) * 1000;
  }
  var muptime = clockString(_muptime);
  var old = performance.now();
  var neww = performance.now();
  var speed = neww - old;
  var cpux = osu.cpu;
  var cpuCore = cpux.count();
  var drive = osu.drive;
  var mem = osu.mem;
  var netstat = osu.netstat;
  var HostN = osu.os.hostname();
  var OS = osu.os.platform();
  var cpuModel = cpux.model();

  var d = new Date(new Date() + 3600000);
  var locale = "id";
  var weeks = d.toLocaleDateString(locale, { weekday: "long" });
  var dates = d.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  var times = d.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  m.reply(wait);
  let hsd = "`"
  var txt = `${hsd}${speed.toFixed(4)}${hsd} Ms`;
  m.reply(txt);
};
handler.help = ["ping", "speed"].map((a) => a + " *[get info server]*");
handler.tags = ["info"];
handler.command = ["ping", "speed", "pong"];

module.exports = handler;

function clockString(ms) {
  var d = isNaN(ms) ? "--" : Math.floor(ms / 86400000);
  var h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24;
  var m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60; 
  var s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [d, h, m, s]
    .map((v) => v.toString().padStart(2, 0))
    .join(":");
}