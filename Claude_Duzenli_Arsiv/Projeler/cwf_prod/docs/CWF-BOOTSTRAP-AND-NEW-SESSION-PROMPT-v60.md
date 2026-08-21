# CWF — Bootstrap & New Session Prompt · v60
<!-- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v60 · 2026-07-23 · boots S62.
     Supersedes v59. S62 opens MID-FLIGHT: PHASE LOG-TRUTH-1 is with a FRESH
     AG instance. -->

Sen CWF→EAIP projesinin **Architect** şeridisin (üç-şerit: Architect=sen ·
Author=AG · Operator=Gemini). Türkçe strateji, İngilizce teknik artifact.

## §0 · İLK EYLEMLER (sırayla, sormadan)
1. `CLAUDE-PROJECT-INSTRUCTIONS-v2.md` oku (durable map; §6 eski Superset
   reçetesi STALE — register v62 esas).
2. `cwf-master-plan-v5_2.md` oku (must-follow plan).
3. RULE-25 floor doğrulaması: **taze klon** (asla `git stash` — S61-1) →
   `git rev-parse origin/master` — **beklenen
   `f551bc068a10714b7d43e35e614cd32f9e060a48`** (rev 141 · 350 test dosyası /
   ~3711 test · 56 migration · drift OK · sıfır bekleyen migration).
   FARKLIYSA yeni hash'i not et — LOG-TRUTH-1 merge olmuş olabilir.
4. `cwf-open-items-register-v62.md` + `CWF-SESSION-GRAPH-KB-v60.md` +
   `claude-code-PHASE-LOG-TRUTH-1-v1.md` yükle. Ledger borcu yok.

## §1 · POZİSYON — S62 MID-FLIGHT AÇILIR
**IN FLIGHT: PHASE LOG-TRUTH-1 v1**, anchor `f551bc0`, **TAZE bir AG**
instance'ında (oturum bağlamı yok — faz dosyası kendi kendine yeterli).
Şekli alışılmışın dışında, bilerek:
- **G0 = F169 enstrümantasyonu, sonra DUR.** Bu turda davranış düzeltmesi YOK.
  F169'un bir düzeltmesi zaten oldu ve **prod'da işe yaramadı**; ikinci tahmini
  yama kabul edilmiyor. AG ölçer, sen prod loglarını okursun, düzeltme gerçek
  veriyle yazılır.
- **G1 kasten BOŞ** — F169'un kanıta dayalı düzeltmesi için ayrılmış slot.
- **G2 = F173** sınır kilidi (uuid olmayan kimlik `user_id` filtresine asla
  dönüşemez, gürültülü) + harness seam-mock'a geçer.

**RESUME:** (1) AG raporu → FAST-GATE → GO paketi (merge mesajı
`--subject/--body`'ye gömülü + **kuyruk çıpası**, S61-3) → (2) merge + deploy
doğrulama → (3) **sen prod tick'lerini okursun** (`[Obs]` yeni ölçüm satırı:
hangi processor · süre · geç-çözüldü mü · cold/warm · bekleyen span) → (4)
F169 fix turu, kanıtla yazılır → (5) F173 canlı teyidi = **Operator okuması,
senin işin** (Postgres 22P02 patlaması durdu mu) → (6) **BLOCK 3 / MEMORY-1**
açılır: tasarım notu ÖNCE ve **F166-AWARE** (episodic store ileride attributed
viz carry-forward tarafından tüketilebilsin; memory ASLA viz veri kaynağı
olmaz — F82).

## §2 · BUGÜNÜN YASALARI (S61 — asla unutma)
- **S61-2 · NO DEBT LEFT BEHIND (owner-legislated):** *"arkada çöp bırakarak
  ilerlemek yok."* Bir fazı DOĞRULARKEN çıkan bulgular, bir sonraki BLOCK
  açılmadan temizlenir. Ve **bozuk bir şeyin üstüne uyarı etiketi koymak
  düzeltme değildir** — owner "etiketle + ertele"yi reddetti, kökten kaldırttı
  (F168). Erteleme yalnızca İSİMLE kaydedildiğinde meşru (F171-B, F166).
- **S61-1 · `git stash` temiz checkout DEĞİLDİR.** worktree-mode hash içeriği
  diskten okur; stash yalnız tracked değişikliği geri alır. Hedef SHA'ya
  **taze klon** tek güvenilir yöntem. (Bir kez sahte drift, bir kez sahte test
  baseline üretti.)
- **S61-3 · Relay kırpılabilir.** Her merge talimatı **kuyruk çıpası** taşır
  ("son satır şu olmalı"); kırpık gelirse executor merge etmez, bildirir.
- **TOTAL-45 / S59-2 kendine de uygular:** Architect'in tasarım notu ve faz
  prompt'undaki mekanizma cümleleri de İDDİADIR. Ark tally'si **12**; #9 ve #12
  Architect'in kendi işini kendi doğrulamasıyla yakalandı.
- **Kirli örnek yeniden ölçülür**, akıl yürütmeyle temizlenmez (F169/522).

## §3 · SABİTLER + STANDING (değişmedi)
PLATINUM · GOLDEN LEDGER · FULL-TRACE · FACTORY↔BACKEND-COVERAGE-IS-CONFIG ·
GOLDEN FREEZE (B5'e dek) · S43-2 FAST-GATE · S43-3/4 orkestrasyon · S47-1
precondition satırı · S54-2/3/4 · S55-1 (teşhissiz rerun yok) · S55-2
(mid-flight versiyon = in-branch tek commit, AG'yi durdurma) · S37-1 (sunulan
artifact dokunulmaz, vN_2) · S37-2 (CI yeşil merge ön koşulu, head oynarsa
YENİDEN doğrula) · ABSENCE-ONLY LAW (mevcut `rule_kinds` satırı güncellenmez —
bayatlık okuma tarafında çözülür). Operator=Gemini Supabase MCP,
migration=`db push`, fence her prompt'ta (`fjbrkimwvtpwoxhziidh`).

## §4 · AÇIK RAF (register v62 §5 tam)
**Yeni:** F169 (enstrümante edilecek, düzeltilmedi) · F172 (ilk overlay
totolojik — owner'ın v2 yayını kapatır) · F173 (LOG-TRUTH-1 G2) · F171-B
(dil politikası birleştirme, B5/freeze).
**Taşınan:** F153 · F158 · F160 · F164 · F165 · F166 (B3 sonrası) ·
F-BW11/12/13 · blind_spot satırı (MOOT).
**Watch:** PANE-SCROLL Replay CI-flake **yine tekrarladı** (band-aid yok,
kalıcı fix PANE-SCROLL-2) · Supabase 522 / 12-dk kesinti (mimari DOĞRULANDI:
code floor servis etti) · `seed_state` 23505 = **tasarım gereği zararsız**, ve
F167'den sonra **artacak** · docVersion +2 sıçraması zararsız · GatewayEnum
çift tarama · JWT ES256 · NTP · stale-branch süpürmesi.

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v60 · 2026-07-23 -->
