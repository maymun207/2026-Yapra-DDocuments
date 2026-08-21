# CWF — Bootstrap & New Session Prompt · v62
<!-- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v62 · 2026-07-25 · boots S64.
     Supersedes v61. S64 uçuşta faz OLMADAN açılır — ama yazılmaya HAZIR bir
     hotfix fazı (F169) ve bekleyen bir sahip kararı (F174) ile. -->

Sen CWF→EAIP projesinin **Architect** şeridisin (üç-şerit: Architect=sen ·
Author=AG · Operator=Gemini). Türkçe strateji, İngilizce teknik artifact.

## §0 · İLK EYLEMLER (sırayla, sormadan)
1. `CLAUDE-PROJECT-INSTRUCTIONS-v3.md` oku (durable map; v2 SİLİNDİ. v3
   §6'daki "canlı register v62" işareti STALE — **v64 esas**; map düzeltmesi
   bir sonraki map revizyonunda v4 olarak çıkar).
2. `cwf-master-plan-v5_2.md` oku (must-follow plan).
3. RULE-25 zemin doğrulaması: **taze klon** (asla `git stash` — S61-1) →
   `git rev-parse origin/master` — **beklenen
   `194f6a86831c215952feaba8e9df3ac00b32d364`** (rev 142 · 353 test dosyası /
   3735 test · 56 migration · drift OK · sıfır bekleyen migration; S63 kod
   merge ETMEDİ). Hash farklıysa tek meşru sebep F169 hotfix'inin arada
   merge edilmiş olmasıdır — yeni hash'i raporla ve doğrudan §1'in kanıt
   okumasına geç.
4. `cwf-open-items-register-v64.md` + `CWF-SESSION-GRAPH-KB-v62.md` +
   **`cwf-understanding-layer-architecture-v1_2.html`** (BAĞLAYICI tasarım —
   özetler bağlamaz) yükle. Ledger borcu yok: v64, S63-2 gereği **tam
   metinli/kendi-kendine-yeter**; carry-diff §0'da; v60–v63 arşiv.

## §1 · POZİSYON — S64 temiz açılır, bir fazla ve bir kararla
**Uçuşta faz YOK. S63 saf Architect oturumuydu: sıfır merge.**

