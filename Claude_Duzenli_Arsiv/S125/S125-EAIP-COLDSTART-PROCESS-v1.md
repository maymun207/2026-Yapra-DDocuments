# S125 · EAIP SIFIRDAN-KURULUM SÜRECİ (COLD-START) · v1 — TASLAK, ÜZERİNDEN GEÇİLECEK

DURUM: **TASLAK.** Sahibin sözüyle kesildi: *"burada bir process oluşturmamız lazım — özetleyen bir
doküman oluşturalım, sonrasında üzerinden geçeriz."* İki karar maddesi AÇIK bırakıldı (§6);
kapanışları sahibin, bu dokümanın üzerinden geçildiği oturumda.

SAHİBİN ÖNCELİK HÜKMÜ, S125, kelimesi kelimesine kayda: *"Benim beklentim CWF'nin 100% eksik
kısımlarının tamamlanması ve tüm valflerinde açık hale geldiği noktaya bir an önce ulaşmak."*
Bu doküman o hedefin ÖNÜNE GEÇMEZ: cold-start programı EAIP ufkudur (sahibin daha önceki hükmüyle
"ikinci ürün geldiğinde" tetiklenir), bugünkü on altı kriterin hiçbirini ilerletmez ve bugün
hiçbir kart bu dokümandan kesilmez. Buradaki tek istisna Tier B'nin zero-code mount ölçümüdür —
o zaten kabul sözleşmesinin içindedir ve Faz 1'in en riskli iddiasını bedavaya kanıtlar.

## §0 · TEMEL GERÇEK — bu sistem "eğitilmez"

Model hiç eğitilmiyor; bugün de eğitilmedi. CWF'nin bütün alan bilgisi yönetişimli tablolarda
VERİdir (arkabahçe kimliği VERİdir — mimari yasa). "Öğrenilmiş backup" = domain_rules + varlık
kayıt defteri + metrik kayıt defteri + alias'lar + araç deneyimi + damıtılmış hafıza. Yeni
kiracıda boş olan şey bir modelin ağırlıkları değil, doldurulabilir tablolardır.

## §1 · DÖRT FAZ

**FAZ 0 · BEDAVA GELEN (kod).** Dokuz aşamalı pipeline, bütün kapılar (B0-B9), dürüstlük yasaları
(empty≠zero, ALT-D, grounding), telemetri, eval-gate, FULL-TRACE, fabrika. Kapılar domain bilmez.
Sistem açıldığı ilk dakikada yalan söylememeyi bilir; bilmediği şey müşterinin dünyasıdır.

**FAZ 1 · KEŞİF (sistem kendi yapar).** MCP'ler bağlanır → resolve-mcp bulur, beyanı değil
gözleneni kaydeder (ADR-009/010). Araç kategorileri türetilir; yazma araçları VARSAYILAN KAPALI.
RAG korpusu bge-m3 ile indekslenir — deterministik embedder, eğitim yok. ZERO-CODE MOUNT iddiası
burada test edilir; kod değişikliği gerektiyse ADR-009 yanlışlanmıştır (Tier B bunu ölçer).

**FAZ 2 · TANITIM (veri girişi — "eğitim" değil, nüfus cüzdanı).** Dört defter doldurulur:

| Defter | Örnek (hastane senaryosu) | Kim doldurur |
|---|---|---|
| Varlık kayıt defteri | servisler, katlar, yatak tipleri | kısmen ÖZ-TOHUMLAMA (ABSENCE-ONLY) + uzman onayı |
| Metrik kayıt defteri | doluluk oranı, ortalama yatış süresi — FORMÜLÜN otoriter evi | uzman |
| Kelime→kategori sözlüğü | "yatak", "taburcu", "doluluk" | uzman + gözlenen sorgulardan aday üretimi |
| Katman eşlemesi | servis/yatak/hasta | uzman — cb49f416 dersi: yanlış eşleme = kapı yanlış öncülle keser |

Determinizm ayrımı burada da bağlayıcı: metrik HESABI deterministik/otoriterdir (defterdeki
formül; model asla hesaplamaz), optimizasyon ÖNERİSİ yumuşak/tavsiyedir (model + RAG + atıf).

