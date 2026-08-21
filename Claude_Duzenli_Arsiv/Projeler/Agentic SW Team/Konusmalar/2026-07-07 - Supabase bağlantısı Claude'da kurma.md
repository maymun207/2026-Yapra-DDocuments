# Supabase bağlantısı Claude'da kurma

**Sohbet ID (UUID):** `a0e7e369-d5ff-453e-a1ed-eeade57e1919`

**Oluşturulma Tarihi:** 2026-07-07T17:04:19.500304Z

**Güncellenme Tarihi:** 2026-07-07T17:09:14.443463Z

**Özet:** **Conversation Overview**

The person is working with Claude Code installed as an extension inside AntiGravity (a development environment), and sought help setting up a Supabase MCP connection specifically within Claude Code. A key constraint they established early is that they prefer not to use Claude Code in terminal mode, wanting instead to work through the extension interface.

The conversation covered the distinction between AntiGravity's own built-in Supabase MCP connection and Claude Code's separate, independent MCP configuration — the two do not share credentials or config files. Claude explained two connection approaches: browser-based OAuth and PAT with Authorization header using hosted HTTP remote URL (`https://mcp.supabase.com/mcp`), and flagged known failure patterns such as the local `npx` stdio route appearing connected while discovering zero tools, and the unsupported `--access-token` CLI flag in Claude Code.

The person's stated goal was to receive a ready-made prompt they could paste directly into Claude Code, letting Claude Code guide them through the entire setup interactively — without the person having to manually run terminal commands or manage file paths themselves. Claude produced a detailed Turkish-language prompt structured around: pre-flight state detection, asking the user which Supabase project ref to use (rather than guessing across their multiple projects), letting the user choose auth method, writing the config with env var references only (never raw tokens), and verifying actual tool discovery rather than accepting a "Connected" status alone as success.

---

## 👤 Kullanıcı (2026-07-07T17:04:21.345208Z)

Claude code nasil Supabase baglantisi set edilir

## 🤖 Claude (2026-07-07T17:04:51.937976Z)


```
This block is not supported on your current device yet.
```

Kullanıcı Claude Code'da Supabase MCP bağlantısını nasıl kuracağını soruyor. Bu benim daha önce ele aldığım bir konu — hosted HTTP remote URL yaklaşımı gerektiğini biliyorum. Ürün detayları içerdiği için önce doğrulayayım ve güncel dokümantasyonu kontrol edeyim.
```
This block is not supported on your current device yet.
```

İki sağlam yol var. Sen daha önce PAT + Authorization header yaklaşımıyla çalışmıştın (çünkü lokal npx stdio yolu sessizce bağlanıp sıfır tool keşfediyor). O yaklaşım hâlâ geçerli, ama artık daha basit bir OAuth yolu da var. İkisini de vereyim.

## Yöntem 1 — En basit: OAuth (tarayıcı ile)

Artık PAT şart değil. Interaktif kurulumda tarayıcı üzerinden OAuth ile bağlanıyorsun.

`.mcp.json` (proje kökünde):

```json
{
  "mcpServers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp?project_ref=YOUR_PROJECT_REF"
    }
  }
}
```

