/* Bank soal Tryout Virtual Math Lab SMA — gaya ujian sekolah, UTBK/SNBT (Penalaran & Pengetahuan Kuantitatif), dan OSN SMA.
   Setiap generator menghasilkan soal baru dengan angka acak: {q, a, d:[pengecoh], ex}. */
(function(){
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)), P=a=>a[Math.floor(Math.random()*a.length)];
const F=n=>(n<0?'−':'')+Math.abs(n).toLocaleString('id-ID');
const D=n=>{ const r=Math.round(n*100)/100; return (r<0?'−':'')+Math.abs(r).toLocaleString('id-ID',{maximumFractionDigits:2}); };
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const fr=(a,b)=>{ if(b<0){a=-a;b=-b;} const g=gcd(a,b)||1; a/=g; b/=g; return b===1?F(a):(a<0?'−':'')+`<span class="fr"><sup>${Math.abs(a)}</sup><sub>${b}</sub></span>`; };
const sh=a=>{ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const fact=n=>n<=1?1:n*fact(n-1), C=(n,r)=>fact(n)/(fact(r)*fact(n-r));
const NAMA=['Dika','Sinta','Bayu','Nisa','Raka','Laila','Fikri','Mira','Ahmad','Zahra'], N=()=>P(NAMA);
const sg=(v,first)=>v<0?'− '+Math.abs(v):(first?'':'+ ')+v;
const lin=(a,b)=>`${a===1?'':a===-1?'−':F(a)}x${b?' '+sg(b):''}`;

const K={};
/* ===================== KELAS X ===================== */
K[10]=[
 ()=>{ const b=P([2,3,5]), m=R(3,8), n=R(2,6), p=R(1,5); const e=m+n-p; return {q:`Bentuk sederhana dari ${b}<sup>${m}</sup> × ${b}<sup>${n}</sup> : ${b}<sup>${p}</sup> adalah …`,a:`${b}<sup>${e}</sup>`,d:[`${b}<sup>${m*n-p}</sup>`,`${b}<sup>${m+n+p}</sup>`,`${b}<sup>${e+1}</sup>`],ex:`Pangkat: ${m} + ${n} − ${p} = ${e}.`}; },
 ()=>{ const r=P([2,3,5,6]), k=R(2,6), j=R(2,6); const x=k*k*r, y=j*j*r; return {q:`Hasil dari √${x} + √${y} adalah …`,a:`${k+j}√${r}`,d:[`√${x+y}`,`${k*j}√${r}`,`${k+j}√${2*r}`],ex:`√${x} = ${k}√${r} dan √${y} = ${j}√${r}, jumlahnya ${k+j}√${r}.`}; },
 ()=>{ const a=P([2,3]), n=R(3,6), m=R(2,4); return {q:`Nilai <sup>${a}</sup>log ${a**n} + <sup>${a}</sup>log ${a**m} − <sup>${a}</sup>log ${a} adalah …`,a:F(n+m-1),d:[F(n+m),F(n*m-1),F(n+m+1)],ex:`${n} + ${m} − 1 = ${n+m-1}.`}; },
 ()=>{ const a0=R(2,20), b=R(2,9), n=R(10,30); return {q:`Kursi gedung pertunjukan: baris pertama ${a0} kursi, setiap baris berikutnya bertambah ${b}. Banyak kursi pada baris ke-${n} adalah …`,a:F(a0+(n-1)*b),d:[F(a0+n*b),F(a0*n),F(a0+(n-2)*b)],ex:`U${n} = ${a0} + ${n-1}·${b} = ${a0+(n-1)*b}.`}; },
 ()=>{ const a0=R(2,8)*1000, n=R(5,8); return {q:`Bakteri berlipat dua setiap jam. Mula-mula ${F(a0)} bakteri. Setelah ${n} jam banyaknya …`,a:F(a0*2**n),d:[F(a0*2*n),F(a0*2**(n-1)),F(a0*2**(n+1))],ex:`${F(a0)} × 2<sup>${n}</sup> = ${F(a0*2**n)}.`}; },
 ()=>{ const x=R(3,15)*1000, y=R(2,12)*1000, a1=R(1,3),b1=R(1,3); let a2=R(1,3),b2=R(1,3); while(a1*b2===a2*b1){a2=R(1,4);} return {q:`${a1} kg gula dan ${b1} kg tepung harganya Rp${F(a1*x+b1*y)}. ${a2} kg gula dan ${b2} kg tepung harganya Rp${F(a2*x+b2*y)}. Harga 1 kg gula adalah …`,a:'Rp'+F(x),d:['Rp'+F(y),'Rp'+F(x+1000),'Rp'+F(Math.abs(x-y)||500)],ex:`Eliminasi menghasilkan gula Rp${F(x)} dan tepung Rp${F(y)}.`}; },
 ()=>{ const p=R(-5,4), q=p+R(1,6); return {q:`Nilai minimum fungsi f(x) = x² ${sg(-(p+q))}x ${sg(p*q)} adalah …`.replace('+ 0x ','').replace('− 0x ',''),a:D(-((q-p)**2)/4),d:[D((q-p)**2/4),D(p*q),D(-(p+q)/2)],ex:`x puncak = ${D((p+q)/2)}, f = ${D(-((q-p)**2)/4)}.`}; },
 ()=>{ const p=R(-6,2), q=p+R(2,7); return {q:`Himpunan penyelesaian x² ${sg(-(p+q))}x ${sg(p*q)} ≤ 0 adalah …`.replace('+ 0x ','').replace('− 0x ',''),a:`${F(p)} ≤ x ≤ ${F(q)}`,d:[`x ≤ ${F(p)} atau x ≥ ${F(q)}`,`${F(-q)} ≤ x ≤ ${F(-p)}`,`${F(p)} &lt; x &lt; ${F(q)}`],ex:`Pembuat nol ${p} dan ${q}; daerah negatif di antaranya, ujung ikut (≤).`}; },
 ()=>{ const d=R(5,40); const t=P([[30,'½'],[45,'1'],[60,'√3']]); return {q:`Seorang siswa berdiri ${d} m dari menara dan melihat puncaknya dengan sudut elevasi ${t[0]}°. Tinggi menara (abaikan tinggi mata) adalah …`,a:t[0]===30?`${d}/3 √3 m`.replace(`${d}/3`,d%3?`${fr(d,3)}`:F(d/3)):t[0]===45?`${d} m`:`${d}√3 m`,d:[`${d}√2 m`,`${2*d} m`,t[0]===45?`${d}√3 m`:`${d} m`],ex:`Tinggi = ${d} × tan ${t[0]}°.`}; },
 ()=>{ const a=P([[3,4,5],[5,12,13],[8,15,17],[7,24,25]]); return {q:`Diketahui sin α = ${fr(a[0],a[2])} dengan α sudut lancip. Nilai tan α adalah …`,a:fr(a[0],a[1]),d:[fr(a[1],a[0]),fr(a[1],a[2]),fr(a[2],a[1])],ex:`Sisi samping = ${a[1]}, tan α = ${a[0]}/${a[1]}.`}; },
 ()=>{ const n1=R(2,8)*5, n2=R(2,8)*5; let m1=R(60,90),m2; do{ m2=R(60,90); }while((n1*m1+n2*m2)%(n1+n2)); const g=(n1*m1+n2*m2)/(n1+n2); return {q:`Rata-rata nilai ${n1} siswa putra ${m1} dan ${n2} siswa putri ${m2}. Rata-rata nilai seluruh siswa adalah …`,a:F(g),d:[D((m1+m2)/2),F(g+1),F(g-2)],ex:`(${n1*m1} + ${n2*m2})/${n1+n2} = ${g}.`}; },
 ()=>{ const d=Array.from({length:R(7,9)},()=>R(4,10)); const s=d.slice().sort((a,b)=>a-b), n=s.length; const me=n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2; return {q:`Median data ${d.join(', ')} adalah …`,a:D(me),d:[D(d.reduce((a,b)=>a+b,0)/n),D(d[Math.floor(n/2)]===me?me+1:d[Math.floor(n/2)]),D(me-0.5)],ex:`Urutkan: ${s.join(', ')}. Median ${D(me)}.`}; }
];
/* ===================== KELAS XI ===================== */
K[11]=[
 ()=>{ const a=R(2,5), b=R(-5,5), k=R(-3,3); const f=a*k+b; return {q:`f(x) = ${lin(a,b)} dan g(x) = x² + 1. Nilai (g∘f)(${k}) adalah …`,a:F(f*f+1),d:[F(a*(k*k+1)+b),F(f*f),F(f+1)],ex:`f(${k}) = ${f}, g(${f}) = ${f*f+1}.`}; },
 ()=>{ const a=R(2,6), b=R(-9,9), x0=R(-5,6); return {q:`Jika f(x) = ${lin(a,b)}, maka f<sup>−1</sup>(${F(a*x0+b)}) = …`,a:F(x0),d:[F(a*(a*x0+b)+b),F(x0+1),F(-x0)],ex:`${a}x ${sg(b)} = ${a*x0+b} → x = ${x0}.`}; },
 ()=>{ const c=[R(1,3),R(-5,5),R(-5,5),R(-9,9)], k=R(-3,3); const v=c.reduce((a,x)=>a*k+x,0); return {q:`Sisa pembagian ${c[0]===1?'':c[0]}x³ ${sg(c[1])}x² ${sg(c[2])}x ${sg(c[3])} oleh (x ${sg(-k)}) adalah …`.replace(/[+−] 0x²? /g,''),a:F(v),d:[F(c.reduce((a,x)=>a*(-k)+x,0)),F(v+2),F(c[3])],ex:`Teorema sisa: P(${k}) = ${v}.`}; },
 ()=>{ const k=P([-2,-1,1,2,3]), a=R(1,2), b=R(-4,4), d=R(-6,6); const p=-(a*k**3+b*k*k+d)/k; if(!Number.isInteger(p)) return K[11][3](); return {q:`Polinomial ${a===1?'':a}x³ ${sg(b)}x² + px ${sg(d)} habis dibagi (x ${sg(-k)}). Nilai p adalah …`.replace(/[+−] 0x² /,''),a:F(p),d:[F(-p),F(p+1),F(p-2)],ex:`P(${k}) = 0 → p = ${p}.`}; },
 ()=>{ const a=R(-5,5), b=R(-5,5), r=R(2,9); return {q:`Pusat dan jari-jari lingkaran x² + y² ${sg(-2*a)}x ${sg(-2*b)}y ${sg(a*a+b*b-r*r)} = 0 adalah …`.replace(/[+−] 0[xy] /g,''),a:`(${F(a)}, ${F(b)}) dan ${r}`,d:[`(${F(-a)}, ${F(-b)}) dan ${r}`,`(${F(a)}, ${F(b)}) dan ${r*r}`,`(${F(2*a)}, ${F(2*b)}) dan ${r}`],ex:`Pusat (−A/2, −B/2) = (${a}, ${b}); r = √(${a*a} + ${b*b} − ${F(a*a+b*b-r*r)}) = ${r}.`}; },
 ()=>{ const tr=P([[3,4],[6,8],[5,12],[8,6]]); const r2=tr[0]**2+tr[1]**2; return {q:`Persamaan garis singgung lingkaran x² + y² = ${r2} di titik (${tr[0]}, ${tr[1]}) adalah …`,a:`${tr[0]}x + ${tr[1]}y = ${r2}`,d:[`${tr[1]}x + ${tr[0]}y = ${r2}`,`${tr[0]}x − ${tr[1]}y = ${r2}`,`${tr[0]}x + ${tr[1]}y = ${Math.sqrt(r2)}`],ex:`x₁x + y₁y = r².`}; },
 ()=>{ const X=R(5,15), Y=R(5,15), p=R(2,8), q=R(2,8); const c1=2*X+Y, c2=X+Y; const V=[[0,0],[c1/2,0],[X,Y],[0,c2]]; const zs=V.map(v=>p*v[0]+q*v[1]); const mx=Math.max(...zs); return {q:`Nilai maksimum Z = ${p}x + ${q}y dengan kendala 2x + y ≤ ${c1}, x + y ≤ ${c2}, x ≥ 0, y ≥ 0 adalah …`,a:D(mx),d:[...new Set(zs.filter(z=>z!==mx).map(D))].concat([D(mx+p)]),ex:`Titik pojok: (0,0), (${D(c1/2)},0), (${X},${Y}), (0,${c2}). Nilai Z: ${zs.map(D).join(', ')}.`}; },
 ()=>{ const m=[[R(-5,6),R(-5,6)],[R(-5,6),R(-5,6)]]; const d=m[0][0]*m[1][1]-m[0][1]*m[1][0]; return {q:`Determinan matriks [${F(m[0][0])} ${F(m[0][1])} ; ${F(m[1][0])} ${F(m[1][1])}] adalah …`,a:F(d),d:[F(m[0][0]*m[1][1]+m[0][1]*m[1][0]),F(-d===d?d+1:-d),F(m[0][0]*m[1][0]-m[0][1]*m[1][1])],ex:`ad − bc = ${d}.`}; },
 ()=>{ let a,b,c,d; do{ a=R(-4,5); b=R(-4,5); c=R(-4,5); d=R(-4,5); }while(Math.abs(a*d-b*c)!==1); const t=a*d-b*c; return {q:`Invers matriks [${F(a)} ${F(b)} ; ${F(c)} ${F(d)}] adalah …`,a:`[${F(d*t)} ${F(-b*t)} ; ${F(-c*t)} ${F(a*t)}]`,d:[`[${F(d)} ${F(b)} ; ${F(c)} ${F(a)}]`,`[${F(-d*t)} ${F(b*t)} ; ${F(c*t)} ${F(-a*t)}]`,`[${F(a)} ${F(-c)} ; ${F(-b)} ${F(d)}]`],ex:`det = ${t}; A⁻¹ = (1/det)[d −b ; −c a].`}; },
 ()=>{ const n=R(5,10), r=3; return {q:`Dari ${n} calon akan dipilih ketua, sekretaris, dan bendahara. Banyak susunan pengurus adalah …`,a:F(fact(n)/fact(n-3)),d:[F(C(n,3)),F(n*3),F(fact(n)/fact(n-2))],ex:`Permutasi P(${n},3) = ${fact(n)/fact(n-3)}.`}; },
 ()=>{ const m=R(3,7), b=R(2,6); return {q:`Kotak berisi ${m} bola merah dan ${b} bola biru. Diambil 2 bola sekaligus. Peluang terambil 1 merah dan 1 biru adalah …`,a:fr(m*b,C(m+b,2)),d:[fr(C(m,2),C(m+b,2)),fr(m,m+b),fr(m*b,(m+b)**2)],ex:`${m}·${b}/C(${m+b},2) = ${m*b}/${C(m+b,2)}.`}; },
 ()=>{ const N=6*R(5,30), k=R(2,12); let c=0; for(let a=1;a<=6;a++) for(let b=1;b<=6;b++) if(a+b===k) c++; return {q:`Dua dadu dilempar ${N} kali. Frekuensi harapan muncul jumlah mata ${k} adalah …`,a:D(N*c/36),d:[D(N/11),D(N*c/12),D(N*(c+1)/36)],ex:`P = ${c}/36, Fh = ${N} × ${c}/36 = ${D(N*c/36)}.`}; }
];
/* ===================== KELAS XII ===================== */
K[12]=[
 ()=>{ const p=R(-5,5), q=R(-6,6); return {q:`Nilai lim<sub>x→${F(p)}</sub> (x² ${sg(-(p+q))}x ${sg(p*q)}) / (x ${sg(-p)}) adalah …`.replace(/[+−] 0x /,'').replace(/ [+−] 0\)/,')'),a:F(p-q),d:[F(p+q),'0',F(q-p)===F(p-q)?F(p-q+1):F(q-p)],ex:`Faktorkan: (x − ${F(p)})(x − ${F(q)}), sisa (x − ${F(q)}) → ${p-q}.`}; },
 ()=>{ const m=R(2,3), a=R(2,9), b=R(1,6); return {q:`Nilai lim<sub>x→∞</sub> (${a}x<sup>${m}</sup> − 3x + 1) / (${b}x<sup>${m}</sup> + 5) adalah …`,a:fr(a,b),d:['0','∞',fr(b,a)],ex:`Pangkat tertinggi sama: ${a}/${b}.`}; },
 ()=>{ const k=R(1,6); return {q:`Nilai lim<sub>x→${k*k}</sub> (√x − ${k}) / (x − ${k*k}) adalah …`,a:fr(1,2*k),d:[fr(1,k),'0',fr(k,2)],ex:`Kalikan sekawan: 1/(√x + ${k}) = 1/${2*k}.`}; },
 ()=>{ const c=[R(1,4),R(-6,6),R(-9,9),R(-9,9)], k=R(-2,3); const v=3*c[0]*k*k+2*c[1]*k+c[2]; return {q:`Jika f(x) = ${c[0]===1?'':c[0]}x³ ${sg(c[1])}x² ${sg(c[2])}x ${sg(c[3])}, maka f′(${F(k)}) = …`.replace(/[+−] 0x²? /g,'').replace(/ [+−] 0,/,','),a:F(v),d:[F(c[0]*k**3+c[1]*k*k+c[2]*k+c[3]),F(v+c[2]),F(3*c[0]*k*k+c[1]*k+c[2])],ex:`f′(x) = ${3*c[0]}x² ${sg(2*c[1])}x ${sg(c[2])}; f′(${k}) = ${v}.`}; },
 ()=>{ const a=R(1,3), b=R(-6,6), k=R(-3,3); const m=2*a*k+b, y0=a*k*k+b*k, n=y0-m*k; if(m===0||n===0) return K[12][4](); return {q:`Persamaan garis singgung kurva y = ${a===1?'':a}x² ${sg(b)}x di titik berabsis ${k} adalah …`.replace(/ [+−] 0x/,''),a:`y = ${lin(m,n)}`.replace('y = x','y = x').replace('y = 0x','y = '),d:[`y = ${lin(m,-n)}`,`y = ${lin(-m,n)}`,`y = ${lin(m+1,n)}`],ex:`m = f′(${k}) = ${m}, titik (${k}, ${y0}) → y = ${m}x ${sg(n)}.`}; },
 ()=>{ const L=4*R(5,20); return {q:`Pagar sepanjang ${L} m dipakai untuk memagari kebun persegi panjang di tepi tembok (sisi tembok tidak dipagari). Luas kebun maksimum adalah …`,a:F(L*L/8)+' m²',d:[F(L*L/16)+' m²',F(L*L/4)+' m²',F(L*L/12)+' m²'],ex:`Luas = x(${L} − 2x); maksimum di x = ${L/4}: ${L/4} × ${L/2} = ${L*L/8}.`}; },
 ()=>{ const n=R(1,3), a=(n+1)*R(1,4); return {q:`∫ ${a}x<sup>${n}</sup> dx = …`,a:`${a/(n+1)===1?'':a/(n+1)}x<sup>${n+1}</sup> + C`,d:[`${a*n}x<sup>${n-1}</sup> + C`,`${a}x<sup>${n+1}</sup> + C`,`${a/(n+1)===1?'':a/(n+1)}x<sup>${n}</sup> + C`],ex:`Pangkat +1 lalu bagi ${n+1}.`}; },
 ()=>{ const p=R(0,2), q=p+R(1,3), b=R(-3,4); const Fv=x=>x**3+b*x; return {q:`Nilai ∫<sub>${p}</sub><sup>${q}</sup> (3x² ${sg(b)}) dx adalah …`.replace(/ [+−] 0\)/,')'),a:F(Fv(q)-Fv(p)),d:[F(Fv(q)+Fv(p)),F(q**3-p**3),F(Fv(q)-Fv(p)+b)],ex:`[x³ ${sg(b)}x] dari ${p} ke ${q} = ${Fv(q)} − ${Fv(p)}.`}; },
 ()=>{ const k=R(1,4); return {q:`Luas daerah antara kurva y = x² dan garis y = ${k*k} adalah …`,a:fr(4*k**3,3)+' satuan luas',d:[fr(2*k**3,3)+' satuan luas',F(2*k**3)+' satuan luas',fr(8*k**3,3)+' satuan luas'],ex:`∫ dari −${k} ke ${k} (${k*k} − x²) dx = ${4*k**3}/3.`}; },
 ()=>{ const x=R(-7,7), y=R(-7,7); const t=P([['dirotasi 90° berlawanan arah jarum jam (pusat O)',[-y,x]],['dicerminkan terhadap garis y = x',[y,x]],['dicerminkan terhadap sumbu-x lalu ditranslasi (2, 3)',[x+2,-y+3]],['didilatasi dengan faktor −2 (pusat O)',[-2*x,-2*y]]]); return {q:`Titik (${F(x)}, ${F(y)}) ${t[0]}. Bayangannya adalah …`,a:`(${F(t[1][0])}, ${F(t[1][1])})`,d:[`(${F(-t[1][0])}, ${F(t[1][1])})`,`(${F(t[1][1])}, ${F(t[1][0])})`,`(${F(t[1][0])}, ${F(-t[1][1])})`],ex:`Bayangan (${F(t[1][0])}, ${F(t[1][1])}).`}; },
 ()=>{ const a=3*R(1,5); const t=P([['diagonal ruang AG',`${a}√3`,[`${a}√2`,`${3*a}`,`${a}√6`]],['jarak titik B ke garis AG',`${a/3}√6`,[`${a}√6`,`${a/2}√6`.replace('.5',',5'),`${a/3}√3`]],['jarak titik A ke bidang BDE',`${a/3}√3`,[`${2*a/3}√3`,`${a}√3`,`${a/3}√2`]]]); return {q:`Kubus ABCD.EFGH memiliki rusuk ${a} cm. Panjang ${t[0]} adalah …`,a:t[1].replace(/^1√/,'√')+' cm',d:t[2].map(v=>v.replace(/^1√/,'√')+' cm'),ex:`Rumus: diagonal ruang a√3, B ke AG = a√6/3, A ke BDE = a√3/3.`}; },
 ()=>{ const Fs=[R(2,6),R(4,10),R(8,14),R(4,10),R(1,5)]; const n=Fs.reduce((a,b)=>a+b,0); let c=0,i=0; while(c+Fs[i]<n/2){ c+=Fs[i]; i++; } const me=40.5+10*i+(n/2-c)/Fs[i]*10; return {q:`Perhatikan data: 41–50 (${Fs[0]}), 51–60 (${Fs[1]}), 61–70 (${Fs[2]}), 71–80 (${Fs[3]}), 81–90 (${Fs[4]}). Median data adalah …`,a:D(me),d:[D(me+2.5),D(45.5+10*i),D(me-3)],ex:`n = ${n}, kelas median ${41+10*i}–${50+10*i}: ${D(40.5+10*i)} + ((${D(n/2)} − ${c})/${Fs[i]})·10 = ${D(me)}.`}; }
];

