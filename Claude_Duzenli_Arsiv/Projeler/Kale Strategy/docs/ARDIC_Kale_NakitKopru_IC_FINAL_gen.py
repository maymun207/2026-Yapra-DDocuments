#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import cairosvg, html
from pypdf import PdfWriter

R = {"2022":16.6,"2023":23.8,"2024":32.8,"2025":39.5,"2026*":43.0}

# ---- LOCKED DATASET (v3 · tüm Kale kırılımı fatura raporu T1, net satışa mutabık) ----
# SCL (USD thousands): (orijinal, revize, fiili)
SCL_NRE = {"2024":(371,371,449),"2025":(1214,578,531),"2026*":(874,508,260)}
SCL_LIC = {"2024":(0,0,0),"2025":(212,200,0),"2026*":(476,363,197)}
# non-SCL (₺M): Diğer gelir = net satış − Kale ; Diğer Kale = fatura raporu (T1)
DIGER = {"2022":14.31,"2023":11.03,"2024":7.03,"2025":17.85,"2026*":9.0}
DKALE = {"2022":2.01,"2023":4.71,"2024":9.69,"2025":5.08,"2026*":2.92}
# financing (₺M, T1 şelale)
ENJ = {"2022":-0.48,"2023":2.63,"2024":0.55,"2025":2.75,"2026*":1.59}
BANK= {"2022":-0.38,"2023":-1.61,"2024":2.17,"2025":1.35,"2026*":0.0}
OBL = {"2022":0.0,"2023":4.45,"2024":11.30,"2025":4.94,"2026*":6.0}
# outflow (₺M, full-tahakkuk≈)
MAAS= {"2022":12.0,"2023":19.0,"2024":42.0,"2025":52.0,"2026*":50.0}
VERGI={"2022":0.6,"2023":2.0,"2024":6.0,"2025":5.77,"2026*":4.0}
FAIZ= {"2022":0.6,"2023":0.6,"2024":0.7,"2025":1.79,"2026*":1.6}

ORDER=["2022","2023","2024","2025","2026*"]
def tl(usd_k, yr): return usd_k/1000.0*R[yr]   # USD-k -> ₺M

# Build per-year segment data in ₺M
def revbars(yr):
    o=SCL_NRE.get(yr,(0,0,0)); l=SCL_LIC.get(yr,(0,0,0))
    base=[DIGER[yr],DKALE[yr]]
    out={}
    out["Pot-O"]=base+[tl(o[0],yr), tl(l[0],yr), tl(o[1],yr)]   # diger,dkale,NREcore(rev),NREdefer=o0-o1?,lis
    # we want NRE core=revised, defer=orig-revised
    return out

COL={"bg":"#FFFFFF","ink":"#16243B","mut":"#697789","grid":"#EDF0F4","axis":"#C2CAD4",
 "diger":"#C2D0DD","dkale":"#8FAAC4","nre":"#4E80AE","lisans":"#244C73",
 "enj":"#EDC55E","banka":"#CF982F","maas":"#BCC2CA","vergi":"#8A929D","faiz":"#565E69",
 "defer":"#4E80AE","loss":"#C0563D","icmark":"#3A4757"}
FONT="DejaVu Sans, Arial, sans-serif"
W,H=1240,860
PL_L,PL_R=120,1150; BASE,TOPy=470,120; BW,GI,GG=38,6,40; X0=158

def esc(s): return html.escape(str(s),quote=True)

