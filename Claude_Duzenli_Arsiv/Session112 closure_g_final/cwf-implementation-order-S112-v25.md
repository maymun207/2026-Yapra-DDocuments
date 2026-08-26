# CWF — UYGULAMA SIRASI · S112 kapanışı · v25
<!-- 2026-08-22. v24'ü DEVRALIR. Sıra bağımlılıkla gerekçelenir, tercihle değil.
     BÜTÜN yazıldı (A-REC-S101-7). -->

## §0 · ZEMİN — S112'de inen ve artık üstüne inşa edilebilecek olan

| Zemin | Ne getirdi |
|---|---|
| Kart grameri + `card:preflight` | Bir kart artık **denetlenebilir** — ve denetçi, onu emreden kartı üç kontrolde kırmızıya boyadı |
| Yasa kapısının varlık kontrolü | Anayasa ve kural korpusu, **eksik anahtarlı** kayıtları artık reddediyor |
| Defter, 49 kalem | Projenin yürüdüğü kalemler **kapının arkasında** |
| `.claude/` özerkliği | İzin listesi · **`exit 2` hook** · `claim.md` · auto-memory kapalı |
| `CLAUDE.md` + `loop.md` | Her oturum, her şerit, **hiçbir şey yapmadan önce** aynı disiplini okuyor |
| `architect:open` alan 8 | Açılış komutu artık etiketinin adlandırdığı şeyi sayıyor |

**Bu zemin S113'ün her kaleminin altında.** Özellikle: kart grameri indiği için S113'ün kartları **denetlenebilir**, ve `CLAUDE.md` indiği için S113'ün şeritleri **dürtülmeden çalışabilir.**

---

## §1 · SIRA — ve her adımın neden orada olduğu

### ① BÜTÇE ÇİTİNİN İLK OKUMASI · tek dispatch · AG-3
**Neden birinci:** en ucuz iş (~30 saniye CI) ve **en yüksek belirsizlik.** Üretim bir kez otomatik öldürüldü ve onu izleyen kapı **hiç bakmadı.** Harcamanın sınırda olup olmadığı **bilinmiyor**, ve bu belirsizlik S113'ün her harcama kararının altında duruyor.
**Ön koşul:** yok. IAM izni verildi (`RELAYED`).
**Çıktı:** ya ilk gerçek bütçe sayıları, ya iznin yürürlükte olmadığının ölçümü. **İkisi de sonuç.**

### ② `PHASE-CONTEXT-RETRIEVAL-1` · arşiv envanteri → kart → inşa
**Neden ikinci:** sahip hükmü *"skip sakın"* iki oturumdur taşınıyor, ve belgesi **hazır.**
**Ön koşul:** arşiv deposunun envanteri **bir şeritçe** ölçülür — Architect private repoya erişemez (ölçüldü). **Tahmin edilmiş bir şemaya çıkarıcı yazmak, belgenin karşı kurulduğu şeydir.**
**İkinci ön koşul:** `admission.ts` üçüncü sınıfı (`archive`) — encoder tek işçi ve sıralı; bir fabrika sorgusu beklerken Architect araması sıraya giremez.
**Kalp:** sekiz kapının **1 ve 2**'si — aile tamamlama ve **hüküm okuma anında hesaplanır.** Diğer altısı geçip bu ikisi geçmezse faz **başarısızdır.**

### ③ `F-S112-EVAL-CANARY-ZERO-RUNS` · ölçüm
**Neden üçüncü:** ucuz, ve `eval-gate atlanamaz` yasasının fiilen çalışıp çalışmadığını söyleyecek. On dört inişte sıfır koşu **bir durum**, ve durumun sebebi ölçülmedi.

### ④ `#29 A23 ⑤/⑥ MAKİNESİ` · iç sayacın son anahtarı
**Neden dördüncü:** en büyük iş, ve **öncülü artık ölçüm**: üçlü teşhis `stageClarify.ts:321-329`'daki ikili `resolved`/else döngüsünde ölüyor. Patlama yarıçapı 95/678.
**Ve bir hatırlatma:** bu anahtarı çevirmek **SOTA'yı kanıtlamaz.** İç sayaç 6/7, kabul sözleşmesi **0/16**.

### ⑤ `#81 BACKEND-DISCOVERY-1`
Dört eksik: proaktif süpürme · içerik derinliği · doğrulayıcı · tur anında okuyucu. Kabul çıtası **sahip test seti, orijinal cümlelerle.**

---

## §2 · PARALEL, BLOKLAMAYAN

`F-S112-BUDGET-FENCE-OUT-EMPTY` · `F-S112-DOCDRIFT-SHORT-SHA-FATAL` · `F-S112-MCP-TRANSPORT-PER-USER-DRIFT-1` · `F-S112-RULE42-PHRASE-MISMATCH` · `F-S112-CENSUS-STALE` · `F-S111-*` beşlisi · `readAncestry` mükerrerliği · `RULE-54` migrasyon borcu · üç öksüz denetim defteri · `gateway_artifact_observations`

**Bir istisna:** `MEMORY.md` sıkıştırma **münhasır oturum ister** — paralel koşmaz.

---

## §3 · SAHİP KARARI BEKLEYENLER — Architect ilerletemez

| Kalem | Neden sahip kararı |
|---|---|
| Sessiz fallback → gürültülü hata | Yanlış bir config satırı **üretimi durdurur** |
| Merge queue / org taşıma | Depo taşıma kararı. S112 ölçülmüş kanıt üretti: `strict` altında altı iniş **beş** güncelleme döngüsü |
| Qdrant admin yüzeyi | Sahibin kendi ertelemesi |
| `#82b` Design-RAG tetiği | PARKED, *"ASLA UNUTMA"* |
| G3 doğum kanıtı | ARMES toparlanması + Hülya'nın gözlemi — **gerçek dünya** |

---

## §4 · SIRAYA DAİR BİR KURAL, S112'de ölçüldü

`strict_required_status_checks_policy = true` altında **her iniş arkadakileri BEHIND yapar.** Altı iniş beş güncelleme-ve-yeniden-koşma döngüsü demektir, her biri ~7 dakika CI.

Bu bir defekt değil — `strict`, bir yeşilin **gerçekten inen ağacı** belgelemesini sağlayan şey. Ama **sıralama tasarımında maliyet olarak sayılır**, ve merge queue kaleminin ölçülmüş gerekçesidir.

Ve S112'nin öğrettiği ikinci sıra kuralı: **atanmış iniş şeridi, indirmekle görevli olduğu dalı da güncelleyebilir.** Bunu yasaklamak, büyük eylemi (master'a indirme) serbest bırakıp küçüğünü (master'ı dala alma) reddetmekti — ve bu oturuma **üç tıkanmaya** mal oldu.

<!-- END cwf-implementation-order-S112-v25 -->