/* ===================== UTBK/SNBT · Kuantitatif ===================== */
K.snbt=[
 ()=>{ const p=R(5,20), n=R(4,9); let k=0,v=1; while(v>=0.5){ v*=1-p/100; k++; } return {q:`Jumlah koloni bakteri berkurang ${p}% dari jumlah pada awal hari setiap harinya. Jumlah koloni akan kurang dari setengah jumlah semula mulai hari ke- …`,a:F(k),d:[F(k-1),F(k+1),F(Math.round(50/p))===F(k)?F(k+2):F(Math.round(50/p))],ex:`(1 − ${p/100})ⁿ &lt; 0,5. Cek: setelah ${k-1} hari tersisa ${D(Math.pow(1-p/100,k-1)*100)}%, setelah ${k} hari ${D(Math.pow(1-p/100,k)*100)}%.`}; },
 ()=>{ const a=R(2,9), b=R(2,9); return {q:`Diketahui x = ${a} dan y = ${b}. Manakah hubungan yang benar antara P = (x + y)² dan Q = x² + y²?`,a:'P &gt; Q',d:['P &lt; Q','P = Q','tidak dapat ditentukan'],ex:`P − Q = 2xy = ${2*a*b} &gt; 0.`}; },
 ()=>{ const w=R(2,6), h=R(2,6), k=R(2,4); return {q:`Sebuah persegi panjang berukuran ${w} × ${h}. Panjang dan lebarnya masing-masing dikalikan ${k}. Luasnya menjadi … kali luas semula.`,a:F(k*k),d:[F(k),F(2*k),F(k*k*k)],ex:`Luas berskala k² = ${k*k}.`}; },
 ()=>{ const h=R(100,300)*1000, d1=P([10,20,25]), d2=P([10,20]); const f=h*(1-d1/100)*(1-d2/100); return {q:`Harga sepatu Rp${F(h)} didiskon ${d1}% lalu didiskon lagi ${d2}% dari harga setelah diskon pertama. Harga akhirnya …`,a:'Rp'+F(Math.round(f)),d:['Rp'+F(Math.round(h*(1-(d1+d2)/100))),'Rp'+F(Math.round(h*d1*d2/10000)),'Rp'+F(Math.round(f+h*0.05))],ex:`${F(h)} × ${(100-d1)/100} × ${(100-d2)/100} = ${F(Math.round(f))}. Diskon bertingkat ≠ jumlah persentase.`}; },
 ()=>{ const a=R(2,5), d=R(2,6); const s=[a,a+d,a+3*d,a+6*d,a+10*d]; return {q:`Suku berikutnya dari barisan ${s.join(', ')}, … adalah …`,a:F(a+15*d),d:[F(a+14*d),F(a+12*d),F(a+16*d)],ex:`Selisih: ${d}, ${2*d}, ${3*d}, ${4*d}, berikutnya ${5*d}. Jadi ${a+10*d} + ${5*d} = ${a+15*d}.`}; },
 ()=>{ const dd=P([10,20,30,40]), t=R(1,4), v1=R(4,6)*10, v2=v1+dd; return {q:`Mobil A berangkat dari kota P pukul 07.00 dengan kecepatan ${v1} km/jam. Mobil B berangkat dari tempat yang sama pukul ${7+t}.00 dengan kecepatan ${v2} km/jam searah. B menyusul A setelah menempuh jarak …`,a:D(v1*t*v2/(v2-v1))+' km',d:[D(v1*t)+' km',D(v2*t)+' km',D(v1*t*v1/(v2-v1))+' km'],ex:`Selisih awal ${v1*t} km, dikejar dengan selisih kecepatan ${v2-v1} km/jam → ${D(v1*t/(v2-v1))} jam. Jarak B = ${v2} × ${D(v1*t/(v2-v1))} = ${D(v1*t*v2/(v2-v1))} km.`}; },
 ()=>{ const n=R(5,8); return {q:`Pada suatu pertemuan, setiap orang berjabat tangan tepat satu kali dengan setiap orang lainnya. Jika ada ${n*(n-1)/2} jabat tangan, banyak orang yang hadir adalah …`,a:F(n),d:[F(n+1),F(n-1),F(n*(n-1)/2/2)],ex:`C(n,2) = n(n − 1)/2 = ${n*(n-1)/2} → n = ${n}.`}; },
 ()=>{ const x=R(2,9); return {q:`Jika 2<sup>x</sup> = ${2**x}, maka nilai 4<sup>x − 1</sup> adalah …`,a:F(4**(x-1)),d:[F(2**(2*x)),F(4**x/2),F(2**(x-1))],ex:`x = ${x}; 4<sup>${x-1}</sup> = ${4**(x-1)}.`}; },
 ()=>{ const m=R(3,8), w=R(2,6); const t=m+w; return {q:`Dari ${m} siswa putra dan ${w} siswa putri dipilih 3 orang secara acak. Peluang terpilih tepat 2 putra adalah …`,a:fr(C(m,2)*w,C(t,3)),d:[fr(C(m,2),C(t,3)),fr(2,3),fr(m*w,C(t,3))],ex:`C(${m},2)·C(${w},1)/C(${t},3) = ${C(m,2)*w}/${C(t,3)}.`}; },
 ()=>{ const a=R(10,30), b=R(10,30), ab=R(3,9), all=a+b-ab+R(2,10); return {q:`Dari ${all} siswa, ${a} siswa suka matematika, ${b} siswa suka fisika, dan ${ab} siswa suka keduanya. Banyak siswa yang tidak suka keduanya adalah …`,a:F(all-(a+b-ab)),d:[F(all-a-b),F(all-ab),F(all-(a+b-ab)+ab)],ex:`Suka minimal satu: ${a} + ${b} − ${ab} = ${a+b-ab}. Sisanya ${all-(a+b-ab)}.`}; },
 ()=>{ const n=R(4,8), m=R(60,80), x=R(80,98); return {q:`Rata-rata nilai ${n} siswa adalah ${m}. Setelah nilai seorang siswa baru ditambahkan, rata-ratanya menjadi ${D((n*m+x)/(n+1))}. Nilai siswa baru adalah …`,a:F(x),d:[F(x+n),F(Math.round((n*m+x)/(n+1))),F(x-5)],ex:`${n+1} × ${D((n*m+x)/(n+1))} − ${n} × ${m} = ${x}.`}; },
 ()=>{ const k=R(3,9); return {q:`Diketahui f(x + 1) = 2x + ${k}. Nilai f(5) adalah …`,a:F(8+k),d:[F(10+k),F(2*5+k-1),F(6+k)],ex:`x + 1 = 5 → x = 4, f(5) = 8 + ${k} = ${8+k}.`}; },
 ()=>{ const s=R(4,12); return {q:`Sebuah kubus mempunyai luas permukaan ${6*s*s} cm². Volume kubus itu adalah …`,a:F(s**3)+' cm³',d:[F(s*s)+' cm³',F(6*s**3)+' cm³',F((s+1)**3)+' cm³'],ex:`6s² = ${6*s*s} → s = ${s}, volume ${s**3}.`}; },
 ()=>{ const p=R(2,8), q=R(2,8); if(p===q) return K.snbt[13](); return {q:`Jika a : b = ${p} : ${q}, maka nilai (a + b) : (a − b) adalah …`,a:fr(p+q,p-q),d:[fr(p-q||1,p+q),fr(p+q,q),fr(q+p,q-p||1)],ex:`Bagi dengan b: (${p}/${q} + 1)/(${p}/${q} − 1) = ${p+q}/${p-q}.`}; }
];

