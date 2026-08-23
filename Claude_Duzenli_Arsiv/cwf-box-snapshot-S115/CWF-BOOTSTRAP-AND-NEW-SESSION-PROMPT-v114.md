# CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v114

**v113'ü GEÇERSİZ KILAR.** S113 kapanışında yazıldı, `922ef571a4d8e1c6c9dd751d6c20f6ec144b3eea` zemininde.

---

## §0 · ÇAPA TABLOSU — taze klonda DOĞRULANMADAN faz kartı kesilmez

| alan | değer | nasıl ölçülür |
|---|---|---|
| master | `922ef571a4d8e1c6c9dd751d6c20f6ec144b3eea` | `git ls-remote origin refs/heads/master` |
| tutulan claim | `lane/AG-5` (ustabaşı, oturumlar arası tutar) | `git ls-remote origin 'refs/heads/lane/*'` |
| açık dallar | `phase/adf-kademe-1-close` · `phase/adf-kademe-1-fence-read` · `phase/adf-kademe-1-foreman-first` — **üçü de AG-5'in kendi işi** | `git ls-remote origin 'refs/heads/phase/*'` |
| üretici merge yetkisi | **YOK** — `.claude/settings.json` içinde `gh pr merge` sıfır kez geçer | `git show origin/master:.claude/settings.json \| grep -c "gh pr merge"` |
| ustabaşı merge yetkisi | VAR — `.claude/settings.foreman.json`, artı `env.ADF_LANE_ROLE=foreman` | aynı okuma, foreman dosyasında |
| boot dosyaları | `.claude/boot/{producer,foreman,free}.md` | `git ls-tree -r --name-only origin/master -- .claude` |
| komutlar | `.claude/commands/{wr,ub,free,durum,claim}.md` | aynı |
| foreman boot digest | `7fac4ac59b9c776a1e979847f59a2d01` · 4424 bayt | `git show origin/master:.claude/boot/foreman.md \| md5sum` |
| `turn.maxTokensPerTurn` | **600000** (panel v2, üç kapı geçti, v1 rollback mevcut) | Control Plane → Kurallar/Rules → ara: `maxTokensPerTurn` |
| IAM bütçe izni | politika `v5` varsayılan, `BudgetsRead` = `ViewBudget` + `Describe*` | `aws iam get-policy-version … --version-id v5` |
| SOTA | (A) iç sayaç **6/7**, açık `#29 A23` · (B) kabul sözleşmesi **0/16** | `cwf-sota-definition-v1_5` §10 |

**UYARI — bayatlar:** bu tablo bir sonraki master push'unda çürür. Architect her oturumun ilk işinde yeniden ölçer.

---

## §1 · PENCERELERİ AÇMA — S113'ten itibaren tek kelime

Beş Claude Code penceresi. Her birine **yalnız şunu yaz**:

```
/wr
```

Üretici şerit. Adres **sunucudan kazanılır**, numara yazılmaz. Dört pencereye aynı şey yazılır; her biri boş olan ilk adresi alır.

```
/ub
```

Ustabaşı. `lane/AG-5` claim'i zaten tutuluyor.

```
/free
```

Salt-okunur keşif şeridi. Adres almaz, kutu okumaz, repoya **hiçbir şey yazmaz**. Architect'in ölçüm eli.

```
/durum
```

Herhangi bir pencerede: on alan + claim'ler + açık PR.

**Operator (Gemini):** hâlâ elle boot yapıştırılır. `.gemini/` yüzeyi **ölçülmedi** — S114'te `/free` ölçecek.

**⚠ Bir kez yapılacak:** ustabaşı penceresi `--settings .claude/settings.foreman.json` ile açılmalı. S113'te bu yapılmadı ve ölçüldü: `ADF_LANE_ROLE` boş çıktı, izin ayrımı master'da gerçek ama pencerede etkisizdi.

---

## §2 · YENİ OTURUM AÇILIŞ PROMPTU

Aşağıdakini yeni sohbete olduğu gibi yapıştır:

```
S114 açılıyor.

Proje kutusundaki en yüksek sürümleri oku: CWF-S113-SESSION-CLOSE-v1,
CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v114, cwf-open-items-register,
CWF-SESSION-GRAPH-KB, REGISTER-BUG-BUCKET, cwf-rule-ledger,
ADF-ARCHITECTURE-v1.

Sonra bootstrap §0 çapa tablosunu taze klonda DOĞRULA — hatırlama, ölç.
Zemin master = 922ef571a4d8e1c6c9dd751d6c20f6ec144b3eea; kaymışsa
kaydığını söyle ve ölçülmüş head'i kullan.

İlk mesajında SOTA-1'i kelimesi kelimesine yeniden yaz.

Sahip hükümleri geçerli: ADF %100 bitmeden CWF'ye dönülmez (S113-H2).
Tek GitHub kimliği (S113-H3). Bütçe eşiği 125'te kalır (S113-H4).

S114'ün birinci işi: ADF Kademe 2 — npm run land + yedi sınıf kapı öz-testi.

Pencereler açık: /wr ×4, /ub, /free. Operator boot bekliyor.
```

---

## §3 · S114'ÜN SIRASI — S113 kapanışında hükmedildi

1. **Kademe 2 · `npm run land`** + yedi sınıf kapı öz-testi (yedi kırmızı, yetki almanın önkoşulu)
2. `/free` ile **üç ölçüm**: paylaşılan klon şeritlerce erişilebilir mi · `.gemini/` yüzeyi · ARMES canlı durumu
3. `guard-bash` mutlağı — `ADF_LANE_ROLE=foreman` dışında `gh pr merge` → `exit 2`. **Harness reddi ölçülmüş; sahip eli gerekebilir**
4. `ADF-FOREMAN-SELF-LAND-1` — ustabaşının kendi raporunu kim indirir, üç seçenekli karar
5. `ADF-ARCHDOC-2of2-1` — mimari belge düz metin parçalarla repoya
6. Kademe 3 (bağlam organı H2 + arşiv otomasyonu) → Kademe 4 (H9 deploy, H10 `lane_events`)
7. **Sonra** A23

---

## §4 · ARCHITECT'İN DEĞİŞMEYEN DİSİPLİNİ

- **Kart ≤ 4 KB**, düz metin, tek konu, tek sahip. **Kodlanmış yük binmez** (`A-REC-S113-PAYLOAD-TRANSPORT-1`)
- **Preflight GREEN olmadan hiçbir kart bus'a girmez**
- Her INSERT `md5(body)` + `length(body)` döndürür ve yerel dosyayla karşılaştırılır
- **"Basıyorum / ölçüyorum" cümlesi kurulmaz.** Ya yapılmış ve digest'i raporda, ya hiç anılmaz (`A-REC-S113-SAY-NOT-DO-1`)
- Sahibe operasyon adımı yazılmaz — `git pull` dahil (S102-YASA-1, `A-REC-S113-OWNER-GIT-PULL-1`)
- Bir ret **ölçümdür**; etrafından dolaşılmaz, metni kelimesi kelimesine basılır
- **Etiket hesaplama değildir.** İzin listesi bir niyet, harness bir mekanizma; kod tanımı bir taban, kontrol düzlemi bir yüzey (`A-REC-S113-CONTROL-PLANE-BLIND-1`)

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v114 -->
