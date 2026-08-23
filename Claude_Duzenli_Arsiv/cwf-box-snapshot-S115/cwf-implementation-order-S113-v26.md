# cwf-implementation-order-S113-v26

**v25'i GEÇERSİZ KILAR.** S113 kapanışında yazıldı, zemin `922ef571a4d8e1c6c9dd751d6c20f6ec144b3eea`.

**BAĞLAYICI SAHİP HÜKMÜ (S113-H2):** ADF %100 bitmeden CWF'ye dönülmez. Bu bir erteleme değil, SOTA-1 (a)(b)(c) ile kayıtlı bir sıralamadır: kriter `#29 A23`, kanıtlanabilirlik tarihi ADF kapanışı, çözecek ölçüm iniş protokolünün öz-testi.

---

## §1 · KADEME 2 — S114'ÜN BİRİNCİ İŞİ

**Neden birinci:** S113'te on bir kart kesildi, ikisi merge kilidi yüzünden yeniden yazıldı. Merge yargısı hâlâ bir şeridin kafasında; script değil.

| adım | ne |
|---|---|
| 1 | kilit al — `refs/landing/lock`, boş lease |
| 2 | PR head'i **tam 40-hex** oku; BEHIND ise `update-branch` (asla `--admin`) |
| 3 | CI @head — yalnız `success`; `pending` yeşil değildir, `SKIPPED` adıyla basılır |
| 4 | `merge-tree` provası → **beklenen ağaç sha'sı hesaplanır** |
| 5 | `gh pr merge N --auto --merge -F hüküm.md` |
| 6 | master ağacı == beklenen ağaç (**bayt-aynı**) |
| 7 | kilidi bırak |

**Yetki önkoşulu:** yedi sınıflık kapı öz-testi, **yedi kırmızı** üretmeden script iniş yapamaz. Kırmızı sınıflar: kilit alınamadı · head kaydı · CI pending · CI red · ağaç uyuşmadı · yazar==koşan · lease bayat.

**Kapsam dışı:** `guard-bash`, `settings*.json` (harness reddi ölçülmüş, ayrı yol).

---

## §2 · SIRA — S114 ve sonrası

| # | iş | bağımlılık | kim |
|---|---|---|---|
| 1 | **`npm run land` + öz-test** | — | üretici şerit, AG-5 indirir |
| 2 | `/free` üç ölçüm: paylaşılan klon · `.gemini/` · ARMES canlı | `/free` indi ✓ | `/free` |
| 3 | `guard-bash` mutlağı (`ADF_LANE_ROLE`) | ölçüm 2 | şerit ya da **sahip eli** |
| 4 | `ADF-FOREMAN-SELF-LAND-1` kararı | — | **sahip**, üç seçenek |
| 5 | ADF mimari belgesi repoya (düz metin) | — | Architect + şerit |
| 6 | `ADF-FENCE-DECL-DRIFT-1` — beyan terraform çıktısından türetilir | 1 | şerit |
| 7 | Operator boot repoya | ölçüm 2 | şerit |
| 8 | **Kademe 3** — bağlam organı (H2) + arşiv otomasyonu | 1,2 | şerit |
| 9 | **Kademe 4** — deploy doğrulama (H9) + `lane_events` (H10) | 8 | şerit |
| 10 | **ADF çıkış testi** | 1–9 | ölçüm |
| 11 | **A23** — `#29`, iç sayacın son anahtarı | 10 | Architect + şeritler |
| 12 | `#75` vektör tüketicisi (`VECTOR-QOS` ÖNCE) | 11 | şerit |
| 13 | Kabul sözleşmesi (B) 0/16 → `mcp-honestbench` | 11 | — |

---

## §3 · ADF ÇIKIŞ TESTİ — değişmedi

Tek bir dalga şu beşi birden sağlarsa araç bitmiştir:

1. **Sıfır `posta`** — sahip hiçbir şeride tetik vermez
2. **N PR script ile iner** — sıfır elle merge
3. **Tüm kapılar hüküm üretti** — hiçbiri sessiz atlanmadı
4. **Oturum organdan açıldı** — bağlam organı okundu, kutudan değil
5. **Arşiv oto-güncellendi**
6. **Sahibin o dalgadaki eylemleri = rıza tokenleri + bir `bak`**

**S113 durumu:** 1 kısmen (AG-5 için kırıldı, üreticiler için değil) · 2 hayır · 3 evet · 4 hayır · 5 hayır · 6 hayır.

---

## §4 · A23 YÜRÜYÜŞÜ — sırası geldiğinde

**Ölçülmüş adres:** üçlü teşhis `stageClarify.ts:321-329`'daki ikili döngüde ölüyor. Patlama yarıçapı 95/678.

| # | kalem | durum |
|---|---|---|
| 1 | ⑤/⑥ makinesi + taşıyıcı | τ/β **deklare, kalibre DEĞİL** |
| 2 | `turn_context` | sıfırdan |
| 3 | ③ Mention Typer + BM25/RRF kanal-2 | sıfırdan |
| 4 | L5 miss-ledger | **sıfırdan — `CWF-TOOL-LOOP-REPEAT-1`'in çözümü** |
| 5 | soru bütçesi `b` + AUROC | **sıfırdan — aynı defektin diğer yarısı** |
| 6 | kelime haritası rol değişimi | zemin hazır ✓ |
| 7 | araç-erişilemez metni (`CWF-TOOL-UNREACHABLE-COPY-1`) | S113'te ölçüldü |

**S113'ün A23'e verdiği ölçülmüş öncül:** aynı soru 300k ve 600k tavanda koşuldu; `resolve_time_range` ikisinde de dört kez çağrıldı. Tek değişken tavandı, çağrı deseni değişmedi. **Kalem 4 ve 5 bu deseni kapatmalıdır** — bu bir tahmin değil, iki koşuluk bir kontrol deneyi.

---

## §5 · DEĞİŞMEYEN İNŞA DİSİPLİNİ

- Kart ≤ 4 KB · düz metin · tek konu · tek sahip · **kodlanmış yük yok**
- Preflight GREEN olmadan bus'a girmez
- Her INSERT `md5(body)` + `length(body)` döndürür, yerel dosyayla karşılaştırılır
- Bir ret **ölçümdür** — etrafından dolaşılmaz, metni kelimesi kelimesine basılır
- Kimse kendi işini merge etmez
- Bir SKIPPED kapı **adıyla** yazılır, yeşile katlanmaz
- İniş hükmü **neyi kanıtlamadığını** ayrı başlıkta söyler
- Sahibe operasyon adımı yazılmaz (S102-YASA-1)

<!-- END cwf-implementation-order-S113-v26 -->
