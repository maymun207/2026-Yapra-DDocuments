# Yeni şirket için hibrit AI servisleri mimarisi

**Sohbet ID (UUID):** `040d6f6a-b865-4a68-8e44-645685040b87`

**Oluşturulma Tarihi:** 2026-08-01T13:30:47.899400Z

**Güncellenme Tarihi:** 2026-08-01T14:20:34.458820Z

**Özet:** **Conversation Overview**

The person is working on a go-to-market strategy for an enterprise AI product suite and engaged Claude in a strategic planning and web development session. The conversation centered on defining a three-tier service model for new enterprise customers: a private/on-premise deployment of their platform (referred to as EAIP), a hybrid AI services model, and ready-to-use pre-trained agents. The person refined this into two independent axes — deployment model (cloud, hybrid, private) and agent source (catalog agents vs. customer-built agents) — following Claude's pushback that conflating them would create a confusing product matrix.

A central strategic debate emerged around sequencing: Claude argued that leading with the platform ("EAIP," "Enterprise AI Platform") would commoditize the offering against cheaper competitors, whereas leading with specific ready-to-use agents — particularly CWF (Chat With Factory), their flagship manufacturing intelligence agent — would deliver faster time-to-value and stronger differentiation. The person's flagship agent, CWF, enables natural language querying of live factory data (MES, databases) via WhatsApp and web interfaces. Other catalog agents discussed include Dokümana Sor (document Q&A), Excel'e Sor (natural language database queries), and Toplantı Asistanı (meeting summarization). A technically important concept throughout was the "semantic dictionary" (veri sözlüğü) — a structured onboarding artifact capturing domain-specific measurement rules, terminology, unit conventions, and data exceptions that enables agents to give correct rather than merely plausible answers. This concept was illustrated with real examples from a prior ceramics factory deployment (referenced as the Kale project), including rules around hat sonu sayacı (line-end counter as the only reliable production metric), vardiya formatı (shift time format conventions), and barkodsuz hat (a barcode-free line where fire queries always return empty by design).

The person requested a full website be built for a new company entering this space, first receiving a platform-first version and then explicitly rejecting it — noting "we said platform, EAIP again" — and requesting a rewrite. Claude rebuilt the site agent-first, with CWF's hero headline using a customer's own question ("Dün gece 3. hatta ne oldu?"), demoting platform language entirely to a late-stage "when you grow" section, and reframing deployment options as a data sovereignty answer rather than a pricing package. The person's correction established a clear preference: product and outcome language first, infrastructure and platform language only as expansion context. The Activation Sprint (a 3–5 day fixed-fee onboarding service) and a five-input onboarding model (documents, DB connections, semantic dictionary, validation set, and optional MES/ERP integration as Phase 2) were incorporated into the final site. Two open items were noted: the company name (CWF used as working brand) and contact email remain as placeholders pending the person's decision.

---

## 👤 Kullanıcı (2026-08-01T13:30:50.838006Z)

Merhaba Claude, Ben şu an verebileceğiniz servisler üzerinde düşürüyorum. Yepyeni bir şirket düşünün. Bu şirket üzerinde çalış dediğimiz platformumuz kullanabilir. Yani biz onlara private kurabiliriz. Iki, hibrit bir yapıda AI servisleri kullanabilir. Bizim platformumuz dediğimiz,

## 🤖 Claude (2026-08-01T13:31:00.413621Z)

Merhaba Maymun! Mesajın yarıda kesilmiş gibi görünüyor — "Bizim platformumuz dediğimiz," diye bitmiş. Sesli yazdırıyorsan devamı gelmemiş olabilir.

Ama fikrin çekirdeğini aldım: yepyeni bir şirket (greenfield müşteri) düşünüyorsun ve ona iki katmanlı bir teklif kurgulamak istiyorsun — bir, platformumuzu private/on-prem kurarız; iki, hibrit yapıda AI servisleri veririz. Bu zaten Astra/Kale için kurduğun OSS-Hybrid mimarisinin ürünleştirilmiş hali gibi duruyor.

Devamını yaz, tam kurguyu birlikte oturtalım. Özellikle merak ettiğim: bu "yepyeni şirket" hayali bir ideal müşteri profili mi çiziyorsun, yoksa aklında somut bir aday mı var?

## 👤 Kullanıcı (2026-08-01T13:36:44.276519Z)

