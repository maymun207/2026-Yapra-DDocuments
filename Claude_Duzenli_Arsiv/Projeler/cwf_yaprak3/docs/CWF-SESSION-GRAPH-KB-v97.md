# CWF — SESSION GRAPH KB · v97 — S96 işlendi

<!-- CWF-SESSION-GRAPH-KB-v97 · 2026-08-13. v96'yı geçersiz kılar. -->

## S96 · tek paragraf

S96, dört-şeritli modelin ikinci günüydü ve iki yüzü oldu: sabah dört şeridin
tek klonda çakıştığı fırtına (dosya silinmesi, öksüz commit, yabancı diff),
öğleden önce dört temiz merge. Fırtına üç yasa doğurdu (S96-1 ağaç+ref
münhasırlığı · S96-2 doğum-penceresi · S96-3 union dikişi) ve kayıp SIFIR bitmiş
bayt oldu — çünkü origin-tek-güvenli-yer kuralı tuttu ve şeritler sapmayı
sakladı değil beyan etti; BUG-015/016 kültürü kendi doğum gününde kendi
şantiyesinde çalıştı. Dalga 3 aynı gün 4/4 kapandı (rev 240→242, 554→562 test,
73→74 migration), **SOTA anahtarı #10 döndü: kapı 2/7** — hem doğum kanıtı hem
canlı mühürle (census ilk satırı cron'dan, deneyim defteri 3 satır, gölge
`captured`; üçü de tek üretim turuyla). Yol üstünde bir gerçek kusur adlandı:
refresh seçicisi pozlama-kör (F-S96-REFRESH-EXPOSURE-BLIND), fix promptu
Dalga 3.5 olarak kesildi.

## S96 · olay grafiği (özet düğümler)

1. **Boot:** v96 iddiası taze klonda 6/6 doğrulandı (1b7f8dd · rev 240 · 554 ·
   73 · 14 · 7/7). Bean-counter tablosu v7'den sunuldu; sahip Dalga 3'ü açtı.
2. **Dört prompt kesildi** (CENSUS-1B 🔑 · HARNESS-HONESTY · RELAY-AUDIT ·
   FRAME-FORCEFIT), çitler dosya-pinli, tek migration slotu AG-1'de.
3. **Fırtına:** şeritler tek paylaşımlı klondaydı. Sıra: AG-3 yanlış brief
   tuttu (stand-down) → AG-2'nin dosyaları komşu reset'iyle silindi (worktree'ye
   göç + patch kurtarma) → AG-1'in ucu öksüzleşti (`-B` ile öz-kurtarma, sonra
   yasak) → AG-4 stash/pop itirafı. Architect iki öz-düzeltme yazdı
   (A-REC-S96-1/2); TREE-EXCLUSIVITY eki + REF kuralı + karantina yayınlandı.
4. **Dört merge, "kim hazırsa" kuyruğuyla:** `4f62a25`(241) → `350b594` →
   `988cf7c` → `3299a59`(242). Union falsifier üç kez 0-silme; kesişim matrisi
   ∅ + iki ilan dikiş. AG-2'nin detached-HEAD push çözümü meşru kayda geçti.
5. **AG-4 lens-fix hükmü:** alet kendi iki kusurunu doğumda yakaladı (uydurma
   abstain = empty≠zero vakası; yanlış adlandırılmış parite) — düzeltme kaldı,
   iki sayı yan yana yayınlandı, ilk ölçüm: sentetik 11.058 ölçüldü / organik
   etiketli-sıfır-red.
6. **Operator paketi:** G0-G6 kusursuz; idempotens sıfır-op; canlı grant
   doğrulaması SQL-yüzünden. Set B: census=1 (04:01) → anahtar döndü. Operator'ın
   iki verdikti S96-2 ile bozuldu/yeniden sınıflandı — tablo kusuru
   Architect'indi ve adıyla üstlenildi.
7. **Tek üretim turu üç ayırıcıyı mühürledi** (04:50): deneyim 3 satır · gölge
   `captured` · 5 tool_call. Vercel+SQL okumalarını Architect kendi koştu
   (otomasyon-önce; Vercel MCP: dar pencere + tek-kelime sorgu dersleri yeniden
   doğrulandı; "Frame" sorgusunu enjektör gürültüsü yuttu → `entity_ref` ayırdı).
8. **Kapanış:** register v100 · fence-map v2 (§0 tekil-kaynak envanteri) ·
   bootstrap v97 · order v8 · FIX-1 promptu.

## Dersler (KB'ye kalıcı)

- Eşzamanlılık her artışta bir sonraki paylaşılan kaynağı patlatır; işin adı
  kaynakları ÇARPIŞMADAN önce saymaktır — envanter artık çit haritasının §0'ı.
- Kural yazmak yetmez: kapısı (STEP 0) ve penceresi (doğum-koşulu) birlikte
  yazılır — A-REC-S96-1/2'nin ortak kökü.
- İzolasyon birimi "worktree" değil "yazar başına münhasır mutasyon alanı";
  Architect'in alanı boş küme, yükümlülüğü okuduğu pozisyonu beyan (TREE bloğu).
- Beyan edilmiş sapma uyumun kendisidir; ceza yalnız beyan edilmemişe.
- Bir organın yokluğu ancak doğumundan sonra kanıttır (S96-2) — iki "sıfır satır"
  paniği de takvim çıktı; üçüncüsü (refresh hızı) gerçek çıktı ve bayta kadar
  inilerek adlandı.

<!-- END · CWF-SESSION-GRAPH-KB-v97 -->
