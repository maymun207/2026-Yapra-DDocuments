# CWF — AÇIK KALEMLER REGISTER · v100 — S96 kapanışı

<!-- cwf-open-items-register-v100 · 2026-08-13. v99'u geçersiz kılar.
     Bağlayıcı sıra rollout v3_2 · çitler fence-map S96-v2. -->

## §1 · SAYAÇ (payda SAYILIYOR)

**Payda 41 · KAPALI 20 · AÇIK 21 · uçuşta: Dalga 3.5 fix (prompt kesildi, relay bekliyor).**
Kapanan — S92: 3 · S93: 3 · S94: 3 · S95: 7 · **S96: 4 (#7 · #8 · #9 · #10 🔑)**.
Sayım: 3+3+3+7+4=20 ✓ · 20+21=41 ✓.
**SOTA kapısı: 2/7** — #2 (S93) + **#10 (S96, canlı mühürlü: census satırı 04:01,
deneyim 3 satır + gölge `captured` 04:50)**. Kalan: #16 · #18 · #23 · #25 · #29.

## §2 · S96'NIN DÖRT MERGE'Ü (tek gün, dört şerit)

`4f62a25` #10-1B (rev 241) → `350b594` #7 → `988cf7c` #8 → `3299a59` #9 (rev 242).
Zemin: **`3299a59` · rev 242 · 562 test · 74 migration (74 uygulanmış, tepe
`20260813090000`) · 14 ADR · drift 7/7** (Architect merge sonrası kendi koştu).
Nihai kesişim matrisi: 6 ikili ∅, iki ilan edilmiş dikiş hariç (`.agents` union ×3
ikili, 0 silme ×3 doğrulama; manifest ardışık mühür 241/242).

## §3 · BULGU DEFTERİ (S96)

| Ad | Durum | Not |
|---|---|---|
| F-S96-SHARED-TREE | KAPALI (yasayla) | Dört olay iki katman (index+ref). Çözüm S96-1 + STEP 0 kapısı. Artık: paylaşımlı klonda yarım `checkTenantZero.ts` — SÜPÜRME kalemi |
| F-S96-AGENTS-SEAM | KAPALI (yasayla) | `.agents` ×2 dosya union dikişi (S96-3); üç merge'de sahada doğrulandı |
| F-S96-CENSUS-ZERO-ROWS | ÇÖZÜLDÜ | Bağlantı olayı yoktu; P1 iyileştirici canlı (ilk satır 04:01). Hız sorunu ayrı bulguda ↓ |
| **F-S96-REFRESH-EXPOSURE-BLIND** | **AÇIK → Dalga 3.5** | Seçici pozlama süzgeçsiz; bütçe sondalanamaz araçlara yanıyor (canlı: p1=8 probed=1→0). Kodun "97 araç < 1 gün" iddiası canlıda YANLIŞLANDI. Taşıyıcı: PHASE-CENSUS-REFRESH-FIX-1-v1 |
| F-S96-SHADOW-ZERO-ROWS | KAPALI | Takvim (turlar 12:39Z'de bitti, organ 18:28Z doğdu); yazar canlı kanıtlı (`state=captured` 04:50) |
| S63-1-EXPERIENCE-ZERO | KAPALI | Aynı takvim; R2 canlı: 3 satır 04:50 |
| W-S96-SYNTH-CEILING | nöbet | Enjektör günlük 200k tavanında görünür durdu (fren DOĞRU); dakikada-bir error-log = log-hijyen W-adayı. Yan etki: sentetik frame üretimi tavan gününde duruk |
| TOOL-ANNOTATION-KIND-MINT-1 | canlı tanık | honestbench 4 draft REFUSED `unknown kind` — kalem zaten adlı (park); census bu yüzden hb'yi sondalayamıyor (pozlama kapısı doğru çalışıyor) |
| armes mirror `missing=9` | seyir notu | CatalogSync her tick raporluyor; faz açtırmaz |
| `unclassified=5` (mkb) + `outcome=unproven` MemoryWrite | seyir notu | #12/#13 ailesinin sahası |

## §4 · YASALAR (S96 üçlüsü — bootstrap'a girer)

- **S96-1 AĞAÇ+REF MÜNHASIRLIĞI:** bir şerit = bir çalışma ağacı; STEP 0
  `git status --porcelain` kanıtı olmadan yazım yok; worktree ref/stash/nesne
  deposunu AYIRMAZ — kendi branch'in dışı yasak, stash yasak, `-B`/force yasak,
  uç kaybında DUR-bildir, her anlamlı commit push edilir; raporda `## TREE` yoksa
  inceleme başlamaz.
- **S96-2 DOĞUM-PENCERESİ:** ayırıcı okumalar organın deploy anına koşullanır;
  doğum-öncesi aktivite kanıt değildir. (Doğuşu: A-REC-S96-2 — Architect'in
  verdikt tablosu pencereyi koşullamamıştı; Operator'ın iki hükmü bu yüzden
  bozuldu/yeniden sınıflandı.)
- **S96-3 UNION DİKİŞİ:** `.agents` ×2 dosya union-ekleme; silme falsifier'ı
  her merge'de hesaplanır.

## §5 · SAYAÇLAR

- **BUG-016 muafiyetsiz-relay:** başladı — adaylar: 3 GO + 1 Operator paketi +
  2 faz promptu (S96'da kesilenler gramer başlıklı). Hedef 10 ardışık.
- **BUG-015 kayıt borcu:** 8 alet `scripts/HARNESS-NOT-YET-ENROLLED-v1.txt`'te
  donuk; sınıf kapanışı kayıtla gelir, merge'le değil.
- **A-REC-S96-1** (klon-münhasırlığı düzyazıda bırakıldı) + **A-REC-S96-2**
  (pencere koşulsuz verdikt tablosu) — ikisi de aynı kök: kural yazmak yetmez,
  kapısını ve penceresini birlikte yazacaksın.

## §6 · SIRA + SAHİP KARARLARI

Sıra: **Dalga 3.5** CENSUS-REFRESH-FIX-1 (solo) → **Dalga 4** (#11 · #15 · #19 ·
#21). Sahip kararları (üçü açık, tek kelimelik): (1) `learning.snapshotRetentionMax`
yayını (öneri: evet) · (2) #37 Dalga 6'ya erken çekim (öneri: evet) · (3) Qdrant
onayı (Dalga 7 öncesi yeter).
S63-1 nöbet okuması (fix sonrası): armes census satır sayısı ~8/tick tırmanır;
97 read aracı yürünene dek izlenir.

<!-- END · cwf-open-items-register-v100 -->