/* ===================== OSN SMA (soal tetap) ===================== */
const OSN=[
 {q:'Bilangan bulat positif terkecil n sehingga n! habis dibagi 1.000 adalah …',a:'15',d:['10','12','25'],ex:'Perlu tiga faktor 5: 5, 10, 15. Jadi n = 15.'},
 {q:'Banyak angka 0 di akhir bilangan 100! adalah …',a:'24',d:['20','25','10'],ex:'⌊100/5⌋ + ⌊100/25⌋ = 20 + 4 = 24.'},
 {q:'Sisa pembagian 2<sup>2026</sup> oleh 7 adalah …',a:'2',d:['1','4','3'],ex:'2³ ≡ 1 (mod 7). 2026 = 3·675 + 1, sisa 2¹ = 2.'},
 {q:'Jika x + 1/x = 4, maka x² + 1/x² = …',a:'14',d:['16','12','18'],ex:'(x + 1/x)² − 2 = 16 − 2.'},
 {q:'Banyak cara menyusun huruf-huruf KUTTAB adalah …',a:'360',d:['720','180','120'],ex:'6!/2! = 360.'},
 {q:'Jumlah semua bilangan bulat positif yang habis membagi 36 adalah …',a:'91',d:['90','36','55'],ex:'(1 + 2 + 4)(1 + 3 + 9) = 7·13 = 91.'},
 {q:'Banyak diagonal segi-12 beraturan adalah …',a:'54',d:['66','48','60'],ex:'n(n − 3)/2 = 12·9/2.'},
 {q:'Jika a + b = 7 dan ab = 10, maka a³ + b³ = …',a:'133',d:['343','143','70'],ex:'(a + b)³ − 3ab(a + b) = 343 − 210.'},
 {q:'Banyak bilangan asli kurang dari 100 yang habis dibagi 3 atau 5 adalah …',a:'46',d:['53','39','45'],ex:'33 + 19 − 6 = 46.'},
 {q:'Nilai 1 + 3 + 5 + … + 99 = …',a:'2.500',d:['5.000','2.450','2.550'],ex:'Jumlah 50 bilangan ganjil pertama = 50².'},
 {q:'Tiga dadu dilempar. Peluang jumlah mata dadunya 4 adalah …',a:'1/72',d:['1/36','1/54','1/216'],ex:'Kemungkinan (1,1,2) dalam 3 urutan: 3/216 = 1/72.'},
 {q:'Persegi dengan sisi 2 dibuat lingkaran luarnya. Luas lingkaran itu adalah …',a:'2π',d:['π','4π','√2π'],ex:'Jari-jari = setengah diagonal = √2, luas = 2π.'},
 {q:'Banyak pasangan bilangan bulat positif (x, y) yang memenuhi x + 2y = 20 adalah …',a:'9',d:['10','8','19'],ex:'y = 1..9 (x positif genap).'},
 {q:'Digit satuan dari 7<sup>2026</sup> adalah …',a:'9',d:['7','3','1'],ex:'Siklus 7, 9, 3, 1. 2026 ≡ 2 (mod 4) → 9.'},
 {q:'Fungsi f memenuhi f(x) + 2f(1 − x) = x untuk semua x. Nilai f(0) = …',a:'2/3',d:['1/3','0','−1/3'],ex:'x = 0: f(0) + 2f(1) = 0; x = 1: f(1) + 2f(0) = 1. Selesaikan: f(0) = 2/3.'}
];

