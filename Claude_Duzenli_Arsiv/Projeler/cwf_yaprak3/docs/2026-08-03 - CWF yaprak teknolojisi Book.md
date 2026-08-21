# CWF yaprak teknolojisi Book

## Kullanıcı

cwf_yaprak technolojisini anlatan, text book niteliginde, Dibia nin kitabinin structure yapisina benzeyen bir kitap olusturabilirmisin? Icine gorselleri da koyalim, bunu docx formatinda olusturalim.

## Claude

I need to create a comprehensive textbook on cwf_yaprak technology modeled after Dibia's multi-agent systems book, complete with visuals and formatted as a docx file. Let me start by reviewing the project instructions, then check the session knowledge base and open items to understand the current state, and examine Dibia's book structure along with the HTML architecture diagrams available in the project files to use as reference material. I need to decide on the book's language — the technical artifact convention points to English, and I'll commit to that rather than asking. The book will be in English, though it could be localized later if needed.

Now I'm reviewing the instructions to understand the token budget before diving into the content.
```
This block is not supported on your current device yet.
```

I'm checking the current knowledge base versions and the master rollout plan to gather the architecture content I need for the book, focusing on the key source documents that will be most relevant.
```
This block is not supported on your current device yet.
```

I'm pulling up the PDF to get Dibia's book table of contents.
```
This block is not supported on your current device yet.
```

I should try alternative PDF extraction tools like pdftotext or pymupdf since the current approach might be truncating the document.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

I'm checking the file header to see what's causing the corruption.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

The file has a .pdf extension but it's actually plain text, so I'll read it directly and pull out the table of contents.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

I'm examining how Dibia structures its chapters internally—looking at the section numbering, learning objectives, key takeaways, figures, tables, and conclusions to understand the pattern I should replicate.
```
This block is not supported on your current device yet.
```

Now I'm examining the chapter-opening patterns and how figures and tables are formatted throughout the document.
```
This block is not supported on your current device yet.
```

I'm mapping out the structural conventions Dibia uses throughout the book—Parts with introductions, numbered chapters that start with learning objectives, hierarchical sections, captioned figures, sidebar callouts, chapter summaries with key takeaways, and reference sections.

Now I need to pull the CWF architecture content. I'm prioritizing the core files—the master plan, architecture decision records on trust and restrictions, the IR taxonomy, measure phase design, memory architecture, and current state documentation—then selectively reading based on token budget rather than trying to ingest everything at once.

Let me start by grepping markdown headers across the files to build a quick content map before diving into full reads.
```
This block is not supported on your current device yet.
```

I'm scanning through the most substantive documents to prioritize my reading—starting with the master plan and the architecture decision records, focusing on the ones with the most detailed content and foundational design information.
```
This block is not supported on your current device yet.
```

I'm going to review the ADRs now, pulling together a few at once.
```
This block is not supported on your current device yet.
```

I'm reviewing several architecture decision records and design documents to understand the system better.
```
This block is not supported on your current device yet.
```

Looking more closely at ADR-012's core sections, the IR taxonomy, and how the memory design fits together.
```
This block is not supported on your current device yet.
```

Looking at the IR taxonomy and memory design patterns now.
```
This block is not supported on your current device yet.
```

Looking at the memory design section, specifically the components described in part 3, and checking the current versions—KB is at v78 while the register is at v82.
```
This block is not supported on your current device yet.
```

I'm checking the current state of the knowledge base and register, then reviewing the master rollout plan to get my bearings before diving into the book architecture.
```
This block is not supported on your current device yet.
```

I need to examine the HTML architecture files to understand the pipeline structure and identify the 14 stage names for the book.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

I've got a partial concept map with 14 stages now, so I'm looking for the complete stage list from 00 through 14 by searching through the file more carefully.
```
This block is not supported on your current device yet.
```

I'm noticing some gaps in the stage numbering and need to track down the missing entries. Let me search through the architecture documentation and runtime files to find where stages 04, 05, 06, and 08 are defined, since the memory design references stage 05 as a memory slice and stage 06 as governed knowledge.
```
This block is not supported on your current device yet.
```