**FAZ 3 · GÖLGE KOŞUSU.** Valfler kapalı, kapılar gözlemde. Pilot + sentetik trafik; wouldHaveAsked
gölgeleri birikir; kesinti oranı ölçülür. Veri-eksik sınıfı kesintiler otomatik aday üretir
(S125-GATE-TUNING-DOCTRINE-v1'in döngüsü aynen). ALTIN KÜME burada doğar — pilotun gerçek
sorularından, uzman onaylı, eval-split baştan.

**FAZ 4 · KADEMELİ AÇILIŞ.** Valfler tek tek, gölge sayaçlar okunarak, kiracı onayıyla. Fren:
altın küme regresyonu. Bugün askOnUnresolved için izlediğimiz protokol, kiracı-açılışının provası.

## §2 · EAIP'NİN BORÇLU OLDUĞU ÜÇ BOŞLUK (bugün kodda YOK — ölçüldü, S125)

1. **KAPSAM ETİKETİ.** Öğrenilmiş satırların hangisi PLATFORM bilgisi (her kiracıda geçerli ders),
   hangisi DOMAIN bilgisi (yalnız bu müşteri)? Etiket yok; etiketsiz "temiz kurulum + platform
   derslerinin taşınması" yapılamaz. Backup/restore'un bıçağı bu etikettir. FLOOR-TENANT-SPLIT
   zemin, üstü açık.
2. **TANITIM SİHİRBAZI.** Faz 2 bugün elle iş. PLATINUM gereği: sistem keşfettiği backend'den
   defter TASLAKLARI üretir, uzman yalnız onaylar.
3. **ALTIN KÜME BOOTSTRAP ARACI.** Pilot trafiğinden aday soru-cevap çıkarıp uzmana onaylatan akış.

## §3 · SÜRECİN ÇIKTISI NE OLMALI (üzerinden geçerken tartışılacak iskelet)

Kurulumun kendisi de bu evin disipliniyle koşmalı: her faz bir ÇIKIŞ TESTİ taşır (ADF çıkış
testinin kiracı-tarafı kardeşi), her defter girişi kim-onayladı damgası taşır, ve Faz 4'ün her
valf açılışı gölge-sayaç-okundu kanıtına bağlanır. Taslak çıkış testleri:

- FAZ 1 bitti = zero-code mount kanıtı + keşfedilen araç envanteri raporu
- FAZ 2 bitti = dört defterin uzman-onaylı ilk sürümü + boş katman KALMADI beyanı (cb49f416 sınıfı
  kurulumda ölür)
- FAZ 3 bitti = altın küme v1 + kesinti oranı ölçümü + veri-eksik kuyruğu sıfır
- FAZ 4 bitti = kiracının valfleri açık, regresyon freni yeşil

## §4 · CWF-100% İLE İLİŞKİ — sahibin önceliği önce gelir

Bu sürecin ilk gerçek koşusu CWF'nin kendisidir: Kale/manufacturing kurulumu, dört fazı zaten
yarı-yaşamış durumda (keşif ✓, tanıtım büyük ölçüde ✓, gölge koşusu ŞU AN — askOnUnresolved
gölgede, A23 uçuşta — kademeli açılış SIRADA). Yani "tüm valfler açık" hedefi, bu dokümanın
FAZ 4'ünün CWF üzerindeki icrasıdır. Valf envanteri (v125 kapanışında canlıdan okundu; açılış
sırası A23 inişi + gölge okuması + sahip yayını):
pathB.enabled=0 · router.askOnUnresolved=0 · vector.toolRetrievalMode=0 · (yeni gelecek:
router.nudgeOnTimeUnclear=0) · vector.enabled=1 (açık olan tek valf).
Her birinin açılışı: iniş → gölge kanıt okuması sahibe → sahip yayını. Başka yol yok.

## §5 · S125'TE KAPANANLAR

- mcp-honestbench yeniden PUBLIC (sahip beyanı, S125) — sahip paketinin dört kaleminden biri düştü.

## §6 · AÇIK KARARLAR — üzerinden geçerken kapanacak

| # | Karar | Masadaki tek-yol önerisi | Durum |
|---|---|---|---|
| A1 | **Faz 2'nin uzman koltuğu**: müşteri tarafında bu masaya gerçekte kim oturur (rol/süreç olarak)? | Öneri yok — sahibin saha bilgisi belirleyecek; süreç tanımı bu dokümanın üzerinden geçilirken yazılır | AÇIK |
| A2 | **Kapsam etiketi çizgisi** | Her öğrenilmiş satır doğarken `scope: platform|domain`, varsayılan domain (dar güvenlidir), platform'a terfi YALNIZ sahip onayıyla — çünkü "bu ders her müşteride geçerli" bir ürün hükmüdür, ölçüm değil | AÇIK |
| A3 | Faz çıkış testlerinin (§3) nihai metni | Taslak yukarıda | AÇIK |

TAIL ANCHOR: S125-EAIP-COLDSTART-PROCESS-v1 ends here.
