# İki antigravity fikrinin uygulanabilirliği

**Sohbet ID (UUID):** `29fd7fbb-4348-45b0-a99e-0a245aae9c2e`

**Oluşturulma Tarihi:** 2026-06-26T13:12:46.004698Z

**Güncellenme Tarihi:** 2026-06-27T05:56:47.274033Z

**Özet:** **Conversation Overview**

The person asked in Turkish whether it is possible to run two instances of Antigravity IDE simultaneously. Claude provided a detailed technical explanation in Turkish covering two distinct scenarios: running two projects in parallel within the same account, and running two fully isolated instances with separate Google accounts to obtain separate rate-limit quotas.

For the first scenario, Claude explained that Antigravity (being VS Code-based) supports opening a new window via "File > New Window," and that Antigravity 2.0 (released at Google I/O in May) natively supports multi-repo workspaces with parallel agent management through Agent Manager — making a second installation unnecessary for most parallel-work use cases. For the second scenario involving account isolation, Claude explained the `--user-data-dir` and `--extensions-dir` command-line flags to launch a fully isolated second instance, provided the exact bash command syntax, and noted macOS-specific behavior. Claude also mentioned community-built `multigravity` CLI tooling as an alternative, while advising the person to review the install script before running it. The conversation ended with Claude asking a clarifying question to determine which scenario applied to the person's actual situation — parallel projects or separate rate-limit quotas.

---

## 👤 Kullanıcı (2026-06-26T13:12:46.799219Z)

iki antigravity ide yi calistirmak mumkun mu

## 🤖 Claude (2026-06-26T13:13:49.725422Z)

Kullanıcı Türkçe olarak AntiGravity IDE'nin iki örneğini aynı anda çalıştırmanın mümkün olup olmadığını soruyor. AntiGravity, Google'ın Claude Opus 4 ile kullanılan agentic IDE'si ve bu teknik bir soru.

AntiGravity, VS Code tabanlı bir editör olduğundan (Cursor ve Windsurf gibi), genellikle birden fazla pencere açmaya izin verir ancak gerçek anlamda ayrı örnekler çalıştırmak daha karmaşık olabilir. AntiGravity nispeten yeni bir ürün olduğundan (Google 2025'in sonlarında piyasaya sürdü), birden fazla örneği destekleyip desteklemediği ve nasıl yapılacağı hakkında güncel bilgi aramak faydalı olabilir.
```
This block is not supported on your current device yet.
```

I'm considering what the user actually means by running two AntiGravity IDE instances — they could want to launch two separate windows for different projects, or they might be looking to run two profiles with different accounts. Given the context, it seems like Maymun wants to work on multiple projects simultaneously, possibly FinOPS and Demo-VirtualFactory.

The most likely reason is hitting rate limits on the free plan, which is quite restrictive. Using two different Google accounts would give them access to separate rate limit quotas. I should explain that running multiple windows within the same instance is straightforward since Agent Manager handles parallel workspaces natively, but if they need true account separation, they'd need to use profile isolation through command-line flags or a multigravity CLI tool to keep the instances completely separate. Code-based editors like VS Code can open multiple windows within the same instance (sharing login and rate limits), or you can launch completely separate instances with `--user-data-dir` pointing to different folders to get isolated accounts and separate rate-limit buckets. The multigravity CLI automates this by creating isolated profiles so you can run multiple Google accounts simultaneously without manual configuration.

That said, AntiGravity 2.0 (released May 2026) natively supports multi-repo workspaces and runs multiple agents in parallel within a single instance, so for most parallel-work scenarios you might not need a second instance at all. The exact command to force a new instance varies by OS—macOS has `open -n`, but I need to be careful about the specifics since the single-instance lock behavior depends on whether you're also changing the user-data-dir.Kısa cevap: evet, mümkün — ama "iki" ile neyi kastettiğine göre iki ayrı yol var.

**Senaryo 1: Aynı hesapla iki proje paralel.** Bunun için ikinci bir "instance" çalıştırmana gerek yok. Antigravity zaten VS Code tabanlı, yani `File > New Window` ile ikinci pencere açıp farklı workspace yükleyebilirsin. Dahası, Antigravity 2.0 (19 Mayıs I/O'da çıktı) artık tam multi-repo workspace destekliyor — tek session'da birden fazla repo açıp agent'ların repo sınırları arasında çalışmasını sağlayabiliyorsun. Agent Manager da zaten birden fazla workspace ve agent'ı aynı anda yönetmek için tasarlanmış; ideali her workspace'e bir agent. FinOPS ve Demo-VirtualFactory'yi aynı anda sürmek istiyorsan bu katman sana yeter — ikinci kurulum gereksiz.

**Senaryo 2: İki ayrı hesap / ayrı rate-limit havuzu.** Asıl zorlaşan kısım bu, ve muhtemelen niyetin de bu. Çünkü Antigravity tek `user-data-dir` üzerinde tek-instance kilidiyle çalışıyor — aynı Google hesabıyla aynı kotayı paylaşırsın. Free preview'in kotaları oldukça kısıtlı ve AI Plus planı bile agent kullanırken şaşırtıcı hızda tükenebiliyor. İki ayrı Gmail hesabıyla iki izole instance çalıştırırsan iki ayrı kota elde edersin.

Manuel yöntem — ayrı `user-data-dir` ve `extensions-dir` ile başlat:

```bash
antigravity --user-data-dir="$HOME/.antigravity-profil2" \
            --extensions-dir="$HOME/.antigravity-ext2" \
            /path/to/proje
```

İlk instance normal açılır, ikincisi tamamen izole bir profil/oturum olarak yanında çalışır. macOS'ta uygulama binary'sini çağırman gerekebilir (`open -n` tek başına kilidi aşmaz, ayrı `user-data-dir` şart).

Bunu elle yönetmek istemezsen topluluk tarafından yazılmış `multigravity` CLI'ları var: her profil kendi hesabı, eklentileri ve ayarlarıyla izole; tam izolasyon varsayılan, "shared" modda ise eklenti/ayarlar symlink'lenip sadece auth katmanı ayrılıyor (gigabaytlarca eklentiyi kopyalamadan ikinci hesap için pratik). macOS/Windows/Linux destekliyor.

Tek uyarı: bu CLI'lar üçüncü taraf, `curl | bash` ile kuruluyor — `install.sh`'i çalıştırmadan önce bir göz at, ya da mekanizmayı zaten bildiğin için yukarıdaki manuel `--user-data-dir` yaklaşımıyla kendi shell alias'larını kurman daha temiz olur.

Hangi senaryo senin durumun — iki proje paralel mi, yoksa kota için iki hesap mı?

