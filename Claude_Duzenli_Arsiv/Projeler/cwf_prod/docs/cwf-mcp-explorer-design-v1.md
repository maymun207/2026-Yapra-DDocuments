# CWF — MCP Explorer Tasarım Notu · v1

<!-- cwf-mcp-explorer-design-v1 · rev 1 · 2026-07-13 · Session 40.
     Sahibin talebi (S40, birebir): "MCP kaç tane tool bulduğunu mutlaka söylesin, hatta bir UI olsa
     her MCP backend için hangi tool listesi olduğunu gösteren, o tool'u çağırmak için de bir ekran
     olsa ve ne döndüğünü de görsek."
     Zemin: origin/master 4177eb2 · 2162/211 · rev 71. Her kod iddiası grep'lendi. -->

## 0 · İHTİYAÇ NEREDEN DOĞDU (bu bölüm gerekçedir, süs değil)

Bugün, tek bir sorunun peşinde dört tur harcadık:

1. Ajan dedi ki: *"`getDailyManualScrap` mevcut değil."* → Aracın var olup olmadığını **bilmiyorduk**.
2. Ajanın kendisine sordum → yanlış araca (`search_tools`) gitti, boş döndü → **cevap yanıltıcıydı**.
3. Vercel log'larını okudum → 141 düz araç, 53 sunulan, aranan araç **yok** → ancak burada anlaşıldı.
4. `getScrapBarcodeList` "Zone not found" ve şema ihlali verdi → *"ARMES ekibine sor"* dedim.

Sahibin o an hissettiği eksik tam olarak şuydu: **"keşke bu backend'de hangi araçlar var görebilsem,
birini çağırıp ne döndüğüne bakabilsem."** Haklı. Bugün CWF, bağlandığı MCP sunucuları hakkında
kullanıcıya **hiçbir şey** göstermiyor: kaç araç bulundu, hangileri, argümanları ne, ne dönüyor.

Bu bir konfor eksiği değil, **teşhis körlüğü**dür. Ve bizim kendi kuralımız şunu söylüyor: *bir
teşhisin gerektirdiği manuel adım, eksik bir özelliktir.*

---

## 1 · ZATEN VAR OLAN (ve boşa harcanan)

`api/admin/mcp-probe.ts` bugün şunu döndürüyor:

```ts
interface ProbeResult {
    status: 'ok' | 'error' | 'unreachable';
    toolCount?: number;          // ← SUNUCU ZATEN SAYIYOR
    errorClass?: 'auth' | 'error' | 'unreachable';
    httpStatus?: number;         // ← 401 BURADA
    latencyMs: number;
}
```

Panel bunların **hiçbirini** göstermiyor — sadece yeşil bir nokta. Yani bugün "yeşil" gördüğün şey,
aracın gerçekten listelendiğini **kanıtlamıyor**. `d388d5c2` kullanıcısının kimlik bilgisiz kaydı
aylardır 401 atıyor ve panelde bunun hiçbir izi yok.

**Sonuç:** Faz 1'in yarısı yeni kod değil, **atılan veriyi ekrana koymak**.

---

## 2 · KAPSAM — İKİ FAZ, ÇÜNKÜ İKİNCİSİ TEHLİKELİ

### `MCP-EXPLORER-1` — GÖRÜNÜRLÜK (salt-okuma, risksiz)

| # | Ne | Nereden |
|---|---|---|
| 1 | Probe sonucu satırda gösterilsin: **araç sayısı**, gecikme, ve hata **sınıfı + HTTP kodu** (`auth 401` gibi) | `ProbeResult` — zaten dönüyor |
| 2 | **Araç kataloğu**: sunucu başına, keşfedilen araçların **listesi** (ad + açıklama), aranabilir | `client.listTools()` — probe zaten çağırıyor, sonucu atıyor |
| 3 | **Şema görüntüleyici**: bir araca tıkla → `inputSchema` (zorunlu/opsiyonel alanlar, tipler) | aynı `listTools()` çıktısı |
| 4 | **Backend rozeti**: her araç hangi backend'e ait (`armes` / `superset` / `default`) ve **düz mü gateway mi** | `toolPatternOf(backend_id)` |
| 5 | **Erişilebilirlik rozeti** (bugünün dersi): bu araç bir routing kategorisinde **var mı**? Yoksa **"ulaşılamaz — hiçbir kategoride değil"** uyarısı | `reachableToolNames()` — RULE 31 ile geldi |

**5. madde tek başına bugünkü hatayı önlerdi.** `getDailyManualScrap` katalogda "⚠ ulaşılamaz"
rozetiyle görünürdü ve kimse "aracı öğretelim" diye kural yazmazdı.

Yeni endpoint: `GET /api/admin/mcp-catalog?scope=&id=` — probe'un kardeşi, aynı güvenlik duruşu
(satır sunucuda çözülür, kimlik bilgisi asla dönmez, kişisel sunucuda **yalnızca çağıranın kendi
satırı**). Yetki: `PANEL_ACCESS`.

### `MCP-INVOKE-1` — ÇAĞIRMA KONSOLU (kapılı)

