# CWF — BOOTSTRAP & YENİ OTURUM PROMPTU · v106 (S106 için)

<!-- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v106 · 2026-08-17 (S105 kapanışı).
     v105'i GEÇERSİZ KILAR. ÇAPA tablosu taze klonda DOĞRULANMADAN faz kartı
     kesilmez (RULE-25). BÜTÜN yazıldı. -->

## §A · ÇAPA (S106 preflight'ında DOĞRULANACAK — rapora güvenilmez)
| Ne | Beklenen | Nasıl |
|---|---|---|
| `origin/master` | **`d3644c9e25608e51a20e240edde9ce68813d75da`** | taze tam klon + `git rev-parse origin/master` |
| docVersion | **rev 277** | `public/architecture/manifest.json` |
| vitest test dosyası | **653** (süit 9245 test) | `find . -name '*.test.ts*' \| grep -v node_modules \| wc -l` |
| e2e spec | **19** | `ls e2e/*.spec.ts \| wc -l` |
| migration | **88** dosya = **88** canlı satır, kayık anahtar **0** | `ls supabase/migrations/*.sql \| wc -l` + `select count(*) from supabase_migrations.schema_migrations` |
| ADR | **16** | `ls docs/adr/*.md \| wc -l` |
| `phase/*` ref | **0** (tek head master, açık PR 0) | `git ls-remote --heads origin` |
| `docs/design/` | **5** dosya (4 belge + INDEX) | `git ls-tree --name-only origin/master docs/design/` |
| `governance_archive` | CANLI, 3 tetik | `pg_catalog.pg_trigger` |
| valf | `vector.engine='qdrant'` v2 published · `vector.enabled=1` v2 published | `select key,payload,status,version from public.domain_rules where kind_id='agent.param' and key like 'vector.%'` |
| encoder digest | `sha256:54a282264c68dc170fb684010d6fbf93cb880ea2b59b624a35a74e706ab4a1c3` | vector-live-proof dispatch |

**Lens tuzağı (S105'te iki kez ısırdı):** `domain_rules` sütunu `key`'dir
(`rule_key` DEĞİL) ve `kind_id` = **`agent.param`** (`system.agent_param`
DEĞİL). Boş dönen sorgu YOKLUK KANITI DEĞİLDİR — merceği önce kanıtla.

## §B · İLK MESAJ RİTÜELİ
1. `cwf-memory-seed-CWF5-v1.md` oku.
2. **SOTA-1'i kelimesi kelimesine yeniden yaz** (S66-1 pozitif kontrolü).
3. Bu dosyanın §A tablosunu taze klonda doğrula; her sapma bir BUG'dır.
4. Proje kutusundaki `CONSTITUTION.md`'nin md5'ini taze klondaki
   `docs/laws/CONSTITUTION.md` ile karşılaştır — fark = ayna bayat, repo kazanır.
5. Register **v108** · bucket **v41** · impl-order **v18** · KB **v105** oku.

## §C · S106 AÇILIŞ SIRASI (bağlayıcı, sahip+Architect hükmü)
1. **#66 VECTOR-ONBOARD-DRIP-1** — öncelik kuyruğu (sorgu ⟩ indeks) + throttling.
   Sahip hükmü: AYRI FAZ. Yarısı elde (admission telli, rate 5, sayaçlar okunur).
2. **#75 VECTOR-CONSUMER-1** — `resolveAgentParams` iki anahtarı çözer +
   `VectorLaneConfig` yönetilen satırlardan kurulur + **ilk tüketici A23 ③
   Resolve'ün İÇİNDE**. ⚠ Valf ZATEN AÇIK: bu kart canlıya ek onay olmadan çıkar,
   bu yüzden rollback (`enabled=0`) kartın içinde ADIYLA yazılı olmalı.
3. **Tekrarlı parite ölçümü** — tek koşu değil; tekrar + yayılım (L-ADAY-5).
4. **A23 v1_4 mint** (Architect borcu) — düzeltilmiş §3(c) ile; W1 kilidi bununla düşer.
5. Paralel/bloklamayan: **#81 BACKEND-DISCOVERY-1** · **LAW-LEDGER-4** ·
   zehirli-satır onarımı · #65 · R4-FIX-3.

## §D · ŞERİT DURUMU (S105 kapanışında)
AG-1 boşta (R4-FIX-3 borçlu) · AG-2 boşta (zehirli-satır + #65 + 15 yönetişim
belgesi ingest borçlu) · AG-3 MAIL-WAIT (valf kartını bitirdi) · AG-4 MAIL-WAIT
(#82a bitirdi) · Operator MAIL-WAIT (defteri onardı; **BOOT'suz posta yok**).

## §E · SABİTLER
Repo `maymun207/cwf_yaprak` (**PUBLIC** — tenant-zero kapısı bu yüzden vardır) ·
Supabase `fjbrkimwvtpwoxhziidh` · Vercel `prj_0fDFCY8qXj8Kr5y7n4zmyefjHY8i` /
`team_UjOMyrQtTQ32mfYCeEDpC0Qj` · CloudFront `dl3644f5a7fnn.cloudfront.net` ·
kutu 8/8 konteyner · bütçe $150/$125/$145-stop, çit ~20 Ağustos ·
GitHub Actions API bu kapta 403 (beklenen, hata değil).

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v106 -->
