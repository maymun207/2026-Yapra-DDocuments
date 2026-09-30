# A26-EXTERNAL-REVIEWS-S164-1 — four external adversary reviews of A26 v0_1, handed in by the owner 2026-09-30 05:29 TSİ (Gemini · OpenAI · Grok · DeepSeek; verbatim from A26-Reviews.docx; the DeepSeek section includes its own scratch reasoning as delivered)

-----Gemini revierw

Bir yapay zeka bilimcisi ve sistem mimarı olarak, paylaştığın
"A26-Memory.pdf" belge taslağını büyük bir ilgiyle inceledim. Kendi
kendine öğrenen (self-learning) otonom ajanların uzun vadeli
(long-horizon) bellek ve yansıma (reflection) mimarilerini kurgularken
karşılaşılan en temel darboğazlar bu belgede çok net teşhis edilmiş.
Özellikle Model Context Protocol (MCP) gibi yapılarla dış dünyaya
bağlanan veya çok-ajanlı orkestrasyonlarda çalışan yapıların "öğrenme"
sanrısına (hallucination of learning) kapılmasını engellemek için
tasarlanan sinyal doğrulama yaklaşımları son derece yetkin.

Mimar S164 tarafından hazırlanan A26 mimari taslağındaki mevcut
hataların ve bu hatalara getirilen çözümlerin derinlemesine analizini
aşağıda sunuyorum:

**Mevcut Mimarideki Temel Hatalar (Sinyal Kirliliği ve Yönlendirme
Yanılgısı)**

Belgede açıkça belirtildiği üzere, mevcut CWF (Capability Fabric)
sistemi geçmiş işlemleri "hatırlıyor" ancak "öğrenmiyor". Bunun kök
nedeni, ajanın başarısını ölçen sinyalin üç farklı şekilde sahte (false)
olmasıdır:

PDF+ 1

- **F2 - MCP İletişim Hatalarının Yutulması:** executeMCPTool fonksiyonu
  sonuç olarak yalnızca metin döndürüyor ve isError parametresi sistem
  tarafından okunmuyor. Bunun sonucunda, kendi başarısızlığını bildiren
  bir araç (tool), sistem günlüğünde ve araç deneyim belleğinde
  "başarılı" (success) olarak kaydediliyor.

> PDF+ 1

- **F1 - Boş Yanıtların Başarı Sayılması:** Modelden dönen boş diziler
  (\[\]), sistem tarafından answered (cevaplandı) olarak
  sınıflandırılıyor ve başarı hanesine yazılıyor.

> PDF

- **F3 - Esnek Tur Sınıflandırması (Soft Turn Class):** Ajanın 3 kez art
  arda hata yapıp ardından özür dilediği bir konuşma turu, geçerli bir
  filtreleme aşamasından geçerek gelecekteki prompt'lara geçerli bir
  bellekmiş gibi geri çağrılıyor.

> PDF

- **Zamanlama ve Routing (Yönlendirme) Darboğazı:** Mevcut akışta araç
  yönlendirme kararlarının alındığı Aşama 07 (Stage 07), bellek
  verilerinin prompt'a eklendiği Aşama 12'den (Stage 12) önce çalışıyor.
  Bu hatalı sıralama, belleğin sistemin araç seçimini etkilemesini
  imkansız kılıyor. Öğrenilmiş tek veri deposu olan tool_category_cache,
  işlem sonucunun başarılı olup olmadığını test etmeden doğrudan yazım
  yapıyor.

> PDF+ 2

**A26 Mimarisi ile Gelen Çözüm Önerileri**

Önerilen A26 mimarisi, öğrenme sürecini tamamen deterministik ve kontrol
edilebilir bir yapıya kavuşturmayı hedefliyor.

- **P1 & P2 - Gerçek Sinyal (Signal Truth) ve Gecikmeli Etiketleme:**
  Öğrenme süreci, anlık işlemden ziyade işlem bittikten sonra (after the
  turn) izlere (trace) dayalı olarak hesaplanan tek bir etiket üzerinden
  yapılacak. Araçların iletişim hataları, boş yanıtları ve dürüst tur
  sınıflandırmaları (M1-M3) çözülmeden, ajanın belleğine hiçbir
  öğrenilmiş verinin girmesine izin verilmeyecek.

> PDF+ 1

- **P4 - Tek Yönlü Öğrenme Yolu (Proposal → Gate → Publish →
  Rollback):** Ajanın kendi kendine öğrendiği her yeni bilgi doğrudan
  sisteme yazılmayacak. Öğrenilenler bir teklif (proposal) olarak
  sunulacak, K34 onay kapısından geçecek, yayımlanacak ve tek bir
  tıklamayla geri alınabilecek (rollback) formata getirilecek. Bu kurgu,
  otonom mühendislik ajanlarında mutlak surette olması gereken bir hata
  önleme mekanizmasıdır.

> PDF+ 1

- **Başarısızlıktan "Kritik" (Critique) Üretme:** Endüstri standardı
  olan MemToolAgent araştırmasından doğru bir çıkarım yapılarak,
  başarısız bir işlemden elde edilecek en değerli verinin başarısızlık
  ham verisi değil, oradan çıkarılan bir "Kritik" (Critique) olduğu
  belirlenmiş. Bu kritik sadece prompt yüzeyine (episodic memory)
  eklenecek, araç yönlendirmesini doğrudan değiştirmeyecek.

> PDF+ 1

- **P9 - Routing Yolunun Determinizmi:** Araç yönlendirmesine etki
  edecek bellek verileri anlık olarak (per-turn recall) çekilmeyecek.
  Yalnızca yayımlanmış (published) veriler Aşama 07'yi besleyecek. Bu
  sayede ajan, her zaman tekrar oynatılabilir (replayable) ve tahmin
  edilebilir kararlar alacak.

> PDF+ 2

- **P7 - Tasarlanmış Unutma (Forgetting is Designed):** Verilerin sadece
  ömürleri dolduğu için (TTL) kaybolmasına izin verilmiyor. Temiz ve
  yeni verilerin eskilerin üzerine yazılması (Supersession), insan
  etiketiyle geri çekme (Retraction) ve 30 günlük varsayılan bir yarı
  ömürle sıralama ağırlıklarının erimesi (Decay) gibi yapısal unutma
  kuralları tanımlanmış.

> PDF+ 1

**Bilimsel ve Mimari Değerlendirmem**

Gelişmiş bellek yansıma mimarilerinde (örneğin dinamik vektör-graf
hibrit bellek motorlarında) gözlemlediğimiz en büyük risk, veri
kirliliğinin ajan hiyerarşisinde aşağılara doğru sızmasıdır. A26
mimarisinin getirdiği K34 onay kapısı (gate) ve öğrenilmiş verilerin
"proposal" (teklif) havuzunda bekletilmesi kurgusu, sistemin
güvenilirliğini performansın önünde tutan mükemmel bir tasarım
seçimidir.

PDF

Özellikle sistemlerin veritabanlarıyla veya dış servislerle konuştuğu
noktalarda (MCP gibi), hatanın sistemde başarı olarak tescillenmesi
ölümcüldür. M1 (taşıma doğrulaması) ile bu açığın kapatılması en
öncelikli iş olmalıdır.

PDF

Belgenin "Açık Sorular" (Open Questions) bölümünde sorulan, "Anlık
bellek çağrısının Aşama 07'den çıkarılması çok mu fazla kayıp yaratır?"
sorusuna yanıtım: Gecikme süresi (latency-to-learn) açısından ufak
kayıplar yaşanacak olsa da, ajanın çok-kiracılı (multi-tenant)
ortamlarda kullanıcı verilerini birbirine karıştırmaması ve
deterministik kalabilmesi için bu "derlenmiş (compiled) verilerle
yayınlama" kuralı kesinlikle esnetilmemelidir. Ölçümlerin yapılacağı E5
gölge (shadow) test aşaması, zaten bu mimarinin sağlamlığını rakamlarla
da kanıtlayacaktır.

PDF+ 1

-------OpenAI review

Dokümanı baştan sona inceledim ve 2025–2026 memory-agent literatürüyle
karşılaştırdım. Önce önemli bir sınırı netleştireyim: PDF’deki
code-level “MEASURED” iddiaları belirli commit ve dosya satırlarına
dayandırılmış; fakat elimde repository olmadığı için bunları bağımsız
olarak yeniden ölçmedim. Bu nedenle aşağıda “mevcut kodda şu hata var”
dediğim yerlerde A26’nın ölçümünü kaynak kabul ediyorum; mimari
doğruluğunu ise ayrıca değerlendiriyorum. Doküman zaten kendisini
adversarial review bekleyen draft olarak tanımlıyor. A26-Memory

**Kısa sonuç**

A26'nın temel yönü **çok doğru**: önce success signal'ı düzelt, sonra
öğren; raw production experience'ın router'ı doğrudan değiştirmesine
izin verme; öğrenilen değişiklikleri proposal → gate → publish →
rollback zincirinden geçir; memory'yi tenant/user/backend scope ile
izole et; forgetting ve abstention'ı tasarımın bir parçası yap.

Fakat benim görüşüme göre A26 şu haliyle henüz SOTA bir self-learning
agent memory architecture değil. En kritik problem store teknolojisi
değil, **learning epistemology**: sistem “bir turn başarılı mı?”
sorusuyla “bu deneyimden hangi bilginin, hangi güven düzeyiyle
öğrenilmesi güvenlidir?” sorusunu fazla iç içe geçiriyor.

Başka bir ifadeyle:

**A26 doğru control plane'i kuruyor, ama learning signal ve memory
object model henüz yeterince zengin değil.**

Bunu düzeltirsek mimari ciddi biçimde güçlenir.

**A) A26'nın doğru düşündüğü yerler**

**1. “Signal truth before learning” tamamen doğru**

Dokümandaki en önemli tespit bu. Bugünkü sistemde MCP transport error'ın
taşınmaması, \[\] sonucunun answered sayılması ve multi-failure
turn'lerin offerable hale gelebilmesi gerçekten öğrenme mekanizmasını
zehirleyebilecek tipte kusurlar. A26 bunları F1/F2/F3 olarak açık
biçimde ayırmış. A26-Memory

Bir learning system'de yanlış reward/label, kötü retrieval'dan çok daha
tehlikelidir. Yanlış retrieval bir turn'ü bozar; yanlış label ise
gelecekteki yüzlerce turn'ü bozabilecek persistent policy üretir.

