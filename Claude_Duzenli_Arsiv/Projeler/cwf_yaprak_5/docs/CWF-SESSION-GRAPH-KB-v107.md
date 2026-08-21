# CWF — SESSION GRAPH KB · v107 (S107)
<!-- v106'yı GEÇERSİZ KILAR. BÜTÜN yazıldı. -->

## DÜĞÜM 1 · ARMES POOL → MCP SESSION SIZINTISI (KAPANDI, G3 hariç)
Şikâyet: "bağlantı açıp kapatmıyorlar, pool'umuz tükeniyor." İlk hipotez ("close unutulmuş") ÖLÇÜMLE yanlış: 7/7 teardown finally'de kapatıyor. Gerçek kök, kurulu SDK kaynağından: 1.29.0 `close()` = yalnız yerel `abort()`; sunucu session'ı `terminateSession()` (HTTP DELETE) ister — kod tabanında SIFIR çağrı. `catch{/*ignore*/}` her sonucu aynı sessizliğe gömüyordu: attempted ≠ confirmed (F-S106-VECTOR-OUTCOME-SILENT'ın ikinci organı). Çözüm master'da (26ce6379): `closeMcp()` terminate-önce-close (sıra taşıyıcı — close, DELETE'in AbortController'ını abort eder; close-first mutantı 3 test kırmızı), 5 durumlu outcome, `[McpClose]` FULL-TRACE. AG-1'in gerekçeli sapması: SDK 405'i içeride yutar, "unsupported" iddiası ancak DELETE status'unu gören pass-through fetch'le GERÇEK kılınır. Açık uç: `no-session` belirsizliği → ARMES satırı ayırt eder.

## DÜĞÜM 2 · docVersion → KİMLİK GİT'TEN (KAPANDI, iki merge)
Hastalık ölçülmüştü: üç skaler aynı anda canlı ve çelişik (manifest 284 / gen 1 / index 3) — hiçbir kapı alanı okumuyordu; okunmayan değer sonsuz sürüklenir. Ordinal ölçümle reddedildi (sığ klon ~1). `sha7 · date` inşa gereği benzersiz; merge commit sha'sı önceden bilinemez → önceden yazılamaz, şeritler arası çakışamaz. 'unknown' sentineli kendisi olarak korunur (`unknown · tarih` basılamaz). #292 (a18f7697) skaleri öldürdü; #294 (15db33a4) yasayı hizaladı — repo ilk kez iç tutarlı. Tree-hash tekniği kanonlaştı: merge ağacı ≡ CI'lı dal ağacı → yeşil doğrudan transfer.

## DÜĞÜM 3 · SINIFLANDIRICI ≠ İZİN (yeni yapısal yasa)
AG-1: `Bash(git *)` allow'da, merge yine ret; dördüncü ret salt-okunur `git status` — ret izin danışılmadan. Boot çözemez. Çözüm şekli: merge kartı durmayı planlar → izinli pencereye DEVİR (AG-1→AG-2, aynı gece kanıtlandı) → alan şerit içeriği KENDİSİ doğrular. Devir güvensizlik değildir ve kartta yazılır. Yan bulgu (gerçek güvenlik açığı, kapandı): `.claude/` worktree'lerde yoktu; allow yukarı birleşir, ask/hook birleşmez → lane'den force-push korumasızdı; hook user-scope'a taşındı.

## DÜĞÜM 4 · İKİ-NOKTA DİFF TUZAĞI (A-REC-S107-4 → yasa)
`git diff master..branch` bayat dalda master'ın sonraki merge'lerini SİLME gösterir (=#294'te "820 silme, fazın tamamı revert"). İmza BAYATLIĞIN kanıtıdır. Merge diff uygulamaz; ortak atadan üç-yollu birleştirir. Karar prosedürü: detached'ta deneme merge → SONUCU master'a diff (gerçek: 2 dosya +222/−3) → adıyla sağkalım → gate'ler MERGE EDİLMİŞ ağaçta. `merge-base --is-ancestor` rc=1 = tuzak canlı. İki yönlü tehlike: güvenli merge'i yıkıcı gösterir VE gerçek yıkıcıyı maskeleyebilir ("zaten alarmlı görünmesi bekleniyor" diye okumayı bırakırsın). AG-1 emri uygulamadan ölçtü ve durdu — hiyerarşi değil ölçüm yönetti; sistemin var oluş anı.

## DÜĞÜM 5 · YOKLUĞUN İKİ OKUMASI (oturumun kesiti)
Aynı ayrım beş kılıkta: boş from_lane (şema YASAK, "olmamış" değil — satır sayısı boşluğu söyler, kısıt nedenini) · SKIPPED gate adımı (verdict değil ulaşamama) · boş kutu yoklaması (zaman damgalı iddia; AG-2 çapraz-konektör + canlı-bus tabanıyla gerçek-boş kanıtladı) · canary `underpowered` ("ayırt edemiyorum" ≠ "sorun yok") · total_count=0 (S101-L1 kuralı docs-only tasarım atlamasında DARALIR — önce değişen yollar okunur). Ortak yasa: **yokluk, kimin cevaplayamadığıyla birlikte raporlanır.**

## DÜĞÜM 6 · İSKELE HİJYENİ
Aynı hata iki kez (rm -rf → reset --hard): yıkıcı iskele iş komutuyla aynı satırda → ret ölçümü de götürür. Çoğu zaman iskele gereksiz (detached varken reset yok; var olmayan dizine rm yok). Boot'a kalıcı satır.
<!-- END v107 -->
