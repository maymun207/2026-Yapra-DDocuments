# CWF — AÇIK KALEMLER REGISTER · v114 (S111 kapanışı)
<!-- 2026-08-21. v113'ü GEÇERSİZ KILMAZ — DEVRALIR VE AYNAYA DÖNÜŞTÜRÜR.
     ALTIN DEFTER KAYDI: v113'ün tüm kalemleri MERGED-INTO docs/ground/open-items.md.
     Hiçbir kalem kapanış kaydı olmadan düşmedi. Bu, S110'un 18 kalemlik kaybının çaresidir. -->

## §0 · KANONİK EV DEĞİŞTİ — bu belgenin statüsü

**Açık kalemlerin kanonik evi artık `docs/ground/open-items.md`'dir** (S111'de AG-3 tarafından
inşa edildi, master `2f080462`). Append-only, **iki kat kapısının** arkasında:

- **bayt tabanı** — bir mint kısalamaz
- **kalem tabanı** — kalem sayısı düşemez; düşen her kalem `CLOSED@<evidence>` /
  `SUPERSEDED-BY` / `MERGED-INTO` taşımak zorundadır, yoksa **build KIRMIZI**

Bir kalem defterden çıkmaz; **OPEN kümesinden** çıkar ve satırını, kapanışını üstünde taşıyarak
korur.

**Bu dosya bir AYNADIR.** Kutuda her oturumda hazır bulunan nüshadır. **Çelişkide REPO KAZANIR**
ve fark bir bug olarak kaydedilir (türev-kaynak yasası). Ayna asla öncül değildir.

> **Neden bu kayıt önemli:** S110'da register iki mint'te 17.249 → 4.923 bayta indi ve **18 kalem
> kapanış kaydı olmadan düştü**; aynı gün Architect'e üç kez yanlış hüküm verdirdi. `docs/laws/`
> hiçbir şey kaybetmedi çünkü kapısı vardı. Register kaybetti çünkü yoktu. **Mekanizma kanıtlıydı,
> yalnız defterlere uygulanmamıştı.** Uygulandı.

---

## §1 · S111'DE KAPANANLAR — kapanış kanıtıyla

| Kalem | Kapanış |
|---|---|
| `PHASE-ARCHITECT-GROUND-TRUTH-1` (A–H) | `CLOSED@2f080462` — dört şerit, PR #317/#318/#319/#321/#322 |
| `#25 GRAPH-KB` bağımlılığı: ölçüm organı | `MERGED-INTO docs/ground/census.latest.json` |
| Register/KB/bug-bucket'ın append-only'e taşınması | `CLOSED@2f080462` — `docs/ground/open-items.md` |
| `RULE-54` mint | `CLOSED@2f080462` — 55 kural, gramere bağlı |
| `GI-015` ancestry suçlaması | `CLOSED@fa299b2f` — üç değerli predikat, sığ klonda kanıtlı |
| `GI-014` / markdown arm | `SUPERSEDED-BY F-S111-GROUND-MD-UNGATED` (daraltıldı, kapanmadı) |
| `A23-STEP01` ölçüm organı bağımlılığı | `MERGED-INTO PHASE-CONTEXT-RETRIEVAL-1` |

---

## §2 · AÇIK — S112 sırasıyla

**⓵ `PHASE-ARCHITECT-CARD-GRAMMAR-1` — S112'nin 1 numaralı kartı.**
Belgesi kutuda. On iki kart kuralı, hepsi S111'in altı kusurlu turundan ölçülerek türetildi.
`kind=card` grameri · insert-öncesi denetim · yasa metinleri · preflight. ZEMİN kalemleri
**karanlık iner**. Gerekçe sahibin: *"süreçte bir hata olduğunda dişliler birbirine giriyor ve
bunu çözmek 4+ saat alıyor, bunu efford edemeyiz."*

