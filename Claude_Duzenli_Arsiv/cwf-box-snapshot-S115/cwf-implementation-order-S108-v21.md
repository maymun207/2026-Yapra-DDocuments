# CWF — UYGULAMA SIRASI · S108-v21
<!-- 2026-08-19. S107-v20'yi GEÇERSİZ KILAR. Sıra bağlayıcı; SOTA-1 altında
     bir SOTA kalemi aşağı çekilemez, SOTA-DIŞI kalem yukarı alınabilir. -->

## SIRA

**1 · #29 A23 · Step 0+1 (ölçüm)** — SON SOTA ANAHTARI
   Devam noktası: AG-2'nin `phase/a23-step01-measure-1` dalı (DRAFT PR).
   W1: stream-öncesi flush + VARLIK testi (sink mock'lanır, pipeline değil).
   W2: `scoreRouterAbCoverage` + F174 set-genişliği + **`RecallCat@k`** (kategori seviyesi, adıyla).
   W3: 11 soru fixture'ı, TENANT-ZERO kapısı altında (kontrol URL'leri İNMEZ — repoda 0 emsal).
   W4: oda kartı taslağı, ölçülmüş taban sayılarıyla.
   KİLİT (KARAR-A23-SEQ-1): Step 3 makine YOK · Step 4 kanal-2 YOK · Step 5 KALİBRASYON YASAK.

**2 · PHASE-LAW-OKF-1** — sahip hükmü: "merge'den sonra ama MUTLAKA". Vadesi geldi.
   Bir refactor, `docs/laws/`'a dokunuyor ⇒ A23 ile paralel koşabilir (çakışma yüzeyi boş).

**3 · MERGE-QUEUE-2** — gerçek kuyruk. Ön koşul: klasik düzlem kalkmış (iki düzlem okunamaz).

**4 · VECTOR-ONBOARD-DRIP-1** — öncelik kuyruğu + throttling. S102 sahip hükmü: ayrı faz, motor
   anahtarı bunsuz açılmaz. 504 ölçülmüş gerekçe.

**5 · RELAY-RETURN-PATH-1** — dönüş yolu + otonom yoklama. SOTA kalemi değil, ama sahibe zamanı geri
   veren tek kalem; yukarı alınması SOTA-1'e aykırı değildir.

**6 · Üç-modelli test harness'ı** — temiz session per hücre, ≥3 koşu, `turn_id` per hücre.

**7 · A23 Step 2–7** · `RULE26-DEBIAN-DETOX-1` (sonrasında rule26 required olur) · `LANE-TERRITORY-1`.

## ŞERİT DAĞITIMI (4 şerit, sahip hükmü S108)
Dört şerit ONAYLI. Güvenli kılan mekanizma: ruleset + required check + strict + claim ref'leri.
Gerçek kuyruk MERGE-QUEUE-2 ile gelir; ona kadar `strict` tazelikle serileştirir.
Kart başına ZORUNLU ön-kontrol: `merge-base --is-ancestor origin/master HEAD` rc=0 ·
`comm -12` çakışma yüzeyi raporu · `gh pr list --state all` (harcanmış kart) · bütün kuyruk yeniden-eskiye.
<!-- END S108-v21 -->
