# Video ve text tasarım özellikleri

**Sohbet ID (UUID):** `11bb1e99-2a4f-42e3-ae85-0b8c368b662a`

**Oluşturulma Tarihi:** 2026-06-30T13:01:37.089570Z

**Güncellenme Tarihi:** 2026-06-30T13:02:11.271235Z

**Özet:** **Conversation Overview**

The person asked in Turkish whether Claude Design supports video and text capabilities. Claude clarified that Claude Design is a visual design tool — not a video processing or transcription tool — and explained its actual functionality: accepting text prompts and static visual inputs (screenshots, images, assets, codebases) to generate design outputs on a canvas (landing pages, UI, slides, prototypes, pitch decks), exportable to PDF, PPTX, HTML, or Canva.

Claude explained that video is not a supported input type and that transcription is outside the tool's scope. For actual video-to-text transcription needs (particularly for Turkish-language content), Claude recommended a Whisper large-v3 workflow using faster-whisper: extract audio from video via ffmpeg, run Whisper for a Turkish transcript, then pass the resulting text to Claude for summarization or structuring. Claude also noted a workaround within Claude Design's actual capabilities: if the person wants to reference a frame from a video, they can take a screenshot of that frame and upload it as a static image, which is a supported input method.

Claude ended by asking a clarifying question to determine the person's actual goal — whether they needed transcription or wanted to use a video frame as a design reference in Claude Design.

---

## 👤 Kullanıcı (2026-06-30T13:01:37.643922Z)

claude design video dan text yapilabiliniyor mu?

## 🤖 Claude (2026-06-30T13:02:11.271235Z)

The user is asking in Turkish whether Claude Design can convert video to text. They want to know if that's a capability available in Claude Design, though their question seems to cut off mid-thought.

I should search Anthropic's documentation to give accurate information about Claude Design's current capabilities rather than guessing, especially since this is a specific product feature question. I'll respond in Turkish since that's the language they used.
```
This block is not supported on your current device yet.
```

I'm looking at what Claude Design actually does—it takes text prompts, screenshots, images, and design systems to create visual work like UI designs and landing pages that can be exported to various formats. The user is asking whether you can extract text from video in Claude Design, but based on what I'm finding, that's not a capability this tool has since it's focused on design output rather than video processing.Hayır, Claude Design'da video'dan text çıkarma (transkripsiyon) yapılamıyor. Claude Design bir tasarım aracı — amacı bu değil.

Claude Design şöyle çalışıyor: sen metin promptu yazıyorsun, istersen referans olarak screenshot/görsel/asset/codebase ekliyorsun, o da canvas üzerinde görsel tasarım üretiyor (landing page, UI, slayt, prototip, pitch deck vb.). Girdi olarak desteklediği görsel materyaller screenshot ve statik görseller; video bir girdi türü değil. Çıktı da PDF, PPTX, HTML veya Canva'ya export edilebilen tasarım.

Yani "video → text" iki sebepten Claude Design'ın işi değil: video input olarak kabul edilmiyor, ve transkripsiyon zaten tasarım canvas'ının amacı değil.

Eğer gerçek ihtiyacın video'yu yazıya dökmekse (transkript), doğru yol STT. Senin Türkçe içeriğin için en sağlam seçenek hâlâ **Whisper large-v3 (faster-whisper ile)** — videodan sesi ayır (ffmpeg ile `.wav`/`.mp3` çıkar), Whisper'a ver, Türkçe transkript al. Sonra o metni Claude'a (bu arayüzde veya Claude Code'da) verip özetleme/yapılandırma yaptırabilirsin.

Sorunun amacı transkripsiyon mu, yoksa videodaki bir tasarımı/ekran görüntüsünü Claude Design'a referans olarak mı vermek istiyorsun? İkincisiyse, videodan bir frame'i screenshot olarak alıp ekleyebilirsin — o desteklenen bir akış.

