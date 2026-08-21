# CWF — AÇIK KALEMLER REGİSTERİ · v110 (S107 kapanışı)
<!-- v109'u GEÇERSİZ KILAR. ALTIN DEFTER: çıkış yalnız CLOSED@evidence /
     SUPERSEDED-BY / MERGED-INTO. Özetin özeti yasak. BÜTÜN yazıldı. -->

## A · S107'DE KAPANANLAR (carry-diff'li)

**#F-S106-CONSTITUTION-MIRROR-STALE — CLOSED@evidence.** Kutu `03070bec` ≠ repo `7fb9eb43` @ 8f8dd2a9 ölçüldü; sahip aynayı repo nüshasıyla yeniledi. Akış tek yönlü: repo → kutu.

**#MCP-SESSION-TERMINATE — CLOSED@merge (master 26ce6379), G3 hariç.** Kök: SDK 1.29.0 `close()` yalnız yerel abort; `terminateSession()` (HTTP DELETE + Mcp-Session-Id) kod tabanında sıfır çağrı. Yedi teardown `finally`de kapatıyordu — attempted ≠ confirmed. Çözüm: `closeMcp()` terminate-önce-close (sıra taşıyıcı: close, DELETE'in AbortController'ını abort eder), beş durumlu outcome, her teardown'da `[McpClose]` FULL-TRACE satırı. Üretimde canlı (02:30 tick, 6 satır).

**#SEAL-DERIVE (#292) — CLOSED@merge (master a18f7697).** Elle yazılan `docVersion` skaleri repo'dan çıktı; kimlik git'ten türer (`shared/docIdentity.ts`, `<sha7> · <date>`). Ordinal ÖLÇÜMLE reddedildi (sığ klon ~1 vs tam ~1500). `'unknown'` sentineli kendisi olarak korunur. reviewNote (20 922) dokunulmadı. Tree-hash kanıtı: merge commit ağacı ca1efe42'ninkiyle bayt-özdeş — CI yeşili doğrudan merge'e transfer.

**#AGENTS-MD-ALIGN (#294) — CLOSED@merge (master 15db33a4), ŞERİT DEVRİYLE.** AG-1 inşa etti; AG-1 sınıflandırıcısı git'i genişçe blokladı (4 ret, sonuncusu salt-okunur status) → kart AG-2'ye devredildi, AG-2 içeriği kendisi yeniden doğrulayıp indirdi. Üç satır (45/176/201) artık "There is no docVersion to bump — identity DERIVED from git". Blast radius tam 2 dosya +222/−3. NOT: 15db33a4 docs-only push → CI tasarımca yok (paths-ignore) → canary HARCANMADI; PR CI'ı + yerel tam gate seti kapsıyor.

**#GO-SETTINGS-HYGIENE-1 — CLOSED@evidence.** 81 literal kaldırıldı / 749 kaldı; 7 tutma gerekçeli (bileşik komut + env-var öneki prefix'e görünmez); proje-hook kopyası silindi; düzenleme sonrası 13/13 aynı script sha ile; yedekler sha256'lı. Öncesinde AYNI turda kapanan güvenlik açığı: `.claude/` 17 worktree'nin hiçbirinde yoktu → lane ağacından force-push KORUMASIZDI; koruma hook'u user-scope'a taşındı, genişlemeyle aynı kapsamda.

## B · AÇIK — SIRADAKİ İŞ

**#29 A23 — SON SOTA ANAHTARI.** W1 düştü (`A23_…-v1_4`, md5 3a2eb694). Masa temiz, kart kesilebilir. SOTA-1: ertelenemez.

**#G3-MCP-BIRTH-PROOF — ARMES'e kilitli.** Makine yarısı hazır. Belirsizlik açık (`F-S107-MCP-NO-SESSION-AMBIGUOUS`): 5×http `no-session` iki okumalı — (a) bu backend'ler session üretmiyor, borç yoktu; (b) sessionId teardown'da görünmüyor, DELETE hâlâ gitmiyor. Ayırt edici: ARMES'in kendi `[McpClose]` satırı (401 sürerken üretilemez). **Sahip yarısı:** Hülya'ya üç soru — pool reset? · reset sonrası tırmanış? · 401 nedeni (credential mi pool mu)?

**#81 vector-index cron okuması** — `[VectorIndex]` + `[Vector] corpusSize`. S107'de okunmadı.

**#RULE26-DEBIAN-DETOX-1 — GEREKLİ.** Headroom çürüdü (apt 232/300s, job 438/600s → 1.29×/1.37×). Çare: 9 font paketinin ön-tohumlanması ya da Playwright container. `F-BW01` bu inene dek açık. Yan bulgu (AG-1): apt probe 9 paketi "eksik" deyip apt'a girdi, hepsi "already newest" çıktı — probe düşüşü RULE26-BOUNDED-1 kaydıyla tutarlı.

**#RELAY-RETURN-PATH-1 — kapsam BÜYÜDÜ.** (a) dönüş yolu: `relay_inbox_reply_authority` CHECK'i şerit yazımını şema düzeyinde yasaklıyor; rw sözleşme gerek. (b) otonom yoklama: şeritler "posta"sız hareket etmiyor (`F-S107-LANE-WAKE-MANUAL`). İki ucu insan eline bağlı bus, bus değildir.

**#AGENTS-MD grep tuzağı (bilgi, iş değil):** 45/176/201 hâlâ "docVersion" ve "bump" kelimelerini NEGASYON içinde taşır — naif `bump.*docVersion` grep'i "düzeltilmemiş" der. Gelecek denetimler tam cümleyi okur.

## C · DEĞİŞMEDİ / DEVREDEN
**#VECTOR-ONBOARD-DRIP-1** — sahip hükmü birebir: "vector lane needs VECTOR-QOS — queries always outrank indexing, plus traffic throttling for onboarding/indexing load — as its own separate phase, mandatory before the engine switch."
**#82b Design-RAG** — PARK; sahip sözü: "şimdilik park et ama ASLA UNUTMA."
**#82a DESIGN-HOME-1** — yürüyor, md5-pinli. · **#Qdrant dashboard** — sahip isteyince, admin panel içinden. · **#consumed_at** (AG-2'de 10 satır; kanıt değeri YOK — şerit damgalayamaz) — operator işi. · **Poison row** — okuma-tarafı md5 guard. · **ARMES araç sözleşmesi** (outputSchema/isError:false; 134/141 all-required; bağlam taşınmıyor) — Hülya'da. · **Parite** — consumer sonrası TEKRARLI ölçüm (dağılımdır: 26.7/20.0/26.7).
<!-- END v110 -->