I'm mapping out a 14-stage pipeline for processing requests, starting with quota gates and user queries, moving through conversation state, intent recognition, and planning, then into memory retrieval and knowledge augmentation before tool selection, context compression, and continuing through the remaining stages.

Now I'm thinking through the book structure—mirroring a theory-to-practice approach with four parts covering foundations, architecture, optimization, and application, starting with why governed agentic systems matter and introducing the 15-stage turn pipeline as the architectural core. The three-lane operating model with architect, author, and operator roles plus doctrine, then a real incident walkthrough showing how everything connects end-to-end, and finally the transition from custom workflows to enterprise agentic IP with multi-tenancy considerations. I'm aiming for around 15-16 chapters across four parts to match the structure and pacing of similar frameworks, so I'm consolidating and reorganizing to hit that target.

Now mapping out the middle sections: intent resolution and routing to find the right tool, composing the prompt at a single completion site, the four-part memory anatomy, and knowledge retrieval with different paths and engine rules. Then Part III covers trust and provenance to neutralize unreliable backends, earned trust through discovery, the eval-gate for publishing truth, observability across three systems tied to a turn ID, and measurement with honest reads and health dashboards. Part IV is still forming but will handle the operational side.

I'm debating the chapter count and structure for the final part. Consolidating around restriction taxonomy as valves rather than walls, the three-lane operating model with the architect's doctrine, and a case study walking through a real turn end-to-end. Aiming for 16 chapters total to keep it tight and focused on quality rather than padding the count.

Now I'm thinking about the format and structure for each chapter—opening with learning objectives, numbered sections, visuals, and summary takeaways. I need to figure out how to generate the figures, whether through matplotlib or SVG, and I'm considering writing the whole thing as a Python script that outputs a docx file to manage the length and complexity.
```
This block is not supported on your current device yet.
```

I'm planning to generate the book using docx-js, and for the diagrams I'll need to convert SVG images to PNG format—I should explore tools like cairosvg, rsvg-convert, or matplotlib to handle that conversion.
```
This block is not supported on your current device yet.
```

I'll use matplotlib to create clean box-and-arrow architecture diagrams with consistent styling and full control over the design. DejaVu Sans will handle any Turkish characters that might appear in the text. Now I'm planning out roughly twenty to twenty-four figures, starting with a diagram showing the capability gap in models.

I'm mapping out the full figure list: the CWF system context with users and backends, the fifteen-stage turn pipeline with span trees, real execution timelines, the database-first approach with three code roles, the three homes for structure/data/secrets, backend identity concepts, flat versus gateway backends, the IR frame contract, the routing ladder from frame down to floor, tool information sources, the candidate funnel, prompt composition with domain packs, memory anatomy across four types, episode lifecycle stages, Path A versus Path B comparisons, and the threat model ladder with four tiers of protection.

Continuing through the remaining figures: two-tier provenance with envelope and payload, the discovery loop with earned trust enforcement, the evaluation gate with schema and behavioral checks, three observability systems tied to a single turn ID, four render states for empty versus zero, the health board with six bands and verdict, the four-layer restriction taxonomy with valve model, the three-lane operating model, the KB7/Granit incident case study, and finally the CWF to EAIP layering with floor and tenant split. That's roughly twenty-eight figures total—a solid textbook density. Building all of these in matplotlib is feasible with a reusable helper function.

I'm creating a Python module with helper functions for drawing boxes, arrows, and other common shapes, then generating all figures as PNGs at 200 DPI. On the Node side, I'll build the docx with a title page, copyright and version info, preface explaining the book's structure, a table of contents field, parts and chapters with proper heading levels, figures with captions, tables, chapter summaries, and an appendix containing the glossary, ADR index, and laws index. Given the scope, I'll organize the book content as separate JS modules—one per part—to keep things manageable.

Actually, a simpler approach: define the content as a single module using a mini-DSL with block objects that specify headings, paragraphs, bullet lists, figures with captions, tables, code blocks, and callouts. Then a renderer converts these blocks into docx elements, which lets me write prose efficiently without wrestling with docx formatting directly. I'm estimating around 18 chapters at roughly 900 to 1400 words each, totaling about 25,000 words—a substantial but focused deliverable.