**⓶ `PHASE-CONTEXT-RETRIEVAL-1` — ASLA DÜŞÜRÜLMEZ.**
Sahip hükmü S110, kelimesi kelimesine: *"retrieval'i da bir sonraki turda yap ama mutlaka
yapılmalı, skip sakın."* Projenin **kendi** Qdrant'ıyla (TEK-ORGAN). Korpus sırası: yasalar +
`docs/ground/` → repo dokümanları + ADR → proje kutusu → **oturum arşivleri** (sonuncusu sahip
aksiyonu ister: dışa aktarım yalnız sahibin yapabileceği iş).
**Bağımlılık:** `VECTOR-ONBOARD-DRIP-1` — iki tüketici (CWF araç retrieval'i + Architect bağlam
retrieval'i) tek kutuda olduğu an öncelik kuyruğu taşıyıcı hale gelir.

**⓷ `#81 BACKEND-DISCOVERY-1`** — dört eksik: proaktif süpürme · içerik derinliği · doğrulayıcı ·
tur anında okuyucu. Kabul çıtası sahip test seti (Q2 · Q20 · Q21 + iki doküman sorusu),
**orijinal cümlelerle**.

**⓸ `#29 A23 ⑤/⑥ MAKİNESİ`** — SOTA kapısının kalan iki anahtarından biri. Spec dormant, makine
yok; üçlü teşhis `stageClarify.ts:329`'da ölüyor; patlama yarıçapı 95/678.

**⓹ Küçük kalemler — sıra serbest, hepsi ölçülmüş:**

| Kalem | Ölçüm |
|---|---|
| `F-S111-GROUND-MD-UNGATED` | tek `validateStamp` çağrısı uzaklıkta (`parseFrontMatter` indi) |
| `F-S111-GROUND-GATE-IN-DEPLOY-BUILD` | `check:ground`, Vercel'in deploy komutunun içinde |
| `F-S111-SHARED-CLONE-IDENTITY-LEAK` | paylaşımlı klon HEAD'inde bayat lane-claim commit'i |
| `F-S111-RELAY-CONSUMED-NOT-WRITTEN` | `consumed_at` son yazma 2026-08-19T02:03Z; **sinyal değil** |
| `F-S111-BACKEND-RETIRED-ENABLED` | `armes-new` lifecycle=retired ama enabled=true, 141 araç |
| `F-S110-SUITE-TIMING-ASSERTION-LOADSENSITIVE` | master defekti, kendi kartı |
| `readAncestry` mükerrerliği | doğruluk kazancı yok, düzeltme kalemi |
| RULE-54 migrasyonu | 1512/1715 satır · 380 tek-mercek yokluk iddiası |
| Üç öksüz denetim defteri | `llm_provider_secret_audit` · `mcp_secret_audit` · `provider_audit` |
| `MEMORY.md` sıkıştırma | 409 konu · 195 ulaşılabilir (%47.7) · 0 kırık link · **münhasır oturum ister** |
| `PHASE-LANE-SHELL-PERMISSIONS-1` | repoda `.claude/settings.json` + "tek komut, tek çağrı" |
| Merge queue | repo kişisel hesapta → **org'a taşıma sahip kararı**; `merge_group` tetikleyicisi hazır |
| Yerel hijyen raporları | hijyen kartı 21:34:44Z basıldı; S112 açılışında okunur |

---

## §3 · UFUK — düşmez, unutulmaz

- **`#82b` Design-RAG** — sahip hükmü S105: *"şimdilik park et ama ASLA UNUTMA."* Tetik: sahip
  çağrısı ya da A23 sonrası envanter konuşması. **⓶ ile aynı organa binecek.**
- **⑦ Yol B vektör tüketicisi** — A23 §9 Step 1.5. **S111'de öncülü ölçüldü:** vektör korpusunun
  *"okuyucusu YOK"* iddiası ÇÜRÜTÜLDÜ (off-turn okuyucu var), *"tur yolunda okuyucu yok"* iddiası
  ise DOĞRULANDI. Öncül artık iddia değil ölçüm.
- **`VECTOR-ONBOARD-DRIP-1`** — sahip hükmü S102, valften önce, ayrı faz.
- **`A23 v1_4` mint** — Architect borcu, Step 1.5 ve parite ölçümünden sonra.
- **Qdrant admin yüzeyi** — sahibin kendi ertelemesi, vektör kapısının arkasında.
- **G3 doğum kanıtı** — ARMES toparlanması ve Hülya'nın üç soruluk gözlemi.

---

## §4 · SOTA KAPISI

Son yazılı hâl **5/7**, kalan anahtarlar `#25 GRAPH-KB` ve `#29 A23`.
⚠ Bu satır `RELAYED:proje-talimatları §9` — S102 kapanışından. **S112 açılışında ÖLÇÜLECEK,
hatırlanmayacak.** `architect:open` artık bunu mümkün kılıyor.

<!-- END cwf-open-items-register-v114 -->
