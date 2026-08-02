import * as React from "react"
import { useState, useMemo } from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * GlobalTreatyPolicyMonitor.tsx
 * ------------------------------------------------------------------
 * "Global Treaty & Public Policy Monitor" — a standalone, static
 * interactive dashboard visualizing how illustrative domestic policy
 * scenarios measure up against international legal standards.
 *
 * IMPORTANT — read before publishing:
 * This is a visual/educational showcase, not a legal research tool
 * or a source of legal advice. The three scenarios below are
 * hypothetical/illustrative domestic actions, not real enacted laws
 * — only the underlying treaty articles and case citations are real.
 * Those citations were checked against public sources before writing
 * this file:
 *   - Ioane Teitiota v New Zealand, UN Human Rights Committee,
 *     CCPR/C/127/D/2728/2016 (7 January 2020) — the Committee found
 *     NO violation on the specific facts, but established that
 *     climate-related risk to life CAN trigger non-refoulement
 *     obligations under ICCPR Art. 6 in future cases. Framed that way
 *     below, not as a finding against New Zealand.
 *   - Pretty v United Kingdom, ECtHR, Application No. 2346/02 (2002)
 *     — unanimous finding of NO violation of Arts. 2, 3, 8, 9, or 14;
 *     the Court held Art. 2 confers no "right to die," while
 *     accepting Art. 8 personal-autonomy was engaged but justifiably
 *     interfered with.
 *   - There is deliberately NO case-law entry for the autonomous
 *     weapons scenario — as of this writing there is no binding
 *     judicial precedent specifically on AI-assisted targeting; the
 *     UN CCW's Group of Governmental Experts on Lethal Autonomous
 *     Weapons Systems (active since 2014) is a diplomatic forum, not
 *     a court, and is presented as such rather than invented as case
 *     law.
 * Verify all of this independently before relying on it for anything
 * beyond a UI demo — legal interpretation shifts, and this file's
 * author is a component, not a lawyer.
 *
 * Pure React + inline styles, no external UI libraries, no network
 * calls, no AI integration — a static, self-contained showcase.
 * ------------------------------------------------------------------
 */

interface GlobalTreatyPolicyMonitorProps {
    title?: string
    accentColor?: string
    defaultScenario?: string
}

type ComplianceStatus = "compliant" | "partial" | "high-risk"

interface Precedent {
    caseName: string
    body: string
    note: string
}

interface Scenario {
    id: string
    label: string
    shortLabel: string
    domesticAction: string
    governingInstruments: { instrument: string; article: string }[]
    precedents: Precedent[]
    status: ComplianceStatus
    score: number // 0-100, drives the meter fill
    takeaways: string[]
}

