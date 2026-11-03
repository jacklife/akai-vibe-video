/* Original procedural motion renderer; deterministic for a given scene and time. */
(function(){
 const pi=Math.PI, smooth=v=>{v=Math.max(0,Math.min(1,v));return v*v*(3-2*v)}, mix=(a,b,p)=>a+(b-a)*p;
 function panel(x,y,w,h,r,fill,stroke){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1.4;ctx.stroke()}}
 function line(x1,y1,x2,y2,color,width=2){ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()}
 function circle(x,y,r,fill,stroke){ctx.beginPath();ctx.arc(x,y,r,0,pi*2);ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1.5;ctx.stroke()}}
 function txt(v,x,y,size,color,align='center',weight=600){ctx.font=`${weight} ${Math.round(size)}px "Microsoft YaHei",sans-serif`;ctx.fillStyle=color;ctx.textAlign=align;ctx.textBaseline='middle';ctx.fillText(v,x,y)}
 function fitLines(str,width,maxLines,start,min){let lines=[],f=start;for(;f>=min;f-=2){ctx.font=`700 ${Math.round(f)}px "Microsoft YaHei",sans-serif`;lines=[];let l='';for(const ch of String(str)){if(ch==='\n'){lines.push(l);l='';continue}if(l && ctx.measureText(l+ch).width>width){lines.push(l);l=ch}else l+=ch}if(l||!lines.length)lines.push(l);if(lines.length<=maxLines)break}return {font:Math.max(f,min),lines:lines.slice(0,maxLines),overflow:lines.length>maxLines}}
 function paragraph(str,x,y,width,size,color,maxLines=3){const a=fitLines(str,width,maxLines,size,Math.max(13,size*.58));a.lines.forEach((v,i)=>txt(v,x,y+(i-(a.lines.length-1)/2)*a.font*1.42,a.font,color,'center',700));if(a.overflow){ctx.save();txt('…',x+width*.47,y+(maxLines-1)*a.font*.7,a.font,color);ctx.restore()}}
 function glow(x,y,r,color){let g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2)}
 function background(W,H,time,index){let g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,'#0c1926');g.addColorStop(.5,'#111b2b');g.addColorStop(1,'#1c1725');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);let m=Math.min(W,H);glow(W*(.25+.025*Math.sin(time*.18)),H*.34,m*.7,'rgba(52,139,149,.13)');glow(W*.79,H*(.48+.025*Math.cos(time*.2)),m*.75,'rgba(201,130,112,.12)');for(let i=0;i<56;i++){let sx=((i*337)%997)/997*W,sy=((i*467)%991)/991*H;ctx.fillStyle=`rgba(238,225,204,${.06+.11*(.5+.5*Math.sin(time*.8+i))})`;ctx.fillRect(sx,sy,1.5,1.5)}ctx.strokeStyle='rgba(185,207,207,.045)';ctx.lineWidth=1;for(let i=0;i<6;i++){ctx.beginPath();ctx.moveTo(0,H*(.15+i*.14));ctx.lineTo(W,H*(.15+i*.14));ctx.stroke()}}
 function drawObject(scene,cx,cy,m,t){let p=smooth(t/.9),f=1+(1-p)*.08;ctx.save();ctx.translate(cx,cy+(1-p)*m*.04);ctx.scale(f,f);let acc='#edca8b',ink='#d8e6dc',dim='#729495';




 if(scene.visual.startsWith('satire-')){
  const kind=scene.visual,u=smooth(t/.55),k=.5+.5*Math.sin(t*3);ctx.save();ctx.scale(u,u);
  function person(x,y,scale=1){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);circle(0,-m*.085,m*.042,'#f1d0b5');panel(-m*.038,-m*.035,m*.076,m*.12,m*.028,'#78a69c');line(-m*.018,m*.08,-m*.035,m*.15,'#d5bda6',m*.014);line(m*.018,m*.08,m*.035,m*.15,'#d5bda6',m*.014);ctx.restore()}
  function pile(x,y,r){ctx.save();ctx.translate(x,y);ctx.beginPath();ctx.ellipse(0,r*.28,r,r*.36,0,0,7);ctx.fillStyle='#a67554';ctx.fill();ctx.beginPath();ctx.ellipse(0,-r*.02,r*.72,r*.32,0,0,7);ctx.fillStyle='#c99b70';ctx.fill();ctx.restore()}
  if(kind==='satire-loop'){ctx.strokeStyle='#d7bf8a';ctx.lineWidth=m*.007;ctx.beginPath();ctx.ellipse(0,0,m*.27,m*.13,0,0,pi*2);ctx.stroke();let a=t*1.9;person(Math.cos(a)*m*.27,Math.sin(a)*m*.13,.7);pile(0,0,m*.065);txt('↻',m*.29,-m*.08,m*.07,'#d5bc8b')}
  else if(kind==='satire-alarm'){person(-m*.25,m*.06,.85);line(-m*.1,m*.1,m*.37,m*.1,'#667e7b',2);for(let i=0;i<3;i++){let q=smooth((t-i*.45)/.45);ctx.save();ctx.globalAlpha=q;ctx.translate(m*.05+i*m*.15,-m*.04);circle(0,0,m*.06,'#ac645f');txt('!',0,0,m*.08,'#f8eddd');ctx.restore()}}
  else if(kind==='satire-focus'){person(-m*.30,m*.07,.85);for(let i=0;i<3;i++){let y=(i-1)*m*.12;line(-m*.15,m*.02,m*.20,y,'#648b82',2);if(i===1){pile(m*.27,y,m*.07);circle(m*.27,y,m*.105,'rgba(0,0,0,0)','#e4c181')}else circle(m*.27,y,m*.05,'#38565c')} }
  else if(kind==='satire-rewind'){line(-m*.35,m*.08,m*.34,m*.08,'#a3b8aa',3);for(let i=0;i<5;i++)circle(-m*.32+i*m*.16,m*.08,m*.009,'#cfbd94');let q=(t*.18)%1;person(mix(m*.27,-m*.25,q),-.03,.8);txt('◀  ◀',0,-m*.18,m*.055,'#d8bd81');pile(-m*.32,m*.08,m*.05)}
  else if(kind==='satire-talk'){person(0,m*.08,.9);for(let i=0;i<3;i++){let a=i*2.1,q=smooth((t-i*.45)/.6),xx=Math.cos(a)*m*.27,yy=Math.sin(a)*m*.17-m*.08;ctx.save();ctx.globalAlpha=q;panel(xx-m*.075,yy-m*.035,m*.15,m*.07,m*.025,'#41656a');txt('…',xx,yy-m*.005,m*.05,'#e9eee1');ctx.restore()}}
  else if(kind==='satire-choice'){person(0,m*.16,.75);for(let i=0;i<2;i++){let xx=(i?1:-1)*m*.23;panel(xx-m*.105,-m*.13,m*.21,m*.13,m*.02,Math.sin(t*2+i*pi)>0?'#c8ad7b':'#344d57');txt(i?'再想想':'算了吧',xx,-m*.065,m*.027,Math.sin(t*2+i*pi)>0?'#293a39':'#dce7df')}}
  else if(kind==='satire-compare'){line(0,-m*.22,0,m*.22,'#738f89',2);person(-m*.22,m*.08,.8);person(m*.22,m*.08,.8);pile(-m*.23,-m*.18,m*.045);pile(m*.22,-m*.18,m*.065);txt('→',0,-m*.05,m*.07,'#dfc48b')}
  else if(kind==='satire-grow'){person(-m*.18,m*.08,.85);pile(-m*.35,m*.13,m*.05);line(-m*.06,m*.10,m*.20,m*.10,'#e2c991',3);txt('→',m*.08,m*.07,m*.06,'#e2c991');ctx.beginPath();ctx.ellipse(m*.28,m*.10,m*.12,m*.035,0,0,7);ctx.fillStyle='#e2d7c5';ctx.fill();ctx.beginPath();ctx.ellipse(m*.28,m*.075,m*.085,m*.032,0,0,7);ctx.fillStyle='#fbf5e9';ctx.fill()}
  ctx.restore();
 }
 else if(scene.visual==='satire'){
  // A deliberately stylised icon: a visual joke rather than a realistic depiction.
  let q=smooth(t/.65);ctx.save();ctx.scale(q,q);let w=m*.20;ctx.shadowColor='rgba(0,0,0,.3)';ctx.shadowBlur=m*.04;ctx.shadowOffsetY=m*.02;
  ctx.beginPath();ctx.ellipse(0,m*.11,w*1.12,m*.085,0,0,7);ctx.fillStyle='#9b694c';ctx.fill();ctx.beginPath();ctx.ellipse(0,m*.035,w*.91,m*.09,0,0,7);ctx.fillStyle='#b17b55';ctx.fill();ctx.beginPath();ctx.ellipse(0,-m*.035,w*.65,m*.078,0,0,7);ctx.fillStyle='#c39468';ctx.fill();ctx.beginPath();ctx.moveTo(-w*.35,-m*.08);ctx.quadraticCurveTo(-w*.2,-m*.17,w*.12,-m*.2);ctx.quadraticCurveTo(w*.03,-m*.14,w*.4,-m*.09);ctx.closePath();ctx.fillStyle='#d5ac7d';ctx.fill();ctx.shadowBlur=0;ctx.shadowOffsetY=0;circle(-m*.045,m*.02,m*.012,'#f4eadb');circle(m*.045,m*.02,m*.012,'#f4eadb');circle(-m*.045,m*.02,m*.005,'#594437');circle(m*.045,m*.02,m*.005,'#594437');ctx.restore();
 }
 else if(scene.visual.startsWith('cup-')){
  const variant=scene.visual,hot=variant==='cup-event'||variant==='cup-replay'||variant==='cup-future',release=variant==='cup-release'||variant==='cup-close',w=m*.28,h=m*.27;
  // Persistent cup silhouette; the handle stays anchored to the body in every shot.
  ctx.save();let scale=1+.025*Math.sin(t*.7);ctx.scale(scale,scale);ctx.shadowColor='rgba(0,0,0,.38)';ctx.shadowBlur=m*.04;ctx.shadowOffsetY=m*.015;
  ctx.beginPath();ctx.ellipse(0,h*.63,w*.85,m*.025,0,0,7);ctx.fillStyle='rgba(0,0,0,.24)';ctx.fill();ctx.shadowBlur=0;ctx.shadowOffsetY=0;
  ctx.beginPath();ctx.ellipse(w*.55,-h*.04,w*.24,h*.30,0,0,7);ctx.strokeStyle='#cfbba1';ctx.lineWidth=m*.028;ctx.stroke();
  ctx.beginPath();ctx.moveTo(-w*.55,-h*.48);ctx.lineTo(w*.55,-h*.48);ctx.lineTo(w*.44,h*.43);ctx.quadraticCurveTo(0,h*.57,-w*.44,h*.43);ctx.closePath();let g=ctx.createLinearGradient(-w/2,0,w/2,0);g.addColorStop(0,'#aa9680');g.addColorStop(.4,'#eee2cd');g.addColorStop(1,'#b7a18a');ctx.fillStyle=g;ctx.fill();ctx.strokeStyle='#eadbc7';ctx.lineWidth=2;ctx.stroke();
  ctx.beginPath();ctx.ellipse(0,-h*.48,w*.55,m*.026,0,0,7);ctx.fillStyle='#efe2cf';ctx.fill();ctx.beginPath();ctx.ellipse(0,-h*.48,w*.47,m*.015,0,0,7);ctx.fillStyle='#715448';ctx.fill();
  if(hot){let pulse=.5+.5*Math.sin(t*2);glow(0,-h*.1,m*.26,`rgba(224,94,65,${.13+pulse*.1})`);for(let i=0;i<3;i++){let yy=-h*.58-i*m*.046-(t*15%24);ctx.beginPath();ctx.moveTo(-w*.15+i*w*.15,yy);ctx.bezierCurveTo(-w*.1+i*w*.15,yy-m*.025,-w*.23+i*w*.15,yy-m*.03,-w*.15+i*w*.15,yy-m*.06);ctx.strokeStyle=`rgba(244,214,184,${.35+.12*Math.sin(t+i)})`;ctx.lineWidth=2;ctx.stroke()}}
  ctx.restore();
  if(variant==='cup-event'||variant==='cup-replay'||release){let touch=variant==='cup-event'?smooth((t-.7)/1):variant==='cup-replay'?(.45+.55*(.5+.5*Math.sin(t*1.6))):1-smooth((t-.8)/1.6);let hx=mix(m*.42,w*.77,touch),hy=h*.04;ctx.save();ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle='#d9ae94';ctx.lineWidth=m*.07;ctx.beginPath();ctx.moveTo(m*.58,m*.24);ctx.quadraticCurveTo(m*.43,m*.2,hx,hy);ctx.stroke();circle(hx,hy,m*.04,'#e8c1a4');ctx.restore();if(hot&&touch>.8){for(let i=0;i<3;i++){let a=-.65+i*.5;line(w*.76+Math.cos(a)*m*.055,hy+Math.sin(a)*m*.055,w*.76+Math.cos(a)*m*.09,hy+Math.sin(a)*m*.09,'#efaa80',3)}}}
  if(variant==='cup-future'){for(let i=0;i<3;i++){let q=smooth((t-.4-i*.5)/.7),x=(i-1)*m*.21;ctx.save();ctx.globalAlpha=q;panel(x-m*.065,-m*.32,m*.13,m*.07,m*.014,'#38515a','#799690');txt('?',x,-m*.285,m*.042,'#e4c08a');ctx.restore()}}
  if(variant==='cup-plan'||variant==='cup-note'){let q=smooth((t-.4)/.8);ctx.save();ctx.globalAlpha=q;ctx.translate(m*.29,m*.02);ctx.rotate(.08);panel(-m*.12,-m*.16,m*.24,m*.30,m*.012,'#e5e4d7');for(let i=0;i<3;i++)line(-m*.08,-m*.08+i*m*.055,m*.07,-m*.08+i*m*.055,'#9aaea0',2);txt(variant==='cup-plan'?'第一步':'稍后想',0,m*.10,m*.026,'#516f65');ctx.restore()}
  if(variant==='cup-close'){let q=smooth((t-1)/1.4);ctx.save();ctx.globalAlpha=q;glow(0,0,m*.48,'rgba(128,187,157,.18)');ctx.restore()}
 }
 else if(scene.visual==='claim'){ // One answer assembles, then earns a question mark.
  let w=m*.68,h=m*.39;ctx.shadowColor='rgba(0,0,0,.35)';ctx.shadowBlur=m*.05;panel(-w/2,-h/2,w,h,m*.025,'#1d3441','#618783');ctx.shadowBlur=0;
  circle(-w*.39,-h*.29,m*.025,'#90c0b1');txt('AI 回答',-w*.32,-h*.29,m*.026,ink,'left');
  const ls=[.68,.75,.54];ls.forEach((v,i)=>{let q=smooth((t-.55-i*.35)/.7);panel(-w*.38,-h*.08+i*m*.055,w*v*q,m*.014,m*.007,i===2?'#d6b984':'#719b96')});
  let q=smooth((t-2.6)/.8);ctx.save();ctx.globalAlpha=q;ctx.translate(w*.36,h*.25);circle(0,0,m*.065,'#cc8077','#f3d2b5');txt('?',0,0,m*.09,'#fff4e8');ctx.restore();
 }
 else if(scene.visual==='citation'){
  let w=m*.49,h=m*.43;ctx.save();ctx.rotate(-.035);panel(-w/2,-h/2,w,h,m*.025,'#e8e5d6');txt('引用来源',-w*.36,-h*.3,m*.028,'#4b5b58','left');
  for(let i=0;i<3;i++)panel(-w*.36,-h*.12+i*m*.046,w*(i===2?.45:.7),m*.012,m*.006,'#a5b6aa');ctx.restore();let q=smooth((t-1.0)/1.0);ctx.save();ctx.translate(m*.15,m*.08);ctx.globalAlpha=q;ctx.rotate(-.10);panel(-m*.13,-m*.04,m*.26,m*.08,m*.012,'#ba6b68');txt('待核实',0,0,m*.032,'#fff3e8');ctx.restore();
 }
 else if(scene.visual==='predict'){
  const w=m*.72;panel(-w/2,-m*.15,w,m*.3,m*.025,'#203744','#779893');txt('已有内容',-w*.33,-m*.085,m*.024,'#9fbbb0');let terms=['今天','我们','来','了解','……'];terms.forEach((word,i)=>{let q=smooth((t-.3-i*.42)/.55);ctx.save();ctx.globalAlpha=q;let x=-w*.36+i*w*.17;panel(x,-m*.025,w*.14,m*.085,m*.012,i===4?'#bd8a73':'#426462');txt(word,x+w*.07,m*.018,m*.026,'#f2ede0');ctx.restore()});
 }
 else if(scene.visual==='uncertain'){
  circle(0,0,m*.13,'#334a50','#9bb8ad');txt('?',0,0,m*.13,'#e4d4b1');for(let i=0;i<3;i++){let q=smooth((t-.3-i*.35)/.55),a=(-.65+i*.65);ctx.save();ctx.globalAlpha=q;line(Math.cos(a)*m*.15,Math.sin(a)*m*.15,Math.cos(a)*m*.32,Math.sin(a)*m*.32,'#adbaaa',2);circle(Math.cos(a)*m*.35,Math.sin(a)*m*.35,m*.035,i===1?'#c78277':'#75a79d');ctx.restore()}
 }
 else if(scene.visual==='search'){
  let w=m*.7,h=m*.27;panel(-w/2,-h/2,w,h,m*.025,'#e9e6d9');circle(-w*.37,-h*.18,m*.027,'rgba(0,0,0,0)','#607d78');line(-w*.34,-h*.04,-w*.29,h*.10,'#607d78',m*.012);txt('查找原始出处',-w*.18,-h*.13,m*.028,'#536c64','left');for(let i=0;i<2;i++){let q=smooth((t-.7-i*.45)/.7);ctx.save();ctx.globalAlpha=q;panel(-w*.36,h*.18+i*m*.045,w*(i?.45:.65),m*.013,m*.006,'#afbeb4');ctx.restore()}
 }
 else if(scene.visual==='verify'){
  let w=m*.57;panel(-w/2,-m*.18,w,m*.36,m*.025,'#1c3640','#6b938e');['来源存在','内容一致','日期适用'].forEach((v,i)=>{let y=-m*.10+i*m*.095,q=smooth((t-.4-i*.65)/.5);circle(-w*.37,y,m*.025,q>.5?'#83b8a3':'#617778');txt(q>.5?'✓':'·',-w*.37,y,m*.035,'#f5f3df');txt(v,-w*.26,y,m*.028,'#dce9df','left')})
 }
 else if(scene.visual==='takeaway'){
  let q=smooth(t/.9);ctx.beginPath();ctx.arc(0,0,m*.16,-pi/2,-pi/2+pi*2*q);ctx.lineWidth=m*.008;ctx.strokeStyle='#d7be89';ctx.stroke();circle(0,0,m*.11,'#294a48');txt('✓',0,0,m*.13,'#e9dfbd');for(let i=0;i<4;i++){let a=i*pi/2+t*.15;circle(Math.cos(a)*m*.23,Math.sin(a)*m*.23,m*.007,'#a3c5b4')}
 }
 else if(scene.visual==='question'){let R=m*.16;for(let j=2;j>=0;j--){ctx.beginPath();ctx.arc(0,0,R*(1.2+j*.28)+Math.sin(t*.8+j)*m*.005,0,pi*2);ctx.strokeStyle=`rgba(203,224,210,${.13-j*.03})`;ctx.lineWidth=1;ctx.stroke()}circle(0,0,R,'#e7d9be');circle(0,0,R*.87,'#eee5d4');txt('?',0,m*.005,m*.19,'#675c60');for(let i=0;i<3;i++){let a=i*pi*2/3+t*.2;circle(Math.cos(a)*R*1.52,Math.sin(a)*R*1.52,m*.008,i===1?'#e6b785':'#8ab5ad')}}
 else if(scene.visual==='document'){let w=m*.38,h=m*.44;ctx.save();ctx.rotate(-.035);ctx.shadowColor='rgba(0,0,0,.32)';ctx.shadowBlur=m*.06;ctx.shadowOffsetY=m*.018;panel(-w*.5,-h*.5,w,h,m*.025,'#e8e8dc');ctx.shadowBlur=0;ctx.shadowOffsetY=0;panel(-w*.37,-h*.34,w*.48,m*.035,m*.01,'#9bad9f');for(let i=0;i<5;i++){let z=smooth((t-.18*i)/.65);panel(-w*.37,-h*.18+i*h*.105,w*(i===4?.37:.72)*z,m*.012,m*.006,'#b0bdb3')}ctx.restore();circle(w*.38,h*.28,m*.08,'#cc8077','#f0c9ad');txt('?',w*.38,h*.28,m*.10,'#fff5e7')}
 else if(scene.visual==='flow'){let w=m*.145,gap=m*.10;for(let i=0;i<3;i++){let z=smooth((t-i*.25)/.65),xx=(i-1)*(w+gap);ctx.save();ctx.globalAlpha=z;ctx.translate(xx,(1-z)*m*.06);ctx.shadowColor=i===1?'rgba(224,187,121,.35)':'rgba(72,155,151,.25)';ctx.shadowBlur=m*.045;panel(-w/2,-w/2,w,w,m*.025,i===1?'#d5bc88':'#294551','#78a099');ctx.shadowBlur=0;txt(['01','02','03'][i],0,0,m*.05,i===1?'#203b38':'#d9e9e0');ctx.restore();if(i<2){let p=smooth((t-.45-i*.25)/.7);line(xx+w*.61,0,xx+w*.61+gap*.72*p,0,'rgba(213,203,158,.75)',m*.004);circle(xx+w*.61+gap*.72*p,0,m*.006,acc)}}}
 else if(scene.visual==='contrast'){let w=m*.18;for(let i=0;i<2;i++){let z=smooth((t-.12*i)/.8),xx=(i?1:-1)*m*.17;ctx.save();ctx.globalAlpha=z;ctx.translate(xx+(1-z)*(i?m*.07:-m*.07),0);panel(-w/2,-w/2,w,w,m*.03,i?'#603f4c':'#294e51',i?'#c88884':'#8dc6b8');txt(i?'B':'A',0,0,m*.10,ink);ctx.restore()}txt('≠',0,0,m*.12,acc)}
 else{for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(0,0,m*(.1+i*.045)+Math.sin(t*.75+i)*m*.003,0,pi*2);ctx.strokeStyle=`rgba(231,202,151,${.6-i*.16})`;ctx.stroke()}txt('✓',0,0,m*.14,acc)}ctx.restore()}
 function locate(t){let sum=0;for(let i=0;i<project.scenes.length;i++){let s=project.scenes[i];if(t<sum+s.duration||i===project.scenes.length-1)return {index:i,scene:s,local:Math.max(0,t-sum),start:sum};sum+=s.duration}}
 function overlayScene(scene,index,local,W,H,alpha){if(alpha<=0)return;let m=Math.min(W,H),portrait=project.aspect==='portrait',intro=smooth(local/.8);ctx.save();ctx.globalAlpha=alpha;const x=W/2,y=H*(portrait?.355:.36);drawObject(scene,x,y,m,local);let titleY=H*(portrait?.605:.67),captionY=H*(portrait?.76:.84);ctx.save();ctx.globalAlpha*=smooth((local-.16)/.55);paragraph(scene.heading,W/2,titleY+(1-intro)*m*.018,W*.82,m*(portrait?.049:.051),'#f4eadb',3);paragraph(scene.caption,W/2,captionY+(1-intro)*m*.012,W*.82,m*(portrait?.033:.032),'#bdd0c6',3);ctx.restore();ctx.restore()}
 render=function(time){const W=canvas.width,H=canvas.height,m=Math.min(W,H),cur=locate(time);background(W,H,time,cur.index);const mixIn=cur.index>0?smooth(cur.local/.45):1;if(cur.index>0&&mixIn<1){let prev=project.scenes[cur.index-1];overlayScene(prev,cur.index-1,prev.duration-.01,W,H,1-mixIn)}overlayScene(cur.scene,cur.index,cur.local,W,H,mixIn);ctx.fillStyle='rgba(220,205,172,.6)';ctx.textAlign='left';ctx.font=`600 ${Math.round(m*.018)}px sans-serif`;ctx.fillText('A KUN  /  VIBE STUDIO',W*.055,H*.075);ctx.textAlign='right';ctx.fillStyle='rgba(218,202,172,.55)';ctx.fillText(String(cur.index+1).padStart(2,'0')+'  /  '+String(project.scenes.length).padStart(2,'0'),W*.945,H*.075)};
 render(position);
})();
