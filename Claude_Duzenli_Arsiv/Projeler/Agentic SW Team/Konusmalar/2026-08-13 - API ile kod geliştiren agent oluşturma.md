# API ile kod geliştiren agent oluşturma

**Sohbet ID (UUID):** `c31d2133-c385-44e6-9cf4-6e17ea5e7d61`

**Oluşturulma Tarihi:** 2026-08-13T04:11:43.081516Z

**Güncellenme Tarihi:** 2026-08-13T04:56:38.742725Z

**Özet:** **Conversation Overview**

Bu konuşma, kullanıcının AI destekli yazılım geliştirme araçları ve multi-agent mimarileri üzerine kapsamlı teknik sorular sorduğu bir oturumdan oluşuyor. Kullanıcı, Türkçe iletişim kuruyor ve "CWF" (bir otomasyon projesi) adlı kendi geliştirdikleri bir sistemi üzerinde çalışıyor. Bu sistem, ARMES ve Superset gibi backend'leri olan, MCP gateway mimarisine sahip, A2A sunucu desteği planlanan (kalem #18 BENCH-A2A-1) ve zero-code backend mount (kalem #16 BENCH-BACKEND-MOUNT-1) gibi özellikleri içeren bir platform.

Konuşmada ele alınan konular sırasıyla şunlar: Claude Agent SDK ve ham Messages API kullanarak coding agent inşası; Claude Code ve Antigravity gibi IDE'lerin agent mimarileri; Claude Code'un subagent ve Agent Teams mekanizmalarıyla multi-agent orkestrasyon kurabilmesi; Claude Code, Codex CLI, Qwen Code ve DeepSeek gibi araçları hibrit olarak birlikte kullanma yöntemleri (paylaşılan AGENTS.md, git worktree izolasyonu, subagent delegasyonu); Vibe Kanban ve Claude Squad gibi hazır multi-agent orkestratör araçları; ve son olarak kendi geliştirdikleri yaprak/CWF sisteminin Claude Code ile entegrasyonu.