Sonra normal bir terminalde (IDE extension'ında değil):

```bash
claude mcp list
```

`supabase` sunucusunu seçip **Authenticate** dersen tarayıcı açılır, Supabase'e login olur, projeyi yetkilendirirsin. Doğru organizasyonu seçmeye dikkat et.

## Yöntem 2 — Senin bildiğin PAT + header yolu (CI/CD ve çoklu org için)

Non-interaktif ortamlarda veya birden fazla org yönetiyorsan (senin FinOPS / ardictech-website / Demo-VirtualFactory / AstroYou dağılımın gibi) header yaklaşımı hâlâ en stabil olanı:

```json
{
  "mcpServers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp?project_ref=${SUPABASE_PROJECT_REF}",
      "headers": {
        "Authorization": "Bearer ${SUPABASE_ACCESS_TOKEN}"
      }
    }
  }
}
```

Env var'ları shell profiline koy, raw token'ı asla `.mcp.json`'a veya komuta yazma:

```bash
export SUPABASE_ACCESS_TOKEN="..."   # dashboard > Account > Access Tokens
export SUPABASE_PROJECT_REF="abc123" # proje settings > Project ID
```

## Kritik hatırlatmalar (senin daha önce takıldıkların)

Lokal `npx @supabase/mcp-server-supabase` yolunu kullanma — `claude mcp list`'te **Connected** görünür ama sıfır tool keşfeder, sessizce başarısız olur. `--access-token` CLI flag'i de Claude Code'da desteklenmiyor. Hosted HTTP remote URL tek doğru yol.

Diğer noktalar:
- **`project_ref` mutlaka ekle.** Yoksa MCP org'daki tüm projelere erişir. Scope edince `list_projects` gibi hesap-seviyesi tool'lar kapanır, sadece o proje kalır.
- **Sadece okuma istiyorsan** URL'e `&read_only=true` ekle.
- **`.mcp.json`'ı `.gitignore`'a** koy (PAT yolunu kullanıyorsan). Zaten `${VAR}` expansion kullandığın için raw secret dosyaya girmiyor — bu doğru pattern.
- Production DB'ye bağlama; Supabase MCP geliştirme için tasarlandı.

Bir de şunu netleştireyim: Claude Code ve AntiGravity MCP konfigürasyonlarını tamamen ayrı tutuyor, yani birinde kurman diğerini otomatik ayarlamaz — ikisini ayrı ayrı yapman gerek.

Hangi yolu tercih edersin — tek proje için hızlıca OAuth mı, yoksa çoklu org PAT setup'ı mı kuralım?

## 👤 Kullanıcı (2026-07-07T17:08:20.060085Z)

Calude Coe extention olarak Antigravity ye install edilmis vaziyette dedigin gibi ikisi birbirinden farkli, ve AG supabase baglantisina sahip ama Clude code buna erisemiyor. Eben Claude codu su anda terminal modunda degil bu sekli ile kullanmayi tercih ediyorum. dolaysi ile bana sunu yaptirtabilirsen cok iyi olur, bana bir prompt yaz ben Claude code a vereyim o beni adim adim gotursun, simdi beni terminal to pat to path kosturma

## 🤖 Claude (2026-07-07T17:09:14.443463Z)

The user needs a prompt for Claude Code running in AntiGravity that will guide them through setting up a Supabase MCP connection step by step. Since Claude Code has its own separate MCP configuration from AntiGravity's built-in Supabase connection, it needs to handle the entire setup process—generating credentials, managing file paths, and configuration—without requiring the user to manually switch between terminal and other tools.

I'm planning to write this prompt in Turkish, structured to have Claude Code verify the current state first, set up the hosted HTTP remote config with proper environment variable handling for the PAT, ask which of their multiple Supabase projects to use rather than guessing, and verify that tool discovery actually works at the end. I'll format it as a code block so they can easily copy and paste it into Claude Code.İşte Claude Code'a olduğu gibi yapıştırabileceğin prompt. Onu adım adım yürütecek, seni terminale sürüklemeden kendisi konfigürasyonu kurup doğrulayacak şekilde yazdım. Bilinen tuzakları (sessiz sıfır-tool keşfi, AntiGravity config'ine dokunma, raw secret sızıntısı) baştan kapatıyor:

