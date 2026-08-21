# cwf-open-items-register-v101 — S97 kapanışı

<!-- v100'ü geçersiz kılar. Payda 41+2=43 · kapalı 25 · açık 18.
     Zemin: origin/master 0a35d86 · rev 248 · 574 test dosyası · 76 migration
     (76 uygulanmış, tepe 20260813101000) · 14 ADR · drift 7/7 — hepsi S97
     kapanışında taze klondan HESAPLANDI. -->

## §1 · S97'de kapananlar (5)
- **#11 FRAME-ON-ALL-PATHS-1** — her kullanıcı turu frame'i ya koşar ya
  nedenini ADIYLA yazar (kapalı enum + `routing-bypass`); `router.frameOnAllPaths`
  kod tabanı 0, KARANLIK doğdu — yayın gelecekteki sahip kararı. Frame kanıtı
  KENDİ payload kind'ında (BUG-017 paydası korundu). S63-1: yokluk satırı
  nöbette (aşağıda).
- **#15 BACKEND-LIFECYCLE-1** — `public.backends.lifecycle`
  (draft|active|paused|retired), sonuçlar TEK çözücüden; paused = servis yok
  gözlem devam (ADR-010); retired terminal, satırlar tarih. Backfill:
  enabled=false→paused (üretimde 0 satırdı, 5/5 active). Migration `…100000`
  uygulanmış + kapılı.
- **#19 BENCH-RESET-1** — reset kapsamı ADR-014 sınıflarından TÜRETİLİR
  (sıfır elle liste, test kanıtlı dividend); SAFETY-TAKE mutasyonla
  sökülemez; panel yalnız endpoint'in canlı iddiasını gösterir. K2 icra:
  retentionMax v2=50 gated yoldan, read-back source=db. Üretimde sınıf
  kataloğu inene dek TASARLANMIŞ RET (F-S97-CLASS-CATALOG-UNINSTALLED).
- **#21 DISCOVERY-EXTEND-2** — `entity_topology_edges` doğdu (783 kenar /
  6 ebeveyn, ABSENCE-ONLY nefes alıyor: last_seen ilerliyor, silme yok);
  sınıf `operational.mirror` HÜKÜMLE (öğrenme-restore gözlenen dünyayı
  zamanda geri götüremez; #25 kenarları snapshot'a isterse dikili kırmızı
  test organ borcunu adıyla ister). Ekipman R3: probe yolu canlı-hazır,
  gerçek backend'e sonda HENÜZ değmedi (nöbet). Migration `…101000`
  uygulanmış + kapılı.
- **WIRE (LIFECYCLE-SERVE-WIRE-1)** — paused backend canlı turdan çekilir;
  fingerprint state'i config sayar; okunamayan yaşam döngüsü haritası ADIYLA
  degrade olur, asla sessizce served'e değil.

## §2 · Yeni kalemler (sahip-onaylı, S97)
- **#42 RELAY-BUS-1** (K6-S97 evet) — `relay_inbox` (operational.control) +
  ADR-015 (Architect'e TEK-tablo INSERT; repo-yazma sıfır kalır, ADR-002
  korunur; satırlar append-only, secrets yasak, çift-yön çit testi) + AG-yan
  kuruluş kartı. İlk canlı tur çift-hatlı (yapıştırma yedeğiyle, S63-1).
- **#43 CI-DIET-2** (K5-S97 evet) — PR kapısı tek Node sürümü (üretimdeki);
  ikinci sürüm + coverage GECELİĞE; kapı yalnız PR-head (master koşusu
  bloklamaz, kırmızısı alarm); docs-only yol filtresi. S37-2 · eval-gate ·
  tenant-zero · drift DOKUNULMAZ.

## §3 · Sahip hükümleri (S97, bağlayıcı)
- **K2-S97 evet:** retentionMax yayın=50 (İCRA EDİLDİ). F-3 endişesi kayıtlı;
  50 kalır, #30'da buda basıncı görülürse yeniden açılır.
