# CWF — UYGULAMA SIRASI · S111 kapanışı · v24
<!-- 2026-08-21. v23'ü GEÇERSİZ KILAR. Sıra BAĞLAYICIDIR; sapma adlandırılmış bir olaydır. -->

## §0 · SIRANIN GEREKÇESİ — tek cümle

Zemin önce, yük sonra. **Ve zemin karanlık iner.** S111'in bedeli, bu iki cümlenin yazılı
olmamasıydı.

---

## §1 · S112 — DALGA 1: **ZEMİN, TEK BAŞINA**

### 1 · `PHASE-ARCHITECT-CARD-GRAMMAR-1` — sahip talebi, 1 numaralı kart

Belgesi kutuda (`PHASE-ARCHITECT-CARD-GRAMMAR-1-v1`). On iki kart kuralı, hepsi S111'in altı
kusurlu turundan ölçülerek türetildi.

| Şerit | İş | Sınıf |
|---|---|---|
| AG-1 | `kind=card` grameri + iki yönlü fixture'lar | **ZEMİN** — karanlık iner |
| AG-2 | `relayAudit --card` ve `--bus` modları (salt-okuma) | YÜK |
| AG-3 | Yasa metinleri; numaralar **mint anında sayılarak** | **ZEMİN** — karanlık iner |
| AG-4 | Preflight belgesi + **S111'in altı kartının yeniden denetimi** | YÜK |

**Kabul kriterinin taşıyıcı maddesi:** S111'in altı kusurlu kartı gramere karşı yeniden koşturulur
ve kaçının RED döndüğü ÖLÇÜLÜR. C-1, C-3, C-5, C-7 ihlalleri yakalanmıyorsa gramer o kuralı
denetlemiyordur.

**Neden retrieval'den önce:** retrieval'i kusurlu kartlarla yönetmek, aynı dört saati yeniden
ödemektir. Sahip hükmü: *"bunu efford edemeyiz."*

### 2 · Küçük zemin kalemleri — aynı dalgada, aynı disiplinle

`F-S111-GROUND-MD-UNGATED` (tek `validateStamp`) · `F-S111-GROUND-GATE-IN-DEPLOY-BUILD`
(`check:ground` deploy yolundan CI'a) · `PHASE-LANE-SHELL-PERMISSIONS-1` (repoda
`.claude/settings.json` + "tek komut, tek çağrı" kuralının boot §2'ye genişletilmesi).

**Bu üçü de ZEMİNdir ve karanlık iner.**

---

## §2 · S112 — DALGA 2: **HAFIZANIN İKİNCİ YARISI**

### 3 · `PHASE-CONTEXT-RETRIEVAL-1` — ASLA DÜŞÜRÜLMEZ

Sahip hükmü S110: *"retrieval'i da bir sonraki turda yap ama mutlaka yapılmalı, skip sakın."*
Projenin **kendi** Qdrant'ıyla — TEK-ORGAN, ikinci bir depo yok.

**Ön koşul (sahip hükmü S102, atlanamaz):** `VECTOR-ONBOARD-DRIP-1` — öncelik kuyruğu (sorgular
her zaman indekslemeyi yener) + throttling. İki tüketici tek kutuda olduğu an teorik olmaktan
çıkar: CWF'in canlı araç retrieval'i ile Architect'in bağlam retrieval'i aynı EC2'de.

**Korpus sırası (küçükten değerliye):**
1. `docs/laws/` + `docs/ground/` — küçük, en yüksek değer
2. repo dokümanları + `docs/adr/` + `docs/relay/`
3. proje kutusu belgeleri
4. **oturum arşivleri** — *"bu konu nerede tartışıldı"* sorusunun gerçek cevabı burada; dışa
   aktarım **yalnız sahibin yapabileceği iş**, S112 açılışında sorulacak

**Yasa:** vektör isabeti bir **işaretçidir**, öncül değil. `RULE-54` dilinde en fazla `RELAYED`;
öncül, işaret edilen artefaktın kendi sha'sında okunmuş hâlidir.

---

## §3 · S112/S113 — DALGA 3: SOTA KAPISINA DÖNÜŞ

### 4 · `#81 BACKEND-DISCOVERY-1`
Dört eksik: proaktif süpürme · içerik derinliği · doğrulayıcı (prover) · **tur anında okuyucu**.
Kabul çıtası sahip test seti (Q2 · Q20 · Q21 + iki doküman sorusu), **orijinal cümlelerle**.
Kapsamına giren ölçülmüş kalem: `F-S111-BACKEND-RETIRED-ENABLED`.

### 5 · `#29 A23 ⑤/⑥ MAKİNESİ`
SOTA kapısının kalan iki anahtarından biri. Spec `1cbd1580`'de dormant; üçlü teşhis
`stageClarify.ts:329`'da ölüyor; patlama yarıçapı 95/678.

### 6 · `#25 GRAPH-KB` — durum S112 açılışında **ÖLÇÜLECEK**, hatırlanmayacak.

---

## §4 · SIRA DIŞI — tetiği olan kalemler

| Kalem | Tetik |
|---|---|
| `#82b` Design-RAG | sahip çağrısı ya da A23 sonrası envanter — ⓷ ile aynı organa biner |
| Merge queue | **repoyu organizasyona taşıma kararı sahibin**; `merge_group` hazır, `rule26` flake'i önce ölçülmeli |
| `MEMORY.md` sıkıştırma | **münhasır oturum** — claim'ler tutulurken yapılamaz |
| `A23 v1_4` mint | Step 1.5 + parite ölçümü sonrası |
| G3 doğum kanıtı | ARMES toparlanması + Hülya'nın üç soruluk gözlemi |
| Qdrant admin yüzeyi | sahibin kendi ertelemesi, vektör kapısının arkasında |

---

## §5 · DALGA YASASI (S111'de doğdu, bağlayıcı)

1. Her kalem kart yazılırken **ZEMİN** ya da **YÜK** etiketlenir.
2. Aynı dalgada ikisi varsa **zemin devre dışı iner**; dalganın **son commit'i** silahlandırır.
3. Silahlanma adımı **iki ortamda** kanıt taşır: tam klon **ve** sığ klon.
4. Paylaşılan her dosyanın **tek sahibi** kartta adlandırılır.
5. N iniş yerine **tek entegrasyon sertifikası** — bir kapı bir ağacı belgeler.

<!-- END cwf-implementation-order-S111-v24 -->
