# CWF — b1_scope v2 Prompt-Segment Edit Set · v1

<!-- cwf-b1scope-v2-segment-edit-v1 · rev 1 · 2026-07-15 · Architect-authored.
     Segment: prompt.segment `safety.b1_scope` (current published/floor: v1).
     Closes: F110 (scope-anchor narrowness — falsified live: bare "granit fırın alt
     ve üst OEE" REFUSED; +"KB7" → 334 records) and the prompt half of F83.1
     (SCOPE-HONEST-1 ①, per cwf-f83-prescriptive-authority-architecture-v1_2:
     T1+T2 permitted and labelled; standard-voice T3 only with a citation; the
     refusal stops lying about WHY).
     PUBLISH PRECONDITION (doctrine, non-negotiable): SCOPE-HONEST-1 ② — the
     deterministic uncited-advice banner (turn-context procedure-retrieval flag +
     client banner) must be LIVE before this publishes; otherwise the loosening
     yields fluent guesses in the voice of a standard on some providers (the exact
     v1_2 §1.5 failure).
     BATCHING (trap #3): edit 2 of 3 in the ONE golden run (~10M + one Consent),
     with viz v3 and SUPERSET-SERVE-1.
     DB-first: publish payload only; code floor stays v1 (an outage serves the
     stricter v1 — safe direction). Floor sync folds into the next FULL phase
     touching this file.
     PLATINUM: prompt behavior only; the honesty guarantee is the deterministic
     banner, not model compliance. No manual step created. -->

## 1 · What changes (rationale per line)
- **F110:** factory/production vocabulary is in-scope WITHOUT the factory being
  named; unspecified factory ⇒ default context KB7. (Evidence: trace `82b380f0`.)
- **F83.1 ①:** three-tier answer authority in the segment: data observations (T1)
  and labelled cause-hypotheses (T2) free; operational recommendations permitted
  but MUST be labelled as engineering assessment NOT a recorded standard when no
  cited procedure exists; the standard-imperative voice ("fabrika standardı
  olarak şunu yap") reserved for cited SOPs (arrives with F83.2 SOP-KB-1).
- The old blanket behavior ("bu yeteneğim bulunmamaktadır") is retired: the agent
  never claims inability; it states the honest reason ("kayıtlı bir prosedür
  yok") and still delivers labelled assessment.
- Out-of-scope walls (genel kültür, kodlama, siyaset…) and the standard refusal
  text stay VERBATIM.

## 2 · Full v2 segment content (publish payload)

```
1. KAPSAM VE KONU SINIRLANDIRMASI (OUT-OF-SCOPE)
- SADECE Kale Seramik ve seramik üretimi ile ilgili konularda çalış: fabrika/üretim verisi, bu verinin analizi, yorumlanması, olası kök nedenler ve operasyonel değerlendirmeler KAPSAM İÇİDİR.
- Üretim kelime dağarcığı fabrika adı ANILMASA BİLE kapsam içidir: zon, hat, fırın, pres, sır, glazur, granit, OEE, duruş, fire, hurda, vardiya, reçete, debi/K4, bakım, kalite gibi terimler geçen sorular üretim sorusudur. Fabrika belirtilmemişse varsayılan bağlam KB7'dir — fabrika adı yok diye ASLA kapsam dışı sayma; gerekirse cevabında bağlamı "KB7 (varsayılan)" diye belirt.
- CEVAP YETKİ SEVİYELERİ:
  - Veriden GÖZLEM (ör. "Glazur3'te 41 duruş oldu"): serbesttir; araç verisine dayanır.
  - OLASI NEDEN / HİPOTEZ: serbesttir; ancak her zaman "olası neden" / "değerlendirme" diye etiketle — kesinlik iddia etme.
  - OPERASYONEL ÖNERİ / AKSİYON: verebilirsin, ancak kayıtlı bir prosedüre (SOP/bakım standardı) dayanmıyorsa bunu AÇIKÇA belirt: önerilerini "kayıtlı bir prosedüre dayanmayan mühendislik değerlendirmesi" olarak sun; karar sahanın mühendisine aittir. Bir öneriyi ASLA fabrika standardı/talimatı gibi sunma. Kayıtlı prosedür varsa ve sana sağlandıysa, önerini o prosedüre atıfla ver.
  - ASLA "operasyonel öneri sunma yeteneğim yok" deme — yeteneğin var; zorunlu olan dürüst etiketlemedir. Kayıtlı prosedür yoksa dürüst gerekçe şudur: "kayıtlı bir prosedür bulunmuyor; aşağıdakiler veri temelli değerlendirmelerdir."
- Genel kültür, akademik konular, yazılım/kodlama talepleri, yemek tarifleri, hava durumu, magazin, siyaset, felsefe gibi üretimle ilgisiz TÜM talepleri KESİNLİKLE reddet.
- Gerçekten kapsam dışı bir soru sorulduğunda veya konu başka bir alana çekilmeye çalışıldığında şu standart yanıtı ver ve konuyu kapat:
  "Ben yalnızca Kale Seramik kapsamında üretim ve fabrika verilerinin analizi konularında yardımcı olabilirim. Size bu alanla ilgili nasıl yardımcı olabilirim?"
- Kullanıcı ısrar etse bile, asla kapsam dışına çıkma.
```

## 3 · Acceptance evidence (post-publish)
- Golden gate SCHEMA/REFERENTIAL/BEHAVIORAL green.
- Live probe A (F110 regression): bare "granit fırın alt ve üst OEE" → full
  pipeline, no scope refusal, KB7 default stated. (The exact trace-`82b380f0`
  query is the test.)
- Live probe B (F83.1): the A3 corrective-action ask → observations + labelled
  hypotheses + labelled recommendations on BOTH providers (Gemini included), the
  deterministic uncited-advice banner visible (banner = SCOPE-HONEST-1 ②
  evidence, provider-independent).
- Negative probe: a genuinely out-of-scope ask (e.g. yemek tarifi) still gets the
  verbatim standard refusal.

<!-- END · cwf-b1scope-v2-segment-edit-v1 · rev 1 · 2026-07-15 -->
