# CWF-SESSION-GRAPH-KB-v134 — edges this session learned

Each edge is tagged S134 and carries the instrument that produced it. An edge without an instrument is
not an edge; it is a sentence.

## INSTRUMENT EDGES

**S134 · the pooler log is written ABOUT a lane and not BY it** → therefore it is the only liveness
signal a lane cannot forge. Instrument: `supavisor_logs` filtered to the lanes' database role.
COROLLARY, learned the hard way in the same night: it sees ONLY database contact, so silence on it is
not idleness. Pair it with a filesystem or git observation before concluding anything.

**S134 · a forge refusal and a gate failure are separable without any log** → seconds of duration with
`steps_count=0`, no annotation and no log blob is the account layer; real duration with a populated
step list is a real gate. Instrument: the runs endpoint plus the jobs endpoint's step counts.

**S134 · a zero from the runs endpoint is not an absence** → the same head returned `total_count=0` and
then 3 minutes apart. S101-L1 reproduced live. Read zero TWICE before it becomes a premise.

**S134 · a commit status and a checks run can disagree about the same head** → combined status read
`success` while both Actions runs read `failure`; and a Vercel context read `state=success` whose own
description said the deploy was cancelled. READ THE COMPUTATION, NOT THE LABEL.

## PRODUCT EDGES

**S134 · the hierarchy is DISCOVERED, not declared** → `entity_topology_edges` records who saw each
edge (`discovered_via`), when it was first and last seen, and stamps `absent_since` rather than
deleting. 2503 live edges at close, zero absent.

**S134 · the hierarchy is also CONFIGURATION** → `backend_entity_layers` carries `parent_layer_key` and
`parent_param_name` per layer, so "a line lives inside a factory and the parameter is called factoryId"
is a ROW. Nothing about resolution needs a branch per entity name.

**S134 · the graph has a reader and no consumer** → `GraphKbReader.parentsOf` and `containsAmong` exist,
provenance-classed, with `unreadable` distinct from `answered`-and-empty; the answering path imports
neither. THE GENERAL CLASS: in this factory a missing capability is usually a missing CALLER, not a
missing mechanism, and from outside the two are byte-identical.

**S134 · giving the system MORE correct information can make its answer WORSE** → naming factory and
line raised an interrogation; naming the factory alone answered with fourteen rows. A system that
punishes precision teaches its user to give it less.

**S134 · a display name is not an identity** → the factory's own `entity_id` is the short token and the
long Turkish string is only its display name, so the join that scopes a child is an IDENTITY join. The
options a user is shown are labelled from the very field that would have removed the question.

## PROCESS EDGES

**S134 · a tool refusing YOUR input is a measurement about the CONTENT** → carry it into the artefact
and warn the lane. Discarding it silently is how a card becomes a trap.

**S134 · an escape sequence cannot be written through a tool that evaluates escapes** → write the byte
from its code point and verify by COUNT. And when quoting source, copy the escape TEXT: a quote that
diverges silently is worse than an invisible byte because it looks right.

**S134 · a report file can hold a code branch red, and skipped steps are SILENT, not passing** → name
which step failed and which were skipped, or the verdict is a stale count in a verdict's clothing.

**S134 · the lander never launders the author's file** → the author lane repairs its own artefact and
pushes; the push makes its own run; nobody re-runs to chase a green.

**S134 · two gates judging the same bytes differently is a DEFECT, not a tie** → and a gate whose
refusal nobody enforces is decoration.

**S134 · the Architect's container is not the factory's limit** → an unreadable surface is a DISPATCH.
The scout is a measuring instrument that falsifies the Architect, not a messenger that fetches for it.

**S134 · voiding is for WRONG, never for SMALLER** → read the work before voiding it; three designs
repairing three neighbouring seams do not compete.

**S134 · the owner's memory is an instrument** → four times this session he named something the
Architect had not measured, and four times measurement agreed with him.

END · CWF-SESSION-GRAPH-KB-v134
