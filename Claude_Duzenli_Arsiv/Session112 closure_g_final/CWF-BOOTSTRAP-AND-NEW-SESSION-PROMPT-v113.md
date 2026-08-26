# CWF — BOOTSTRAP VE YENİ OTURUM PROMPTU · v113
<!-- 2026-08-22. v112'yi GEÇERSİZ KILAR.
     v113 FARKI (tam ifşa):
     (a) ÇAPA TABLOSU KÜÇÜLDÜ, ve bu bir kayıp değil bir düzeltmedir. v112'nin
         tablosu sayı taşıyordu; S112 açılışında o sayıların İKİSİ yanlış çıktı
         ("SOTA kapısı 5/7" üç oturumdur, "valf KAPALI" dört gündür). Artık
         yalnız KAPANIŞ SHA'sı yazılı — bir sürüklenme dedektörü olarak, bir
         öncül olarak değil. Geri kalanı `architect:open` ölçer.
     (b) §2 açılış sırası DEĞİŞMEDİ ama alan 8'in artık doğru saydığı ölçüldü.
     (c) YENİ §5 · S113'ün ilk üç işi, adlarıyla.
     (d) `CLAUDE.md` artık repoda ve her oturumda otomatik yükleniyor — bu
         belge onu AYNALAMAZ, işaret eder.
     BÜTÜN yazıldı (A-REC-S101-7). -->

## §0 · TEK ÇAPA

```
S112 kapanışında master:
de238bf1287e8b16aa1f9bc055609f542eeff728
```

**Bu belgede başka SAYI yoktur ve bu kasıtlıdır.** Kural sayısı, kalem sayısı, kapı durumu, açık PR — hiçbiri buraya yazılmaz. S112 açılışı, bu belgenin selefinde duran iki sayının **yanlış** olduğunu ölçtü ve ikisi de kimsenin yeniden ölçmediği sayılardı.

Yukarıdaki sha bir öncül değil, bir **sürüklenme dedektörüdür**: taze klondaki master bundan farklıysa, aradan iş geçmiş demektir ve S113 onu ölçerek açılır.

## §1 · AÇILIŞIN İLK İŞİ — sırayla, kısaltmadan

1. **Taze klon.** `git stash` temiz checkout değildir (S61-1).
2. `npm ci`
3. **`npm run architect:open`** — dokuz alan, her biri provenance etiketli.
4. **Oturumu O ÇIKTIYLA aç, belge özetiyle değil.** Dokuz alanı bas, her birinin etiketini ve zamanını göster.
5. Çıktı ile bu kutudaki herhangi bir belge çelişirse **taze klon + canlı DB kazanır**, ve fark bir **bug** olarak kaydedilir.

⚠ **Alan 8 artık doğru sayıyor.** S112'de `orphans` etiketi altında madde-satırı sayısı basıyordu; item F düzeltti ve taze klonda `orphans 4 (measured)` ölçüldü. Ama bu bir **geçmiş ölçümdür** — yeniden koş, bu cümleye güvenme.

⚠ **Alan 7 (`census.latest.json`) S112 boyunca BAYAT kaldı** ve düzeltilmedi. Alan 7'yi bir öncül yapma; `STALE` görürsen o bir ölçümdür.

## §2 · SONRA, SIRAYLA

- **`docs/ground/open-items.md`** — açık kalemlerin **KANONİK** evi. Kutudaki register bir **AYNADIR** ve çelişkide repo kazanır.
  ⚠ Kanonik defter **KALEM KÜMESİNİN** evidir — id'ler, durumlar, kapanış kapıları. Kalem **GÖVDELERİNİN** evi değildir: sözleşme `MEASURED`-only, dolayısıyla kanıtı yalnız kutuda yaşayan bir kalem burada **adlandırılır ve izlenir**, tam olarak **ifade edilemez** (S112 hükmü).
- **SOTA-1 pozitif kontrolü** — taze klondan, `docs/laws/constitution/SOTA-1.md`, kelimesi kelimesine.
- **SOTA kapısı ÖLÇÜLÜR, hatırlanmaz.** Ve **iki skorbord** olduğu unutulmaz: iç 7-anahtar sayacı ile `cwf-sota-definition`'ın kabul sözleşmesi **aynı şey değildir**, ve **kabul kriteri ikincisidir**.
- **Şeritlerin S112 kapanış hijyeni** doğrulandı: dört claim bırakıldı, sıfır faz dalı. Telde yalnız `master` vardı.

## §3 · ARTIK REPODA OLANLAR — bu belge onları aynalamaz

| Nerede | Ne |
|---|---|
| `CLAUDE.md` | Boot'un **dayanıklı** yarısı. Her oturumda otomatik yüklenir, sıkıştırmadan sağ çıkar. **Sayı taşımaz.** |
| `.claude/loop.md` | Yoklama promptu. Yerleşik bakım promptunun **yerine geçer** — o, şeridi kendi PR'ına yönlendiriyor |
| `.claude/settings.json` | İzin listesi (komut önekleri **+** Write/Edit yolları) · `deny` · auto-memory kapalı |
| `.claude/hooks/guard-bash.py` | Mutlaklar, **`exit 2` ile**. `exit 1` bloklamaz ve komut yine koşar |
| `.claude/commands/claim.md` | Claim yürüyüşü, slash komutu olarak |
| `docs/laws/` | **KANONİK** yasa evi. Bu belge işaret eder, aynalamaz |

