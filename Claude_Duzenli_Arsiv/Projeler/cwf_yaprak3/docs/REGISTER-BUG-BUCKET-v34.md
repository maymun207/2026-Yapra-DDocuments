# REGISTER-BUG-BUCKET-v34 — S97 kapanışı

<!-- v33'ü geçersiz kılar. Yalnız bug/bulgu sınıfı; kalemler register v101'de. -->

## Açık buglar (devir)
- **BUG-015** — deneyim defteri kayıt borcu: 8 alet donuk listede (S96
  devri). Census 97/97 yürüdü; defter genişlemesi TOOL-BEHAVIOR-CENSUS
  ailesinin sonraki fazında.
- **BUG-016** — relay gramer sınıfı. S97: 6 rapor + 1 tel raporu HEPSİ
  gramer-temiz (relayAudit sıfır ihlal, her biri Architect'çe bağımsız
  koşuldu). Kapanış şartı 10 ardışık muafiyet-siz relay — HÜKÜM S98'de
  auditor'ın KENDİ sayımıyla (elle sayım yasak, S65-2).
- **BUG-017** — force-fit paydası. Cetvel (#9 lens) canlı; frame kanıtının
  AYRI payload kind'ı (S97 #11 kararı) paydayı korudu. Organik popülasyon
  birikince ölçüm.

## S97 doğumlu bulgular
- **F-S97-REGISTRY-PARENT-OVERWRITE** — entity_registry tek-ebeveyn slotu
  son-yazan-kazanır; 96 isim >1 fabrika, 212/783 satır. Gerçek kenar
  tablosunda; çözüm #25 çağında (okumaların kenara göçü + registry
  kolonunun bilinen-dejenere ilanı).
- **F-S97-CLASS-CATALOG-UNINSTALLED** — sınıf kataloğu üretim DB'sinde yok;
  bench-reset TASARLANMIŞ retle bekliyor. #30-öncesi kurulum borcu (Operator
  + migration, Dalga 9-10 arası sıralanır).
- **F-S97-RELAY-AUDIT-PIPE-CELL** — auditor `\|` hücre kaçışını tanımıyor;
  READ hücresinde shell pipeline ifade edilemiyor. Auditor sahibinin çitinde
  küçük takip (Dalga 6 artıkları).
- **W-S97-SHARED-CLONE-USE** — karantinalı paylaşımlı klonda merge inşası
  (detached HEAD, zararsız ama yönerge ihlali). S98 hükmü: kaldır ya da
  netleştir; checkTenantZero artığı süpürmesi birlikte.

## Devir uyarılar
- **Langfuse fence penceresi ~20 Ağustos (GÜNLER kaldı, ~10 gün kör):**
  F-OBS-FLUSH-OK-LIE + OBS-HOST-HEALTH-1 — Dalga 5-6'da adlı OBS şeridi;
  pencere İÇİNDE gözlemevine dayalı hiçbir verdikt verilmez.
- **W-S96-SYNTH-CEILING** devirde.
- Ekipman R3 sondası gerçek backend'e HENÜZ değmedi — ilk gerçek sonda
  sonucu (adopt/refuse) S98 taramasında okunur; hangisi çıkarsa çıksın
  dürüst sonuçtur (refuse de başarıdır).

<!-- END · REGISTER-BUG-BUCKET-v34 -->
