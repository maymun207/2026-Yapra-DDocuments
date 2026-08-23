# CWF — PARALELLEŞTİRME ÇİT HARİTASI + DALGA PLANI · S96 · v2

<!-- cwf-parallel-fence-map-S96-v2 · 2026-08-13. v1'i (S95) geçersiz kılar.
     TÜRETİLMİŞ PLANLAMA GÖRÜNÜMÜ; bağlayıcı sıra rollout v3_2, açık kalemler
     register v100. v2 FARKI: §0 TEKİL-KAYNAK ENVANTERİ (S96 fırtınasından
     doğdu) + Dalga 3 kapanışı + Dalga 3.5 fix işlendi. -->

## §0 · TEKİL-KAYNAK ENVANTERİ (her dalga promptuna gömülür — S96-1/2/3)

Bir aktörün dokunabildiği VE başka aktörün de dokunduğu HER kaynak bu listede
durur; listede olmayan bir kaynağa iki şeridin dokunması kendi başına STOP.

| Kaynak | Kural |
|---|---|
| Çalışma ağacı + index | Şerit başına MÜNHASIR. STEP 0 makine kapısı: `git status --porcelain` boş değilse ve kirli dosyalar kendi çitinde değilse YAZMADAN DUR. Rapor `## TREE` bölümü zorunlu — yoksa RULE-25 başlamadan geri döner (S96-1) |
| Ref alanı + stash + nesne deposu | Worktree AYIRMAZ. Kendi branch'in dışında ref'e dokunma; `-B`/`branch -f`/force-push/komşu-checkout YASAK; `git stash` YASAK (patch dosyası kullan); ucunu kaybettiysen DUR-bildir; her anlamlı commit'ten sonra origin'e push — origin tek güvenli yer (S96-1) |
| `.agents/CHANGELOG.md` + `.agents/skills/cwf-project-kb/SKILL.md` | UNION-EKLEME DİKİŞİ: rebase çakışmasında bütün taraflar tutulur, kendi satırların sona, silme yasak; falsifier `git diff <önceki-master> -- .agents/` = 0 silme (S96-3 / F-S96-AGENTS-SEAM) |
| Mühür (`manifest.json`/docVersion) | Merge turu başına TEK yazar; inşada asla; rebase→master'dan OKU→sonraki numara→reseal+bump AYNI commit (S95-1). İnşa CI'ı için provizyonel mühür `DROP AT MERGE` etiketiyle, merge turunda düşer |
| Migration ledger | Dalga başına ≤2; damga slotları dalga açılışında atanır; yalnız Operator uygular (ADR-005) |
| Turn pipeline (stages/frame) · Admin nav · CI workflow · `package.json` · `vercel.json` | Dalga başına TEK yazar; gate/lens işleri CI'a vitest üzerinden biner (workflow dosyasına dokunmadan) |
| Relay artefaktları | relay-audit v1 grameri: header + CLAIMS + (prompt: PRECONDITION+FALSIFIER · report: DIFF · go: TAIL-ANCHOR); tarih 74+4 adla dondu, Dalga-4'ten itibaren zorunlu |
| PR hijyeni | Her şerit merge sonrası KENDİ PR'ını kapatır (`gh pr close <n> --comment "content merged into master by rebased --no-ff merge; head SHA stale after rebase"`) |
| Paylaşımlı klon (tarihî) | KARANTİNA — kimsenin çalışma alanı değil; içindeki yarım `checkTenantZero.ts` artığı SÜPÜRME kalemi (tek aktör, dalga arası) |
| Verdikt pencereleri | S96-2 DOĞUM-PENCERESİ YASASI: bir organın yokluk/varlık ayırıcısı, organın DOĞUM (deploy) anından SONRAKİ pencereye koşullanır; doğum-öncesi aktivite hiçbir organ hakkında kanıt değildir |

## §1 · SINIFLANDIRMA + geniş çit — v1 §2 aynen geçerli (WIDE: #11 · #16 · #18 · #23 · #25 · #29; SC-A/SC-B listeleri değişmedi)

## §2 · DALGA TABLOSU (güncel)

| Dalga | A | B | C | D | Açık | Kapı |
|---|---|---|---|---|---|---|
| ✅1-2 | (S95, sekiz merge) | | | | 25 | 1/7 |
| ✅3 | #10-1B 🔑 | #7 | #8 | #9 | **21** | **2/7 — döndü, canlı mühürlü** |
| **3.5** | CENSUS-REFRESH-FIX-1 (solo) | — | — | — | 21 | 2/7 |
| 4 | #11 | #15 | #19 | #21 | 17 | 2/7 |
| 5 | #16 🔑 | #13 | #17 | #12 | 13 | 3/7 |
| 6 | #18 🔑 | #14 | #28 | #37ª | 9 | 4/7 |
| 7 | #23 🔑 | #34 | #27ᵇ | — | 6 | 5/7 |
| 8 | #25 🔑 | #33 | artıklar | — | 4 | 6/7 |
| 9 | #29 🔑 | — | — | — | 3 | 7/7 → yaprak_gate |
| 10 | #30 | #31 | #32 | — | 0 | → cinekop_gate |

ª sahip kararı-2 · ᵇ sahip kararı-3 (Qdrant). Dalga sayısı PLAN'dır, ölçüm değil.

## §3 · Güvenlik kuralları — v1 §4 aynen + merge sırası "kim hazırsa", sıra
değişimi TÜM şeritlere aynı turda (S95-2); kuyruk SHA'ları sahip relay'iyle.

<!-- END · cwf-parallel-fence-map-S96-v2 -->
