# REGISTER-BUG-BUCKET · v38 (S102 kapanışı)

<!-- v37'yi geçersiz kılar. Append-only defter: kalem yalnız CLOSED@evidence /
     SUPERSEDED-BY / MERGED-INTO ile çıkar. Zemin: master 1f660ea · rev 271. -->

## A · S102'DE KAPANANLAR (kanıtla)

| Ad | Kapanış |
|---|---|
| `F-S102-CANARY-500-ON-MERGE` | ✅ `fd02f69` — HARD-CRASH sınıfı, tek seferlik; CI artık non-200 gövdesini üç durumda basar (kök kusur enstrümandaydı) |
| `F-S102-DISCOVERY-CACHE-CROSS-USER` | ✅ `2208dc9` — önbellek kimlik-anahtarlı; mutasyon: kimlik sökülünce 2 KIRMIZI |
| `F-S101-ANON-AUDIT-GRANT` | ✅ `2208dc9` — 20 ölü grant revoke; canlı doğrulama anon→user_audit=false |
| `F-S101-PERSONAL-ROW-CROSS-USER` | ✅ `2208dc9` — "ortası" hükmü + denetim satırı |
| `F-S102-AMI-DRIFT-DESTROYS-HOST` | ✅ `5669bb5` — `ignore_changes=[ami]`; "en güncel" bir daha kutu yıkamaz |
| `F-S102-UNREAD-PLAN-DESTROYS` | ✅ `5669bb5` — plan kaydedilir, okunur, **okunan plan uygulanır**; yıkım `yes-destroy` ister → **S102-YASA-3** |
| `F-S102-SG-PREFIX-LIST-WEIGHT` | ✅ `5669bb5` — prefix-list kuralı kotada 55 sayılır; port başına ayrı SG (aritmetik yorumda) |
| `F-S102-ASCII-ONLY-AWS-STRINGS` | ✅ `1d7bbc1` — 92 satır sınıflandırıldı (74 yorum · 15 tf-yerel · 3 resource); 4/4 EC2 charset'ine uyuyor |
| `F-S102-ENCODER-LAZY-LOAD` | ✅ `014208f` — model import'ta yüklenir; `/health` yalnız resident'ken 200; port yüklenirken hiç açılmaz |
| `F-S102-ENCODER-REVISION-KWARG-SWALLOWED` | ✅ `014208f` — "pin" bir yorumdaydı, kütüphaneye hiç iletilmiyordu; ağırlıklar build'de gömüldü + `HF_HUB_OFFLINE=1` → **pin gerçek, çünkü indirme yok** |
| `F-S102-SPARSE-CONVERT-KEYERROR` | ✅ `014208f` — kurulu kaynaktan okundu: tek elemanlı sonuç çıplak dict'e iniyor |
| `F-S102-PROOF-RACES-ASSOCIATION` | ✅ `57084df` — zorunlu yakınsama + hesaplanmış sürüm + kimlik ön-kontrolü → **S102-YASA-2** |
| `F-S102-VOLUME-SHADOWS-BAKED-WEIGHTS` | ✅ `d14aa92` — mount silindi; üç yolla yeniden üretildi (boş volume gizler, dolu volume üretir) |
| `F-S102-FANOUT-AT-SINGLE-WORKER` (istemci) | ✅ `1f660ea` — parite sıralı gömer; ilerleme basar; koşu kendi kontrolünü taşıdı |
| `F-S102-OBS-FAILURE-UNNAMED` | ✅ `319e6fc` — `err=<Ad>[:<statü>][ <mesaj>]`; mutasyon-kanıtlı |
| `F-S102-OBS-STALE-CONNECTION` | ✅ CLOSED@owner-eyes — kök: eski deployment'ın ölü kutuya bağlantısı; redeploy ile aktı; sahip izi UI'da gördü |
| `F-S102-CLOUDINIT-ENV-RACE` | ✅ (kendiliğinden) — association yakınsaması iyileştirdi; kalıcı sıralama S103 notunda |

## B · AÇIK (faz açtırmaz, adıyla izlenir)

| Ad | Ağırlık | Öz |
|---|---|---|
| `F-S102-FANOUT-WEDGES-SERVICE` (sunucu) | **ORTA · UÇUŞTA** | Flask dev server tek istek işler; fan-out socket backlog'unu doldurup `/health`'i bile susturdu ve **kendiliğinden iyileşmedi**. FIX-7: waitress + yalnız model çağrısı `_infer_lock` arkasında (determinizm dokunulmaz) |
| `F-S102-HEALTHCHECK-NO-TREATMENT` | **ORTA** | `restart: always` çıkışa bakar, SAĞLIĞA değil — 15 dk `unhealthy` raporlandı, kimse aksiyon almadı. *Kimsenin üzerine aksiyon almadığı healthcheck, tedavisi olmayan teşhistir.* Çözüm adayı: autoheal/sağlık-tetikli yeniden başlatma, ayrı kalem |
| `F-S101-OVERRIDE-DROPS-BACKEND` | **YÜKSEK** | `mergeMcpServers` gölgelenen global satırı toptan değiştiriyor → #65 MERGE-FIELD-AWARE-1 (kart kesilmedi) |
| `F-S102-PARITY-KEY-BREADTH` | DÜŞÜK | CI'daki okuma anahtarı service_role genişliğinde |
| `F-S102-APPLYLOG-TEMPLATE-ESCAPE` | DÜŞÜK | `compose-apply.log` `{{.Name}}` şablonunu basıyor |
| `F-S102-ORPHANED-MODEL-VOLUME` | DÜŞÜK | `langfuse_bge_m3_models` mount'suz duruyor; sonraki süpürme |
| `F-S102-ROOT-CONSOLE-USE` | DÜŞÜK | Konsola root ile giriliyor |
| `F-S102-LANGFUSE-UI-ACCOUNTS-LOST` | KAYIT | Eski UI hesapları + telemetri tarihçesi volume ile gitti; init admin yaşıyor |
| `F-S101-BACKENDS-ENABLED-NO-WRITER` | DÜŞÜK | v105'te düşmüştü, geri eklendi |
| `F-S101-FK-CENSUS-BY-CONVENTION` · `F-S101-ROUTE-READ-DUP` · `F-S101-PURPOSE-GATE-SCOPE` · `F-S101-LIFECYCLEOF-SERVES-UNKNOWN` · `F-S101-BACKENDS-SELECT-UNTAGGED` | değişmedi | S101 devri |
| `F-S101-MKB-TOKEN-ROTATION` | — | **Sahip planlı — GÜNDEME GETİRME** |
| `F-S97-REGISTRY-PARENT-OVERWRITE` | 🔵 | #25 GRAPH-KB'de kapanacak |
| `silent_finish` (#59) | 🔵 | S102'de yeni canlı örnek: `finishReason=error` + `silentFinish=true` |
| ARDIC/ARMES tarafı: `F-S98-SHIFT-QUERY-UNUSABLE` · 13 araç yetkisi · `Could not open JPA EntityManager` (22:30) | 🔴/🔵 | Tedarikçide |
| Nöbet: kanarya `underpowered` kilidi · bütçe-çiti ~20 Ağustos (iki yeni konteyner bildirilecek) | 🔵 | değişmedi |

<!-- END · REGISTER-BUG-BUCKET-v38 -->
