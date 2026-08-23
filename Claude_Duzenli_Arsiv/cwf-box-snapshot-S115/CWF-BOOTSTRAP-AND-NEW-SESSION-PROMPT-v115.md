# CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v115

**v114'ü GEÇERSİZ KILAR.** S114 kapanışında yazıldı, `7c099fc6a6e6534dbabc4d9d0e4e89d84ac78c62` zemininde.

---

## §0 · ÇAPA TABLOSU — taze klonda DOĞRULANMADAN faz kartı kesilmez

| alan | değer | nasıl ölçülür |
|---|---|---|
| master | `7c099fc6a6e6534dbabc4d9d0e4e89d84ac78c62` | `git ls-remote origin refs/heads/master` |
| lane claim'leri | **SIFIR** — S114 kapanış kartı beşini de bıraktı | `git ls-remote origin 'refs/heads/lane/*'` → boş (pozitif kontrol: master satırı aynı komutla gelir) |
| phase dalları | **SIFIR** | `git ls-remote origin 'refs/heads/phase/*'` |
| `.claude/` dosyaları | 16 dosya: `boot/{foreman,free,producer}.md` · `commands/{claim,durum,free,ub,wr}.md` · `hooks/{guard.sh,guard-bash.py,guard-bash.test.py,guard-secrets.py,guard-secrets.test.py}` · `loop.md` · `settings.json` · `settings.foreman.json` | `git ls-tree -r --name-only origin/master -- .claude` |
| boot digest'leri | foreman `599068b31b1a56622a1d9253a4f85df6` · producer `ee9fe9fac1b1c2f0c702ba6adc32a18b` · free `e41f0efc9f0399a408bd0a74fe901232` | `git show origin/master:.claude/boot/<x>.md \| md5sum` |
| hook komutu | `sh .claude/hooks/guard.sh guard-bash.py` ve `… guard-secrets.py` — göreli, değişkensiz | `git show origin/master:.claude/settings.json \| grep command` |
| üretici merge yetkisi | YOK (`gh pr merge` 0 kez) | `grep -c` on `settings.json` |
| ustabaşı merge yetkisi | VAR (1 kez) + `env.ADF_LANE_ROLE=foreman` | aynı, `settings.foreman.json` |
| iniş | `npm run land -- <pr>` · `npm run land:selftest` (11 sınıf) · `npm run claim:roster` | `git show origin/master:package.json \| grep land` |
| bus roster | `relay_inbox_lane_addr_check`: AG-1…AG-5 + operator | `pg_get_constraintdef` |
| SOTA | (A) 6/7, açık `#29 A23` · (B) 0/16 | `cwf-sota-definition-v1_5` §10 |

**UYARI — bayatlar:** ilk master push'unda çürür. Architect her oturumun ilk işinde yeniden ölçer.

---

## §1 · PENCERELERİ AÇMA — S114'te ÖLÇÜLMÜŞ üç koşul

Altı pencere, hepsi **terminalden**, hepsi `cwf_yaprak` klasöründe. IDE'nin Claude Code paneli **kullanılmaz** — auto-mode sınıflandırıcısı S114'te dört kez engel oldu ve `/hooks` yüzeyi yok.

**Sıra önemli: önce keşif, sonra diğerleri.**

1. Terminal 1 — keşif:
   `claude --permission-mode default` → `/free`
   Açılış raporunda iki şey okunur: **(a)** kapı probu `BLOCKED` (kapının doğum kanıtı, Kademe 2'nin son parçası); **(b)** `git rev-parse HEAD` = `git ls-remote origin master`. İkisi de tutmuyorsa **başka pencere açılmaz**; sebep önce ölçülür.
2. Terminal 2 — ustabaşı:
   `claude --settings .claude/settings.foreman.json --permission-mode default` → `/ub`
   Claim yoksa yürüyüş kazanır; varsa devralma kuralı lease ile alır.
3. Terminal 3–6 — üretici ×4:
   `claude --permission-mode default` → `/wr`
   Adres sunucudan kazanılır; roster tavanlı, AG-6 doğamaz.

İzin soruları sahibe gelir (default mod): claim push, `git push`, `npm run land` → **Yes**, her seferinde; "always allow" seçilmez.

**Operator (Gemini):** hâlâ elle boot. `.gemini/` yüzeyi ölçüldü: yalnız `settings.json`, tek MCP (`gemini-api-docs-mcp`); komut/boot mekanizması yok. Repoya alınması Kademe 3.

**Bilinen sınır — poll bütçesi.** Boot'lar hâlâ "bounded budget" diyor; şeritler 40–120 dk sonra sağırlaşabilir. S115'in ilk kartı bunu kaldırır; inene kadar açılıştan sonraki ilk saatte kart verilmiş olur.

---

## §2 · YENİ OTURUM AÇILIŞ PROMPTU

```
S115 açılıyor.

Proje kutusundaki en yüksek sürümleri oku: CWF-S114-SESSION-CLOSE-v1,
CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v115, cwf-open-items-register-v118,
CWF-SESSION-GRAPH-KB-v114, REGISTER-BUG-BUCKET-v51,
cwf-implementation-order-S114-v27, S115-AG-BOOTS-v1.

Bootstrap §0 çapa tablosunu taze klonda DOĞRULA — hatırlama, ölç.
Zemin master = 7c099fc6a6e6534dbabc4d9d0e4e89d84ac78c62; kaymışsa söyle.

İlk mesajında SOTA-1'i kelimesi kelimesine yeniden yaz
(docs/laws/constitution/SOTA-1.md'den, kutudaki aynadan değil).

Sahip hükümleri geçerli: ADF %100 bitmeden CWF'ye dönülmez (S113-H2).
Tek GitHub kimliği (S113-H3). Bütçe eşiği 125 (S113-H4).
Başsız şerit şimdi değil (S114-H1).

S115'in sıfırıncı işi: /free açılış raporunda kapı probu BLOCKED ve
HEAD = master. Birinci işi: ADF-KADEME-3-POLL-AND-DONE-1 (bütçesiz
poller + türetilmiş tamamlanma + çift mercek) — AG-1.

Push edilmiş her şeyi kendin oku (git + bus); sahipten ekran yalnız
bir şerit push etmeden soru sorduğunda ister.
```

---

## §3 · S115'İN SIRASI — S114 kapanışında hükmedildi

0. `/free`: kapı probu BLOCKED + klon = master (Kademe 2'nin kapanış kanıtı)
1. **`ADF-KADEME-3-POLL-AND-DONE-1`** — bütçesiz poller · `RELAY-DONE-DERIVED-1` · tick'te çift mercek · `ADF_LANE_ROLE` boot'tan (AG-1)
2. `ADF-KADEME-2-LAND-FIX-2` — `MERGE-CONFLICT` soğuk klon etiketi · kuyruk hükmü · commit-status (Vercel iptal) okuması (AG-2)
3. `ADF-KADEME-2-GUARD-FIX-1` — metin değil amaç (`grep` yanlış pozitifi) · `lane/*` preview deploy ignore (AG-4)
4. Kart grameri: `R-ABSENCE-LENS` "non-zero" yanlış pozitifi (AG-3)
5. `ADF-ARCHDOC-2of2-1` · `ADF-FENCE-DECL-DRIFT-1` · Operator boot repoya
6. Kademe 3 — bağlam organı H2 + arşiv otomasyonu → Kademe 4 (H9, H10)
7. **Sonra** A23

**Sahip maddesi, S115 ilk iş:** Supabase access token döndürme (S114'te transkripte düştü).

---

## §4 · ARCHITECT'İN DEĞİŞMEYEN DİSİPLİNİ — S114 ekleri

- Kart ≤ 4 KB · preflight GREEN · INSERT `md5+length` yerel dosyayla eşit · kutuya yüklenen dosyanın md5'i doğrulanır
- **Hüküm sohbete yazılmaz, bus'a basılır** (`A-REC-S114-RULING-NOT-ON-BUS-1`)
- **Push edilmiş her şey Architect'in kendi okumasıdır**; sahipten ekran yalnız bus'ın ulaşamadığı yerde (`A-REC-S114-ASK-WHAT-I-CAN-READ-1`)
- Ölçüm satırlarında sır-dosyaları **adıyla dışlanır** (`A-REC-S114-SECRET-READ-ORDER-1`)
- Aynı dosyayı değiştiren kartlar aynı dalgada sıralanmaz; sıralanacaksa çatışma kartta önceden adlandırılır (`A-REC-S114-PACKAGE-JSON-ORDER-1`)
- Bir prob, kapının **gerçekten reddettiği** bir komut olmalı (`A-REC-S114-PROBE-SCOPE-1`)
- Ret bir ölçümdür; sınıflandırıcı reddi de. Etrafından dolaşılmaz, pencere modu düzeltilir

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v115 -->
