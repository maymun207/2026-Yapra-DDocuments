# CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT · v96 — S96 açılışı

<!-- v95'i geçersiz kılar. S37-1. İlk mesaj: "S95'ten devam". -->

## §A · KİMLİK + YASALAR (verbatim tekrar zorunlu)

SOTA-1 + S82-6 ilk mesajda **verbatim**. Doktrin **v1_4** · D-7 · DALGA-ÇAPA
(S88-1) · S74-3/4 (Architect şerit çıktısını origin'den KENDİ okur — S95'te
bu bire bir uygulandı, sahip hiç rapor yapıştırmadı) · otomasyon-önce ·
PLATINUM · sahip maddeleri insan-dili Türkçe, adım adım.

Yasa katmanları: S89(5) · S90(2) · S91(6) · S92(3) · S93(3) · S94(3) ·
**S95 üçlüsü**:

- **S95-1 DALGA-MÜHÜR YASASI (dört-şerit çağının temel yasası):** docVersion'ın
  merge turu başına TEK yazarı vardır ve **hiçbir şerit kendi içinden ilk merge
  eden olup olmadığını bilemez**. Bu yüzden mühür İNŞA sırasında ASLA basılmaz;
  her şerit kendi merge turunda: rebase → docVersion'ı MASTER tarafından OKU →
  bir sonraki numarayı al → rebase edilmiş ağaçta `npm run reseal` → AYNI
  commit'te bump. REDRAW talebi = DUR ve bildir. (Doğuşu: A-REC-S95-1.)
- **S95-2 SIRA-DEĞİŞİMİ RELAY YASASI:** merge sırası değiştiğinde değişiklik
  TÜM şeritlere aynı turda relaylenir. S95'te sıra tersine çevrildi, üç şerit
  haberdar edildi, AG-1 edilmedi; bedeli iki fazla rebase + CI'sız çakışan bir
  push oldu (A-REC-S95-2).
