# cwf-architect-doctrine-v1_5 · S100

<!-- This file SUPERSEDES cwf-architect-doctrine-v1_4. It carries v1_4 whole and
     appends §G (D-13). v1_4 remains valid history; v1_5 is the binding doctrine. -->

**v1_5 = v1_4 verbatim + §G below.** Every clause of v1_4 (D-7 pre-send
checklist §A, D-10 lane-completion gate §B, D-11 stale-block §C, D-3 hardening
§D, D-1 hardening §E, D-12 card-text §F) stays in force unchanged. Only the new
law is written out here to keep the diff honest.

---

## §G · YENİ: D-13 · STANDART PROTOKOL, RESMÎ İMPLEMENTASYON (S100, sahip yasası)

**Sahip kuralı (S100):** *"Hiçbir standart protokolü kendimiz yazmayacağız —
onu test ve verify etmekle uğraşmak bizim işimiz değil."* Yasa buradan doğar
ama sınırı vardır, çünkü mutlak hâli bu mimariyi keser.

### D-13.1 · KAPSAM — protokol mü, mantık mı?
Bir yüzey **TAŞIMA / BİRLİKTE-ÇALIŞMA PROTOKOLÜ** ise (dış bir tarafla konuşma
dili: A2A, MCP, OTLP, JSON-RPC, OAuth/OIDC, gRPC, SSE-wire ve benzerleri) →
**resmî SDK / referans kütüphane kullanılır; el ile yeniden yazılmaz.**
Bir yüzey **İÇ DOĞRULAMA / GOVERNANCE MANTIĞI** ise (grounding, provenance,
gate admissibility, deterministik claim/control zinciri — ADR-001'in kalbi) →
**kod olarak BİZİMDİR ve öyle kalır.** Bir SDK burada aranmaz; onu kendimiz
yazmak hata değil, ürünün kendisidir.

**Ayırt edici test (tek soru):** *"Dış bir taraf bizi bu yüzeye uyuyor muyuz
diye ÖLÇEBİLİR mi?"* Evet → o bir standart protokoldür, D-13.2 uygulanır.
Hayır → o bizim iç mantığımızdır, dokunulmaz.

### D-13.2 · VARSAYILAN — resmî implementasyon
Bir standart protokol yüzeyi için faz promptu **önce resmî SDK'yı değerlendirir**
ve varsayılan olarak onu benimser. En azından **tipler, sabitler ve
sürüm-uyumluluk katmanı** SDK'dan gelir; wire formatını, agent card şemasını,
task lifecycle enum'unu ELLE yazmak bir borçtur, çünkü spec altımızdan kayınca
onu elle kovalarız ve bir dış harness bizi ince bir sapmadan haksız düşürür.

### D-13.3 · KAÇIŞ VALFİ — adlandırılmış istisna
Resmî SDK bu ortamda gerçekten çalışmıyorsa (ör. sunucu tarafı uzun-yaşayan bir
Express süreci ister ama üretim Vercel serverless'tır), el yapımı katman
**adlandırılmış bir istisna** olarak yazılır: hangi SATIRIN hangi ORTAMDA neden
çalışmadığı, bir kanıt çitiyle. *"Beğenmedim / bizimki daha temiz"* geçerli
gerekçe değildir. İstisna alınsa bile tipler ve uyumluluk katmanı SDK'dan
alınmaya çalışılır; yalnız çalışmayan parça elle köprülenir.

### D-13.4 · ÇEKİRDEK-DURUŞUYLA UZLAŞMA
"Çekirdek satıcı SDK'sı ithal etmez" duruşu (ADR hattı) D-13.2'yi geçersiz
KILMAZ; sınırlar. SDK **adaptör kenarında** yaşar (bir seam arkasında,
motoru swap-edilebilir), çekirdek onu doğrudan import etmez. Yani hem resmî
implementasyon kullanılır hem çekirdek temiz kalır — ikisi çelişmez.

### TANIK (S100)
`a2a/` — yedi dosyalık el yapımı `node:http` A2A sunucusu, sıfır bağımlılık,
`AgentCard`/`protocolVersion`/task-lifecycle elle yazılmış. Resmî
`@a2a-js/sdk` (Linux Foundation, Google katkılı, v1.0 kararlı, JSON-RPC +
HTTP/REST + gRPC, v0.3 uyumluluk katmanı) o an değerlendirilmeden atlandı — bir
seçim değil, sorgulanmamış varsayılan. Bu yasa o boşluğu kapatır: #34 keşfi
artık SDK-benimseme değerlendirmesini adıyla taşır (D-13.2), Vercel sunucu-tarafı
gerçekliğini kaçış valfi testine sokar (D-13.3), tipleri almanın çekirdek
duruşunu bozup bozmadığını D-13.4'e göre yanıtlar.

<!-- END · cwf-architect-doctrine-v1_5 -->