Now I'm thinking through the practical workflow: I'll organize the project with a figures generator script, separate content modules for each part, and a build script that assembles everything into a final docx file. The visual design needs consistency across all diagrams—I'm settling on DejaVu Sans for typography and a color palette with deep slate for structure, teal for deterministic concepts, purple for LLM-related ideas, and amber for clarity highlights.

Writing the figure generator...Kaynakları okudum. Şimdi kitabı üretiyorum — önce şekiller, sonra docx.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

Moving on to the figures for the first batch covering chapters 1 through 6.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

Let me take another look at figure 6.1 to see if that computed arrow target is rendering the way I expect.
```
This block is not supported on your current device yet.
```

The arrows are converging at the wrong spot, so I need to redistribute them across the top edge of the target box instead of clustering them together. I'm adjusting the arrow endpoints to spread from x-coordinates 40 through 66 along the box's top edge.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

The ring label placement looks acceptable with the nested structure reading clearly from the labels at the top-left of each box. I should move forward with writing the book content and spot-check a couple of figures along the way.

Now I'm building out the content system. I'll create a DSL-based module that supports various block types like paragraphs, headings at different levels, figures with captions, tables, code blocks, callouts, and summaries. For inline formatting, I'm supporting bold, italic, and monospace markers. I'll write the renderer first to handle all these block types, then move into drafting the actual book content.

The book title is "Governed Agentic Intelligence: Principles, Patterns, and Implementation of the CWF Platform," drawing inspiration from similar structural approaches.Şekiller hazır. Şimdi kitap içeriği ve docx üreteci.
```
This block is not supported on your current device yet.
```

I'm planning out the structure for a textbook, starting with the front matter and first three chapters. I want to adopt a didactic style with concrete examples, tables, and explicit figure references, then create the content files for the introduction and opening sections. 3.6 through 3.8 wrap up the governance substrate with distinctions between partial and complete states, the deterministic versus soft trap, then move into Part II covering backends as data, intent resolution through frame and action contracts, tool routing with a candidate-set problem at scale, and prompt composition at the single completion site.

Now I'm outlining the remaining chapters on core modules and domain packs, governed segments, the two completion sites, memory's four-part anatomy with multi-signal retrieval and promotion mechanics, and knowledge retrieval with governed versus soft knowledge.

Continuing through knowledge retrieval paths and the engine ruling, then moving into Part III which covers trust and provenance—starting with an incident that reveals the threat model and establishing how trust functions as a deterministic ceiling that can be earned or revoked, with two tiers of provenance tracking.

Then discovery and earned trust, where hardcoding admissions lead to discovery law and degree tests, distinguishing between declarations as claims and the signals when they mismatch, enforced at two speeds with an honest limit around inconsistency rather than outright falsehood.

Finally the eval-gate as an unbypassable checkpoint with three stages, handling publish, version, rollback, and audit trails while rejecting the anti-oracle principle.

Now moving into observability—three distinct systems that must never be conflated, unified by a single turn ID and a full-trace mandate enforced by construction, accounting for transport realities.

Then measurement and honest reads, where numbers in logs are claims themselves, the silent-zero family of problems, understanding that empty doesn't equal zero at the read layer, pagination cliffs at scale, health boards, and positive controls to verify what we're actually seeing.

Entering Part IV on operating and scaling, starting with restriction taxonomy—thinking about valves rather than walls.

The remaining chapters cover the three-lane operating model, a production case study walking through the anatomy of a turn, and the transition from CWF to EAIP, followed by appendices for laws, ADRs, glossary, and references.

I'm ready to start writing the content files now, keeping the textbook register throughout—explaining and motivating the concepts, generalizing principles, and using project specifics as worked examples rather than status reports.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

Moving on to Part II now, covering chapters 4 through 9.
```
This block is not supported on your current device yet.
```

Moving on to write out Part III covering chapters 10 through 14, then Part IV with chapters 15 through 18 plus the appendices.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