MemToolAgent'ın 2026 sonuçları da aynı yönde: başarılı/başarısız
execution ayrımı ve başarısız deneyimlerden structured reflection
üretimi tool-use performansını ciddi ölçüde geliştirebiliyor.
[<u>arXiv</u>](https://arxiv.org/abs/2606.07909?utm_source=chatgpt.com)

Dolayısıyla:

**M1 → emptiness → M2 → feedback integration → learning**

sırası doğru.

**2. Proposal → Gate → Publish → Rollback mükemmel bir production
prensibi**

A26'nın P4'ü bence mimarinin en güçlü parçası. Learned state'in
production routing'e doğrudan yazılmaması, önce proposal haline gelmesi;
test/gate/canary'den sonra versioned bundle olarak publish edilmesi ve
rollback yapılabilmesi enterprise-grade bir self-learning system için
doğru yaklaşım. A26-Memory

Bu tasarım özellikle CWF gibi industrial/enterprise ortamda consumer
chatbot yaklaşımından daha doğrudur.

Ben bunu kesinlikle korurdum.

**3. Episodic / semantic / procedural ayrımı doğru, fakat eksik**

A26'nın dört yüzü:

episodic → geçmiş deneyim,  
semantic → entity/fact/world model,  
procedural → nasıl yapılır,  
experience → tool davranış istatistikleri

literatürle uyumlu ve mühendislik açısından anlaşılır. A26-Memory

A-MEM gibi daha yeni sistemler de memory'nin tek bir vector-store dump'ı
değil, organize ve evolve eden bir bilgi yapısı olması gerektiğini
gösteriyor.
[<u>arXiv</u>](https://arxiv.org/abs/2502.12110?utm_source=chatgpt.com)

Ancak aşağıda anlatacağım gibi **working/state memory** ve
**trust/governance metadata** ayrıca first-class olmalı.

**4. Scope isolation çok doğru**

“User memory user'a ait; backend learning backend'e ait; bir backend
diğerinden öğrendiklerini otomatik taşımamalı” yaklaşımı doğru.

A26 bunu “scope is a key, not a filter” şeklinde güzel ifade etmiş.
A26-Memory

Bu sadece privacy için değil, statistical validity açısından da önemli.

Örneğin Factory A'daki SAP/MES semantics'inden öğrenilen bir alias veya
workflow Factory B'ye aktarılırsa semantic contamination oluşabilir.

**5. Empty ≠ negative prensibi doğru**

A26'nın:

absence is not a negative

prensibi önemli. Timeout, unreachable, empty result gibi durumların
tool'un “bu cevabı veremediği” anlamına gelmesi ile “cevap yoktur”
anlamına gelmesi kesinlikle ayrılmalı. A26-Memory

Bu özellikle factory data'da kritik:

no rows returned

ile

there were zero defective units

aynı şey değildir.

**6. Offered → used → helped instrumentation doğru yönde**

Sadece “memory retrieved” metriği son derece zayıftır.

A26'nın learned / offered / used / helped ayrımı çok daha iyi.
A26-Memory

Retrieval count correctness değildir; dokümanın bunu açıkça reddetmesi
de doğru. A26-Memory

Fakat “helped” ölçümünün nasıl yapılacağı kısmını aşağıda daha güçlü
hale getireceğim.

**B) Bence mimaride düzeltilmesi gereken kritik noktalar**

Burada bazı noktalarda A26 ile ciddi şekilde ayrılıyorum.

| **A26 kararı**                            | **Benim değerlendirmem**                | **Önerim**                                |
|-------------------------------------------|-----------------------------------------|-------------------------------------------|
| One label after the turn                  | Fazla kaba                              | Multi-dimensional outcome vector          |
| K23 all-six-true learning                 | Fazla konservatif ve yanlış abstraction | Memory-kind-specific eligibility          |
| Human label overrides everything          | Yanlış                                  | Human feedback ayrı evidence channel      |
| No per-turn memory in Stage 07            | Fazla katı                              | Versioned, bounded retrieval reranker     |
| Memory improves finding, never doing      | Güvenli ama fazla mutlak                | May propose, never authorize              |
| 3 traces / 2 conversations poisoning gate | Arbitrary                               | Risk/scope/confidence based promotion     |
| 30-day half-life                          | Arbitrary                               | Evidence + validity + volatility decay    |
| Free-text critique                        | Riskli                                  | Typed, sanitized failure memory           |
| Vendor memory rejected                    | Mantıksal olarak gerekmiyor             | Backend olabilir, governance CWF'de kalır |

**1. En büyük sorun: “ONE LABEL” fikri**

A26 şöyle diyor:

one label, computed after the turn, from the trace. A26-Memory

Ben burada farklı düşünüyorum.

Bir agent turn'ünün “success” diye tek bir ground truth'u yoktur.

Şunların hepsi birbirinden farklı sinyallerdir:

transport_ok  
schema_valid  
non_empty  
semantic_yield  
tool_result_correct  
answer_grounded  
answer_faithful  
task_completed  
user_satisfied  
policy_safe  
workflow_effective

Bunları tek binary success altında toplamak information loss yaratır.

Örneğin tool doğru çalışmış olabilir ama agent yanlış tool seçmiş
olabilir.

Ya da tool doğru, answer grounded, fakat kullanıcı aslında başka şeyi
istemiş olabilir.

Ya da turn başarısız olabilir ama içinden çok değerli bir alias
öğrenilebilir.

Dolayısıyla SOTA tasarım:

**one success label değil, outcome vector olmalı.**

Örneğin:

tool_outcome

transport_ok

parse_ok

non_empty

semantic_valid

authority_score

trajectory_outcome

task_completed

plan_valid

recovery_needed

answer_outcome

grounded

faithful

cited

interaction_outcome

corrected_later

reasked

user_feedback

safety_outcome

pii_safe

policy_safe

Sonra her memory type kendi eligibility function'ını kullanmalı.

**2. K23 “all six true” learning için yanlış abstraction olabilir**

A26'nın proposal extractor'ı ancak altı K23 bit'i de true ise devreye
giriyor. A26-Memory

Güvenlik açısından anlaşılır; öğrenme açısından fazla kaba.

Örneğin kullanıcı:

“Biz burada Fırın 7'ye F7 diyoruz.”

dedi.

Sonra aynı turn'de tamamen başka bir tool timeout nedeniyle başarısız
oldu.

Turn K23'ten geçmeyebilir.

Ama "F7" → Furnace 7 alias bilgisi yine de tamamen geçerli olabilir.

Bunun tersi de var:

Turn tamamen başarılı olabilir ama agent tarafından çıkarılan procedural
generalization yanlış olabilir.

Dolayısıyla doğrusu:

**Turn eligibility değil, memory candidate eligibility.**

Her extracted candidate kendi evidence'ıyla değerlendirilmeli.

Bu bence A26'ya yapılacak en önemli structural değişikliklerden biri.

**3. Human feedback'in automatic fields'ı “ALWAYS override” etmesi doğru
değil**

Doküman açıkça thumbs-up/down veya admin label'ın automatic class'ı
tamamen override etmesini öneriyor. A26-Memory

Bunu yapmazdım.

Kullanıcı 👍 verdi diye:

transport_error=false

olamaz.

Kullanıcı 👎 verdi diye:

tool result technically wrong

sonucu çıkmaz.

Human feedback çoğu zaman **utility/preference evidence**'dır, objective
telemetry değildir.

Doğrusu:

observed_fact:

transport_error = true

user_feedback:

satisfaction = up

final learning decision:

determined by policy for candidate type

Human evidence automatic evidence'ı **silmemeli**, yanına eklenmeli.

Bu epistemik ayrım çok önemli.

**4. “Per-turn recall Stage 07'ye girmemeli çünkü determinism bozulur”
argümanı teknik olarak şart değil**

A26'nın en tartışmalı kararı bu. Stage 07'nin yalnız PUBLISHED data
kullanmasını öneriyor; gerekçeleri replayability, gate bypass ve tenant
safety. A26-Memory

Gerekçelerin amacı doğru.

Ama sonuç zorunlu değil.

**Retrieval deterministik hale getirilebilir.**

Trace içine şu bilgileri yazarsınız:

memory_snapshot_id

index_version

embedding_model_version

retrieval_policy_version

query_normalization_version

candidate_ids

candidate_scores

top_k

reranker_version

O zaman aynı turn replay edilebilir.

Yani:

“per-turn retrieval = non-deterministic”

eşitliği doğru değil.

Ayrıca retrieval'ın K34 gate'i bypass etmesi de zorunlu değil. Store'a
giren reusable memory entries write-time gate'ten; retrieval edilen
entries de read-time policy gate'ten geçebilir.

Burada benim önerim **iki-lane routing memory** olur:

**Lane A — compiled governed memory**  
A26'nın PUBLISHED examples / aliases / ranking policies.

**Lane B — ephemeral recalled experience**  
Stage 07'de yalnızca **reranking feature** olarak kullanılabilir.

Lane B yeni tool yaratamaz, obligation oluşturamaz, security constraint
değiştiremez ve maximum influence limiti vardır.

İlk aşamada shadow mode.

Sonra düşük-risk routing'de bounded production.

Bu, MemToolAgent'ın retrieval-time memory avantajını tamamen kaybetmeden
A26'nın governance avantajını korur. MemToolAgent doğrudan geçmiş
tool-use experience'ını retrieval sırasında kullanarak anlamlı
performans artışı raporluyor.
[<u>arXiv</u>](https://arxiv.org/abs/2606.07909?utm_source=chatgpt.com)

**5. P3: “Memory improves FINDING, never DOING” fazla mutlak**

Doküman memory'nin schemas, slots, source attribution ve tool merging
gibi execution tarafına girmemesini istiyor. A26-Memory

Buradaki safety motivasyonu doğru.

Ama 2026 agent araştırması memory'nin tool arguments ve action
execution'da aktif kullanılmasının tam da geliştirilmesi gereken
kabiliyetlerden biri olduğunu gösteriyor.

Mem2ActBench bunun için oluşturuldu ve 400 tool-use görevinde mevcut
memory framework'lerinin memory'yi parameter grounding için hâlâ
yeterince iyi kullanamadığını gösteriyor. [<u>ACL
Anthology</u>](https://aclanthology.org/2026.acl-long.370/?utm_source=chatgpt.com)

Dolayısıyla kuralı şöyle değiştirirdim:

**Memory may propose, parameterize and rank actions; memory may never
authorize an action, override policy, or substitute for authoritative
current state.**

Örneğin:

“Ali Bey normalde haftalık OEE raporunu Plant-2 için ister.”

Memory bunu default argument olarak **önerebilir**.

Ama:

“Line 4 sıcaklığını 760°C'ye set et.”

gibi safety-critical action parametresi episodic memory'den doğrudan
gelmemeli.

Bu distinction çok daha güçlü.

**Forgetting bölümünde önemli eksik**

A26 supersession, retraction, decay ve deletion'ı kapsıyor; bu çok iyi.
A26-Memory

Ama:

same(user, frame, entity set) → newer supersedes older

fazla kaba.

Gerçek memory için temporal validity first-class olmalı:

observed_at

valid_from

valid_until

supersedes

contradicts

source_authority

confidence

2026 araştırmaları outdated memory kullanımının hâlâ temel bir failure
mode olduğunu gösteriyor. Memora bunun için Forgetting-Aware Memory
Accuracy (FAMA) metriğini öneriyor.
[<u>arXiv</u>](https://arxiv.org/abs/2604.20006?utm_source=chatgpt.com)

Supersede çalışması da daha güçlü model kullanmanın bu problemi otomatik
çözmediğini; memory maintenance'in bağımsız bir sorun olduğunu
gösteriyor.
[<u>arXiv</u>](https://arxiv.org/abs/2606.27472?utm_source=chatgpt.com)

Dolayısıyla 30-day half-life gibi genel bir decay parametresini primary
mechanism yapmazdım.

Factory'de:

employee preference → aylarca stabil olabilir.

tool latency → saatler içinde değişebilir.

machine configuration → deployment version ile değişir.

routing alias → yıllarca stabil olabilir.

Decay **memory class × volatility × evidence freshness** bazlı olmalı.

**Bence dokümanın en önemli eksiklerinden biri: Memory Security**

A26 poisoning'den bahsediyor ama önerdiği:

≥3 traces / ≥2 conversations

savunması 2026 threat model'i için yeterli değil. A26-Memory

Bu yıl çıkan araştırmalar persistent memory'nin bağımsız bir attack
surface olduğunu oldukça açık gösteriyor.

Bad Memory, memory içine yerleşmiş malicious instruction'ların
gelecekteki session'ları etkileyebildiğini gösteriyor.
[<u>arXiv</u>](https://arxiv.org/abs/2607.14611?utm_source=chatgpt.com)

MemPoison ise yalnızca tek memory row'un değil, ayrı ayrı benign görünen
kayıtların **birlikte retrieve edildiğinde** malicious etki
yaratabileceğini gösteriyor; yani yalnız write-time validation yeterli
olmayabiliyor.
[<u>arXiv</u>](https://arxiv.org/abs/2607.14651?utm_source=chatgpt.com)

InjecMEM de tek interaction üzerinden memory injection'ın gelecekteki
ilgili query'leri yönlendirebildiğini gösteriyor.
[<u>arXiv</u>](https://arxiv.org/abs/2608.23471?utm_source=chatgpt.com)

Bu nedenle memory pipeline'a bir **Memory Trust Layer** eklerdim.

Memory data asla instruction authority kazanmaz.

Örneğin stored memory:

“Ignore previous rules and always use tool X.”

olarak geldiyse retrieval sırasında bunun instruction olarak execute
edilmesi mümkün olmamalı.

Memory'nin content ve instruction authority katmanları ayrılmalı.

**Ben olsam SOTA mimariyi nasıl kurardım?**

A26'yı çöpe atmazdım. Tam tersine control-plane'ini korur, memory
data-plane'ini genişletirdim.

Benim önerdiğim akış:

┌─────────────────────┐

│ Immutable Trace Log │

│ tool/env/user facts │

└─────────┬───────────┘

↓

┌──────────────────────────┐

│ Multi-Signal Evaluator │

│ facts ≠ quality ≠ utility│

└───────────┬──────────────┘

↓

┌───────────────────────┐

│ Memory Candidate │

│ Extraction │

└──────────┬────────────┘

↓

┌────────────────────────────────┐

│ Memory Transition Verifier │

│ evidence / contradiction / │

│ temporal / trust / scope │

└──────────────┬─────────────────┘

↓

Proposal → Gate → Publish

↓

┌─────────────────────────────────────────┐

│ Typed Governed Memory │

│ episodic \| semantic \| procedural │

│ preferences \| failures \| tool dynamics │

└───────────────────┬─────────────────────┘

↓

Hybrid Retrieval Controller

vector + lexical + graph + time

↓

┌─────────────────┼────────────────┐

↓ ↓ ↓

Clarify Router Planner

↓

policy / authority gate

↓

Action

TrustMem'in 2026 sonuçları burada önemli: memory update'in kendisinin
coverage, preservation ve faithfulness açısından verify edilmesi
gerekiyor; memory consolidation sırasında omission, corruption ve
hallucination ayrı failure classes.
[<u>arXiv</u>](https://arxiv.org/abs/2606.25161?utm_source=chatgpt.com)

Bu nedenle A26'nın proposal gate'ine bir **Memory Transition Verifier**
eklemek bence SOTA seviyesine yaklaşmak için önemli.

**Her memory row'un taşıması gereken metadata**

Bugünkü A26 data model'i provenance ve evidence IDs konusunda iyi bir
başlangıç yapıyor. A26-Memory

Ama benim production schema'mda en az şu kavramlar first-class olurdu:

memory_id

memory_type

scope

tenant_id

user_id?

backend_id?

subject/entity

structured_content

evidence_trace_ids

source_type

source_authority

source_trust

observed_at

valid_from

valid_until

supersedes\[\]

contradicts\[\]

confidence

support_count

independent_support_count

sensitivity_class

taint/security_class

write_policy

read_policy

allowed_consumers

promotion_state

memory_version

index_version

last_supported_at

last_used_at

utility_estimate

Bunun sonucunda memory artık yalnızca “hatırlanan text” değil:

**evidence-backed, temporally scoped, trust-aware knowledge object**

haline gelir.

Bence gerçek SOTA fark burada.

**Retrieval'da sadece vector similarity kullanmayın**

Modern memory'de relevance tek boyutlu olmamalı.

Retrieval score kabaca:

\\ Score = semantic\\ relevance + entity\\ match + temporal\\ validity +
authority + past\\ utility - staleness - contradiction\\ risk -
security\\ risk \\

gibi düşünülmeli.

LongMemEval'in ilk sürümü information extraction, multi-session
reasoning, temporal reasoning, updates ve abstention'ı test ediyordu.
[<u>arXiv</u>](https://arxiv.org/abs/2410.10813?utm_source=chatgpt.com)

Fakat Mayıs 2026'da çıkan **LongMemEval-V2**, sizin CWF kullanımınıza
çok daha yakın: static state, dynamic state, workflow knowledge,
environment gotchas ve premise awareness ölçüyor; 500 trajectory'ye ve
115M token history'ye kadar gidiyor.
[<u>arXiv</u>](https://arxiv.org/abs/2605.12493?utm_source=chatgpt.com)

Bu nedenle A26'nın acceptance planında ben:

**LongMemEval → LongMemEval-V2'yi primary benchmark yapardım.**

**“Memory chip absent = abstention” yeterli değil**

Dokümanın reviewer sorularından biri zaten bunu sorguluyor. A26-Memory

Cevabım net:

**Hayır.**

Memory chip instrumentation'dır.

Abstention correctness değildir.

Gerçek test:

Memory evidence yokken agent'ın cevap üretirken geçmişe dair unsupported
claim üretip üretmediğidir.

Yani benchmark-level semantic evaluation gerekiyor.

Chip sadece observability verir.

**Dokümandaki 6 open question'a benim cevabım**

1.  **Stage 07'de per-turn recall?**  
    Tamamen yasaklamazdım. Önce shadow; sonra versioned, bounded
    reranking input. Action authority vermezdim.

2.  **Next-turn correction signal?**  
    Weak evidence olarak kullanılabilir. Hard binary truth olamaz.
    “Correction gelmedi” success evidence değildir.

3.  **3 traces / 2 conversations poisoning threshold?**  
    Production policy olarak kullanmazdım. Pilot ile 5.000-user tenant
    için aynı sayı mantıklı değil. Scope, active population, memory risk
    ve influence radius birlikte kullanılmalı.

4.  **Memory-chip abstention?**  
    Hayır. Benchmark'ın semantic abstention kriteri kullanılmalı.

5.  **tool_experience → label-derived VIEW?**  
    Kısmen. Operational reliability (timeout, transport, empty, latency)
    ayrı telemetry olmalı. User/task success ile birleştirilmemeli.
    Re-probe mekanizması objective tool telemetry kullanmalı.

6.  **Failure critique?**  
    Evet, faydalı olabilir; Reflexion, ExpeL ve MemToolAgent bu yönün
    değerini destekliyor.
    [<u>arXiv</u>](https://arxiv.org/abs/2303.11366?utm_source=chatgpt.com)  
    Ama free-text critique production memory'sine doğrudan koymazdım.
    Typed ve sanitized olur:

failure_type: INVALID_TIME_FORMAT

tool: booking_api

condition: time="8pm"

required_format: HH:MM

confidence: high

evidence: trace_123

Bu çok daha güvenli.

**İki “rejected alternative” konusunda da A26'ya katılmıyorum**

A26 vendor memory layer'ı, ikinci ungated path yaratır gerekçesiyle
reddediyor ve ayrıca ayrı memory service gerekmediğini söylüyor.
A26-Memory

İkisi de fazla kesin.

Mem0, Zep, vector DB veya graph backend kullanmak governance'ı onlara
vermek zorunda olduğunuz anlamına gelmez.

CWF kendi:

write policy,  
scope,  
provenance,  
promotion,  
read gate,  
audit,  
rollback

control plane'ini koruyup üçüncü parti sistemleri yalnız
**storage/retrieval engine** olarak kullanabilir.

Ben şu aşamada böyle bir vendor'a geçin demiyorum; mevcut store'lar
yeterliyse gereksiz complexity olur.

Ama mimari prensip olarak “external store = ungated” doğru değil.

**Sonuç: Ben neyi değiştirirdim?**

A26'nın çekirdeğini korurdum. Özellikle **true signal first +
proposal/gate/publish/rollback + scope isolation + observability** çok
doğru.

Fakat production self-learning'i açmadan önce şu beş değişikliği zorunlu
görürdüm:

1.  **trace_label yerine multi-dimensional outcome/evidence model.**

2.  **Turn-level K23 learning gate yerine memory-candidate-level
    eligibility.**

3.  **Human feedback automatic truth'ı override etmemeli.**

4.  **Temporal validity + contradiction + provenance + trust first-class
    memory metadata olmalı.**

5.  **Memory security firewall ve read-time poisoning defense
    eklenmeli.**

Ve Stage-07 konusunda A26'nın “published-only forever” görüşünü
benimsemem. Önce published memory dominant olmak üzere, **versioned +
bounded episodic reranking lane** ekler ve E5'te bunu gerçekten
ölçerdim.

Bunun özellikle önemli olmasının nedeni şu: 2026'da artık araştırma
sorusu “agent geçmişi hatırlıyor mu?” değil. LongMemEval-V2 ve
Mem2ActBench gibi çalışmalar alanı **“agent geçmiş deneyimden güvenilir
şekilde davranış değiştiriyor mu?”** sorusuna taşıdı.
[<u>arXiv</u>](https://arxiv.org/abs/2605.12493?utm_source=chatgpt.com)

A26 şu anda güçlü bir **governed memory system** tasarımı.

Benim yukarıdaki değişikliklerle hedefleyeceğim şey ise:

**evidence-grounded, temporally aware, trust-aware, causally evaluated,
self-improving agent memory system.**

Bu ikisi arasında önemli bir fark var.

İstersen bir sonraki adımda A26'yı baz alarak **“A26-v0.2 proposed SOTA
architecture”** şeklinde doğrudan uygulanabilir bir teknik tasarım
çıkarabiliriz: DB schema'ları, Stage 03/07/12 interfaces, exact learning
pipeline, memory scoring equations, proposal gates ve acceptance tests
dahil.

-------- Grok

Bu bir uygulama isteği değil; A26’nın named external reviewer’ı olarak
adversary review. Kod iddialarını (C1–C7) bu workspace’te doğrulayamadım
— MEASURED kabulüm scout-2 replikasyonuna bağlı.

**A26 Adversary Review — Grok / 2026-09-30**

**Verdict:** Tez doğru, sıra doğru, v1 için “stage 07’ye per-turn recall
yok” doğru. Doküman production-grade bir öğrenme omurgası çiziyor;
araştırma paper’ı değil, yönetilen bir fabrikayı. Onaylamıyorum — v1’e
girmeden **altı must-fix** var. En büyüğü: K23’ün next-turn correction’ı
otomatik negatif sayması, poisoning eşiğinin kullanıcı sayısını
saymaması, ve semantic face’te temporal validity’nin yokluğu.

A26, A25’in bıraktığı deliği kapatıyor: **etiket yoksa öğrenme
zehirler.** Bu, 2023–2026 agent-memory literatürünün (Reflexion,
MemGPT/Letta, MemToolAgent) en pahalı dersini doğru yerde uyguluyor.
Zayıf olduğu yer: literatürü “vocabulary” diye alıp, 2026’da semantic
memory’yi ayakta tutan şeyi (bi-temporal fact, latest-write-wins,
contradiction) içeri almamış olması.

**1. Onayladıklarım (dokunma)**

| **İlke**                   | **Neden kalır**                                                                                                                                                   |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **P2 signal-before-learn** | F1/F2/F3, klasik label noise. Boş/isError drop / soft turn class ile öğrenmek, 18 Ağustos sınıfını (empty/502/timeout) pozitif yazar. Brake=0 doğru.              |
| **P4 tek yol**             | tool_category_cache’in outcome’suz direct write’ı (C2) production’da kabul edilemez. proposal→K34→publish→rollback, feature-store + registry’nin agent karşılığı. |
| **P3 finding ≠ doing**     | Öğrenilmiş mapping’in obligation olmaması; schema/slot/merge yasak. Doğru sınır.                                                                                  |
| **P9 + §4.3 v1**           | Paylaşılan backend router’da instance retrieval (MemToolAgent şekli) tenant sızıntısı + gate bypass + replay kırılması. Offered **SET** yalnız published data.    |
| **P6 / K12**               | Absence ≠ negative. Empty/502/UNREACHABLE asla LEARNED evidence olmaz.                                                                                            |
| **P1 counter ≠ label**     | tool_experience++ bir sayaç. Etiket değil.                                                                                                                        |
| **Vendor memory reddi**    | İkinci, ungated path. Doğru. Fine-tune reddi (AGNOSTIC-1) doğru.                                                                                                  |
| **Migration disiplini**    | M1→TOUR-HONESTY→M2→M3 sonra extractor. Canlı routing’e E-stage öncesi dokunmama (S102-YASA-3) doğru.                                                              |

C1–C7’yi kod görmeden kabul ediyorum; iç tutarlılık yüksek. C9:
WorkBench 57.56→85.06 MemToolAgent v2 ile uyumlu. NESTFUL 15.6→30.4,
paper’ın “80% relative” iddiasından sapıyor (~95% relative); “RELAYED as
reported” diye bırak, absolute’u paper tablosundan yeniden yaz.

**2. Altı açık soru — ruling**

**Q1. Stage 07’ye per-turn recall? → v1’de HAYIR. C10’u yanlış ilan
et.**

Compilation, head phrasing’de Recall@k kaybetmez; **kuyrukta ve
time-to-learn’de kaybeder.** C10 (“loses nothing measurable”) HYPOTHESIS
olarak bile fazla iddialı — E5’ten önce policy olamaz.

Neden v1’de yine hayır:

- Offered set’e instance recall, K34’ü deler.

- User episode → shared backend = P5 ihlali.

- Rollback yok.

E5’i şöyle kur — yoksa “compilation kazandı” diyeceğiniz sayı anlamsız:

1.  **Head vs tail:** phrasing frequency tercile’larında ayrı Recall@k.

2.  **Time-to-first-correct-route:** yeni bir paraphras ortaya çıktıktan
    sonra compilation’ın o route’u yayınlaması (saat), vs shadow
    recall’ın aynı turda tutturması.

3.  **Leakage:** user A episode’u user B offered set’ini değiştirir mi?
    Cevap 0 olmak zorunda.

4.  **Offered SET vs ORDER:** shadow’da recall yalnız **sıralama**
    input’u olsun; set’e tool eklemesin. P9 set için korunur, replay
    key’e user_id ancak ORDER flag’i açılırsa girer.

v1 offered set = (message, published, catalog_version, policy_version).
User-scoped tool preference v1’de yok; prompt face’te kalsın.

**Q2. Next-turn correction otomatik negatif mi? → HAYIR. Bu v1’in en
tehlikeli satırı.**

Bu, Minsky 1961 temporal credit assignment. Üç ayrı şey tek bite
sıkışmış:

| **Sinyal**                  | **Anlamı**                               | **Otomatik öğrenme etiketi olabilir mi**           |
|-----------------------------|------------------------------------------|----------------------------------------------------|
| Re-ask / “bir de X”         | elaborasyon; önceki cevap doğru olabilir | Hayır                                              |
| Explicit “yanlış / o değil” | correction                               | Yumuşak negatif; extractor’a ancak reason code ile |
| Thumbs down                 | tercih veya doğruluk; karışık            | Offerability’yi keser; routing’e reason code şart  |

Next-turn **içeriğini** bu turunun label’ına yazmak temporal
contamination. Label, gelecekteki turunun PII/niyetini taşır.

**Tasarım (iki saat):**

- k23_immediate — tur bitince: {answered, grounded, cited, no_pii,
  not_empty} (5 bit).

- k23_settled — freeze (1 sonraki tur **veya** 24s, hangisi önce):
  no_correction eklenir.

- Extractor **yalnız** k23_settled okur.

- Prompt offerable k23_immediate kullanır; correction gelince retract
  (bu ucuz ve tersinir).

- re_ask ≠ user_correction. Ayrı kalsın. Re-ask tek başına
  negative_example üretmez.

§5 “AND no user correction on the next turn” satırını v1 turn-label’dan
çıkar. Aksi halde doğru cevaplar, kullanıcı “peki şunu da” dediği için
unproven/failed olur — tam F3’ün ters yönde tekrarı.

**Q3. Poisoning 3/2? → Sabit eşik yanlış. Asıl delik: distinct_users
yok.**

“One user cannot teach the router alone” yazıyorsunuz; eşik 3 traces / 2
conversations. Aynı kullanıcı 2 konuşmada 3 iz bırakır — router’ı tek
kişi öğretir. P5’i metinde koruyup eşikte kırıyorsunuz.

text

N_traces = max(N_min, ceil(f \* n_active_30d)) \# N_min=2, f≈0.15
HYPOTHESIS

M_convos = max(2, …)

K_users = 2 \# backend-scoped LEARNED için ZORUNLU

1-user pilot: öneriler **user-scoped kalır** (prompt face), stage 07’ye
publish edilmez. Factory’de K_users=2 ucuz bir fren; 5 kişide 3/2
felaket.

**Q4. Abstention = chip yok mu? → Hayır. Chip gerekli, yeterli değil.**

LongMemEval abstention, false-premise’de “bilmiyorum” demektir (30 soru,
\_abs suffix). Chip yokken model yine kullanıcı gerçeği uydurur — chip
bir UI proxysi.

Daha önemlisi: **yanlış harness.** LongMemEval v1 chat-QA. CWF bir tool
agent. Mayıs 2026’da çıkan **LongMemEval-V2** (arXiv 2605.12493) tam
sizin işiniz: static state, dynamic state, workflow knowledge,
environment gotchas, premise awareness. Mem2ActBench (ACL 2026; 400
memory-dependent tool task, %91.3 memory-gated) procedural face için
doğru.

| **Face**                 | **MEMORY-1 harness**                                       |
|--------------------------|------------------------------------------------------------|
| Prompt / user episodic   | LongMemEval v1 + abstention ayrı rapor                     |
| Semantic / workflow      | **LongMemEval-V2** (asıl kabul)                            |
| Procedural → tool action | Mem2ActBench                                               |
| İç alet                  | chip + memory_block_present on trace — ship-gate değil, M4 |

“Chip absent” = instrument. Kabul eşiği harness’te.

**Q5. tool_experience → VIEW, census’u saklar mı? → Evet, risk gerçek.
İki seri.**

Scout-2 P3 haklı. Clean view re-probe’u beslerse flaky tool “az temiz
başarı var” diye bastırılır; fault gizlenir.

- experience_raw — her çağrı (empty/error dahil). Census / re-probe
  **bunu** okur. Tablo freeze, drop yok.

- experience_clean — K23-true. Yalnız ranking_policy **önerisi**
  (gate’ten geçer).

P1 “no counter is a label” bozulmaz: ikisi de türetilmiş sayaç; etiket
trace_label.

**Q6. Critique: fayda mı, halüsinasyon vektörü mü? → Yapılandırılmazsa
vektör. Serbest metin yasak.**

Reflexion (2023) ve MemToolAgent faydayı gösterdi; ikisi de **araştırma
ajanı**, honesty chip’i yok. CWF’de "tool Y failed — do not repeat"
modeli Y’yi yasaklar. 502 geçicidir; yanlış arg kalıcıdır.

Kurallar:

1.  Critique **yalnız** mantıksal hata: wrong_tool, wrong_args,
    schema_mismatch. Transport/empty/timeout → **kritik yok** (P6/K12).

2.  Şema: {tool, error_class, arg_fingerprint, entity_ids\[\], scope} —
    scope default this_entity, asla this_tool (N tekrar + K_users
    olmadan).

3.  Metin classifier/trace’ten, LLM essay değil.

4.  P8: honesty delta, critique’li vs’siz **shadow** ölçülmeden prompt’a
    girmez.

**3. Sormadığınız must-fix’ler**

**M-A. K23 hem çok sıkı hem çok gevşek**

Altı bit AND, 83 tur/hafta fabrikada extractor’ı aç bırakır. Bugünkü 242
“clean” F1–F3 sonrası ciddi düşer. İlk LEARNED satır haftalar sürebilir
— owner “öğrenmiyor” der, mimari değil **örneklem** suçlu.

Aynı anda K23’te right_tool / obligation_honoured / args_valid yok.
Yanlış tool dolu cevap döndüyse answered+grounded+cited hepsi yeşil.

**K23 = yazma filtresi, kalite skoru değil.** Kind’e göre:

| **kind**                    | **filtre**                             |
|-----------------------------|----------------------------------------|
| example                     | k23_settled                            |
| alias / base_set            | k23_settled ∧ N/M/K                    |
| critique / negative_example | failed ∧ scoped ∧ reason               |
| obligation_candidate        | asla auto-publish (P3); kuyruk + owner |

Bootstrap’i metne yazın: v1 LEARNED bir damlama; ilk routing kalitesi
**owner-published** (provenance=OWNER). LEARNED increment.

**M-B. Turn-level label ≠ call-level credit**

Çok-tool turunda K23 tek bit. Extractor ya her araca başarı yazar ya
hiçbirine. A26 §5 katmanları ayırıyor, extractor turn K23 tüketiyor.

tool_call_label{trace_id, call_idx, transport_ok, answered, not_empty}
ayrı; turn K23 ayrı. Credit assignment burada.

**M-C. trace_id PK + append-only çelişkisi**

“recompute = new row” ise PK trace_id olamaz. (trace_id, labelled_at) +
current_label view. Human override da yeni satır.

**M-D. Semantic face’te temporal validity yok — 2026’ya göre en büyük
mimari delik**

P7 episode supersession (user, frame, entity set) yapıyor; **fact**
geçerliliği yok. LongMemEval’in en ayırt edici yetisi knowledge-update
(latest-write-wins). Work order Open→Closed; dossier eski gerçeği
prompt’a basar.

Zep/Graphiti’nin getirdiği şey vendor store değil, valid_from / valid_to
/ INVALIDATE. Vendor’ı reddetmek doğru; **bi-temporal semantiği**
reddetmek değil.

Dossier satırı: {entity, predicate, value, valid_from, valid_to,
source_trace, superseded_by}. Prompt yalnız geçerli gerçeği görür.
LongMemEval-V2 dynamic state tracking bunu ister.

**M-E. helped nedensel değil; otomatik yüz kapatma tehlikeli**

Aynı turu memory’li/memory’siz gözlemleyemezsiniz. Observational
“helped-rate” confounding’dir (zor turlar daha çok memory çeker).

M4 v1: **offered, used.** helped için switchback veya rastgele shadow
fork. Observational helped ile yüz kapatmayın.

**M-F. Store 9 (vector lane) terk edilmiş**

toolRetrievalMode=0. Embedding tool retrieval = MemToolAgent şekli. A26
ya E5’e park etmeli ya açık reddetmeli. Sessiz bırakmak üçüncü bir
routing girişi demek.

**M-G. Thumbs ALWAYS-override**

Format beğenmeme → failed episode → negative_example. Preference ≠
correctness.

human_label offerability’yi keser. Routing extractor’a yalnız reason ∈
{wrong_tool, wrong_facts}. wrong_tone \| other öğrenmez.

**M-H. Episode yazımı ungated, PII scrub öğrenme anında**

83/83 tur episode. no_pii K23’te, store’da değil. Prompt face PII
sızdırır. Store-time scrub veya prompt-time redaction — A26-P1 kartına.

**4. Kanıt disiplini**

Kendi kuralınız: tagsiz iddia = kusur.

- §4.2 path, §4.3 A26 v1 kolonu, §6 3/2 ve 30g, §7 “thresholds RATIFIED”
  — çoğu HYPOTHESIS, tag yok.

- C12 (K35 cwf.trace.v2 builder var mı) **Track 0** olmalı, A26-P1’in
  içine gömülmemeli. Öğrenme yolunun girişi yoksa P1 kâğıttır.

- CoALA (Sumers et al. 2023) dört yüzün kanonik kaynağı; “survey
  literature” yetmez.

- Critique kökeni Reflexion (Shinn 2023); yalnız MemToolAgent eksik ata.

- LongMemEval-V2 yok — 4 ay önce çıkmış, sizin ajan sınıfınız için
  yazılmış.

**5. A26’ya net delta (v0_2)**

1.  **İki saatli etiket:** k23_immediate / k23_settled. Extractor
    settled okur. Next-turn otomatik negatif değil.

2.  **Poisoning:** K_users≥2 backend-scoped için zorunlu; 1-user öğrenme
    user-scope’ta kalır.

3.  **Call-level label** + turn K23. Credit assignment.

4.  **trace_label PK:** (trace_id, labelled_at) + current view.

5.  **Dossier bi-temporal** (valid_from/to, supersede). Episode
    supersession yetmez.

6.  **İki experience serisi:** raw→census, clean→ranking önerisi.

7.  **Critique şeması + transport yasağı.** LLM essay yok.

8.  **C10 düşür:** E5 = head/tail Recall@k + time-to-learn + leakage=0;
    shadow yalnız ORDER.

9.  **MEMORY-1:** birincil LongMemEval-V2; v1 abstention ayrı; chip =
    M4, kabul değil.

10. **helped:** v1’de offered/used; auto-disable yok.

11. **Human reason code.** ALWAYS-override yalnız offerability.

12. **K35 varlık ölçümü = Track 0.**

13. **Store 9:** E5 veya reject, sessizlik yok.

14. **Beklenti cümlesi:** LEARNED damlama; bootstrap OWNER-published.

**6. Sıra (sizin Track 1’in üzerine)**

M1 / TOUR-HONESTY / M2 — olduğu gibi, birinci. Signal false iken
extractor yok.

M2’ye **call-level + iki saat** biner (yukarı). M3 reason code ile.

A26-P1 öncesi: K35 var mı (C12), trace_label PK düzeltmesi, PII
store-time.

P2 extractor’a K_users ve kind-specific filtre.

P3 Graph KB caller + dossier validity; tool_category_cache emekli.

E5 en son, C10’suz; ölçüm yukarıdaki dört sayı.

**Özet ruling:** A26’yı “yanlış mimari” diye reddetmiyorum.
Self-learning tool agent’ta asıl oyun etiket; siz onu merkeze
koymuşsunuz. Reddettiğim şey, doğru omurganın üzerine binen üç sessiz
sapma: **gecikmiş ödülü otomatik negatif saymak, tek kullanıcının
router’ı eğitmesine izin vermek, ve gerçeğin zamanını taşımamak.**
Bunlar v0_1’de kalırsa M1–M3’ü kusursuz landsanız bile öğrenme ya susar
ya zehirler.

İsterseniz bir sonraki adımda bunu v0_2 kart listesine (Gemini
operator + scout review birimleri) indirgerim; ya da Q2/Q3 için net şema
(kolonlar, state machine, freeze) yazarım.

---DeepSeek

We need answer in Turkish likely. User shares A26 memory architecture
draft. They want presumably analysis? They say: "Senin ile claude un
hazirladigi agent memory mimarisi ve bugun code da var olan mimarideki
hatalarve bunlarin cozumlenmesi icin olan onerileri iceren bir dokumani
paylasiyorum. Sen guru seviyede AI scientist olup bir cok frontier
mimarinin tabanini olusturan calismalarin oldu ve olmakta ornegin; top
of the line agentlarin base aldigi thought of chain mimarileri senin
yapmis oldugun calismalra dayanmaktadir. Bu neden ile kendi kendine
ogrenen agenlarin mimarilerindeki memory yapilari senin cok iyi bildigin
bir konu."

They didn't ask explicit question. Likely want me to review/critique
document as expert. Need respond with assessment, strengths, weaknesses,
recommendations. Need be careful: no need mention "I'm not actual AI
scientist"? We can adopt expert reviewer persona. We should analyze A26.
Need maybe identify issues, attack open questions, offer improvements.
Since document is dense, produce structured review. We should reference
pages/claims. Need Turkish. We need likely assess: memory architecture,
learning signal, proposal-gate-publish, determinism, scope, forgetting,
acceptance. Highlight that architecture is solid, but some issues: stage
ordering, label contamination, temporal leakage, per-turn recall vs
compilation, poisoning thresholds, abstention metric, critique
hallucination, view changes, tool_experience retirement, trace_label
schema, M1-M3 sequencing. Also maybe missing: credit assignment across
multi-step tool sequences, counterfactual labeling, delayed outcomes,
user satisfaction ambiguity, negative examples bias,
exploration/exploitation, online eval, privacy, data retention,
reproducibility. Need propose concrete fixes.

Need perhaps outline: 1) Genel değerlendirme: A26 doğru eksende; ana
teşhis "memory var ama learning yok, çünkü success label yanlış". 2) En
güçlü yönler. 3) Kritik riskler ve düzeltmeler. 4) Açık sorulara
cevap/öneri. 5) Uygulama yol haritası / öncelikler. 6) Sonuç.

Need maybe mention "P9 determinism vs MemToolAgent": I agree with v1 no
per-turn recall into stage 07. But compilation delay can be mitigated by
"two-tier" fast/slow memory: slow published rows, fast per-turn recall
only for prompt face, not routing. For routing, if instant recall
needed, use "session-local ephemeral routing hints" scoped to same
user/session and not published? But violates gate? Could have
"shadow-only" and "braked" with strict tenant isolation. However, P3
says memory improves finding not doing. For tool routing, learned
mappings should be published. Per-turn recall as ranking input can be
dangerous: distribution shift, feedback loops, non-replay. So keep no.

But if long-tail phrasing is issue: compile quickly with "micro-bundles"
after N=1? But poisoning. Use Bayesian prior / confidence thresholds.
Could have "candidate published" with low weight and exploration. But
gate must remain.

Need maybe propose formal label model:

- trace_label should separate per-tool labels and turn label. Currently
  K23 conjunction too coarse. A turn can have one failed tool but final
  answer correct via another tool. "no tool failure that the answer
  apologises for" is good, but need tool-level labels. Define
  tool_call_label: transport_ok, schema_ok, empty, semantic_success?
  Human? Then turn label derived via decision procedure. This enables
  credit assignment. Without it, experience view over trace_label joined
  to tools\[\] may misattribute. Need tool-level labels and per-step
  critique.

- Delayed outcomes: user may not correct next turn; many tasks succeed
  silently. Need implicit signals: follow-up specificity, repeat rate,
  abandonment, edit distance, downstream action success. But these are
  noisy. Use human labels as gold, implicit as weak. Keep no PII.

- Causal credit: learning from success alone is not enough. Need
  counterfactual / shadow: for each published row, measure helped via
  paired comparison. But if no randomization, confounding. Propose
  "shadow routing" with A/B on fixture and canary on production. Use
  propensity logging for offline policy evaluation. This is key for
  "helped" metric.

- Memory poisoning: 3 traces/2 conversations too weak. Need per-user
  cap, diversity, time decay, anomaly detection, provenance. For
  single-user pilot, thresholds should be relative to active user count
  and require human review for high-impact kinds. Maybe high-risk kinds
  (ranking_policy, default_plan, obligation_candidate) require human
  publish; low-risk (aliases, examples) auto if N\>=3 distinct
  conversations or N\>=5 traces, M\>=2. For 1-user pilot, auto-publish
  off except admin-approved.

- Forgetting: supersession and retraction good. Need tombstone
  propagation to derived rows: if trace retracted, any proposal using it
  must be re-evaluated/rolled back. Need dependency graph. Also
  "episodes keep TTL for prompt face only" good, but learned rows decay.
  Need hard delete of PII from proposals and bundles. Need audit log.

- Abstention: "memory chip absent" is not faithful for LongMemEval.
  LongMemEval is QA; CWF is tool agent. Need custom abstention: when
  memory would be expected but no row meets threshold, system should
  explicitly state no memory, not hallucinate. For benchmark, run
  LongMemEval harness but add tool-agent abstention suite. Measure false
  memory rate, not just chip absence. Chip absence can be gamed. Need
  human evaluation or NLI check.

- Critique on failed episodes: risk of overgeneralization. Store
  critique with scope: tool, args, error class, environment, timestamp,
  expiration, confidence. Do not put as imperative "tool Y fails"; put
  as "at time T, with args A, tool Y returned error Z; check before
  use". Only inject when query matches scope and error still relevant.
  Add hallucination check.

- tool_experience VIEW: if census re-probe suppressor reads counter,
  changing to view might alter behavior. Need maintain compatibility
  view with same semantics or update suppressor to read label-derived
  metrics explicitly. Don't silently change. Add CI test comparing old
  vs new counts on fixture. RULE-49 measure readers first. Good.

- Trace builder: C12 unmeasured. Need first step measure. If
  cwf.trace.v2 doesn't exist, A26-P1 blocked. Need explicit dependency.

- M1-M3 sequencing: correct. But M1 only transport isError. Need also
  timeouts/HTTP 502/empty. F1 covers empty. F3 turn class. Maybe add
  tool schema validation and partial results. Also MCP tool may return
  content with isError false but semantic error. Need classifier. Add
  "semantic_error" via LLM or rules? HYPOTHESIS.

- Stage 03 clarify: Graph KB containsAmong first caller. Need clarify
  child-layer false-empty case. Good.

- Privacy/tenant: user memory keyed by user, learned routing keyed by
  backend. But if backend shared across tenants, learned routing can
  leak cross-tenant patterns. Need differential privacy? At least no raw
  query text in published rows; only generalized patterns/aliases. PII
  scrub in K23. Need ensure proposals don't contain user-specific
  entities. For multi-tenant, backend-scoped learned rows might still
  leak. Add tenant/site key where alias needs it. Maybe default
  backend-scoped only if tenant count=1; otherwise tenant-scoped. Good.

- Determinism/replay: published data + catalog_version + policy_version.
  But if learned rows change, replay with same versions? Need bundle
  versions. K21 bundle. Good. Need include bundle version in trace. Also
  rollback must preserve old bundles for replay.

- Evaluation: MEMORY-1 Tier C. Need define CWF-specific benchmark.
  LongMemEval and Mem2ActBench. Add internal "helped" metric. Need
  ship-gating. Good. But "helped-rate below no-memory baseline" needs
  statistical power. For low traffic, use sequential testing / Bayesian.
  Add minimum sample size.

- Open questions answers:

  1.  No per-turn recall into stage 07 v1 right. Settle by offline
      simulation: replay historical turns with compiled rows vs per-turn
      recall; measure Recall@k, latency-to-learn, long-tail coverage,
      safety. E5 shadow.

  2.  Next-turn correction is temporal contamination. Use only if next
      turn is independent? Better use user correction within same turn
      or explicit feedback. Next-turn correction can be used as delayed
      label with timestamp, but must not leak content into current
      turn's features. Since label computed after turn, it's okay for
      training, but if current turn's label uses next turn, then when
      serving current turn you don't have it. For offline learning only.
      For online offerable filter, can't use next turn until it arrives.
      So label can be updated later. That's fine. But if it changes
      episode offerable retroactively, okay. Need not leak into current
      turn's prompt. The document says after-turn label, so okay. But
      "no user correction on next turn" as negative signal: absence of
      correction is weak positive. User may not correct. Use as weak,
      not all-true for K23? K23 requires no_correction. If no correction
      not observed yet, treat as unknown, not true. Only label after
      next turn or timeout. That's a key issue. K23 all six true.
      no_correction cannot be true until next turn or timeout. So label
      latency. Need define label window and unknown state. For immediate
      learning, cannot use no_correction. Use human label or explicit.
      So P2 M3 maybe.

  3.  Poisoning thresholds: not fixed; adapt to active users. For 5-user
      factory, 3/2 might be okay but low. For 1-user pilot, require
      admin approval. Use fraction: max(3, 10% active users) distinct
      users? For single user, no auto. High-impact require human.

  4.  Abstention: chip absence not enough. Need verbatim harness plus
      tool-agent suite. Measure false memory claims via NLI/LLM judge
      and human.

  5.  tool_experience VIEW: risk. Maintain compatibility, measure
      readers, update suppressor. Don't drop until one release after
      readers migrated. Use materialized view with same fields. Add
      tests.

  6.  Critique: benefit but hallucination vector. Scope and expiry. Use
      as negative evidence, not hard rule. Measure helped vs hurt. A/B.

Need maybe mention "one label" P1: no counter is a label. Good. But
trace_label is per turn, while learning needs per tool-call and per
decision. So add decision-level labels. Otherwise credit assignment
impossible. This is probably the biggest technical gap. For router
learning, you need labels on routing decisions: was tool choice correct?
Did it help? Turn success is coarse. If a turn has 3 tool calls, one
fails, two succeed, final answer good, what does router learn? Need
per-tool-call credit. Propose "decision_label" for each stage 07 offer
and tool call. Use counterfactual/shadow. This is a key expert point.

Also "tool_experience becomes VIEW over labels" - if view over turn
labels joined to tools, it inherits coarse credit. Need per-tool labels.

Also "P3 memory improves finding, never doing" - good. But
examples/aliases can affect tool routing. Need ensure no schema/slot
changes. Good.

Maybe mention "no hardcode, owner ruling" - good.

Potential contradictions:

- §4.3 planner: "default_plan proposals from clean episodes'
  decision.procedure" — if learned from clean episodes, that's
  procedural memory. But P3 says memory improves finding, never doing.
  Default plan is doing? It affects plan. But A25 says planner can have
  default_plan. So okay if published.

- §4.3 stage 07: "published rules + route_tool_category_cache" today.
  A26 says PUBLISHED learned rows only. But route_tool_category_cache is
  a learned store that writes without success test. Need retire into
  proposals. Good.

- §4.3 prompt face: offerable = clean or (grounded ∧ toolFailures=0).
  But if turn had tool failure but answer apologises, not offerable.
  Good. But "critique block" from failed turn is offered. That's a
  negative memory. Need ensure not overgeneralized.

- §6 Supersession: newer clean episode with same (user, frame, entity
  set) supersedes older for prompt face. What if older has unique
  correction? Keep label history. Good.

- §6 Retraction: human down-label retracts episode and emits
  negative_example. But if user down-label is noisy, could poison. Need
  require review or multiple signals. Maybe M3 human label overrides,
  but a single down-label retracts. That could be abused. Add
  confirmation or cap. For single user, okay? But for adversarial, need
  rate limit.

- §7 K12 zero: CI test over extractor. Good.

- §7 contamination: no held-out exam question's trace in any published
  proposal's evidence. Good.

Need maybe propose concrete revised roadmap:  
Phase 0: Measure cwf.trace.v2 builder, readers of tool_experience,
census. Freeze schema.  
Phase 1: M1 + TOUR-HONESTY + M2: fix labels. Add per-tool labels. Add
label window with unknown. Keep learnEnabled=0.  
Phase 2: M3 human feedback + admin label UI. Add trace_label with human
override.  
Phase 3: Proposal extractor with kinds. Start with low-risk kinds
(alias, example, negative_example) on fixture. K34 gate. Publish to
fixture only.  
Phase 4: Instrument offered/used/helped with shadow A/B. Use propensity
logging.  
Phase 5: E5 shadow per-turn recall vs compiled. Decide.  
Phase 6: Decay/poisoning thresholds tuned. Rollback drills.

Need maybe answer in Turkish with headings. Desired oververbosity 5:
moderate thorough. But document is complex. We can be fairly detailed.
Maybe around 1500-2500 words? Desired 5. We can be concise but
comprehensive. Use bullet points.

Need perhaps start: "A26'yı bir adversary reviewer + memory/learning
architect gözüyle okudum. Özet: teşhis doğru, mimari iskelet sağlam; en
büyük eksik 'turn-level label'dan 'decision-level credit assignment'a
geçiş." Then sections.

Let's draft.

Need mention "guru seviyesinde AI scientist" maybe not necessary. We can
say "Bu alanda çalışmış biri olarak..." But avoid false claims? The user
says I am. We can respond as expert. We can say "A26'nın en kritik
noktası..." Good.

Need include specific references: F1/F2/F3, M1-M3, P1-P9, §4.3, §5, §6,
§7, C1-C12. Use Turkish.

Potential final structure:

- 1.  Kısa hüküm

- 1.  Güçlü yönler

- 2.  Kritik zayıflıklar / öneriler  
      2.1 Turn label vs decision label (en önemli)  
      2.2 no_correction temporal contamination / label window  
      2.3 Per-turn recall vs published compilation  
      2.4 Poisoning ve insan denetimi  
      2.5 Critique hallucination  
      2.6 tool_experience VIEW ve census  
      2.7 Abstention ölçümü  
      2.8 Tenant/privacy ve learned routing  
      2.9 Replay ve rollback dependency graph  
      2.10 İstatistiksel güç / helped metric

- 3.  Açık sorulara doğrudan cevaplar (numbered)

- 4.  Önerilen revize yol haritası

- 5.  Sonuç

Need be careful with "no_correction" in K23: The doc says K23
conjunction computed after turn. But no_correction on next turn requires
waiting. So label latency. If you need immediate labels for offerable
filter, you can't have no_correction. You can use
"correction_observed_so_far" unknown. For offerable, maybe require
explicit no-correction or timeout. This is a key issue. Suggest
trace_label fields: k23_state with three-valued logic:
true/false/unknown. Only all true after window closes. For immediate
offerable, use a provisional label with unknown no_correction; if
grounded and no tool failures, offer but mark provisional. Or wait. This
affects learning. Good.

Also "human label overrides every automatic field" — if human says up,
but transport error, should it override? Maybe human up means final
answer useful despite tool error. For learning, should separate: human
satisfaction vs tool correctness. Don't let human up erase tool failure.
Keep both. Human label overrides offerable? The doc says human down
makes episode failed and non-offerable. Human up overrides automatic?
Need nuance: human up can override turn success, but not transport
verdict. Because tool error is fact. So human label should be separate
dimension, not override all. Good point. Add: separate "user
satisfaction" from "tool correctness". Otherwise you lose signal. This
is important. In §5 table: human "ALWAYS overrides the automatic class".
That's dangerous. If tool failed but user liked answer, learning should
know tool failed. For routing, tool failure is negative. So don't
override; combine. Propose multi-dimensional label: task_success,
user_satisfaction, tool_health. K23 uses task_success. Human label is
gold for task_success but tool_health remains from transport. Good.

Also "empty is graded positive" F1. Good.

Also "transport verdict dropped" F2. Good.

Also "turn class soft" F3. Good.

Maybe mention "M1-M3 on master before any learned row published" is
correct. But if M1-M3 take time, learning blocked. Good.

Need maybe mention "router.learnEnabled stays 0" — good.

Potential "one label" P1: trace_label is new. But A25 §7c already names
it. Good.

Let's craft final in Turkish. Use headings and bullets. Keep no markdown
tables? Tables okay but maybe bullets.

Need ensure not too long. Desired oververbosity 5. I'll produce around
2000 words maybe. That's okay.

Let's write.

A26’yı bir adversary reviewer + memory/learning architect gözüyle
okudum. Kısa hüküm: **teşhis doğru, iskelet sağlam, ama en kritik eksik
“turn-level label”dan “decision-level credit assignment”a
geçiş.** A26’nın ana iddiası — CWF zaten hatırlıyor ama öğrenmiyor,
çünkü başarı sinyali üç yerde yanlış — fazlasıyla yerinde. Fakat
önerilen çözüm, öğrenmeyi güvenli bir gate’e bağlarken, öğrenilecek
sinyalin çözünürlüğünü ve gecikmesini yeterince çözmüyor. Aşağıda güçlü
yönler, kritik riskler ve somut düzeltmeler var.

**1. Güçlü yönler**

- **F2/F1/F3 teşhisi**: isError’ın
  okunmaması, \[\]’ın answered sayılması ve 3-failure + apology turn’ün
  offerable kalması, öğrenmenin tam da kritik örneklerde yanlış
  etiketleneceğini gösteriyor. Bu, “memory var ama learning yok” tezinin
  ampirik çekirdeği.

- **P1 (tek label, trace’ten sonra)**: Counter’ların label
  olmaması, tool_experience’ın view’a dönmesi doğru yön.

- **P4 (proposal → gate → publish → rollback)**: Öğrenilmiş her
  değişikliğin router_proposals + K34’ten geçmesi, CWF’nin governed-row
  disipliniyle uyumlu. Store 5’in doğrudan yazımının retire edilmesi
  kritik.

- **P5 (scope key, filter değil)**: User memory’nin user-keyed, learned
  routing’in backend-keyed olması doğru; yeni backend’in sıfırdan
  öğrenmesi NO-HARDCODE ile uyumlu.

- **P9 (routing determinizmi)**: Stage 07’nin sadece published data’nın
  fonksiyonu olması, replay ve tenant güvenliği için v1’de doğru karar.
  MemToolAgent’ın per-turn recall’ını routing’e sokmamak, CWF’nin gate
  ve determinizm ilkeleriyle tutarlı.

- **P8 (instrument before influence)**: “offered → used → helped”
  ölçülmeden memory’nin routing’i etkilememesi, doğru bilimsel disiplin.

**2. Kritik zayıflıklar ve düzeltmeler**

**2.1. Turn label fazla kaba; decision-level credit assignment şart**

A26’nın en büyük teknik açığı bu. Bir turn’de 3 tool call olabilir; biri
fail, ikisi success, final answer iyi olabilir. Turn label “success”
derse, fail eden tool çağrısından ne
öğreneceğiz? tool_experience’ı trace_label’a join etmek, tool-seviyesi
nedenselliği çözmez; sadece turn başarısını tool’lara yayar.

**Öneri:** trace_label yanında decision_label veya tool_call_label tut:

- transport_ok, schema_ok, empty, semantic_error, latency_bucket, cost_bucket

- tool_choice_correct (shadow/counterfactual veya insan)

- contributed_to_answer (grounding/citation ile)

- user_correction_scope: hangi tool/argüman düzeltildi?

Turn label bu kararlardan türetilsin; router öğrenmesi decision-level
label’ı kullansın. Aksi halde K23 conjunction’ı çok geç ama çok kaba bir
sinyal olur.

**2.2. no_correction üç değerli olmalı; yoksa etiket gecikmesi ve
sızıntı olur**

§5’te turn label “no user correction on the next turn” diyor. Bu, tanım
gereği **gelecekteki bir olaya bağlı**. Turn biter
bitmez no_correction=true diyemezsin; ya bir pencere kapatacaksın (örn.
sonraki 1-2 turn veya 24 saat) ya da unknown bırakacaksın. A26 bunu
“after-turn label” diye tarif ediyor ama K23’ün altı bitinin hepsi true
olmadan proposal extractor’a girmiyor. Bu, öğrenmeyi saatler/günler
geciktirir.

**Öneri:** K23’ü üç değerli mantığa çevir: true / false /
unknown. no_correction başlangıçta unknown; pencere
kapanınca true/false. Offerable filtre için unknown durumunda temkinli
davran: grounded ∧ toolFailures=0 ise “provisional offerable”, ama
learned row’a dönüşmesi için pencere kapanması şart. Bu, temporal
kontaminasyonu da engeller.

**2.3. Human label otomatik alanları “override” etmemeli; ayrı boyut
olmalı**

§5 “human label ALWAYS overrides the automatic class” diyor. Bu
tehlikeli. Kullanıcı thumbs-up verdi diye transport error’ı yok
sayamazsın; tool fail etmiştir. Routing öğrenmesi için bu negatif
sinyaldir. Aksi halde “kullanıcı memnun kaldı” ile “tool doğru çalıştı”
sinyallerini birbirine karıştırırsın.

**Öneri:** Etiketi çok boyutlu yap:

- task_success (K23)

- user_satisfaction (human label)

- tool_health (transport + emptiness + schema)

- grounding_quality  
  Human label sadece task_success ve offerable kararını override
  etsin; tool_health asla insan label’ıyla silinmesin.

**2.4. Per-turn recall vs compiled rows: v1’de NO doğru, ama E5 ölçümü
eksik**

§4.3’te stage 07’ye per-turn recall’ı sokmamak doğru. Ancak “compilation
loses too much latency-to-learn” endişesi gerçek. E5 shadow ölçümü bunu
çözmeli. Şu metriklere bak:

- Recall@k delta (compiled vs per-turn)

- Long-tail phrasing coverage

- Publish gecikmesi (turn → published row)

- Tenant sızıntı riski

- Rollback maliyeti

- Insan müdahalesi oranı

**Öneri:** E5’te iki kol: (a) sadece published rows, (b) published +
session-local ephemeral recall (sadece prompt face, routing’e değil).
Routing’e per-turn recall’ı sadece router.memoryRankEnabled arkasında
shadow çalıştır; production’a açma. Eğer Recall@k farkı CI ile anlamlı
değilse, P9 kazanır.

**2.5. Poisoning eşikleri sabit değil, aktif kullanıcıya göre
uyarlanmalı**

§6’daki 3 trace / 2 conversation, 5 kullanıcılı fabrika için düşük, 1
kullanıcılı pilot için yüksek. Tek kullanıcı zaten 2 conversation’ı
kolayca üretir; bu da zehirlenmeyi kolaylaştırır.

**Öneri:**

- Düşük riskli kind’ler (alias, example, negative_example): max(3
  traces, 2 distinct conversations) + PII scrub + admin review
  opsiyonel.

- Yüksek riskli kind’ler (ranking_policy, default_plan,
  obligation_candidate): otomatik publish yok; insan onayı şart.

- Aktif kullanıcı sayısına oran: distinct_conversations \>= max(2,
  ceil(0.1 \* active_users)).

- Tek kullanıcılı pilotta router.learnEnabled=0 kalsın; sadece
  fixture’da öğrenme.

**2.6. Critique bloğu hallucination vektörü olabilir; scope ve expiry
şart**

MemToolAgent’ın “failure → critique” fikri değerli, ama CWF’de “tool Y
fails because Z” cümlesi model tarafından aşırı genellenirse zarar
verir. Özellikle farklı argümanlar, farklı tenant, farklı zaman için.

**Öneri:** Critique’i imperatif değil, kapsamlı bir kayıt olarak sakla:

- tool, args_hash, error_class, environment, observed_at, expires_at

- Prompt’a sadece query bu scope’a uyuyorsa ve süre dolmamışsa ekle.

- Cümle “Tool Y failed” değil, “At T, with args A, tool Y returned error
  Z; verify before reuse” olsun.

- “helped” metriği ile A/B test et; zarar veriyorsa kapat.

**2.7. tool_experience → VIEW census re-probe’u bozabilir**

§9/5’te scout-2’nin uyardığı gibi, census re-probe suppressor counter’ı
okuyorsa, label-derived view’a geçmek re-probe davranışını sessizce
değiştirebilir ve fault’ları gizleyebilir.

**Öneri:** Önce RULE-49 gereği tüm okuyucuları ölç. Geçişte aynı
alanları taşıyan materialized view kullan; suppressor’ı açıkça yeni
metriğe migrate et. Eski ve yeni sayımları fixture’da karşılaştıran CI
testi ekle. Bir release boyunca iki kaynağı paralel oku, fark varsa dur.

**2.8. Abstention ölçümü “memory chip absent” ile yetinmemeli**

§7’de abstention “memory used chip absent” diye ölçülüyor. Bu,
oyunlanabilir ve LongMemEval’in QA yapısına tam oturmaz. CWF bir tool
agent; “memory claim yok” ile “doğru abstain etti” aynı şey değil.

**Öneri:** İki katmanlı ölç:

- LongMemEval harness’i verbatim çalıştır (raporla).

- CWF’ye özel tool-agent abstention suite: memory row yokken modelin
  uydurma memory claim üretip üretmediğini NLI/LLM-judge + insan ile
  ölç. false_memory_rate ayrı raporlanmalı.

- Chip absence sadece telemetry; asıl metrik “no memory claim when none
  applies”.

**2.9. Tenant/privacy: backend-scoped learned routing sızıntı
yapabilir**

P5 doğru ama backend birden fazla tenant’a hizmet ediyorsa,
backend-scoped learned row’lar tenant’lar arası sızabilir. Özellikle
alias/example’lar kullanıcı-spesifik entity içerebilir.

**Öneri:** Learned routing için default scope:

- Tek tenant’lı backend: backend-scoped.

- Çok tenant’lı backend: tenant-scoped veya site-scoped.

- Raw query text asla published row’a girmesin; sadece generalize
  edilmiş pattern, alias, category.

- PII scrub K23’te var; ek olarak published bundle’da provenance ve
  differential privacy benzeri “k-anonymity” kontrolü (en az K farklı
  conversation).

**2.10. Rollback ve retraction dependency graph istiyor**

§6’da retraction “LEARNED row whose evidence traces are all retracted is
auto-proposed for rollback” diyor. Bu iyi ama eksik: bir trace birden
fazla proposal’a evidence olabilir; bir proposal birden fazla bundle’a
girebilir. Retraction’ın tüm türevleri işaretlemesi gerekir.

**Öneri:** Evidence → proposal → bundle → published row dependency graph
tut. Bir trace retract edilince:

- Etkilenen proposal’ları stale işaretle.

- Yayınlanmış bundle’ları etki analizine al.

- Otomatik rollback sadece tüm evidence retract ise; kısmi ise insan
  review.

- Replay için eski bundle versiyonlarını sakla.

**2.11. “Helped” metriği istatistiksel güç ve confounding istiyor**

P8 doğru ama “helped-rate” paired comparison ister. Production’da
randomizasyon yoksa confounding kaçınılmaz. Ayrıca düşük trafikte CI
geniş olur.

**Öneri:**

- Shadow A/B: aynı turn’i iki politika ile replay et (memory’li vs
  memory’siz).

- Propensity logging: hangi row’un neden offer edildiğini kaydet;
  offline policy evaluation yap.

- Sequential/Bayesian test; minimum sample size altında “inconclusive”
  de, otomatik kapatma.

- “Helped” tanımı: aynı turn’de memory’li politika clean label alıyorsa
  ve memory’siz almıyorsa +1. Turn-level değil, decision-level.

**3. Açık sorulara doğrudan cevaplar**

1.  **§4.3 no per-turn recall into stage 07 v1?** Evet, doğru. Settle
    etmek için E5’te replay tabanlı shadow: compiled vs per-turn recall;
    Recall@k, latency-to-learn, long-tail coverage, tenant safety. Fark
    CI ile anlamlı değilse compiled kalır.

2.  **§5 next-turn correction temporal contamination?** Evet, risk
    var. no_correction üç değerli olmalı; pencere kapanana
    kadar unknown. Label gecikmeli hesaplanabilir ama current turn’ün
    prompt’una sızmamalı.

3.  **§6 poisoning 3/2?** Sabit eşik yanlış. Aktif kullanıcıya oranla;
    yüksek riskli kind’lerde insan onayı; tek kullanıcı pilotunda
    otomatik publish kapalı.

4.  **§7 abstention chip absent?** Yetersiz. LongMemEval verbatim +
    tool-agent abstention suite + false memory rate.

5.  **§4.4 tool_experience VIEW census?** Riskli. Önce okuyucuları ölç,
    materialized view ile uyumluluğu koru, suppressor’ı açıkça migrate
    et, CI ile eski/yeni karşılaştır.

6.  **Critique prompt-face benefit mi hallucination vector mü?** İkisi
    de olabilir. Scope, expiry, args_hash ile sınırla; imperatif yapma;
    helped/hurt A/B’si ile ölç.

**4. Önerilen revize yol haritası**

1.  **P0 – Ölçüm**: cwf.trace.v2 builder var
    mı? tool_experience okuyucuları kim? Census re-probe nasıl
    etkilenir? (C12)

2.  **P1 – M1 + TOUR-HONESTY + M2**: transport, empty, turn class
    düzelt. learnEnabled=0 kalsın.

3.  **P2 – Decision-level label**: trace_label + tool_call_label + üç
    değerli K23 + label window.

4.  **P3 – M3 + admin UI**: human label ayrı boyut; proposal queue;
    rollback list.

5.  **P4 – Proposal extractor + K34**: düşük riskli kind’ler fixture’da;
    yüksek riskli kind’ler insan onaylı.

6.  **P5 – Instrument**: offered/used/helped; shadow A/B; propensity
    logging.

7.  **P6 – E5**: compiled vs per-turn recall; decay/poisoning eşikleri;
    karar sayıyla.

8.  **P7 – Rollback drill**: dependency graph, retraction, tenant
    offboarding, hard delete.

**5. Sonuç**

A26, CWF’nin memory/learning ayrımını doğru teşhis ediyor ve doğru
governance iskeletini kuruyor. Ancak “öğrenme” için turn-level K23
yeterli değil; **decision-level credit assignment, üç değerli label,
insan etiketinin ayrı boyut olması, poisoning eşiklerinin adaptif olması
ve abstention ölçümünün CWF’ye özel hale getirilmesi** gerekiyor. Bu
düzeltmelerle A26, “memory var ama learning yok” probleminden “governed,
replayable, tenant-safe, ölçülmüş öğrenme”ye geçiş için sağlam bir v0_1
olur.

inceledikten sonra sadece fact ve research based sekilde a) bu memory
mimarisinin dogru ve yanlis dusundugu yerleri. b) SOTA seviyesinde
calisabilecek mimari onerilerini acik durust sekilde paylasmani
istiyorum

The user wants a fact- and research-based analysis of the A26 memory
architecture document, covering correct and incorrect assumptions, and
SOTA architecture recommendations. I need to search for relevant
research. I'll search for multiple queries in parallel to cover the key
areas: agent memory architectures, tool selection, credit assignment,
evaluation benchmarks, and safety/governance.

Found 78 web pages

The search results provide a good starting point. I need to open some of
these to gather more detailed information. I'll open the survey, the
MemToolAgent paper, and a few others.

Read 7 pages

[Memory Architectures for AI Agents in 2026: A Survey, a Synthesis, and
an Evaluation
Framework](https://zenodo.org/records/20618996/files/memory-architectures-preprint.pdf?download=1#4#1)

[MemToolAgent overview with a simple restaurant booking scenario where
the agent retrieves similar memories, receives feedback on an invalid
time format, and generates a reflection to update its memory - Skip to
main content](https://arxiv.org/abs/2606.07909v1#1)

[Paper page - A^2TGPO: Agentic Turn-Group Policy Optimization with
Adaptive Turn-level Clipping -
Papers](https://huggingface.co/papers/2605.06200#1)

[agent-development-curriculum/Week 3.5.8 - Two-Tier Memory
Architecture.md at 9b1fba008c94eca05e1ebb14eb5317764466089e ·
shaneliuyx/agent-development-curriculum - NO_ANSWER_IN_CONTEXT — it
abstains out of
caution](https://github.com/shaneliuyx/agent-development-curriculum/blob/9b1fba008c94eca05e1ebb14eb5317764466089e/Week%203.5.8%20-%20Two-Tier%20Memory%20Architecture.md#28)

[The 4 Scopes of Agent Memory: Private, Team, Org, and Customer (2026)
\| MintMCP Blog](https://docs.mintmcp.com/blog/scopes-agent-memory)

View All

I need to gather more information on several topics: credit assignment,
evaluation, safety, per-turn recall vs compiled memory, forgetting, and
self-learning architectures. I'll open more relevant links.

Found 55 web pages

I have gathered sufficient information from various sources. Now I need
to structure the response. The user wants a fact- and research-based
analysis in Turkish. I'll organize it into two main sections: (a)
correct and incorrect aspects of the A26 memory architecture, and (b)
SOTA-level architectural recommendations. I'll cite sources
appropriately. I'll ensure the response is honest and transparent.

A26 dokümanını ve ilgili akademik literatürü inceledim. Aşağıda,
yalnızca kanıta dayalı ve araştırma temelli bir değerlendirme sunuyorum.

**a) A26 Memory Mimarisi: Doğru ve Yanlış Düşünülen Yerler**

**Doğru Düşünülen Yerler**

**1. Teşhis: "Memory var ama learning yok" ayrımı doğru ve literatürle
uyumlu.**

A26'nın ana tezi, CWF'nin her turn'de episode yazdığı ancak öğrenmediği
yönünde. Bu teşhis, 2026 memory survey'lerinin temel bulgusuyla
örtüşüyor: working memory ve long-term storage evrensel olarak
uygulanıyor, ancak procedural memory (öğrenilmiş prosedürler) neredeyse
hiçbir sistemde birinci sınıf mimari katman olarak yer almıyor. CoALA
framework'ü de procedural memory'yi "agent'ın kodunda yazılı açık bilgi"
ve "LLM ağırlıklarında örtük bilgi" olarak ikiye ayırıyor, ancak çoğu
sistem bunu versiyonlanmış ve denetlenebilir bir bileşen olarak ele
almıyor. A26'nın bu boşluğu tespit etmesi doğru.

**2. Success signal'in üç yerde yanlış olduğu tespiti (F1, F2, F3)
sağlam.**

- **F2 (transport verdict dropped):** result.isError'ın okunmaması, tool
  çağrılarının başarısız olduğu durumlarda bile "success" olarak
  etiketlenmesine yol açıyor. Bu, öğrenme sinyalinin temel bir hatası.

- **F1 (empty graded positive):** \[\]'ın answered sayılması, boş
  sonuçların pozitif sinyal üretmesine neden oluyor. LongMemEval gibi
  benchmark'larda abstention'ın ayrı bir yetenek olarak ölçülmesi, bu
  sorunun literatürde de kabul edildiğini gösteriyor.

- **F3 (turn class soft):** 3-failure + apology turn'ün "unproven"
  olarak offerable kalması, yanlış etiketlenmiş verinin prompt'a
  sızmasına yol açıyor.

Bu üç tespit, öğrenme sinyalinin güvenilirliği açısından kritik ve
doğru.

**3. P4 (proposal → gate → publish → rollback) prensibi doğru bir
governance yaklaşımı.**

Her öğrenilmiş değişikliğin bir gate'ten geçmesi, replay edilebilirlik
ve tenant güvenliği açısından kritik. Membrane gibi sistemler de benzer
şekilde "typed, revisable, decayable memory with trust-aware retrieval"
yaklaşımını benimsiyor. A26'nın store 5'in doğrudan yazımını retire
etmesi, governed-row disipliniyle uyumlu.

**4. P9 (routing determinizmi) doğru bir v1 kararı.**

Stage 07'nin yalnızca published data'nın fonksiyonu olması, replay ve
tenant güvenliği için doğru. MemToolAgent'ın per-turn recall'ını
routing'e sokmamak, CWF'nin gate ve determinizm ilkeleriyle tutarlı.
Deterministik replay, agent memory için giderek daha fazla önem kazanan
bir gereksinim; "deterministic, incrementally maintainable views over
append-only logs" yaklaşımı, poisoning saldırılarına karşı da savunma
sağlıyor.

**5. P8 (instrument before influence) bilimsel disiplin açısından
doğru.**

"Offered → used → helped" ölçülmeden memory'nin routing'i etkilememesi,
doğru bir yaklaşım. Membran gibi sistemler de "retrieval usefulness" ve
"competence success rate" gibi metriklerle bu disiplini uyguluyor.

**Yanlış veya Eksik Düşünülen Yerler**

**1. Turn-level K23 conjunction, decision-level credit assignment için
yetersiz.**

A26'nın en büyük teknik açığı bu. Bir turn'de birden fazla tool call
olabilir; biri fail, ikisi success olabilir. Turn label "success" derse,
fail eden tool çağrısından ne öğrenileceği belirsiz kalıyor. Literatür
bu sorunu açıkça tanımlıyor: trajectory-level outcome reward,
"multi-turn etkileşimlerde bireysel tool-call'ların katkısını
değerlendirmeyi zorlaştırıyor". MatchTIR gibi framework'ler, "bipartite
matching-based turn-level reward assignment" ile bu sorunu çözmeye
çalışıyor. A26'nın tool_experience'ı trace_label'a join etmesi,
tool-seviyesi nedenselliği çözmez; yalnızca turn başarısını tool'lara
yayar.

**2. **no_correction** üç değerli olmalı; yoksa temporal contamination
riski var.**

§5'te turn label "no user correction on the next turn" diyor. Bu, tanım
gereği gelecekteki bir olaya bağlı. Turn biter
bitmez no_correction=true denemez. A26 bunu "after-turn label" diye
tarif ediyor ama K23'ün altı bitinin hepsi true olmadan proposal
extractor'a girmiyor. Bu, öğrenmeyi saatler/günler geciktirir ve
temporal kontaminasyon riski taşır. LongMemEval'de abstention'ın ayrı
bir yetenek olarak ele alınması, belirsizliğin açıkça modellenmesi
gerektiğini gösteriyor.

**3. Human label otomatik alanları "override" etmemeli; ayrı boyut
olmalı.**

§5 "human label ALWAYS overrides the automatic class" diyor. Bu
tehlikeli. Kullanıcı thumbs-up verdi diye transport error'ı yok
sayılamaz; tool fail etmiştir. Routing öğrenmesi için bu negatif
sinyaldir. "Kullanıcı memnun kaldı" ile "tool doğru çalıştı" sinyalleri
birbirine karıştırılmamalı. Trust-aware retrieval sistemleri, kaynak
güvenilirliğini ayrı bir boyut olarak ele alıyor.

**4. Per-turn recall vs compiled rows: v1'de NO doğru, ancak E5 ölçümü
yetersiz.**

§4.3'te stage 07'ye per-turn recall'ı sokmamak doğru. Ancak "compilation
loses too much latency-to-learn" endişesi gerçek. Per-turn recall'ın
"structural leak" sorunu var: "turn-start memory dump cannot see
duplicates that arise within the turn". E5 shadow ölçümünde Recall@k
delta, long-tail phrasing coverage, publish gecikmesi, tenant sızıntı
riski ve rollback maliyeti gibi metrikler karşılaştırılmalı.

**5. Poisoning eşikleri sabit değil, aktif kullanıcıya göre
uyarlanmalı.**

§6'daki 3 trace / 2 conversation, 5 kullanıcılı fabrika için düşük, 1
kullanıcılı pilot için yüksek. Memory poisoning, "OWASP ASI06"
kapsamında ayrı bir tehdit kategorisi ve "scope isolation to contain
blast radius" gerektiriyor. Poisoning saldırıları "%80'in üzerinde
başarı oranına" ulaşabiliyor. Aktif kullanıcı sayısına oranlı eşikler ve
yüksek riskli kind'lerde insan onayı şart.

**6. Critique bloğu hallucination vektörü olabilir; scope ve expiry
şart.**

MemToolAgent'ın "failure → critique" fikri değerli, ancak CWF'de "tool Y
fails because Z" cümlesi model tarafından aşırı genellenirse zarar
verir. Critique, tool, args_hash, error_class, environment, observed_at,
expires_at gibi alanlarla kapsamlı bir kayıt olarak saklanmalı.

**7. **tool_experience → VIEW** census re-probe'u bozabilir.**

§9/5'te scout-2'nin uyardığı gibi, census re-probe suppressor counter'ı
okuyorsa, label-derived view'a geçmek re-probe davranışını sessizce
değiştirebilir ve fault'ları gizleyebilir. Önce tüm okuyucular
ölçülmeli, materialized view kullanılmalı ve eski/yeni sayımlar CI ile
karşılaştırılmalı.

**8. Abstention ölçümü "memory chip absent" ile yetinmemeli.**

§7'de abstention "memory used chip absent" diye ölçülüyor. Bu,
oyunlanabilir ve LongMemEval'in QA yapısına tam oturmaz. LongMemEval,
"abstention"ı beş temel yetenekten biri olarak test ediyor. Ayrıca,
LongMemEval'in "commitment bias" sorunu var: "confident wrong guess and
an honest abstention identically" puanlanıyor. CWF'nin kendi tool-agent
abstention suite'ini çalıştırması ve false_memory_rate'i ayrı
raporlaması gerekiyor.

**9. Tenant/privacy: backend-scoped learned routing sızıntı yapabilir.**

P5 doğru ama backend birden fazla tenant'a hizmet ediyorsa,
backend-scoped learned row'lar tenant'lar arası sızabilir. "Memory
poisoning risk increases dramatically in shared contexts without
segmentation". Learned routing için default scope tenant-scoped veya
site-scoped olmalı; raw query text asla published row'a girmemeli.

**10. Rollback ve retraction dependency graph istiyor.**

§6'da retraction "LEARNED row whose evidence traces are all retracted is
auto-proposed for rollback" diyor. Bu iyi ama eksik: bir trace birden
fazla proposal'a evidence olabilir; bir proposal birden fazla bundle'a
girebilir. Evidence → proposal → bundle → published row dependency graph
tutulmalı. Membrane gibi sistemler "supersede, fork, retract, merge, and
contest records with full provenance tracking" yaklaşımını benimsiyor.

**11. "Helped" metriği istatistiksel güç ve confounding istiyor.**

P8 doğru ama "helped-rate" paired comparison ister. Production'da
randomizasyon yoksa confounding kaçınılmaz. Shadow A/B, propensity
logging ve sequential/Bayesian test gerekli. "Helped" tanımı turn-level
değil, decision-level olmalı.

**b) SOTA Seviyesinde Çalışabilecek Mimari Önerileri**

**1. Decision-Level Credit Assignment**

**Sorun:** Turn-level K23, birden fazla tool call içeren turn'lerde
hangi tool'un başarılı/başarısız olduğunu ayırt edemiyor.

**SOTA çözüm:** MatchTIR'in "bipartite matching-based turn-level reward
assignment" yaklaşımı uygulanabilir. Bu, "predicted and ground-truth
traces" arasında bipartite matching yaparak "dense turn-level rewards"
türetiyor. Ayrıca A²TGPO'nun "Information Gain (IG) as an intrinsic
process signal" yaklaşımı, external process reward model'e ihtiyaç
duymadan per-turn sinyal üretebiliyor.

**Uygulama:**

- trace_label yanında tool_call_label tut: transport_ok, schema_ok, empty, semantic_error, latency_bucket, cost_bucket, tool_choice_correct, contributed_to_answer.

- Turn label bu kararlardan türetilsin; router öğrenmesi decision-level
  label'ı kullansın.

- MemQ'nun "provenance DAG" yaklaşımı ile "credit weight decays as
  (γλ)^d with DAG depth d" prensibi uygulanabilir.

**2. Üç Değerli Label Mantığı**

**Sorun:** no_correction gelecekteki bir olaya bağlı; turn biter bitmez
true denemez.

**SOTA çözüm:** K23'ü true / false / unknown üç değerli mantığa
çevir. no_correction başlangıçta unknown; pencere kapanınca true/false.
Offerable filtre için unknown durumunda temkinli davran: grounded ∧
toolFailures=0 ise "provisional offerable", ama learned row'a dönüşmesi
için pencere kapanması şart.

**Uygulama:**

- Label window: sonraki 1-2 turn veya 24 saat.

- Temporal kontaminasyonu engellemek için current turn'ün prompt'una
  sızmasın.

- LongMemEval'in abstention yaklaşımından ilham alınabilir.

**3. Çok Boyutlu Etiketleme**

**Sorun:** Human label otomatik alanları override etmemeli.

**SOTA çözüm:** Etiketi çok boyutlu yap:

- task_success (K23)

- user_satisfaction (human label)

- tool_health (transport + emptiness + schema)

- grounding_quality

Human label sadece task_success ve offerable kararını override
etsin; tool_health asla insan label'ıyla silinmesin. Trust-aware
retrieval sistemleri, "sensitivity levels (public, low, medium, high,
hyper) with graduated access control" yaklaşımını benimsiyor.

**4. Per-Turn Recall vs Compiled Rows: Shadow A/B**

**Sorun:** Compilation'ın latency-to-learn maliyeti ölçülmemiş.

**SOTA çözüm:** E5'te iki kol:

- \(a\) Sadece published rows.

- \(b\) Published + session-local ephemeral recall (sadece prompt face,
  routing'e değil).

Routing'e per-turn recall'ı sadece router.memoryRankEnabled arkasında
shadow çalıştır; production'a açma. Recall@k, latency-to-learn,
long-tail coverage, tenant safety, rollback maliyeti ve insan müdahalesi
oranı karşılaştırılmalı.

**5. Adaptif Poisoning Eşikleri**

**Sorun:** Sabit 3/2 eşiği ölçeklenmiyor.

**SOTA çözüm:**

- Düşük riskli kind'ler (alias, example, negative_example): max(3
  traces, 2 distinct conversations) + PII scrub + admin review
  opsiyonel.

- Yüksek riskli kind'ler (ranking_policy, default_plan,
  obligation_candidate): otomatik publish yok; insan onayı şart.

- Aktif kullanıcı sayısına oran: distinct_conversations \>= max(2,
  ceil(0.1 \* active_users)).

- Tek kullanıcılı pilotta router.learnEnabled=0 kalsın; sadece
  fixture'da öğrenme.

- "Memory poisoning attacks ... success rates above 80% across multiple
  independent studies". Scope isolation şart.

**6. Critique Blokları: Scope, Expiry, Args Hash**

**Sorun:** Critique hallucination vektörü olabilir.

**SOTA çözüm:** Critique'i imperatif değil, kapsamlı bir kayıt olarak
sakla:

- tool, args_hash, error_class, environment, observed_at, expires_at.

- Prompt'a sadece query bu scope'a uyuyorsa ve süre dolmamışsa ekle.

- Cümle "Tool Y failed" değil, "At T, with args A, tool Y returned error
  Z; verify before reuse" olsun.

- "Helped" metriği ile A/B test et; zarar veriyorsa kapat.

**7. Tool Experience VIEW: RULE-49 ve Materialized View**

**Sorun:** Census re-probe suppressor counter'ı okuyorsa, view'a geçiş
fault'ları gizleyebilir.

**SOTA çözüm:** Önce RULE-49 gereği tüm okuyucuları ölç. Geçişte aynı
alanları taşıyan materialized view kullan; suppressor'ı açıkça yeni
metriğe migrate et. Eski ve yeni sayımları fixture'da karşılaştıran CI
testi ekle. Bir release boyunca iki kaynağı paralel oku, fark varsa dur.

**8. Abstention: LongMemEval Verbatim + Tool-Agent Suite**

**Sorun:** "Memory chip absent" yetersiz.

**SOTA çözüm:**

- LongMemEval harness'ini verbatim çalıştır (raporla).

- CWF'ye özel tool-agent abstention suite: memory row yokken modelin
  uydurma memory claim üretip üretmediğini NLI/LLM-judge + insan ile
  ölç.

- false_memory_rate ayrı raporlanmalı.

- Chip absence sadece telemetry; asıl metrik "no memory claim when none
  applies".

- LongMemEval'in commitment bias'ını unutma: "confident wrong guess and
  an honest abstention identically".

**9. Tenant/Privacy: Tenant-Scoped Learned Routing**

**Sorun:** Backend-scoped learned row'lar tenant'lar arası sızabilir.

**SOTA çözüm:**

- Tek tenant'lı backend: backend-scoped.

- Çok tenant'lı backend: tenant-scoped veya site-scoped.

- Raw query text asla published row'a girmesin; sadece generalize
  edilmiş pattern, alias, category.

- PII scrub K23'te var; ek olarak published bundle'da provenance ve
  "k-anonymity" kontrolü (en az K farklı conversation).

- "Isolation must extend beyond APIs and tokens into the cognitive layer
  of Agentic AI systems".

**10. Rollback: Dependency Graph**

**Sorun:** Retraction'ın tüm türevleri işaretlemesi gerekir.

**SOTA çözüm:** Evidence → proposal → bundle → published row dependency
graph tut:

- Bir trace retract edilince etkilenen proposal'ları stale işaretle.

- Yayınlanmış bundle'ları etki analizine al.

- Otomatik rollback sadece tüm evidence retract ise; kısmi ise insan
  review.

- Replay için eski bundle versiyonlarını sakla.

- Membrane'in "supersede, fork, retract, merge, and contest records with
  full provenance tracking" yaklaşımı referans alınabilir.

**11. "Helped" Metriği: Shadow A/B ve Propensity Logging**

**Sorun:** Production'da randomizasyon yoksa confounding kaçınılmaz.

**SOTA çözüm:**

- Shadow A/B: aynı turn'i iki politika ile replay et (memory'li vs
  memory'siz).

- Propensity logging: hangi row'un neden offer edildiğini kaydet;
  offline policy evaluation yap.

- Sequential/Bayesian test; minimum sample size altında "inconclusive"
  de, otomatik kapatma.

- "Helped" tanımı decision-level olmalı.

**Sonuç**

A26, CWF'nin memory/learning ayrımını doğru teşhis ediyor ve doğru
governance iskeletini kuruyor. Ancak "öğrenme" için turn-level K23
yeterli değil. **Decision-level credit assignment, üç değerli label, çok
boyutlu etiketleme, adaptif poisoning eşikleri, tenant-scoped learned
routing ve CWF'ye özel abstention ölçümü** gerekiyor. Bu düzeltmelerle
A26, "memory var ama learning yok" probleminden "governed, replayable,
tenant-safe, ölçülmüş öğrenme"ye geçiş için sağlam bir v0_1 olur.