- **S95-3 BÖLME ERTELEME DEĞİLDİR:** sahip algoritması tek faza sığmıyorsa faz
  adıyla ikiye bölünür (1A/1B), her iki yarı da kuyruğa adıyla girer ve
  **anahtar ancak ikinci yarıda döner**. 1A'nın raporu, 1B'nin yokluğunun
  CANLI SONUCUNU adıyla yazmak zorundadır (örnek: "bir kez `unread` olan araç
  yeniden bağlanana dek öyle kalır").

Sahip terminolojisi (S95'te kondu, bağlayıcı):
**yaprak_gate** = yedi SOTA anahtarı dönmüş, mimari tamam, henüz ölçüm yok.
**cinekop_gate** = liste sıfır + ilk ölçüm turu alınmış, SOTA kanıtlanabilir.
Kural: yaprak_gate = mimari tamam · cinekop_gate = sistem kanıtlanmış.
Dalga sayısı PLAN'dır, ölçüm değil.

## §B · RULE-25 BOOT (taze TAM klon; iddia — DOĞRULANACAK)

`origin/master` **`1b7f8dd9490b8943e730e4e4175223385ec54dae`** · docVersion
**rev 240** · **554** test dosyası · **73** migration (canlıda 73, bire bir —
ledger tepesi `20260812200000`, Operator `pg_catalog`'dan doğruladı) ·
**14** ADR · drift kapısı 7/7 temiz.

**S95'in sekiz merge'ü (dört-şerit, iki dalga, tek gün):**
Dalga 1 — `32c0222` (#24, rev 234) · `261714d` (#22, rev 235) ·
`6ab9cea` (#41) · `d8e7688` (#40, rev 236).
Dalga 2 — `6b7ac73` (#26, rev 237) · `0ace26b` (#20, rev 238) ·
`b5745d3` (#6, rev 239) · `1b7f8dd` (#10-1A, rev 240).

**SOTA kapısı: 1/7** — DEĞİŞMEDİ. #10-1A anahtarı DÖNDÜRMEZ; #10 ancak 1B ile
kapanır (R2 defter + R3 cron/taze + R4 evrim farkı).

**Kanarya:** üç ardışık 9/9-0 mührü aynen; `underpowered` cap'te kilitli
(checked 6<9) — izlenir, açılmaz, yeniden teşhis YASAK, mühür #37.

## §C · S96'NIN İLK İŞLERİ (Dalga 3 — dört şerit hazır, promptlar kesilecek)

| Şerit | Kalem | Not |
|---|---|---|
| AG-1 | **#10-1B** 🔑 | R2 defter + R3 cron/FRESH + R4 evrim farkı. **Kapı 2/7 burada olur** |
| AG-2 | **#7** BUG-015 aletleri (+W-026 ×5) | |
| AG-3 | **#8** BUG-016 relay-denetçisi | |
| AG-4 | **#9** BUG-017 ölçüm | #7+#8+#9 birlikte #14'ün kilidini açar |

Dalga 3 sonrası: açık 25 → 21, kapı **2/7**.

**Sahip kararları (üçü de açık, tek kelimelik):**
1. `learning.snapshotRetentionMax` yayınlansın mı (kod tabanı 500; öneri: evet).
2. #37 Dalga 6-7'ye erken çekilsin mi (K-3 cap 3→5 koşu bedeli var; öneri: evet).
3. Qdrant altyapı onayı (#27, Dalga 7 öncesi yeterli).

## §D · DEĞİŞMEZLER (yeniden tartışılmaz)

S89–S95 katmanları aynen · SOTA kapısı = mimarinin tamamlanması (1/7; kalan
#10·#16·#18·#23·#25·#29) · uygulanmış migration dokunulmaz tarih (73'ü de) ·
`where true` kanonik (S94-1) · `information_schema` yasak, `pg_catalog`
zorunlu (S94-2) · **ADR-014: her tablo doğumda kalıcılık sınıfı beyan eder;
sınıfsız tablo CI'ı iki yönde kırar** · voiceGate admin panellerine KÖR ·
AG şeritleri geçici klonda Vercel CLI çalıştırmaz · Operator'da `git pull`
OKUMA eylemidir.

## §E · DOSYA SETİ (projeye yüklü olacak)

`CLAUDE-PROJECT-INSTRUCTIONS-v4` · `cwf-sota-definition-v1_5` ·
`cwf-architect-doctrine-v1_4` · `cwf-master-rollout-plan-v3_2` ·
bootstrap **v96** (bu) · register **v99** · KB **v96** · bucket **v33** ·
`cwf-implementation-order-S95-v7` · `cwf-parallel-fence-map-S95-v1` ·
`cwf-design-TOOL-BEHAVIOR-CENSUS-1-v1` (1B'nin taşıyıcısı) ·
`cwf-design-LEARNING-SNAPSHOT-1-v1_2` · `cwf-design-CANARY-REP-FAILURE-1-v1` ·
`cwf-sota-run-guide-S91-v1` · `cwf-advisor-note-CS329A-lessons-v2` ·
`cwf-architecture-research-S82-v1`.

SİLİNECEKLER: register v98 · KB v95 · bootstrap v95 · bucket v32 ·
`cwf-implementation-order-S95-v6` · `cwf-design-PERSISTENCE-CLASS-1-v1`
(tüketildi — ADR-014 doğdu).

⚠ Şeritler proje dosyalarını GÖREMEZ (S91-4); faz promptları kendine yeter.

## §F · İLK MESAJDA SÖYLENECEK TEK CÜMLE

*"S95 dört-şeritli çalışmanın ilk günüydü ve sekiz merge'le kapandı (rev 240):
kalıcılık sınıfı yasası dikildi ve ADR-014 doğdu, çıplak silme taraması ev
geneline yayıldı ve sıfır ihlal ölçtü, LINE katmanı hem teşhis aletini hem
sonda korpusunu kazandı, vektörün geçmesi gereken çıta ve tek maliyet organı
kuruldu, frame kendi gerekçesini gölgede kaydetmeye başladı ve araç-davranış
sansüsünün sonda motoru canlıya indi — kapı hâlâ 1/7 çünkü #10'un anahtarı
1B'de dönüyor, ve S96 dört şeritle Dalga 3'ü açıyor."*

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v96 -->
