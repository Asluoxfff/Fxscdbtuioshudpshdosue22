function _0x1322(_0x50c977,_0x26b1d){const _0x56c036=_0x56c0();return _0x1322=function(_0x1322de,_0x2e181a){_0x1322de=_0x1322de-0x86;let _0x3b59f4=_0x56c036[_0x1322de];return _0x3b59f4;},_0x1322(_0x50c977,_0x26b1d);}function _0x56c0(){const _0x30722d=['13168NmYmFl','unlink','Failed\x20to\x20delete\x20audio\x20file:\x20','util','Mohon\x20tunggu,\x20sedang\x20mengirim\x20video...','Deleted\x20audio\x20file:\x20','6282gtobJB','timestamp','views','reply','*[\x20YOUTUBE\x20MP4\x20]*\x0a*•\x20Caption:*\x20','get','url','Error\x20fetching\x20YouTube\x20content:','Error\x20fetching\x20YouTube\x20content','downloader','download','\x0a*•\x20Source\x20Yt:*\x20','120363199957492480@newsletter','Error:\x20','image/png','No\x20results\x20found','sender','createWriteStream','\x20*[link]*','message','decodeJid','\x0a*•\x20Views:*\x20','ytmp4\x20*[query]*','stream','YOUTUBE','Want\x20to\x20download\x20the\x20video?','getFile','https://api.alvianuxio.my.id/api/ytdl?message=','YOUTUBE\x20MP4','1381529symirp','16oxlkfG','chat','318369BQAsbZ','10JgSmBZ','10kZoBIC','\x0a*•\x20Duration:*\x20','videoId','&apikey=aluxi','2726076KHZeuF','response','39Mkscnc','2ZMNocX','readFileSync','Please\x20wait...','.ytv\x20','success','thumbnail','data','author','image','name','./package.json','ALVIAN\x20UXIO\x20Inc.','video','7333389sCOBxo','\x0a*•\x20Ago:*\x20','seconds','log','title','tags','\x20seconds\x0a*•\x20Thumbnail:*\x20','©\x20ALUXI\x20-\x20MD','hello','10816971BItjMK','12050172RqkVqf','result','play','error','description','.mp3'];_0x56c0=function(){return _0x30722d;};return _0x56c0();}const _0x26ca15=_0x1322;(function(_0x1f3139,_0x5dea19){const _0x3b7fc9=_0x1322,_0x36cd4e=_0x1f3139();while(!![]){try{const _0x41f754=-parseInt(_0x3b7fc9(0xa7))/0x1*(-parseInt(_0x3b7fc9(0xb3))/0x2)+parseInt(_0x3b7fc9(0xaa))/0x3*(parseInt(_0x3b7fc9(0xa8))/0x4)+parseInt(_0x3b7fc9(0xac))/0x5*(-parseInt(_0x3b7fc9(0xb0))/0x6)+-parseInt(_0x3b7fc9(0xc0))/0x7+parseInt(_0x3b7fc9(0xd0))/0x8*(-parseInt(_0x3b7fc9(0x8a))/0x9)+parseInt(_0x3b7fc9(0xab))/0xa*(-parseInt(_0x3b7fc9(0xc9))/0xb)+parseInt(_0x3b7fc9(0xca))/0xc*(parseInt(_0x3b7fc9(0xb2))/0xd);if(_0x41f754===_0x5dea19)break;else _0x36cd4e['push'](_0x36cd4e['shift']());}catch(_0x131b88){_0x36cd4e['push'](_0x36cd4e['shift']());}}}(_0x56c0,0xb2378));const axios=require('axios'),fs=require('fs'),{pipeline}=require(_0x26ca15(0xa1)),{promisify}=require(_0x26ca15(0x87)),streamPipeline=promisify(pipeline),os=require('os'),downloadYouTubeContent=async _0x22440b=>{const _0x40f457=_0x26ca15;try{const _0x4e7736=await axios[_0x40f457(0x8f)](_0x40f457(0xa5)+_0x22440b+_0x40f457(0xaf));if(_0x4e7736['data']&&_0x4e7736[_0x40f457(0xb9)]['data']&&_0x4e7736[_0x40f457(0xb9)][_0x40f457(0xb9)][_0x40f457(0xb1)]&&_0x4e7736[_0x40f457(0xb9)][_0x40f457(0xb9)][_0x40f457(0xb1)]['success']&&_0x4e7736['data'][_0x40f457(0xb9)][_0x40f457(0xb1)][_0x40f457(0xcb)]){const _0x1cc805=_0x4e7736[_0x40f457(0xb9)][_0x40f457(0xb9)][_0x40f457(0xb1)]['result'];return{'success':!![],'result':{'type':_0x40f457(0xbf),'videoId':_0x1cc805[_0x40f457(0xae)],'url':_0x1cc805[_0x40f457(0x90)],'title':_0x1cc805[_0x40f457(0xc4)],'description':_0x1cc805[_0x40f457(0xce)],'image':_0x1cc805[_0x40f457(0xbb)],'thumbnail':_0x1cc805[_0x40f457(0xb8)],'seconds':_0x1cc805['seconds'],'timestamp':_0x1cc805[_0x40f457(0x8b)],'duration':_0x1cc805['duration'][_0x40f457(0xc2)],'ago':_0x1cc805['ago'],'views':_0x1cc805[_0x40f457(0x8c)],'author':{'name':_0x1cc805[_0x40f457(0xba)][_0x40f457(0xbc)],'url':_0x1cc805[_0x40f457(0xba)][_0x40f457(0x90)]},'download':{'audio':_0x1cc805[_0x40f457(0x94)]['audio'],'video':_0x1cc805[_0x40f457(0x94)][_0x40f457(0xbf)]}}};}else return{'success':![],'message':_0x40f457(0x99)};}catch(_0x4113dd){return console[_0x40f457(0xcd)](_0x40f457(0x91),_0x4113dd),{'success':![],'message':_0x40f457(0x92)};}},handler=async(_0x1f9c2c,{conn:_0x4ce8a0,command:_0xb4a728,text:_0x87266d,usedPrefix:_0x12948d})=>{const _0x197da5=_0x26ca15;_0x4ce8a0[_0x197da5(0xcc)]=_0x4ce8a0['play']||{};if(!_0x87266d)throw'*•\x20Example\x20:*\x20'+(_0x12948d+_0xb4a728)+_0x197da5(0x9c);_0x1f9c2c[_0x197da5(0x8d)](_0x197da5(0xb5));try{const _0x138bea=await downloadYouTubeContent(_0x87266d);if(!_0x138bea[_0x197da5(0xb7)])throw _0x138bea[_0x197da5(0x9d)];const {title:_0x5e6c33,thumbnail:_0x52419f,views:_0x19711f,ago:_0x8f9f3c,url:_0x27c39f,seconds:_0x33701c,download:_0x125180}=_0x138bea[_0x197da5(0xcb)];if(_0x33701c>0xe10)return _0x1f9c2c[_0x197da5(0x8d)]('*[\x20DURATION\x20TOO\x20LONG\x20]*\x0aI\x20cannot\x20download\x20media\x20that\x20exceeds\x20*1\x20hour*\x20duration.');const _0x2c6eed=_0x197da5(0x8e)+_0x5e6c33+_0x197da5(0x9f)+_0x19711f+_0x197da5(0xc1)+_0x8f9f3c+_0x197da5(0xad)+_0x33701c+_0x197da5(0xc6)+_0x52419f+_0x197da5(0x95)+_0x27c39f;await _0x4ce8a0['sendMessage'](_0x1f9c2c[_0x197da5(0xa9)],{'document':fs[_0x197da5(0xb4)](_0x197da5(0xbd)),'fileName':_0x197da5(0xa2),'mimetype':_0x197da5(0x98),'fileLength':0x38d7ea4c67fff,'jpegThumbnail':fs[_0x197da5(0xb4)]('./media/alxo.png'),'description':_0x197da5(0xc8),'caption':_0x2c6eed,'contextInfo':{'isForwarded':!![],'mentionedJid':[_0x1f9c2c?.[_0x197da5(0x9a)]],'forwardedNewsletterMessageInfo':{'newsletterJid':_0x197da5(0x96),'newsletterName':_0x197da5(0xbe),'serverMessageId':-0x1},'businessMessageForwardInfo':{'businessOwnerJid':_0x4ce8a0[_0x197da5(0x9e)](_0x4ce8a0['user']['id'])},'externalAdReply':{'title':_0x197da5(0xa6),'body':_0x197da5(0xc7),'thumbnail':(await _0x4ce8a0[_0x197da5(0xa4)](_0x52419f))['data'],'sourceUrl':'-','mediaType':0x1,'renderLargerThumbnail':!![]}}},{'quoted':_0x1f9c2c});const _0xce79b=await axios[_0x197da5(0x8f)](_0x125180[_0x197da5(0xbf)],{'responseType':'stream'});_0x1f9c2c[_0x197da5(0x8d)](_0x197da5(0x88));const _0x19ee69=os['tmpdir'](),_0x2f40fd=_0x19ee69+'/'+_0x5e6c33+'.mp4';await streamPipeline(_0xce79b[_0x197da5(0xb9)],fs[_0x197da5(0x9b)](_0x2f40fd)),await _0x4ce8a0['sendMessage'](_0x1f9c2c[_0x197da5(0xa9)],{'video':fs[_0x197da5(0xb4)](_0x2f40fd),'mimetype':'video/mp4','fileName':_0x5e6c33+_0x197da5(0xcf)},{'quoted':_0x1f9c2c}),fs[_0x197da5(0xd1)](_0x2f40fd,_0xb85b82=>{const _0x133823=_0x197da5;if(_0xb85b82)console['error'](_0x133823(0x86)+_0xb85b82);else console[_0x133823(0xc3)](_0x133823(0x89)+_0x2f40fd);});const _0x5b9cb1=[{'buttonId':_0x197da5(0xb6)+_0x125180[_0x197da5(0xbf)],'buttonText':{'displayText':'Download\x20Video'},'type':0x1}],_0x34b803={'text':_0x197da5(0xa3),'buttons':_0x5b9cb1,'headerType':0x1};}catch(_0x284d3c){_0x1f9c2c[_0x197da5(0x8d)](_0x197da5(0x97)+_0x284d3c);}};handler['help']=[_0x26ca15(0xa0)],handler[_0x26ca15(0xc5)]=[_0x26ca15(0x93)],handler['command']=/^(ytmp4|ytv|ytvideo)$/i,module['exports']=handler;