I'm starting the build script to handle the document structure—title page, copyright, table of contents, and assembly. I need to configure numbering for bullets and ordered lists, set up headers and footers with page numbers, and define section properties. Since the user is in Turkey where A4 is standard, I'll stick with that, but I'm noticing a discrepancy: the current PAGE_W in render.js is set to 9360 dxa (6.5 inches), while A4's actual width is 11906 dxa, so I need to reconcile that.

After adjusting for margins—I'll use 2cm side margins and 2.2cm top and bottom—the usable width works out to accommodate the table width without overflow. Now I'm moving on to write the title page and table of contents.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

I'm looking at the first six pages of a 78-page document.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

Kitap üretildi. Durum ve içerik özeti:

## Ne yapıldı

**Kaynak okuması:** `CLAUDE-PROJECT-INSTRUCTIONS-v3` → master plan v5_3 → ADR-001/005/006/009/010/012 → IR taxonomy v3 → MEMORY-1 design → measure design → KB v78 → rollout plan v1. Ayrıca Dibia'nın kitabının yapısı çıkarıldı (dosya aslında `.pdf` uzantılı düz metin — pypdf/pdftotext başarısız oldu, metin olarak okundu).

**Dibia yapısı birebir taklit edildi:** 4 Part (theory → build → optimize/govern → apply), her bölümde *"This chapter covers:"* açılışı, numaralı alt bölümler (N.1, N.1.1), Figure/Table numaralandırma, callout kutuları, ve *"In summary, here are the key takeaways"* kapanışı.

## Kitabın yapısı — 18 bölüm, 4 kısım, 78 sayfa

| Part | Bölümler |
|---|---|
| **I · Foundations** | 1 Governed agentic systems · 2 Anatomy of a turn (15 stage) · 3 DB-first/code-floor |
| **II · Building** | 4 Backends as data · 5 Intent resolution · 6 Finding the right tool · 7 Prompt composition · 8 Memory · 9 Knowledge & retrieval |
| **III · Trust, Measurement, Governance** | 10 Trust & provenance · 11 Discovery & earned trust · 12 Eval-gate · 13 Observability · 14 Measurement |
| **IV · Operating & Scaling** | 15 Valves not walls · 16 Operating model · 17 Case study · 18 One customer to many |
| **Appendices** | A Named laws (18) · B ADR index · C Glossary |

**28 özgün şekil** (matplotlib ile üretildi, projenin kendi renk anahtarıyla: teal=deterministik, mor=LLM, amber=iddia, yeşil=governed, kırmızı=arıza). Gerçek turn verisi (`trace a1cb63ab`, 145→27→2, 513ms, 64,208 token) Bölüm 2, 6 ve 17'de üç kez farklı açıdan işleniyor.

## İki karar (tek yol, menü değil)

1. **Dil = İngilizce.** Locked convention: teknik artefakt İngilizce. Türkçe lokalizasyon ayrı bir sürüm işi, aynı içerik üzerinden.
2. **Tenant-zero uygulandı.** Kale/KB7 kelimeleri metinde yalnız vaka çalışmasında geçiyor; floor anlatımı jenerik — kitap `check:tenant-zero` disiplininin kendi ürünü olmalıydı.

## Kalan iş — senin onayın gerekli

Kitabı `present_files` ile sunmadan önce PDF'in kalan 72 sayfasını görsel olarak denetlemem gerekiyor (tablo taşması, şekil kırpılması, TOC alan güncellemesi — Word'de açıldığında TOC'un F9 ile yenilenmesi gerekebilir, bu docx-js'in bilinen davranışı).

**SENİN AKSİYON MADDELERİN:** yok — devam etmemi söylemen dışında.