```
Claude Code MCP kurulumu — Supabase bağlantısı. Beni adım adım götür, her adımda ne yaptığını göster ve gerektiğinde durup bana sor. Aşağıdaki kurallara harfiyen uy:

BAĞLAM
- Sen AntiGravity içinde extension olarak çalışıyorsun. AntiGravity'nin kendi ayrı bir Supabase MCP bağlantısı var ama sen ona erişemiyorsun — config'leri tamamen ayrı. AntiGravity'nin hiçbir MCP/config dosyasına DOKUNMA. Sadece Claude Code'un kendi konfigürasyonunu kur.
- Lokal `npx @supabase/mcp-server-supabase` (stdio) yolunu KULLANMA. O yol "Connected" görünür ama sıfır tool keşfeder, sessizce başarısız olur. Sadece hosted HTTP remote URL kullan: https://mcp.supabase.com/mcp
- `--access-token` CLI flag'i Claude Code'da desteklenmiyor, kullanma.

ADIM 0 — DURUM TESPİTİ (önce bunu yap, sonra bana raporla)
- Bu projede zaten bir `.mcp.json` var mı, içinde `supabase` girdisi var mı kontrol et.
- Mevcut MCP sunucularını listele ve bana durumu özetle. Bir şeyi değiştirmeden önce ne bulduğunu söyle.

ADIM 1 — PROJE SEÇİMİ (bana sor, tahmin etme)
- Bağlanacağım Supabase projesinin `project_ref`'ini benden iste. Ben birden fazla projeyle çalışıyorum, sen tahmin etme ya da eski bir ID varsaymayı deneme. Ben verene kadar bekle.
- `project_ref` mutlaka URL'e eklenecek (scope), yoksa MCP org'daki tüm projelere erişir.

ADIM 2 — AUTH YÖNTEMİ (bana sor)
- Bana iki seçenek sun ve hangisini istediğimi sor:
  A) Tarayıcı OAuth (en basit, tek proje için) — headers yok, sadece URL.
  B) PAT + Authorization header (çoklu org / stabil setup için).
- Ben seçmeden ilerleme.

ADIM 3 — KONFIGÜRASYON YAZ
- Seçime göre `.mcp.json` oluştur/güncelle:
  - OAuth ise sadece: type "http", url "https://mcp.supabase.com/mcp?project_ref=<REF>"
  - PAT ise: yukarıdakine ek olarak Authorization header "Bearer ${SUPABASE_ACCESS_TOKEN}" ve URL'de project_ref'i de "${SUPABASE_PROJECT_REF}" env var ile referansla.
- Sadece okuma istersem URL'e `&read_only=true` eklenebileceğini hatırlat, isteyip istemediğimi sor.

GÜVENLİK KURALLARI (esneme yok)
- Hiçbir raw token/secret'ı `.mcp.json`'a, komuta veya chat çıktısına YAZMA. Sadece `${SUPABASE_ACCESS_TOKEN}` / `${SUPABASE_PROJECT_REF}` env var referansı kullan.
- PAT yolunu seçersem: env var'ları shell profiline benim nasıl ekleyeceğimi göster, ama değerleri sen isteme/yazma. `.mcp.json`'ı `.gitignore`'a ekle ve ekli olduğunu doğrula.
- Eğer bir noktada raw secret chat'e veya komut geçmişine düşerse, bunu güvenlik olayı olarak işaretle ve devam etmeden önce token'ı rotate etmemi söyle.

ADIM 4 — DOĞRULAMA (kritik gate)
- Kurulumdan sonra bağlantının SADECE "Connected" göründüğüyle yetinme. Tool'ların GERÇEKTEN keşfedildiğini doğrula: bana basit bir doğal-dil sorgu çalıştırt (örn. "veritabanındaki tabloları listele, MCP tool kullan") ve sonuç dönerse başarı say. Sıfır tool dönerse bunu açıkça söyle ve stdio'ya düşmeden HTTP config'ini tekrar gözden geçir.

Tarayıcı OAuth veya `Authenticate` gibi bir adım gerekiyorsa, bana tam olarak ne tıklayacağımı / hangi org'u seçeceğimi söyle. Terminal komutu gerekiyorsa komutu bana ver ve çıktısını bekle, benim adıma varsayma.
```

Bir not: Claude Code eğer gerçekten terminal-only olmayan bir modda çalışıyorsa (extension paneli), `claude mcp list` gibi komutlar için yine de bir terminal erişimine ihtiyaç duyabilir — o durumda prompt'taki "komutu bana ver" kuralı sayesinde seni tek tek yönlendirir, sen sadece kopyala-yapıştır yaparsın. Prompt bunu da handle edecek şekilde yazıldı.

