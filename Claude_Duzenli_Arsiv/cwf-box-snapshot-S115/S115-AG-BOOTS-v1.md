# S115-AG-BOOTS-v1

S114 kapanışında yazıldı, zemin `7c099fc6a6e6534dbabc4d9d0e4e89d84ac78c62`. Şerit boot'ları repoda (`.claude/boot/*.md`, digest'ler bootstrap v115 §0); bu belge yalnız **pencere açma** ve **Operator** metnini taşır.

---

## §1 · PENCERE AÇMA — tek kelime, ama terminalden

Her pencere `cwf_yaprak` klasöründe bir terminal. IDE paneli kullanılmaz (S114: auto-mode sınıflandırıcısı, `/hooks` yok, bayrak yok).

| sıra | terminal komutu | sonra yaz | beklenen ilk satırlar |
|---|---|---|---|
| 1 | `claude --permission-mode default` | `/free` | kapı probu **BLOCKED** · `HEAD = master` · yazmadı |
| 2 | `claude --settings .claude/settings.foreman.json --permission-mode default` | `/ub` | claim kazanıldı ya da lease ile devralındı · poller id · kutu okundu |
| 3–6 | `claude --permission-mode default` | `/wr` | adres AG-1…AG-4 arası kazanıldı · `NO-ADDRESS-FREE` gelirse roster doludur, pencere kapatılır |

**Önce 1 açılır.** Probu BLOCKED değilse ya da HEAD ≠ master ise başka pencere açılmaz; ekran Architect'e.

**İzin soruları** (default mod): claim push · `git push` · `npm run land` · `git push --delete` → **Yes**, her seferinde. "Always allow" seçilmez. `gh pr merge` sorusu **yalnız ustabaşında** gelir; üreticide gelirse ekran Architect'e.

**Bilinen sınır:** poll bütçesi boot'ta hâlâ var; ilk kart (`ADF-KADEME-3-POLL-AND-DONE-1`) inene kadar şeritler ~40 dk sonra sağırlaşabilir. Architect açılıştan sonraki ilk yarım saatte kartları basar.

---

## §2 · OPERATOR BOOT (Gemini) — elle yapıştırılır

```
You are the Operator lane for cwf_yaprak. Project fence: fjbrkimwvtpwoxhziidh — you touch no other project.
Your tools: supabase db push, schema reads, live verification, and from_lane rows in public.relay_inbox addressed as lane_addr='operator'.
Read your box by created_at; consumed_at is RETIRED. Act only on cards addressed to operator. Every migration is a saved file you read back before apply (S102-YASA-3); destructive statements need a named owner consent quoted in the card.
Report each action with the SQL you ran and the row counts it returned. No work without a card. Hold when the box is empty.
```

S115'te Operator işi beklenmiyor (Kademe 3 boot değişiklikleri git'tedir, DB'de değil). Pencere açık tutulur, iş gelirse kart gelir.

---

## §3 · ARCHITECT'İN AÇILIŞ SIRASI

1. Kutu belgelerini oku; SOTA-1'i `docs/laws/constitution/SOTA-1.md`'den kelimesi kelimesine yaz.
2. Çapa tablosunu taze klonda ölç (lane refs: sıfır; phase: sıfır; master `7c099fc6`).
3. `/free` açılış raporunu oku: prob + HEAD.
4. Dört kartı bas (AG-1 poll/done · AG-2 land-fix-2 · AG-4 guard-fix-1 · AG-3 grammar), her biri preflight GREEN, md5'ler burada.
5. İnişleri telden oku; sahipten ekran yalnız bir şerit push etmeden soru sorduğunda.

<!-- END S115-AG-BOOTS-v1 -->
