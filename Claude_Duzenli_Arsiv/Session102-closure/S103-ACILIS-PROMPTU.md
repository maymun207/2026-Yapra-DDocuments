# S103 AÇILIŞ PROMPTU — yeni sohbete YAPIŞTIRILACAK tek metin

<!-- Kullanım: yeni Claude sohbeti aç (aynı proje), aşağıdaki bloğu olduğu gibi
     yapıştır. Proje dosyalarını güncellemeyi UNUTMA (aşağıdaki §0 listesi). -->

---

## §0 · ÖNCE PROJE DOSYALARINI GÜNCELLE (sahip işi, 2 dakika)

**Projeye YÜKLE (yeni sürümler):**
- `CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v103.md`
- `cwf-open-items-register-v106.md`
- `CWF-SESSION-GRAPH-KB-v103.md`
- `REGISTER-BUG-BUCKET-v38.md`
- `cwf-implementation-order-S102-v14.md`
- `MULTI-AG-WORKMODE-v1.md` (S102'de üretildi, hâlâ geçerli)

**Talimat kutusunu değiştir:** `CLAUDE-PROJECT-INSTRUCTIONS-v5_5.md` içeriğini
proje talimatlarına yapıştır (şu an v5_3/v5_4 var).

**Projeden SİL (arşive gitti):** bootstrap v102 · register v105 · KB v102 ·
bucket v37 · implementation-order S101-v13 (iki nüsha).

---

## §1 · SOHBETE YAPIŞTIRILACAK AÇILIŞ METNİ

```
S102'den devam.

Oturum kapandı: on bir merge, master 1f660eadbe4bb835d123723acec292d3495a89aa,
docVersion rev 271. Kapı 5/7 (değişmedi).

UÇUŞTA İKİ ŞERİT VAR — ikisini de ÖLÇEREK devral, hatırlayarak değil:

1) AG-3 · QDRANT-ENGINE-1-FIX-7 — kod yazıldı (waitress + _infer_lock, R1
   teşhis gözleri), imaj build'deydi, dal PUSH EDİLMEDİ. Üretimde encoder
   konteyneri fan-out'tan beri kilitli (504); valf kapalı olduğu için üretim
   etkisi sıfır. Sıra: yerel fan-out kanıtı → merge (bir kanarya, onayımı iste)
   → CI build → YENİ DIGEST (eski 795c44b0… ARTIK GEÇERSİZ) → şeridin kendi
   dispatch'i → parite sayıları. Canlı kanıt zaten 3/4: imzasız 401/403 ✅,
   kimlik pini ✅, determinizm 20×tek-digest ✅, parite ⏸.

2) AG-1 · GRAPH-KB-1 🔑 — kart teslim edildi, posta verildi, rapor ve dal YOK.
   Durumunu git + posta kutusu + bana sorarak ölç.

İLK İŞLER: preflight (bootstrap v103 §B çapası taze klonda doğrulanır) →
13 ölü ref hijyeni (fix-7 dalı HARİÇ) → yukarıdaki iki şerit → LAW-LEDGER-2 →
MERGE-FIELD-AWARE-1 → VECTOR-ONBOARD-DRIP-1.

Çalışma modu: relay_inbox posta kutusu (Supabase fjbrkimwvtpwoxhziidh),
base64+md5 doğrulamalı kartlar. Ben "posta" derim, şeritler çeker.

Ve S102'nin üç anayasal yasasını ilk mesajında verbatim tekrarla:
SAHİP-ELİ · YARIŞSIZ TESLİM · OKUNMAMIŞ PLAN YIKAMAZ. Ayrıca SOTA-1'i
kelimesi kelimesine yaz (S66-1).
```

---

## §2 · ARCHITECT'İN İLK MESAJINDA YAPMASI GEREKENLER (kontrol listesi)

1. **SOTA-1'i verbatim** yeniden yazar (yoksa oturum yanlış açılmıştır).
2. **S102'nin üç yasasını verbatim** tekrarlar.
3. Taze klonda §B çapasını **doğrular** (hash · rev · 650 · 83 · 16 · docs/laws).
4. Canlı DB'de migration sayısını **kendi okur** (83, tepe `20260816121000`).
5. `git ls-remote` ile **iki uçuştaki şeridin gerçek durumunu ölçer**.
6. Posta kutusunda tüketilmemiş kart var mı bakar (S102 kapanışında 19 damgasız
   `to_lane` satırı vardı — çoğu tarihî, ADIYLA kontrol edilir).
7. Ancak bundan sonra kart keser.

---

## §3 · SAHİBİN AKLINDA TUTACAKLARI (kısa)

- **Motor switch'i cebinde:** parite sayıları + Architect'in bağımsız okuması +
  DRIP fazı + senin ayrı onayın olmadan `vector.engine` çevrilemez.
- **Langfuse çalışıyor** (izler bu geceden itibaren birikiyor). Giriş: init
  admin (`admin@cwf.local`, şifre `/cwf/langfuse/env`'de). Project → API Keys'te
  mevcut çifti **döndürme** — CWF'nin canlı kimliği odur.
- **`VECTOR_GATE_KEY` Vercel'e girilmedi** — parite kapandıktan sonra, tek
  komut + tek yapıştırma.
- **Bütçe-çiti ~20 Ağustos:** iki yeni konteyner (qdrant + bge-m3) çite
  bildirilecek.
- **Derin ve uzun konuşma** için ham madde hazır: KB v103 §3'te onbeş A-REC,
  dördü Architect'in ağır hataları, yumuşatılmadan.

<!-- END · S103-ACILIS-PROMPTU -->