- **K3-S97 HAYIR + yasa:** #37 erken çekilmez — *ölçüm fonksiyonaliteyi
  kovalar, asla önünden koşmaz.* Skor üreten hiçbir iş yaprak_gate'ten önce
  koşmaz; bench-ADLI altyapı kalemleri (#16/#17/#18/#19) fonksiyonalitenin
  kendisidir, ölçüm değil.
- **K4-S97 evet:** Qdrant onaylı; kurulum #27 fazının içinde (Dalga 7).
- **AG adresleme kuralı:** şeritler sahiple daima AG-1..AG-4/Gemini diliyle
  konuşulur; dosya/dal adıyla adres verme ve eşleştirmeyi sahibe yıkma YASAK.

## §4 · Nöbetler (açılmayan, izlenen)
- S63-1 çifti: `[Backends] … withheldByLifecycle=[…]` ilk satırı + frame
  yokluk gölge satırı (`no-covered-flat`/`routing-bypass`) — deploy taze,
  ilk taramada okunacak. "Okunamadı ≠ yok."
- Census yürüyüşü ✅ KAPANDI (97/97, ~8/tick öngörüsü birebir).
- Kanarya `underpowered` kilidi aynen; mühür #37 (Dalga 10 bölgesi, K3 gereği).
- Langfuse fence penceresi **~20 Ağustos'ta açılıyor (≈1 hafta!)** —
  F-OBS-FLUSH-OK-LIE + OBS-HOST-HEALTH-1 önceliği Dalga 5-6'da.
- BUG-016 sayacı: bu oturumun 6 raporu gramer-temiz geçti; kapanış hükmü
  S98'de auditor'ın KENDİ sayımıyla (10 ardışık şartı) verilir.
- W-S96-SYNTH-CEILING devirde.

## §5 · Bulgular (S97 doğumlu)
- **F-S97-REGISTRY-PARENT-OVERWRITE** — `entity_registry` tek-ebeveyn slotu
  son-yazan-kazanır (96 isim >1 fabrika, 212/783 satır). Gerçek artık kenar
  tablosunda; registry kolonu bilinen-dejenere. Çözüm #25 Graph-KB çağında
  (okumaların kenara göçü).
- **F-S97-CLASS-CATALOG-UNINSTALLED** — sınıf kataloğu üretim DB'sinde yok;
  bench-reset tasarlanmış retle bekliyor. #30-öncesi kurulum borcu.
- **F-S97-RELAY-AUDIT-PIPE-CELL** — auditor hücre-içi `\|` kaçışını
  tanımıyor; READ hücresinde shell pipeline yazılamıyor. Auditor çitinde
  küçük takip.
- **W-S97-SHARED-CLONE-USE** — AG-3 merge'ü karantinalı paylaşımlı klonda
  (detached HEAD, ref'siz, zararsız) inşa etti; karantina hükmü S98'de:
  ya resmen kalkar ya yasak netleşir. İçindeki checkTenantZero artığı
  süpürme kalemi hâlâ açık.

## §6 · A-REC-S97 defteri (dört örnek, TEK kök, TEK yasa)
S97-1 (MEMORY.md git-dışı varsayımı) · S97-2 (mcp_settings/backends yanlış
tablo) · S97-3 ("containment kalıcılaşmıyor" — tek sorgu çürüttü) · S97-4
(retentionMax "kod tabanından servis" — DB'de yayınlıydı). Kök aynı:
belge/varsayımdan yazmak. **YENİ YASA S97-L1:** *faz promptlarının FENCE ve
CLAIMS satırları rapor disipliniyle eşittir — oturum-içi canlı okuma
(şema→pg_catalog · dosya→grep · çağrı grafiği→grep) olmadan tek satır çit
yazılmaz.* Dalga 5'ten itibaren her promptta zorunlu.

## §7 · S97 yasa hasadı (S97-L1'e ek)
- **S97-L2 (AG-1 dersi):** taze worktree'de typecheck taban-diff'le okunur —
  134 sahte hata 1 gerçeği gömer; base-commit baseline zorunlu pratik.
- **S97-L3 (AG-2 dersi, S82-3 ailesi):** migration assertion'ları
  YORUM-SOYULMUŞ metin üstünde yargılanır; kendi yorumuyla tatmin olan
  test yer tutucudur.
- **S95-1 canlıda ×2:** rev çakışmasını iki kez yakaladı (244 çifte iddiası;
  dal-geride-kesildi). "Master'dan OKU → sonraki" tartışmasız kanıtlandı.
- **Süreç:** merge TRENİ Dalga 5'te (şerit-başı GO taşıması biter);
  paylaşılan dosya = baştan seri şerit (adminService dersi); Operator'a
  salt-okunur git incelemesi SERBEST, yasak olan repo YAZMAK.

## §8 · Dalga planı (order v9'a taşınan)
Dalga 5: #16 🔑 MOUNT (AG-1) · #13 (AG-2) · #17 (AG-3) · #12 (AG-4) +
**#42 RELAY-BUS-1 + #43 CI-DIET-2** öncü mini-şerit olarak dalga başında
(ikisi de küçük; RELAY-BUS ilk ki dalganın kendisi bus'tan aksın).
Dalga 6: #18 🔑 · #14 · #28 (üç şerit — #37 K3 gereği ÇIKTI, Dalga 10
bölgesine döndü). Dalga 7+: değişmedi (#23/#34/#27 · #25/#33 · #29 →
yaprak_gate · Dalga 10: #37 → #30/#31/#32 → cinekop_gate).

<!-- END · cwf-open-items-register-v101 -->
