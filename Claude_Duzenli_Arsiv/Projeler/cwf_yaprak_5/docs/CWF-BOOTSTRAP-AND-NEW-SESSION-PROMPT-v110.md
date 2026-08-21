# CWF — BOOTSTRAP & YENİ OTURUM PROMPTU · v110 (S110 açılışı)
<!-- 2026-08-20. v109'u GEÇERSİZ KILAR. ÇAPA S109 kapanışında CANLI ÖLÇÜLDÜ
     (taze klon, Architect'in kendi kabından, slot-8 inişinden sonra). BÜTÜN yazıldı. -->

## §1 · ÇAPA TABLOSU (S110 açılışında TAZE KLONDA DOĞRULANACAK)
| Ölçüm | S109 kapanış değeri |
|---|---|
| `git rev-parse origin/master` | `3e95c1079eff8120ff0b52a473832cc5ce95bc4e` |
| Açık PR | **0** (#299…#307 dokuzu MERGED; 308 ref'i YOK — probu ölçüldü) |
| Yasa evi | **BUNDLE** — `docs/laws/{README,index,log}.md + rules/(54) + constitution/(15)`; monolitler EMEKLİ, RULES.md/CONSTITUTION.md dosyaları YOK |
| `index.md` md5 | `8c0f8f7cae6a49f189503ca5f9163ff5` |
| `log.md` md5 | `50eb337aa0b265afa0494ee04855a5d0` |
| `README.md` md5 | `8bc7bfcb446618dc78544d04aadd0482` |
| Son kural | **RULE-53** (45-53 S109'da mintlendi; sayı defter `id:` alanlarından HESAPLANIR) |
| Erozyon tabanları | **BAYT** (karakter gerekçesi yerinde emekli, RULE-20) |
| Master koruması | ruleset `master-merge-gate` 21034238 · required `build (24.x)` · strict · bypass [] · `current_user_can_bypass: never` · klasik düzlem KALKTI (404, üç mercek) |
| Merge queue | PLATFORM-BLOCKED (kişisel repo — GitHub docs birincil kaynak); `merge_group` tetiği master'da hazır |
| `vector_index_digest` | **CANLIDA** — RLS açık · 0 politika · anon/auth select+insert FALSE · 0 satır (ilk satırları indexer yazar) |
| vector-index cron | drip kodu+tablo hazır; İLK ÖLÇÜM 03:50Z — `ms·rows·corpusSize·mark` beklenir, `degraded:absent` bitmeli |
| Kalan dallar | 5 merged-phase + 2 kart-claim + 4 `lane/AG-*` (S109 kalıntısı — §0 boots'ta ölçülü-koşullu temizlik) |

⚠ Bu tablo bir İDDİADIR (TOTAL-45). Doğrulanmadan öncül yapılmaz.

## §2 · AÇILIŞ SIRASI (bağlayıcı)
1. `cwf-memory-seed-CWF5-v1` oku. ⚠ Tohumun S102-çağı satırları (valf kapalı, monolit yasa evi, "consumed_at asla damgalanmaz") BAYATTIR — çelişkide bu tablo + taze klon kazanır.
2. Bu dosya + ÇAPA doğrulaması (taze klon; `md5sum docs/laws/*.md` + `ls docs/laws/rules | wc -l` = 54, `constitution` = 15).
3. `cwf-open-items-register-v112` · `CWF-SESSION-GRAPH-KB-v109` · `REGISTER-BUG-BUCKET-v45` · `cwf-implementation-order-S109-v22` oku.
4. SOTA-1 POZİTİF KONTROLÜ: ilk mesajda kelimesi kelimesine, TAZE KLONDAN `docs/laws/constitution/SOTA-1.md` (S66-1).
5. **ARCHITECT DB DURUŞU (A-REC-S109-9, sahip hükmü, MUTLAK):** Architect'in Supabase MCP'si SALT-OKUMADIR. DDL/DML yalnız Operator'dan geçer; sahip onayı bu kapıyı DEĞİŞTİRMEZ. Tek yazma istisnası: `relay_inbox`'a kart INSERT'i (Architect'in kanal görevi). Şüphede: yazma = Operator.
6. İlk 03:50Z drip okuması Architect'in AÇILIŞ ölçümüdür (Vercel logları, ISO penceresi — göreli pencere timeout verir, F-S109-VERCEL-RELATIVE-WINDOW-TIMEOUT).

## §3 · İLK İŞLER (sıra bağlayıcı — sahip hükmü S109: "S110'un ilk kartı yönetişim değil")
**1 · VECTOR-CONSUMER-1 (#75).** Motorun ilk gerçek okuyucusu. Baseline mühürlü: yenilecek sayı v3=0.3333; material 3/3 REGRESYON NÖBETİ; üçlü-kanıt boşluğu her iddiaya iliştirilir. İŞLEVSELLİK — kullanıcı davranışını değiştiren ilk vektör kodu.
**2 · A23 devamı** — VECTOR-CONSUMER'la örgülü; KARAR-A23-SEQ-1 kilitleri aynen.
**3 · LANE-HOOKS-1** — repo-evli `.claude/settings.json`: Stop-hook mail-wait (posta ekonomisinin tam ölümü) + PreToolUse yasa çitleri + SessionStart preflight + bash loglama. Register v112'de tam kapsam.
**4 · Drip doğum sertifikası** — 03:50Z okuması + ikinci gece işaretten-devam kanıtı; F-S108-VECTOR-INDEX-TIMEOUT'un nihai mührü.

## §4 · S109 HÜKÜMLERİ (kalıcı — tam liste KB v109'da; en kritik altı)
Operator kapısı mutlaktır · OR'lu iniş talimatı yayınlanmış yarıştır · RULE-41 "ACTIVE"=bu-head'e-bağlı · pinli lease yanlışlanabilir iddiadır · erozyon tabanı bayttır · kendi-boşluk-listesi tuzağı (4 vaka: sayım doğru, sonuç yanlış).

## §5 · OTURUM HİJYENİ
Kuyruk boşalınca Architect KAPANIŞI ÖNERİR. Kart claim'i kart kapanana dek kalır. `lane/AG-*` temizliği S110-AG-BOOTS §0'da.

## §6 · KAPANIŞ SETİ — yedi belge, biri eksikse kapanış eksiktir
register · KB · bug-bucket · bootstrap · implementation-order · AG-boots · session-close.
<!-- END v110 -->
