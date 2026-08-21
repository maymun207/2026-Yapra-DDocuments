# Yüklenen dosyaları gizli tutma ayarları

**Sohbet ID (UUID):** `77af8ecb-00d9-43fe-b283-41133450b833`

**Oluşturulma Tarihi:** 2026-06-15T05:22:48.445091Z

**Güncellenme Tarihi:** 2026-06-15T05:23:32.458776Z

**Özet:** **Conversation Overview**

The person asked in Turkish about what settings need to be configured to keep uploaded files private on Claude.ai. Claude provided a detailed explanation of Claude.ai's privacy controls, covering the primary setting (the "Help improve Claude" toggle under Settings → Privacy), which when disabled prevents conversations and uploaded files from being used for model training. Claude also explained Incognito mode as an option for one-off sensitive files, noted distinctions between directly uploaded content versus content accessed via external connectors like Google Drive or MCP servers, and described data retention timelines under opt-in versus opt-out states. Claude flagged a carve-out for safety-flagged conversations that cannot be excluded from use regardless of settings. The person was identified as working with confidential business documents related to a company called ARDICTECH, and Claude noted that Team or Enterprise accounts offer stronger default protections for sensitive commercial content compared to consumer accounts where privacy controls are manual toggles.

---

## 👤 Kullanıcı (2026-06-15T05:22:49.143226Z)

yuklenen dosyalarin provate kalmasi icin hangi settingleri yapmam gerekmekte?

## 🤖 Claude (2026-06-15T05:23:32.458776Z)

The user is asking in Turkish about what settings they need to configure so that uploaded files remain private. This is a question about Claude.ai's file privacy features, and since my training data might be outdated on current product settings, I should look into Anthropic's documentation and support resources to give accurate information.Bu konuda güncel bilgi vermem için Anthropic'in dokümantasyonunu kontrol etmem gerekiyor; bir saniye.
```
This block is not supported on your current device yet.
```

I should verify this against Anthropic's official documentation to make sure I'm giving accurate information about their privacy controls.Resmi Anthropic dokümantasyonunu da kontrol edeyim.
```
This block is not supported on your current device yet.
```

I'm looking at the official privacy documentation to give a clear answer about file privacy settings. The key control is the "Help improve Claude" toggle in Settings > Privacy—disabling it ensures conversations and any uploaded files won't be used for model training.

There's an important distinction though: files from external connectors like Google Drive aren't included in training regardless, but content directly uploaded or pasted into the chat is included if model improvement is enabled. Incognito mode also prevents training use entirely with shorter retention. For truly sensitive business documents like Maymun's ARDICTECH materials, an Enterprise or Team account would be the safest option since those accounts prohibit training by default—worth considering given the confidential nature of the work.Yüklediğin dosyaların eğitimde kullanılmamasını sağlayan ana ayar, **Settings → Privacy** altındaki "Help improve Claude" (Model İyileştirme) geçişidir. Bunu **kapattığında**, yeni ve devam eden konuşmaların — içine yüklediğin dosyalar dahil — model eğitiminde kullanılmaz.

Adımlar: Sol alttaki profil simgene tıkla → **Settings** → **Privacy** → "Help improve Claude" geçişini **kapalı** konuma getir.

Bilmen gereken birkaç önemli nokta:

Anthropic'in resmi Privacy Center'ına göre, model iyileştirme açıkken eğitimde kullanılan veri ilgili konuşmanın tamamını, içeriği, özel stilleri ve konuşma tercihlerini kapsar — ancak Google Drive gibi connector'lardan ve MCP sunucularından gelen ham içeriği kapsamaz. Yani: dosyayı doğrudan sohbete yüklersen kapsama girer, ama bağladığın bir Drive/MCP üzerinden erişilen ham içerik girmez (sohbete kopyalanmadığı sürece).

Tek seferlik hassas bir dosya için **Incognito (hayalet ikonu)** modu daha güvenli: Incognito sohbetleri, Privacy Settings'te Model İyileştirme açık olsa bile Claude'u iyileştirmek için kullanılmaz ve geçmişe kaydedilmez.

Saklama (retention) tarafında: yüklediğin dosyalar konuşma var olduğu sürece tutulur; bir sohbeti veya projeyi sildiğinde ilgili dosyalar genelde 30 gün içinde sistemden kaldırılır. Opt-out edersen standart saklama 30 gündür; opt-in edersen bu süre 5 yıla kadar uzayabilir.

Dikkat edilmesi gereken bir istisna: güvenlik incelemesi için işaretlenen (safety-flagged) konuşmalar, opt-out durumundan bağımsız olarak kullanılabiliyor — bu carve-out'u kapatmanın bir yolu yok.

Senin durumunda (hassas ARDICTECH belgeleri, finansallar, mimari dokümanlar) asıl önemli ayrım şu: tüketici hesaplarında (Free/Pro/Max) bu opt-out manuel bir ayar; **Team/Enterprise ve API hesaplarında ise girdiler varsayılan olarak eğitime kapalıdır** — ticari sözleşme bunu sözleşmesel olarak yasaklar. Kurumsal/gizli içerik düzenli olarak işlenecekse, kalıcı çözüm bir iş hesabıdır; tek bir toggle'a güvenmekten daha sağlam olur.

Güncel resmi detay için: privacy.claude.com ve support.claude.com.