function clean(q){ return q.replace(/ [+−] 0x(<sup>\d<\/sup>|²|³)?(?=[ )])/g,'').replace(/ [+−] 0(?=[ )=]| adalah)/g,'').replace(/([ (])1x/g,'$1x').replace(/([ (])1x/g,'$1x'); }
function build(item){
  item.q=clean(item.q);
  const opts=[item.a]; const seen=new Set([String(item.a).replace(/\s/g,'')]);
  for(const x of (item.d||[])){ const k=String(x).replace(/\s/g,''); if(opts.length<5&&!seen.has(k)&&!/NaN|undefined|Infinity/.test(k)){ opts.push(String(x)); seen.add(k); } }
  let t=1; while(opts.length<4&&t<40){ const cand=String(item.a).replace(/\d+/,m=>String(+m+t)); const k=cand.replace(/\s/g,''); if(!seen.has(k)){ opts.push(cand); seen.add(k); } t++; }
  const order=sh(opts.map((o,i)=>i)); return {q:item.q,opts:order.map(i=>opts[i]),ans:order.indexOf(0),ex:item.ex};
}
function makeSet(level,n){ n=n||10;
  if(level==='osn') return sh(OSN).slice(0,n).map(build);
  if(level==='campur'){ const all=[].concat(K[10],K[11],K[12],K.snbt); const out=[]; const idx=sh(all.map((_,i)=>i)); for(let i=0;out.length<n&&i<idx.length*3;i++){ try{ out.push(build(all[idx[i%idx.length]]())); }catch(e){} } return out; }
  const Gs=K[level]; const idx=sh(Gs.map((_,i)=>i)); const out=[]; let i=0; while(out.length<n){ const g=Gs[idx[i%idx.length]]; try{ out.push(build(g())); }catch(e){} i++; if(i>n*5) break; } return out; }
window.TRYOUT={makeSet,K,OSN,build};
})();
