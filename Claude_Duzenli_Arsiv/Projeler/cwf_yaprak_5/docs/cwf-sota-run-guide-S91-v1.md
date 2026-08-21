# CWF — SOTA ÖLÇÜM PROGRAMI · İŞLETİM KILAVUZU · S91 · v1

<!-- cwf-sota-run-guide-S91-v1 · 2026-08-09.

     ⚠ BU BELGE EŞİK TAŞIMAZ VE ÖLÇÜT TANIMLAMAZ.
     Bağlayıcı kabul ölçütü `cwf-sota-definition-v1_5` §3'tür; eşikler, son
     kullanma tarihleri ve hangi CWF yasasına bağlandıkları ORADADIR ve
     buradan okunmaz. Bu belge yalnız işletim gerçeğini taşır: her benchmark
     NEDİR, NASIL koşulur, hangi CWF yüzeyine değer, ve koşulabilmesi için
     neyin borcu ödenmelidir. Çelişki halinde SOTA tanımı kazanır.

     Kaynak: SOTA tanımı §3 + 2026-08-09'da canlı web okuması (harness
     mekanikleri, komut satırları ve yayınlanmış skorlar oradan alındı). -->

---

## §1 · ÖNCE ŞUNU BİLMEK GEREKİYOR: HEPSİNİN ORTAK BİR ENGELİ VAR

Bu benchmark'ların neredeyse tamamı **bir MODEL değerlendirmek için** yazıldı.
Arayüzleri `--agent-llm <model>` şeklinde. CWF ise bir model değil, **bir
harness** — dokuz aşamalı boru hattı, yönetişim, bellek, planlayıcı, yönlendirme.

Yani her benchmark için asıl iş "koşmak" değil, **CWF'i harness'ın ajan
arayüzüne takmak.**

**Ve iyi haber tam burada:** bu tek bir altyapı işi, benchmark başına değil.
τ²-bench LiteLLM kullanıyor; LongMemEval literatüründe kullanılan koşumlar da
LiteLLM üzerinden "herhangi bir OpenAI-uyumlu uç nokta" kabul ediyor.
**CWF'i bir kez OpenAI-uyumlu bir uç nokta olarak konuşturursan (`/v1/chat/completions`
şeklinde bir kabuk), Tier A ve Tier C'nin çoğu tek seferde açılır.**

Bu, program planlamasının en önemli tek gerçeği: **maliyet 14× değil, 1 + 14×(küçük).**

Adı: **`SOTA-AGENT-ADAPTER-1`** — henüz kuyrukta yok, bu belgeyle adıyla giriyor.

---

## §2 · ONDÖRT BENCHMARK

### TIER A — Politika altında konuşan ajan

#### τ²-bench (Sierra)
- **Nedir:** Simüle edilmiş bir KULLANICI ile ajan arasında çok turlu diyalog.
  Ajanın hem domain API araçları hem de **politika kılavuzları** var; ikisine
  birden uyması gerekiyor. "Dual-control": hem kullanıcı hem ajan ortamı
  değiştirebiliyor.
- **Alanlar:** airline · retail · telecom · mock, artı yeni `banking_knowledge`
  (ajan önce büyük bir doküman korpusunda bilgiyi BULMAK zorunda — retrieval
  konfigürasyonu `bm25` / `alltools` ile).
- **Nasıl koşulur:** `tau2 run --domain retail --agent-llm <X> --user-llm <Y> --num-trials 4`.
  Sonuçlar `data/simulations/` altına düşer, `tau2 submit prepare/validate` ile
  liderlik tablosuna hazırlanır. Kurulum `uv sync`.
- **CWF'in neresi ölçülür:** boru hattının TAMAMI — politika uyumu + araç
  kullanımı + berraklaştırma. Bu, CWF'in şeklinin başkasının alanındaki hâli.
- **Dikkat:** liderlik tablosu için tüm koşularda `--agent-llm` ve `--user-llm`
  aynı olmak zorunda. Kullanıcı simülatörünün hangi model olduğu rapora giriyor.
