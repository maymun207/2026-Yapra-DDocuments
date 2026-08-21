# Supabase MCP connection to Claude code plugin

**Sohbet ID (UUID):** `3ac15249-6b2e-400c-9d0b-495de21994cb`

**Oluşturulma Tarihi:** 2026-06-28T01:42:59.610898Z

**Güncellenme Tarihi:** 2026-06-28T01:44:45.954241Z

**Özet:** **Conversation Overview**

The person asked how to connect Supabase MCP to the Claude Code plugin within the AntiGravity IDE. Claude diagnosed the core issue—that Claude Code and AntiGravity's native Gemini agent maintain completely separate MCP configurations, so anything configured in AntiGravity's `~/.gemini/config/mcp_config.json` is invisible to Claude Code, and vice versa. The conversation focused on getting Supabase MCP working specifically within the Claude Code side of this setup.

Claude provided a step-by-step configuration path using the hosted HTTP remote URL (`https://mcp.supabase.com/mcp`) with a Supabase Personal Access Token stored as an environment variable (`SUPABASE_PAT`) rather than hardcoded in any file. The recommended approach used a `.mcp.json` file with `${SUPABASE_PAT}` expansion so no secrets land in the file itself. Claude explicitly warned against the local `npx @supabase/mcp-server-supabase` stdio approach, which silently connects but discovers zero tools in Claude Code. The person was noted to have multiple Supabase projects (FinOPS, ardictech-website, Demo-VirtualFactory, AstroYou), so Claude emphasized scoping the connection to a specific `project_ref` and using `read_only=true` unless writes are needed. Claude also noted that if the stdio/npx form is ever used, the version should be pinned (e.g., `@0.4.5`) rather than using `@latest`. A brief note distinguished that if Supabase is also needed in AntiGravity's native agent, a separate config in `~/.gemini/config/mcp_config.json` would be required, with `serverUrl` instead of `url` for HTTP servers. The conversation ended with Claude asking a clarifying question about whether Claude Code is being run from AntiGravity's integrated terminal or as an installed extension, noting that distinction is where remaining issues typically hide.

---

## 👤 Kullanıcı (2026-06-28T01:43:00.023712Z)

how can i get supabase mcp connection to clouade code plug in inthe antigrqavity

## 🤖 Claude (2026-06-28T01:44:45.954241Z)

The user is asking how to set up a Supabase MCP connection for the Claude Code plugin within AntiGravity, Google's IDE platform. They want to integrate these tools together.

I'm thinking through the technical setup: Supabase has an official MCP server that runs via command line with a personal access token, AntiGravity supports MCP servers through configuration files (likely in a Codeium or AntiGravity-specific directory), and Claude Code would need to be configured to recognize and use that Supabase MCP server instance.

The key question is whether Claude Code runs as a plugin inside AntiGravity or if it's being invoked from AntiGravity's terminal separately. Given the context, it's most likely that Claude Code is being run from within AntiGravity's integrated environment, which means the Supabase MCP server would need to be configured in whichever tool is actually executing the code.

I should search for current details on this because AntiGravity is recent, and the specifics of how Claude Code integrates with it—along with the exact MCP configuration steps and Supabase token setup—may have evolved since my knowledge cutoff. I'll search for the current configuration details on these MCPs so I can give accurate setup information rather than guessing.I'll look up the current setup details for these tools since the configuration specifics matter here.
```
This block is not supported on your current device yet.
```

I'm seeing how AntiGravity's MCP configuration has evolved—the older path was `~/.gemini/antigravity/mcp_config.json`, but post-I/O 2026 it moved to a centralized `~/.gemini/config/mcp_config.json` shared across Antigravity 2.0, IDE, and CLI, with workspace-local configs at `.agents/mcp_config.json`. One important detail: AntiGravity uses `serverUrl` instead of `url` for HTTP servers.

But now I'm realizing the user might be asking about something different—they could be running Claude Code (Anthropic's CLI tool) inside AntiGravity rather than using AntiGravity's native Gemini agent. If that's the case, the MCP configuration would be completely separate. Claude Code has its own MCP setup through commands like `claude mcp add` or config files like `.mcp.json` or `~/.claude.json`, which is distinct from AntiGravity's `mcp_config.json`. I need to clarify whether they're asking about AntiGravity's native agent or Claude Code running within it.Let me verify the Claude Code MCP setup and the current Supabase MCP server details, since those are what actually matter for the Claude Code side.
```
This block is not supported on your current device yet.
```

I'm trying to clarify what the user is actually asking for—whether they want Supabase MCP integrated into Claude Code (which they're running inside AntiGravity) or if they're looking to add it directly to AntiGravity's native Gemini agent. The phrasing "Claude Code plug in in the AntiGravity" suggests the former, but I should pin down which setup they're working with.

The critical issue here is that AntiGravity and Claude Code maintain completely separate MCP configurations—AntiGravity uses `~/.gemini/config/mcp_config.json` while Claude Code has its own setup through `claude mcp add` stored in `~/.claude.json` or a project `.mcp.json`. If Supabase was configured in one place, it won't automatically appear in the other, which is likely causing the confusion.

