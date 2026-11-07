/* Virtual Math Lab · SMA — fungsi bersama (tanpa pustaka luar) */
(function(){
const V = window.VML = {};
V.$ = (s, r=document) => r.querySelector(s);
V.$$ = (s, r=document) => Array.from(r.querySelectorAll(s));
V.rand = (a, b) => Math.floor(Math.random()*(b-a+1))+a;
V.randNZ = (a, b) => { let x=0; while(x===0) x=V.rand(a,b); return x; };
V.pick = arr => arr[Math.floor(Math.random()*arr.length)];
V.shuffle = arr => { const a=arr.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
V.gcd = (a, b) => { a=Math.abs(a); b=Math.abs(b); while(b){[a,b]=[b,a%b];} return a||1; };
V.lcm = (a, b) => Math.abs(a*b)/V.gcd(a,b);
V.round = (x, d=2) => { const p=Math.pow(10,d); return Math.round(x*p)/p; };
V.num = (x, d=2) => String(V.round(x,d)).replace('.',',');
V.m = x => String(x).replace(/-/g,'−');                    // tanda minus tipografis
V.neg = x => x<0 ? '(−' + (-x) + ')' : String(x);              // tulis bilangan negatif dalam kurung
V.sgn = x => x<0 ? '− ' + Math.abs(x) : '+ ' + x;           // "+ 3" / "− 3"
V.F = (n, d) => `<span class="fr"><span>${n}</span><span>${d}</span></span>`;   // pecahan bertumpuk
V.simp = (n, d) => { if(d<0){n=-n;d=-d;} const g=V.gcd(n,d); return [n/g, d/g]; };
V.fracHTML = (n, d) => { [n,d]=V.simp(n,d); if(d===1) return V.m(n); return (n<0?'−':'')+V.F(Math.abs(n), d); };
V.fracTxt = (n, d) => { [n,d]=V.simp(n,d); return d===1 ? String(n) : n+'/'+d; };

/* elemen */
V.h = (tag, attrs={}, html) => { const e=document.createElement(tag); for(const k in attrs){ if(k==='on') for(const ev in attrs.on) e.addEventListener(ev, attrs.on[ev]); else e.setAttribute(k, attrs[k]); } if(html!==undefined) e.innerHTML=html; return e; };
const NS='http://www.w3.org/2000/svg';
V.s = (tag, attrs={}, parent) => { const e=document.createElementNS(NS, tag); for(const k in attrs) e.setAttribute(k, attrs[k]); if(parent) parent.appendChild(e); return e; };
V.txt = (parent, x, y, str, attrs={}) => { const t=V.s('text', Object.assign({x, y, 'text-anchor':'middle', 'font-size':14}, attrs), parent); t.textContent=str; if(attrs.fill) t.style.fill=attrs.fill; return t; };
V.clear = el => { while(el.firstChild) el.removeChild(el.firstChild); };
V.narrow = () => window.innerWidth < 600;
V.onResize = fn => { let t; window.addEventListener('resize', ()=>{ clearTimeout(t); t=setTimeout(fn,120); }); };
V.css = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
V.svgPoint = (svg, ev) => { const p=svg.createSVGPoint(); const t=ev.touches?ev.touches[0]:ev; p.x=t.clientX; p.y=t.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); };
V.drag = (svg, target, onMove) => {
  let on=false;
  const start = e => { on=true; e.preventDefault(); move(e); };
  const move = e => { if(!on) return; e.preventDefault(); onMove(V.svgPoint(svg, e)); };
  const end = () => { on=false; };
  target.addEventListener('pointerdown', e=>{ target.setPointerCapture && target.setPointerCapture(e.pointerId); start(e); });
  target.addEventListener('pointermove', move);
  target.addEventListener('pointerup', end); target.addEventListener('pointercancel', end);
};

/* seret pada SVG yang tetap (aman walau isinya digambar ulang) */
V.dragSvg = (svg, pick, move) => {
  const first = !svg._drag; svg._drag = {pick, move}; if(!first) return;
  let id = null;
  svg.addEventListener('pointerdown', e => { const p=V.svgPoint(svg,e); const k=svg._drag.pick(p); if(k===null||k===undefined) return; id=k; try{svg.setPointerCapture(e.pointerId);}catch(_){} e.preventDefault(); svg._drag.move(id,p); });
  svg.addEventListener('pointermove', e => { if(id===null) return; e.preventDefault(); svg._drag.move(id, V.svgPoint(svg,e)); });
  const end = () => { id=null; }; svg.addEventListener('pointerup', end); svg.addEventListener('pointercancel', end); svg.addEventListener('pointerleave', end);
};
/* bidang Kartesius: menggambar petak, sumbu, angka. Mengembalikan fungsi konversi */
V.plane = (g, o={}) => {
  const {xmin=-10,xmax=10,ymin=-10,ymax=10,W=440,H=440,pad=24,lab=2,grid=1,names=true} = o; const labY=o.labY||lab, gridY=o.gridY||grid;
  const sx=(W-2*pad)/(xmax-xmin), sy=(H-2*pad)/(ymax-ymin);
  const X=x=>pad+(x-xmin)*sx, Y=y=>H-pad-(y-ymin)*sy, ix=px=>xmin+(px-pad)/sx, iy=py=>ymin+(H-pad-py)/sy;
  for(let x=Math.ceil(xmin/grid)*grid;x<=xmax+1e-9;x+=grid) V.s('line',{x1:X(x),y1:Y(ymin),x2:X(x),y2:Y(ymax),stroke:'var(--line)','stroke-width':1},g);
  for(let y=Math.ceil(ymin/gridY)*gridY;y<=ymax+1e-9;y+=gridY) V.s('line',{x1:X(xmin),y1:Y(y),x2:X(xmax),y2:Y(y),stroke:'var(--line)','stroke-width':1},g);
  if(ymin<=0&&ymax>=0) V.s('line',{x1:X(xmin),y1:Y(0),x2:X(xmax),y2:Y(0),stroke:'var(--ink)','stroke-width':2},g);
  if(xmin<=0&&xmax>=0) V.s('line',{x1:X(0),y1:Y(ymin),x2:X(0),y2:Y(ymax),stroke:'var(--ink)','stroke-width':2},g);
  const y0=Math.min(Math.max(0,ymin),ymax), x0=Math.min(Math.max(0,xmin),xmax);
  for(let x=Math.ceil(xmin/lab)*lab;x<=xmax+1e-9;x+=lab) if(Math.abs(x)>1e-9) V.txt(g,X(x),Y(y0)+15,V.m(V.round(x,2)),{'font-size':11,fill:'var(--muted)'});
  for(let y=Math.ceil(ymin/labY)*labY;y<=ymax+1e-9;y+=labY) if(Math.abs(y)>1e-9) V.txt(g,X(x0)-6,Y(y)+4,V.m(V.round(y,2)),{'font-size':11,fill:'var(--muted)','text-anchor':'end'});
  if(names){ V.txt(g,X(xmax)-4,Y(y0)-6,'X',{'font-weight':800,'text-anchor':'end'}); V.txt(g,X(x0)+8,Y(ymax)+12,'Y',{'font-weight':800,'text-anchor':'start'}); }
  if(xmin<=0&&ymin<=0) V.txt(g,X(0)-6,Y(0)+15,'O',{'font-size':11,'font-weight':700,'text-anchor':'end'});
  return {X,Y,ix,iy,sx,sy};
};

/* penyimpanan nilai terbaik (aman bila storage diblokir) */
V.store = {
  get(k){ try{ return JSON.parse(localStorage.getItem('sma10:'+k)); }catch(e){ return null; } },
  set(k,v){ try{ localStorage.setItem('sma10:'+k, JSON.stringify(v)); }catch(e){} }
};

/* tab */
V.tabs = () => {
  const btns=V.$$('.tabs button'); const panels=V.$$('.panel');
  const show = id => { btns.forEach(b=>b.classList.toggle('on', b.dataset.target===id)); panels.forEach(p=>p.classList.toggle('on', p.id===id)); };
  btns.forEach(b=>b.addEventListener('click', ()=>{ show(b.dataset.target); history.replaceState(null,'','#'+b.dataset.target); window.scrollTo({top: V.$('.tabs').offsetTop-56, behavior:'smooth'}); window.dispatchEvent(new Event('tabchange')); }));
  const h=location.hash.slice(1); show(panels.some(p=>p.id===h) ? h : panels[0].id);
};

/* normalisasi jawaban isian */
V.norm = s => String(s).toLowerCase().replace(/\s+/g,'').replace(/−|–/g,'-').replace(/,/g,'.').replace(/°/g,'').replace(/^\+/,'');
V.match = (input, ans, strict) => {
  if(typeof ans==='function') return ans(input);
  const list = Array.isArray(ans) ? ans : [ans];
  const a = V.norm(input); if(a==='') return false;
  return list.some(x => { const b=V.norm(x); if(a===b) return true; if(strict) return false;
    const na=Number(a), nb=Number(b); if(!isNaN(na)&&!isNaN(nb)) return Math.abs(na-nb)<1e-9;
    // pecahan a/b
    const fa=a.match(/^(-?\d+)\/(\d+)$/), fb=b.match(/^(-?\d+)\/(\d+)$/);
    if(fa&&fb) return Number(fa[1])*Number(fb[2])===Number(fb[1])*Number(fa[2]);
    if(fa&&!isNaN(nb)) return Math.abs(Number(fa[1])/Number(fa[2])-nb)<1e-9;
    return false; });
};

/* pengurai bentuk aljabar sederhana: "3x^2-2x+5", "4a+3b" -> {x2:3,x:-2,'':5} */
V.poly = str => {
  let t=String(str).replace(/\s+/g,'').replace(/[−–]/g,'-').replace(/[×*·]/g,'').replace(/²/g,'^2').toLowerCase();
  if(!t) return null; if(!/^[+-]/.test(t)) t='+'+t;
  const re=/([+-])(\d+(?:[.,]\d+)?)?((?:[a-z](?:\^\d)?)*)/g; const out={}; let m, used=0;
  while((m=re.exec(t)) && m[0]!==''){ used+=m[0].length; if(!m[2]&&!m[3]) return null;
    const c=(m[1]==='-'?-1:1)*(m[2]?Number(m[2].replace(',','.')):1);
    const vars={}; (m[3].match(/[a-z](?:\^\d)?/g)||[]).forEach(v=>{ vars[v[0]]=(vars[v[0]]||0)+(v[2]?+v[2]:1); });
    const key=Object.keys(vars).sort().map(k=>k+(vars[k]>1?vars[k]:'')).join('');
    out[key]=(out[key]||0)+c; }
  if(used!==t.length) return null;
  Object.keys(out).forEach(k=>{ if(Math.abs(out[k])<1e-12) delete out[k]; }); return out;
};
V.polyEq = (a, b) => { const A=V.poly(a), B=V.poly(b); if(!A||!B) return false; const ks=new Set([...Object.keys(A),...Object.keys(B)]); for(const k of ks) if(Math.abs((A[k]||0)-(B[k]||0))>1e-9) return false; return true; };

/* ---------- KUIS ---------- */
V.quiz = (root, bank, key) => {
  const L='ABCDE';
  let qs, i, score, log;
  const start = () => {
    qs = V.shuffle(bank).map(q => {
      if(q.input) return Object.assign({}, q);
      const idx = q.o.map((_,k)=>k); const sh = q.fixed ? idx : V.shuffle(idx);
      return Object.assign({}, q, { o: sh.map(k=>q.o[k]), a: sh.indexOf(q.a) });
    });
    i=0; score=0; log=[]; render();
  };
  const render = () => {
    const q = qs[i];
    root.innerHTML = `<div class="qbox"><div class="qhead"><span>Soal ${i+1} dari ${qs.length}</span><span>Skor: <span class="counter">${score}</span></span></div>
      <div class="bar"><i style="width:${i/qs.length*100}%"></i></div>
      <div class="qtext">${q.q}</div><div class="ans"></div><div class="fbw"></div></div>`;
    const ans = V.$('.ans', root), fbw = V.$('.fbw', root);
    const done = (ok, given) => {
      if(ok) score++;
      log.push({q:q.q, ok, given, right: q.input ? (q.show || V.m(Array.isArray(q.a)?q.a[0]:q.a)) : q.o[q.a], ex:q.ex});
      fbw.innerHTML = `<div class="fb ${ok?'ok':'no'}"><b>${ok?'✓ Benar!':'✗ Belum tepat.'}</b> ${ok?'':'Jawaban: <b>'+log[log.length-1].right+'</b>. '}<div>${q.ex||''}</div></div>
        <div class="row"><button class="btn nx">${i<qs.length-1?'Soal berikutnya →':'Lihat hasil'}</button></div>`;
      V.$('.qhead .counter', root).textContent = score;
      const nx = V.$('.nx', fbw); nx.focus({preventScroll:true});
      nx.onclick = () => { i++; i<qs.length ? render() : finish(); };
    };
    if(q.input){
      ans.innerHTML = `<div class="row"><input type="text" inputmode="decimal" placeholder="Tulis jawaban…" aria-label="Jawaban"><button class="btn ck">Periksa</button></div>${q.unit?'<div class="muted" style="margin-top:6px">Satuan: '+q.unit+'</div>':''}`;
      const inp=V.$('input',ans), ck=V.$('.ck',ans);
      const go=()=>{ if(inp.value.trim()==='') { inp.focus(); return; } inp.disabled=true; ck.disabled=true; done(V.match(inp.value,q.a,q.strict), inp.value); };
      ck.onclick=go; inp.onkeydown=e=>{ if(e.key==='Enter') go(); };
    } else {
      ans.innerHTML = `<div class="opts">${q.o.map((o,k)=>`<button class="opt" data-k="${k}"><b>${L[k]}</b><span>${o}</span></button>`).join('')}</div>`;
      V.$$('.opt',ans).forEach(b => b.onclick = () => {
        const k=+b.dataset.k; V.$$('.opt',ans).forEach(x=>x.disabled=true);
        V.$$('.opt',ans)[q.a].classList.add('ok'); if(k!==q.a) b.classList.add('no');
        done(k===q.a, q.o[k]);
      });
    }
  };
  const finish = () => {
    const pct = Math.round(score/qs.length*100);
    const best = V.store.get(key)||0; if(pct>best) V.store.set(key, pct);
    const msg = pct>=90?'Luar biasa! Konsepmu sudah sangat kuat.':pct>=75?'Bagus! Tinggal sedikit lagi.':pct>=50?'Lumayan. Ulangi bagian yang masih salah, ya.':'Ayo pelajari lagi materinya, lalu coba ulang.';
    const r=60, c=2*Math.PI*r;
    root.innerHTML = `<div class="qbox"><div class="score">
      <svg class="ring" viewBox="0 0 150 150"><circle cx="75" cy="75" r="${r}" fill="none" stroke="var(--line)" stroke-width="14"/>
      <circle cx="75" cy="75" r="${r}" fill="none" stroke="var(--acc)" stroke-width="14" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-pct/100)}" transform="rotate(-90 75 75)"/>
      <text x="75" y="84" text-anchor="middle" font-size="32" font-weight="800" fill="var(--ink)">${pct}</text></svg>
      <div class="big">${score} dari ${qs.length} benar</div><p>${msg}</p><p class="muted">Nilai terbaik: ${Math.max(best,pct)}</p>
      <div class="row" style="justify-content:center"><button class="btn rs">↻ Ulangi kuis</button></div></div>
      <div class="review"><h3>Pembahasan</h3>${log.map((l,k)=>`<div class="it"><span class="tag ${l.ok?'ok':'no'}">${l.ok?'Benar':'Salah'}</span> <span class="s">${k+1}.</span> ${l.q}
      <div class="muted">Jawabanmu: ${l.given} · Kunci: <b>${l.right}</b></div><div>${l.ex||''}</div></div>`).join('')}</div></div>`;
    V.$('.rs',root).onclick = () => { start(); root.scrollIntoView({behavior:'smooth'}); };
  };
  start();
};

/* ---------- LATIHAN ACAK ----------
   gens: [{name, gen()} ] -> gen returns {q, a, ex, hint, unit} */
V.practice = (root, gens) => {
  let lvl=0, cur, right=0, tot=0, tries=0;
  root.innerHTML = `<div class="qbox">
    ${gens.length>1?`<div class="seg lv">${gens.map((g,k)=>`<button data-k="${k}" class="${k?'':'on'}">${g.name}</button>`).join('')}</div>`:''}
    <div class="qhead" style="margin-top:12px"><span>Latihan</span><span>Benar: <span class="counter c">0/0</span></span></div>
    <div class="qtext q" style="margin-top:10px"></div>
    <div class="row"><input type="text" inputmode="decimal" placeholder="Jawabanmu" aria-label="Jawaban"><button class="btn ck">Periksa</button><button class="btn soft hn">Petunjuk</button><button class="btn ghost nw">Soal baru</button></div>
    <div class="fbw"></div></div>`;
  const q=V.$('.q',root), inp=V.$('input',root), fbw=V.$('.fbw',root), cnt=V.$('.c',root);
  const next = () => { cur=gens[lvl].gen(); tries=0; q.innerHTML=cur.q+(cur.unit?` <span class="muted">(${cur.unit})</span>`:''); inp.value=''; inp.disabled=false; fbw.innerHTML=''; };
  V.$$('.lv button',root).forEach(b=>b.onclick=()=>{ V.$$('.lv button',root).forEach(x=>x.classList.remove('on')); b.classList.add('on'); lvl=+b.dataset.k; next(); });
  const check = () => {
    if(inp.disabled) { next(); return; }
    if(inp.value.trim()==='') { inp.focus(); return; }
    const ok=V.match(inp.value, cur.a, cur.strict); tries++;
    if(ok || tries>=2){ tot++; if(ok) right++; cnt.textContent=right+'/'+tot; inp.disabled=true;
      fbw.innerHTML=`<div class="fb ${ok?'ok':'no'}"><b>${ok?'✓ Benar!':'✗ Belum tepat.'}</b> Jawaban: <b>${cur.show || V.m(Array.isArray(cur.a)?cur.a[0]:cur.a)}</b><div>${cur.ex||''}</div></div>`;
    } else fbw.innerHTML=`<div class="fb hint"><b>Coba sekali lagi.</b> ${cur.hint||'Periksa kembali langkahmu.'}</div>`;
  };
  V.$('.ck',root).onclick=check; inp.onkeydown=e=>{ if(e.key==='Enter') check(); };
  V.$('.nw',root).onclick=next;
  V.$('.hn',root).onclick=()=>{ fbw.innerHTML=`<div class="fb hint"><b>Petunjuk:</b> ${cur.hint||'Baca soal pelan-pelan.'}</div>`; };
  next();
};

document.addEventListener('DOMContentLoaded', ()=>{ if(V.$('.tabs')) V.tabs(); });
})();