- **⚠ `banking_knowledge` bizim için ayrıca kritik:** BM25-vs-diğer retrieval
  karşılaştırmasını benchmark'ın kendisi yapıyor. **Bu, PathB (#23) ve
  LLM-SCAN-BASELINE-1 (#26) sorusunun dış versiyonudur.**

#### Gaia2 (Meta)
- **Nedir:** Dinamik, asenkron ortamlar; **belirsizlik**, gürültü ve zamansal
  kısıtları açıkça test ediyor.
- **CWF'in neresi:** berraklaştırma kapısı — epistemik/aleatorik ayrımının dış
  ölçüm aleti. M-A kapı oranımızın dış karşılığı.
- **Durum:** harness mekaniğini canlı doğrulamadım. Pilot dışı; sırası gelince
  ayrıca okunacak.

---

### TIER B — MCP-yerlisi (yeniden kullanılabilirlik iddiasını gerçekten test eder)

#### MCP-Bench (Accenture)
- **Nedir:** **28 gerçek MCP sunucusu, 250 araç.** Üç eksende puanlıyor:
  kural-tabanlı **şema anlama**, LLM-hakemli **görev tamamlama**, ve
  **araç kullanımı + planlama etkinliği**. Tek-sunucu ve çok-sunucu ayarlarının
  ortalaması. Hakem model olarak `o4-mini` kullanılıyor.
- **CWF'in neresi:** "backend identity is DATA" + tenant-zero.
- **⚠ ASIL SONUÇ SKOR DEĞİL:** **zero-code mount.** Bir MCP sunucusunu bağlamak
  için kod değiştirmen gerekiyorsa, ADR-009 ve backend-identity-is-data
  **oracıkta yanlışlanır.** Mount'un geçmesi skordan daha güçlü bir sonuç.

#### MCP-Universe (Salesforce)
- **Nedir:** **6 alan, 11 gerçek MCP sunucusu** — Location Navigation,
  Repository Management, Financial Analysis, 3D Design, Browser Automation,
  Web Searching. Değerlendirme **yürütme-tabanlı**: format doğrulayıcı, zaman-
  değişmez içerik için statik doğrulayıcı, ve zamana duyarlı görevler için
  gerçek-zamanlı doğruyu çeken **dinamik** doğrulayıcı.
- **Nasıl koşulur:** YAML ile — `kind: llm` / `kind: agent` (ör. `type: react`,
  `max_iterations`) / `kind: benchmark` (görev listesi + evaluator ifadeleri).
- **Yayınlanmış skorlar (zorluk fikri versin diye):** GPT-5 **%43,72** ·
  Grok-4 **%33,33** · Claude-4.0-Sonnet **%29,44** başarı oranı. **Bu benchmark
  zor** — düşük skor bir başarısızlık göstergesi değil, alanın hâli.
- **CWF'in neresi:** aynı testin bağımsız ikinci nüshası. Yine **mount** kritik.

---

### TIER C — Adlandırılmış CWF boşlukları

#### LongMemEval
- **Nedir:** **500 elle hazırlanmış soru**, beş bellek yeteneği:
  bilgi çıkarma (IE) · çok-oturumlu akıl yürütme (MR) · zamansal akıl yürütme
  (TR) · bilgi güncelleme (KU) · **çekimserlik (ABS)**.
  Kanıt oturumları gerçek sohbet loglarının (ShareGPT, UltraChat) arasına
  serpiştiriliyor; `LongMemEval_S` ~50 oturum / ~115k jeton, `_M` ~1,5M jetona
  kadar. Resmî kategori-bazlı hakem promptları var (zamansal bir-fark toleransı,
  bilgi-güncelleme toleransı, cevaplanamaz-soru tespiti dahil).
- **CWF'in neresi:** MEMORY-1 ailesinin tamamı. **Ve ABS doğrudan `empty≠zero`nun
  bellek hâlidir** — "hiç söylenmemiş bir şeyi uydurmamak".
- **Neden bu kadar bilgilendirici:** yayınlanmış sonuçlar, çevrimdışı (tüm geçmiş
  okunuyor) ile çevrimiçi (gerçek bellek) arasında **büyük düşüşler** gösteriyor
  — ChatGPT/GPT-4o için %91,8 → %57,7 gibi. Yani bu benchmark **bellek
  mimarisini** ölçüyor, model kalitesini değil. Tam olarak 2F'de inşa ettiğin şeyi.

#### API-Bank
- **Nedir:** Değerlendirme kümesi **8 alan, 73 API, 314 diyalog, 914 tur.**
  Üç yetenek kademesi: **Call** · **Retrieve+Call** · **Plan+Retrieve+Call**.
  Metrikler `Recall@k` ve F1.
- **CWF'in neresi:** yönlendirme katmanı — araç bulma, aday kümesi, planlama.
- **⚠ Son kullanma tarihi EN YAKIN: 2026-11-03.**

#### ToolComp
- **Nedir:** Çok adımlı araç akıl yürütmesi, **süreç-denetimli etiketlerle** —
  yani yalnız sonucu değil, ARA ADIMLARI puanlıyor.
- **CWF'in neresi:** aşama-span ağacı. İncelenebilir ara adımlar için ödediğimiz
  bedelin karşılığını ölçen tek alet.

#### Mem2ActBench
- **Nedir:** Uzun vadeli belleğin **proaktif olarak eyleme** dönüşmesi —
  hatırladığını araç çağrısına çevirme.
- **CWF'in neresi:** MEMORY-1'in getirme→eylem yolu; PROCEDURE-RECALL ailesi.
- **Durum:** harness mekaniğini canlı doğrulamadım.

---

### TIER D — Güvenlik (CWF'in liderlik iddia ettiği eksenin en yakın komşusu)

| Benchmark | Nedir |
|---|---|
| **MCP-SafetyBench** | MCP'ye özgü **20 saldırı tipi** — sunucu, host ve kullanıcı katmanlarında. CWF'in ADR-010 / ADR-011 / secrets-by-reference duruşunun dış sınavı. **Eşik: üst ondalık** — çünkü burada liderlik iddiası var |
| **MT-AgentRisk** | **Çok turlu** araç-ajanı güvenliği. Tek turluya kıyasla saldırı başarısı ~%16 artıyor — yani çok turlu duruş ayrı bir şey |
| **Agent-SafetyBench** | 8 risk kategorisi, 10 arıza modu, **2.000 vaka**. Geniş güvenlik tabanı. Son kullanma **2026-12-03** (ikinci en yakın) |

**Artı üç OPA bacağı** (S82 sahip hükmüyle v1 kapsamında):
- **D-OPA-1** — OPA takasından SONRA yukarıdaki üçü; takas skorları düşüremez.
- **D-OPA-2** — her OPA kararı bugünkü `gatewayPolicy`+F80 kararıyla **%100 aynı**.
  Sapma bir REGRESYONDUR, iyileştirme değil.
- **D-OPA-3** — politika okuması **başarısız olduğunda karar DENY** ve bu
  gözlemlenebilir. Aleti `FAULT-SWITCH-0`. **%100 deny.**
  *Gerekçesi tek cümle: başarısız kılınamayan bir fail-closed iddiası bir varsayımdır.*

---

### TIER E — CWF'in kendi katkısı

**`mcp-honestbench`** — kasten **YALANCI** bir MCP backend'ine karşı ajan
davranışı. Bu, ADR-001'in ("yalancı backend'i ZARARSIZ kıl") dışarıya
yayınlanmış sınavı ve CWF'in kendi katkısı.
**DURUM: HENÜZ İNŞA EDİLMEDİ.** Önkoşulu `HONESTBENCH-HARNESS-0` (#17).

---

### TIER F — Korpus üzerinde getirme ve araştırma

| Benchmark | Nedir | CWF'in neresi |
|---|---|---|
| **BrowseComp-Plus** | Sabit, küratörlü bir doküman korpusu üzerinde derin araştırma; getirme yöntemlerinin kontrollü karşılaştırması ve **atıf doğruluğu** | RAG şeridi. Müşteri dokümanları birincil müşteri girdisidir — bu, o iddiayı sayıya çevirir |
| **DeepScholar-Bench** | Canlı web'den sentez, **atıflı** uzun rapor; bilgi sentezi, getirme kalitesi ve **doğrulanabilirlik** puanı | WEB-VALVE-1. Çıktısı doğrulanamayan bir web vanası vanasızlıktan kötüdür |

---

## §3 · KARŞILAŞTIRMA KÜMESİ — sayının anlam kazandığı yer

Skor tek başına hiçbir şey söylemez. Üç taban zorunlu:

1. **B-FRONTIER** — aynı araçlarla **çıplak frontier model**, CWF yok,
   **eşit maliyette** (R5). *"CWF mi iyi, model mi iyi"* sorusunun tek cevabı bu.
   **Her benchmark iki kez koşulur.**
2. **B-LEADERBOARD** — yayınlanmış girdiler (τ²-bench liderlik tablosu vb.).
   İzin gerekmez, herkese açık.
3. **B-HARNESS** — NVIDIA NOOA: tezi *"performansı model değil harness belirler"*
   olan en yakın rakip **iddia**. Bu yüzden "bizim harness daha iyi" cümlesi
   bir sayı olmadan söylenemez.

---

## §4 · BUGÜN KOŞULABİLİR Mİ? — engeli adıyla

| Benchmark | Bugün | Engel |
|---|---|---|
| **API-Bank** | ✅ adapter sonrası | `SOTA-AGENT-ADAPTER-1` |
| **LongMemEval** | ✅ adapter sonrası | `SOTA-AGENT-ADAPTER-1` |
| **τ²-bench** | ✅ adapter sonrası | `SOTA-AGENT-ADAPTER-1` |
| **Agent-SafetyBench** | ✅ adapter sonrası | `SOTA-AGENT-ADAPTER-1` |
| **ToolComp** | ✅ muhtemelen | adapter + süreç etiketlerinin span ağacına eşlenmesi |
| **Gaia2 · Mem2ActBench** | ❓ | harness mekaniği okunmadı |
| **MCP-Bench · MCP-Universe** | ⛔ | **zero-code mount** → #15 affordance + #16 mount provası |
| **MCP-SafetyBench · MT-AgentRisk** | ⛔ | OPA takası anlamlı olsun diye #28'in arkasında |
| **3 OPA bacağı** | ⛔ | #28 OPA-POLICY-1 + FAULT-SWITCH-0 |
| **mcp-honestbench** | ⛔ | **inşa edilmedi** → #17 harness, sonra #30 |
| **BrowseComp-Plus · DeepScholar** | ⛔ | RAG şeridi (dış) + WEB-VALVE-1 |

---

## §5 · MALİYET — tek sayımız bir TAHMİN, ve öyle etiketli

SOTA tanımı §10: *tam tur başına maliyet* satırı **ÖLÇÜLMEDİ**, yanında
parantez içinde **tahmin: $100, Flash sınıfı**. O tahmini ölçümle değiştirecek
alet **`BENCH-SMOKE-1`** (yürüyüşte #20).

Maliyeti sürükleyen üç şey: her benchmark **iki kez** koşuluyor (CWF +
B-FRONTIER, eşit maliyette) · `--num-trials` (τ² liderlik tablosu için 4) ·
ve bazı harness'ların **kendi hakem modeli** var (MCP-Bench `o4-mini`,
LongMemEval kategori hakemleri) — yani üçüncü bir model masrafı.

---

## §6 · PİLOT — tavsiye, tek yol

**Sıra: `SOTA-AGENT-ADAPTER-1` → API-Bank (CWF + B-FRONTIER) → ölç, sonra tahmin et.**

Neden API-Bank:
1. **Son kullanma en yakın** (2026-11-03) — beklemenin tarihli bedeli var.
2. **Senin ④ izleğini karara bağlar.** Recall@k doğrudan yönlendirme kalitesi.
   İyi çıkarsa PathB/Qdrant'ın (#23, #27) önceliği düşer; kötü çıkarsa öne fırlar.
   Bugün bunu tahminle sıralıyoruz.
3. **En küçük harness** — 8 alan, 73 API, tek turlu kurulum, canlı sunucu yok
   (MCP-Universe'ün aksine).
4. **Ve asıl kazanç:** adapter bir kez yazılınca kalan 13'ün maliyeti
   *ölçümden* türetilir. Pilot aynı anda bir SOTA sayısı **ve projenin takvim
   aletidir.**

İkinci koşu için doğal aday **LongMemEval** — 2F'de inşa edilen dört bellek
katmanının dış notu, ve ABS kolu `empty≠zero`nun bellek hâli.

<!-- END · cwf-sota-run-guide-S91-v1 -->