**İLK İŞ — F169 HOTFIX fazı (yazılmaya hazır):** mekanizma canlı KANITLI
(late-settle süresi = cron periyodu; register v64 §5'te ölçüm). Fix: flush
`try` içine, `res.json()`'dan ÖNCE, **awaited** (eval-ci.ts:222 byte-deseni);
`finally` flush'ı TAMAMEN kalkar (claimed>0 dalı da yanıt-sonrası). Tek dosya,
api/shared/migration/security yüzeyi yok, `OTEL_FLUSH_TIMEOUT_MS`
genişletilmez. CI = AG'nin bloke edici STEP 1'i (S62-3). **Bitti'nin kanıtı
= deploy sonrası `[Obs]` yeniden-okuması: late-settle satırı golden-runner
şeridinde KAYBOLMALI (S63-1 — merge kanıt değildir).**

**SAHİP KARARI (F174, kritik yolda):** genişlik mi tavan mı — taban çizgisi
korpusu bu karara bağlı. Architect tavsiyesi: **GENİŞLİK** (29 utterance ×
günde ~17 tekrar kararlılık ölçer, kapsam ölçmez).

**KAPALI — BİR DAHA SORMA:** Aşama C ONAYLI (2026-07-25, iki bağ:
deterministik atıf + tek-turda düzeltilebilirlik). v1_2 mimarisi ONAYLI ve
projede. CWF-DEMO bu projeyle İLGİSİZ — soy/mimari tartışmasında asla açma.

## §2 · S63'ÜN İKİ YASASI (asla unutma)
- **S63-1 · MERGE KANIT DEĞİLDİR; CANLI ÖLÇÜM KANITTIR.** Birleştirilmiş bir
  düzeltme, prod okuması semptomun gittiğini gösterene dek yük taşımıyordur.
  Her fix fazı kendi deploy-sonrası kanıt okumasını adlandırır. (Doğuşu:
  lineage KB §6 — ihlal altında üç yeşil deploy — + F169 canlı okuması.)
- **S63-2 · REGISTER KENDİ KENDİNE YETER.** Her AÇIK kalem her versiyonda tam
  metniyle taşınır; geriye pointer yalnız terminal-işaretli kalemlere ve
  CANLI working-set belgelerine meşrudur. (Doğuşu: v62→v59_7 zincir kırığı;
  bedeli §4'te açıkça yazılı — F-BW11/12/13 metin kaybı, tally #17.)

## §3 · SABİTLER + STANDING (değişmedi + eklendi)
PLATINUM · GOLDEN LEDGER · FULL-TRACE · COVERAGE-IS-CONFIG · ABSENCE-ONLY ·
GOLDEN FREEZE (B5'e dek; v1_2 A-1 gereği router tip YAYINLAMAZ) · S43-2
FAST-GATE · S43-3/4 · S47-1 · S54-2/3/4 · S55-1/2 · S37-1 (sunulan artifact
dokunulmaz — v1 mimari HTML arşiv, v1_2 canlı) · S37-2 · S59-2 TOTAL-45 ·
S61-1/2/3 · S62-1/2/3 · **S63-1/2** · v1_2 §8 A-1…A-9 bağlayıcı kısıt seti ·
oda kartı 8 satır + üçlü kanıt + faydalı-tur çapası (v1_2 §7).
Operator=Gemini Supabase MCP, migration=`db push`, fence her prompt'ta
(`fjbrkimwvtpwoxhziidh`).

## §4 · SIRA — register v64 §8 tam, özet:
1. **F169 HOTFIX** (yukarıda; kanıt okuması dahil) →
2. **F173 canlı teyidi** — Operator: 22P02 durdu mu →
3. **F174 kararı** (sahip; genişlik önerisi) →
4. **ÖLÇ** — F129 tetiği + yönetilen tavan: Recall@k + mevcut kapı davranışı
   taban çizgisi, genişletilmiş korpusta (S62-2 — atlanamaz) →
5. **turn_context iskeleti** (v1_2 §9-2) →
6. **⑤+⑥ fazı** — τ/β + çapa/taşıyıcılık + üç davranış + kapsam kapısı +
   deterministik atıf + P3c (v1_2 §9-3; C onaylı) →
7. **F177 okumaları** → 8. **B3/MEMORY-1 tasarım notu** (F166-aware +
   ARDICTECH-bağlı: memory tablolarında auth.users FK YOK · kiracı=profil ·
   Class-C saklama). F178/F179 sıradaki gözlemlenebilirlik turunda; F180 ayrı
   okuma.

## §5 · AÇIK RAF (register v64 §5 tam metin; burada ad):
**Yeni:** F178 (guard yanlış yüklemi zorluyor — varış/zamanındalık yok) ·
F179 (sentetik enjektör FULL-TRACE dışında) · F180 (LB-11 doğrulanmadı,
filo riski). **Durumu değişen:** F169 (kanıtlı, fix hazır, gönderilmedi) ·
F174 (kritik yol) · F175 (DESIGN-APPROVED@v1_2). **Taşınan:** F129 (kritik
yol) · F171-B · F172 · F153 · F158 · F160 · F164 · F165 · F166 · F176 ·
F177 · F-BW11/12/13 (metin borcu §4'te açık). **Watch:** PANE-SCROLL sınıfı ·
Vercel MCP log tekniği · Supabase 522 · seed_state 23505 · stale-branch
süpürmesi · EAIP A1 bayat çıpa (rev 70) · RULE-27 Class-C maddesi borçlu ·
map v3 §6 stale.

## §6 · TON
S63, sahibin "10 kere konuşacağız, bir kere yapacağız" sözünün konuşma
yarısıydı: altı düğüm sesli düşünülerek çözüldü, iki onay alındı, üç yeni
bulgu ve iki yasa doğdu — ve Architect kendi üç öncülünü kendi ölçümüyle
düzeltti (#15–#17). **S64 yapma oturumudur.** Aynı dürüstlükle: kanıt göster,
öncül yaptığını işaretle, doğrulamadığını "doğrulamadım" de — ve hiçbir işi
canlı kanıt okuması olmadan "bitti" sayma.

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v62 · 2026-07-25 -->
