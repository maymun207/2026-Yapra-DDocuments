# REGISTER · BUG BUCKET · v30

<!-- REGISTER-BUG-BUCKET-v30 · 2026-08-11 · S92 kapanışı. v29'u supersede eder.
     Append-only: hiçbir kalem silinmez. -->

## KAPANANLAR (S92)

**KANARYA DEFTERİ → ✅ KAPANDI@`b5da685` — ve teşhis DEĞİŞTİ.** v29'un
"enstrümanın gücünün yetmediğinin dokuz gözlemli kanıtı" cümlesi ÖLÇÜMLE
ÇÜRÜDÜ: 136 koşu okundu, kusur güç değil KURALDI — `separated()` her iki kol
sıfır-olayken HER N'de aritmetik imkânsız (`wilsonInterval(0,n).low = 0`).
Üç bayt: F-S92-1 (kural) · F-S92-2 (`reps_completed` çarpımla uydurma +
`emptyCount 0` empty≠zero ihlali) · F-S92-3 (CI hayalet `verdict` alanı).
Sözlük 3→5 additive, eyleyen yüklem `=== 'regression'` üç tüketicide teste
çivili. **Üretim tanığı: aletin ilk üç hükmü** `no_jurisdiction` + N
(b5da685 · c2f7dfd · 0de5ffd), `reps_completed 9 = scored + failed ÖLÇÜLMÜŞ`
— önceki satırın aynı 9'u çarpımdı, yan yana kanıtlı.

**"Ayrı planlayıcı yok" yalanı → ✅ KAPANDI@`c2f7dfd`.** 8 dosyada yankılıydı;
repo-çapı grep testle SIFIRA çivili (S66-1 pozitif kontrollü: >500 dosya
gezildi, TR+EN ekim ayrı ayrı yakalanıyor). Yol üstünde gerçek loader kusuru:
`loadTurnDoneTelemetry` üç sonucu ("bakacak yer yok" / "okuyamadım" / "hata
YA DA yokluk") tek `null`'a katlıyordu — üç-durumlu yapıldı, eski tüketiciler
bayt-aynı. **Elle tanık:** 04 kartı üretimde dürüst (H5).

**Seramik sözlüğünün son sığınağı → ✅ KAPANDI@`0de5ffd`.** Düz platform
tabanı öldü; `FLOOR_BY_BACKEND`; üç varsayılan argüman öldü;
`coveredBackendIds: null` ("atıf bilinemez") tarih oldu. M1: superset'e boş
taban + ALWAYS_INCLUDE — tenant-zero artık çalışma zamanında da test edilir.

## YENİ W'LER (S92)

**W-036** — stage-08 not/başlık uyumsuzluğu: kart `Sıkıştırma`
(`stagesRegistry.ts:243`), PERMANENT_THIN notu "warm altyapıdır — çıktısı
06/09'un anlık görüntüleri". AG-1 M5 mandası altında BİLEREK dokunmadı ve
adayı işaretledi; 04'ün kapattığı yalan sınıfının bir sonraki üyesi olabilir.
Faz açtırmaz; bir sonraki stage-context dokunuşuna biner.

**W-037** — `check:tenant-zero` gitignored dosyaları tarıyor: canlı script
koşusu için worktree'ye kopyalanan `.env.local` (değeri kapılı token içeren
yerel satır) sahte kırmızı üretir. Muafiyet (gitignored yollar) veya
belgelenmiş not gerek. Kapının kendisi doğru çalışıyor — sahte kırmızı,
sahte yeşilden iyidir; ama iş akışını belgesiz bırakmayalım.

**W-038** — `syncRoutingFloor --report` canlı KEYWORD basar ve armes
`employee` kategorisinde kapılı tenant token'ı VAR: çıktı redaksiyonsuz
`docs/relay/**` içine yapıştırılırsa kapı o raporu kızartır (AG-2 yaşadı,
redakte etti, kapı yeşil). Kural: `--report` çıktısı relay'e girmeden redakte.
#36 FLOOR-RESYNC-1 talimatı bunu taşıyacak.

**PROCESS (Architect sicili, S92):** iki probe hatası aynı oturumda —
(1) çit, `head`-kesilmiş sayımdan yazıldı (25 dosyanın 6'sı) → AG-2 STOP'u
yakaladı → **S92-2**; (2) manifest probe'u yanlış anahtar adıyla (`mappedFiles`
vs `codeAreas`) sessiz sıfır döndü → "reseal gerekmez" yanlış hükmü → AG-1
haklı çıktı → **S92-3**. İkisi de register v96 §3'te yasa.

## DEVREDEN AÇIKLAR (değişmedi)

**W-030** · **W-032** · **W-033** · **W-018** · **W-034**
(TOOL-ANNOTATION-KIND-MINT-1 adlı iş — cron hâlâ superset/honestbench için
`unknown kind` reddediyor, dürüst görünürlük sürüyor) · **W-035**
(`evalGate.ts:160-164` armes bloğu; ⚠ S92 notu: ROUTING-FLOOR-BACKEND-1
`evalGate.ts:166`'daki ÇAĞRIYI backend-farkında yaptı ama :160-164 routing
bloğunun armes-only hâli #13 PACK-FROM-PROTOCOL-1'in evi olmayı sürdürüyor) ·
UI-POLISH-NOTE · Gemini+PII 3. veri noktası.

**BUG:** 005 (proje kapanışı) · 014 (önkoşulsuz) · 015 · 016 · 017
(alet kuyruğu #7-9, sıra değişmedi).
**ARMED:** 010-down · 029 — S92'de doğal tetik görülmedi, nöbet sürüyor.

## ÖLÇÜLEBİLİR HALE GELEN (S92)

- **`failedReps`** artık her kanarya satırında — #35'in teşhis verisi tek SQL
  ile akıyor (üç nokta elde: 6/3 → 3/6 → 6/3, salınımlı).
- **no-jurisdiction üretim ORANI** ölçümüne İKİ organ daha eklendi: planner
  `gate` (turn_done.payload.planner.gate) ve kanarya `decision.verdict` —
  v29'un "telemetri birikince tek SQL" vaadi artık üç kaynaklı.
- **Floor atıf gerçeği:** `coveredBackendIds` floor yolunda gerçek Set — bir
  outage'ın kimi kapsadığı artık ölçülür, "bilinemez" cevabı yok.

<!-- END · REGISTER-BUG-BUCKET-v30 -->