const SCENARIOS: Scenario[] = [
    {
        id: "climate-displacement",
        label: "Cross-Border Climate Displacement",
        shortLabel: "Climate Displacement",
        domesticAction:
            "Illustrative scenario: a state enacts a border policy authorizing automatic return (\u2018pushback\u2019) of individuals arriving from climate-disaster-affected regions, without an individualized risk assessment or access to an asylum procedure.",
        governingInstruments: [
            { instrument: "1951 Refugee Convention", article: "Art. 33 \u2014 non-refoulement" },
            { instrument: "ICCPR", article: "Art. 6 \u2014 right to life" },
            { instrument: "ECHR", article: "Art. 3 \u2014 prohibition of inhuman or degrading treatment" },
        ],
        precedents: [
            {
                caseName: "Ioane Teitiota v New Zealand",
                body: "UN Human Rights Committee, CCPR/C/127/D/2728/2016 (2020)",
                note: "No violation found on the specific facts \u2014 but the Committee established that severe climate-related risk to life CAN trigger non-refoulement obligations under ICCPR Art. 6 in future cases with stronger evidence.",
            },
            {
                caseName: "Soering v United Kingdom",
                body: "ECtHR, Application No. 14038/88 (1989)",
                note: "Foundational case establishing that removal to a real risk of Art. 3 ill-treatment can itself breach the Convention \u2014 the doctrinal basis for extraterritorial non-refoulement protection.",
            },
        ],
        status: "high-risk",
        score: 26,
        takeaways: [
            "Automatic, group-based pushback without individualized screening is difficult to reconcile with non-refoulement obligations under both refugee and human rights law.",
            "Climate displacement is not yet an independent protection ground under the 1951 Convention itself \u2014 protection currently flows through general non-refoulement and right-to-life principles, not a dedicated 'climate refugee' status.",
            "Recommended reform: introduce mandatory individualized risk assessment and a right of appeal before any return decision tied to climate-related conditions in the origin country.",
        ],
    },
    {
        id: "ai-targeting",
        label: "AI Targeting & IHL",
        shortLabel: "AI Targeting & IHL",
        domesticAction:
            "Illustrative scenario: a state's armed forces deploy an AI-assisted targeting system for strike decisions, with limited real-time human review before engagement.",
        governingInstruments: [
            { instrument: "Additional Protocol I to the Geneva Conventions (1977)", article: "Art. 48 \u2014 distinction" },
            { instrument: "Additional Protocol I", article: "Art. 51(4)\u2013(5) \u2014 prohibition of indiscriminate attacks" },
            { instrument: "Additional Protocol I", article: "Art. 57 \u2014 precautions in attack" },
            { instrument: "Additional Protocol I", article: "Art. 36 \u2014 legal review of new weapons/means of warfare" },
        ],
        precedents: [],
        status: "partial",
        score: 52,
        takeaways: [
            "No binding judicial precedent yet exists specifically on AI-assisted or autonomous targeting systems \u2014 this is presented honestly as an open, unsettled area rather than backed by invented case law.",
            "The matter is under active diplomatic discussion at the UN Convention on Certain Conventional Weapons (CCW) Group of Governmental Experts on Lethal Autonomous Weapons Systems (LAWS), ongoing since 2014, which is a forum for state negotiation, not a court.",
            "Central legal debate: whether 'meaningful human control' at the point of engagement is required to satisfy the Art. 57 precautions obligation.",
            "Recommended reform: mandate a documented Art. 36 legal review before deployment, and retain a human decision-maker in the loop for the final engagement decision.",
        ],
    },
    {
        id: "assisted-dying",
        label: "Assisted Dying Safeguards & Human Rights",
        shortLabel: "Assisted Dying Safeguards",
        domesticAction:
            "Illustrative scenario: a state legalizes physician-assisted dying but does not require prior independent judicial or multi-disciplinary panel authorization before the procedure may proceed.",
        governingInstruments: [
            { instrument: "ECHR", article: "Art. 2 \u2014 right to life (positive obligation to protect)" },
            { instrument: "ECHR", article: "Art. 8 \u2014 right to respect for private life (personal autonomy)" },
        ],
        precedents: [
            {
                caseName: "Pretty v United Kingdom",
                body: "ECtHR, Application No. 2346/02 (2002)",
                note: "Unanimous finding of no violation. The Court held Art. 2 confers no 'right to die,' while accepting that Art. 8 personal autonomy was engaged \u2014 a blanket prohibition was nonetheless found to be a justified interference at the time.",
            },
        ],
        status: "partial",
        score: 58,
        takeaways: [
            "States retain a wide margin of appreciation here \u2014 Strasbourg case law does not require assisted dying to be prohibited, nor does it require any particular procedural model where it is permitted.",
            "Absence of independent prior authorization raises Art. 2 positive-obligation concerns about protecting vulnerable individuals from undue pressure, even where the underlying legislation is otherwise permissible.",
            "Recommended reform: require independent judicial or multi-disciplinary panel sign-off and a documented capacity assessment before any procedure, plus periodic legislative review against comparable jurisdictions.",
        ],
    },
]

const STATUS_META: Record<ComplianceStatus, { label: string; color: string }> = {
    compliant: { label: "Compliant", color: "#4ade80" },
    partial: { label: "Partial Violation Risk", color: "#facc15" },
    "high-risk": { label: "High Risk", color: "#f87171" },
}

function hexToRgb(hex: string): [number, number, number] {
    let h = hex.replace("#", "")
    if (h.length === 3) h = h.split("").map((c) => c + c).join("")
    const num = parseInt(h, 16)
    if (isNaN(num)) return [79, 140, 255]
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}