Bu, canlı KB7 MES'ine karşı **keyfi araç çalıştırma** yüzeyidir. Dürüst olalım: 141 aracın hepsinin
okuma olduğunu **bilmiyoruz** — kimse bakmadı. `getX` kalıbı bir gelenektir, bir garanti değil.

Bu yüzden konsol şu kapılarla gelir, ve hiçbiri opsiyonel değildir:

1. **Yeni yetki: `MCP_TOOL_INVOKE`.** Yalnızca `super_admin`. Rol adına göre dallanma yok — yetki
   yapısı zaten böyle çalışıyor.
2. **Kapsam kontrolü:** çağıran, o backend'e erişim kapsamına sahip olmalı (`user_backend_scopes`).
   Panel yetkisi, backend kapsamını **atlamaz**.
3. **Argümanlar `inputSchema`'ya karşı doğrulanır** — istemcide (form üretimi) ve sunucuda (zorunlu
   kapı). Serbest metin JSON gönderilebilir ama şemasız geçmez.
4. **Audit-FIRST** (Veri Otoritesi'nin deseni): yeni `mcp_invoke_audit` tablosu — satır çağrıdan
   **ÖNCE** yazılır (`applied=false`), çağrı dönünce `true`'ya çevrilir. Ayakta kalan bir
   `applied=false` satırı, başarısız/asılı kalmış bir çağrının kaydıdır. Servis-rol yazımı,
   `super_admin` okuması.
5. **Sonuç ham gösterilir, ASLA sohbete yazılmaz.** C1 yasası: `messages` tablosuna sıfır yazma. Bu
   bir tur değildir; bir alettir.
6. **"CANLI ÜRETİM" onayı:** her çağrıdan önce, aracın adını ve backend'i tekrarlayan açık bir onay.
   Sessiz tek-tık yok.
7. **Kota:** çağrılar hız-sınırlı (replay kotasının deseni). Konsol bir yük testi aracı değildir.

**Kasten YAPMIYORUZ:** yazma araçlarını otomatik tespit edip engellemeyi. Ad kalıbına
(`get*` = güvenli) dayalı bir "salt-okuma allowlist"i **sahte bir güvenlik**tir — ARMES'in kendi
şemasında böyle bir sınıflandırma yok. Bunun yerine: yetki + kapsam + audit + açık onay. Kim, ne
zaman, hangi argümanla, neyi çağırdı — **her zaman kayıtta**.

---

## 3 · BU FAZIN AÇTIĞI GERÇEK KAPI (bonus, ama küçük değil)

Konsol bir kez var olduğunda, bugün "ARMES ekibine sor" dediğimiz her şey **kendi başına
kanıtlanabilir** hale gelir:

- `getScrapBarcodeList`'i IKINCILALT zone'uyla çağır → `Zone not found`'u **ekranda gör** → ARMES'e
  ekran görüntüsüyle git. Tahmin yok, tartışma yok.
- Yeni bir aracın gerçek argüman adını **öğren** (bugün `factoryId`'yi Langfuse'tan kazıdık).
- Bir governed kural yazmadan **önce** aracın gerçekten çalıştığını doğrula.

Yani bu faz, "governed kural yaz → dua et → log oku" döngüsünü **"çağır, gör, sonra yaz"** ile
değiştiriyor.

---

## 4 · SIRALAMA ÖNERİSİ (Mimar'ın taahhütlü tavsiyesi)

1. **`MCP-EXPLORER-1`** — hemen. Yarısı zaten var olan veriyi ekrana koymak; riski sıfır; bugünkü
   körlüğü kapatıyor. **Wave-2'nin önüne alıyorum**, çünkü teşhis yeteneği, cila'dan önce gelir.
2. **`PARAM-GOV-1`** — küçük (`MAX_TOOL_ROUNDS` → `agent.maxToolRounds`, clamp'li).
3. **`MCP-INVOKE-1`** — kapılı konsol. Migration gerektirir → **Operator lane'in çalışması şart**
   (bugün kırık: Supabase MCP `fjbrkimwvtpwoxhziidh`'ye yetkili değil).
4. **`ROUTE-GOV-1`** — kategoriler + anahtar kelimeler governed; erişilebilirlik kapısı eval-gate'e
   taşınır; `ALWAYS_INCLUDE` kodda kalır. (Sahibin (ii) kararı.)
5. **Wave-2 kalanı** — IA-2 (Rules/Kinds) + DOCS-1.

---

## 5 · AÇIK SORU (sahibin kararı)

`MCP-INVOKE-1`'de çağrı sonucu **kaydedilsin mi**? İki seçenek:

- **(A) Sadece audit** — kim/ne zaman/hangi argüman + başarı-hata. Sonuç gövdesi **saklanmaz**.
  *(Fabrika verisi kalıcı bir tabloya sızmaz; gizlilik duruşu temiz.)*
- **(B) Audit + sonuç özeti** — ilk N karakter + boyut. Teşhis için daha zengin, ama üretim verisini
  bir yönetim tablosuna taşır.

**Önerim (A).** Sonucu ekranda görürsün; kalıcı yer telemetri değil, senin gözündür.

<!-- END · cwf-mcp-explorer-design-v1 · rev 1 · 2026-07-13 -->
