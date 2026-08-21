# CWF ve EAIP mimarisi entegrasyonu sunumu

**Sohbet ID (UUID):** `6b8a5d89-d386-48d8-80cb-23f17443eeca`

**Oluşturulma Tarihi:** 2026-08-13T06:38:37.989515Z

**Güncellenme Tarihi:** 2026-08-13T06:53:21.989274Z

**Özet:** **Conversation Overview**

The person requested creation of an HTML presentation explaining CWF (Chat With Factory) core architecture as a value proposal and showing how it integrates with the EAIP (Enterprise Agentic Intelligence Platform) architecture. The presentation was to be clean, explanatory, and visually clear. Claude read several project files — including existing architecture chart decks, research files, and a frontend design skill guide — before building the deck.

Claude produced `cwf-eaip-value-proposal-v1.html`, a 10-section vertically scrollable presentation with dot navigation and keyboard arrow-key support. The deck follows a visual language of cobalt blue on porcelain white, with clean SVG diagrams. The narrative arc runs: cover → four enterprise failure points → core thesis (this is an architecture problem, not a model problem) → CWF system context diagram (ARMES MES + Apache Superset BI via MCP) → turn pipeline → grounding/correctness layer → governance and three-log system → learning layer → CWF-to-EAIP layering diagram → closing value mapping table.

In a follow-up exchange, the person referenced a diagram Claude had previously drawn (uploaded as an image in the current session) showing an EAIP deployment ladder with L0–L8 levels, and asked how to integrate it into the presentation. Claude clarified it could not claim to "remember" drawing it from a prior session, but worked from the uploaded image directly. Rather than embedding the image (which would have broken the deck's visual language), Claude redrew the ladder in native SVG and inserted it as a new slide (08b, "EAIP Dağıtım Merdiveni") between the existing slides 08 and 09. The original v1 file was left untouched per the project's immutability rule (S37-1), and the updated file was saved as `cwf-eaip-value-proposal-v1_2.html`. The redrawn diagram preserves the foundation/capability distinction with visual encoding (solid cobalt border = foundation, dashed = capability, green = live in production), positions the CWF runtime ("yaprak") as the heart of the ladder at L2–L4, and cross-references slides 04–07 of the same deck. Domain terminology used throughout includes: CWF, EAIP, MCP (Model Context Protocol), ARMES MES, Superset BI, tur hattı (turn pipeline), topraklama (grounding), eval-gate, FULL-TRACE, empty≠zero, INVARIANT/POLICY/SCOPE-CUT/CONFIG constraint layers, episodic memory, metric registry, snapshot portability, golden canary gate, and armes-link.

---

## 👤 Kullanıcı (2026-08-13T06:38:40.843185Z)

Senden istedigim, CWF temel mimarisini anlatan bir value proposalini anlatan ve EAIP mimarisi ile nasil entegre oldugunu gosteren bir sunum olustuman. Bunu sade ve aciklayici bir yapida yapalim, gorseller temiz ve anlasilabilir olsun, bunu HTML formatinda yapabilirsin.

## 🤖 Claude (2026-08-13T06:42:43.915971Z)


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

Sunum hazır: **`cwf-eaip-value-proposal-v1.html`** — 10 bölüm, dikey kaydırmalı, ok tuşlarıyla gezilebilir, mobilde de akıyor.

Yapı: kapak → dört kurumsal kırılma noktası → tez ("model problemi değil, mimari problemi") → CWF sistem bağlamı (ARMES + Superset diyagramı) → tur hattı → doğruluk katmanı (empty≠zero, kanıt zorunluluğu, kazanılan güven) → yönetişim ve üç kayıt sistemi → öğrenen katman (bellek, sözlük=veri, snapshot taşınabilirliği) → **EAIP katmanlama diyagramı** (CWF çekirdeği %100 yeniden kullanım tabanı, üstünde platform katmanı, üstünde kiracılar — "onboarding = veri, kod değil") → dört kırılmaya dört cevap tablosuyla kapanış.

Bilinçli iki karar: (1) görsel dil çini kobaltı + porselen zemin — Kale Seramik dünyasına ait, süs değil; diyagramlar tek ağırlıklı çizgiyle sade tutuldu. (2) Değişken sayılar (test/migration sayısı gibi) deck'e girmedi — value proposal'da bayatlayacak rakam taşımamak D-3 açısından daha güvenli; yalnızca "~140 araç" ve "canlı" gibi kararlı iddialar var.

**SENİN AKSİYON KALEMLERİN: yok.** Dosyayı aç, tarayıcıda oku. Değişiklik istersen söyle — v1_2 çıkarırım (S37-1: sunulan artefakt değişmez).

## 👤 Kullanıcı (2026-08-13T06:51:32.559051Z)

Sen ektei cizimi yapmistin, bunu hatirladin mi? Bunu senin bu dokumanina nasil entegre edebiliriz?

---
**Ekli Dosyalar & Ekler:**

- 📄 1786603857571_image.png

---

## 🤖 Claude (2026-08-13T06:53:21.989274Z)


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

Önce dürüst bir not: bu çizim `cwf_prod` / EAIP-1 soyundan geliyor ve ben o projenin dosyalarını buradan okuyamıyorum — "hatırlıyorum" diyemem. Ama artık gerek de yok: sen görseli buraya yükledin, o da proje kuralına uygun şekilde bu oturumun zeminine girdi. Ondan çalıştım.

**Entegrasyon kararım (tek yol):** PNG'yi gömmedim — düşük çözünürlüklü bir ekran görüntüsü, deck'in kobalt/porselen görsel dilini kırardı. Onun yerine çizimi deck'in kendi dilinde **yeniden çizdim** ve **08 ile 09 arasına yeni bir plaka (08b · "EAIP Dağıtım Merdiveni")** olarak yerleştirdim. Sonuç: `cwf-eaip-value-proposal-v1_2.html` (v1 dokunulmadan duruyor, S37-1).

Yeniden çizerken value-proposal irtifasına indirgedim — orijinaldeki L0–L8 merdiveni korundu ama ürün adı kalabalığı azaltıldı:

- **L0** kanallar (WhatsApp/Teams/e-posta/ses kesikli = capability; web/widget yeşil = canlı)
- **L1** kimlik kapısı (Kong · Keycloak · OPA)
- **L2–L4** koyu kobalt kalp: **yaprak / CWF omurgası** — üzerine "bu sunumun 04–07. bölümlerinde anlatılan çekirdek burada oturur" köprüsü kondu, iki slayt ailesi birbirine bağlandı
- **L5–L6** veri çekirdeği + LLM servis katmanı
- **L6–L8** capability modülleri — **armes-link yeşil "CANLI · üretimde"**, rag-graph/analytics/erp/doc-iot kesikli
- **L8** platform tabanı + filo denetimi ("değişikliğin tek yazma yolu sürüm kontrolüdür")

Orijinal çizimin asıl value-prop cümlesi olan **foundation / capability ayrımını** lejanta taşıdım: *foundation her kurulumda var, capability manifest ile gelir* — bu da 08. slayttaki "onboarding = veri, kod değil" tezinin görsel kanıtı oldu. Alt satır bunu açıkça söylüyor: "Yeni kiracı = bu merdivenin bir kopyası + manifest'te işaretlenen yetenekler."

**SENİN AKSİYON KALEMLERİN: yok.** v1_2'yi aç, 08b'yi kontrol et. Orijinaldeki bir detayın (ör. seam numaraları, fleet A/B heartbeat) geri girmesini istersen söyle — v1_3 çıkarırım.