export default function GlobalTreatyPolicyMonitor(props: GlobalTreatyPolicyMonitorProps) {
    const {
        title = "Global Treaty & Public Policy Monitor",
        accentColor = "#4f8cff",
        defaultScenario = "climate-displacement",
    } = props

    const initialIndex = Math.max(
        0,
        SCENARIOS.findIndex((s) => s.id === defaultScenario)
    )
    const [activeIndex, setActiveIndex] = useState(initialIndex === -1 ? 0 : initialIndex)
    const [activeTab, setActiveTab] = useState<"action" | "treaty" | "precedent">("action")
    const [takeawaysOpen, setTakeawaysOpen] = useState(false)

    const scenario = SCENARIOS[activeIndex]
    const statusMeta = STATUS_META[scenario.status]
    const accentRgb = useMemo(() => hexToRgb(accentColor), [accentColor])
    const accentSoft = `rgba(${accentRgb[0]}, ${accentRgb[1]}, ${accentRgb[2]}, 0.14)`
    const accentBorder = `rgba(${accentRgb[0]}, ${accentRgb[1]}, ${accentRgb[2]}, 0.35)`

    const ink = "#e7e9ee"
    const inkMuted = "#9aa1b1"
    const surface = "#141824"
    const surfaceRaised = "#1a1f2e"
    const border = "#252b3b"

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                minHeight: 240,
                overflow: "auto",
                background: "#0c0f17",
                color: ink,
                fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Roboto, Helvetica, Arial, sans-serif",
                padding: "32px 28px",
                boxSizing: "border-box",
            }}
        >
            {/* Header */}
            <div style={{ marginBottom: 22 }}>
                <div
                    style={{
                        fontSize: 11,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: accentColor,
                        fontWeight: 600,
                        marginBottom: 6,
                    }}
                >
                    International Law &amp; Public Policy
                </div>
                <h1
                    style={{
                        margin: 0,
                        fontSize: "clamp(20px, 2.6vw, 28px)",
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                        color: ink,
                    }}
                >
                    {title}
                </h1>
                <div style={{ fontSize: 12.5, color: inkMuted, marginTop: 8, maxWidth: 640, lineHeight: 1.5 }}>
                    Illustrative demo scenarios only — domestic policy actions below are hypothetical; underlying
                    treaty articles and cited case law are real but simplified for display. Not legal advice.
                </div>
            </div>

            {/* Scenario selector */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                {SCENARIOS.map((s, i) => {
                    const active = i === activeIndex
                    return (
                        <button
                            key={s.id}
                            onClick={() => {
                                setActiveIndex(i)
                                setActiveTab("action")
                            }}
                            style={{
                                padding: "9px 16px",
                                borderRadius: 999,
                                border: active ? `1px solid ${accentBorder}` : `1px solid ${border}`,
                                background: active ? accentSoft : surface,
                                color: active ? ink : inkMuted,
                                fontSize: 13,
                                fontWeight: 500,
                                cursor: "pointer",
                                transition: "all 150ms ease",
                            }}
                        >
                            {s.shortLabel}
                        </button>
                    )
                })}
            </div>

            {/* Compliance meter */}
            <div
                style={{
                    background: surfaceRaised,
                    border: `1px solid ${border}`,
                    borderRadius: 14,
                    padding: "18px 20px",
                    marginBottom: 18,
                }}
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                    <div style={{ fontSize: 12, color: inkMuted, letterSpacing: "0.04em" }}>COMPLIANCE INDICATOR</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: statusMeta.color }}>{statusMeta.label}</div>
                </div>
                <div
                    style={{
                        position: "relative",
                        height: 10,
                        borderRadius: 999,
                        background: "#0c0f17",
                        overflow: "hidden",
                        border: `1px solid ${border}`,
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: `${scenario.score}%`,
                            background: statusMeta.color,
                            borderRadius: 999,
                            transition: "width 260ms ease",
                        }}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10.5, color: inkMuted }}>
                    <span>High Risk</span>
                    <span>Partial</span>
                    <span>Compliant</span>
                </div>
            </div>

            {/* Comparative analysis tabs */}
            <div
                style={{
                    background: surfaceRaised,
                    border: `1px solid ${border}`,
                    borderRadius: 14,
                    overflow: "hidden",
                    marginBottom: 18,
                }}
            >
                <div style={{ display: "flex", borderBottom: `1px solid ${border}` }}>
                    {(
                        [
                            { key: "action", label: "Domestic Policy Action" },
                            { key: "treaty", label: "Governing Treaty / Article" },
                            { key: "precedent", label: "Legal Precedents" },
                        ] as const
                    ).map((tab) => {
                        const active = activeTab === tab.key
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                style={{
                                    flex: 1,
                                    padding: "12px 14px",
                                    background: active ? accentSoft : "transparent",
                                    border: "none",
                                    borderBottom: active ? `2px solid ${accentColor}` : "2px solid transparent",
                                    color: active ? ink : inkMuted,
                                    fontSize: 12.5,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                {tab.label}
                            </button>
                        )
                    })}
                </div>

                <div style={{ padding: "18px 20px" }}>
                    {activeTab === "action" && (
                        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, color: ink }}>{scenario.domesticAction}</p>
                    )}

                    {activeTab === "treaty" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {scenario.governingInstruments.map((g, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: "flex",
                                        gap: 10,
                                        alignItems: "baseline",
                                        paddingBottom: 10,
                                        borderBottom: i < scenario.governingInstruments.length - 1 ? `1px solid ${border}` : "none",
                                    }}
                                >
                                    <div style={{ fontSize: 13, fontWeight: 600, color: ink, minWidth: 0 }}>{g.instrument}</div>
                                    <div style={{ fontSize: 12.5, color: accentColor }}>{g.article}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "precedent" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            {scenario.precedents.length === 0 && (
                                <p style={{ margin: 0, fontSize: 13, color: inkMuted, lineHeight: 1.6, fontStyle: "italic" }}>
                                    No binding judicial precedent exists yet for this scenario — shown honestly as an open
                                    question rather than filled in with invented case law. See Key Takeaways below for the
                                    relevant diplomatic forum.
                                </p>
                            )}
                            {scenario.precedents.map((p, i) => (
                                <div key={i}>
                                    <div style={{ fontSize: 13.5, fontWeight: 600, color: ink }}>{p.caseName}</div>
                                    <div style={{ fontSize: 11.5, color: accentColor, marginTop: 2, marginBottom: 6 }}>{p.body}</div>
                                    <div style={{ fontSize: 12.5, color: inkMuted, lineHeight: 1.55 }}>{p.note}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Key takeaways drawer */}
            <div style={{ background: surfaceRaised, border: `1px solid ${border}`, borderRadius: 14, overflow: "hidden" }}>
                <button
                    onClick={() => setTakeawaysOpen((o) => !o)}
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "14px 20px",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: ink,
                    }}
                >
                    <span style={{ fontSize: 13.5, fontWeight: 600 }}>Key Takeaways &amp; Recommended Reforms</span>
                    <span
                        style={{
                            fontSize: 14,
                            color: accentColor,
                            transform: takeawaysOpen ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 180ms ease",
                        }}
                    >
                        &#9660;
                    </span>
                </button>
                {takeawaysOpen && (
                    <div style={{ padding: "0 20px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
                        {scenario.takeaways.map((t, i) => (
                            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                <div
                                    style={{
                                        width: 5,
                                        height: 5,
                                        borderRadius: "50%",
                                        background: accentColor,
                                        marginTop: 7,
                                        flexShrink: 0,
                                    }}
                                />
                                <div style={{ fontSize: 12.5, lineHeight: 1.6, color: inkMuted }}>{t}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

addPropertyControls(GlobalTreatyPolicyMonitor, {
    title: {
        type: ControlType.String,
        title: "Title",
        defaultValue: "Global Treaty & Public Policy Monitor",
        placeholder: "Global Treaty & Public Policy Monitor",
    },
    accentColor: {
        type: ControlType.Color,
        title: "Accent Color",
        defaultValue: "#4f8cff",
    },
    defaultScenario: {
        type: ControlType.Enum,
        title: "Default Scenario",
        defaultValue: "climate-displacement",
        options: ["climate-displacement", "ai-targeting", "assisted-dying"],
        optionTitles: ["Climate Displacement", "AI Targeting & IHL", "Assisted Dying Safeguards"],
    },
})
