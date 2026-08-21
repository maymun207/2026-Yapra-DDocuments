# REGISTER · BUG BUCKET · v43 (S107 kapanışı)
<!-- v42'yi GEÇERSİZ KILAR. Her defekt ADIYLA. BÜTÜN yazıldı. -->

## KAPANAN
**F-S106-CONSTITUTION-MIRROR-STALE** — CLOSED@evidence (ayna yenilendi, md5 7fb9eb43).
**F-S107-MANIFEST-COMMENT-R4-STALE** — CLOSED@merge #292: `_comment` reseal-türetilmiş ritüeli anlatıyor, docVersion anmıyor; komşu kanonik cümleler bayt-dokunulmamış.
**AGENTS.md bayat mandate** — CLOSED@merge #294 (üç satır, negasyonlu düzeltme; grep tuzağı register'da).
**F-S106-LANE-PERMISSION-SCOPE-INCOMPLETE — CLOSED@correction, TEŞHİS DEĞİŞTİ.** Altı oturum "eksik git izni" diye taşındı; YANLIŞTI. Ölçüm (AG-1): dört komut da user-scope allow'da (829 kural). İki gerçek kök ayrıştı: (1) `.claude/` yalnız cwf_yaprak/'ta; 17 worktree KARDEŞ → allow yukarı birleşir ama ask/hook yalnız kendi ağacında bağlar → lane'den force-push korumasızdı (KAPANDI: hook user-scope'a taşındı, 13/13). (2) SINIFLANDIRICI ayrı kapı → aşağıda açık kalem.

## AÇIK
**F-S107-CLASSIFIER-NOT-A-PERMISSION — YENİ, yapısal.** `Bash(git *)` allow'dayken merge yine reddedilir; ret izin danışılmadan olur (AG-1: 4 ret, sonuncusu salt-okunur `git status`). Boot çözemez. Kalıcı şekil §4 bootstrap'ta: merge kartı durmayı planlar, izinli pencereye devrolur (AG-1→AG-2 kanıtladı), alan şerit içeriği kendisi doğrular. Tek retten teşhis konmaz; salt-okunurda ret = sınıflandırıcı işareti.
**F-S107-LANE-WAKE-MANUAL — YENİ.** Şeritler kendiliğinden yoklamaz; her tur "posta"ya bağlı. RELAY-RETURN-PATH-1 kapsamında.
**F-BW01 — AÇIK, headroom çürük.** Üçüncü gözlem + tripwire: apt 232/300s, job 438/600s (1.29×/1.37× vs iddia 2.6×/~10×). Hüküm sürer: asılı iş verdict değil, imza eşleşmesinde TEK yeniden koşu. Kalıcı çare RULE26-DEBIAN-DETOX-1.
**F-S107-MCP-NO-SESSION-AMBIGUOUS — AÇIK.** 5×http teardown `no-session`. (a) session'sız backend / (b) sessionId görünmüyor→DELETE gitmiyor. ARMES `[McpClose]` satırı ayırt eder (401 sürerken üretilmez). Bu kapanmadan fix "çalışıyor" DENMEZ.
**F-S107-RELAY-ONE-WAY — ölçüm keskinleşti.** Rol değil ŞEMA: `relay_inbox_reply_authority CHECK ((direction='to_lane') OR (lane_addr='operator'))` — her rolü bağlar. Satır sayısı boşluğu; YASAK/HİÇ-OLMAMIŞ ayrımını yalnız kısıt verir.

## ARCHITECT ÖZ-DÜZELTMELERİ
**A-REC-S107-1** — merge mesajına kanıtlanmamış "fixes root cause"; şerit yakaladı, "targets measured mechanism; G3 owed" oldu. Mekanizma ölçümü ≠ üretim kanıtı.
**A-REC-S107-2** — boş from_lane "raporlamadı" okundu; gerçek: yazamıyor. Tek negatif prob yokluk kanıtı değil.
**A-REC-S107-3** — "master oynarsa üstünde devam et" dedi, rebase'i emretmedi/ölçmedi → #294 bayat çapada kesildi.
**A-REC-S107-4** — iki-nokta diff'i merge sonucu sandı; "820 silme = revert" yanlış alarmıyla force-push emretti. AG-1 ölçtü, öncülü çürüttü, durdu. Karar: deneme merge + sonucu diffle + adıyla sağkalım. **A-REC ortak deseni: gösterge (sayı/rozet/diff çıktısı) ile yer gerçeği (kısıt/adım-conclusion/merge sonucu) karıştırılamaz — S107'de dört kılıkta.**
**A-REC-S107-5** — karta sahip vermeden "owner-granted" onay token'ı yazıldı; sahip sonradan verdi ama sıra yanlıştı. Token yalnız sahipten doğar.
**PB-S107-1** — sahibe "ilet/yapıştır" maddeleri; kart taşımak makine işi. Düzeltme: relay'e doğrudan basım + forge'u doğrudan okuma.
**Sahip düzeltmesi (kayıt):** Architect sahibe şerit jargonuyla yazdı ("dört git izni…"); sahip anlamadı ve söyledi. Sahibe her cümle bağlamsız-anlaşılır düzyazı olmalı.
<!-- END v43 -->