Üzerinde çalıştığımız eaip - private AI kurabilirz. 2- hybrit ve 3 -bizim haızrladığımız ready to use agentları kullanabilir müşteri diye düşünüyorum. 
1. Private ai kurduğumuzda bu platform üzerinde kensi agentlarını kendisi kurabilir yada 3. Opsiyonda ise , pre trained bizim agentlarımkzı kurabilir. Bu sersisler hakkında ne düşünürsün

## 🤖 Claude (2026-08-01T13:37:07.499975Z)

Yapı doğru ama bir kavramsal düzeltme yapayım: burada üç servis değil, iki ayrı eksen var. Birinci eksen deployment modeli (private / hybrid / cloud), ikinci eksen agent'ın kaynağı (müşteri kendi kurar / bizim hazır agent'larımız). Bunlar birbirine dik — private kurulumda da hazır agent satabilirsin, hybrid'de de müşteri kendi agent'ını yazabilir. Üç paket diye sunarsan müşteri "hem private istiyorum hem hazır agent" dediğinde matris bozulur. Doğrusu: deployment bir fiyatlandırma boyutu, agent kataloğu ayrı bir gelir kalemi.

Stratejik görüşüm net: para ve ölçek hazır agent'larda, platform+DIY tarafında değil. "Müşteri kendi agent'ını kurar" modeli seni yine proje şirketi yapar — uzun satış döngüsü, ağır destek, düşük marj. Halbuki hazır agent'lar (CWF, Dokümana Sor, Excel'e Sor zaten elinde) hızlı time-to-value verir, Bicycle Strategy ile birebir örtüşür ve nakit sıkışıklığında sana en hızlı geliri getirir. Kale'deki Nisan fırın krizi hikayesi de tam bu kataloğun satış kanıtı.

Önerim: satışa hazır agent'larla gir (land), deployment modelini fiyat çarpanı yap (cloud 1x, hybrid 1.5x, private 2-2.5x), "kendi agent'ını kur" özelliğini ise giriş paketi değil expansion/enterprise özelliği olarak sakla. Yani müşteri yolculuğu: hazır agent al → değer gör → platforma geç → kendi agent'larını kur. Bu sıralama hem CAC'ı düşürür hem de platform lock-in'i doğal kılar. Sen tersinden (platformdan) başlatırsan, Pusula.ai gibi ucuz danışmanlarla aynı ringe çıkarsın.

## 👤 Kullanıcı (2026-08-01T13:56:44.471226Z)

Peki şimdi hazır agent düşünelim. Cwf mesala. Cwf kulanabilmek için , müşteri 3 şey girmeli: 1. rag - dökümanlarını yüklesin 2. Db leri ars abağlasın, mcp interface i olan , yoksa biz yaparız. 3. Spesifik data aktaracağı yer varsa, MES ERP gibi . Bunları alsak , cwf kullanabilir mi sence

## 🤖 Claude (2026-08-01T13:57:04.391076Z)

Teknik olarak evet, çalışır — ama "çalışır" ile "doğru cevap verir" arasında kritik bir dördüncü katman var: semantik katman. Kale deneyimin bunu zaten kanıtladı. DB'yi MCP ile bağlamak yetmiyor; CWF'in `K4 sayacı gerçek throughput'tur`, `IKINCILUST barkodsuz çalışır, scrap verisi hep boş döner`, `vardiya formatı 24-08'dir` gibi şeyleri bilmesi gerekiyordu. Ardy'nin system prompt'u 13 bölüm domain bilgisi oldu. Bu bilgi ne dökümanlarda ne DB şemasında yazıyor — fabrikadaki insanların kafasında. Üç girdiyi alıp bırakan bir müşteri, ilk hafta yanlış OEE cevabı alır ve güveni kaybeder.

O yüzden onboarding'i şöyle kurgula: senin üç maddene ek olarak (4) veri sözlüğü/semantik tanımlar — hangi tablo neyi ölçer, hangi sayaç güvenilir, birimler, istisnalar — ve (5) doğrulama seti: müşterinin sorabileceği 20-30 gerçek soru + doğru cevapları. Bu ikisi olmadan go-live yok. İyi haber: 4 ve 5'i tam self-service yapmak zorunda değilsin; guided onboarding olarak 3-5 günlük bir "activation sprint" hizmetiyle paketleyebilirsin. Bu hem kaliteyi garantiler hem de agent satışına doğal bir kurulum geliri ekler ($5-10K gibi).