Devam edeyim mi, yoksa önce içerik iskeletinde değiştirmek istediğin bir şey var mı? (Örneğin: WEB-VALVE-1 ve TENANT-CONSOLE gibi henüz inşa edilmemiş kalemleri Bölüm 18'in "designed but not built" defterine adıyla koydum — orada tutulmasını istemediğin bir kalem varsa şimdi söyle.)

## Kullanıcı

Continue

## Claude

I'll proceed with rendering the remaining pages at a lower resolution to efficiently check for any issues, particularly focusing on pages with tables and figures, then present the final file.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

The image didn't render visibly at first, but it seems to have actually come through—just maybe as a blank or small placeholder. Let me check a few of the key pages to see what's actually displaying.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

The view tool seems to be having trouble displaying images—it's just showing "[image]" placeholders. This might be a size or format issue, so I'll try resizing them down with ImageMagick to see if that helps.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

The image verification approach isn't working, so I'm switching to text-based checks instead. I'll use pdftotext to extract and verify all chapters and appendices are present without garbled content, scan for truncated lines, and programmatically count the figures in the document to ensure everything matches expectations.Görsel denetim aracı yanıt vermiyor; metin ve yapı düzeyinde programatik denetime geçiyorum.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

I'm checking the figure numbering across the document—there are 30 figure references from 1.1 through 18.2, and I notice Figure 5.2 isn't captioned as such because I reused that image file in Chapter 6 and labeled it as Figure 6.1 instead. Now I'm verifying whether the routing ladder figure is actually referenced in Chapter 5.

Looking at the tables, I've got 17 tables spread across various chapters with proper captions, though some chapters like 3, 6, 7, 9, 12, 14, and 17 don't have any tables—which is fine, though chapters 6 and 14 could potentially benefit from them. I'm also noticing that my grep search for figure captions only returned 5 results because the captions are centered with leading spaces in the layout mode, so that's not a real issue. Let me check how the chapter headings are actually rendering in the document.
```
This block is not supported on your current device yet.
```

The regex pattern for matching chapter 8 is too strict with its spacing requirements — pdftotext's layout mode might format the spacing differently, which is why chapters 8 and 13 aren't showing up in the grep results. I should test the pattern directly against the actual text to see what's happening.
```
This block is not supported on your current device yet.
```

All 18 chapters are rendering properly with Turkish characters and special symbols displaying correctly. I'm noticing that Figure 2.2 has "dun gece" without the umlaut in the matplotlib figure, but I need to verify whether I actually wrote it with the umlaut in the code or if it's missing there too.

Now I'm checking the 143 lines that exceed 118 characters — most of these are just wide table rows from the PDF conversion, not necessarily actual overflow issues. I need to verify the table widths programmatically to ensure they fit within the usable page width of 9638 dxa, so I'm going to write a quick validation script.
```
This block is not supported on your current device yet.
```

All the tables fit in the document. I'm checking the figure dimensions against the maximum width of 620 pixels allowed in the Word document—that's about 6.45 inches at 96 DPI, which fits within the usable width. Some figures are quite wide relative to their height, like one at 2280×1280 pixels, but scaling them to 620 pixels wide brings the height down to around 348 pixels, which works fine.

However, I'm noticing a real problem with text readability. When I scale down figures that are 10 to 11.4 inches wide to fit the 6.45-inch print width, the font sizes become too small—effective sizes drop to around 4.5 to 5.5 points, which is unreadable in print. I need to fix this by either reducing the figure canvas widths so the scaling factor is closer to 1, or increasing all font sizes by about 1.5× and adjusting the figure dimensions accordingly. The cleanest approach is to make figures around 7 inches wide with proportionally larger fonts, since the effective point size depends only on the ratio of font size to figure width.

To get readable text at the 6.45-inch display width, I need a font-to-width ratio of about 1.085 points per inch. Currently I'm at 0.754, so I'd need to scale fonts by roughly 1.44×. I could monkeypatch a global font multiplier in my figure library, but that risks text overflowing boxes. The real issue is that reducing the figure's physical width doesn't help much since the docx image width is capped at 620 pixels anyway—what matters is the print rendering, where an 11.4-inch figure with 8.6pt text displayed at 6.45 inches becomes unreadably small.

Either increasing font sizes or shrinking the figure width in inches would make text relatively larger, but both approaches risk overflow. The practical solution is to bump font sizes up by about 1.35× and also increase the maximum image width allowed on the page—I can push it closer to the usable width of 6.69 inches.

Actually, looking at my figures more carefully, many are extremely wide at 11in × 5in. Rather than just tweaking dimensions, I should apply a global font multiplier and verify it visually, but since I can't see the rendered output right now, the safer approach is to moderately increase font sizes by about 1.3× while also reducing figure widths a bit—though this carries some risk without being able to check the results.

Wait, let me reconsider whether 4.9pt is actually that problematic. On screen at normal zoom it's small but readable, and even printed it's marginal but legible like footnote text. It's not ideal for a textbook, but it's not completely unreadable either. Rather than trying complex solutions like computing text bounding boxes or programmatically checking for overflow, let me try a simpler approach: get image viewing working again so I can actually see what I'm dealing with.
```
This block is not supported on your current device yet.
```

The image viewer issue means I need a more reliable approach than visual inspection. I'm going to shrink the figure width while keeping the font sizes and data layout intact — this compresses everything proportionally without distorting the design, and matplotlib handles it naturally.

But I realize that's not actually a free solution either; shrinking the figure makes text relatively larger, which still risks overflow. The real answer is to measure: I'll write a check that computes whether each text element's rendered bounding box actually fits inside its container, using matplotlib's renderer to get precise extents. It's more work than guessing, but it gives me the evidence-based verification the owner wants.

My plan is to add a `box()` function to figlib that records text artists and their patch containers into a registry, then inside `save()` I'll draw the figure and compare each text's window extent against its box rect in display coordinates, reporting any overflows. I can then apply a global `FONT_SCALE` environment variable and iterate until there are no overflows, finding the largest scale that works.Görsel denetim aracı yanıt vermediği için, şekil okunabilirliğini gözle değil **ölçerek** doğrulayacağım — metin kutu taşmasını programatik kontrol eden bir denetleyici ekliyorum.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

I'm seeing there are already 3 layout overflows at scale 1.0, so I need to identify which elements are causing them and adjust the layout accordingly. Let me check the overflow points at both 1.0 and 1.15 to find the highest scale where everything fits without overflow.
```
This block is not supported on your current device yet.
```

I've got actual data now. At FONT_SCALE=1.30, I'm getting 26 overflows which would require widening a lot of boxes. Scaling down to 1.15 reduces that to just 6 overflows with an effective font size around 5.7pt, which is still pretty tight. Rather than keep adjusting box widths, I'm thinking it might be more efficient to reduce the canvas width itself instead.

But wait — if I shrink the canvas from 11in to 8.6in while keeping the xlim the same, the drawing scales down proportionally but the text stays at the same point size, which effectively makes the text relatively larger. That's equivalent to applying a font scale of 1.28, so I'd get the same overflow behavior with no real improvement.

The actual solution is that the boxes need to be wider relative to their content. Most of the overflows are horizontal, meaning the text is simply too wide for its box. So I need to either shorten the text or widen the boxes. With about 26 fixes needed at 1.30, it's tedious but manageable. I'm identifying the biggest offenders — cases where text is dramatically too long for its box — and splitting them across multiple lines to fit properly.

Writing patch script... For the tool boxes in fig_4_2, I'm shortening the function names to fit better—using abbreviated versions like "getFactoryLines", "getOeeValues", and "getLineStops" instead of the full "getOeeValuesForZones", with a note for the remaining tools. For fig_5_2, I'm widening the "THE FLOOR IS SACRED..." box and adjusting the line breaks to fit the new dimensions. Moving to fig_6_1 now to compress those source box labels. Adjusting the second box text to fit better across lines, and widening the canvas for figure 8.2 from 24 to 25.5 units while reflowing the "DISTIL" description to break more naturally. Continuing to adjust text wrapping and box dimensions across the remaining figures—shortening lines in the observation box, tightening the payload containment section, widening and condensing the draft box, adjusting the trace ID box width, and splitting the verdict box into two lines. Moving into the figs_c.py file now to handle figure 16 and beyond. Writing a Python patch script...Ölçüm somut veri verdi. Şimdi taşan etiketleri düzeltip en yüksek güvenli ölçeği bulacağım.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

Zero overflows start appearing at 1.30, with failures kicking in at 1.40, so 1.30 marks the safe upper limit from my testing. At that scale, an 8.6pt label on an 11-inch canvas renders to about 6.55pt—acceptable for a textbook figure. Let me test 1.35 to see if I can push slightly higher before finalizing.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

All 30 figures are accounted for with no overflow issues, so I'll rebuild the document and verify everything again. I'm also increasing the maximum image width to 640 pixels to better utilize the available space. Let me update the render configuration and double-check that the figure references in the text match their actual filenames—the cross-references look correct. One final pass through Chapter 17 to confirm that the terms "KB7" and "Granit" mentioned in the text are actually present in the corresponding figure.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

Page 6 is essentially blank since it's the table of contents page, which won't populate until the document is opened in Word—that's expected behavior with docx-js fields. LibreOffice didn't fill it in, but the document itself will update the TOC when opened in Word, though the user might see a prompt asking whether to update fields that reference other files.

I can improve this by enabling the `updateFields` flag in the docx-js Document settings, which tells Word to automatically update fields on open without prompting. Let me add that setting, rebuild the document, and check whether LibreOffice will now populate the TOC with this flag enabled. Page 79 is just a trailing blank page, which is fine.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

I'm realizing that LibreOffice won't auto-populate a field-based table of contents, so I should create a static, hand-built contents list instead to ensure readers see it in any viewer. I can combine this with the field-based TOC for Word users who get clickable page numbers, and I'll focus the static list on Parts and Chapters rather than including every h3 section to keep it manageable.

The challenge is getting accurate page numbers without rendering first. I'm considering a two-pass approach: build the document with placeholder page numbers, render it to PDF, extract the actual page numbers by searching for heading text in the rendered output, then rebuild with the correct numbers. It's mechanical but guarantees a proper textbook-style TOC.

The key insight is that using two-character placeholders like "00" for all page numbers keeps the text length identical to real page numbers (up to 79 pages), so pagination won't shift between passes. I'll generate TOC entries programmatically from the content structure, use PositionalTab with dot leaders for formatting, and verify that page counts remain stable across both passes.

For matching headings in the PDF text, I need to normalize whitespace since pdftotext collapses multiple spaces to single spaces, while the content has double spaces. I also need to skip the TOC section itself when searching for headings, since the TOC contains these same strings — I'll search only after the TOC ends and take the first match for each heading.

My approach is to use regex matching with MULTILINE mode to find lines where the stripped content exactly equals the normalized heading, which will distinguish actual headings from TOC entries that have dot leaders and page numbers.TOC alanı Word dışında dolmuyor. İki geçişli, gerçek sayfa numaralı statik içindekiler üretiyorum — hesaplanmış, elle yazılmamış.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

The table of contents is holding steady at 81 pages with no drift in the page numbers. Now I'm verifying that the TOC renders properly with dot leaders and page numbers, and checking that there aren't any unexpected blank pages scattered throughout the document.
```
This block is not supported on your current device yet.
```

The table's formatting looks good with the dot leaders and page numbers aligned properly, even with the zero-padded digits. Now I'm checking for any near-blank pages, verifying that all figures are embedded correctly, and then I'll copy everything to the outputs folder.
```
This block is not supported on your current device yet.
```

I'm counting up the figure usage across the three parts of the document — part 1 has 6 figures, part 2 has 10, and I'm working through part 3 to see the full distribution across the 30 generated figures.

Now I'm checking the page layout around the table of contents and front matter. The TOC should end around page 6 or 8, but there's a near-blank page 9 that I need to investigate — it might be from the explicit page break after the TOC, or there could be something else going on with how the pages are being laid out. Let me look at what's actually on pages 8, 9, and 10 to understand the structure better.
```
This block is not supported on your current device yet.
```

I'm working through why page 9 is blank — the Part I opener has a PageBreak that creates a new page, but then the part title's spacing-before value should push content further down, yet it's actually appearing on page 10 instead.

The root cause is that I'm inserting the PageBreak as its own empty paragraph, which lands alone on page 9, and then the kicker paragraph's spacing pushes the actual title to page 10. I need to move the PageBreak inside the kicker paragraph itself and reduce the spacing-before value to keep everything on the same page. Let me refactor the part renderer to embed the PageBreak directly in the kicker paragraph.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

The document has zero drift across 81 pages with only the final page being sparse as expected. I'm copying both the DOCX and PDF to the outputs folder with versioned filenames following the project convention, delivering the DOCX as the primary output and the PDF as a preview.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

**Governed Agentic Intelligence** — 81 sayfa, 18 bölüm, 4 kısım, 30 özgün şekil, 20 tablo, 30.086 kelime. Docx birincil teslimat; PDF önizleme için.

## Doğrulama — hepsi hesaplanmış, iddia edilmemiş

| Kontrol | Sonuç |
|---|---|
| 18 bölüm + 3 ek başlığı | eksik yok |
| "This chapter covers" blokları | 18/18 |
| Summary bölümleri | 18/18 |
| Şekil numaralandırma 1.1→18.2 | boşluksuz |
| Tablo genişlik toplamı ≤ kullanılabilir sayfa | 20/20 geçti |
| Şekil içi metin taşması | **0** (ölçüldü, bkz. aşağı) |
| İçindekiler sayfa numaraları | 152 başlık, iki geçiş arası **drift = 0** |
| Boş sayfa | yalnız son sayfa (normal) |

## İki mühendislik kararı, ikisi de gözle değil ölçümle

**1 · Şekil yazı boyutu.** Görsel denetim aracı yanıt vermeyi kesti. Gözle onaylamak yerine `figlib.save()` içine ölçüm koydum: her etiketin gerçek render bbox'ı kendi kutusuyla karşılaştırılıyor, taşma satır satır raporlanıyor. Ölçek taraması:

```
FONT_SCALE  1.00 → 3 taşma   1.15 → 6   1.30 → 26   1.45 → 48
```

26 taşan etiketin yerleşimi düzeltildi, sonra yeniden tarandı: **1.30'da 0 taşma, 1.35'te ilk kırılma**. 1.30 kilitlendi — 11 inçlik tuvalde 8.6pt etiket, sayfada 6.55pt olarak basılıyor. Gözle "iyi görünüyor" demedim; ölçüp en yüksek güvenli değeri buldum.

**2 · İçindekiler.** docx-js'in TOC alanı yalnız Word'de doluyor; LibreOffice'te boş sayfa kalıyordu. Alan yerine **iki geçişli statik TOC**: 1. geçiş sabit genişlikli `00` yer tutucularıyla basılıyor (sayfalama byte-kararlı kalsın diye), PDF render ediliyor, her başlığın gerçek sayfası layout metninden okunuyor, 2. geçiş gerçek numaralarla yeniden basılıyor. İki geçiş arası drift 0 — yani numaralar doğru. Bir başlık bulunamazsa script makul bir sayı uydurmak yerine yüksek sesle çöküyor.

Bu ikisi kitabın kendi 14. bölümünün kuralı: *bir enstrümanın sıfırı, başarısız olabildiği kanıtlanana kadar kanıt değildir.*

## Word'de açtığında

TOC artık statik metin — F9 gerekmiyor, tıklanabilir değil ama her görüntüleyicide doğru. `updateFields` de açık bırakıldı, zararı yok.

## Bilinen sınır (dürüst defter)

Sayfaların **görsel** denetimini yapamadım — araç yanıt vermedi. Yapı, metin, tablo genişliği, şekil taşması ve sayfalama programatik olarak doğrulandı; ama örneğin bir şeklin sayfa sonunda başlığından kopması gibi tipografik bir kusur bu kontrollerin ağından geçebilir. PDF'i açıp gözle bir tur atarsan, bulduğun her şey v1_1'e girer.

**SENİN AKSİYON MADDELERİN:**
- PDF'i açıp tipografik bir tur (yalnız yukarıdaki sınır yüzünden — başka manuel iş yok).
- İçerikte değişmesini istediğin bir hüküm varsa adıyla söyle; sürüm kuralı gereği düzeltme v1_1 olarak çıkar, bu dosya üzerine yazılmaz.