For getting Supabase MCP working in Claude Code specifically, the most reliable approach is using the hosted remote URL at `https://mcp.supabase.com/mcp` with HTTP transport, rather than trying to run it locally via npx, which tends to fail silently in Claude Code. The HTTP approach with a PAT header avoids the OAuth flow and the tool discovery issues that plague the npx method. The local stdio approach requires pinning to version 0.4.5, but even then the `--access-token` flag reportedly doesn't work reliably in Claude Code and tool discovery silently fails — though there's conflicting guidance on whether the flag should work at all.

Given Maymun's security preferences and his multiple Supabase projects (FinOPS, ardictech-website, Demo-VirtualFactory, AstroYou), I should recommend the HTTP approach with a PAT sourced from an environment variable, scoped to specific project refs, and with `read_only=true` enabled where appropriate.

There's an important distinction here: Claude Code and AntiGravity's agent each need their own separate MCP configuration if he wants Supabase integrated in both. Since AntiGravity is a Windsurf/VS Code fork, I need to clarify whether the Claude Code extension can be installed there or if he's looking to configure the Supabase MCP directly within AntiGravity's environment. I'm settling on a diagnosis-first approach: these are two separate MCP configurations, and I'll lead with that distinction while giving the Claude Code path he asked for, then briefly note how the AntiGravity-native setup differs. I'll skip the clarifying question since he prefers committed recommendations, and I'll emphasize the secret handling piece—using environment variables and keeping the config file out of version control. I should structure this with a diagnosis section followed by concrete steps, keeping code blocks where they're necessary for clarity. Since he's working across multiple repos with different Supabase projects, I'll recommend project-scoped configuration using the `-s project` flag so each repo gets its own `.mcp.json` file, rather than a global setup that might cause conflicts.

The key security consideration is that when using environment variable expansion like `Bearer ${SUPABASE_PAT}`, the `.mcp.json` only stores the variable reference, making it safe to commit to the repo. I'll clarify the `claude mcp add` syntax for HTTP transport with the necessary headers for connecting to Supabase's MCP endpoint. Writing config JSON...

Then I'll verify by opening Claude Code and running `/mcp` to confirm the Supabase server connects and tools appear. The key gotcha is avoiding the npx stdio approach—it often shows connected but discovers no tools in Claude Code, though if someone does use it they should pin the version rather than using `@latest`. I should also mention the AntiGravity alternative if they want Supabase integrated differently. I'm deciding whether to recommend Claude Code desktop since he's already using Claude Code within AntiGravity—it would feel tangential to his config question and might dilute the focus of the answer, so I'll leave it out and keep the response tight on the actual diagnosis.The thing that trips most people up here: **Claude Code and AntiGravity's native agent keep completely separate MCP configs.** Anything you add to AntiGravity's `mcp_config.json` (`~/.gemini/config/mcp_config.json`) is invisible to Claude Code, and vice versa. So if you configured Supabase in AntiGravity's store/config and it's not showing in Claude Code, that's why — Claude Code reads its own config, not AntiGravity's.

Since you want it in the **Claude Code** side, here's the reliable path.

**1. Create a Personal Access Token** in Supabase: dashboard → Account → Access Tokens → generate one, scoped to the org that owns the project you're working on.

**2. Put it in your shell, not in any file** (matches your usual secret hygiene):

```bash
export SUPABASE_PAT="sbp_xxxxx"   # add to ~/.zshrc or ~/.bashrc
```

**3. Add the server to Claude Code via the hosted remote URL.** Use the HTTP transport with an `Authorization` header — this is the form that actually works in Claude Code. The local `npx @supabase/mcp-server-supabase` stdio approach is the footgun: it frequently shows "Connected" in `claude mcp list` but discovers zero tools, silently. Skip it.

Easiest is to drop this into your repo's `.mcp.json` (or `~/.claude.json` for global):

```json
{
  "mcpServers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp?project_ref=<your-project-ref>&read_only=true",
      "headers": {
        "Authorization": "Bearer ${SUPABASE_PAT}"
      }
    }
  }
}
```

Swap in the right `project_ref` — you have several Supabase projects (FinOPS, ardictech-website, Demo-VirtualFactory, AstroYou), so scope it to the one this repo belongs to. Without `project_ref` the server can touch every project in the org. Drop `&read_only=true` only when you actually need migrations/writes.

The `${SUPABASE_PAT}` expansion means the token never lands in the file, so `.mcp.json` is safe to commit — but I'd still gitignore it as a habit.

**4. Verify.** Open Claude Code (in AntiGravity's terminal or the extension), run `/mcp`. You should see `supabase` listed with its tools. If it shows unauthenticated, ask it directly "authenticate with Supabase MCP" to kick the flow. Then test: *"What tables are in my database? Use the Supabase MCP tools."*

Two more notes for your case specifically:

- If you ever do fall back to the stdio/npx form, **pin the version** (e.g. `@supabase/mcp-server-supabase@0.4.5`), never `@latest` — same supply-chain exposure you hit with LiteLLM 1.82.7/1.82.8.
- If you *also* want Supabase inside AntiGravity's own Gemini agent (separate from Claude Code), that goes in `~/.gemini/config/mcp_config.json`, and note AntiGravity uses `serverUrl` instead of `url` for HTTP servers — a config copied from Claude Code won't work there unchanged.

Which IDE surface are you running Claude Code from — the integrated terminal, or the Claude Code extension installed into AntiGravity? If `/mcp` still comes up empty after this, that distinction is usually where the remaining issue hides.

