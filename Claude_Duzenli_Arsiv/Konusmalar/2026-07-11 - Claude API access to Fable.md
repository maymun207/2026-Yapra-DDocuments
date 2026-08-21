# Claude API access to Fable

**Sohbet ID (UUID):** `3fff78fa-4b0b-4300-982f-6eae0e9d50cc`

**Oluşturulma Tarihi:** 2026-07-11T07:19:55.265674Z

**Güncellenme Tarihi:** 2026-07-11T07:22:32.937564Z

**Özet:** **Conversation Overview**

The person asked about accessing Claude's Fable model through the API, specifically whether it was supported and how to call it. The conversation focused on practical API integration details. Claude provided the model string `claude-fable-5`, explained Fable's position in Anthropic's model lineup relative to Mythos 5, and noted Fable-specific behavior around safeguard routing — where certain queries are transparently redirected server-side to Opus 4.8, detectable via the `model` field on the response object.

The person then asked for code examples showing how to specify the Fable model in API calls. Claude provided working examples in cURL, Python SDK, and TypeScript SDK formats. Claude noted that the Python and TypeScript SDKs automatically read `ANTHROPIC_API_KEY` from the environment, and referenced that the person stores secrets in `.env` files as a standing practice, along with a preference for pinning exact model version strings in production rather than using aliases — consistent with their existing approach with LiteLLM.

Finally, the person asked for the full list of Claude models available at the API level. Claude outlined the current publicly accessible models: `claude-mythos-5`, `claude-fable-5`, `claude-opus-4-8`, `claude-sonnet-5`, and `claude-haiku-4-5-20251001`, organized by tier (Mythos, Opus, Sonnet, Haiku). Claude noted that Mythos Preview exists but is not publicly available, and recommended docs.claude.com as the authoritative source for context windows, pricing, and deprecation details.

---

## 👤 Kullanıcı (2026-07-11T07:19:56.352734Z)

does claude support acessing fable trhough API?

## 🤖 Claude (2026-07-11T07:20:03.106621Z)

I'll answer this directly from what I know about Anthropic's current model lineup.

Yes, Claude Fable 5 is available through the API. Its model string is `claude-fable-5`.

A bit of context on how it fits into the lineup: Fable 5 sits in Anthropic's Mythos tier. It shares the same underlying model as Claude Mythos 5, but Fable 5 has additional safety measures built in for biology, cybersecurity, and LLM R&D. Both were first released on June 9, 2026.

One thing worth flagging if you're building on it: Fable 5 ships with safeguards that route certain queries to the next-most-capable model (Opus 4.8) instead of answering directly. These are tuned conservatively, so they'll occasionally catch harmless requests, but Anthropic states this triggers in less than 5% of sessions on average. Given your work touches cybersecurity-adjacent and industrial areas, that's the kind of thing that could occasionally surface, so it's worth being aware of.

Also relevant to note: access to Fable 5 (and Mythos 5) was briefly suspended on June 12, 2026 to comply with U.S. Department of Commerce export controls, then restored on July 1, 2026 after those controls were lifted.

Since API details and model availability can shift, if you want the authoritative current spec — rate limits, pricing, exact parameters — I'd point you to the docs. Want me to pull the latest from docs.claude.com?

## 👤 Kullanıcı (2026-07-11T07:20:57.292043Z)

how can i call fable or specify at teh api to use fable model?

## 🤖 Claude (2026-07-11T07:21:12.310445Z)

I need to look up the exact model identifier and API call syntax for Fable to give the user accurate information about how to invoke it through the API.To use Fable 5, you set the `model` field to `claude-fable-5` in your request to the Messages endpoint. That's the whole mechanism — model selection is just that string.

Here's the basic shape in a few common forms:

**cURL**
```bash
curl https://api.anthropic.com/v1/messages \
  --header "x-api-key: $ANTHROPIC_API_KEY" \
  --header "anthropic-version: 2023-06-01" \
  --header "content-type: application/json" \
  --data '{
    "model": "claude-fable-5",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "Hello"}
    ]
  }'
```

**Python SDK**
```python
from anthropic import Anthropic

client = Anthropic()  # reads ANTHROPIC_API_KEY from env

message = client.messages.create(
    model="claude-fable-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello"}],
)
print(message.content)
```

**TypeScript SDK**
```typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env

const message = await client.messages.create({
  model: "claude-fable-5",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello" }],
});
console.log(message.content);
```

A couple of things specific to Fable that are worth keeping in mind, since they affect how you build around it:

The safeguard routing I mentioned happens server-side and is transparent to your call — you don't opt in or out. When a query trips the safeguard, the response comes from Opus 4.8 instead of Fable. If you need to detect that in your app, check the `model` field on the response object, since it reflects the model that actually produced the output rather than the one you requested. That's the cleanest way to know routing occurred.

Since you keep secrets in `.env` files as a standing practice, note the SDKs read `ANTHROPIC_API_KEY` from the environment automatically, so you don't need to pass the key in code — which matches how you'd want it anyway.

For authoritative current details on rate limits, pricing, and any Fable-specific parameters, I'd verify against docs.claude.com since those can change. Want me to pull the current API reference to confirm the exact request parameters and any Mythos-tier specifics?

## 👤 Kullanıcı (2026-07-11T07:22:24.314678Z)

this is great, what other models claude support at api level

## 🤖 Claude (2026-07-11T07:22:32.937564Z)

Here's the current publicly available model lineup on the API:

**Mythos tier** (Anthropic's newest, highest tier)
- **Claude Mythos 5** — `claude-mythos-5`
- **Claude Fable 5** — `claude-fable-5` (same underlying model as Mythos 5, with added safety measures for biology, cybersecurity, and LLM R&D)

There's also a Claude Mythos Preview, the first Mythos-class model, but it isn't publicly available — it's in limited use with a small set of trusted organizations under Anthropic's Project Glasswing.

**Opus tier**
- **Claude Opus 4.8** — `claude-opus-4-8` (powerful model for complex challenges; this is also the model you're talking to right now, and the one Fable's safeguards route to)

**Sonnet tier**
- **Claude Sonnet 5** — `claude-sonnet-5`

**Haiku tier**
- **Claude Haiku 4.5** — `claude-haiku-4-5-20251001`

So the four you can call directly today are `claude-fable-5`, `claude-opus-4-8`, `claude-sonnet-5`, and `claude-haiku-4-5-20251001`, plus `claude-mythos-5` at the Mythos tier.

One note that's relevant given your setup: some SDK helpers and third-party tools accept aliases like `claude-opus-latest` that resolve to the current version, but for production I'd pin the exact string — which matches your existing practice of pinning versions (like you do with LiteLLM) to avoid surprise behavior changes when a new snapshot ships.

Model availability and any new snapshots change fairly often, so for the authoritative list with context windows, pricing, and deprecation dates, docs.claude.com is the source of truth. Want me to pull the current model reference so you have the exact context-window and pricing numbers alongside these strings?

