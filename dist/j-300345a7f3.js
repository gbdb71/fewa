!function(){"use strict";var t={};!function(){for(var t=0,e=["webkit","moz","o","ms"],i=0;i<e.length&&!window.requestAnimationFrame;i+=1)window.requestAnimationFrame=window[e[i]+"RequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,i){var o=(new Date).getTime(),r=Math.max(0,16-(o-t)),n=window.setTimeout(function(){e(o+r)},r);return t=o+r,n})}(),function(){t.obj={extend:function(){var t=Object.prototype.hasOwnProperty,e=Object.prototype.toString,i=function(i){if(!i||"[object Object]"!==e.call(i))return!1;var o=t.call(i,"constructor"),r=i.constructor&&i.constructor.prototype&&t.call(i.constructor.prototype,"isPrototypeOf");if(i.constructor&&!o&&!r)return!1;var n;for(n in i);return void 0===n||t.call(i,n)};return function o(){var t,e,r,n,s,a,c=arguments[0],l=1,h=arguments.length,u=!1;for("boolean"==typeof c?(u=c,c=arguments[1]||{},l=2):("object"!=typeof c&&"function"!=typeof c||null===c)&&(c={});l<h;++l)if(t=arguments[l],null!==t)for(e in t)r=c[e],n=t[e],c!==n&&(u&&n&&(i(n)||(s=Array.isArray(n)))?(s?(s=!1,a=r&&Array.isArray(r)?r:[]):a=r&&i(r)?r:{},c[e]=o(u,a,n)):void 0!==n&&(c[e]=n));return c}}()},t.obj.extend(!0,t,{vendor:{prefixes:["","ms","webkit","moz","o"],get:function(t){var e,i;for(i=0;i<this.prefixes.length;i++)if(e=this.prefixes[i]+(""===this.prefixes[i]?t:t.charAt(0).toUpperCase()+t.slice(1)),"undefined"!=typeof document.body.style[e])return e;return null}},dom:{get:function(t){return document.getElementById(t)},create:function(t){return document.createElement(t)}},arr:{create:function(t,e){for(var i,o=[],r=0;r<t;r+=1)i="undefined"==typeof e?[]:e,o.push(i);return o},move:function(t,e,i){t[e]=t.splice(i,1,t[e])[0]},loop:function(t,e,i){for(var o=t.length,r=0;r<o;r+=1)e.call(i||null,t[r],r)}},rand:{intg:function(t){return Math.random()*(t||268435455)|0},flot:function(){return Math.random()},bool:function(){return Math.random()>.5},range:function(e,i){return t.rand.intg(i-e)+e},rangef:function(e,i){return t.rand.flot()*(i-e)+e},select:function(e){return e[t.rand.range(0,e.length)]}},PI2:2*Math.PI,RAD:Math.PI/180,DEG:180/Math.PI,noop:function(){},line:function(t,e,i,o,r,n,s){t.strokeStyle=n,t.lineWidth=s,t.beginPath(),t.moveTo(e,i),t.lineTo(o,r),t.stroke()},rect:function(e,i,o,r,n,s,a,c,l,h){i+=c,r-=2*c,o+=c,n-=2*c,e.beginPath(),e.strokeStyle=a,e.lineWidth=c,e.moveTo(i+s,o),e.lineTo(i+r-s,o),e.quadraticCurveTo(i+r,o,i+r,o+s),e.lineTo(i+r,o+n-s),e.quadraticCurveTo(i+r,o+n,i+r-s,o+n),e.lineTo(i+s,o+n),e.quadraticCurveTo(i,o+n,i,o+n-s),e.lineTo(i,o+s),e.quadraticCurveTo(i,o,i+s,o),e.closePath(),e.stroke(),l&&(e.fillStyle=l,e.fill()),h&&t.rect(e,i-c,o-c,r+2*c,n+2*c,1.2*s,h,c/2)},sine:function(t,e,i,o,r,n,s){var a=(e+o)/2,c=(i+r)/2;t.strokeStyle=n,t.lineWidth=s,t.beginPath(),t.moveTo(e,i),t.bezierCurveTo(e,i,a/2,1.5*c,a,c),t.bezierCurveTo(1.5*a,c/2,o,r,o,r),t.stroke()}})}(),function(){t.obj.extend(!0,t,{columns:8,gap:2,speed:.1,gravity:.3,moveBg:!0,rumble:{decay:.4},starAmount:Math.floor(window.innerWidth/window.innerHeight*100),starColors:["#ffffff","#ffe9c4","#d4fbff"],elements:{FIRE:{color:"#ff3824",latency:50,against:{FIRE:20,EARTH:2,WATER:1,AIR:5},bricks:{empty:{energy:10},filled:{energy:20},special:{energy:40}},desc:"The Fire element, most effective against fire bricks, but least effective against water bricks.",spec:"Fire special brick explodes the whole column of bricks."},EARTH:{color:"#44db5e",latency:80,against:{FIRE:5,EARTH:20,WATER:2,AIR:1},bricks:{empty:{energy:10},filled:{energy:20},special:{energy:40}},desc:"The Earth element, most effective against earth bricks, but least effective against air bricks.",spec:"Earth special brick explodes surrounding bricks."},WATER:{color:"#54c7fc",latency:70,against:{FIRE:1,EARTH:2,WATER:20,AIR:5},bricks:{empty:{energy:10},filled:{energy:20},special:{energy:40}},desc:"The Water element, most effective against water bricks, but least effective against fire bricks.",spec:"Water special brick explodes the whole row of bricks."},AIR:{color:"#ffcd00",latency:60,against:{FIRE:5,EARTH:1,WATER:2,AIR:20},bricks:{empty:{energy:10},filled:{energy:20},special:{energy:40}},desc:"The Air element, most effective against air bricks, but least effective against earth bricks.",spec:"Air special brick explodes all the weak(stroked) air bricks."}}})}(),function(){t.sprite={items:{},create:function(t,e,i,o){if(!this.get(t)){var r=document.createElement("canvas");r.width=e,r.height=i;var n=r.getContext("2d");n.save(),o(n),n.restore(),this.set(t,r)}return this.get(t)},set:function(t,e){this.items[t]=e},get:function(t){return this.items[t]},factory:function(){var e=t.brickWidth/10,i=t.brickWidth/2,o=t.brickHeight/2,r=t.brickWidth/10,n=e,s="rgba(255,255,255,0.8)",a="rgba(255,255,0,0.5)";this.create("AIR",t.brickWidth,t.brickWidth,function(e){var i=(t.brickWidth-2*r)/4;t.rect(e,0,0,t.brickWidth,t.brickWidth,n,t.elements.AIR.color,r,null,s),e.lineWidth=r,e.strokeStyle=t.elements.AIR.color,e.translate(r,0);for(var o=0;o<3;o++)e.beginPath(),e.moveTo(i,r),e.lineTo(i,t.brickWidth-r),e.stroke(),e.translate(i,0)}),this.create("AIR-SHOT",t.brickWidth,t.brickHeight,function(o){t.rect(o,i-e,0,2*e,t.brickHeight,2,t.elements.AIR.color,r,t.elements.AIR.color,a)}),this.create("AIR-BRICK-empty",t.brickWidth,t.brickHeight,function(e){t.rect(e,0,0,t.brickWidth,t.brickHeight,n,t.elements.AIR.color,r,null,s)}),this.create("AIR-BRICK-filled",t.brickWidth,t.brickHeight,function(e){t.rect(e,0,0,t.brickWidth,t.brickHeight,n,t.elements.AIR.color,r,t.elements.AIR.color,s)}),this.create("AIR-BRICK-special",t.brickWidth,t.brickHeight,function(e){e.fillStyle=t.elements.AIR.color,e.fillRect(i-o/2,r,o,t.brickHeight-2*r),t.rect(e,0,0,t.brickWidth,t.brickHeight,n,t.elements.AIR.color,r,null,s)}),this.create("EARTH",t.brickWidth,t.brickWidth,function(e){var i=(t.brickWidth-2*r)/4;t.rect(e,0,0,t.brickWidth,t.brickWidth,n,t.elements.EARTH.color,r,null,s),e.lineWidth=r,e.strokeStyle=t.elements.EARTH.color,e.translate(0,r);for(var o=0;o<3;o++)e.beginPath(),e.moveTo(r,i),e.lineTo(t.brickWidth-r,i),e.stroke(),e.translate(0,i)}),this.create("EARTH-SHOT",t.brickWidth,t.brickHeight,function(o){t.rect(o,i-e,0,2*e,t.brickHeight,2,t.elements.EARTH.color,r,t.elements.EARTH.color,a)}),this.create("EARTH-BRICK-empty",t.brickWidth,t.brickHeight,function(e){t.rect(e,0,0,t.brickWidth,t.brickHeight,n,t.elements.EARTH.color,r,null,s)}),this.create("EARTH-BRICK-filled",t.brickWidth,t.brickHeight,function(e){t.rect(e,0,0,t.brickWidth,t.brickHeight,n,t.elements.EARTH.color,r,t.elements.EARTH.color,s)}),this.create("EARTH-BRICK-special",t.brickWidth,t.brickHeight,function(e){e.fillStyle=t.elements.EARTH.color,e.fillRect(i-o/2,r,o,t.brickHeight-2*r),t.rect(e,0,0,t.brickWidth,t.brickHeight,n,t.elements.EARTH.color,r,null,s)}),this.create("WATER",t.brickWidth,t.brickWidth,function(e){var i=(t.brickWidth-2*r)/4;t.rect(e,0,0,t.brickWidth,t.brickWidth,n,t.elements.WATER.color,r,null,s),e.lineWidth=r,e.strokeStyle=t.elements.WATER.color,e.translate(0,r);for(var o=0;o<3;o++)t.sine(e,r,i,t.brickWidth-r,i),e.translate(0,i)}),this.create("WATER-SHOT",t.brickWidth,t.brickHeight,function(o){t.rect(o,i-e,0,2*e,t.brickHeight,2,t.elements.WATER.color,r,t.elements.WATER.color,a)}),this.create("WATER-BRICK-empty",t.brickWidth,t.brickHeight,function(e){t.rect(e,0,0,t.brickWidth,t.brickHeight,n,t.elements.WATER.color,r,null,s)}),this.create("WATER-BRICK-filled",t.brickWidth,t.brickHeight,function(e){t.rect(e,0,0,t.brickWidth,t.brickHeight,n,t.elements.WATER.color,r,t.elements.WATER.color,s)}),this.create("WATER-BRICK-special",t.brickWidth,t.brickHeight,function(e){t.line(e,2*r,o,t.brickWidth-2*r,o,t.elements.WATER.color,r),t.rect(e,0,0,t.brickWidth,t.brickHeight,n,t.elements.WATER.color,r,null,s)}),this.create("FIRE",t.brickWidth,t.brickWidth,function(e){var i=(t.brickWidth-2*r)/4;t.rect(e,0,0,t.brickWidth,t.brickWidth,n,t.elements.FIRE.color,r,null,s),e.lineWidth=r,e.strokeStyle=t.elements.FIRE.color,e.translate(-r,0),e.translate(t.brickWidth/2,t.brickWidth/2),e.rotate(90*t.RAD),e.translate(-t.brickWidth/2,-t.brickWidth/2);for(var o=0;o<3;o++)t.sine(e,r,i,t.brickWidth-r,i),e.translate(0,i)}),this.create("FIRE-SHOT",t.brickWidth,t.brickHeight,function(o){t.rect(o,i-e,0,2*e,t.brickHeight,2,t.elements.FIRE.color,r,t.elements.FIRE.color,a)}),this.create("FIRE-BRICK-empty",t.brickWidth,t.brickHeight,function(e){t.rect(e,0,0,t.brickWidth,t.brickHeight,n,t.elements.FIRE.color,r,null,s)}),this.create("FIRE-BRICK-filled",t.brickWidth,t.brickHeight,function(e){t.rect(e,0,0,t.brickWidth,t.brickHeight,n,t.elements.FIRE.color,r,t.elements.FIRE.color,s)}),this.create("FIRE-BRICK-special",t.brickWidth,t.brickHeight,function(e){t.line(e,i,2*r,i,t.brickHeight-2*r,t.elements.FIRE.color,r),t.rect(e,0,0,t.brickWidth,t.brickHeight,n,t.elements.FIRE.color,r,null,s)}),["#ffffff","#ed8500","#ffff00"].forEach(function(e){this.create("explosion"+e,t.brickWidth,t.brickHeight,function(i){t.rect(i,0,0,t.brickWidth,t.brickHeight,0,e,0,e)})},this)}}}(),function(){function t(){this.setSettings=function(t){for(var e=0;e<24;e++)this[String.fromCharCode(97+e)]=t[e]||0;this.c<.01&&(this.c=.01);var i=this.b+this.c+this.e;if(i<.18){var o=.18/i;this.b*=o,this.c*=o,this.e*=o}}}function e(){this._params=new t;var e,i,o,r,n,s,a,c,l,h,u,f;this.reset=function(){var t=this._params;r=100/(t.f*t.f+.001),n=100/(t.g*t.g+.001),s=1-t.h*t.h*t.h*.01,a=-t.i*t.i*t.i*1e-6,t.a||(u=.5-t.n/2,f=5e-5*-t.o),c=1+t.l*t.l*(t.l>0?-.9:10),l=0,h=1==t.m?0:(1-t.m)*(1-t.m)*2e4+32},this.totalReset=function(){this.reset();var t=this._params;return e=t.b*t.b*1e5,i=t.c*t.c*1e5,o=t.e*t.e*1e5+12,3*((e+i+o)/3|0)},this.synthWave=function(t,d){var m=this._params,p=1!=m.s||m.v,v=m.v*m.v*.1,g=1+3e-4*m.w,b=m.s*m.s*m.s*.1,y=1+1e-4*m.t,w=1!=m.s,k=m.x*m.x,x=m.g,_=m.q||m.r,A=m.r*m.r*m.r*.2,W=m.q*m.q*(m.q<0?-1020:1020),R=m.p?((1-m.p)*(1-m.p)*2e4|0)+32:0,T=m.d,E=m.j/2,C=m.k*m.k*.01,H=m.a,I=e,S=1/e,M=1/i,q=1/o,B=5/(1+m.u*m.u*20)*(.01+b);B>.8&&(B=.8),B=1-B;for(var D,F,L,G,P,j,O=!1,K=0,z=0,U=0,N=0,V=0,X=0,J=0,Q=0,Y=0,Z=0,$=new Array(1024),tt=new Array(32),et=$.length;et--;)$[et]=0;for(var et=tt.length;et--;)tt[et]=2*Math.random()-1;for(var et=0;et<d;et++){if(O)return et;if(R&&++Y>=R&&(Y=0,this.reset()),h&&++l>=h&&(h=0,r*=c),s+=a,r*=s,r>n&&(r=n,x>0&&(O=!0)),F=r,E>0&&(Z+=C,F*=1+Math.sin(Z)*E),F|=0,F<8&&(F=8),H||(u+=f,u<0?u=0:u>.5&&(u=.5)),++z>I)switch(z=0,++K){case 1:I=i;break;case 2:I=o}switch(K){case 0:U=z*S;break;case 1:U=1+2*(1-z*M)*T;break;case 2:U=1-z*q;break;case 3:U=0,O=!0}_&&(W+=A,L=0|W,L<0?L=-L:L>1023&&(L=1023)),p&&g&&(v*=g,v<1e-5?v=1e-5:v>.1&&(v=.1)),j=0;for(var it=8;it--;){if(J++,J>=F&&(J%=F,3==H))for(var ot=tt.length;ot--;)tt[ot]=2*Math.random()-1;switch(H){case 0:P=J/F<u?.5:-.5;break;case 1:P=1-J/F*2;break;case 2:G=J/F,G=6.28318531*(G>.5?G-1:G),P=1.27323954*G+.405284735*G*G*(G<0?1:-1),P=.225*((P<0?-1:1)*P*P-P)+P;break;case 3:P=tt[Math.abs(32*J/F|0)]}p&&(D=X,b*=y,b<0?b=0:b>.1&&(b=.1),w?(V+=(P-X)*b,V*=B):(X=P,V=0),X+=V,N+=X-D,N*=1-v,P=N),_&&($[Q%1024]=P,P+=$[(Q-L+1024)%1024],Q++),j+=P}j*=.125*U*k,t[et]=j>=1?32767:j<=-1?-32768:32767*j|0}return d}}var i=new e;window.jsfxr=function(t){i._params.setSettings(t);var e=i.totalReset(),o=new Uint8Array(4*((e+1)/2|0)+44),r=2*i.synthWave(new Uint16Array(o.buffer,44),e),n=new Uint32Array(o.buffer,0,44);n[0]=1179011410,n[1]=r+36,n[2]=1163280727,n[3]=544501094,n[4]=16,n[5]=65537,n[6]=44100,n[7]=88200,n[8]=1048578,n[9]=1635017060,n[10]=r,r+=44;for(var s=0,a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",c="data:audio/wav;base64,";s<r;s+=3){var l=o[s]<<16|o[s+1]<<8|o[s+2];c+=a[l>>18]+a[l>>12&63]+a[l>>6&63]+a[63&l]}return c}}();var e;!function(){function t(t){return Math.sin(6.283184*t)}function i(e){return t(e)<0?-1:1}function o(t){return t%1-.5}function r(t){var e=t%1*4;return e<2?e-1:3-e}function n(t){return.00390625*Math.pow(1.059463094,t-128)}function s(t,e){setTimeout(function(){var i=new Uint8Array(t*l*2),o=i.length-2,r=function(){for(var t=new Date,n=0;o>=0;)if(i[o]=0,i[o+1]=128,o-=2,n+=1,n%1e3===0&&new Date-t>h)return void setTimeout(r,0);setTimeout(function(){e(i)},0)};setTimeout(r,0)},0)}function a(t,e,i,o,r){var n=i.fx_delay_time*o>>1,s=i.fx_delay_amt/255,a=0,c=function(){for(var i=new Date,o=0;a<e-n;){var l=4*a,u=4*(a+n),f=t[u]+(t[u+1]<<8)+(t[l+2]+(t[l+3]<<8)-32768)*s;if(t[u]=255&f,t[u+1]=f>>8&255,f=t[u+2]+(t[u+3]<<8)+(t[l]+(t[l+1]<<8)-32768)*s,t[u+2]=255&f,t[u+3]=f>>8&255,++a,o+=1,o%1e3===0&&new Date-i>h)return void setTimeout(c,0)}setTimeout(r,0)};setTimeout(c,0)}e={};var c=44100,l=2,h=33,u=null,f=[t,i,o,r];e.AudioGenerator=function(t){this.mixBuf=t,this.waveSize=t.length/l/2},e.AudioGenerator.prototype.getWave=function(){var t,e,i,o,r,n,s,a=this.mixBuf,c=this.waveSize,h=c*l*2;for(r=h-8,n=r-36,o=String.fromCharCode(82,73,70,70,255&r,r>>8&255,r>>16&255,r>>24&255,87,65,86,69,102,109,116,32,16,0,0,0,1,0,2,0,68,172,0,0,16,177,2,0,4,0,16,0,100,97,116,97,255&n,n>>8&255,n>>16&255,n>>24&255),t=0;t<h;){for(i="",e=0;e<256&&t<h;++e,t+=2)s=4*(a[t]+(a[t+1]<<8)-32768),s=s<-32768?-32768:s>32767?32767:s,i+=String.fromCharCode(255&s,s>>8&255);o+=i}return o},e.AudioGenerator.prototype.getAudio=function(){var t=this.getWave(),e=new Audio("data:audio/wav;base64,"+btoa(t));return e.preload="none",e.load(),e},e.AudioGenerator.prototype.getAudioBuffer=function(t){null===u&&(u=new AudioContext);var e=this.mixBuf,i=this.waveSize,o=u.createBuffer(l,this.waveSize,c),r=o.getChannelData(0),n=o.getChannelData(1),s=0,a=function(){for(var c=new Date,l=0;s<i;){var u=4*(e[4*s]+(e[4*s+1]<<8)-32768);if(u=u<-32768?-32768:u>32767?32767:u,r[s]=u/32768,u=4*(e[4*s+2]+(e[4*s+3]<<8)-32768),u=u<-32768?-32768:u>32767?32767:u,n[s]=u/32768,s+=1,l+=1,l%1e3===0&&new Date-c>h)return void setTimeout(a,0)}setTimeout(function(){t(o)},0)};setTimeout(a,0)},e.SoundGenerator=function(t,e){this.instr=t,this.rowLen=e||5605,this.osc_lfo=f[t.lfo_waveform],this.osc1=f[t.osc1_waveform],this.osc2=f[t.osc2_waveform],this.attack=t.env_attack,this.sustain=t.env_sustain,this.release=t.env_release,this.panFreq=Math.pow(2,t.fx_pan_freq-8)/this.rowLen,this.lfoFreq=Math.pow(2,t.lfo_freq-8)/this.rowLen},e.SoundGenerator.prototype.genSound=function(e,i,o){for(var r=(new Date,0),s=0,a=n(e+12*(this.instr.osc1_oct-8)+this.instr.osc1_det)*(1+8e-4*this.instr.osc1_detune),l=n(e+12*(this.instr.osc2_oct-8)+this.instr.osc2_det)*(1+8e-4*this.instr.osc2_detune),h=this.instr.fx_resonance/255,u=0,f=0,d=this.attack+this.sustain+this.release-1;d>=0;--d){var m=d+o,p=this.osc_lfo(m*this.lfoFreq)*this.instr.lfo_amt/512+.5,v=1;d<this.attack?v=d/this.attack:d>=this.attack+this.sustain&&(v-=(d-this.attack-this.sustain)/this.release);var g=a;this.instr.lfo_osc1_freq&&(g+=p),this.instr.osc1_xenv&&(g*=v*v),r+=g;var b=this.osc1(r)*this.instr.osc1_vol;g=l,this.instr.osc2_xenv&&(g*=v*v),s+=g,b+=this.osc2(s)*this.instr.osc2_vol,this.instr.noise_fader&&(b+=(2*Math.random()-1)*this.instr.noise_fader*v),b*=v/255;var y=this.instr.fx_freq;this.instr.lfo_fx_freq&&(y*=p),y=1.5*Math.sin(3.141592*y/c),u+=y*f;var w=h*(b-f)-u;switch(f+=y*w,this.instr.fx_filter){case 1:b=w;break;case 2:b=u;break;case 3:b=f;break;case 4:b=u+w}if(g=t(m*this.panFreq)*this.instr.fx_pan_amt/512+.5,b*=39*this.instr.env_master,m=4*m,m+3<i.length){var k=i[m]+(i[m+1]<<8)+b*(1-g);i[m]=255&k,i[m+1]=k>>8&255,k=i[m+2]+(i[m+3]<<8)+b*g,i[m+2]=255&k,i[m+3]=k>>8&255}}},e.SoundGenerator.prototype.getAudioGenerator=function(t,i){var o=this.attack+this.sustain+this.release-1+32*this.rowLen,r=this;s(o,function(n){r.genSound(t,n,0),a(n,o,r.instr,r.rowLen,function(){i(new e.AudioGenerator(n))})})},e.SoundGenerator.prototype.createAudio=function(t,e){this.getAudioGenerator(t,function(t){e(t.getAudio())})},e.SoundGenerator.prototype.createAudioBuffer=function(t,e){this.getAudioGenerator(t,function(t){t.getAudioBuffer(e)})},e.MusicGenerator=function(t){this.song=t,this.waveSize=c*t.songLen},e.MusicGenerator.prototype.generateTrack=function(t,i,o){var r=this;s(this.waveSize,function(n){var s=r.waveSize,c=r.waveSize*l*2,u=r.song.rowLen,f=r.song.endPattern,d=new e.SoundGenerator(t,u),m=0,p=0,v=0,g=function(){for(var e=new Date;;)if(32!==v){if(p===f-1)return void setTimeout(b,0);var i=t.p[p];if(i){var o=t.c[i-1].n[v];o&&d.genSound(o,n,m)}if(m+=u,v+=1,new Date-e>h)return void setTimeout(g,0)}else v=0,p+=1},b=function(){a(n,s,t,u,w)},y=0,w=function(){for(var t=new Date,e=0;y<c;){var r=i[y]+(i[y+1]<<8)+n[y]+(n[y+1]<<8)-32768;if(i[y]=255&r,i[y+1]=r>>8&255,y+=2,e+=1,e%1e3===0&&new Date-t>h)return void setTimeout(w,0)}setTimeout(o,0)};setTimeout(g,0)})},e.MusicGenerator.prototype.getAudioGenerator=function(t){var i=this;s(this.waveSize,function(o){var r=0,n=function(){r<i.song.songData.length?(r+=1,i.generateTrack(i.song.songData[r-1],o,n)):t(new e.AudioGenerator(o))};n()})},e.MusicGenerator.prototype.createAudio=function(t){this.getAudioGenerator(function(e){t(e.getAudio())})},e.MusicGenerator.prototype.createAudioBuffer=function(t){this.getAudioGenerator(function(e){e.getAudioBuffer(t)})}}(),function(){t.music={generate:function(t,i){var o=new AudioContext,r=new e.MusicGenerator(this.tracks[t]);r.createAudioBuffer(function(e){var r=o.createBufferSource(),n=o.createGain();r.buffer=e,r.connect(n),n.connect(o.destination),r.volume=function(t){return t>-1?void(n.gain.value=t):n.gain.value},this.pool[t]=r,i(r)}.bind(this))},pool:{},tracks:{main:{songLen:198,songData:[{osc1_oct:9,osc1_det:0,osc1_detune:0,osc1_xenv:0,osc1_vol:161,osc1_waveform:0,osc2_oct:9,osc2_det:0,osc2_detune:4,osc2_xenv:0,osc2_vol:182,osc2_waveform:0,noise_fader:0,env_attack:100,env_sustain:1818,env_release:18181,env_master:192,fx_filter:0,fx_freq:0,fx_resonance:254,fx_delay_time:6,fx_delay_amt:108,fx_pan_freq:3,fx_pan_amt:61,lfo_osc1_freq:0,lfo_fx_freq:0,lfo_freq:3,lfo_amt:94,lfo_waveform:2,p:[1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,0,2,3,4,1,2,3,4,5,6,7,8,1,2,1,2,3,4,5,6,5,6,7,8],c:[{n:[142,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,140,0,0,0,0,0,0,0,138,0,0,0,0,0,0,0]},{n:[135,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,135,0,0,0,138,0,0,0]},{n:[140,0,138,0,135,0,0,0,0,0,0,0,0,0,130,0,142,0,140,0,135,0,0,0,0,0,0,0,138,0,0,0]},{n:[135,0,0,0,0,0,0,0,0,0,0,0,0,0,130,0,142,0,0,0,0,0,0,0,135,0,0,0,138,0,0,0]},{n:[123,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{n:[130,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{n:[128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{n:[119,131,0,0,0,0,0,0,0,0,0,0,0,0,0,0,126,114,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}]},{osc1_oct:8,osc1_det:0,osc1_detune:0,osc1_xenv:0,osc1_vol:0,osc1_waveform:0,osc2_oct:8,osc2_det:0,osc2_detune:0,osc2_xenv:0,osc2_vol:0,osc2_waveform:0,noise_fader:19,env_attack:100,env_sustain:0,env_release:3636,env_master:192,fx_filter:1,fx_freq:8100,fx_resonance:156,fx_delay_time:2,fx_delay_amt:22,fx_pan_freq:3,fx_pan_amt:43,lfo_osc1_freq:0,lfo_fx_freq:0,lfo_freq:0,lfo_amt:0,lfo_waveform:0,p:[0,0,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2],c:[{n:[135,0,135,0,0,135,0,135,135,0,135,0,0,135,0,135,135,0,135,0,0,135,0,135,135,0,135,0,0,135,0,135]},{n:[135,0,135,0,0,135,0,135,135,0,135,0,0,135,0,135,135,0,135,0,0,135,0,135,135,0,135,0,135,0,135,135]}]},{osc1_oct:6,osc1_det:0,osc1_detune:0,osc1_xenv:0,osc1_vol:192,osc1_waveform:1,osc2_oct:8,osc2_det:0,osc2_detune:8,osc2_xenv:0,osc2_vol:82,osc2_waveform:2,noise_fader:0,env_attack:100,env_sustain:4545,env_release:2727,env_master:192,fx_filter:3,fx_freq:2700,fx_resonance:85,fx_delay_time:6,fx_delay_amt:60,fx_pan_freq:6,fx_pan_amt:86,lfo_osc1_freq:0,lfo_fx_freq:1,lfo_freq:7,lfo_amt:106,lfo_waveform:0,p:[0,0,0,0,1,1,2,3,1,1,2,3,1,1,2,3,1,1,2,3,1,1,2,3,0,0,0,0,1,1,1,1,2,3],c:[{n:[135,135,147,135,0,135,147,135,135,135,147,135,0,135,147,135,135,135,147,135,0,135,147,135,135,135,147,135,0,135,147,135]},{n:[140,140,152,140,0,140,152,140,140,140,152,140,0,140,152,140,140,140,152,140,0,140,152,140,140,140,152,140,0,140,152,142]},{n:[131,131,143,131,0,131,143,131,131,131,143,131,0,131,143,131,138,138,150,138,0,138,150,138,138,138,150,138,0,138,150,137]}]},{osc1_oct:7,osc1_det:0,osc1_detune:0,osc1_xenv:0,osc1_vol:187,osc1_waveform:2,osc2_oct:5,osc2_det:0,osc2_detune:2,osc2_xenv:1,osc2_vol:161,osc2_waveform:2,noise_fader:0,env_attack:100,env_sustain:1818,env_release:2727,env_master:123,fx_filter:1,fx_freq:1900,fx_resonance:162,fx_delay_time:2,fx_delay_amt:153,fx_pan_freq:6,fx_pan_amt:61,lfo_osc1_freq:0,lfo_fx_freq:1,lfo_freq:2,lfo_amt:196,lfo_waveform:3,p:[0,0,0,0,0,0,0,0,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,1,2,1,1,1,1,1,2],c:[{n:[135,135,138,135,142,135,140,138,135,135,138,135,142,135,140,138,135,135,138,135,142,135,140,138,135,135,138,135,142,135,140,138]},{n:[143,143,155,143,0,143,155,143,143,143,150,143,147,143,140,143,138,138,143,138,143,140,138,140,138,138,143,138,142,140,138,140]}]},{osc1_oct:8,osc1_det:0,osc1_detune:0,osc1_xenv:1,osc1_vol:192,osc1_waveform:0,osc2_oct:7,osc2_det:0,osc2_detune:0,osc2_xenv:1,osc2_vol:70,osc2_waveform:2,noise_fader:8,env_attack:100,env_sustain:0,env_release:9090,env_master:164,fx_filter:2,fx_freq:5500,fx_resonance:240,fx_delay_time:6,fx_delay_amt:51,fx_pan_freq:3,fx_pan_amt:66,lfo_osc1_freq:0,lfo_fx_freq:0,lfo_freq:0,lfo_amt:0,lfo_waveform:0,p:[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1],c:[{n:[135,0,0,0,0,0,135,0,0,0,135,0,0,0,0,0,135,0,0,0,0,0,135,0,0,0,135,0,0,0,0,0]}]}],rowLen:6615,endPattern:41}}}}(),function(){t.fx={click:{count:4,params:[[2,,.06,,.61,.58,,.0092,-.0248,.0059,.9077,-1,-.855,,-1,,-.24,-.4599,.9991,-.647,-.5371,,-1,.33]]},hover:{count:4,params:[[2,.46,.01,.0058,,.29,,-.06,-.02,,,-.7,.5,,-1,,-.5125,-.2453,.4399,-.7,,.0058,-1,.51]]},select:{count:4,params:[[2,,.0138,,.86,.52,,.04,-.04,,,-1,,,-1,,-1,-.56,.63,-.4,.35,,-1,.16]]},move:{count:4,params:[[2,.18,.01,,.3702,.14,,-.0799,.26,.41,.67,-1,,,-1,,-.1999,-.3199,.46,-.0799,,,-1,.4]]},hit:{count:18,params:[[2,.16,.18,,,.4,,-.3199,-.4399,,,-1,,,-1,,-1,-1,.74,-1,,.54,-1,.55]]},explosion:{count:4,params:[[3,,.11,.81,.4543,.11,,-1,-1,,,.36,.21,.45,-.6599,,-.04,.72,.26,-.4399,,,-.64,.34]]},explosionBig:{count:4,params:[[3,,.87,,,.22,,,-.14,,,-1,,,-1,,.08,-.28,.44,-.3399,,,-1,.17]]},levelup:{count:1,params:[[3,.0061,.1462,.0048,.9138,.5027,,.065,,,.6737,.1527,,,-.9567,,.081,-.0307,.071,.0945,,2e-4,,.26]]},death:{count:1,params:[[0,1e-4,.7618,.1376,.81,.1,,.3358,3e-4,,,.3006,,,.048,.6803,-1,-.76,.9985,.6463,.3453,,-1,.27]]}},t.audio={sounds:{},references:[],mute:!1,play:function(e){if(!t.audio.mute){var i=t.audio.sounds[e];i=i.length>1?t.audio.sounds[e][t.rand.range(0,i.length)]:t.audio.sounds[e][0],i.pool[i.tick].play(),i.tick<i.count-1?i.tick++:i.tick=0}}};for(var e in t.fx)t.fx.hasOwnProperty(e)&&(t.audio.sounds[e]=[],t.fx[e].params.forEach(function(i,o){t.audio.sounds[e].push({tick:0,count:t.fx[e].count,pool:[]});for(var r=0;r<t.fx[e].count;r++){var n=new Audio;"undefined"!=typeof jsfxr&&(n.src=jsfxr(i)),t.audio.references.push(n),t.audio.sounds[e][o].pool.push(n)}}))}(),function(){t.entity=function(e){this.x=e.x||0,this.y=e.y||0,this.w=e.w||0,this.h=e.h||0,this.col=e.col||0,this.name=e.name||"",this.removed=!1,this.sprite=t.sprite.create(this.name,this.w,this.h,function(t){t.fillStyle=this.col,t.fillRect(0,0,this.w,this.h)}.bind(this))},t.entity.prototype.destroy=function(){this.removed=!0},t.entity.prototype.draw=function(){t.ctx.translate(this.x,this.y),this.rotate&&t.ctx.rotate(this.rotate*t.RAD),t.ctx.drawImage(this.sprite,-this.w/2,-this.h/2,this.w,this.h)}}(),function(){t.particle=function(e){t.entity.apply(this,arguments),this.dir=t.rand.bool()?-1:1,this.vx=5*Math.random()-2,this.vy=Math.random()*-10-1,this.move=e.speed+t.rand.rangef(-.5,.5),this.distance=0,this.maxDistance=(e.dist||200)+t.rand.range(-30,30),this.delta=this.w/this.maxDistance},t.particle.prototype=Object.create(t.entity.prototype),t.particle.prototype.constructor=t.particle,t.particle.prototype.update=function(){this.w-=this.delta,this.h-=this.delta,this.vy+=t.gravity,this.y+=this.vy,this.x+=this.vx,this.distance+=Math.sqrt(Math.pow(this.vx,2)+Math.pow(this.vy,2)),this.distance>this.maxDistance&&(this.distance=this.maxDistance,this.destroy())},t.particle.prototype.draw=function(){t.ctx.save(),t.ctx.globalAlpha=1-this.distance/this.maxDistance,t.entity.prototype.draw.call(this),t.ctx.restore()}}(),function(){t.explosion=function(e){t.entity.apply(this,arguments),this.distance=0,this.rotate=t.rand.range(0,360),this.rot=e.rot||t.rand.range(-5,5),this.delta=e.delta||.1,this.maxDistance=t.rand.range(8*this.delta,15*this.delta)},t.explosion.prototype=Object.create(t.entity.prototype),t.explosion.prototype.constructor=t.explosion,t.explosion.prototype.update=function(){this.distance+=this.delta,this.w+=this.delta,this.h+=this.delta,this.rotate+=this.rot,this.distance>this.maxDistance&&(this.distance=this.maxDistance,this.destroy())},t.explosion.prototype.draw=function(){t.ctx.save(),t.ctx.globalAlpha=1-this.distance/this.maxDistance,t.entity.prototype.draw.call(this),t.ctx.restore()}}(),function(){t.bullet=function(e){this.column=e.column,this.type=e.type,this.speed=5,this.width=t.brickWidth,this.height=t.brickHeight,this.x=this.column*this.width+t.gap*(this.column+1),this.y=t.stage.height-t.brickWidth,this.hw=this.width/2,this.hh=this.height/2,this.rad=1,this.removed=!1,this.power=100,this.sprite=t.sprite.get(this.type+"-SHOT")},t.bullet.prototype.destroy=function(){Array.prototype.push.apply(t.explosions,[new t.explosion({name:"explosion#ffffff",x:this.x+this.hw,y:this.y,w:this.power/4,h:this.power/4,col:"#ffffff",delta:2,rot:0}),new t.explosion({name:"explosion#ed8500",x:this.x+this.hw,y:this.y,w:this.power/7,h:this.power/7,col:"#ed8500",delta:1.5,rot:-5}),new t.explosion({name:"explosion#ffff00",x:this.x+this.hw,y:this.y,w:this.power/8,h:this.power/8,col:"#ffff00",delta:1,rot:4})]),this.removed=!0},t.bullet.prototype.update=function(){this.y-=this.speed*t.timer.delta,t.arr.loop(t.bricks[this.column],function(e,i){null!==e&&e.y>this.y-t.brickHeight&&(this.power=t.elements[this.type].against[e.type],this.type===e.type&&(t.rumble.level=1),e.hit(this.power,this.type),this.destroy())},this)},t.bullet.prototype.draw=function(){t.ctx.save(),t.ctx.translate(this.x,this.y),t.ctx.drawImage(this.sprite,0,0),t.ctx.restore()}}(),function(){t.tower=function(e){this.type=e.type,this.w=t.brickWidth,this.h=t.brickWidth,this.setColumn(e.column),this.y=t.stage.height-this.h,this.col=t.elements[this.type].color,this.hw=this.w/2,this.hh=this.h/2,this.rad=Math.round(this.w/10),this.removed=!1,this.sprite=t.sprite.get(this.type),this.shootDelay=this.latency=t.elements[this.type].latency},t.tower.prototype.setColumn=function(e){this.column=e,this.x=this.column*this.w+t.gap*(this.column+1)},t.tower.prototype.destroy=function(){this.removed=!0;var e,i,o=this.w/6,r=this.h/6;for(t.rumble.level=10,e=1;e<6;e++)for(i=1;i<6;i++)t.particles.push(new t.particle({name:"particle"+this.col,x:this.x+e*o,y:this.y+i*r,w:o,h:r,col:this.col,speed:t.rand.range(1,5),dist:100*t.rand.range(3,5)}));t.audio.play("explosion")},t.tower.prototype.shoot=function(){0!==t.s&&t.bullets.push(new t.bullet({column:this.column,type:this.type}))},t.tower.prototype.update=function(){this.shootDelay-=t.timer.delta,this.shootDelay<0&&(this.shoot(),this.shootDelay=this.latency)},t.tower.prototype.draw=function(){t.ctx.save(),t.ctx.translate(this.x,this.y),t.ctx.drawImage(this.sprite,0,0),t.ctx.restore()}}(),function(){t.brick=function(e){if(this.column=e.column,this.type=e.type,this.w=t.brickWidth,this.h=t.brickHeight,this.x=this.column*this.w+t.gap*(this.column+1),this.y=-this.h,this.hw=this.w/2,this.hh=this.h/2,this.rad=Math.round(this.w/10),this.removed=!1,this.col=t.elements[this.type].color,this.add=0,this.explode=t.noop,this.sprite=t.sprite.get(this.type+"-BRICK-"+e.item),this.val=this.energy=t.elements[this.type].bricks[e.item].energy,"special"===e.item)switch(e.type){case"FIRE":this.explode=function(){t.rumble.level=10,t.arr.loop(t.bricks[this.column],function(t,e){t&&!t.removed&&(t.hitType=t.type,t.destroy())}),t.audio.play("explosionBig")};break;case"EARTH":this.explode=function(){t.rumble.level=10;for(var e=0,i=t.columns;e<i;e+=1)t.arr.loop(t.bricks[e],function(t,e){t&&!t.removed&&t.row>=this.row-1&&t.row<=this.row+1&&t.column>=this.column-1&&t.column<=this.column+1&&(t.hitType=t.type,t.destroy())},this);t.audio.play("explosionBig")};break;case"WATER":this.explode=function(){t.rumble.level=10;for(var e=0,i=t.columns;e<i;e+=1)e!==this.column&&t.arr.loop(t.bricks[e],function(t,e){t&&!t.removed&&t.row===this.row&&(t.hitType=t.type,t.destroy())},this);t.audio.play("explosionBig")};break;case"AIR":this.explode=function(){t.rumble.level=10;for(var e=0,i=t.columns;e<i;e+=1)t.arr.loop(t.bricks[e],function(t,e){t&&!t.removed&&t.type===this.type&&(t.hitType=t.type,t.destroy())},this);t.audio.play("explosionBig")}}},t.brick.prototype.destroy=function(e){this.removed=!0,this.type===this.hitType&&(this.explode(),t.flash=8),t.rumble.level=5;for(var i=12,o=0,r=10;o<r;o+=1)t.particles.push(new t.particle({name:"particle"+this.col,x:this.x+this.w/2,y:this.y+this.h,w:this.w/i,h:this.h/(i/2),col:this.col,speed:t.rand.range(1,5),dist:100*t.rand.range(3,5)}));e||t.countScore(this.val),t.audio.play("explosion")},t.brick.prototype.hit=function(e,i){this.hitType=i,this.energy-=e,this.energy<=0&&!this.removed&&this.destroy(),t.audio.play("hit")},t.brick.prototype.update=function(){this.y+=t.timer.move+this.add,0===this.add?0!==t.s&&this.y>t.stage.height-this.h-t.brickWidth&&t.over():this.add-=t.gravity},t.brick.prototype.draw=function(){t.ctx.save(),t.ctx.translate(this.x,this.y),t.ctx.drawImage(this.sprite,0,0),t.ctx.restore()}}(),function(){t.star=function(e){this.x=t.rand.flot()*t.bgCtx.canvas.width,this.y=t.rand.flot()*t.bgCtx.canvas.height,this.brightness=15*e+t.rand.range(14*e,18*e)/100,this.radius=t.rand.flot()/e*4,this.color=t.starColors[t.rand.range(0,t.starColors.length)],this.draw()},t.star.prototype.draw=function(){t.bgCtx.save(),t.bgCtx.beginPath(),t.bgCtx.globalAlpha=this.brightness,t.bgCtx.fillStyle=this.color,t.bgCtx.arc(this.x,this.y,this.radius,0,t.PI2),t.bgCtx.fill(),t.bgCtx.closePath(),t.bgCtx.restore()}}(),function(){t.obj.extend(!0,t,{timer:{date:new Date,curr:null,timestamp:Date.now(),delta:1,msec:0,move:0,t:1e3/60,tick:function(){t.timer.curr=Date.now(),t.timer.d=t.timer.curr-t.timer.timestamp,t.timer.delta=t.timer.d/t.timer.t,t.timer.delta=t.timer.delta<0?.001:t.timer.delta,t.timer.delta=t.timer.delta>10?10:t.timer.delta,t.timer.msec+=t.timer.delta,t.timer.timestamp=t.timer.curr,t.timer.move=t.s*t.timer.delta}},emitter:{sum:0,row:0,emit:function(){if(t.emitter.sum>t.brickHeight+t.gap||0===t.emitter.sum){t.emitter.sum=0;for(var e,i,o,r=0,n=t.columns;r<n;r+=1)i=t.rand.select(t.elementTypes),o=t.rand.select(Object.keys(t.elements[i].bricks)),e=new t.brick({column:r,type:i,item:o}),e.row=t.emitter.row,t.bricks[r].unshift(e);t.emitter.row++,t.s+=.001}t.emitter.sum+=t.timer.move}},initBackground:function(){for(var e=null,i=0,o=t.bgs.length;i<o;i+=1){t.bgCtx.clearRect(0,0,t.bgCtx.canvas.width,t.bgCtx.canvas.height);for(var r=0,n=t.starAmount;r<n;r+=1)e=new t.star(t.bgs.length-i+1),e.draw();t.bgs[i].b.style.backgroundImage="url("+t.bg.toDataURL()+")"}},noBg:function(){t.moveBg=!t.moveBg},mute:function(){t.audio.mute=!t.audio.mute;for(var e in t.music.pool)if(t.music.pool.hasOwnProperty(e)){var i=t.music.pool[e];i.volume(t.audio.mute?0:.4)}},menu:function(e){t.paused=!0,e&&t.bricks&&(t.re.style.display="block"),t.mnu.style.display="block",t.msg.style.display="none"},newgame:function(){t.bricks=t.arr.create(t.columns),t.towers=[],t.bullets=[],t.particles=[],t.explosions=[],t.activeColumn=null,t.hoverColumn=null;var e=t.elementTypes.concat(t.arr.create(t.columns-4,0)).sort(function(){return.5-Math.random()});t.arr.loop(e,function(i,o){t.towers[o]=!!e[o]&&new t.tower({column:o,type:e[o]})}),t.score=0,t.s=t.speed,t.countScore(0),t.paused=!1,t.msg.style.display="none"},over:function(){var e=600;t.s=0,t.message("GAME OVER",0,"MAIN MENU"),t.audio.play("death"),t.towers.forEach(function(t,e){setTimeout(function(){t&&t.x&&t.destroy();
},100*e)}),t.bricks.forEach(function(t){setTimeout(function(){t.forEach(function(t){t&&!t.removed&&(t.add=-.001)})},e),e+=100})},pause:function(){t.paused?(t.paused=!1,t.message()):(t.paused=!0,t.message("PAUSE"))},help:function(){if(!t.buildHelp){for(var e in t.elements)if(t.elements.hasOwnProperty(e)){var i=e,o=t.elements[e],r=t.dom.create("div"),n=t.dom.create("h2"),s=t.dom.create("p"),a=t.dom.create("p");n.innerHTML=i+"<br />",s.innerHTML=o.desc,a.innerHTML=o.spec,r.appendChild(n),s.insertBefore(t.sprite.get(i),s.firstChild),r.appendChild(s),a.insertBefore(t.sprite.get(i+"-BRICK-special"),a.firstChild),r.appendChild(a),t.hlp.appendChild(r)}t.buildHelp=!0}t.message(t.hlp,0,"MAIN MENU")},message:function(e,i,o){var r,n=t.msg.style;t.mnu.style.display="none",e?("object"==typeof e?(t.msg.innerHTML="",e.style.display="block",t.msg.appendChild(e)):t.msg.innerHTML=e,o&&(r=t.dom.create("em"),r.innerHTML=o,t.msg.appendChild(r)),n.opacity=0,n.display="block",n.marginTop=-t.msg.offsetHeight/2+"px",n.opacity=1):n.display="none",i&&setTimeout(function(){n.display="none"},i)},credits:function(){t.message(t.crd,0,"MAIN MENU")},controls:function(){window.addEventListener("keyup",function(e){switch(e.keyCode){case 27:t.menu(!0);break;case 80:t.pause();break;case 77:t.mute();break;case 66:t.noBg()}},!1),t.ng.addEventListener("click",function(){t.newgame(),t.audio.play("click"),t.mnu.style.display="none"},!1),t.hl.addEventListener("click",function(){t.help(),t.audio.play("click")},!1),t.re.addEventListener("click",function(){t.pause()},!1),["hlp","msg","crd"].forEach(function(e){t[e].addEventListener("click",function(){t.menu()},!1)}),t.cr.addEventListener("click",function(){t.credits(),t.audio.play("click")},!1),["ng","hl","cr","re"].forEach(function(e){t[e].addEventListener("mouseover",function(){t.audio.play("hover")},!1)}),t.cnt.addEventListener("mousemove",function(e){if(!t.paused&&t.s>0){var i=e.pageX-this.offsetLeft,o=Math.floor(i/(t.brickWidth+t.gap+t.gap/t.columns));t.hoverColumn=o}else t.hoverColumn=null},!1),t.cnt.addEventListener("click",function(e){if(!t.paused&&t.s>0){var i=e.pageX-this.offsetLeft,o=Math.floor(i/(t.brickWidth+t.gap+t.gap/t.columns));t.towers[o]&&!t.towers[o].removed?null===t.activeColumn?(t.activeColumn=o,t.audio.play("select")):(t.towers[t.activeColumn].setColumn(o),t.towers[o].setColumn(t.activeColumn),t.arr.move(t.towers,t.activeColumn,o),t.activeColumn=null,t.audio.play("move")):(null!==t.activeColumn&&(t.towers[t.activeColumn].setColumn(o),t.arr.move(t.towers,t.activeColumn,o),t.audio.play("move")),t.activeColumn=null)}else t.activeColumn=null},!1)},stats:function(){var e;"function"==typeof Stats?(e=new Stats,e.setMode(0),e.domElement.style.position="absolute",e.domElement.style.left="0px",e.domElement.style.top="0px",document.body.appendChild(e.domElement),t.stats=e):t.stats={begin:t.noop,end:t.noop}},countScore:function(e){t.score+=e,t.level=Math.ceil(t.s/.12),t.hud.score.innerHTML=t.score,t.hud.level.innerHTML=t.level,t.level>t.prevLevel&&(t.prevLevel=t.level,t.message("LEVEL UP",2e3),t.audio.play("levelup"))},update:function(){t.arr.loop(t.bricks,function(e,i){t.arr.loop(e,function(t,i){t&&(t.removed?e.splice(i,1):t.update())})}),t.arr.loop([t.towers,t.bullets,t.particles,t.explosions],function(e){t.arr.loop(e,function(t,i){t&&(t.removed?e.splice(i,1):t.update())})}),t.rumble.update()},updateBackground:function(){if(t.moveBg)for(var e=0,i=t.bgs.length;e<i;e+=1)t.bgs[e].c+=e+1,t.bgs[e].b.style.backgroundPosition="0px "+t.bgs[e].c/3+"px"},rumble:{update:function(){t.rumble.level>0?(t.rumble.level-=t.rumble.decay,t.rumble.level=t.rumble.level<0?0:t.rumble.level,t.rumble.x=t.rand.rangef(-t.rumble.level,t.rumble.level),t.rumble.y=t.rand.rangef(-t.rumble.level,t.rumble.level)):(t.rumble.x=0,t.rumble.y=0)},draw:function(){0===t.rumble.x&&0===t.rumble.y||(t.stage.style[t.transformName]="translate("+t.rumble.x+"px,"+t.rumble.y+"px)")}},draw:function(){t.ctx.save(),t.ctx.clearRect(0,0,t.ctx.canvas.width,t.ctx.canvas.height),t.arr.loop(t.bricks,function(e){t.arr.loop(e,function(t){t&&!t.removed&&t.draw()})}),t.arr.loop([t.towers,t.bullets,t.particles,t.explosions],function(e){t.arr.loop(e,function(t){t&&!t.removed&&t.draw()})}),t.drawFlash(),t.rumble.draw(),t.drawSelection()},drawSelection:function(){var e,i;if(null!==t.activeColumn&&(e=t.towers[t.activeColumn],e&&e.x&&(t.ctx.save(),t.ctx.translate(e.x,0),t.ctx.lineWidth=2,t.ctx.fillStyle=t.elements[e.type].color,t.ctx.globalAlpha=.2,t.ctx.fillRect(0,0,t.brickWidth,t.stage.height),t.ctx.restore())),null!==t.hoverColumn){e=t.towers[t.activeColumn],i=t.towers[t.hoverColumn];var o="#ffffff";i&&i.x&&(o=t.elements[i.type].color),e&&e.x&&(o=t.elements[e.type].color),t.ctx.save(),t.ctx.translate(t.gap+t.hoverColumn*(t.brickWidth+t.gap),0),t.ctx.lineWidth=2,t.ctx.fillStyle=o,t.ctx.globalAlpha=.2,t.ctx.fillRect(0,0,t.brickWidth,t.stage.height),t.ctx.restore()}},drawFlash:function(){t.flash>0&&(t.flash--,t.f.style.opacity=t.flash/10)},init:function(){t.music.generate("main",function(t){t.loop=!0,t.volume(.4),t.start()}),t.obj.extend(!0,t,{ww:window.innerWidth,wh:window.innerHeight,rumble:{body:t.dom.get("r")},hud:{level:t.dom.get("lv"),score:t.dom.get("sc")},cnt:t.dom.get("cnt"),msg:t.dom.get("msg"),mnu:t.dom.get("mnu"),hlp:t.dom.get("hlp"),crd:t.dom.get("crd"),re:t.dom.get("re"),ng:t.dom.get("ng"),hl:t.dom.get("hl"),cr:t.dom.get("cr"),f:t.dom.get("f"),stage:t.dom.get("c"),bg:t.dom.get("b"),bgs:[{b:t.dom.get("b1"),c:0},{b:t.dom.get("b2"),c:0},{b:t.dom.get("b3"),c:0}]}),t.stage.width=t.wh/2,t.stage.height=t.wh-30,t.cnt.style.width=t.stage.width+"px",t.cnt.style.height=t.wh+"px",t.bg.width=t.ww,t.bg.height=t.wh,t.brickWidth=t.stage.width/t.columns-t.gap-t.gap/t.columns,t.brickHeight=t.brickWidth/2+t.gap,t.obj.extend(!0,t,{ctx:t.stage.getContext("2d"),bgCtx:t.bg.getContext("2d"),elementTypes:Object.keys(t.elements),transformName:t.vendor.get("transform"),prevLevel:0,score:0,flash:0,paused:!0});for(var e=0;e<3;e++)t.bgs[e].width=t.ww,t.bgs[e].height=t.wh;t.sprite.factory(),t.initBackground(),t.controls(),t.stats(),t.menu()}}),t.init(),function e(){requestAnimationFrame(e,t.stage.canvas),t.timer.tick(),t.stats.begin(),t.updateBackground(),t.paused||(t.emitter.emit(),t.update(),t.draw()),t.stats.end()}()}()}();