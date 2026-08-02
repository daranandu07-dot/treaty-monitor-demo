# ⚖️ Global Treaty & Public Policy Monitor

A standalone, interactive Framer code component visualizing how illustrative domestic policy scenarios measure up against international legal standards — the European Convention on Human Rights, the Geneva Conventions, the 1951 Refugee Convention, and UN human rights treaties. Pure React + inline styles: no AI agent, no API calls, no external UI library dependency. A visual showcase, not a legal research tool.

## What this is (and isn't)

This is a **static demo dashboard** with three pre-written, hand-checked scenarios — not a live legal analysis engine. It exists to demonstrate the interaction pattern (scenario selector → compliance meter → tabbed comparative analysis → recommended-reforms drawer) that a real compliance-auditing tool could eventually be built around, without pretending to actually perform that analysis.

**On accuracy:** the domestic policy actions described are hypothetical/illustrative, written for this demo — they are not real enacted laws. The treaty articles and case citations, however, are real and were checked against public sources before being written into the component:

- **Ioane Teitiota v New Zealand**, UN Human Rights Committee, CCPR/C/127/D/2728/2016 (7 January 2020) — the Committee found **no violation** on the specific facts, but established that severe climate-related risk to life *can* trigger non-refoulement obligations under ICCPR Art. 6 in future cases with stronger evidence. The component states it this way, not as a finding against New Zealand.
- **Pretty v United Kingdom**, ECtHR, Application No. 2346/02 (2002) — a unanimous finding of **no violation** of Arts. 2, 3, 8, 9, or 14. The Court held Art. 2 confers no "right to die," while accepting Art. 8 personal autonomy was engaged but justifiably interfered with by a blanket prohibition.
- The **AI targeting / autonomous weapons** scenario deliberately has **no case-law entry**. As of writing, there is no binding judicial precedent specifically on AI-assisted or autonomous targeting systems. Rather than invent one, the component names the actual relevant forum — the UN CCW's Group of Governmental Experts on Lethal Autonomous Weapons Systems (active since 2014) — and is explicit that it's a diplomatic negotiating forum, not a court.

Verify all of this independently before relying on it for anything beyond a UI demo. Legal interpretation shifts over time, and this component's job is to look right, not to replace actual legal research.

## Features

### 🌍 Scenario selector
Three illustrative case studies as toggle pills: **Cross-Border Climate Displacement**, **AI Targeting & IHL**, and **Assisted Dying Safeguards & Human Rights**. Switching scenarios updates every other part of the UI.

### 📊 Compliance meter
A horizontal indicator with a status label (**Compliant** / **Partial Violation Risk** / **High Risk**) and a fill percentage, colour-coded green/amber/red, that changes per scenario.

### 📑 Comparative analysis (tabbed)
Three tabs per scenario:
- **Domestic Policy Action** — the (illustrative) policy being assessed
- **Governing Treaty / Article** — the real instruments and specific articles engaged
- **Legal Precedents** — real, verified case law where it exists; an honest "no binding precedent yet" note where it doesn't, rather than a fabricated citation

### 📂 Key Takeaways drawer
A collapsible panel of recommended legislative/procedural reforms specific to each scenario.

### 🎛️ Framer property controls
| Property | Control | Default | Notes |
|---|---|---|---|
| `title` | String | `"Global Treaty & Public Policy Monitor"` | — |
| `accentColor` | Color | `#4f8cff` | Drives tab highlights, links, bullet accents |
| `defaultScenario` | Enum | `climate-displacement` | Which scenario is selected on load — `climate-displacement`, `ai-targeting`, or `assisted-dying` |

### ⚙️ Technical notes
- React 18, `useState` and `useMemo`, no other hooks or libraries
- Clean inline styling, dark theme by default, no CSS files or external UI kit dependency (built to sit comfortably alongside an Ark UI–styled Framer project without conflicting styles)
- Type-checked with `tsc --strict` against `@types/react` and a minimal `framer` module stub
- No network requests, no external state — everything needed is defined in the file itself

## Installation & usage in Framer

1. Open your Framer project → **Assets → Code → +** to add a new code file
2. Name it `GlobalTreatyPolicyMonitor.tsx`
3. Paste in the full contents of [`src/GlobalTreatyPolicyMonitor.tsx`](./src/GlobalTreatyPolicyMonitor.tsx)
4. A **Global Treaty Policy Monitor** component appears in your Assets panel — drag it onto the canvas
5. Give it a real fixed width/height (not "Fit")
6. Use the Properties panel to adjust the title, accent colour, and which scenario loads by default
7. Click between scenario pills, tabs, and the takeaways drawer — everything here works in the regular editor canvas too, since none of it depends on `requestAnimationFrame` or Web Audio

## Folder structure

```
global-treaty-policy-monitor/
├── README.md
└── src/
    └── GlobalTreatyPolicyMonitor.tsx   # the full self-contained Framer code component
```

## Extending this into a real tool

If you do want to eventually wire this up to your existing Legal AI agent, the natural seams are:
- Replace the hardcoded `SCENARIOS` array with data fetched from your agent (e.g. in a `useEffect` on scenario change)
- Replace the static `precedents` array with live-retrieved case law, with clear sourcing/citations surfaced to the user
- Add a loading/error state around the compliance meter and tabs, since real analysis won't resolve instantly
- Keep the "not legal advice" framing regardless — that's a UX/liability decision worth keeping even once it's a live tool

## License

Add whatever license fits your repository (MIT is a common default for Framer component shares). None is applied here by default.
