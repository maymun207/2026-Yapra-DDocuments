// scratch/s2g-r2-smoke.js -- run from repo root (agbuilder-platform/revolutionize)
const fs = require('fs');
const crypto = require('crypto');
const raw = fs.readFileSync('docs/architecture/08_leadership_charter_bilingual.html');
const html = raw.toString('utf8');
const assert = (c, m) => { if (!c) { console.error('FAIL:', m); process.exit(1); } console.log('ok:', m); };

// Pattern #16 + 662fe75 reconciliation preserved in source
assert((html.match(/<\/script>/g) || []).length === 1, 'exactly one closing script tag');
assert(html.includes('mandate_p3'), '662fe75: mandate_p3 key present in source');
assert(html.includes('B(c.mandate_p3)'), '662fe75: mandate_p3 render call present');
console.log('info: v0.5 occurrences in source =', (html.match(/v0\.5/g) || []).length, '(expected 0 on real main)');

// Render both languages with a DOM stub
const m = html.match(/<script>([\s\S]*)<\/script>/);
assert(!!m, 'script block extracted');
const els = {};
global.document = {
  getElementById: id => els[id] || (els[id] = { innerHTML: '', textContent: '', classList: { toggle() {} } }),
  documentElement: { lang: 'en' }
};
eval(m[1]);                       // runs setLang('en')
const en = els['main'].innerHTML;
setLang('tr');
const tr = els['main'].innerHTML;

// Canonical five -- verbatim (EN)
assert(en.includes('Telemetry flows end-to-end and is queryable.'), 'X1 canonical EN');
assert(en.includes('The LiteLLM gateway routes with per-agent cost attribution.'), 'X2 canonical EN');
assert(en.includes('MCP servers enforce the capability allowlist at boot.'), 'X3 canonical EN');
assert(en.includes('v1 agents ship human-reviewed PRs through the verification gate.'), 'X4 canonical EN');
assert(en.includes('The first product is live in production.'), 'X5 canonical EN');

// Amendments + additions + recon, both languages
for (let i = 1; i <= 7; i++) { assert(en.includes('CA-' + i), 'CA-' + i + ' EN'); assert(tr.includes('CA-' + i), 'CA-' + i + ' TR'); }
['+A1', '+A2', '+A3'].forEach(a => { assert(en.includes(a), a + ' EN'); assert(tr.includes(a), a + ' TR'); });
assert(en.includes('Reconciliation record (2026-06-11)'), 'recon EN');
assert(tr.includes('Mutabakat kayd\u0131'), 'recon TR');
assert(en.includes('Program amendments v1'), 'section header EN');
assert(tr.includes('Program de\u011fi\u015fiklikleri v1'), 'section header TR');
assert(tr.includes('\u0130lk \u00fcr\u00fcn \u00fcretimde canl\u0131d\u0131r.'), 'X5 TR');

// 662fe75 content renders + amended subtitle live
assert(en.includes('v1.5'), '662fe75: v1.5 version model renders EN');
assert(tr.includes('v1.5'), '662fe75: v1.5 version model renders TR');
assert(els['subtitle'].textContent.includes('amendments v1 (2026-06-11)') || true, 'subtitle check'); // subtitle set in setLang
setLang('en');
assert(els['subtitle'].textContent.includes('amendments v1 (2026-06-11)'), 'amended subtitle EN');
setLang('tr');
assert(els['subtitle'].textContent.includes('de\u011fi\u015fiklikler v1 (2026-06-11)'), 'amended subtitle TR');

// No regression on pre-existing sections
assert(en.includes('No rubber-stamp review'), 'GATES intact EN');
assert(tr.includes('\u0130mza-atma incelemesi yok'), 'GATES intact TR');
assert(en.includes('Mandate') , 'mandate EN intact');
assert(tr.includes('G\u00f6rev'), 'mandate TR intact');

// Technical identifiers untranslated in TR
['lessons.md', 'caps.yaml', 'Stage 1.4.2', 'docs/contracts/resource_allocation_v1.md', 'LiteLLM', 'MCP', 'TLA+']
  .forEach(t => assert(tr.includes(t), 'identifier in TR: ' + t));

// Manifest
const man = JSON.parse(fs.readFileSync('docs/library/manifest.json', 'utf8'));
const flat = JSON.stringify(man);
assert(flat.includes('docs/library/program_plan_phase0_phase1_v1_1.md'), 'manifest points at plan v1.1');
assert(!flat.includes('program_plan_phase0_phase1_v1.md"'), 'manifest does not reference superseded v1');

// Plan file markers
const plan = fs.readFileSync('docs/library/program_plan_phase0_phase1_v1_1.md', 'utf8');
assert(plan.includes('(v1.1)'), 'plan is v1.1');
assert(plan.includes('Reconciliation record (2026-06-11)'), 'plan recon record');
assert(plan.includes('The first product is live in production'), 'plan X5 canonical');

console.log('\nS2g-R2 smoke complete -- all green');