CWF entegrasyonu sorusunda Claude, mevcut proje bilgisine dayanarak iki yönü ayırt etti: Claude Code'un CWF'yi MCP üzerinden çağırması (#18 açıldığında) ve CWF'nin Claude Code'u backend olarak mount etmesi (#16 açıldığında). ADR-010 trust modeli ve TOOL-BEHAVIOR-CENSUS bağlamı da konuşmaya dahil edildi. Kullanıcının teknik derinliği yüksek; mimari kararlar, maliyet optimizasyonu ve vendor bağımlılığı gibi konulara önem veriyor.

---

## 👤 Kullanıcı (2026-08-13T04:11:44.377996Z)

API kullanarak code gelistiren agent nasil yapilir

## 🤖 Claude (2026-08-13T04:12:18.692869Z)


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

İki ana yol var: hazır **Claude Agent SDK** kullanmak (tavsiye edilen) ya da ham Messages API üzerinde kendi agent döngünü kurmak.

## 1. Claude Agent SDK (en hızlı yol)

Agent SDK, dosya okuma, komut çalıştırma ve kod düzenleme için yerleşik araçlarla gelir; tool execution'ı kendin implemente etmene gerek kalmaz. Claude Code'u güçlü kılan her şey — aynı araçlar, agent döngüsü ve context yönetimi — Python ve TypeScript kütüphanesi olarak kullanılabilir.

```bash
pip install claude-agent-sdk
export ANTHROPIC_API_KEY=sk-ant-...
```

```python
import anyio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    options = ClaudeAgentOptions(
        system_prompt="Sen bir kod geliştirme agent'ısın.",
        allowed_tools=["Read", "Write", "Edit", "Bash"],
        permission_mode="acceptEdits",  # düzenlemeleri otomatik onayla
        cwd="/path/to/proje"
    )
    async for message in query(
        prompt="Bu projedeki bug'ları bul ve düzelt",
        options=options
    ):
        print(message)

anyio.run(main)
```

SDK orkestrasyonu (tool çalıştırma, context yönetimi, retry'lar) kendisi hallediyor; sen sadece mesaj stream'ini tüketiyorsun. Döngü, Claude görevi bitirdiğinde veya hata aldığında sona eriyor. MCP sunucuları bağlayarak (ör. veritabanı, GitHub) araç setini genişletebilirsin, `canUseTool` ile izin kontrolü ekleyebilirsin.

Dikkat: paket adı artık `@anthropic-ai/claude-agent-sdk` / `claude-agent-sdk` — eski "Claude Code SDK" adını referans alan örnekler çalışmayabilir.

## 2. Ham Messages API ile kendi döngün

Daha fazla kontrol istersen klasik agent loop'u kendin yazarsın:

1. Claude'a `tools` parametresiyle araç tanımları gönder (ör. `read_file`, `write_file`, `run_command`)
2. Yanıtta `tool_use` bloğu gelirse aracı kendi kodunla çalıştır
3. Sonucu `tool_result` olarak geri gönder
4. Claude "bitti" diyene kadar döngüyü sürdür

Bu yaklaşımda sandboxing, hata yönetimi, context taşması gibi her şey senin sorumluluğunda — o yüzden çoğu senaryo için Agent SDK daha mantıklı. Ayrıca Managed Agents da var: model, system prompt ve araçları API tarafında tanımlıyorsun; `agent_toolset` tipi bash, dosya işlemleri, web search gibi hazır araçların tamamını açıyor.

## Pratik öneriler

Kodun çalışacağı ortamı izole et (Docker/sandbox) — agent `bash` çalıştırabildiği için bu kritik. Dosya yazma izinlerini `permission_mode` ile kademeli aç, proje kurallarını bir `CLAUDE.md` dosyasına koy. Başlangıç için resmi quickstart iyi bir yol: https://platform.claude.com/docs/en/agent-sdk/quickstart

İstersen bir sonraki adımda somut bir kullanım senaryosu (ör. otomasyon işlerin için belirli bir agent) üzerinden birlikte tasarlayabiliriz.

## 👤 Kullanıcı (2026-08-13T04:17:47.770532Z)

baska bir  soru ide bugun icinde bir agent mi icermekte? ornegin claude code yada antigravity?

## 🤖 Claude (2026-08-13T04:18:14.063704Z)


```
This block is not supported on your current device yet.
```

Evet, ikisi de agent içeriyor — ama form faktörleri farklı. Bugün "agent" artık neredeyse tüm modern geliştirme araçlarının çekirdeği haline geldi; fark, agent'ın nerede yaşadığında.

**Claude Code** aslında bir IDE değil, kendisi bir agent. Terminal, masaüstü uygulaması veya VS Code / JetBrains eklentisi üzerinden çalışan agentic bir kodlama aracı: dosyaları okur, düzenler, komut çalıştırır, test eder. Yani IDE'nin içine yerleşen bir agent olarak düşünebilirsin — IDE'yi sen seçiyorsun, agent'ı Claude Code sağlıyor. Bir önceki konuşmamızdaki Agent SDK de zaten bu agent'ın kütüphane haline getirilmiş versiyonu.

**Antigravity** ise tersinden gelen bir yaklaşım: Google'ın agentic geliştirme platformu — çekirdeği tanıdık bir AI destekli IDE deneyimi olsa da, tarayıcı kontrolü, asenkron etkileşim ve agent-öncelikli bir ürün yapısıyla agent'ların karmaşık, uçtan uca yazılım görevlerini otonom planlayıp yürütmesine odaklanıyor. Editor yüzeyinde tab tamamlama, doğal dil komutları ve yapılandırılabilir agent var; agent editör, terminal ve tarayıcıda otonom çalışabiliyor, sen tek tek tool çağrılarını değil üst seviye görevleri yönetiyorsun. Antigravity 2.0 ile ayrıca IDE'den bağımsız, agent'ları projeler arası başlatıp izlediğin bir masaüstü "komuta merkezi" de çıkardılar; kendi editörünle yan yana kullanabiliyorsun. Model tarafında da tek modele kilitli değil — Gemini'nin yanında Claude modelleri arasında geçiş yapılabiliyor.

Yani ayrım şöyle özetlenebilir:

Cursor, Windsurf, Antigravity gibi araçlar "agent gömülü IDE" — editörün kendisi agent etrafında tasarlanmış. Claude Code, Codex CLI, Gemini CLI gibi araçlar ise "editörden bağımsız agent" — istediğin ortama takılıyor. İkisi birbirini dışlamıyor; çoğu geliştirici bugün ikisini birlikte kullanıyor (ör. VS Code + Claude Code, ya da Antigravity IDE + kendi CLI agent'ı).

Senin durumun için pratik bir not: otomasyon işleri geliştirirken Claude Code'u agent olarak kullanıp, çıktıyı istediğin editörde incelemek genelde en esnek kurulum. Antigravity ise özellikle tarayıcı testi gerektiren (form doldurma, UI doğrulama gibi) işlerde agent'ın tarayıcıyı da kontrol edebilmesiyle ilginç bir alternatif.

## 👤 Kullanıcı (2026-08-13T04:22:40.623310Z)

codign agent ornegin claude code kendisi multi agent olusturabiliyor mu?

## 🤖 Claude (2026-08-13T04:23:07.928430Z)


```
This block is not supported on your current device yet.
```

Evet, hem de iki farklı mekanizmayla: **subagent'lar** ve **agent team'ler**.

## Subagent'lar (Task/Agent tool)

Bu, Claude Code'un yerleşik özelliği. Subagent, ana agent'ın Agent tool ile başlattığı ayrı bir Claude Code örneği: parent görev tanımını yazıyor, subagent kendi konuşma bağlamı ve araç erişimiyle bağımsız çalışıyor. Varsayılan olarak arka planda çalışıyorlar; parent aynı anda birden fazla subagent başlatıp kendisi çalışmaya devam edebiliyor, subagent bitince bulgularını parent'a raporluyor. Her subagent temiz başlıyor — parent'ın konuşma geçmişini görmüyor. Bu bağlam izolasyonu aslında en büyük avantaj: her agent kendi işine odaklandığı için ana oturumun context'i şişmiyor.

Ayrıca `.claude/agents/` dizininde kendi özel agent tiplerini tanımlayabiliyorsun — her birine ayrı model, araç seti ve talimatlar vererek. Örneğin bir "code-reviewer", bir "test-writer", bir "security-auditor" tanımlayıp ana agent'ın bunları gerektiğinde çağırmasını sağlayabilirsin.

Paralel dosya düzenlemede çakışma riski için de çözüm var: worktree izolasyonu her subagent'a kendi geçici git worktree'sini veriyor — reponun ayrı bir kopyası, kendi çalışma dizini.

## Agent Teams (daha yeni, deneysel)

Subagent'lardan farklı bir model: Agent Teams, birden fazla Claude Code örneğinin aynı anda bağımsız agent'lar olarak çalışıp ortak bir görev listesi üzerinden koordine olmasını sağlıyor — her agent aynı panodan iş çekiyor ve gerçek zamanlı güncelliyor. Aradaki fark şu: subagent'lar hızlı, odaklı işçiler olarak sonucu izole şekilde geri raporlar; Agent Teams ise takım üyelerinin bulgularını paylaşması, birbirini sorgulaması ve kendi aralarında koordine olması gerektiğinde kullanılır.

Maliyet tarafı önemli: 3 kişilik bir takım, aynı işi sıralı yapan tek oturuma göre kabaca 3-4 kat token harcıyor — ama karmaşık görevlerde zaman kazancı bunu haklı çıkarabiliyor.

## Pratik gerçek

Şunu da eklemek lazım: agent'lar koordinasyon sorununu sihirli şekilde çözmüyor. Git worktree'ler dosya üzerine yazmayı engeller ama mantıksal çakışmaları engellemez — iki agent uyumsuz varsayımlarla çalışırsa birleştirilen sistem yine bozulabilir. Ciddi işlerde en iyi pratik, Claude'un iş bölümünü önermesi ve bir insanın sahiplik sınırlarını, sözleşmeleri ve merge sırasını onaylamasıdır.

Yani kısa cevap: evet, Claude Code tek bir komutla kendi altında multi-agent orkestrasyon kurabiliyor — basit paralel işler için subagent, gerçek işbirliği gerektiren işler için Agent Teams. Aynı yetenekler Agent SDK'da da mevcut, yani kendi geliştirdiğin bir agent'a da subagent delegasyonu ekleyebilirsin.

## 👤 Kullanıcı (2026-08-13T04:29:01.190737Z)

peki hybrid calisma nasil olur ornegin, claude code agent ile codex agent ayni projede calisabilir mi bunu en iyi nasil yapmak mumkun olur benzer sekilde deepseek yada qwen agents?

## 🤖 Claude (2026-08-13T04:29:44.002584Z)


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

Evet, çalışabilirler — hatta bu 2026'da giderek yaygınlaşan bir pratik. 500'den fazla Reddit yorumunun analizi de aynı konsensüsü gösteriyor: iki aracı birlikte çalıştırmak, tek birine sadakatten daha iyi sonuç veriyor. Ama "iyi çalışması" için birkaç katmanı bilinçli kurmak gerekiyor.

## 1. Ortak zemin: paylaşılan talimat dosyası

En kritik adım bu. İki aracı aynı projede kullanmanın anahtarı, paylaşılan bir talimat dosyası. Codex CLI `AGENTS.md`'yi otomatik okuyor; önerilen yapı, evrensel talimatları `AGENTS.md`'ye koymak, `CLAUDE.md`'de ise `@AGENTS.md` referansı artı Claude'a özel özellikler (ör. subagent kullanımı, `/self-review` komutları) tutmak. Böylece araçlar arası uyumluluk korunurken araca özel özellikler de kullanılabiliyor. Qwen Code de aynı ekosistemde: kendi `QWEN.md`'si var ve AGENTS.md standardına yönelim var; DeepSeek tarafında ise Qwen ekibinin CLI'ı artık yerleşik DeepSeek sağlayıcı desteğiyle geliyor — yani DeepSeek/Qwen modellerini genelde aynı Qwen Code aracı üzerinden projeye dahil ediyorsun.

Basit bir hile: `ln -s AGENTS.md CLAUDE.md` symlink'i ile "hangi agent hangi dosyayı okuyor" sürtünmesini anında ortadan kaldırabilirsin.

## 2. İş bölümü: her aracı güçlü olduğu yerde kullan

Topluluk pratiği net bir desen oluşturmuş: Claude Code'u mimari kararlar, karmaşık debug, büyük refactor'lar ve geniş context gerektiren işler için; Codex CLI'ı test üretimi, dokümantasyon, bağımlılık güncellemeleri, CI görevleri ve arka plan toplu işler için önce tercih et. Güvenlik hassasiyeti olan kod, production deploy ve auth/ödeme akışlarına dokunan her değişiklikte ise mutlaka çapraz review yap.

Çapraz review özellikle değerli: Claude Code'da implemente et, sonra Codex paneline geçip "son commit'teki değişiklikleri güvenlik açısından incele" de. Ters yönde de çalışıyor — Codex'in bulduğu sorunu Claude Code'a otomatik düzelttirip tekrar review isteyebilirsin. Farklı model aileleri farklı hataları yakalıyor; bu, hibrit kurulumun asıl değeri.

## 3. Çakışmayı önleme: git worktree'ler

İki agent aynı dosyalara aynı anda dokunursa kaos çıkar. Çözüm, her araca kendi git worktree'sini vermek — Claude Code `main` worktree'de mimari değişiklik yaparken, Qwen Code ayrı bir worktree'de test yazabilir. Merge sırasını sen (veya orkestratör agent) belirlersin.

## 4. İleri seviye: birini diğerinin subagent'ı yapmak

En zarif entegrasyon şekli bu. Gemini CLI veya Qwen Code'u Claude Code'un subagent'ı olarak tanımlayabiliyorsun — `.claude/agents/` altına bir markdown dosyası koyarak. Sonra "gemini-analyzer'ı kullanıp şu modülü analiz et" diyorsun ve Claude Code o CLI'ı arka planda çalıştırıp sonucu alıyor. Aynı yaklaşım Codex için de geçerli: sıfır konfigürasyonlu resmi plugin'den tam MCP köprülemesine kadar üç entegrasyon yolu var. Böylece Claude Code orkestratör, diğer modeller uzman işçi oluyor — ucuz/hızlı modelleri (DeepSeek Flash, Qwen) keşif ve analiz gibi hacimli işlere, güçlü modeli karar ve senteze ayırırsın. Bu aynı zamanda maliyet optimizasyonu demek.

## Önerdiğim başlangıç kurulumu

Senin otomasyon projelerin ölçeğinde şöyle başlardım: tek `AGENTS.md` (+ symlink CLAUDE.md), Claude Code ana orkestratör, Qwen Code'u DeepSeek API key'iyle yapılandırıp ucuz keşif/test işçisi olarak subagent tanımla, kritik değişikliklerde Codex'le çapraz review. İlk adım olarak basit bir el değiştirme dene: karmaşık bir feature'da Claude Code'a planı yazdır, planı diğer araca ver ve iyi bir spec ile ne kadar ilerlediğini gör; rahatladıkça MCP köprüsünü ekle.

## 👤 Kullanıcı (2026-08-13T04:36:41.243316Z)

Peki bu sekilde calisabilen yani claude code, codex, ve benzeri agentlari bir arada bullanabilecek bir yapida olan bir tool var mi? yoksa herkes endimi built ediyor?

## 🤖 Claude (2026-08-13T04:37:17.525384Z)


```
This block is not supported on your current device yet.
```

Var, hem de artık başlı başına bir araç kategorisi oldu — "agent orchestrator" deniyor ve 2026'da patlama yaşadı. Yani hayır, herkes kendisi build etmiyor; hazır seçenekler olgunlaştı. Manzara üç katmana ayrılıyor:

## Katman 1: Yerleşik (araç içi)

Claude Code subagent'ları ve Agent Teams — tek terminal oturumu, ekstra araç gerekmez; başlangıç noktası bu. Ama bu katman tek vendor'a bağlı; hibrit istiyorsan yukarı çıkman lazım.

## Katman 2: Lokal orkestratörler (senin sorduğun kategori)

Bunlar agent-agnostik — Claude Code, Codex, Gemini CLI, Qwen/OpenCode gibi CLI'ları aynı çatıda çalıştırıyorlar:

**Vibe Kanban** — kategorinin en popüleri. Farklı coding agent'lar arasında kolayca geçiş yapıyorsun, birden fazlasını paralel veya sıralı çalıştırıyorsun, işleri board üzerinden takip edip review ediyorsun, MCP konfigürasyonlarını tek yerden yönetiyorsun; `npx vibe-kanban` ile başlıyor. Her task kartı kendi worktree'sini ve branch'ini alıyor; Claude Code, Codex, Gemini CLI, Amp, Cursor Agent CLI destekleniyor. Önemli uyarı: arkasındaki şirket Bloop Nisan 2026'da kapandı; proje açık kaynak ve topluluk bakımında devam ediyor, artık tamamen lokal mimaride çalışıyor.

**Claude Squad** — terminal saflarının tercihi. İsmine rağmen Claude Code, Codex, Gemini, Aider, OpenCode ve Amp'ı destekliyor; her agent'ı tek TUI'da yönetiyor, her göreve izole git workspace veriyor. GUI yok — bu, SSH üzerinden uzak sunucuda çalıştırmak isteyenler için özellik, masaüstünde diff görmek isteyenler için sorun.

**Conductor / Crystal / CodeAgentSwarm** — masaüstü GUI isteyenler için; CodeAgentSwarm altı CLI'ı macOS/Windows'ta yönetip agent'ların kendilerinin güncellediği bir kanban sunuyor, ama kapalı kaynak.

Bu katmanın ortak sınırı şu: çoğunda agent'lar yan yana izole oturumlar olarak çalışıyor — ortak hafıza havuzu yok, birbirlerine mesaj atmıyorlar, işi aralarında yönlendiren bir orkestratör yok; orkestrasyon sensin, kartları taşıyan el. Gerçek agent-to-agent koordinasyon isteyen "hive" tarzı araçlar (5dive, Agent Teams desktop, agentsmesh gibi) daha yeni ve deneysel.

## Katman 3: Bulut (fire-and-forget)

Görevi ata, laptopı kapat, PR'a dön: Claude Code Web, GitHub Copilot Coding Agent, Google Jules, OpenAI Codex Web. Agent'lar bulut VM'lerde çalışıyor. Ama bunlar vendor'a bağlı — hibrit değil.

## Senin durumun için net öneri

Sorunun "hazır mı, kendim mi" kısmına dürüst cevap: hazır araçlar paralel çalıştırma ve izolasyon problemini çözüyor; iş bölümü zekası (hangi işi hangi modele vereceğin) hâlâ sende veya senin yazdığın kuralda. Bu yüzden çoğu ciddi kullanıcı hazır orkestratör + kendi `AGENTS.md` kuralları kombinasyonunu kullanıyor.

Başlangıç için **Vibe Kanban**'ı denerdim: kurulumu tek komut, agent-agnostik, ve önceki konuşmada bahsettiğimiz worktree izolasyonunu senin yerine hallediyor. İki agent'la yetineceksen şunu da bil: "aynı anda kaç agent çalıştırıyorum" sorusuna dürüst cevabın iki ise, bu araçların çoğu ihtiyacından fazla makine demek — elle birden fazla oturum açmak da işini görür.

## 👤 Kullanıcı (2026-08-13T04:55:53.711629Z)

baska soru, build ettigimiz yaprak agentini claude code agent ile integrate etmek mumkunmu?

## 🤖 Claude (2026-08-13T04:56:38.742725Z)


```
This block is not supported on your current device yet.
```

Mümkün — ve güzel haber şu: bu entegrasyonun mimari yolu zaten projede adlandırılmış durumda, sıfırdan icat gerekmiyor. Ama iki yönü ayırmak lazım, çünkü ikisi farklı kalemlere denk geliyor.

## Yön 1: Claude Code → yaprak (Claude Code, CWF'yi kullanır)

CWF zaten bir MCP ağ geçidi platformu; Claude Code da MCP istemcisi olarak herhangi bir MCP sunucusuna bağlanabiliyor. Yani teknik olarak Claude Code'a CWF'yi bir MCP sunucusu olarak mount etmek bugün bile düşünülebilir. Ama buradaki gizli tuzak şu: Claude Code'u doğrudan ARMES/Superset araçlarına bağlarsan, CWF'nin bütün değer önerisini — governed pipeline, grounding, empty≠zero, provenance — baypas etmiş olursun. Ham backend'e erişen bir frontier agent, tam olarak CWF'nin çözdüğü problemi (halüsinasyonlu rakam) geri getirir. Doğru yüzey, CWF'nin **kendisinin** bir agent olarak dışarı açılması — ve bu, kapı anahtarlarından **#18 BENCH-A2A-1** (A2A sunucusu). CWF A2A sunucusu olduğunda, Claude Code dahil herhangi bir A2A/MCP konuşan agent, yaprak'ı governed bir uç olarak çağırabilir; cevaplar CWF'nin dokuz aşamalı hattından geçerek gelir, provenance korunur.

## Yön 2: yaprak → Claude Code (CWF, Claude Code'u backend olarak kullanır)

Bu yön daha da olgun düşünülmüş: S-serisi oturumlarda "multi-agent" tartışması yapıldığında verilen hüküm netti — **agent-as-backend over MCP, tek yasa kaybettirmeyen şekil.** Delegasyon bir tool çağrısı olarak kalır, kısıtlar etiketli kalır, trust ADR-010 gereği per-tool kazanılır. Claude Code kendisini MCP sunucusu olarak da açabiliyor; yani yaprak'a "Claude Code" adında bir backend satırı eklemek (backend kimliği DATA — bir satır, enum değil), onu ARMES ve Superset'in yanına üçüncü backend olarak koymak demek. Bunu mümkün kılan kalem de **#16 BENCH-BACKEND-MOUNT-1** (zero-code mount) — herhangi bir MCP sunucusunun kod yazmadan mount edilmesi. Bir önceki konuşmadaki "AI-to-enterprise entegrasyonu onboarding adımı olsun" tezinin ta kendisi; Claude Code sadece ilk örnek olur.

## Dürüst durum tespiti

İkisi de bugün koşulabilir değil: #16 ve #18, SOTA kapısının yedi anahtarından ikisi ve henüz implement edilmedi (kapı 1/7). Sıra da belli — önce #40 PERSISTENCE-CLASS-1 (S82-6 gereği tüm servis katmanı işlerinden önce), sonra dalga planı #16 ve #18'e ulaşıyor. Yani cevap: "evet, ve tam olarak planın gittiği yer" — ama yeni bir kalem açmaya gerek yok, mevcut sırayı bozmaya da. #16 kapandığı gün Claude Code'u backend olarak mount etmek muhtemelen bir yapılandırma satırı olacak; #18 kapandığı gün de tersi yön (Claude Code'un yaprak'ı çağırması) açılacak.

Tek dikkat: ADR-010 burada da geçerli — Claude Code mount edildiğinde onun deklarasyonu bir iddia olur, warrant değil; trust gözlemlenen davranıştan, per-tool kazanılır. Deterministik olmayan bir agent'ı backend yapmak, TOOL-BEHAVIOR-CENSUS'un tam da ölçmek için kurulduğu davranış sınıfı.

**YOUR ACTION ITEMS:** yok — bu bir bilgi sorusuydu, karar veya manuel adım gerektirmiyor.

