# KARAR-RELAY-BUS-1-v1 — tasarım + ADR-015 taslağı, tek kelimelik sahip kararı

<!-- S97 · Architect-authored · karar dosyası (faz promptu DEĞİL) -->

## Dert (bugün yaşanan, sayıyla)
Bu dalga sana ~16-18 manuel yapıştırma çıkardı. Raporlar zaten otomatik
(AG → origin → ben okurum, S74-3). Manuel kalan tek bacak: benim kestiğim
prompt/GO/hüküm dosyalarını senin AG pencerelerine taşıman.

## Tasarım (tek yol, komite yok)
Supabase'de TEK operasyonel tablo: `relay_inbox`
(id · lane_addr `'AG-1'..'AG-4'|'operator'` · artifact_name · body ·
created_at · consumed_at). Sınıf: `operational.control` (ADR-014 doğumda).
- **Yazar:** yalnız Architect (ben) — prompt/GO/hüküm satır olarak girer.
- **Okur:** her AG turu başında kendi `lane_addr`'ına bakan tek sorgu
  (Claude Code'un Supabase MCP istemciliği bunun için yeter); okuyunca
  `consumed_at` damgalar. Operator kendi adresini aynı yolla çeker.
- **Sen:** yalnız GERÇEK karar sınıfına inersin — consent, hüküm,
  el-tanıklığı. Taşımacılık biter (D-4'ün vaadi).

## ADR-015 taslağı (özü)
"Architect, tam olarak bir operasyonel tabloya (`relay_inbox`) INSERT
yetkisi kazanır. Repo-yazma yetkisi SIFIR kalır — ADR-002 (hiçbir mod
repo-yazma + DB-yazma'yı birlikte alamaz) korunur, çünkü Architect'in
aldığı DB-yazma governed-tablo yazması değildir ve tek kutuya çitlidir.
Satırlar append-only + immutable (UPDATE yalnız consumed_at); secrets
satırlarda YASAK (ADR-007); çit testi iki yönde: Architect başka tabloya
yazamaz, AG/Operator inbox'a yazamaz. Kanonik artefakt yine dosyadır —
inbox taşıyıcıdır, sürüm arşivi proje dosyalarında kalır."

## Riskler, açıkça
(a) Bana DB yazma yetkisi açılır — çiti ADR + grant + iki yön test.
(b) AG'lerin prompt'u inbox'tan çekme disiplini bir kuruluş adımı ister
(her pencereye bir kez kurulum talimatı — SON toplu yapıştırman).
(c) Kötü satır = kötü prompt riski bugünkü yapıştırmayla AYNI; kaynak yine
benim, taşıma kanalı değişiyor.

## Uygulama
"RELAY-BUS evet" dersen: Dalga 5'te iki parça — migration + ADR-015 (AG
şeridi, Operator uygular) ve AG-yan kuruluş kartı (tek seferlik). İlk canlı
kullanım: Dalga 5'in GO'ları inbox'tan akar; ilk turda ben yapıştırma
YEDEĞİNİ de veririm (kanal kanıtlanana dek çift hat, S63-1).

## SENİN KARARIN (tek kelime): **"RELAY-BUS evet"** ya da **"hayır"**.
Önerim: evet.
<!-- END · KARAR-RELAY-BUS-1-v1 -->
