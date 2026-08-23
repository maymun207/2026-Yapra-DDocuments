# CWF — BOOTSTRAP & YENİ OTURUM PROMPTU · v111 (S111 açılışı)
<!-- 2026-08-20. v110'u GEÇERSİZ KILAR. ÇAPA S110 kapanışında CANLI ÖLÇÜLDÜ.
     v111'in v110'dan TEK YAPISAL FARKI: §2 AÇILIŞ SIRASI TERS ÇEVRİLDİ.
     Architect artık ÖZETLERLE değil, ÜRETİLEN GERÇEKLE açar. Gerekçe: S110'da
     Architect üç kez ölçülebilir bir gerçeği yanlış beyan etti ve üçünün de
     kaynağı oturumdan oturuma yeniden yazılan özet zinciriydi. BÜTÜN yazıldı. -->

## §1 · ÇAPA TABLOSU (S111 açılışında TAZE KLONDA DOĞRULANACAK)

| Ölçüm | S110 kapanış değeri |
|---|---|
| `git rev-parse origin/master` | `ae85c3b4a9437c056ccb03a820c8cb28f958bb7b` |
| Açık PR | **0** |
| Kalan uzak ref | **YALNIZ `master`** — sıfır faz dalı, sıfır `lane/AG-*` claim'i |
| Yasa evi | BUNDLE · `docs/laws/{README,index,log}.md + rules/(54) + constitution/(15)` |
| `index.md` md5 | `8c0f8f7cae6a49f189503ca5f9163ff5` |
| `log.md` md5 | `50eb337aa0b265afa0494ee04855a5d0` |
| `README.md` md5 | `8bc7bfcb446618dc78544d04aadd0482` |
| Son kural | **RULE-53** (sayı defterin `id:` alanlarından HESAPLANIR) |
| Master koruması | ruleset `master-merge-gate` · required `build (24.x)` · strict · bypass [] |
| `vector_index_digest` | **342/342** — korpus TAM |
| vector-index cron | `*/30 * * * *` — kararlı durum ~7.6s, %0.4 doluluk (ölçümle hak edildi) |
| `gateway_artifact_observations` | 47 satır · `observed_via=list_datasets` · son yazma **2026-08-18 11:56** (fırsatçı yazıcı, iki gündür sessiz) |
| S110 iniş zinciri | `ae85c3b4`(#314) ← `b90897fc`(#315) ← `313efd99`(#312) ← `f6de2dec`(#313) ← `1ea3ff07`(#308) ← `1cbd1580`(#309) ← `674d4ea8`(#311) ← `b33ac46d`(#310) |

⚠ Bu tablo bir **İDDİADIR** (TOTAL-45). Doğrulanmadan öncül yapılmaz.

---

## §2 · AÇILIŞ SIRASI — **TERS ÇEVRİLDİ, BAĞLAYICI**

> **YENİ YASA:** Architect oturumu **ÜRETİLEN GERÇEKLE** açar, özetlerle değil.
> Özetler (bootstrap · register · KB · session-close) **yalnız anlatıdır**; öncül olarak
> kullanılmaları YASAKTIR. Bu, "türev kaynağın yerine geçmez" yasasının Architect'in
> kendi protokolüne uygulanmasıdır — S110'a kadar uygulanmıyordu.

1. **TAZE KLON + ÜRETİLEN GERÇEK.** `git clone` → `npm run gen:arch-facts` → **`public/architecture/facts.json` OKU.** Bu dosya elle bakımlı DEĞİLDİR; her build'de koddan türetilir ve commit sha'sıyla damgalanır. Backend'ler, yönlendirme kategorileri, izin matrisi, faz listesi, `[ToolRoute]` alan sözlüğü buradan gelir. **Architect S110'a kadar bu dosyayı bir kez bile okumadı.**
2. **YASA EVİ.** `md5sum docs/laws/*.md` · `ls docs/laws/rules | wc -l` = 54 · `constitution` = 15. Kural numarası `id:` alanlarından SAYILIR, hatırlanmaz.
3. **CANLI DURUM.** `backends` · `backend_tools` · `entity_registry` · `tool_behavior_census` · `gateway_artifact_observations` · `vector_index_digest` sayımları (Supabase MCP, SALT-OKUMA). **Bir şeyin "yok" olduğunu iddia etmeden önce bu tablolar okunur.**
4. **SOTA-1 POZİTİF KONTROLÜ.** İlk mesajda kelimesi kelimesine, TAZE KLONDAN `docs/laws/constitution/SOTA-1.md` (S66-1).
5. **Sonra** `cwf-open-items-register-v113` · `CWF-SESSION-GRAPH-KB-v110` · `REGISTER-BUG-BUCKET-v46` · `cwf-implementation-order-S110-v23`. Bunlar **anlatıdır**; §1'le çelişirlerse taze klon + canlı DB kazanır ve fark bir bug olarak kaydedilir.
6. **ARCHITECT DB DURUŞU (A-REC-S109-9, sahip hükmü, MUTLAK).** Supabase MCP **SALT-OKUMADIR**. DDL/DML yalnız Operator'dan geçer; sahip onayı bu kapıyı DEĞİŞTİRMEZ. Tek yazma istisnası: `relay_inbox`'a kart INSERT'i. Şüphede: yazma = Operator.

---

## §3 · İLK İŞLER (sıra bağlayıcı — sahip hükmü S110)

**1 · `PHASE-ARCHITECT-GROUND-TRUTH-1`** — *"Aklını kaybeden bir mimarla köprü yapılmaz."*
Sahip hükmü: **bundan önce başka bir şey yapmak vakit ve para kaybıdır.** Kapsam register v113 §2⓵'de tam. Özet: `facts.json` genişletilip repoya sabitlenecek · defterler append-only + CI kapılı olacak · `RULE-54 PROVENANCE-BEFORE-PREMISE` mintlenecek · katalog/retrieval kurulacak · `MEMORY.md` sıkıştırması bu kartın kapsamındadır (toplu regex geçişi YASAK).

**2 · `#81 BACKEND-DISCOVERY-1`** — S110'un null'ıyla ölçülmüş zorunluluk. Dört eksik: proaktif süpürme · içerik derinliği · doğrulama (prover) · **tur anında okuyucu**. Kabul çıtası sahip test seti (Q2 · Q20 · Q21 + iki doküman sorusu), **orijinal cümlelerle**.

**3 · #29 A23 ⑤/⑥ MAKİNESİ** — spec `1cbd1580`'de dormant, makine yok. Üçlü teşhis `stageClarify.ts:329`'da ölüyor; patlama yarıçapı 95/678.

**4 · `F-S110-SUITE-TIMING-ASSERTION-LOADSENSITIVE`** — master defekti, kendi kartı.

---

## §4 · S110 HÜKÜMLERİ (kalıcı — tam liste KB v110'da; en kritik yedi)

1. **Türev kaynağın yerine geçmez — Architect'in KENDİ protokolü dahil.** Özet zinciri üç yanlış hükme yol açtı.
2. **`F-S110-CLAIM-DELETE-RACE`** — claim = ölçülmüş bayat sha'ya pinli `--force-with-lease`, **silme adımı YOK**. Delete-then-push atomik değil, hakemi yok eder.
3. **`F-S110-UNOBSERVABLE-PRECONDITION`** — bekleme sözleşmesi, bekleyenin kendi aletiyle okuyabileceği sinyallerle ifade edilir. Akran düzyazısı sinyal değildir. Böyle bir bekleyiş yaratan kart, **kartın kusurudur**.
4. **`L-ADAY-S110-REBASE-VOIDS-GATE`** — bir kapı sonucu bir **AĞACI** belgeler, bir dal adını değil. Rebase sertifikayı iptal eder. S110'da tek partide **dört kez** yüzeye çıktı.
5. **`L-ADAY-S110-ISOLATION`** — izolasyon tarafsız bir kontrol DEĞİLDİR. Ölçmek istediğin nedeni yok eden bir kontrolün sonucu delil değildir.
6. **Ölçülebilir bir koşulu beklemek, onu okumamak için bir mazeret değildir.** Kendi ön koşulunu ölçebilen şerit onu yoklar; izin istemez.
7. **Bir statü bir izin olamaz** (ADR-010). "Hangi statüler yönlendirir" sorusu, doğrulayıcıyı yönlendirme mercii yapar.

Ek: **bastırılmış `stderr`, borulanmış `$?` ile aynı sınıf kendine-dayatılmış sağırlıktır** (RULE-45'in gerekçesi genişletildi).

---

## §5 · OTURUM HİJYENİ

- Kuyruk boşalınca Architect KAPANIŞI ÖNERİR.
- Kart claim'i kart kapanana dek kalır; **claim ref'leri yalnız FİNAL KAPANIŞ KARTINDA** bırakılır.
- Kapanışın tek başarısızlık modu: **kaydı olmayan açık dal.** Her dal ya `LANDED` ya `RETIRED (yazılı gerekçeyle)`.
- Kısmi iş **dormant ise inebilir** (valf kapalı / bağlanmamış / yalnız-spec + bayt-aynılık gösterilmiş). Dormantlık **BEYAN değil ÖLÇÜM** olmalıdır ve süit bunu iddia etmelidir.
- Mühür çakışması: **yalnız `npm run reseal`**, asla hunk seçme.
- Architect bağlam uzadığında sahibi uyarır.

---

## §6 · KAPANIŞ SETİ — yedi belge, biri eksikse kapanış eksiktir

register · KB · bug-bucket · bootstrap · implementation-order · AG-boots · session-close.

<!-- END v111 -->