Bir de sıralama önerim: MES/ERP entegrasyonunu (madde 3) opsiyonel ve ikinci faz yap. RAG + DB ile ilk hafta değer göster, ERP entegrasyonu gibi ağır işleri değer kanıtlandıktan sonra sat. Yoksa onboarding 3 aya uzar ve Kale kontratındaki gibi teslimat baskısı yaratırsın. Kısaca: minimum girdi RAG + DB + semantik sözlük + test seti; MES/ERP expansion.

## 👤 Kullanıcı (2026-08-01T13:59:58.096179Z)

Şimdi o zaman, deployment modeli ve hazır agent kullan servisini anlatan , sorularımızı , semantik sözlüğü de içeren, yeni şirket için bir web sitesi hazırlayabilir misin

## 🤖 Claude (2026-08-01T14:02:57.304776Z)


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

Hazır. Konuşmamızdaki tüm stratejik kararlar siteye işlendi: iki eksen ayrımı (kurulum × agent kaynağı), fiyat çarpanları (cloud 1×, hybrid 1.5×, private 2–2.5×), beş girdilik onboarding (MES/ERP faz 2 olarak işaretli), Aktivasyon Sprinti teklifi ve keşif soruları.

İmza öğe semantik sözlük bölümü: KB7 deneyiminden anonimleştirilmiş beş gerçek madde (hat sonu sayacı, vardiya formatı, barkodsuz hat istisnası, OEE zaman tabanı, fire terminolojisi) lexicon formatında dizildi. Hero'da da tek bir CWF diyaloğu, cevabın hangi sözlük maddesine dayandığını gösteren kenar notuyla — "çalışan demo" ile "güvenilen sistem" farkını ilk ekranda anlatıyor.

İki açık nokta: şirket adı yok, "EAIP" placeholder olarak durdu; iletişim de `mailto:info@example.com`. İsim netleşince ve EN versiyonu istersen ikisini de hızlıca güncellerim.

## 👤 Kullanıcı (2026-08-01T14:17:54.068926Z)

Bence başlangıcımız olmadı, yine platform eaip filan diyoruz. Ne dersin ?

## 🤖 Claude (2026-08-01T14:20:34.458820Z)

Haklısın — kendi stratejimize kendi sitemizde ihanet ettik. Daha iki mesaj önce "platformdan başlarsan Pusula.ai ile aynı ringe çıkarsın, hazır agent'la gir" dedik, sonra hero'ya "Enterprise AI Platform" yazdık. Ziyaretçi ilk üç saniyede "bir platform şirketi daha" görüyor; sorununun çözüldüğünü değil.

Doğru açılış: müşterinin sorusuyla başlamak. Site CWF'i (ve sonuçları) satmalı, platform ise sadece "büyüdüğünde kendi agent'larını da kurarsın" cümlesi olarak arkada durmalı. Deployment da paket değil, güven cevabı: "verin nerede kalır?" Yeniden yazıyorum.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

Yeni açılış: hero artık müşterinin kendi sorusu — **"Dün gece 3. hatta ne oldu?"** — ve cevabın 20 saniyede WhatsApp'tan geldiği vaadi. "Platform", "EAIP", "Enterprise AI" kelimeleri ilk ekrandan tamamen çıktı.

Yapısal değişiklikler: siteyi CWF markasıyla açtım (amiral gemisi), diğer agent'lar katalog olarak altında. "İlk hafta ne değişir?" bölümü eklendi — Gün 1-2 sözlük atölyesi, Gün 3-4 doğrulama, Gün 5 vardiya amirinin cebinde. Deployment bölümü "paketler"den çıkıp **"Veriniz nerede kalır?"** sorusuna dönüştü — çarpan fiyatları da kaldırdım, o iç strateji, web'de yeri yok. Platform ise en sona, tek paragraflık "Büyüdüğünüzde" bölümüne indi; kapanış cümlesi de pozisyonu özetliyor: *"kimse altyapı satın almak için uyanmaz."*

Bir karar sana kaldı: siteyi CWF markasıyla açmak, yeni şirketin adının fiilen CWF olması anlamına gelir. Bence doğru — ürün adı zaten sahada kanıtlı ve akılda kalıcı. Ama şirket adını ayrı tutmak istersen (CWF bir ürün, şirket başka), footer ve logo'yu ona göre düzenleriz.

