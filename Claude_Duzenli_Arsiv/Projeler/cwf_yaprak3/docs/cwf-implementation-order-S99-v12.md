# CWF — UYGULAMA SIRASI · S99-v12

<!-- cwf-implementation-order-S99-v12 · 2026-08-14. S98-v11'i geçersiz kılar.
     SOTA-1 bağlayıcı: kapı anahtarı ilerleten kalem KÜÇÜLTÜLEMEZ/ERTELENEMEZ. -->

## §1 · KAPI DURUMU
**4/7** — dönen: #2 (S93) · #10 (S96) · #16 (S98) · **#18 (S99)**.
Kalan üç anahtar: **#23 PathB/BM25 · #25 Graph-KB · #29 A23**.

## §2 · DALGA TABLOSU (plan, ölçüm değil)
| Dalga | A (AG-1) | B (AG-2) | C (AG-3) | D (AG-4) | Kalan | Kapı |
|---|---|---|---|---|---|---|
| 7 | **#23 🔑** | **#57**→#34 | **#56**→#27 | **#58**→#28 | 11 | **5/7** |
| 8 | **#25 🔑** | #33 | #48 · #59 | #47 | 5 | **6/7** |
| 9 | **#29 🔑** | #49 | #17 | — | 3 | **7/7 → yaprak_gate** |
| 10 | #30 ilk ölçüm | #31 | #37 · #32 | — | 0 | **→ cinekop_gate** |

**Dalga-7 iç sırası:** #57 dalganın İLK teslimi olmalı — sentetik trafik
olmadan golden runner güçsüz, kanarya aç ve #52/#55'in honestbench iz borcu
yapısal olarak ödenemez. #34 AGENTBEATS artık gerçek zemin üzerinde: A2A
sunucusu (#18), bench-reset (canlı katalogla), mount (#16) üçü de var.
#28 OPA-POLICY-1, #58'in gramer işinden sonra D şeridinde.

## §3 · GERÇEKÇİLİK NOTU (S98-v11'den taşındı, geçerli)
#23 · #25 · #29 bugünkü işlerin birkaç katı; alt fazlara bölünürlerse
yaprak_gate 9 → 11-12 dalgaya kayar. #23'ün gerçek maliyeti görüldüğünde
yeniden hesaplanır. K3 bağlayıcı: ölçüm işlevi izler (Dalga 10 kapı arkası).

## §4 · DALGA-10 ÖNKOŞUL DEĞİŞİMİ
#30 EVAL-SPLIT-LAW'un kurulum borcu (F-S97-CLASS-CATALOG-UNINSTALLED)
**#54 ile ödendi** — katalog canlı, 54/54, drift 0/0. #30 sırası K3 gereği
Dalga 10'da KALIR; yalnız önündeki engel kalktı.

<!-- END · cwf-implementation-order-S99-v12 -->
