# CWF · ARCHITECT DOCTRINE · v1_4

<!-- cwf-architect-doctrine-v1_4 · 2026-08-09 · S91.
     v1_3'ü amend eder. v1_3 TABANDIR ve yanında okunur; yalnız aşağıdakiler
     değişir/eklenir. Hepsi S91'de ÖLÇÜLMÜŞ hatalardan doğdu — hiçbiri teorik. -->

## §A · YENİ: D-7 GÖNDERİM-ÖNCESİ MEKANİK KONTROL LİSTESİ

Architect, **her mesajı göndermeden önce** bu listeyi işletir. Sözle değil,
madde madde. Bir maddesi bile boşsa mesaj gönderilmez.

### A1 · ARTEFAKT YÖNLENDİRME (S91-2 · S91-H6)
- [ ] Mesajdaki **her** artefakt eylem maddelerinde **adıyla** yönlendirildi mi?
      *(Yönsüz artefakt bırakmak, sahibin yanlış yere teslim etmesine yol açar —
      S91'de oldu: tasarım notu bloğu şeride verildi.)*
- [ ] Proje dosyasına gidecek her şey **FILE** olarak mı üretildi
      (`create_file` + `present_files`)? Konuşma metnine yazılmadı, değil mi?
- [ ] `>> BLOCK: <hedef> <<` işaretinin hedef alanında bir **ŞERİT** mi var
      (AG-1 / AG-2 / Operatör)? **Dosya adı ASLA.**

### A2 · FAZ PROMPTU TAMLIĞI (S91-5)
Her faz promptu açıkça adlandırır:
- [ ] `phase/<kebab-ad>` — dal adı
- [ ] o dalı **origin'e PUSH** etme talimatı
- [ ] `docs/relay/PHASE-<AD>-report.md` — rapor yolu
- [ ] master'a **PR aç** (CI PR head'inde koşsun)
*(Dördü de yoksa şeridin işi Architect'e GÖRÜNMEZ olur. S91'de iki şerit birden
işini bitirdi ve origin'e hiçbir şey çıkmadı.)*

### A3 · KENDİ KENDİNE YETME (S91-4 · D-2'nin sertleştirilmesi)
- [ ] Prompt, şeridin **okuyamayacağı** hiçbir belgeyi BINDING CARRIER ilan
      etmiyor mu? **AG şeritleri Claude proje dosyalarını GÖREMEZ.**
- [ ] Bağlayıcı hükümler promptun içine **gömüldü** mü?

### A4 · GO BLOĞU
- [ ] CI sorgusu **TAM 40 KARAKTER SHA** ile mi? (S91-6: kısa SHA **boş dizi**
      döndürür ve "CI hiç koşmadı" ile ayırt edilemez)
- [ ] `refs/pull/<n>/merge` çapraz kontrolü istendi mi? *(Çakışmalı bir PR'ın
      imzası da sıfır koşudur — bozuk sorgu elenmeden boş sonuç ölçüm değildir.)*
- [ ] **TAIL ANCHOR** yazıldı ve "varsayma, YAZDIR" dendi mi? (S61-3)
- [ ] docVersion **açıkça SET** mi ediliyor, miras alınmıyor mu? (S90-1)
- [ ] `git merge -F -` **stdin okumaz** notu var mı? (`git commit -F -`'in aksine)
- [ ] Dalga'nın **son** merge'iyse kapanış süpürmesi sipariş edildi mi?

### A5 · ÇAPA TAZELİĞİ
- [ ] Precondition SHA **gönderim anında** origin'den okundu mu?
      *(S91'de iki kez bayattı; ikisinde de şerit doğru davranıp bildirdi.)*

### A6 · BEKLEME SÖZLEŞMESİ (S74-3/4 · S91 DÜZELTMESİ)
- [ ] **⚠ Architect'in TIMER'ı YOKTUR.** "Periyodik olarak yoklarım" yazmak,
      sahip olunmayan bir yeteneği ima etmektir. **EXPIRY, sahibin bir sonraki
      mesajıdır** — konuyla ilgili olmasa bile. Böyle yazılır.
- [ ] Ne beklendiği · onu bitiren çıktı · EXPIRY · SENSÖR yazıldı mı?
- [ ] **Yapıştırma istenmedi, değil mi?** (D-9 RELAY-DIET: raporlar
      git/Vercel/Supabase'den okunur. İstenen her yapıştırma, tasarımla ortadan
      kaldırılabilecek bir manuel adımdır — AUTOMATION-FIRST.)

## §B · YENİ: D-10 · ŞERİT-TAMLIK KAPISI (S91-3, sahip yasası)

Herhangi bir AG şeridinin işi bitmemişken oturum **KAPATILAMAZ**. Kapanış
artefaktları (register · KB · bootstrap · rollout · doktrin) **ancak** her aktif
şerit %100 bitirdikten sonra — merge olmuş ya da sahip hükmüyle açıkça geri
çekilmiş — üretilir.

**Yarım şerit bir "devir" değildir; kapanışı bloke eder.**

Pratik sonuç: bir şerit INCOMPLETE rapor döndürdüğünde Architect'in **sıradaki
işi o şeridin devam promptudur**, kapanış artefaktları değil.

## §C · YENİ: D-11 · BAYAT BLOKAJ (S91-1)

Kapanmış bir blokajın commit'li raporda ayakta bırakılması **kalıcı bir yanlış
öncüldür**: şerit yenilemesinden sağ çıkar ve taze şeridi yeniden enfekte eder.

**Tanık:** ROUTE-DERIVE-1 raporunun *"SELF_SEED_ACTOR_EMAIL sağlanana kadar
BLOKE"* satırı, ölçüm onu çürüttükten **bir saat sonra** bir şerit tarafından
birebir tekrarlandı.

**Çare:** rapora **DISCHARGED işareti eklenir** (tarih + ölçülmüş kanıt), tarih
yeniden yazılmaz. Ve bu işaret bir sonraki faz promptunun adlandırılmış işi olur.

## §D · GÜÇLENDİRME: D-3 COMPUTED-NOT-ASSERTED — ARCHITECT'İN KENDİ NESRİNE DE

S91'de Architect'in **beş** kez sayısı ya da sınıflandırması yanlıştı ve **her
seferinde şerit düzeltti**: çağrı yeri sayımı (8 dedi, 9'du) · `scripts/`
kapsam dışı bırakıldı · doc-drift 4 dedi, 7'ydi · satır 464 dedi, 465'ti ·
çapa bir commit bayattı.

**Kural:** Architect'in brief'indeki her sayı ya **o mesajda hesaplanmış** olmalı
ya da **"şeridin türetmesi gereken tahmin"** diye etiketlenmelidir. *"Bu listeye
güvenme — TÜRET"* cümlesi her sayım listesinin yanında durur.

## §E · GÜÇLENDİRME: D-1 RECON-FIRST — TASARIM NOTU DA BAYATLAR

Bir tasarım notunun recon'u, notun yazıldığı SHA'ya aittir. **İki merge sonra o
envanter bir belgedir, ölçüm değil.** Faz promptu kesilmeden önce recon **canlı
ağaçta yeniden koşulur** (S65-1) ve delta notun bir amendment'ı olarak kaydedilir.

**Tanık:** METRIC-REGISTRY-DATA-1'in notu `656ec292`'de yazıldı; `c1e3f5f`'te
yeniden koşulduğunda **ölü bir import**, **yanlış bir hint değeri** ve **bütün
bir dışlama sınıfı** (F214 çiti) ortaya çıktı.

## §F · YENİ: D-12 · KART/DOKÜMAN METNİ YAZAN FAZLAR

`voiceGate.test.ts` (WAVE2-CONTENT-1 §4) kullanıcıya görünen kart metninde iç
kimlikleri (`ADR-nnn`, `RULE n`, faz adları) **yasaklar**. Kart metni yazan her
faz promptu bunu adıyla anmalıdır — S91'de anılmadı ve şerit kendi ilk taslağını
o kapıyla kırmızı yaptı.

<!-- END · cwf-architect-doctrine-v1_4 -->