def gen(basis):
    cv=(lambda v,yr:v) if basis=="TL" else (lambda v,yr:v/R[yr])
    MAX=90.0 if basis=="TL" else 2.3
    unit="₺M" if basis=="TL" else "$M"
    ticks=[0,20,40,60,80] if basis=="TL" else [0,0.5,1.0,1.5,2.0]
    sc=lambda v:(v/MAX)*(BASE-TOPy)
    S=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="{FONT}">']
    S.append('<defs>'
     '<pattern id="hNRE" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#D8E4EE"/><line x1="0" y1="0" x2="0" y2="7" stroke="#4E80AE" stroke-width="1.3"/></pattern>'
     '<pattern id="hOBL" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#F5E8CC"/><line x1="0" y1="0" x2="0" y2="7" stroke="#CF982F" stroke-width="1.3"/></pattern>'
     '</defs>')
    S.append(f'<rect width="{W}" height="{H}" fill="{COL["bg"]}"/>')
    S.append(f'<text x="40" y="46" font-size="25" font-weight="700" fill="{COL["ink"]}">Nakit köprüsü 2022–2026 · Potential → Actual → OutFlow</text>')
    sub = "TL bazlı (nominal)" if basis=="TL" else "USD bazlı (reel · enflasyondan arındırılmış)"
    S.append(f'<text x="40" y="73" font-size="14" fill="{COL["mut"]}">{sub} · SCL-kapsam · makas: NRE gecikme (taramalı mavi) vs Lisans kalıcı kayıp (kırmızı) · ödenmeyen yüküml. (taramalı amber)</text>')
    S.append(f'<rect x="{W-186}" y="26" width="156" height="32" rx="7" fill="{COL["icmark"]}"/><text x="{W-108}" y="47" font-size="12.5" font-weight="700" fill="#FFF" text-anchor="middle">İÇ · PAYLAŞILMAZ</text>')
    # grid
    for g in ticks:
        y=BASE-sc(g)
        S.append(f'<line x1="{PL_L}" y1="{y:.1f}" x2="{PL_R}" y2="{y:.1f}" stroke="{COL["grid"]}" stroke-width="1"/>')
        S.append(f'<text x="{PL_L-10}" y="{y+4:.1f}" font-size="11" fill="{COL["mut"]}" text-anchor="end">{("%g"%g)}</text>')
    S.append(f'<text x="{PL_L-10}" y="{TOPy-8}" font-size="11" font-weight="700" fill="{COL["mut"]}" text-anchor="end">{unit}</text>')
    S.append(f'<line x1="{PL_L}" y1="{TOPy-6}" x2="{PL_L}" y2="{BASE}" stroke="{COL["axis"]}" stroke-width="1.1"/><line x1="{PL_L}" y1="{BASE}" x2="{PL_R}" y2="{BASE}" stroke="{COL["axis"]}" stroke-width="1.1"/>')
    def rect(x,yt,h,fill,stroke="#FFFFFF",sw=0.8):
        if h<=0.4: return
        S.append(f'<rect x="{x:.1f}" y="{yt:.1f}" width="{BW}" height="{h:.1f}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>')
    x=X0; p2={}
    for yr in ORDER:
        gx=x; scl = yr in SCL_NRE
        bars = (["Pot-O","Pot-R","Act","Out"] if scl else ["In","Out"])
        for t in bars:
            yt=BASE
            if t=="Out":
                for v,k in zip([MAAS[yr],VERGI[yr],FAIZ[yr]],["maas","vergi","faiz"]):
                    h=sc(cv(v,yr)); yt-=h; rect(x,yt,h,COL[k])
            else:
                no=SCL_NRE.get(yr,(0,0,0)); lo=SCL_LIC.get(yr,(0,0,0))
                # diger, dkale
                for v,k in zip([DIGER[yr],DKALE[yr]],["diger","dkale"]):
                    h=sc(cv(v,yr)); yt-=h; rect(x,yt,h,COL[k])
                # NRE
                if t=="Pot-O":
                    core=tl(no[1],yr); defer=max(0,tl(no[0],yr)-tl(no[1],yr))
                    h=sc(cv(core,yr)); yt-=h; rect(x,yt,h,COL["nre"])
                    hd=sc(cv(defer,yr)); yt-=hd; rect(x,yt,hd,"url(#hNRE)",stroke="#4E80AE",sw=1.0)
                    if yr=="2025": p2["dT"]=yt; p2["dB"]=yt+hd; p2["poX"]=x
                    nre_l=tl(no[0],yr)
                elif t=="Pot-R":
                    h=sc(cv(tl(no[1],yr),yr)); yt-=h; rect(x,yt,h,COL["nre"]); nre_l=tl(no[1],yr)
                else:
                    h=sc(cv(tl(no[2],yr),yr)); yt-=h; rect(x,yt,h,COL["nre"]); nre_l=tl(no[2],yr)
                # Lisans
                li = lo[0] if t=="Pot-O" else (lo[1] if t=="Pot-R" else lo[2])
                h=sc(cv(tl(li,yr),yr)); yt-=h; rect(x,yt,h,COL["lisans"])
                if yr=="2025" and t=="Pot-R": p2["prL"]=yt
                if yr=="2025" and t=="Act": p2["acL"]=yt; p2["acX"]=x
                # plugs
                if t in ("In","Act"):
                    for v,k in zip([ENJ[yr],BANK[yr],OBL[yr]],["enj","banka","obl"]):
                        if v<=0: continue
                        h=sc(cv(v,yr)); yt-=h
                        rect(x,yt,h,"url(#hOBL)",stroke="#CF982F",sw=1.0) if k=="obl" else rect(x,yt,h,COL[k])
            S.append(f'<text x="{x+BW/2:.1f}" y="{BASE+14}" font-size="9.5" fill="{COL["mut"]}" text-anchor="middle">{esc(t)}</text>')
            x+=BW+GI
        S.append(f'<text x="{gx+(x-GI-gx)/2:.1f}" y="{BASE+34}" font-size="14.5" font-weight="700" fill="{COL["ink"]}" text-anchor="middle">{esc(yr)}</text>')
        x+=GG-GI
    # 2025 annotations
    if p2:
        bx=p2["poX"]-9
        S.append(f'<path d="M{bx} {p2["dT"]:.1f} h-8 v{(p2["dB"]-p2["dT"]):.1f} h8" fill="none" stroke="{COL["defer"]}" stroke-width="1.4"/>')
        S.append(f'<text x="{bx-11}" y="{(p2["dT"]+p2["dB"])/2-2:.1f}" font-size="10.5" font-weight="700" fill="{COL["defer"]}" text-anchor="end">NRE ötelendi</text>')
        S.append(f'<text x="{bx-11}" y="{(p2["dT"]+p2["dB"])/2+11:.1f}" font-size="9" fill="{COL["mut"]}" text-anchor="end">gecikme · kalıcı değil</text>')
        ax=p2["acX"]+BW+9
        S.append(f'<path d="M{ax} {p2["acL"]:.1f} h8 v{(p2["prL"]-p2["acL"]):.1f} h-8" fill="none" stroke="{COL["loss"]}" stroke-width="1.6"/>')
        S.append(f'<text x="{ax+11}" y="{(p2["acL"]+p2["prL"])/2-2:.1f}" font-size="10.5" font-weight="700" fill="{COL["loss"]}">Lisans kaybı</text>')
        S.append(f'<text x="{ax+11}" y="{(p2["acL"]+p2["prL"])/2+11:.1f}" font-size="9" fill="{COL["mut"]}">kalıcı</text>')
    # legend
    leg=[("Diğer gelir",COL["diger"],0),("Diğer Kale (SCL-dışı)",COL["dkale"],0),("SCL-NRE",COL["nre"],0),
     ("NRE ötelenen (gecikme)","url(#hNRE)",1),("SCL-Lisans (ArMES)",COL["lisans"],0),
     ("Kurucu enjeksiyon",COL["enj"],0),("Banka kredisi",COL["banka"],0),("Ertelenmiş yüküml.","url(#hOBL)",2),
     ("Maaş+G&amp;A",COL["maas"],0),("Vergi",COL["vergi"],0),("Faiz",COL["faiz"],0)]
    lx=40; ly=BASE+50
    for lab,fill,hatch in leg:
        st="#4E80AE" if hatch==1 else ("#CF982F" if hatch==2 else "#FFF")
        S.append(f'<rect x="{lx}" y="{ly}" width="14" height="14" rx="2" fill="{fill}" stroke="{st}" stroke-width="1"/>')
        S.append(f'<text x="{lx+19}" y="{ly+11}" font-size="11" fill="{COL["ink"]}">{lab}</text>')
        lx+=28+len(lab.replace("&amp;","&"))*6.5
        if lx>W-150: lx=40; ly+=22
    # ---- DATA TABLE ----
    ty=ly+44
    S.append(f'<text x="40" y="{ty-10}" font-size="13" font-weight="700" fill="{COL["ink"]}">Veri tablosu ({unit})</text>')
    rows=[]
    def tot_rev(yr,which):
        no=SCL_NRE.get(yr,(0,0,0)); lo=SCL_LIC.get(yr,(0,0,0)); idx={"O":0,"R":1,"A":2}[which]
        return DIGER[yr]+DKALE[yr]+tl(no[idx],yr)+tl(lo[idx],yr)
    rows.append(("Potential-Original", lambda yr: tot_rev(yr,"O") if yr in SCL_NRE else None))
    rows.append(("Potential-Revised", lambda yr: tot_rev(yr,"R") if yr in SCL_NRE else None))
    rows.append(("Actual (gerçek gelir)", lambda yr: tot_rev(yr,"A") if yr in SCL_NRE else DIGER[yr]+DKALE[yr]))
    rows.append(("+ Finansman (tıkaç)", lambda yr: max(0,ENJ[yr])+max(0,BANK[yr])+OBL[yr]))
    rows.append(("OutFlow (tam maliyet)", lambda yr: MAAS[yr]+VERGI[yr]+FAIZ[yr]))
    rows.append(("Makas · NRE gecikme", lambda yr: (tl(SCL_NRE[yr][0],yr)-tl(SCL_NRE[yr][1],yr)) if yr in SCL_NRE else None))
    rows.append(("Makas · Lisans kaybı", lambda yr: (tl(SCL_LIC[yr][1],yr)-tl(SCL_LIC[yr][2],yr)) if yr in SCL_NRE else None))
    colx=[300,470,620,770,920,1075]
    # header
    S.append(f'<line x1="40" y1="{ty+6}" x2="{W-40}" y2="{ty+6}" stroke="{COL["axis"]}" stroke-width="1"/>')
    for i,yr in enumerate(ORDER):
        S.append(f'<text x="{colx[i]}" y="{ty}" font-size="11.5" font-weight="700" fill="{COL["ink"]}" text-anchor="end">{esc(yr)}</text>')
    yy=ty+24
    for name,fn in rows:
        loss = "Makas" in name
        S.append(f'<text x="40" y="{yy}" font-size="11.5" fill="{COL["loss"] if loss else COL["ink"]}" font-weight="{700 if loss else 400}">{esc(name)}</text>')
        for i,yr in enumerate(ORDER):
            v=fn(yr)
            txt = "—" if v is None else (f"{cv(v,yr):,.1f}" if basis=="TL" else f"{cv(v,yr):.2f}")
            S.append(f'<text x="{colx[i]}" y="{yy}" font-size="11.5" fill="{COL["loss"] if loss else COL["ink"]}" text-anchor="end">{txt}</text>')
        yy+=21
    S.append(f'<text x="40" y="{yy+14}" font-size="11.5" fill="{COL["mut"]}">'
        f'Kaynak: SCL NRE revizyon + ArMES Lisans plan/fiili (T1) · Kale kırılımı 2022–2026 fatura raporu (T1, KDV-hariç) · SCL-NRE 2025 fiili = ₺20,98M ≈ $531K (yaygınlaştırma)</text>')
    S.append(f'<text x="40" y="{yy+34}" font-size="11.5" fill="{COL["mut"]}">'
        f'Diğer gelir = net satış − Kale · finansman şelale (T1) · gider 5Mercek/Q-rapor (T1) · 2026* = yıllıklaştırılmış proj · kur {" / ".join(f"{k.strip(chr(42))}≈{v:g}" for k,v in R.items())}</text>')
    S.append('</svg>')
    return "\n".join(S)

for b in ["TL","USD"]:
    svg=gen(b); open(f"/home/claude/nk2_{b}.svg","w").write(svg)
    cairosvg.svg2png(bytestring=svg.encode(),write_to=f"/home/claude/nk2_{b}.png",output_width=2*W,output_height=2*H)
    cairosvg.svg2pdf(bytestring=svg.encode(),write_to=f"/home/claude/nk2_{b}.pdf")
    print("ok",b)
w=PdfWriter()
for b in ["TL","USD"]: w.append(f"/home/claude/nk2_{b}.pdf")
w.write("/home/claude/ARDIC_Kale_NakitKopru_v2_TL_USD.pdf"); w.close()
print("merged")
