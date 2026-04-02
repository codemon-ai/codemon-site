---
name: verify-deploy
description: Use when verifying deployed pages on codemon.ai after a Vercel deploy,
  checking page renders, or running post-deploy QA. Triggers on "검증해줘", "배포 확인",
  "verify deploy", "페이지 확인", or after any publish-private-content workflow completes.
---

# Verify Deploy

Post-deploy verification for codemon.ai pages using playwright-cli.
Always use the playwright-cli skill for all browser interactions.

## When to Run

- After `vercel deploy --prebuilt --prod` completes
- When asked to verify specific pages
- As the final step of `publish-private-content` workflow (Step 6)

## Verification Flow

### Step 1 — Open & Navigate

```bash
playwright-cli open https://codemon.ai/<path>
```

### Step 2 — Check Page Load

Take a snapshot to confirm the page loaded correctly:

```bash
playwright-cli snapshot --filename=verify-<slug>.yaml
```

Verify from snapshot:
- Page URL matches expected path
- Page title is not "404"
- Key content elements are present (headings, tables, links)

### Step 3 — Screenshot

```bash
playwright-cli screenshot --filename=verify-<slug>.png
```

Review the screenshot visually for:
- Title renders correctly
- Layout is not broken
- Dark mode elements display properly (if applicable)
- Navigation sidebar shows correct entries

### Step 4 — Interactive Elements (if applicable)

Test clickable elements:

```bash
# From snapshot, identify clickable refs
playwright-cli click <ref>
playwright-cli screenshot --filename=verify-<slug>-click.png
```

Check:
- Links navigate to correct pages
- Buttons trigger expected behavior
- Drilldown panels open/close

### Step 5 — Multi-page Verification

For batch verification (e.g., after deploying a new lecture series):

```bash
# Navigate through all pages
playwright-cli goto https://codemon.ai/<path-1>
playwright-cli screenshot --filename=verify-page1.png

playwright-cli goto https://codemon.ai/<path-2>
playwright-cli screenshot --filename=verify-page2.png

# ... repeat for all pages
```

### Step 6 — Index Page Check

Always verify the parent index page reflects the new content:

```bash
playwright-cli goto https://codemon.ai/partner
playwright-cli snapshot
```

Confirm: new page link appears in the index.

### Step 7 — Cleanup

```bash
playwright-cli close
```

## Verification Checklist

| Check | How |
|-------|-----|
| Page loads (not 404) | snapshot — title check |
| Title renders | screenshot — visual check |
| Data displays | snapshot — content elements present |
| Links work | click refs — navigation check |
| Index updated | parent page snapshot |
| Console errors | check console output from playwright-cli |

## Common Verification Scenarios

### New Lecture Page

```bash
playwright-cli open https://codemon.ai/partner/<slug>
playwright-cli screenshot --filename=verify-lecture.png
playwright-cli snapshot
# Check: title, 개요 table, 커리큘럼 sections
playwright-cli goto https://codemon.ai/partner
playwright-cli snapshot
# Check: new lecture card in index
playwright-cli close
```

### Demo System (lecture-podl-ai)

```bash
playwright-cli open https://codemon.ai/partner/lecture-podl-ai/demo
playwright-cli screenshot --filename=verify-demo-hub.png

# Verify each demo page
playwright-cli goto https://codemon.ai/partner/lecture-podl-ai/demo/seeding
playwright-cli screenshot --filename=verify-demo1.png

playwright-cli goto https://codemon.ai/partner/lecture-podl-ai/demo/report
playwright-cli screenshot --filename=verify-demo2.png

playwright-cli goto https://codemon.ai/partner/lecture-podl-ai/demo/tracking
playwright-cli screenshot --filename=verify-demo3.png

playwright-cli goto https://codemon.ai/partner/lecture-podl-ai/demo/content
playwright-cli screenshot --filename=verify-demo4.png

playwright-cli goto https://codemon.ai/partner/lecture-podl-ai/demo/localize
playwright-cli screenshot --filename=verify-demo5.png

# Dashboard (fullscreen, dark theme)
playwright-cli goto https://codemon.ai/partner/lecture-podl-ai/demo/dashboard
playwright-cli screenshot --filename=verify-dashboard.png
playwright-cli snapshot
# Click KPI card for drilldown
playwright-cli click <kpi-ref>
playwright-cli screenshot --filename=verify-drilldown.png

playwright-cli close
```

### Single Page Update

```bash
playwright-cli open https://codemon.ai/<updated-path>
playwright-cli screenshot --filename=verify-update.png
playwright-cli snapshot
# Check: updated content is reflected
playwright-cli close
```

## Failure Handling

| Symptom | Action |
|---------|--------|
| 404 page | Deployment may not be complete — wait 30s and retry |
| Missing content | Check _meta.ts entries and MDX imports |
| Broken layout | Check for MDX syntax errors (unescaped `<`, `{`) |
| Console errors | Read console log file from playwright-cli output |
| Drilldown not working | Check component onClick handlers |

## Report Format

After verification, summarize results:

```
## Verification Report

| Page | Status | Notes |
|------|--------|-------|
| /path/1 | ✅ OK | Title, content, links verified |
| /path/2 | ✅ OK | Data table renders, 20 rows |
| /path/3 | ⚠️ Warning | Console error (non-blocking) |
| /path/4 | ❌ Failed | 404 — check _meta.ts |
```
