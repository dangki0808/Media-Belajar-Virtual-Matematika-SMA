/* Virtual Math Lab SMA · pembantu grafik, integral numerik, dan pengurai rumus */
(function(){
const G={};
G.fmt=(x,d=2)=>{ if(!isFinite(x)) return '∞'; const r=Math.round(x*10**d)/10**d; const s=(Object.is(r,-0)?0:r).toLocaleString('id-ID',{maximumFractionDigits:d}); return s.replace('-','−'); };
G.simpson=(f,a,b,n=400)=>{ if(a===b) return 0; if(n%2) n++; const h=(b-a)/n; let s=f(a)+f(b); for(let i=1;i<n;i++) s+=(i%2?4:2)*f(a+i*h); return s*h/3; };
G.int=(a,b)=>`<span class="intg"><span class="s">∫</span><span class="lim"><span>${b}</span><span>${a}</span></span></span>`;
G.fr=(n,d)=>`<span class="fr"><span>${n}</span><span>${d}</span></span>`;

/* ---------- pengurai rumus sederhana (aman, tanpa eval) ---------- */
G.parse=function(src){
  let s=String(src).toLowerCase().replace(/\s+/g,'').replace(/,/g,'.').replace(/[×·]/g,'*').replace(/÷/g,'/').replace(/[−–]/g,'-')
    .replace(/²/g,'^2').replace(/³/g,'^3').replace(/π/g,'pi').replace(/√/g,'sqrt').replace(/\+c$/,'').replace(/\+k$/,'');
  let i=0; const peek=()=>s[i], eat=c=>{ if(s[i]===c){ i++; return true; } return false; };
  const FN={sin:Math.sin,cos:Math.cos,tan:Math.tan,exp:Math.exp,ln:Math.log,log:x=>Math.log10(x),sqrt:Math.sqrt,akar:Math.sqrt,abs:Math.abs};
  function expr(){ let f=term(); while(peek()==='+'||peek()==='-'){ const op=s[i++], g=term(), h=f; f= op==='+'?(x=>h(x)+g(x)):(x=>h(x)-g(x)); } return f; }
  function term(){ let f=unary(); for(;;){ if(peek()==='*'||peek()==='/'){ const op=s[i++], g=unary(), h=f; f= op==='*'?(x=>h(x)*g(x)):(x=>h(x)/g(x)); }
      else if(peek()&&/[0-9a-z.(]/.test(peek())){ const g=power(), h=f; f=x=>h(x)*g(x); } else break; } return f; }
  function unary(){ if(eat('-')){ const g=unary(); return x=>-g(x); } if(eat('+')) return unary(); return power(); }
  function power(){ const b=atom(); if(eat('^')){ const e=unary(); return x=>Math.pow(b(x),e(x)); } return b; }
  function atom(){
    if(eat('(')){ const f=expr(); if(!eat(')')) throw new Error('kurung'); return f; }
    const num=s.slice(i).match(/^\d+(\.\d+)?|^\.\d+/); if(num){ i+=num[0].length; const v=parseFloat(num[0]); return ()=>v; }
    const w=s.slice(i).match(/^[a-z]+/); if(w){ let name=w[0];
      for(const k of Object.keys(FN).concat(['pi','e','x'])){ if(name.startsWith(k)){ name=k; break; } }
      i+=name.length;
      if(name==='x') return x=>x; if(name==='pi') return ()=>Math.PI; if(name==='e') return ()=>Math.E;
      if(FN[name]){ let arg; if(eat('(')){ arg=expr(); if(!eat(')')) throw new Error('kurung'); } else arg=power(); const fn=FN[name]; return x=>fn(arg(x)); }
      throw new Error('nama '+name); }
    throw new Error('simbol');
  }
  const f=expr(); if(i<s.length) throw new Error('sisa'); return f;
};
/* cek antiturunan: selisih F(x)-F(x0) harus sama (konstanta C diabaikan) */
G.sameUpToC=(input,F,pts=[0.5,1.3,2.1,2.9,3.7])=>{ let f; try{ f=G.parse(input); }catch(e){ return false; }
  const x0=pts[0]; return pts.slice(1).every(x=>{ const a=f(x)-f(x0), b=F(x)-F(x0); return isFinite(a)&&Math.abs(a-b)<1e-6*Math.max(1,Math.abs(b)); }); };
G.sameFn=(input,F,pts=[0.4,1.1,1.9,2.6,3.3])=>{ let f; try{ f=G.parse(input); }catch(e){ return false; } return pts.every(x=>{ const a=f(x),b=F(x); return isFinite(a)&&Math.abs(a-b)<1e-6*Math.max(1,Math.abs(b)); }); };

/* ---------- sumbu & kurva ---------- */
G.axes=(svg,o)=>{ const s=VML.s, txt=VML.txt;
  const W=o.W||600,H=o.H||340,p=o.pad||40,pb=o.padb||34, x0=o.x0,x1=o.x1,y0=o.y0,y1=o.y1;
  const X=x=>p+(x-x0)/(x1-x0)*(W-p-14), Y=y=>H-pb-(y-y0)/(y1-y0)*(H-pb-14), xi=px=>x0+(px-p)/(W-p-14)*(x1-x0), yi=py=>y0+(H-pb-py)/(H-pb-14)*(y1-y0);
  const g=s('g',{},svg);
  s('rect',{x:0,y:0,width:W,height:H,fill:'var(--card)'},g);
  const xs=o.xs||niceStep(x1-x0), ys=o.ys||niceStep(y1-y0); const dx=Math.min(5,Math.max(2,Math.ceil(-Math.log10(xs)))), dy=Math.min(5,Math.max(2,Math.ceil(-Math.log10(ys))));
  for(let v=Math.ceil(x0/xs)*xs; v<=x1+1e-9; v+=xs){ s('line',{x1:X(v),y1:Y(y0),x2:X(v),y2:Y(y1),stroke:'var(--line)'},g); if(Math.abs(v)>1e-9||y0>=0) txt(g,X(v),H-pb+18,G.fmt(v,dx),{'font-size':12,fill:'var(--muted)'}); }
  for(let v=Math.ceil(y0/ys)*ys; v<=y1+1e-9; v+=ys){ s('line',{x1:X(x0),y1:Y(v),x2:X(x1),y2:Y(v),stroke:'var(--line)'},g); txt(g,p-6,Y(v)+4,G.fmt(v,dy),{'font-size':12,'text-anchor':'end',fill:'var(--muted)'}); }
  if(y0<=0&&y1>=0) s('line',{x1:X(x0),y1:Y(0),x2:X(x1),y2:Y(0),stroke:'var(--ink)','stroke-width':1.6},g);
  if(x0<=0&&x1>=0) s('line',{x1:X(0),y1:Y(y0),x2:X(0),y2:Y(y1),stroke:'var(--ink)','stroke-width':1.6},g);
  if(o.lx) txt(g,W-16,(y0<=0&&y1>=0?Y(0):H-pb)-6,o.lx,{'font-size':13,'text-anchor':'end','font-weight':700,fill:'var(--ink)'});
  if(o.ly) txt(g,p+6,16,o.ly,{'font-size':13,'text-anchor':'start','font-weight':700,fill:'var(--ink)'});
  G._cid=(G._cid||0)+1; const id='gcp'+G._cid; const cpth=s('clipPath',{id},g); s('rect',{x:X(x0),y:Y(y1),width:X(x1)-X(x0),height:Y(y0)-Y(y1)},cpth);
  return {X,Y,xi,yi,W,H,y0,y1,cp:`url(#${id})`};
};
function niceStep(r){ const raw=r/8, p=10**Math.floor(Math.log10(raw)), m=raw/p; return (m<1.5?1:m<3.5?2:m<7.5?5:10)*p; }
G.curve=(f,a,b,A,n=240)=>{ let d='',pen=false; for(let k=0;k<=n;k++){ const x=a+(b-a)*k/n; let y=f(x); if(!isFinite(y)||Math.abs(y)>1e6){ pen=false; continue; } if(A.y0!=null){ const m=(A.y1-A.y0)*.02; if(y>A.y1+m||y<A.y0-m){ if(pen){ y=Math.max(A.y0-m,Math.min(A.y1+m,y)); d+='L'+A.X(x).toFixed(1)+','+A.Y(y).toFixed(1); } pen=false; continue; } } d+=(pen?'L':'M')+A.X(x).toFixed(1)+','+A.Y(y).toFixed(1); pen=true; } return d; };
G.region=(f,a,b,A,g0=()=>0,n=160)=>{ if(a===b) return ''; let d='M'+A.X(a).toFixed(1)+','+A.Y(g0(a)).toFixed(1); for(let k=0;k<=n;k++){ const x=a+(b-a)*k/n; d+='L'+A.X(x).toFixed(1)+','+A.Y(f(x)).toFixed(1); } for(let k=n;k>=0;k--){ const x=a+(b-a)*k/n; d+='L'+A.X(x).toFixed(1)+','+A.Y(g0(x)).toFixed(1); } return d+'Z'; };
window.GR=G;
})();