**Bir izin listesi negatif ifade edemez** — `--force-with-lease`, `--force` ile karakter karakter başlar. Hook, mutlakları taşıyabilen **tek** katmandır ve bir yedeklilik değildir.

## §4 · ŞERİT AÇILIŞI

`S112-AG-BOOTS-v3` (ya da daha yükseği) dört pencereye **aynen** yapıştırılır. Adresleri şeritler kazanır, sen dağıtmazsın.

Beşinci pencere (Gemini + Supabase MCP) için `S112-OPERATOR-BOOT-v1`. **BOOT'suz "posta" verilmez.**

**Sahip yasası, S112:** *bir şerit kutusu boşalana kadar çalışır.* "Boş", işlediği son karttan daha yeni `created_at`'ı olan satır bulunmaması demektir ve her rapor bunu zaman damgasıyla basar.

**Her şerit ilk iş olarak kendi yoklama görevini kurar** — ~90 saniye, sınırlı bütçe, ve **`read OK` ile satır sayısını ayrı ayrı** döndüren bir sonuç. Bozuk bir poller da sıfır satır döndürür.

## §5 · S113'ÜN İLK ÜÇ İŞİ — adlarıyla

**① Bütçe çitinin ilk gerçek okuması.**
`budget-fence` **hiçbir zaman ölçüm yapmadı**: dört zamanlanmış koşunun dördü başarısız, `Assert the fence` her seferinde **SKIPPED**. Sebep ölçüldü ve `#333` ile master'da: `cwf-langfuse-bootstrap` kimliği `budgets:ViewBudget` yapamıyor.
Sahip izni verdi — ama bu **`RELAYED`**, ölçülmedi. **Tek bir `workflow_dispatch`** cevabı getirecek. Üç değerli raporla: hâlâ 403 ise izin yürürlükte değildir *(bir ölçüm, bir arıza değil)* · `Assert`'e ulaşırsa **her assertion'ın sayısını kelimesi kelimesine** *(harcama, geçen gün, konteyner, disk, stop action'ın varlığı)* · biri kızarırsa **bu bir bulgudur**, bozuk bir build değil.
⚠ `gh workflow run` izin listesinin **bilerek dışında** — yönetilen bir bütçeye karşı CI harcıyor.
⚠ Ve bağlam: 2026-08-10'da bütçe eylemi üretime `AWS-StopEC2Instance` çalıştırdı, `ApprovalModel AUTOMATIC`, ve Langfuse'u, Qdrant'ı, encoder'ı birlikte düşürdü. Onu izleyecek kapı **bir kez bile bakmadı.**

**② `PHASE-CONTEXT-RETRIEVAL-1` — belgesi hazır, kartı kesilmedi.**
Sahip hükmü S110: *"skip sakın."* Sekiz kapı tanımlı, dördüncüsü ve beşincisi kalp: **aile tamamlama** ve **hüküm okuma anında hesaplanır**. Korpus bugün yalnız araç açıklamaları — tek yasa, ADR, mimari belge ya da oturum arşivi yok.
Ön koşul: arşiv deposunun envanteri **bir şerit tarafından** ölçülür (Architect private repoya erişemez, ölçüldü).

**③ `eval-canary` on dört inişte sıfır kez koştu.**
Her seferinde **adıyla** anıldı ve yeşile katlanmadı — doğru disiplin. Ama sonuç: `eval-gate atlanamaz` yasası olan bir evde, kanarya bir oturum boyunca **hiç skor yapmadı**. Bu, S113'ün açılışına ait, bir dipnota değil.

## §6 · TAŞINAN DİĞER KALEMLER — düşmez

`${out}` boş kalıntısı *(üç makul sebep, kanıt yok — mekanizma kasten kurulmadı)* · `checkDocDrift` kısa-sha `fatal`'ı *(beş kez basıp doğru hüküm veriyor; o yoldaki doğruluk **açıklanmamış**)* · `RULE-42`'nin claim prosedürünün emitmediği ret ifadesini adlandırması · `F-S112-MCP-TRANSPORT-PER-USER-DRIFT-1` *(`transport` bir protokol özelliği, kullanıcı başına saklanıyor)* · MCP transport çalışma-zamanı kanıtı *(DB doğrulandı, `[McpClose] transport:'http'` okunmadı)* · `PI-013` yük-duyarlı zamanlama *(AG-3'ün CI kırmızısı kanıt olarak eklendi)* · `#82b` Design-RAG **PARKED** · sessiz fallback → gürültülü hata **(sahip kararı)** · merge queue / org taşıma **(sahip kararı — `strict` altında altı iniş beş güncelleme döngüsü ürettiği ölçüldü)**

## §7 · S112'NİN ARCHITECT'E BIRAKTIĞI

`bug bucket v49` yirmi bir `A-REC` taşıyor. Dördü bir şeridin kestiği faturaydı ve dördü de haklıydı. **Bu oturumda Architect'e yapılan düzeltmeler, Architect'in şeritlere yaptıklarından fazlaydı.**

Tekrar eden üç sınıf, S113'te ikinci mercek konulacak yerler:

1. **Bir göstergeyi öncül yapmadan önce onu üreten ifadeyi oku.** (Yedi kayıt.)
2. **Tek negatif mercekten yokluk sonucu çıkarma.** Aynı gün üç ayrı aktörde göründü — ve üçü de **ikinci merceği arayan** tarafından yakalandı.
3. **Bir şeyi emreden kart, o şeyi TAŞIMALI** — sayı değil isim, tarif değil bayt.

<!-- END CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v113 -->
