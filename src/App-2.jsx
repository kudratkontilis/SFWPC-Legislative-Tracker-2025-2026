import React, { useState, useMemo, useEffect } from "react";


// ─── DESIGN TOKENS ────────────────────────────────────────────────────────
const C = {
  navy:   "#1B2A4A",
  gold:   "#B8963E",
  cream:  "#FAF7F2",
  sand:   "#EDE8DE",
  muted:  "#7A7468",
  text:   "#1E1E2E",
  border: "#D8D0C4",
  // SFWPC logo colors
  coral:  "#E8705A",  // salmon/coral red — bridge, dots, profile
  amber:  "#F5B942",  // golden yellow — bar chart bars
  // priority colors
  p1: "#4A2A6E",
  p2: "#1B4A7A",
  p3: "#6E2A2A",
  p4: "#1B5A3A",
  p5: "#5A3A00",
  p6: "#3A5A5A",
};

// ─── PRIORITY DEFINITIONS ────────────────────────────────────────────────
const PRIORITIES = [
  {
    id: "p1",
    short: "Gender Parity",
    label: "Priority 1: Gender Parity in Civic & Political Representation",
    color: C.p1, icon: "⚡",
    desc: "Remove structural barriers to women's full participation in civic and political life, including fair elections, ethical governance, and pathways for women — especially women of color — to run for and remain in public life.",
  },
  {
    id: "p2",
    short: "Civil & Reproductive Rights",
    label: "Priority 2: Civil & Reproductive Rights + Economic Security",
    color: C.p2, icon: "⚖️",
    desc: "Protect civil, reproductive, and democratic rights. Strengthen housing and economic conditions — fair pay, anti-displacement, education access — necessary for women's full participation in public life.",
  },
  {
    id: "p3",
    short: "Gender-Based Violence",
    label: "Priority 3: Gender-Based Violence & Survivor-Centered Safety",
    color: C.p3, icon: "🛡",
    desc: "Prevent and respond to gender-based violence through survivor-centered, trauma-informed, and non-punitive approaches ensuring safety, confidentiality, housing stability, and economic security for survivors.",
  },
  {
    id: "p4",
    short: "Immigrant Protections",
    label: "Priority 4: Sanctuary Policies & Immigrant Community Protections",
    color: C.p4, icon: "🌎",
    desc: "Protect immigrant women, families, and communities. Ensure access to public services without fear, uphold sanctuary protections, and promote language access, due process, and civic inclusion.",
  },
  {
    id: "p5",
    short: "Racial Justice & Equity",
    label: "SFWPC Mission: Racial Justice, Intersectional Feminism & Worker Equity",
    color: C.p5, icon: "✊",
    desc: "SFWPC champions intersectional feminism, racial justice, and gender equity. Anti-racism is central to everything SFWPC does. These bills address systemic barriers facing women of color, LGBTQ+ women, working-class women, and marginalized communities — the very people our mission centers.",
  },
  {
    id: "p6",
    short: "Adjacent Issues",
    label: "Miscellaneous: Adjacent Bills Worth Monitoring",
    color: "#3A5A5A", icon: "📋",
    desc: "Bills that are adjacent to SFWPC's core priorities — including paid leave, childcare, maternal health, AI & technology, education, environmental justice, and incarcerated women. These bills intersect with the issues SFWPC works on, even if SFWPC isn't the primary advocacy organization.",
  },
];

const BODIES = [
  { id: "all",      label: "All Bodies"    },
  { id: "senate",   label: "CA Senate"     },
  { id: "assembly", label: "CA Assembly"   },
  { id: "sf",       label: "SF BOS"        },
];

// Stage: "Introduced" | "Committee" | "Floor" | "SecondChamber" | "Governor" | "Enacted" | "TwoYear" | "Failed" | "Vetoed"
// Position: "SUPPORT" | "MONITOR" | "OPPOSE"
const BILLS = [

  // ════════════════════════════════════════════════
  // PRIORITY 1 — GENDER PARITY IN REPRESENTATION
  // ════════════════════════════════════════════════
  {
    id: "AB 1570",
    priority: "p1",
    body: "assembly",
    title: "DV: Anti-Abusive Litigation Prefiling Order",
    sponsor: "Asm. Lori D. Wilson",
    stage: "Committee",
    committee: "Assembly Judiciary Committee",
    hearingDate: "2026-06-16",
    letterDeadline: "2026-06-13",
    lastAction: "CA Legislative Women's Caucus 2026 priority. Second-house committee hearing scheduled June 16, 2026.",
    blurb: "Creates a process for domestic violence survivors to seek 'prefiling orders' that protect them from abusive litigation — a common tactic abusers use to continue harassment and control through the courts. Prevents weaponization of the legal system against survivors. A key Women's Caucus priority.",
    sfwpcActions: [
      "Testify at Assembly Judiciary Committee as a leading women's political organization",
      "Send formal SFWPC letter of support to Asm. Wilson and all Judiciary Committee members",
      "Partner with W.O.M.A.N. Inc. and La Casa de las Madres to recruit survivor testimony",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB1570",
  },
  {
    id: "SB 1237",
    priority: "p1",
    body: "senate",
    title: "Pay Data Reporting: Stronger Enforcement",
    sponsor: "Sen. Catherine Blakespear",
    stage: "Committee",
    committee: "Assembly Labor & Employment Committee",
    hearingDate: "2026-06-23",
    letterDeadline: "2026-06-20",
    lastAction: "CA Legislative Women's Caucus 2026 priority. Crossed to Assembly — Labor & Employment Committee hearing June 23, 2026.",
    blurb: "Strengthens pay equity enforcement by increasing penalties on employers who treat pay data reporting as optional. Gives the Civil Rights Department stronger tools to investigate and combat wage discrimination — critical for women's economic security and ability to stay in public life.",
    sfwpcActions: [
      "Send letter of support to Sen. Blakespear and Senate Labor Committee",
      "Mobilize SF employers — host a SFWPC briefing on pay equity compliance",
      "Endorse publicly and include in SFWPC 2026 scorecard for elected officials",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB1237",
  },
  {
    id: "AB 2155",
    priority: "p1",
    body: "assembly",
    title: "Forced Arbitration Justice Act (Sexual Assault/Harassment)",
    sponsor: "Asm. Ash Kalra",
    stage: "Committee",
    committee: "Assembly Judiciary Committee",
    hearingDate: "2026-06-16",
    letterDeadline: "2026-06-13",
    lastAction: "Stronger CA 2026 priority. Assembly Judiciary Committee hearing June 16, 2026.",
    blurb: "Ends mandatory arbitration clauses for survivors of sexual harassment and sexual assault, restoring their right to a public trial. Federal protections for survivors are being rolled back — this bill ensures California leads. Serial predators use forced arbitration to shield themselves from accountability.",
    sfwpcActions: [
      "Testify at Assembly Judiciary Committee — make SFWPC visible as champions of survivor rights",
      "Send formal support letter; recruit survivor testimony via SF organizations",
      "Partner with Equal Rights Advocates and CWLC for joint advocacy coalition",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB2155",
  },
  {
    id: "SB 1030",
    priority: "p1",
    body: "senate",
    title: "CalWORKs: Repeal 'Man in the House' Rule",
    sponsor: "Sen. Lola Smallwood-Cuevas",
    stage: "Committee",
    committee: "Assembly Human Services Committee",
    hearingDate: "2026-06-30",
    letterDeadline: "2026-06-27",
    lastAction: "CA Legislative Women's Caucus 2026 priority. Crossed to Assembly — Human Services Committee hearing June 30, 2026.",
    blurb: "Repeals the punitive 'unrelated adult male' rule in CalWORKs that has historically penalized poor families — especially women of color and DV survivors — for having any male adult present. A legacy policy rooted in racial stereotypes that traps low-income women in poverty and political invisibility.",
    sfwpcActions: [
      "SFWPC should actively champion this — it directly affects SF's most vulnerable women",
      "Testify at Senate Human Services Committee; engage SF DHS leadership",
      "Partner with SF DV orgs: CalWORKs is often the only income for survivors who fled abusers",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB1030",
  },
  {
    id: "AB 1940",
    priority: "p1",
    body: "assembly",
    title: "Menopause Workplace Discrimination Protections",
    sponsor: "Asm. Pilar Schiavo",
    stage: "Committee",
    committee: "Assembly Labor & Employment Committee",
    hearingDate: "2026-06-23",
    letterDeadline: "2026-06-20",
    lastAction: "Assembly Labor & Employment Committee. Hearing June 23, 2026.",
    blurb: "Expands California's Fair Employment and Housing Act (FEHA) to explicitly prohibit discrimination based on perimenopause, menopause, or post-menopause conditions. Requires reasonable workplace accommodations. Ensures women in mid-career are not forced out of the workforce or public life.",
    sfwpcActions: [
      "Send support letter to Assembly Labor Committee",
      "Feature in SFWPC communications as a novel economic security win for women",
      "Encourage SF employers to adopt menopause-friendly policies proactively",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB1940",
  },

  // ════════════════════════════════════════════════
  // PRIORITY 2 — CIVIL & REPRODUCTIVE RIGHTS + ECONOMIC SECURITY
  // ════════════════════════════════════════════════
  {
    id: "AB 260",
    priority: "p2",
    body: "assembly",
    title: "Medication Abortion & Telehealth Protections",
    sponsor: "Asm. Cecilia Aguiar-Curry",
    stage: "Governor",
    lastAction: "Enrolled — pending Gov. Newsom signature, Oct 2025. Urgency clause for immediate effect.",
    blurb: "Protects access to mifepristone and medication abortion in California regardless of federal FDA actions. Includes telehealth protections for providers and patients. Has an urgency clause so it takes effect the moment the Governor signs.",
    sfwpcActions: [
      "Urge Gov. Newsom to sign — contact Governor's office directly with SFWPC signature",
      "Issue public statement; alert SF clinics and Planned Parenthood Mar Monte",
      "Host a 'Know Your Rights' session for SF patients on medication abortion access",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB260",
  },
  {
    id: "AB 1876",
    priority: "p2",
    body: "assembly",
    title: "Fair Care for All: Trans Healthcare Nondiscrimination",
    sponsor: "Asm. Dawn Addis",
    stage: "Committee",
    committee: "Assembly Health Committee",
    hearingDate: "2026-06-17",
    letterDeadline: "2026-06-14",
    lastAction: "PPAC 2026 sponsored bill. Assembly Health Committee hearing June 17, 2026.",
    blurb: "Strengthens California's nondiscrimination protections in health insurance to explicitly protect transgender, gender-diverse, and intersex people from being denied care. Enshrines federal protections the Trump administration is actively dismantling into California state law.",
    sfwpcActions: [
      "Send support letter to Assembly Health Committee and Asm. Addis",
      "Partner with Planned Parenthood Mar Monte, Transgender District, and TGIJP for joint testimony",
      "Host a SF town hall on healthcare rights under threat from federal rollbacks",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB1876",
  },
  {
    id: "AB 2448",
    priority: "p2",
    body: "assembly",
    title: "Reproductive & Trans Health Data Privacy Expansion",
    sponsor: "Asm. Rebecca Bauer-Kahan",
    stage: "Committee",
    committee: "Assembly Judiciary Committee",
    hearingDate: "2026-06-16",
    letterDeadline: "2026-06-13",
    lastAction: "PPAC 2026 sponsored bill. Assembly Judiciary Committee hearing June 16, 2026.",
    blurb: "Ensures California's health data protections are as strong as its values — preventing patient data related to abortion, miscarriage care, and gender-affirming care from being disclosed to federal or hostile out-of-state actors. No patient should choose between care and self-protection.",
    sfwpcActions: [
      "Send letter to Assembly Judiciary Committee supporting passage",
      "Coordinate with ACLU NorCal, Planned Parenthood, and SF DPH on joint advocacy",
      "Publicize to SF residents: their health data is protected under CA law",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB2448",
  },
  {
    id: "SB 497",
    priority: "p2",
    body: "senate",
    title: "Transgender & Reproductive Healthcare Shield Law",
    sponsor: "Sen. Scott Wiener",
    stage: "Enacted",
    enacted: "Oct 2025",
    lastAction: "Signed by Gov. Newsom, Oct 2025. Now in effect.",
    blurb: "Shields California patients and providers from out-of-state criminal laws targeting transgender healthcare and reproductive care. Bars cooperation with out-of-state investigations and protects sensitive medical data from federal disclosure. One of 2025's landmark victories.",
    sfwpcActions: [
      "Publicize as a 2025 victory — educate SF providers on their new legal protections",
      "Advocate for City funding to defend any providers challenged under this shield",
      "Feature in SFWPC endorsement questionnaire: do candidates commit to defending SB 497?",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB497",
  },
  {
    id: "SB 642",
    priority: "p2",
    body: "senate",
    title: "Pay Equity Enforcement Act",
    sponsor: "Sen. Monique Limón",
    stage: "Enacted",
    enacted: "Oct 9, 2025",
    lastAction: "Signed. Effective Jan 1, 2026.",
    blurb: "Strengthens California's Equal Pay Act by increasing penalties for employers who fail to submit required pay data reports. Gives the Civil Rights Department stronger enforcement tools. Women lose nearly $1.7 trillion nationwide annually to the wage gap — this law fights back.",
    sfwpcActions: [
      "Celebrate and publicize — host a SF employer briefing on new pay reporting requirements",
      "Partner with SF Office of Labor Standards Enforcement on complaint outreach",
      "Make pay equity enforcement a litmus test in SFWPC 2026 candidate questionnaire",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB642",
  },
  {
    id: "AB 736 / SB 417",
    priority: "p2",
    body: "assembly",
    title: "Affordable Housing Bond Act of 2026 ($10 Billion)",
    sponsor: "Asm. Buffy Wicks / Sen. Christopher Cabaldon",
    stage: "TwoYear",
    lastAction: "AB 736 advanced to Senate — two-year bill. Active advocacy for November 2026 ballot placement.",
    blurb: "Dual measures to put a $10 billion affordable housing bond before California voters in November 2026. Would fund 35,000+ new affordable rental homes, 13,000 homeownership opportunities, and preserve tens of thousands of homes. Prioritizes low-income families, seniors, veterans, and unhoused Californians — who are disproportionately women.",
    sfwpcActions: [
      "Send strong support letters to Asm. Wicks and Sen. Cabaldon urging 2026 ballot placement",
      "Prepare SFWPC endorsement for ballot measure when it qualifies",
      "Host public forum: 'What the $10B Housing Bond means for SF women and families'",
      "Coalition-build with TODCO, SF Tenants Union, and Housing Rights Committee",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB736",
  },
  {
    id: "SB 79",
    priority: "p2",
    body: "senate",
    title: "Abundant & Affordable Homes Near Transit Act",
    sponsor: "Sen. Scott Wiener",
    stage: "Enacted",
    enacted: "Oct 10, 2025",
    lastAction: "Signed. Effective July 1, 2026.",
    blurb: "Sets height and density standards for housing development near high-frequency rail and bus lines. Includes affordability requirements and tenant protections. Critical for SF given our transit network — effective July 2026. Adds SF ferry terminals via 2026 follow-up bill SB 908.",
    sfwpcActions: [
      "Monitor SF implementation — push for maximum affordability in upzoned areas",
      "Flag any displacement risks for existing tenants near transit during rezoning",
      "Support companion SB 908 to extend protections to SF ferry terminal areas",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB79",
  },
  {
    id: "AB 670",
    priority: "p2",
    body: "assembly",
    title: "Naturally Occurring Affordable Housing (NOAH) Protections",
    sponsor: "Asm. Sharon Quirk-Silva",
    stage: "Enacted",
    enacted: "Oct 2025",
    lastAction: "Signed. Chaptered as Statutes of 2025, Ch. 701.",
    blurb: "Strengthens protections for unsubsidized naturally occurring affordable housing — older market-rate buildings that are affordable due to age or location — by creating clearer reporting requirements and curbing rapid rent increases. This housing is crucial for working-class women and immigrant families in SF.",
    sfwpcActions: [
      "Advocate for SF to create a NOAH building registry to track compliance citywide",
      "Publicize to SF tenant organizations, especially in SOMA, Mission, and Excelsior",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB670",
  },
  {
    id: "AB 1573",
    priority: "p2",
    body: "assembly",
    title: "Housing Needs: DV Survivors as Priority Population",
    sponsor: "Asm. Isaac Bryan",
    stage: "Committee",
    committee: "Assembly Housing & Community Development Committee",
    hearingDate: "2026-06-24",
    letterDeadline: "2026-06-21",
    lastAction: "Assembly Housing Committee hearing June 24, 2026.",
    blurb: "Adds domestic violence survivors to California's Regional Housing Needs Assessment (RHNA) target populations, requiring cities and counties to specifically plan for and produce housing for DV survivors. Directly connects survivor safety to housing access and stability.",
    sfwpcActions: [
      "SUPPORT — this directly intersects priorities 2 and 3. Send support letter to Asm. Bryan",
      "Testify at Assembly Housing Committee — SFWPC can bring a powerful survivor-centered voice",
      "Partner with La Casa de las Madres on advocacy: DV survivors need housing in the RHNA process",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB1573",
  },
  {
    id: "SF BOS — Fair Chance Ord. Amendment",
    priority: "p2",
    body: "sf",
    title: "Fair Chance Ord: Protect Reproductive & Gender Care Convictions",
    sponsor: "Sup. Bilal Mahmood",
    stage: "Committee",
    committee: "SF Rules Committee",
    hearingDate: "2026-06-11",
    letterDeadline: "2026-06-09",
    lastAction: "Introduced May 2026. SF Rules Committee hearing June 11, 2026.",
    blurb: "Amends SF's Fair Chance Ordinance to prohibit housing and employment discrimination against people penalized in other states for gender-affirming care, abortion, or drag and gender expression. Responds directly to LGBTQ+ and reproductive care seekers migrating to SF for safety.",
    sfwpcActions: [
      "SUPPORT ACTIVELY — Send SFWPC letter to Sup. Mahmood and full Rules Committee",
      "Testify at Rules Committee hearing as a leading women's and gender equity organization",
      "Coordinate with Transgender District, ACLU NorCal, and Planned Parenthood for joint testimony",
    ],
    position: "SUPPORT",
    url: "https://sfbos.org/legislation",
  },
  {
    id: "SF BOS — Small Sites $40M",
    priority: "p2",
    body: "sf",
    title: "Small Sites Program: $40M Allocation",
    sponsor: "Sup. Dean Preston",
    stage: "Enacted",
    enacted: "Mar 2025",
    lastAction: "Signed by Mayor Lurie, March 2025.",
    blurb: "Allocates $40 million to SF's Small Sites Program to permanently acquire at-risk 5–25 unit rental buildings in high-displacement neighborhoods. Preserves affordable housing for long-term tenants — disproportionately women, seniors, and immigrant residents who cannot absorb sudden market-rate rent increases.",
    sfwpcActions: [
      "Champion as a model for anti-displacement advocacy",
      "Advocate for subsequent rounds of Small Sites funding in the 2025-26 SF budget cycle",
    ],
    position: "SUPPORT",
    url: "https://sfbos.org/legislation",
  },
  {
    id: "SF BOS — Condo Moratorium",
    priority: "p2",
    body: "sf",
    title: "Condo Conversion Moratorium Extension through 2028",
    sponsor: "Sup. Connie Chan",
    stage: "Floor",
    lastAction: "Passed Land Use Committee 3-2, May 2025. Awaiting full Board vote.",
    blurb: "Extends SF's moratorium on condominium conversion of rental units through 2028, preventing further loss of rental housing stock. Condo conversions disproportionately displace long-term women, senior, and immigrant tenants who depend on below-market rental units.",
    sfwpcActions: [
      "Send formal support letter to all 11 Supervisors before the Board vote",
      "Mobilize SFWPC members to attend the Board meeting and provide public comment",
      "Partner with SF Tenants Union and Senior & Disability Action for joint advocacy",
    ],
    position: "SUPPORT",
    url: "https://sfbos.org/legislation",
  },

  // ════════════════════════════════════════════════
  // PRIORITY 3 — GENDER-BASED VIOLENCE & SURVIVOR SAFETY
  // ════════════════════════════════════════════════
  {
    id: "AB 406",
    priority: "p3",
    body: "assembly",
    title: "Workplace Protections: Victims of Violence",
    sponsor: "Asm. Liz Ortega",
    stage: "Enacted",
    enacted: "Oct 2025",
    lastAction: "Signed. Effective Jan 1, 2026.",
    blurb: "Moves remaining victim leave protections from the Labor Code to FEHA, giving the Civil Rights Department enforcement jurisdiction over workplace rights for survivors of domestic violence, sexual assault, and stalking. Codifies reasonable accommodations — schedule changes, safety transfers, locks — as employer obligations.",
    sfwpcActions: [
      "Publicize to SF employers and workers — host a know-your-rights event",
      "Partner with SF Office of Labor Standards Enforcement on employer outreach",
      "Include in SFWPC 2026 candidate questionnaire: will they defend survivor workplace rights?",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB406",
  },
  {
    id: "AB 561",
    priority: "p3",
    body: "assembly",
    title: "Electronic Filing for DV & Harassment Restraining Orders",
    sponsor: "Asm. Jesse Gabriel",
    stage: "Enacted",
    enacted: "Jan 1, 2026",
    lastAction: "Signed. Effective Jan 1, 2026 (full implementation Jan 1, 2027).",
    blurb: "Allows petitions for civil harassment, domestic violence, and elder abuse protective orders to be filed electronically, with remote hearings at no fee. Removes access barriers for survivors who cannot physically appear in court — especially critical for low-income, disabled, immigrant, and caregiving women.",
    sfwpcActions: [
      "Publicize widely — this lowers a key access barrier for SF survivors",
      "Partner with SF Bar Association and Bay Area Legal Aid to train attorneys on the new system",
      "Advocate for SF Superior Court to implement remote hearing infrastructure quickly",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB561",
  },
  {
    id: "AB 969",
    priority: "p3",
    body: "assembly",
    title: "CalWORKs: Family Violence Option & GBV Information",
    sponsor: "Asm. Celeste Rodriguez",
    stage: "Committee",
    committee: "Assembly Human Services Committee",
    hearingDate: "2026-06-30",
    letterDeadline: "2026-06-27",
    lastAction: "Amended and active. Assembly Human Services Committee hearing June 30, 2026.",
    blurb: "Reduces barriers for DV survivors applying for CalWORKs by standardizing how counties identify and accommodate survivors. Requires uniform written materials on domestic abuse resources, waivers, and legal rights in all California counties — critical for immigrant and low-income women in SF.",
    sfwpcActions: [
      "SUPPORT — Send letter to Assembly Human Services Committee",
      "Engage SF DHS to ensure county-level compliance and culturally competent implementation",
      "Partner with the California Partnership to End Domestic Violence on joint advocacy",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB969",
  },
  {
    id: "SB 841",
    priority: "p3",
    body: "senate",
    title: "ICE Protocols: Sensitive Locations (DV Shelters & Courthouses)",
    sponsor: "Sen. Susan Rubio",
    stage: "Committee",
    committee: "Assembly Public Safety Committee",
    hearingDate: "2026-06-09",
    letterDeadline: "2026-06-06",
    lastAction: "Crossed to Assembly. Assembly Public Safety Committee hearing June 9, 2026.",
    blurb: "Establishes mandatory protocols for ICE to enter sensitive locations including domestic violence shelters, rape crisis centers, homeless shelters, and courthouses. Provides legal certainty for advocates and staff that they can protect clients from enforcement actions in these spaces without fear.",
    sfwpcActions: [
      "CRITICAL BILL — this directly addresses SFWPC's intersection of priorities 3 and 4",
      "Testify at Senate Public Safety Committee with a joint SFWPC + DV org coalition",
      "Send letter to Sen. Rubio; coordinate with CPEDV and La Casa de las Madres",
      "Advocate for SF to adopt complementary local protocols at city-funded shelters",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB841",
  },
  {
    id: "AB 1570",
    priority: "p3",
    body: "assembly",
    title: "Anti-Abusive Litigation Prefiling Order (DV Survivors)",
    sponsor: "Asm. Lori D. Wilson",
    stage: "Committee",
    lastAction: "CA Women's Caucus 2026 priority. Assembly Judiciary Committee, Spring 2026.",
    blurb: "Creates a court mechanism for DV survivors to block abusive litigation — a tactic abusers use to re-traumatize survivors and drain their resources through frivolous lawsuits. Prevents the legal system from being weaponized against survivors who are trying to rebuild their lives and safety.",
    sfwpcActions: [
      "Testify alongside DV organizations at Assembly Judiciary Committee",
      "Send formal support letter; recruit survivor stories from SF DV organizations",
      "Feature as a 2026 signature bill in SFWPC communications",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB1570",
  },
  {
    id: "AB 250",
    priority: "p3",
    body: "assembly",
    title: "Sexual Assault Survivors: Civil Suit Revival Window",
    sponsor: "Asm. Chris Ward",
    stage: "Enacted",
    enacted: "Jan 1, 2026",
    lastAction: "Signed. Effective Jan 1, 2026 through Dec 21, 2027.",
    blurb: "Creates a time-limited window (Jan 1, 2026 – Dec 21, 2027) for adult sexual assault survivors to file civil lawsuits that would otherwise be barred by the statute of limitations. Gives survivors who could not come forward earlier a path to accountability and justice.",
    sfwpcActions: [
      "Publicize urgently — the filing window is open NOW and closes Dec 2027",
      "Partner with Bay Area Legal Aid and SF Bar Association to connect survivors with attorneys",
      "Host a SF forum: 'Your Rights Under the Sexual Assault Civil Suit Revival Window'",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB250",
  },

  // ════════════════════════════════════════════════
  // PRIORITY 4 — IMMIGRANT PROTECTIONS & SANCTUARY
  // ════════════════════════════════════════════════
  {
    id: "SB 98",
    priority: "p4",
    body: "senate",
    title: "Safe Haven Schools & Hospitals Act",
    sponsor: "Sen. María Elena Durazo",
    stage: "Enacted",
    enacted: "Sept 20, 2025",
    lastAction: "Signed by Gov. Newsom. In effect Jan 1, 2026.",
    blurb: "Prohibits immigration enforcement inside or within 100 feet of K-12 schools, colleges, churches, and hospitals. Extends ICE exclusion zones to ensure students, patients, and worshippers can access services without fear. A landmark protective law for SF's immigrant families.",
    sfwpcActions: [
      "Publicize as a 2025 victory across SFWPC's network and immigrant community partners",
      "Urge SFUSD, CCSF, and SF Health Network to post signage prominently at all entrances",
      "Establish a reporting mechanism for the City Attorney if exclusion zones are violated",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB98",
  },
  {
    id: "AB 49",
    priority: "p4",
    body: "assembly",
    title: "Immigrant Worker Notification Act (Worksite Raids)",
    sponsor: "Asm. Ash Kalra",
    stage: "Enacted",
    enacted: "Sept 20, 2025",
    lastAction: "Signed by Gov. Newsom. In effect Jan 1, 2026.",
    blurb: "Requires employers to notify employees within 72 hours of any scheduled immigration enforcement action at the worksite and inform workers of their legal rights. Protects immigrant workers — many of them women in care, domestic, and service work — from sudden enforcement and retaliation.",
    sfwpcActions: [
      "Publicize to immigrant worker communities — partner with Chinese Progressive Association and PODER",
      "Urge SF Labor Council to train union reps on the new 72-hour notification requirements",
      "Track enforcement in SF: report violations to CA Labor Commissioner",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB49",
  },
  {
    id: "SB 81",
    priority: "p4",
    body: "senate",
    title: "ICE Mask Ban & Accountability Act",
    sponsor: "Sen. Lena Gonzalez",
    stage: "Enacted",
    enacted: "Sept 20, 2025",
    lastAction: "Signed by Gov. Newsom. In effect.",
    blurb: "First-in-the-nation law requiring federal immigration officers to be identifiable during enforcement operations in California, banning masks and requiring visible identification. Reduces community fear, increases accountability, and deters abusive enforcement conduct.",
    sfwpcActions: [
      "Champion as a national model — share with sister women's political organizations in other states",
      "Monitor any federal legal challenges; advocate for SF City Attorney to defend the law if challenged",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB81",
  },
  {
    id: "SB 1194",
    priority: "p4",
    body: "senate",
    title: "California Immigrant Justice Fellowship",
    sponsor: "Sen. Anna Caballero",
    stage: "Committee",
    committee: "Assembly Judiciary Committee",
    hearingDate: "2026-06-16",
    letterDeadline: "2026-06-13",
    lastAction: "Crossed to Assembly. Assembly Judiciary Committee hearing June 16, 2026.",
    blurb: "Restores and expands California's Immigrant Justice Fellowship program to increase access to immigration legal representation in underserved regions. Immigrant women facing deportation — especially DV survivors and those with U.S. citizen children — are among the most vulnerable without legal counsel.",
    sfwpcActions: [
      "SUPPORT — Send letter to Senate Judiciary Committee",
      "Advocate for fellowship placements to prioritize SF-area immigrant women and DV survivors",
      "Partner with Immigrant Legal Resource Center and Centro Legal de la Raza on advocacy",
    ],
    position: "SUPPORT",
    url: "https://sd14.senate.ca.gov/news/press-release/senator-caballero-unveils-2026-agenda-support-workers-defend-communities-and",
  },
  {
    id: "SB 323",
    priority: "p4",
    body: "senate",
    title: "California Financial Aid Assurance Act (Dream Act Access)",
    sponsor: "Sen. Lena González",
    stage: "TwoYear",
    lastAction: "Carried to 2026 session. Active advocacy underway.",
    blurb: "Would require the CA Student Aid Commission to make the Dream Act Application available to any eligible student regardless of FAFSA completion — helping undocumented and mixed-status students access state financial aid amid federal disruption. Education is the primary pathway out of poverty for immigrant women.",
    sfwpcActions: [
      "SUPPORT — Send letter to Senate Education Committee urging swift passage",
      "Partner with SFUSD, City College, and SF Promise on student aid outreach for undocumented students",
      "Host a financial aid access event for immigrant youth in SF",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB323",
  },
  {
    id: "AB 667",
    priority: "p4",
    body: "assembly",
    title: "Language Access in Professional Licensing",
    sponsor: "Asm. David Alvarez",
    stage: "TwoYear",
    lastAction: "Carried to 2026 session. Passed committees in 2025 with strong support.",
    blurb: "Would allow immigrants with limited English proficiency to use an interpreter during California professional licensing exams, creating equitable pathways to licensed professions for immigrant women in healthcare, cosmetology, childcare, and beyond.",
    sfwpcActions: [
      "SUPPORT — Send letter to Asm. Alvarez urging active pursuit in 2026",
      "Build coalition with AAPI Women Lead, SEIU, and immigrant worker organizations",
      "Testify at committee hearing when bill resurfaces in Spring 2026",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB667",
  },
  {
    id: "SB 841",
    priority: "p4",
    body: "senate",
    title: "ICE Protocols at Sensitive Locations (Shelters & Courts) — also P3",
    sponsor: "Sen. Susan Rubio",
    stage: "Committee",
    committee: "Assembly Public Safety Committee",
    hearingDate: "2026-06-09",
    letterDeadline: "2026-06-06",
    lastAction: "Crossed to Assembly. Assembly Public Safety Committee hearing June 9, 2026.",
    blurb: "Establishes mandatory protocols barring ICE from entering domestic violence shelters, rape crisis centers, courthouses, and homeless shelters without following sensitive location procedures. Ensures immigrant DV survivors can safely report abuse and access services without fear of deportation.",
    sfwpcActions: [
      "PRIORITY BILL for SFWPC — sits at the intersection of immigrant safety and DV survivor safety",
      "Testify jointly with La Casa de las Madres, CPEDV, and Dolores Street Community Services",
      "Advocate for SF to formally adopt the bill's protocols at city-funded shelters and clinics",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB841",
  },

  // ════════════════════════════════════════════════
  // BILLS TO OPPOSE
  // ════════════════════════════════════════════════

  // Priority 4 — Immigrant Protections
  {
    id: "SB 554",
    priority: "p4",
    body: "senate",
    title: "Safety Before Criminal Sanctuary Act — Weaken Values Act",
    sponsor: "Sen. Brian Jones (R)",
    stage: "Failed",
    lastAction: "Failed — Returned to Secretary of Senate, Feb 2, 2026. May be reintroduced.",
    blurb: "Would have weakened California's landmark Values Act (sanctuary law) by requiring local law enforcement to cooperate with ICE in a broader set of circumstances and voiding stronger local sanctuary ordinances — directly threatening SF's more protective local policies. Framed as 'public safety' but would have exposed immigrant women, DV survivors, and families to deportation risk.",
    sfwpcActions: [
      "OPPOSE any reintroduction — issue a formal SFWPC opposition letter immediately if revived",
      "Monitor for amended versions or companion bills in 2026 session",
      "Testify against at Senate Public Safety Committee if reintroduced",
      "Coalition alert: notify SF immigrant rights orgs (Dolores Street, CIPC, ILRC) if bill resurfaces",
    ],
    position: "OPPOSE",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB554",
  },
  {
    id: "AB 18",
    priority: "p4",
    body: "assembly",
    title: "California Secure Borders Act — Repeal Sanctuary Law",
    sponsor: "Asm. Carl DeMaio (R)",
    stage: "Failed",
    lastAction: "Failed — Died at Desk, Feb 2, 2026. Expected to be reintroduced or amended in 2026.",
    blurb: "Would have repealed California's entire sanctuary law (SB 54), banned state funds for healthcare, housing, and welfare for undocumented immigrants, and cross-deputized local police as immigration agents. A direct assault on immigrant women's access to healthcare, DV services, shelter, and schools — and on SF's sanctuary city status.",
    sfwpcActions: [
      "OPPOSE any reintroduction — issue public SFWPC opposition statement",
      "Alert network: this bill would cut off healthcare and DV services for undocumented women in SF",
      "Work with City Attorney and SF Board to reaffirm SF's sanctuary ordinances as federal pressure mounts",
      "Coordinate opposition with SF Immigrant Rights Commission and SF Public Health",
    ],
    position: "OPPOSE",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB18",
  },

  // Priority 2 — Civil & Reproductive Rights
  {
    id: "SB 54 (Repeal Attempt)",
    priority: "p2",
    body: "senate",
    title: "Any Bill Repealing or Gutting the Reproductive Privacy Act",
    sponsor: "Various Republican authors",
    stage: "Committee",
    lastAction: "Multiple attempts in 2025-26 session to restrict abortion access at state and committee level. Monitoring ongoing.",
    blurb: "Republican members have introduced or proposed multiple measures to restrict abortion access in California, including requiring parental notification for minors, restricting telehealth abortion, and limiting state funding for reproductive health providers. SFWPC must actively oppose any such measures as they directly contradict Priority 2 and undermine bodily autonomy.",
    sfwpcActions: [
      "OPPOSE ALL — Issue standing opposition statement covering any bill restricting abortion access",
      "Send opposition letters to Assembly and Senate Health Committees for any such bills",
      "Coordinate with Planned Parenthood Mar Monte, ACLU NorCal, and NARAL Pro-Choice CA",
      "Include in 2026 candidate questionnaire: ask candidates to commit to opposing all abortion restrictions",
    ],
    position: "OPPOSE",
    url: "https://leginfo.legislature.ca.gov/faces/billSearchClient.xhtml",
  },
  {
    id: "AB 1157 (Blocked)",
    priority: "p2",
    body: "assembly",
    title: "Affordable Rent Act — Blocked by Landlord Lobby (Needs SFWPC Push)",
    sponsor: "Asm. Ash Kalra (D) — shelved under landlord pressure",
    stage: "TwoYear",
    lastAction: "Shelved until 2026 after aggressive lobbying by California Apartment Association. Active in 2026 session.",
    blurb: "Would permanently lower the statewide rent cap from 10% to 5% and extend protections to single-family home renters, many of whom are increasingly displaced by corporate landlords. The California Apartment Association (a landlord lobby group) successfully blocked it in 2025. Women and families in SF are disproportionately harmed by uncapped rent increases — SFWPC should oppose the lobbying effort blocking this pro-tenant bill and push for its passage.",
    sfwpcActions: [
      "SUPPORT the bill itself — oppose the landlord lobby blocking its passage",
      "Send letter to Asm. Kalra and Assembly Housing Committee in support of 2026 passage",
      "Issue public statement naming the CAA lobbying effort as harmful to SF women and families",
      "Partner with SF Tenants Union and Housing Rights Committee on advocacy campaign",
    ],
    position: "OPPOSE",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB1157",
  },

  // Priority 1 — Gender Parity
  {
    id: "AB 932 / AB 749",
    priority: "p1",
    body: "assembly",
    title: "Trans Girls Banned from Female Sports (Enacted 2025)",
    sponsor: "Republican authors",
    stage: "Enacted",
    enacted: "2025",
    lastAction: "Signed into law 2025. SFWPC should advocate for repeal or mitigation.",
    blurb: "California enacted legislation requiring student athletes to compete based on sex assigned at birth in school sports, despite overwhelming opposition from LGBTQ+ advocates, pediatricians, and women's rights organizations. These laws harm transgender girls and women, undermine Title IX's intent, and set a dangerous precedent of legislating trans youth out of public life. SFWPC should push for repeal.",
    sfwpcActions: [
      "Issue formal SFWPC opposition statement — this law harms transgender girls and women",
      "Support repeal legislation when introduced; monitor for 2026 repeal bill sponsors",
      "Partner with EQCA, GLSEN, and Transgender District to build a repeal coalition",
      "Include trans athlete inclusion in SFWPC 2026 candidate questionnaire",
    ],
    position: "OPPOSE",
    url: "https://leginfo.legislature.ca.gov/faces/billSearchClient.xhtml",
  },

  // Priority 3 — GBV
  {
    id: "Federal VOCA Cuts",
    priority: "p3",
    body: "sf",
    title: "Federal VOCA Funding Cuts Threatening SF DV Services",
    sponsor: "Federal — Trump administration budget",
    stage: "Committee",
    lastAction: "Federal Victims of Crime Act (VOCA) funding has been dramatically reduced. CA state action urgently needed to backfill. Advocacy ongoing 2026.",
    blurb: "Federal Victims of Crime Act (VOCA) funding — which supports DV shelters, rape crisis centers, and survivor services across California — has been slashed by the Trump administration. SF's DV organizations including W.O.M.A.N. Inc., La Casa de las Madres, and SFWAR face devastating cuts. SFWPC must oppose the cuts and advocate for emergency state and local replacement funding.",
    sfwpcActions: [
      "OPPOSE federal cuts — send letters to CA Congressional delegation demanding restoration of VOCA funding",
      "Advocate for emergency CA state budget allocation to backfill VOCA cuts for SF DV organizations",
      "Urge SF Board to add emergency supplemental funding for DV service providers in SF budget",
      "Host a fundraiser or awareness event spotlighting the funding crisis facing SF DV services",
    ],
    position: "OPPOSE",
    url: "https://cpedv.org/policy-priorities",
  },

  // ════════════════════════════════════════════════
  // PRIORITY 5 — RACIAL JUSTICE, INTERSECTIONAL FEMINISM & WORKER EQUITY
  // (SFWPC Mission: anti-racism is central to everything SFWPC does)
  // ════════════════════════════════════════════════
  {
    id: "AB 1071",
    priority: "p5",
    body: "assembly",
    title: "California Racial Justice Act: Strengthened Enforcement",
    sponsor: "Asm. Ash Kalra",
    stage: "Enacted",
    enacted: "Oct 2025",
    lastAction: "Signed by Gov. Newsom, Oct 2025. In effect 2026.",
    blurb: "Strengthens the California Racial Justice Act by expanding what counts as racial bias in criminal proceedings — including dehumanizing language, racial slurs, and racially coded words like 'welfare queen' or 'superpredator' — and allowing defendants to seek disclosure of relevant evidence. Women of color and trans women face disproportionate criminalization; this bill directly addresses that.",
    sfwpcActions: [
      "Celebrate as a racial justice victory — publicize to SFWPC network and community partners",
      "Advocate for SF Public Defender's office to actively use new provisions for clients",
      "Partner with Initiate Justice and the Ella Baker Center on community education",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB1071",
  },
  {
    id: "AB 2495",
    priority: "p5",
    body: "assembly",
    title: "Ban: Employer Immigration Threats as Workplace Coercion",
    sponsor: "Asm. Wendy Carrillo",
    stage: "Committee",
    committee: "Senate Labor & Employment Committee",
    hearingDate: "2026-06-25",
    letterDeadline: "2026-06-22",
    lastAction: "Crossed to Senate. Senate Labor & Employment Committee hearing June 25, 2026. Stronger CA 2026 priority.",
    blurb: "Bans employers from using threats of immigration reporting as a tool to coerce workers into silence about wage theft, unsafe conditions, or labor violations. Imposes fines of up to $10,000 per employee per violation. Immigrant women — especially domestic workers, farmworkers, and care workers — are most vulnerable to this abuse.",
    sfwpcActions: [
      "SUPPORT ACTIVELY — Send letter to Senate Labor Committee",
      "Testify as SFWPC alongside CELA, SEIU, and Chinese Progressive Association",
      "Feature in SFWPC communications: this bill directly protects immigrant women workers in SF",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB2495",
  },
  {
    id: "SB 1149",
    priority: "p5",
    body: "senate",
    title: "Bereavement Leave for Chosen & Extended Family",
    sponsor: "Sen. María Elena Durazo",
    stage: "Committee",
    committee: "Assembly Labor & Employment Committee",
    hearingDate: "2026-06-23",
    letterDeadline: "2026-06-20",
    lastAction: "Crossed to Assembly. Assembly Labor & Employment Committee hearing June 23, 2026. Stronger CA priority.",
    blurb: "Updates California's bereavement leave law to include chosen family — cousins, aunts, unmarried partners, best friends — not just blood relatives. LGBTQ+ women, immigrant women, and low-income women disproportionately rely on chosen and extended family networks. Without this protection, they are forced to choose between grieving and keeping their jobs.",
    sfwpcActions: [
      "SUPPORT — Send letter to Assembly Labor & Employment Committee",
      "Highlight as an LGBTQ+ equity and racial justice bill in SFWPC communications",
      "Partner with CA Work & Family Coalition and SEIU on joint advocacy",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB1149",
  },
  {
    id: "AB 2624",
    priority: "p5",
    body: "assembly",
    title: "Privacy for Immigration Support Services Providers",
    sponsor: "Asm. Mia Bonta",
    stage: "SecondChamber",
    lastAction: "Passed Assembly. In Senate — referred to Rules Committee for assignment, May 27, 2026.",
    blurb: "Protects organizations that provide support services to immigrant communities from harassment, threats, and intimidation by making their operational data and client records private. Many of these organizations are run by and serve immigrant women — this bill shields them from being targeted by federal enforcement and anti-immigrant actors.",
    sfwpcActions: [
      "SUPPORT — Send letter to Senate committee once assigned",
      "Partner with SF Immigrant Rights Commission and Dolores Street Community Services",
      "Publicize to SF immigrant community: their service providers will be better protected",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB2624",
  },
  {
    id: "AB 2379",
    priority: "p5",
    body: "assembly",
    title: "Family Childcare Providers: Know Your Rights (Immigration)",
    sponsor: "Asm. Sabrina Cervantes / David Alvarez",
    stage: "Committee",
    committee: "Assembly Labor & Employment Committee",
    hearingDate: "2026-06-23",
    letterDeadline: "2026-06-20",
    lastAction: "Assembly Labor & Employment Committee hearing June 23, 2026.",
    blurb: "Ensures family childcare providers — overwhelmingly immigrant women of color — are clearly informed of their constitutional rights when confronted by immigration enforcement. Addresses a critical gap: these workers often don't know they can refuse entry without a warrant, putting them and the children in their care at risk.",
    sfwpcActions: [
      "SUPPORT — Send letter to Assembly Labor Committee",
      "Partner with SF childcare provider networks and Chinese Newcomers Service Center",
      "Advocate for SF DCYF to proactively distribute know-your-rights materials to all licensed childcare providers",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB2379",
  },
  {
    id: "SB 1105",
    priority: "p5",
    body: "senate",
    title: "Protect California Rights Act: No Racial Profiling in Federal Ops",
    sponsor: "Sen. Sasha Renée Pérez",
    stage: "Committee",
    committee: "Assembly Public Safety Committee",
    hearingDate: "2026-06-09",
    letterDeadline: "2026-06-06",
    lastAction: "Crossed to Assembly. Assembly Public Safety Committee hearing June 9, 2026. Courage CA priority.",
    blurb: "Prohibits state and local law enforcement from participating in federal operations that involve racial profiling or criminalization of speech. Women of color, immigrant women, and Black women are disproportionately subjected to racially targeted enforcement — this bill protects them from being swept up in federal operations that violate California civil rights law.",
    sfwpcActions: [
      "SUPPORT STRONGLY — Testify at Assembly Public Safety Committee",
      "Send formal SFWPC support letter naming racial profiling as a racial justice and gender justice issue",
      "Partner with ACLU NorCal, NAACP SF, and API Legal Outreach on coalition advocacy",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB1105",
  },
  {
    id: "AB 1633",
    priority: "p5",
    body: "assembly",
    title: "50% Tax on Private Immigration Detention Profits",
    sponsor: "Asm. Matt Haney",
    stage: "Committee",
    committee: "Assembly Appropriations Committee",
    hearingDate: "2026-06-17",
    letterDeadline: "2026-06-14",
    lastAction: "In Assembly Appropriations. Hearing June 17, 2026. Courage CA priority.",
    blurb: "Levies a 50% tax on profits of private immigration detention facilities operating in California, reinvesting the revenue into immigrant support services. Private detention disproportionately impacts immigrant women — including those fleeing domestic violence and gender-based persecution. Defunding the profit motive is a racial and gender justice imperative.",
    sfwpcActions: [
      "SUPPORT — Send letter to Assembly Appropriations Committee",
      "Coordinate with Dolores Street Community Services and the SF Immigrant Legal Defense Fund",
      "Feature as SFWPC's racial justice + immigrant justice convergence bill",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB1633",
  },
  {
    id: "SB 995",
    priority: "p5",
    body: "senate",
    title: "Masuma Khan Justice Act: Private Detention Health Standards",
    sponsor: "Sen. Sasha Renée Pérez",
    stage: "Committee",
    committee: "Assembly Public Safety Committee",
    hearingDate: "2026-06-09",
    letterDeadline: "2026-06-06",
    lastAction: "Crossed to Assembly. Assembly Public Safety Committee hearing June 9, 2026.",
    blurb: "Institutes fines and license revocation for private detention facilities that fail to meet health and safety standards. Named for Masuma Khan, a woman who died in ICE custody. Immigrant women in detention face sexual violence, medical neglect, and inhumane conditions — this bill creates real accountability mechanisms.",
    sfwpcActions: [
      "SUPPORT — Testify at Assembly Public Safety Committee",
      "Tell Masuma Khan's story in SFWPC advocacy — connect bill to SFWPC's gender justice mission",
      "Partner with ACLU, Detention Watch Network, and ILRC",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB995",
  },
  {
    id: "AB 2230",
    priority: "p5",
    body: "assembly",
    title: "ICE Banned from Polling Places & Daycare Facilities",
    sponsor: "Asm. Ash Kalra",
    stage: "Floor",
    lastAction: "Passed Assembly floor largely along party lines, May 2026. Crossed to Senate.",
    blurb: "Prohibits federal immigration agents from operating at or near polling places and daycare facilities without a warrant or court order. Protects the right to vote and the safety of children in care. Voter intimidation and fear of deportation at the polls suppress immigrant women's civic participation — core to SFWPC's mission.",
    sfwpcActions: [
      "SUPPORT — Send letter to Senate Public Safety Committee when assigned",
      "Partner with Mi Familia Vota and SF Elections Commission on voter protection outreach",
      "Feature as a civic participation bill — directly tied to SFWPC's core mission of political inclusion",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB2230",
  },
  {
    id: "SB 294",
    priority: "p5",
    body: "senate",
    title: "Worker Notification Rights: Immigration Enforcement",
    sponsor: "Sen. Lena Gonzalez",
    stage: "Enacted",
    enacted: "Jan 2026",
    lastAction: "Signed. In effect February 2026.",
    blurb: "Requires California employers to provide workers with written notice of their rights when facing immigration or law enforcement encounters, and allows employees to name an emergency contact to be notified if they are detained at work. Directly protects immigrant women workers — many of whom are sole caregivers — from sudden enforcement without any notice or support.",
    sfwpcActions: [
      "Publicize as a 2025-26 victory for immigrant women workers",
      "Advocate for SF OLSE to actively enforce and publicize the new notice requirement",
      "Partner with SEIU and Chinese Progressive Association on worker outreach",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB294",
  },

  // ════════════════════════════════════════════════
  // MISCELLANEOUS — ADJACENT ISSUES WORTH MONITORING
  // Bills SFWPC doesn't lead on but that overlap with
  // caregiving, maternal health, education, childcare,
  // incarcerated women, and environmental justice
  // ════════════════════════════════════════════════
  {
    id: "AB 65",
    priority: "p6",
    body: "assembly",
    title: "Pregnancy Leave for Educators Act",
    sponsor: "Asm. Cecilia Aguiar-Curry",
    stage: "Committee",
    committee: "Senate Education Committee",
    hearingDate: "2026-06-24",
    letterDeadline: "2026-06-21",
    lastAction: "CA Legislative Women's Caucus 2026 priority. Crossed to Senate — Education Committee hearing June 24, 2026.",
    blurb: "Provides paid pregnancy leave for California educators — who currently have no such protection and are forced to drain sick leave or accept reduced pay. Women make up the majority of K-12 teachers. This is a workplace equity and maternal health bill that aligns directly with SFWPC's values.",
    sfwpcActions: [
      "Consider sending a letter of support to the Senate Education Committee",
      "Share with SFWPC members who work in education — this affects thousands of SF teachers",
      "Endorse if SFWPC chooses to weigh in on educator workplace equity",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB65",
  },
  {
    id: "AB 2134",
    priority: "p6",
    body: "assembly",
    title: "Parental Leave for Local Elected Officials",
    sponsor: "Asm. Dawn Addis",
    stage: "Committee",
    committee: "Senate Governance & Finance Committee",
    hearingDate: "2026-06-17",
    letterDeadline: "2026-06-14",
    lastAction: "CA Legislative Women's Caucus 2026 priority. Crossed to Senate — Governance & Finance Committee June 17, 2026.",
    blurb: "Allows local elected officials to take parental leave without being penalized or publicly disclosing private health information. Current law forces new mothers on city councils to request permission from their fellow council members. This barrier disproportionately deters women from running for or staying in local office — directly tied to SFWPC's gender parity mission.",
    sfwpcActions: [
      "STRONG CONSIDER — Directly tied to SFWPC's Priority 1: Gender Parity in civic representation",
      "Send support letter to Senate Governance & Finance Committee",
      "Feature in SFWPC communications as a 'running for office while a mother' equity bill",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB2134",
  },
  {
    id: "AB 1981",
    priority: "p6",
    body: "assembly",
    title: "Childcare Reimbursement Rates Reform",
    sponsor: "Asm. Cecilia Aguiar-Curry",
    stage: "Committee",
    committee: "Senate Human Services Committee",
    hearingDate: "2026-06-30",
    letterDeadline: "2026-06-27",
    lastAction: "CA Legislative Women's Caucus 2026 priority. Crossed to Senate — Human Services Committee June 30, 2026.",
    blurb: "Creates a clear path to ensure childcare reimbursement rates reflect the true cost of care — making childcare more accessible for families while ensuring providers (overwhelmingly women of color) are fairly compensated. Addresses the dual crisis of unaffordable childcare and underpaid childcare workers.",
    sfwpcActions: [
      "Monitor and consider support — childcare access is a prerequisite for women's economic participation",
      "Partner with SF Early Childhood Education advocates if weighing in",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB1981",
  },
  {
    id: "AB 788",
    priority: "p6",
    body: "assembly",
    title: "Rehabilitation & Safety for Incarcerated Women",
    sponsor: "Asm. Sharon Quirk-Silva",
    stage: "Committee",
    committee: "Senate Public Safety Committee",
    hearingDate: "2026-06-09",
    letterDeadline: "2026-06-06",
    lastAction: "CA Legislative Women's Caucus 2026 priority. Crossed to Senate — Public Safety Committee June 9, 2026.",
    blurb: "Requires the California Department of Corrections to take specific action to ensure safer conditions, stronger policies, and better leadership accountability for incarcerated women. Addresses ongoing violence, trauma, and neglect in women's prisons. Aligns with SFWPC's intersectional justice mission.",
    sfwpcActions: [
      "CONSIDER SUPPORT — Incarcerated women are among the most marginalized and overlooked",
      "Send letter to Senate Public Safety Committee",
      "Partner with Anti-Recidivism Coalition and Initiate Justice on joint advocacy",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB788",
  },
  {
    id: "SB 1192",
    priority: "p6",
    body: "senate",
    title: "SNAP/CalFresh: Restore Food Benefits for 1M Californians",
    sponsor: "Sen. Akilah Weber-Pierson",
    stage: "Committee",
    committee: "Assembly Human Services Committee",
    hearingDate: "2026-06-30",
    letterDeadline: "2026-06-27",
    lastAction: "CA Legislative Women's Caucus 2026 priority. Crossed to Assembly — Human Services Committee June 30, 2026.",
    blurb: "Would restore state-funded food benefits for approximately 1 million Californians whose federal SNAP benefits were cut by the Trump administration. Women — especially single mothers, elderly women, and immigrant women — are disproportionately impacted by food insecurity. Food access is foundational to economic stability and civic participation.",
    sfwpcActions: [
      "STRONGLY CONSIDER SUPPORT — food security is economic security for women and families",
      "Send support letter to Assembly Human Services Committee",
      "Coordinate with SF-Marin Food Bank and SF Human Services Agency on advocacy",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB1192",
  },
  {
    id: "AB 2434",
    priority: "p6",
    body: "assembly",
    title: "Visitor Protections & Safety Act (Prison Families)",
    sponsor: "Asm. Mia Bonta",
    stage: "Committee",
    committee: "Senate Public Safety Committee",
    hearingDate: "2026-06-09",
    letterDeadline: "2026-06-06",
    lastAction: "CA Legislative Women's Caucus 2026 priority. Crossed to Senate — Public Safety Committee June 9, 2026.",
    blurb: "Ensures families — predominantly women — are not denied prison visits without written explanation and due process. When a mother drives hundreds of miles to visit her child and is turned away with no explanation, the state has failed that family. Supports rehabilitation and family connection as key to reducing recidivism.",
    sfwpcActions: [
      "Monitor — consider support as a criminal justice and family rights bill",
      "Connect with CCWP (California Coalition for Women Prisoners) if engaging",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB2434",
  },
  {
    id: "SB 271",
    priority: "p6",
    body: "senate",
    title: "Student Parent Support: Financial Aid & Childcare at College",
    sponsor: "Sen. Eloise Gómez Reyes",
    stage: "Enacted",
    enacted: "Oct 2025",
    lastAction: "Signed by Gov. Newsom, Oct 2025. In effect 2026.",
    blurb: "Connects student parents — who are disproportionately women of color — to financial aid and childcare resources at California colleges. Removes information barriers that cause student parents to drop out. Education is the primary pathway to economic mobility for women, particularly first-generation students.",
    sfwpcActions: [
      "Publicize as a 2025 win — share with SF community college and SFUSD networks",
      "Advocate for City College SF and SFSU to proactively implement new requirements",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB271",
  },
  {
    id: "SB 754",
    priority: "p6",
    body: "senate",
    title: "Menstrual Products: Toxic Chemicals Disclosure",
    sponsor: "Sen. María Elena Durazo",
    stage: "Enacted",
    enacted: "Oct 2025",
    lastAction: "Signed by Gov. Newsom, Oct 2025. In effect 2026.",
    blurb: "Requires manufacturers of disposable tampons and menstrual pads to disclose chemicals of concern in their products. Women and people who menstruate are exposed to potential toxins through products used multiple times daily — this is a reproductive health and environmental justice bill.",
    sfwpcActions: [
      "Celebrate as a women's health and environmental justice win",
      "Partner with SF Department of the Environment to publicize new disclosure requirements",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB754",
  },
  {
    id: "AB 1755",
    priority: "p6",
    body: "assembly",
    title: "Housing Stability: Tenant Protections After Disasters",
    sponsor: "Asm. Blanca Pacheco",
    stage: "Committee",
    committee: "Senate Judiciary Committee",
    hearingDate: "2026-06-23",
    letterDeadline: "2026-06-20",
    lastAction: "CA Legislative Women's Caucus 2026 priority. Crossed to Senate — Judiciary Committee June 23, 2026.",
    blurb: "Protects tenants from eviction when they are doing everything right but face disaster-related hardship. Women, seniors, and low-income families are most vulnerable to displacement after earthquakes, wildfires, or other disasters. Ensures tenant protections hold even when circumstances are outside renters' control.",
    sfwpcActions: [
      "Monitor — connects to SFWPC's housing stability and anti-displacement priorities",
      "Consider co-signing with SF tenant advocacy organizations",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB1755",
  },
  {
    id: "SB 646",
    priority: "p6",
    body: "senate",
    title: "Prenatal Multivitamins: Health Plan Coverage",
    sponsor: "Sen. Akilah Weber-Pierson",
    stage: "Enacted",
    enacted: "Oct 2025",
    lastAction: "Signed by Gov. Newsom, Oct 2025. In effect 2026.",
    blurb: "Requires health plans to cover prenatal multivitamins without cost-sharing. Prenatal nutrition is foundational to maternal and infant health — this removes a cost barrier that disproportionately affects low-income pregnant women and women of color, who face higher rates of maternal mortality.",
    sfwpcActions: [
      "Celebrate as a maternal health win and publicize to SFWPC health advocacy partners",
      "Advocate for SF DPH to proactively inform pregnant patients of the new coverage",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB646",
  },

  // ════════════════════════════════════════════════
  // NEWLY ADDED — PREVIOUSLY MISSING FROM TRACKER
  // ════════════════════════════════════════════════

  // ── PRIORITY 1: GENDER PARITY & CIVIC PARTICIPATION ──
  {
    id: "AB 2691",
    priority: "p1",
    body: "assembly",
    title: "Felony Conviction: Eligibility for Elective Office",
    sponsor: "Asm. Dawn Addis",
    stage: "SecondChamber",
    lastAction: "Passed Assembly 67-0 (unanimous), April 27, 2026. Now in Senate — referred to Senate Elections Committee.",
    committee: "Senate Elections & Constitutional Amendments Committee",
    hearingDate: "2026-06-16",
    letterDeadline: "2026-06-13",
    blurb: "Removes the automatic lifetime bar on holding elective office for certain felony convictions, allowing individuals who have completed their sentence to run for office. Passed the Assembly unanimously. Formerly incarcerated women — disproportionately women of color — face a permanent structural barrier to civic leadership. This bill directly removes it.",
    sfwpcActions: [
      "SUPPORT — Send letter to Senate Elections Committee ahead of June 16 hearing",
      "Highlight as a racial justice + civic representation bill in SFWPC communications",
      "Partner with Initiate Justice and Anti-Recidivism Coalition to build advocacy coalition",
      "Feature in SFWPC's 2026 candidate questionnaire: do they support restoring civic rights?",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB2691",
  },
  {
    id: "SB 73",
    priority: "p1",
    body: "senate",
    title: "Election Protection: Safeguard Voting Systems from Federal Interference",
    sponsor: "Sen. Sabrina Cervantes / Sen. Tom Umberg",
    stage: "Enacted",
    enacted: "May 27, 2026",
    lastAction: "Signed by Gov. Newsom, May 27, 2026. Urgency clause — in effect immediately.",
    blurb: "Protects California elections from interference and intimidation by federal agents. Requires immediate notification to the AG and Secretary of State if a court order to seize voting systems is executed. Bars unauthorized access to voter rolls or certified voting technology by law enforcement without a court order. Signed days before the June 2 primary. Women of color and immigrant women are most vulnerable to voter intimidation — this law is their shield.",
    sfwpcActions: [
      "Celebrate as a landmark 2026 civic participation victory — publicize widely to SFWPC network",
      "Educate SF immigrant and communities of color on new voter protection rights",
      "Partner with ACLU NorCal and League of Women Voters SF on community education events",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB73",
  },
  {
    id: "SB 884",
    priority: "p1",
    body: "senate",
    title: "Expand Ballot Access: Drop Boxes, Mail Ballots & Polling Place Safety",
    sponsor: "Sen. Tom Umberg / Sen. Sabrina Cervantes",
    stage: "SecondChamber",
    lastAction: "Passed Senate. In Assembly — referred to Assembly Elections Committee, May 2026.",
    committee: "Assembly Elections Committee",
    hearingDate: "2026-06-18",
    letterDeadline: "2026-06-15",
    blurb: "Expands ballot drop box access, extends mail ballot receipt windows to 10 days after election day, and bans law enforcement arrests within 200 feet of polling places. Directly protects immigrant women, low-income women, and women of color from voter intimidation and access barriers — the exact populations SFWPC champions for full civic participation.",
    sfwpcActions: [
      "SUPPORT STRONGLY — Send letter to Assembly Elections Committee before June 18 hearing",
      "Partner with AAPI Women Lead, Mi Familia Vota, and SEIU on joint advocacy",
      "Mobilize SFWPC members to contact their Assembly representatives in support",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB884",
  },
  {
    id: "SB 1164",
    priority: "p1",
    body: "senate",
    title: "California Voting Rights Act of 2026: Anti-Suppression",
    sponsor: "Sen. Sabrina Cervantes",
    stage: "SecondChamber",
    lastAction: "Passed full Senate May 22, 2026. Now in Assembly — referred to Elections Committee.",
    committee: "Assembly Elections Committee",
    hearingDate: "2026-06-23",
    letterDeadline: "2026-06-20",
    blurb: "Landmark legislation modernizing and strengthening the California Voting Rights Act. Prohibits voter suppression tactics, bans vote dilution through discriminatory maps, and requires jurisdictions with a history of discrimination to get pre-approval before changing voting rules. Sponsored by NAACP Legal Defense Fund, ACLU, SEIU, and MALDEF. Two-thirds of California voters support it.",
    sfwpcActions: [
      "SUPPORT STRONGLY — This is one of the most important bills of the 2026 session for SFWPC",
      "Send formal letter to Assembly Elections Committee; mobilize SFWPC members to contact Assemblymembers",
      "Coordinate with League of Women Voters SF, NAACP SF, and Asian Law Caucus on joint testimony",
      "Issue public statement of support — SFWPC's voice carries weight on voting rights",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB1164",
  },
  {
    id: "SB 1360",
    priority: "p1",
    body: "senate",
    title: "California Voting Rights Act of 2026: Language Access",
    sponsor: "Sen. Sabrina Cervantes",
    stage: "SecondChamber",
    lastAction: "Passed full Senate May 22, 2026. Now in Assembly — referred to Elections Committee.",
    committee: "Assembly Elections Committee",
    hearingDate: "2026-06-23",
    letterDeadline: "2026-06-20",
    blurb: "Companion bill to SB 1164 — expands language access for limited-English proficient voters, providing election materials in more languages and ensuring immigrant voters can participate equally. SF has large Chinese, Spanish, Filipino, and other language communities for whom this directly expands access to democracy.",
    sfwpcActions: [
      "SUPPORT alongside SB 1164 — send a joint letter covering both bills",
      "Highlight for SF's multilingual communities — Chinese Progressive Association, PODER, API Legal Outreach",
      "Feature in SFWPC communications as a racial equity and immigrant inclusion measure",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB1360",
  },

  // ── PRIORITY 2: CIVIL & REPRODUCTIVE RIGHTS ──
  {
    id: "AB 54",
    priority: "p2",
    body: "assembly",
    title: "Access to Safe Medication Abortion Act",
    sponsor: "Asm. Maggy Krell",
    stage: "SecondChamber",
    lastAction: "Two-year bill — active in 2026 session. In Senate Health Committee. PPAC and Reproductive Freedom for All co-sponsor.",
    committee: "Senate Health Committee",
    hearingDate: "2026-06-17",
    letterDeadline: "2026-06-14",
    blurb: "Creates comprehensive California state-law protections for medication abortion (mifepristone), shielding manufacturers, distributors, providers, and patients from civil, criminal, and professional liability regardless of federal FDA actions. As the Trump administration investigates mifepristone, this bill is a critical safeguard — making California's protection of medication abortion independent of federal policy.",
    sfwpcActions: [
      "SUPPORT ACTIVELY — Send letter to Senate Health Committee before June 17 hearing",
      "Partner with Planned Parenthood Mar Monte and Reproductive Freedom for All on joint advocacy",
      "Publicize urgency to SFWPC network: mifepristone is under federal threat right now",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB54",
  },
  {
    id: "AB 1930",
    priority: "p2",
    body: "assembly",
    title: "Trans Patient Health Privacy: Out-of-State Investigation Shield",
    sponsor: "Asm. Rick Zbur",
    stage: "Committee",
    lastAction: "Equality CA 2026 sponsored bill. In Senate Judiciary Committee, Spring 2026.",
    committee: "Senate Judiciary Committee",
    hearingDate: "2026-06-23",
    letterDeadline: "2026-06-20",
    blurb: "Places greater protections on confidential medical records for transgender patients who received gender-affirming care, abortion, or trans healthcare in California. Bars out-of-state agencies from readily obtaining these records and using them against patients. Transgender women of color face the highest rates of targeted enforcement.",
    sfwpcActions: [
      "SUPPORT — Send letter to Senate Judiciary Committee",
      "Partner with Equality CA, TGIJP, and Transgender District on joint advocacy",
      "Feature as a trans women's safety bill in SFWPC communications",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB1930",
  },
  {
    id: "SB 1114",
    priority: "p2",
    body: "senate",
    title: "LGBTQ+ Data Privacy: Prevent Federal Surveillance",
    sponsor: "Sen. Christopher Cabaldon",
    stage: "Committee",
    lastAction: "Equality CA 2026 sponsored bill. In Assembly Judiciary Committee, Spring 2026.",
    committee: "Assembly Judiciary Committee",
    hearingDate: "2026-06-16",
    letterDeadline: "2026-06-13",
    blurb: "Limits when California state agencies can share LGBTQ+ identity data and bars its disclosure outside California. Responds to federal attempts to surveil, shut down, or extract LGBTQ+ research and community data. LGBTQ+ women and trans women in particular face heightened risk from data-driven federal targeting.",
    sfwpcActions: [
      "SUPPORT — Send letter to Assembly Judiciary Committee",
      "Coordinate with Equality CA and ACLU NorCal on joint advocacy",
      "Publicize to SF's LGBTQ+ communities: state agencies cannot share your data with federal actors",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB1114",
  },
  {
    id: "AB 1540",
    priority: "p2",
    body: "assembly",
    title: "Restore LGBTQ+ Crisis Counselors to 988 Lifeline",
    sponsor: "Asm. Sade Elhawary",
    stage: "Committee",
    lastAction: "Equality CA 2026 sponsored bill. In Senate Health Committee, Spring 2026.",
    committee: "Senate Health Committee",
    hearingDate: "2026-06-17",
    letterDeadline: "2026-06-14",
    blurb: "Creates a California state-funded LGBTQ+-affirming crisis counseling program to replace the specialized 988 LGBTQ+ lifeline defunded by the Trump administration in 2025. Over 73,000 contacts were routed to LGBTQ+ counselors in California in a single year. LGBTQ+ youth — especially trans girls and young women of color — face a mental health crisis that affirming crisis support can prevent.",
    sfwpcActions: [
      "SUPPORT — Send letter to Senate Health Committee",
      "Partner with SF DPH, LYRIC, and SF Suicide Prevention on advocacy",
      "Feature as an urgent LGBTQ+ youth safety bill in SFWPC communications",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB1540",
  },
  {
    id: "AB 2442",
    priority: "p2",
    body: "assembly",
    title: "Expedite Licensure for Gender-Affirming Care Providers",
    sponsor: "Asm. Rick Zbur",
    stage: "Committee",
    lastAction: "Equality CA 2026 sponsored bill. In Senate Health Committee, Spring 2026.",
    committee: "Senate Health Committee",
    hearingDate: "2026-06-17",
    letterDeadline: "2026-06-14",
    blurb: "Requires expedited processing of license applications for healthcare providers committed to providing gender-affirming care. As federal pressure causes providers to leave California, this bill helps rapidly rebuild the provider network that trans women — especially trans women of color — depend on for survival.",
    sfwpcActions: [
      "SUPPORT — Send letter to Senate Health Committee alongside AB 1540",
      "Partner with UCSF, SF General, and Planned Parenthood on provider pipeline advocacy",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB2442",
  },
  {
    id: "SB 934",
    priority: "p2",
    body: "senate",
    title: "Extend Statute of Limitations for Conversion Therapy Survivors",
    sponsor: "Sen. Scott Wiener",
    stage: "Committee",
    lastAction: "Equality CA 2026 sponsored bill. In Assembly Judiciary Committee, Spring 2026.",
    committee: "Assembly Judiciary Committee",
    hearingDate: "2026-06-16",
    letterDeadline: "2026-06-13",
    blurb: "Extends the statute of limitations so survivors of conversion therapy — the harmful and discredited practice of trying to change a person's sexual orientation or gender identity — can pursue civil claims for longer. LGBTQ+ women and girls are among those subjected to this abuse. Justice should not expire before survivors are ready.",
    sfwpcActions: [
      "SUPPORT — Send letter to Assembly Judiciary Committee",
      "Partner with Equality CA and NCLR on joint advocacy",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB934",
  },

  // ── PRIORITY 5: RACIAL JUSTICE ──
  {
    id: "SB 590",
    priority: "p5",
    body: "senate",
    title: "Paid Family Leave: Expanded to Chosen Family",
    sponsor: "Sen. María Elena Durazo",
    stage: "Enacted",
    enacted: "Oct 2025",
    lastAction: "Signed by Gov. Newsom, Oct 2025. Effective July 1, 2028.",
    blurb: "Expands California's Paid Family Leave wage replacement program to cover care for a 'designated person' — meaning chosen and extended family members, not just blood relatives. Especially critical for LGBTQ+ women, immigrant women, and communities of color who rely on chosen family networks. Makes benefits more inclusive across race, disability, and immigration status.",
    sfwpcActions: [
      "Celebrate as a 2025 victory — publicize to SFWPC's LGBTQ+ and immigrant community partners",
      "Advocate for SF employers to proactively update leave policies ahead of the July 2028 effective date",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB590",
  },

  // ── SF BOS: PAID PARENTAL LEAVE EXPANSION ──
  {
    id: "SF STROLLER Act",
    priority: "p1",
    body: "sf",
    title: "PPLO Amendment: Cut Eligibility Wait from 180 to 90 Days",
    sponsor: "Sup. Danny Sauter",
    stage: "Introduced",
    lastAction: "Introduced at SF Board of Supervisors, April 29, 2026. Co-sponsors: Sups. Walton, Mahmood, Melgar. Referred to committee.",
    committee: "SF Labor & Employment Committee",
    hearingDate: "2026-06-18",
    letterDeadline: "2026-06-15",
    blurb: "Amends SF's landmark Paid Parental Leave Ordinance (the first fully-paid parental leave law in the US) to cut the eligibility waiting period from 180 days to 90 days. This directly benefits low-wage workers in high-turnover industries — disproportionately women of color, immigrant women, and gig workers — who are currently excluded because they change jobs more frequently. Part of Supervisor Sauter's 'STROLLER Act' family-friendly policy package.",
    sfwpcActions: [
      "SUPPORT — This expands the most important parental leave law in the country for low-wage women workers",
      "Send letter to Sup. Sauter and SF Labor & Employment Committee before June 18 hearing",
      "Partner with SF OLSE, SEIU Local 1021, and Chinese Progressive Association on advocacy",
      "Mobilize SFWPC members to attend the Board hearing and submit public comment",
      "Highlight for SFWPC network: this is an election-year opportunity to champion working mothers",
    ],
    position: "SUPPORT",
    url: "https://sfbos.org/legislation",
  },

  // ════════════════════════════════════════════════
  // AI & TECHNOLOGY — ADJACENT ISSUES
  // Women, children, and marginalized communities
  // face disproportionate harm from unregulated AI
  // ════════════════════════════════════════════════
  {
    id: "SB 867",
    priority: "p6",
    body: "senate",
    title: "Ban AI Companion Chatbots in Children's Toys",
    sponsor: "Sen. Steve Padilla",
    stage: "SecondChamber",
    lastAction: "Ordered to special consent calendar in Senate May 26, 2026. Sent to Assembly — committee assignment pending.",
    blurb: "Imposes a four-year moratorium (until Jan 1, 2031) on the manufacture and sale of toys that include AI companion chatbots for children 12 and under. Follows Senator Padilla's SB 243 (enacted Oct 2025), which required chatbot platforms to disclose they are not human. SB 867 goes further — banning the inclusion of companion chatbots in toys altogether after multiple high-profile incidents of AI 'friends' providing dangerous advice to minors. Girls are disproportionately targeted by companion AI products designed to simulate emotional relationships.",
    sfwpcActions: [
      "SUPPORT — Send letter to Assembly committee once assigned",
      "Partner with Common Sense Media and children's safety advocates on joint advocacy",
      "Publicize to SFWPC network: AI companion chatbots targeting girls are a gender justice issue",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB867",
  },
  {
    id: "SB 947",
    priority: "p6",
    body: "senate",
    title: "Worker Protections: AI & Automated Decision Systems",
    sponsor: "Sen. Jerry McNerney",
    stage: "SecondChamber",
    lastAction: "Passed full Senate 29-9 on May 19, 2026. Sent to Assembly — committee assignment pending.",
    blurb: "Establishes worker protections for employees subjected to automated decision systems (ADS) used in hiring, firing, scheduling, and performance evaluation. Women — especially Black and Latina women — are disproportionately harmed by biased AI hiring tools that perpetuate discriminatory patterns at scale. Requires employers to disclose when ADS are used and creates accountability mechanisms.",
    sfwpcActions: [
      "SUPPORT — Send letter to Assembly Labor & Employment Committee",
      "Partner with SEIU, CWA, and California Labor Federation on joint advocacy",
      "Feature as a racial justice + worker equity bill: algorithmic discrimination compounds existing bias",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB947",
  },
  {
    id: "AB 2023",
    priority: "p6",
    body: "assembly",
    title: "Children's Safety: AI Chatbot Regulations",
    sponsor: "Asm. Rebecca Bauer-Kahan / Asm. Buffy Wicks",
    stage: "SecondChamber",
    lastAction: "Passed full Assembly May 26, 2026. Sent to Senate — hearing scheduled.",
    blurb: "Companion bill to SB 1119 — expands protections for children interacting with AI chatbots, building on SB 243's foundation. Focuses on preventing harmful interactions between minors and AI systems designed to simulate emotional relationships. Children — especially girls — are disproportionately targeted by AI companion products marketed as friends, therapists, or romantic partners.",
    sfwpcActions: [
      "SUPPORT alongside SB 867 and SB 1119 — send joint letter covering all three children's AI safety bills",
      "Partner with Common Sense Media and SF Unified School District",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB2023",
  },
  {
    id: "SB 1119",
    priority: "p6",
    body: "senate",
    title: "Children's Safety: AI Chatbot Companion Regulations",
    sponsor: "Sen. Steve Padilla",
    stage: "SecondChamber",
    lastAction: "Passed full Senate 39-0 on May 19, 2026. Sent to Assembly — committee pending.",
    blurb: "Senate companion to AB 2023. Passed the Senate unanimously 39-0. Regulates AI chatbot platforms to better protect children from harmful companion AI interactions — building accountability requirements on top of SB 243's disclosure rules. The 39-0 Senate vote signals broad bipartisan consensus on protecting children from unregulated AI.",
    sfwpcActions: [
      "SUPPORT — Send letter to Assembly committee once assigned",
      "Celebrate broad bipartisan support: 39-0 Senate vote is a significant signal",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB1119",
  },
  {
    id: "SB 928",
    priority: "p6",
    body: "senate",
    title: "CSU: Protect Instructors from AI Replacement",
    sponsor: "Sen. Sabrina Cervantes",
    stage: "SecondChamber",
    lastAction: "Passed full Senate 37-0 on April 23, 2026. Assembly Higher Education Committee hearing June 9.",
    committee: "Assembly Higher Education Committee",
    hearingDate: "2026-06-09",
    letterDeadline: "2026-06-06",
    blurb: "Requires that California State University instructors be human — not AI. Passed the Senate 37-0. Women and faculty of color make up a significant share of CSU instructors and are most vulnerable to job displacement by AI systems. Protecting human instructors is an economic security and racial equity issue.",
    sfwpcActions: [
      "SUPPORT — Send letter to Assembly Higher Education Committee before June 9",
      "Partner with CSU faculty unions (CFA) and SEIU on joint advocacy",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB928",
  },
  {
    id: "SB 903",
    priority: "p6",
    body: "senate",
    title: "Mental Health Therapy: AI Transcription Patient Protections",
    sponsor: "Sen. Steve Padilla / Sen. Susan Rubio",
    stage: "SecondChamber",
    lastAction: "Passed full Senate 39-0 on May 19, 2026. Assembly hearing scheduled June 16.",
    committee: "Assembly Privacy & Consumer Protection Committee",
    hearingDate: "2026-06-16",
    letterDeadline: "2026-06-13",
    blurb: "Regulates the use of AI in transcribing patient information during professional mental health therapy sessions. Women seek mental health therapy at significantly higher rates and are more likely to share deeply personal information in therapeutic settings. Unregulated AI transcription creates serious privacy and safety risks — especially for survivors of domestic violence, sexual assault, and trauma.",
    sfwpcActions: [
      "SUPPORT — Send letter to Assembly Privacy Committee before June 16",
      "Partner with CPEDV, domestic violence organizations, and mental health advocates",
      "Highlight: survivors in therapy are especially vulnerable to AI data privacy violations",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB903",
  },
  {
    id: "AB 621",
    priority: "p6",
    body: "assembly",
    title: "Deepfake Pornography: Expanded Legal Protections",
    sponsor: "Asm. Rebecca Bauer-Kahan",
    stage: "Enacted",
    enacted: "Jan 2026",
    lastAction: "Signed. In effect January 1, 2026.",
    blurb: "Expands California's protections against AI-generated deepfake pornography — broadening the definition of 'digitized sexually explicit material,' increasing statutory damages, and granting enforcement authority to public prosecutors. Clarifies that minors cannot consent to the creation or distribution of deepfake intimate images. Women are overwhelmingly the targets of deepfake pornography, which is used as a tool of harassment, coercion, and control.",
    sfwpcActions: [
      "Celebrate as a 2025 win for women's digital safety — publicize to SFWPC network",
      "Advocate for SF City Attorney's office to actively use new enforcement authority",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB621",
  },
  {
    id: "SB 243",
    priority: "p6",
    body: "senate",
    title: "Companion Chatbot Safety Act (Enacted 2025)",
    sponsor: "Sen. Steve Padilla",
    stage: "Enacted",
    enacted: "Oct 2025",
    lastAction: "Signed by Gov. Newsom, October 13, 2025. In effect 2026.",
    blurb: "Requires AI companion chatbot platforms to clearly disclose they are not human, prohibits them from simulating romantic relationships with minors, mandates regular third-party safety audits, and allows civil suits by users harmed by non-compliance. The foundation law on which SB 867 and SB 1119 build. Protects the women and girls most targeted by parasocial AI relationship products.",
    sfwpcActions: [
      "Celebrate as a 2025 children's and women's safety win",
      "Advocate for active enforcement — complaints can be filed with the CA AG's office",
    ],
    position: "SUPPORT",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB243",
  },
];

// De-duplicate bills that appear in multiple priorities — keep both entries (intentional, searchable)
// ─── HELPERS ─────────────────────────────────────────────────────────────

const CA_PIPELINE = ["Introduced","Committee","Floor","SecondChamber","Governor","Enacted"];
const SF_PIPELINE = ["Introduced","Committee","Floor","Enacted"];

function StageBar({ stage, body }) {
  const pipeline = body === "sf" ? SF_PIPELINE : CA_PIPELINE;
  const isTerminal = ["Vetoed","Failed"].includes(stage);
  const isTwoYear  = stage === "TwoYear";
  const isEnacted  = stage === "Enacted";
  const currentIdx = isTerminal || isTwoYear ? -1 : pipeline.indexOf(stage);

  return (
    <div style={{ display:"flex", alignItems:"center", flexWrap:"nowrap", overflowX:"auto", paddingBottom:2 }}>
      {pipeline.map((s, i) => {
        const isPast    = currentIdx > i;
        const isCurrent = currentIdx === i;
        let dot = C.border;
        if (isEnacted)       dot = "#2A7A50";
        else if (isPast)     dot = "#4A9A6A";
        else if (isCurrent)  dot = C.navy;
        const labelColor = isEnacted ? "#2A7A50" : isCurrent ? C.navy : C.muted;
        return (
          <div key={s+i} style={{ display:"flex", alignItems:"center", flexShrink:0 }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
              <div style={{
                width: isCurrent ? 12 : 8, height: isCurrent ? 12 : 8,
                borderRadius:"50%", background: dot, flexShrink:0,
                boxShadow: isCurrent ? `0 0 0 3px ${dot}33` : "none",
              }}/>
              <span style={{
                fontSize:"0.52rem", fontFamily:"'Libre Baskerville',serif",
                textTransform:"uppercase", letterSpacing:"0.04em",
                color: labelColor, fontWeight: isCurrent ? 700 : 400,
                whiteSpace:"nowrap", maxWidth:54, textAlign:"center", lineHeight:1.2,
              }}>
                {s==="SecondChamber"?"2nd Chmbr":s==="Floor"?"Floor":s}
              </span>
            </div>
            {i < pipeline.length - 1 && (
              <div style={{
                width:18, height:2, flexShrink:0,
                background: (isPast||isEnacted) ? "#4A9A6A" : C.border,
                margin:"0 1px", marginBottom:14,
              }}/>
            )}
          </div>
        );
      })}
      {(isTwoYear||isTerminal) && (
        <div style={{
          marginLeft:8, marginBottom:14,
          padding:"2px 7px", borderRadius:2,
          background: isTwoYear ? "#F5EDD8" : "#FBE8E8",
          border:`1px solid ${isTwoYear ? C.gold : "#C04040"}`,
          fontSize:"0.55rem", fontFamily:"'Libre Baskerville',serif",
          color: isTwoYear ? "#7A5C0A" : "#8C2A2A",
          letterSpacing:"0.06em", textTransform:"uppercase", whiteSpace:"nowrap",
        }}>
          {isTwoYear ? "Two-Year Bill ↩" : stage==="Failed" ? "Failed ✗" : "Vetoed ✗"}
        </div>
      )}
    </div>
  );
}

const POSITION_BADGE = {
  "SUPPORT": { bg:"#E6F3EC", text:"#1B5A3A", border:"#2A7A50" },
  "MONITOR": { bg:"#FFF4E0", text:"#7A5000", border:C.gold    },
  "OPPOSE":  { bg:"#FCEAEA", text:"#8C2A2A", border:"#C04040" },
};

function BillCard({ bill, priorityColor, idx }) {
  const [open, setOpen] = useState(false);
  const isOppose  = bill.position === "OPPOSE";
  const isSupport = bill.position === "SUPPORT";
  const pb = POSITION_BADGE[bill.position] || POSITION_BADGE["MONITOR"];
  const bodyLabel = { senate:"CA Senate", assembly:"CA Assembly", sf:"SF BOS/Federal" }[bill.body] || bill.body;
  const cardBorderLeft = isOppose ? "#C04040" : priorityColor;
  const cardBg = isOppose ? "#FDF5F5" : C.cream;

  // Urgency calculation for header badge
  const today = new Date(); today.setHours(0,0,0,0);
  const hDate = bill.hearingDate ? new Date(bill.hearingDate+"T12:00:00") : null;
  const lDate = bill.letterDeadline ? new Date(bill.letterDeadline+"T12:00:00") : null;
  const hDiff = hDate ? Math.ceil((hDate-today)/(1000*60*60*24)) : null;
  const lDiff = lDate ? Math.ceil((lDate-today)/(1000*60*60*24)) : null;
  const showUrgentBadge = lDiff !== null && lDiff <= 7 && lDiff >= -1;
  const showUpcomingBadge = !showUrgentBadge && hDiff !== null && hDiff <= 14 && hDiff >= 0;

  // Action panel colors
  const actionBg     = isOppose ? "#FBE8E8" : "#EEE8F6";
  const actionBorder = isOppose ? "#E0A0A0" : "#C0B0DC";
  const actionAccent = isOppose ? "#8C2A2A" : C.p1;
  const actionArrow  = isOppose ? "#C04040" : C.p1;
  const actionHeader = isOppose ? "🔴 SFWPC Recommended Opposition Actions" : "🔷 SFWPC Recommended Actions";

  // Take Action button
  const actionBtnLabel = isOppose ? "Send Opposition Letter" : "Send Support Letter";
  const actionBtnBg    = isOppose ? "#C04040" : "#1B5A3A";

  return (
    <div
      onClick={()=>setOpen(o=>!o)}
      style={{
        background: cardBg, borderRadius:3,
        border:`1px solid ${isOppose ? "#E8C0C0" : C.border}`,
        borderLeft:`4px solid ${cardBorderLeft}`,
        marginBottom:"0.65rem", cursor:"pointer",
        boxShadow: open ? "0 6px 22px rgba(27,42,74,0.10)" : "0 1px 3px rgba(27,42,74,0.04)",
        animation:`fadeUp 0.3s ease ${idx*0.04}s both`,
        transition:"box-shadow 0.2s",
      }}
    >
      {/* ── TOP ── */}
      <div style={{ padding:"0.85rem 1rem 0.5rem", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"0.5rem" }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"0.35rem", marginBottom:"0.18rem" }}>
            <span style={{ fontFamily:"'Libre Baskerville',serif", fontWeight:700, fontSize:"0.85rem", color:C.text, whiteSpace:"nowrap" }}>{bill.id}</span>
            <span style={{
              fontSize:"0.55rem", fontFamily:"'Libre Baskerville',serif",
              letterSpacing:"0.1em", textTransform:"uppercase",
              padding:"2px 6px", borderRadius:2,
              background:pb.bg, color:pb.text, border:`1px solid ${pb.border}`,
              whiteSpace:"nowrap", fontWeight:700,
            }}>{isOppose ? "⛔ Recommended Action: Oppose" : isSupport ? "✓ Recommended Action: Support" : bill.position}</span>
            <span style={{ fontSize:"0.57rem", color:C.muted, fontFamily:"'Crimson Pro',serif", letterSpacing:"0.05em" }}>{bodyLabel}</span>
            {bill.enacted && (
              <span style={{ fontSize:"0.55rem", background:"#E6F3EC", color:"#1B5A3A", border:"1px solid #2A7A50", padding:"2px 6px", borderRadius:2, fontFamily:"'Libre Baskerville',serif", letterSpacing:"0.07em", textTransform:"uppercase" }}>✓ Enacted</span>
            )}
            {bill.stage==="TwoYear" && (
              <span style={{ fontSize:"0.55rem", background:"#FFF4E0", color:"#7A5000", border:`1px solid ${C.gold}`, padding:"2px 6px", borderRadius:2, fontFamily:"'Libre Baskerville',serif", letterSpacing:"0.07em", textTransform:"uppercase" }}>2-Year Bill</span>
            )}
            {bill.stage==="Failed" && (
              <span style={{ fontSize:"0.55rem", background:"#FBE8E8", color:"#8C2A2A", border:"1px solid #C04040", padding:"2px 6px", borderRadius:2, fontFamily:"'Libre Baskerville',serif", letterSpacing:"0.07em", textTransform:"uppercase" }}>Failed — Monitor for Reintro</span>
            )}
            {showUrgentBadge && (
              <span style={{ fontSize:"0.58rem", background:"#8C2A2A", color:"#FFF", padding:"2px 8px", borderRadius:2, fontFamily:"'Libre Baskerville',serif", letterSpacing:"0.07em", textTransform:"uppercase", fontWeight:700, animation:"pulse 1.5s ease infinite" }}>
                ⚠️ Letter due {lDiff===0?"TODAY":lDiff===1?"tomorrow":`in ${lDiff} days`}
              </span>
            )}
            {showUpcomingBadge && (
              <span style={{ fontSize:"0.55rem", background:"#1B4A7A", color:"#FFF", padding:"2px 7px", borderRadius:2, fontFamily:"'Libre Baskerville',serif", letterSpacing:"0.07em", textTransform:"uppercase" }}>
                📅 Hearing in {hDiff} days
              </span>
            )}
          </div>
          <div style={{ fontFamily:"'Crimson Pro',serif", fontStyle:"italic", fontSize:"0.93rem", color:"#2A2A3E", lineHeight:1.35, marginBottom:"0.12rem" }}>{bill.title.replace(" — also P3","")}</div>
          <div style={{ fontSize:"0.69rem", color:C.muted, fontFamily:"'Crimson Pro',serif" }}>{bill.sponsor}</div>
        </div>
        <div style={{ color:C.muted, fontSize:"0.7rem", flexShrink:0, paddingTop:2 }}>{open?"▲":"▼"}</div>
      </div>

      {/* ── STAGE BAR ── */}
      <div style={{ padding:"0 1rem 0.65rem", overflowX:"auto" }}>
        <StageBar stage={bill.stage} body={bill.body} />
      </div>

      {/* ── EXPANDED ── */}
      {open && (
        <div style={{ borderTop:`1px solid ${isOppose ? "#F0C8C8" : C.sand}`, padding:"0.8rem 1rem 0.95rem" }}>
          <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:"0.88rem", color:"#3A3A4E", lineHeight:1.72, marginBottom:"0.7rem" }}>{bill.blurb}</p>

          {/* Committee hearing info */}
          {bill.stage === "Committee" && (bill.committee || bill.hearingDate || bill.letterDeadline) && (() => {
            const today = new Date(); today.setHours(0,0,0,0);
            const hDate = bill.hearingDate ? new Date(bill.hearingDate+"T12:00:00") : null;
            const lDate = bill.letterDeadline ? new Date(bill.letterDeadline+"T12:00:00") : null;
            const hDiff = hDate ? Math.ceil((hDate-today)/(1000*60*60*24)) : null;
            const lDiff = lDate ? Math.ceil((lDate-today)/(1000*60*60*24)) : null;
            const isUrgent = lDiff !== null && lDiff <= 7;
            return (
              <div style={{
                background: isUrgent ? "#FBE8E8" : "#EDF3FA",
                border:`1px solid ${isUrgent ? "#E8A0A0" : "#A8C0DC"}`,
                borderRadius:3, padding:"0.65rem 0.8rem", marginBottom:"0.75rem",
              }}>
                <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.58rem", letterSpacing:"0.14em", textTransform:"uppercase", color: isUrgent ? "#8C2A2A" : "#1B4A7A", marginBottom:"0.35rem" }}>
                  {isUrgent ? "⚠️ Urgent — Letter Deadline Approaching" : "🏛 Committee Information"}
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.9rem" }}>
                  {bill.committee && (
                    <div style={{ fontSize:"0.78rem", fontFamily:"'Crimson Pro',serif", color:"#2A2A3E" }}>
                      <span style={{ color:C.muted }}>Committee: </span><strong>{bill.committee}</strong>
                    </div>
                  )}
                  {hDate && (
                    <div style={{ fontSize:"0.78rem", fontFamily:"'Crimson Pro',serif", color:"#2A2A3E" }}>
                      <span style={{ color:C.muted }}>Hearing: </span>
                      <strong>{hDate.toLocaleDateString("en-US",{weekday:"short",month:"long",day:"numeric",year:"numeric"})}</strong>
                      {hDiff !== null && <span style={{ marginLeft:4, color: hDiff<=3?"#8C2A2A":hDiff<=7?"#7A4A00":C.muted, fontSize:"0.7rem" }}>
                        ({hDiff===0?"Today":hDiff===1?"Tomorrow":hDiff>0?`${hDiff} days away`:"Passed"})
                      </span>}
                    </div>
                  )}
                  {lDate && (
                    <div style={{ fontSize:"0.78rem", fontFamily:"'Crimson Pro',serif", color: isUrgent ? "#8C2A2A" : "#2A2A3E" }}>
                      <span style={{ color:C.muted }}>✉ Letter deadline: </span>
                      <strong>{lDate.toLocaleDateString("en-US",{weekday:"short",month:"long",day:"numeric"})}</strong>
                      {lDiff !== null && <span style={{ marginLeft:4, color: lDiff<=3?"#8C2A2A":lDiff<=7?"#7A4A00":C.muted, fontSize:"0.7rem" }}>
                        ({lDiff===0?"TODAY":lDiff===1?"Tomorrow":lDiff>0?`${lDiff} days`:lDiff>=-2?"Just passed":"Passed"})
                      </span>}
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          <div style={{ fontSize:"0.69rem", color:C.muted, fontFamily:"'Crimson Pro',serif", marginBottom:"0.8rem" }}>
            📅 <strong>Last action:</strong> {bill.lastAction}
          </div>

          {/* SFWPC Actions */}
          <div style={{ background:actionBg, border:`1px solid ${actionBorder}`, borderRadius:3, padding:"0.7rem 0.85rem", marginBottom:"0.85rem" }}>
            <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.58rem", letterSpacing:"0.15em", textTransform:"uppercase", color:actionAccent, marginBottom:"0.45rem" }}>
              {actionHeader}
            </div>
            {bill.sfwpcActions.map((a, i) => (
              <div key={i} style={{ display:"flex", gap:"0.45rem", marginBottom: i<bill.sfwpcActions.length-1?"0.32rem":0 }}>
                <span style={{ color:actionArrow, fontSize:"0.78rem", flexShrink:0, marginTop:"0.03rem" }}>→</span>
                <span style={{ fontFamily:"'Crimson Pro',serif", fontSize:"0.83rem", color: isOppose ? "#3A1A1A" : "#3A2A4E", lineHeight:1.55 }}>{a}</span>
              </div>
            ))}
          </div>

          {/* Take Action + Full Text row */}
          <div style={{ display:"flex", gap:"0.6rem", alignItems:"flex-start", flexWrap:"wrap" }} onClick={e=>e.stopPropagation()}>

            {bill.body === "sf" ? (
              /* SF BOS: show email address visibly + copy + open in webmail + public comment */
              <div style={{ width:"100%" }}>
                {/* Email address box */}
                <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", flexWrap:"wrap", marginBottom:"0.5rem" }}>
                  <div style={{
                    display:"flex", alignItems:"center", gap:"0.5rem",
                    background:"#EDE8DE", border:`1px solid ${C.border}`,
                    borderRadius:2, padding:"0.35rem 0.7rem", flex:"1", minWidth:0,
                  }}>
                    <span style={{ fontSize:"0.7rem", color:C.muted, fontFamily:"'Libre Baskerville',serif", letterSpacing:"0.04em", flexShrink:0 }}>✉</span>
                    <span style={{ fontSize:"0.78rem", color:C.text, fontFamily:"'Crimson Pro',serif", fontWeight:600, userSelect:"all", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                      board.of.supervisors@sfgov.org
                    </span>
                  </div>
                  <button
                    onClick={e=>{ e.stopPropagation(); navigator.clipboard.writeText("board.of.supervisors@sfgov.org"); e.currentTarget.textContent="Copied!"; setTimeout(()=>{ if(e.currentTarget) e.currentTarget.textContent="Copy"; },2000); }}
                    style={{
                      padding:"0.35rem 0.7rem", background:actionBtnBg, color:"#FAF7F2",
                      border:"none", borderRadius:2, fontFamily:"'Libre Baskerville',serif",
                      fontSize:"0.62rem", letterSpacing:"0.07em", textTransform:"uppercase",
                      fontWeight:700, cursor:"pointer", flexShrink:0, transition:"opacity 0.15s",
                    }}
                    onMouseOver={e=>e.currentTarget.style.opacity="0.85"}
                    onMouseOut={e=>e.currentTarget.style.opacity="1"}
                  >Copy</button>
                </div>
                {/* Open in webmail links */}
                <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", alignItems:"center" }}>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&to=board.of.supervisors@sfgov.org&su=${encodeURIComponent("SFWPC " + (bill.position==="OPPOSE"?"Opposition":"Support") + ": " + bill.id + " — " + bill.title)}&body=${encodeURIComponent("Dear Members of the Board of Supervisors,\n\nThe San Francisco Women's Political Committee (SFWPC) " + (bill.position==="OPPOSE"?"OPPOSES":"SUPPORTS") + " " + bill.id + ": " + bill.title + ".\n\n[Add your statement here]\n\nSincerely,\n[Your Name]\nSFWPC")}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.62rem", letterSpacing:"0.07em", color:C.gold, textDecoration:"none", borderBottom:`1px solid ${C.gold}`, textTransform:"uppercase" }}
                  >Open in Gmail ↗</a>
                  <a
                    href={`https://outlook.live.com/mail/0/deeplink/compose?to=board.of.supervisors@sfgov.org&subject=${encodeURIComponent("SFWPC " + (bill.position==="OPPOSE"?"Opposition":"Support") + ": " + bill.id)}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.62rem", letterSpacing:"0.07em", color:C.gold, textDecoration:"none", borderBottom:`1px solid ${C.gold}`, textTransform:"uppercase" }}
                  >Open in Outlook ↗</a>
                  <a
                    href="https://sfbos.org/public-comment"
                    target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.62rem", letterSpacing:"0.07em", color:C.muted, textDecoration:"none", borderBottom:`1px solid ${C.muted}`, textTransform:"uppercase" }}
                  >Submit Public Comment ↗</a>
                  <a href={bill.url} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.62rem", letterSpacing:"0.07em", color:C.gold, textDecoration:"none", borderBottom:`1px solid ${C.gold}`, textTransform:"uppercase" }}>
                    Full Bill Text ↗
                  </a>
                </div>
              </div>
            ) : (
              /* CA Legislature: official advocate portal */
              <>
                <a
                  href="https://calegislation.lc.ca.gov/Advocates/"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display:"inline-block",
                    background: actionBtnBg, color:"#FAF7F2",
                    fontFamily:"'Libre Baskerville',serif", fontSize:"0.63rem",
                    letterSpacing:"0.07em", textTransform:"uppercase",
                    padding:"0.42rem 0.85rem", borderRadius:2,
                    textDecoration:"none", fontWeight:700, transition:"opacity 0.15s",
                  }}
                  onMouseOver={e=>e.currentTarget.style.opacity="0.85"}
                  onMouseOut={e=>e.currentTarget.style.opacity="1"}
                >
                  ✉ Submit Position to Legislature ↗
                </a>
                <a
                  href="https://findyourrep.legislature.ca.gov/"
                  target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.62rem", letterSpacing:"0.07em", color:C.muted, textDecoration:"none", borderBottom:`1px solid ${C.muted}`, textTransform:"uppercase", paddingTop:"0.1rem" }}
                >
                  Find Your Rep ↗
                </a>
                {/* Bill text */}
                <a href={bill.url} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.62rem", letterSpacing:"0.07em", color:C.gold, textDecoration:"none", borderBottom:`1px solid ${C.gold}`, textTransform:"uppercase", paddingTop:"0.1rem" }}>
                  Full Bill Text ↗
                </a>
              </>
            )}

            {/* Bill text for SF already included above; skip duplicate for CA */}
            {bill.body !== "sf" && false && (
              <a href={bill.url} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.62rem", letterSpacing:"0.07em", color:C.gold, textDecoration:"none", borderBottom:`1px solid ${C.gold}`, textTransform:"uppercase", paddingTop:"0.1rem" }}>
                Full Bill Text ↗
              </a>
            )}
          </div>

          {/* How to submit explainer */}
          <div style={{ marginTop:"0.6rem", padding:"0.5rem 0.7rem", background:C.sand, borderRadius:2, fontSize:"0.7rem", fontFamily:"'Crimson Pro',serif", color:C.muted, lineHeight:1.55 }}>
            {bill.body === "sf" ? (
              <>
                <strong style={{ color:C.text }}>How to contact the SF Board of Supervisors:</strong> Copy the email address above and paste it into Gmail, Outlook, or any email app — or click "Open in Gmail / Outlook" to launch a pre-drafted message. You can also submit written public comment at sfbos.org/public-comment, or attend the hearing in person at <strong>City Hall, Room 250</strong>.
              </>
            ) : (
              <>
                <strong style={{ color:C.text }}>How to submit a position letter:</strong> Click "Submit Position to Legislature" → log in or register → search for <strong>{bill.id}</strong> → select "Support" or "Oppose" → submit. Or use "Find Your Rep" to contact your specific Assembly or Senate member directly.
              </>
            )}
          </div>

          {/* Live status checker */}
          {bill.stage !== "Enacted" && bill.stage !== "Failed" && bill.stage !== "Vetoed" && (
            <LiveStatusChecker bill={bill} />
          )}
        </div>
      )}
    </div>
  );
}

// ─── KEY LEGISLATIVE DEADLINES (2026 CA Calendar) ───────────────────────
const SESSION_DEADLINES = [
  { date: "2026-06-01", label: "Committee Meetings Resume", note: "Second-house policy committee hearings begin", type: "info" },
  { date: "2026-07-02", label: "Policy Committees: Last Day", note: "Last day for second-house policy committees to meet and report bills", type: "critical" },
  { date: "2026-08-03", label: "Legislature Reconvenes", note: "Returns from summer recess — second-house floor votes begin", type: "info" },
  { date: "2026-08-14", label: "Fiscal Committees: Last Day", note: "Last day for fiscal committees to meet and report bills to Floor", type: "critical" },
  { date: "2026-08-21", label: "Last Day to Amend on Floor", note: "No further amendments after this date", type: "warning" },
  { date: "2026-08-31", label: "Final Passage Deadline", note: "Last day for each house to pass all bills — any bill not passed by midnight is dead this session", type: "critical" },
  { date: "2026-10-12", label: "Governor Signing Deadline", note: "Last day for Governor to sign or veto bills. Bills in possession on/after Sept 1 must be acted on by Oct 12", type: "critical" },
];

// ─── LIVE STATUS FETCHER ─────────────────────────────────────────────────
// Module-level cache so re-opening a bill card doesn't re-fetch
const statusCache = new Map();

function LiveStatusChecker({ bill }) {
  const cacheKey = bill.id;
  const cached   = statusCache.get(cacheKey);

  const [status,  setStatus]  = useState(cached || null);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(!!cached);
  const [error,   setError]   = useState(null);

  // Auto-fetch on mount for bills in Committee (highest urgency)
  useEffect(() => {
    if (cached) return;                        // already have result
    if (bill.stage !== "Committee") return;    // only auto-fetch committee bills
    doFetch();
  }, []); // eslint-disable-line

  async function doFetch(fromButton = false) {
    if (loading) return;
    if (fromButton) setStatus(null);
    setLoading(true);
    setChecked(false);
    setError(null);

    try {
      const body = bill.body === "sf"
        ? `Search sfbos.org for the current status of SF Board of Supervisors ordinance: ${bill.id} — "${bill.title}" by ${bill.sponsor}. Our records: ${bill.stage} — ${bill.lastAction}.`
        : `Search leginfo.legislature.ca.gov for the current status of ${bill.id}: "${bill.title}" by ${bill.sponsor}. Our records: ${bill.stage} — ${bill.lastAction}. Find any updates.`;

      let messages = [{ role: "user", content: body }];
      let finalText = "";
      let iters = 0;

      while (iters < 3) {
        iters++;
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.REACT_APP_ANTHROPIC_KEY,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true",
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 600,
            tools: [{ type: "web_search_20250305", name: "web_search" }],
            system: `You are a California legislative tracker. Find the current status of a bill. Return ONLY a raw JSON object — no markdown, no explanation — with these fields:
- stage: "Introduced"|"Committee"|"Floor"|"SecondChamber"|"Governor"|"Enacted"|"Vetoed"|"Failed"|"TwoYear"
- stageDetail: one-sentence current status (e.g. "In Senate Judiciary Committee — hearing June 23, 2026")
- lastAction: most recent action with date
- nextHearing: next scheduled hearing ISO date YYYY-MM-DD or null
- committee: committee name if in committee, else null
- letterDeadline: 3 business days before hearing ISO date or null
- changed: true if different from the records provided, false if same`,
            messages,
          }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        messages.push({ role: "assistant", content: data.content });
        const text = (data.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("");
        if (text) finalText = text;
        if (data.stop_reason === "end_turn") break;
        if (data.stop_reason === "tool_use") {
          const tools = (data.content||[]).filter(b=>b.type==="tool_use");
          messages.push({ role:"user", content: tools.map(t=>({ type:"tool_result", tool_use_id:t.id, content:"Search completed." })) });
        } else break;
      }

      const match = finalText.match(/\{[\s\S]*?\}/);
      const result = match ? JSON.parse(match[0]) : { stageDetail: "Status checked — no changes found.", changed: false };
      statusCache.set(cacheKey, result);
      setStatus(result);
      setChecked(true);
    } catch(err) {
      setError("Could not fetch live status.");
    }
    setLoading(false);
  }

  const isAutoChecking = loading && !checked;

  return (
    <div style={{ marginTop:"0.6rem" }} onClick={e=>e.stopPropagation()}>
      {/* Auto-checking indicator */}
      {isAutoChecking && (
        <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", padding:"0.3rem 0", fontSize:"0.68rem", fontFamily:"'Crimson Pro',serif", color:C.muted, fontStyle:"italic" }}>
          <span style={{ animation:"pulse 1.2s ease-in-out infinite", display:"inline-block" }}>🔄</span>
          Auto-checking live status…
        </div>
      )}

      {/* Manual button — shown once auto-check is done or for non-committee bills */}
      {!isAutoChecking && (
        <button
          onClick={()=>doFetch(true)}
          disabled={loading}
          style={{
            padding:"0.3rem 0.75rem",
            background: checked && status?.changed ? "#1B5A3A" : "none",
            border:`1.5px solid ${checked && status?.changed ? "#1B5A3A" : C.gold}`,
            borderRadius:2, fontFamily:"'Libre Baskerville',serif", fontSize:"0.6rem",
            letterSpacing:"0.08em", textTransform:"uppercase",
            color: checked && status?.changed ? "#FFF" : C.gold,
            cursor: loading ? "wait" : "pointer", transition:"all 0.2s",
          }}
        >
          {loading ? "🔄 Checking…" : checked ? "🔄 Re-check live status" : "🔄 Check live status"}
        </button>
      )}

      {/* Error */}
      {error && !loading && (
        <div style={{ marginTop:"0.35rem", fontSize:"0.7rem", color:"#8C2A2A", fontFamily:"'Crimson Pro',serif", fontStyle:"italic" }}>
          ⚠ {error} <a href={bill.url} target="_blank" rel="noopener noreferrer" style={{ color:C.gold }}>Check leginfo directly ↗</a>
        </div>
      )}

      {/* Result */}
      {status && !loading && (
        <div style={{
          marginTop:"0.45rem", padding:"0.6rem 0.75rem", borderRadius:2,
          background: status.changed ? "#E8F5EE" : "#F5F0E8",
          border:`1px solid ${status.changed ? "#2A7A50" : C.border}`,
          fontSize:"0.75rem", fontFamily:"'Crimson Pro',serif",
          color: status.changed ? "#1E3A2A" : "#5A5A4A", lineHeight:1.55,
        }}>
          {status.changed
            ? <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.58rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"#2A7A50", marginBottom:"0.25rem" }}>⚡ Status Updated</div>
            : <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.58rem", letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:"0.25rem" }}>✓ Status Confirmed</div>
          }
          <div><strong>Current:</strong> {status.stageDetail || status.lastAction}</div>
          {status.nextHearing && <div style={{ marginTop:"0.2rem" }}>📅 <strong>Next hearing:</strong> {new Date(status.nextHearing+"T12:00:00").toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</div>}
          {status.committee && <div style={{ marginTop:"0.2rem" }}>🏛 <strong>Committee:</strong> {status.committee}</div>}
          {status.letterDeadline && <div style={{ marginTop:"0.2rem", color:"#8C2A2A" }}>✉ <strong>Letter deadline:</strong> {new Date(status.letterDeadline+"T12:00:00").toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</div>}
        </div>
      )}
    </div>
  );
}

// ─── NEW BILL SCANNER (self-updating via persistent storage) ─────────────

// Hook: loads/saves scanned bills from persistent storage
function useScannedBills() {
  const [scannedBills, setScannedBills] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const result = await window.storage.get("sfwpc-scanned-bills");
        if (result && result.value) {
          const parsed = JSON.parse(result.value);
          if (Array.isArray(parsed)) setScannedBills(parsed);
        }
      } catch(e) { /* no saved bills yet */ }
    }
    load();
  }, []);

  async function save(bills) {
    try {
      await window.storage.set("sfwpc-scanned-bills", JSON.stringify(bills));
      setScannedBills(bills);
    } catch(e) { console.error("Storage save failed:", e); }
  }

  // Returns count of actually-new bills added
  async function addBills(newBills) {
    const existingIds = new Set(scannedBills.map(b => b.id.toLowerCase().replace(/\s+/g,"")));
    const toAdd = newBills.filter(b => b.id && !existingIds.has(b.id.toLowerCase().replace(/\s+/g,"")));
    if (toAdd.length > 0) await save([...scannedBills, ...toAdd]);
    return toAdd.length;
  }

  async function removeBill(id) {
    await save(scannedBills.filter(b => b.id !== id));
  }

  async function clearAll() {
    await save([]);
  }

  return { scannedBills, addBills, removeBill, clearAll };
}

const SCAN_PROMPT = `You are a legislative tracker for the San Francisco Women's Political Committee (SFWPC). You will be given web search results. From those results identify bills or ordinances introduced or significantly advanced in the LAST 60 DAYS relevant to SFWPC priorities:
1. Gender parity, civic representation, elections, voting rights
2. Reproductive rights, LGBTQ+ rights, civil rights, economic security, housing
3. Gender-based violence, DV survivor protections
4. Immigrant protections, sanctuary policies, language access
5. Racial justice, intersectional feminism, worker equity for women of color
6. Adjacent: childcare, maternal health, AI & technology, education, environmental justice

For each relevant bill that is NOT already well-known, return a JSON object with:
- id: bill number (e.g. "SF Ord. 26-XXX", "AB 1234", "SB 567")
- body: "assembly"|"senate"|"sf"
- title: short title under 10 words
- sponsor: author name
- stage: "Introduced"|"Committee"|"Floor"|"SecondChamber"|"Governor"|"Enacted"
- lastAction: one-line status with date
- blurb: 2-3 sentence plain-English summary and why it matters to women in SF
- priority: "p1"|"p2"|"p3"|"p4"|"p5"|"p6"
- position: "SUPPORT"|"OPPOSE"|"MONITOR"
- sfwpcActions: array of 2 recommended actions
- url: leginfo or sfbos URL

Return ONLY a raw JSON array. No markdown fences, no explanation. If nothing relevant found, return [].`;

async function webSearch(query) {
  // Use the Anthropic API with web search to get real results
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.REACT_APP_ANTHROPIC_KEY,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true",
          },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      tools: [{ type: "web_search_20250305", name: "web_search" }],
      messages: [{
        role: "user",
        content: query
      }],
    }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);

  // Run tool loop to completion
  let messages = [{ role: "user", content: query }];
  messages.push({ role: "assistant", content: data.content });
  let finalText = (data.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("");

  if (data.stop_reason === "tool_use") {
    // Execute tool calls - in Claude.ai artifacts the API proxy handles the actual searching
    const tools = (data.content||[]).filter(b=>b.type==="tool_use");
    messages.push({
      role: "user",
      content: tools.map(t => ({ type: "tool_result", tool_use_id: t.id, content: "Search executed - results integrated." }))
    });
    const res2 = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.REACT_APP_ANTHROPIC_KEY,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true",
          },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        tools: [{ type: "web_search_20250305", name: "web_search" }],
        messages,
      }),
    });
    const data2 = await res2.json();
    if (data2.error) throw new Error(data2.error.message);
    finalText = (data2.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("") || finalText;
  }
  return finalText;
}

function NewBillScanner({ scannedBills, onAddBills, onRemoveBill, onClearAll, standalone = false }) {
  const [scanning,  setScanning]  = useState(false);
  const [lastScan,  setLastScan]  = useState(null);
  const [error,     setError]     = useState(null);
  const [latestNew, setLatestNew] = useState(null);
  const [scanLog,   setScanLog]   = useState([]);

  async function runScan() {
    setScanning(true);
    setError(null);
    setLatestNew(null);
    setScanLog([]);

    const log = [];
    const addLog = (msg) => { log.push(msg); setScanLog([...log]); };

    try {
      // Run 3 targeted searches in parallel for speed and breadth
      addLog("Searching SF Board of Supervisors...");
      addLog("Searching CA Legislature for new bills...");
      addLog("Searching advocacy org agendas...");

      const [sfResults, caResults, advResults] = await Promise.all([
        webSearch("San Francisco Board of Supervisors new ordinances introduced 2026 women rights workers housing immigration gender equity site:sfbos.org OR site:sfstandard.com OR site:missionlocal.org"),
        webSearch("California legislature new bills introduced 2026 June women gender equity reproductive rights LGBTQ immigration racial justice voting rights AB SB site:leginfo.legislature.ca.gov OR site:calmatters.org OR site:couragecalifornia.org"),
        webSearch("California 2026 bills Stronger CA Women's Caucus Equality CA CPEDV new legislation June 2026 introduced advanced"),
      ]);

      addLog("Analyzing results...");

      // Now ask Claude to parse all three result sets and extract bills
      const parseRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.REACT_APP_ANTHROPIC_KEY,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true",
          },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2500,
          system: SCAN_PROMPT,
          messages: [{
            role: "user",
            content: `Here are web search results from three searches. Extract any bills or ordinances that appear NEW (not yet widely tracked) and relevant to SFWPC priorities. Today's date is June 4, 2026.\n\n=== SF BOS RESULTS ===\n${sfResults}\n\n=== CA LEGISLATURE RESULTS ===\n${caResults}\n\n=== ADVOCACY ORG RESULTS ===\n${advResults}\n\nReturn a JSON array of newly found relevant bills. If the results only mention bills already well-known (SB 73, SB 867, AB 2691, SB 1164, etc.) return [].`
          }],
        }),
      });

      const parseData = await parseRes.json();
      if (parseData.error) throw new Error(parseData.error.message);

      const finalText = (parseData.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("");

      const match = finalText.match(/\[[\s\S]*\]/);
      const found = match ? JSON.parse(match[0]) : [];

      // Filter out bills already in the hardcoded tracker
      const hardcodedIds = new Set(BILLS.map(b => b.id.toLowerCase().replace(/\s+/g,"")));
      const genuinelyNew = found.filter(b =>
        b.id && !hardcodedIds.has(b.id.toLowerCase().replace(/\s+/g,""))
      );

      addLog(`Found ${genuinelyNew.length} new bill${genuinelyNew.length !== 1 ? "s" : ""}.`);

      const added = await onAddBills(genuinelyNew);
      setLatestNew(added);
      setLastScan(new Date());
    } catch(e) {
      setError(e.message || "Scan failed. Please try again.");
    }
    setScanning(false);
  }

  const priorityMeta = {
    p1:{label:"Gender Parity", color:C.p1},
    p2:{label:"Civil & Repro",  color:C.p2},
    p3:{label:"GBV & Safety",   color:C.p3},
    p4:{label:"Immigrant",      color:C.p4},
    p5:{label:"Racial Justice", color:C.p5},
    p6:{label:"Adjacent",       color:C.p6},
  };

  return (
    <div style={{ background: standalone ? C.cream : "#0D1B35", borderBottom: standalone ? "none" : `1px solid rgba(184,150,62,0.18)` }}>
      <div style={{ maxWidth:900, margin:"0 auto", padding: standalone ? "0" : "0.75rem 1.25rem" }}>

        {/* Standalone page header */}
        {standalone && (
          <>
            <h2 style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"1.3rem", fontWeight:700, color:C.text, marginBottom:"0.3rem" }}>
              🔍 Scan for New Bills
            </h2>
            <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:"0.9rem", color:C.muted, marginBottom:"1.5rem", lineHeight:1.6 }}>
              SF BOS introduces ordinances year-round and CA bills advance weekly. Run a scan to automatically find and add new relevant bills to this tracker. Scanned bills are saved and appear in Active Bills immediately.
            </p>
          </>
        )}

        {/* Header row */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1rem", flexWrap:"wrap",
          background: standalone ? C.sand : "none",
          border: standalone ? `1px solid ${C.border}` : "none",
          borderRadius: standalone ? 3 : 0,
          padding: standalone ? "1rem 1.1rem" : "0",
          marginBottom: standalone ? "1.5rem" : "0",
        }}>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize: standalone ? "0.85rem" : "0.6rem", letterSpacing: standalone ? "0.02em" : "0.18em", textTransform: standalone ? "none" : "uppercase", color: standalone ? C.text : C.gold, marginBottom:"0.18rem", fontWeight: standalone ? 600 : 400 }}>
              {standalone ? "Run a weekly scan during session" : "🔍 Auto-Scan for New Bills"}
            </div>
            <div style={{ fontSize:"0.75rem", color: standalone ? C.muted : "rgba(250,247,242,0.45)", fontFamily:"'Crimson Pro',serif", lineHeight:1.5 }}>
              Uses AI + live web search to find new bills introduced in the last 30 days.
              New bills are <strong style={{ color: standalone ? C.text : "rgba(250,247,242,0.7)" }}>automatically saved</strong> and added to Active Bills.
              {lastScan && <span style={{ color: standalone ? C.gold : "rgba(184,150,62,0.65)", marginLeft:"0.4rem" }}>Last scan: {lastScan.toLocaleDateString("en-US",{month:"short",day:"numeric"})}</span>}
            </div>
          </div>
          <button onClick={runScan} disabled={scanning} style={{
            padding:"0.5rem 1.2rem",
            background: scanning ? (standalone ? C.border : "rgba(184,150,62,0.25)") : C.gold,
            border:"none", borderRadius:2,
            fontFamily:"'Libre Baskerville',serif", fontSize:"0.68rem",
            letterSpacing:"0.08em", textTransform:"uppercase",
            color: scanning ? C.muted : "#1B2A4A",
            fontWeight:700, cursor: scanning ? "wait" : "pointer", transition:"all 0.2s", flexShrink:0,
          }}>
            {scanning ? "🔄 Scanning…" : "Scan Now"}
          </button>
        </div>

        {/* Feedback */}
        {scanning && (
          <div style={{ margin:"0.6rem 0", padding:"0.6rem 0.8rem", background: standalone ? C.sand : "rgba(255,255,255,0.06)", border:`1px solid ${standalone ? C.border : "rgba(255,255,255,0.1)"}`, borderRadius:2 }}>
            {scanLog.map((msg, i) => (
              <div key={i} style={{ fontSize:"0.72rem", fontFamily:"'Crimson Pro',serif", color: standalone ? C.muted : "rgba(250,247,242,0.55)", display:"flex", alignItems:"center", gap:"0.4rem", marginBottom: i < scanLog.length-1 ? "0.25rem" : 0 }}>
                <span style={{ animation: i === scanLog.length-1 ? "pulse 1s ease-in-out infinite" : "none", display:"inline-block" }}>
                  {i === scanLog.length-1 ? "🔄" : "✓"}
                </span>
                {msg}
              </div>
            ))}
          </div>
        )}

        {error && !scanning && (
          <div style={{ marginBottom:"1rem", padding:"0.5rem 0.75rem", background: standalone ? "#FBE8E8" : "rgba(180,40,40,0.15)", border:`1px solid ${standalone?"#E8A0A0":"rgba(180,40,40,0.3)"}`, borderRadius:2, fontSize:"0.75rem", color: standalone ? "#8C2A2A" : "#F4A0A0", fontFamily:"'Crimson Pro',serif" }}>
            ⚠ {error}
          </div>
        )}
        {latestNew !== null && (
          <div style={{ marginBottom:"1rem", fontSize:"0.8rem", fontFamily:"'Crimson Pro',serif", color: latestNew > 0 ? (standalone ? "#1B5A3A" : "#7DD8A8") : (standalone ? C.muted : "rgba(250,247,242,0.4)"), fontStyle: latestNew===0 ? "italic" : "normal", fontWeight: latestNew > 0 ? 600 : 400 }}>
            {latestNew === 0
              ? "✓ No new relevant bills found. Check again next week."
              : `⚡ ${latestNew} new bill${latestNew!==1?"s":""} found and automatically added to Active Bills.`
            }
          </div>
        )}

        {/* Saved bills list */}
        {scannedBills.length > 0 && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.6rem" }}>
              <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.6rem", letterSpacing:"0.14em", textTransform:"uppercase", color: standalone ? C.gold : "rgba(250,247,242,0.35)" }}>
                {scannedBills.length} bill{scannedBills.length!==1?"s":""} auto-added by scan
              </div>
              <button onClick={onClearAll} style={{ background:"none", border:`1px solid ${standalone?"#E8A0A0":"rgba(200,80,80,0.4)"}`, borderRadius:2, padding:"0.2rem 0.5rem", color: standalone ? "#8C2A2A" : "rgba(200,80,80,0.6)", fontSize:"0.6rem", fontFamily:"'Libre Baskerville',serif", cursor:"pointer", letterSpacing:"0.06em", textTransform:"uppercase" }}>
                Clear All
              </button>
            </div>
            {scannedBills.map((b,i) => {
              const pm = priorityMeta[b.priority] || {label:b.priority||"?", color:C.muted};
              return (
                <div key={(b.id||"no-id")+i} style={{
                  display:"flex", gap:"0.6rem", alignItems:"flex-start",
                  background: standalone ? "#FFF" : "rgba(255,255,255,0.05)",
                  border: standalone ? `1px solid ${C.border}` : `1px solid rgba(255,255,255,0.07)`,
                  borderLeft:`4px solid ${pm.color}`,
                  borderRadius:2, padding:"0.7rem 0.9rem", marginBottom:"0.45rem",
                  boxShadow: standalone ? "0 1px 3px rgba(0,0,0,0.05)" : "none",
                }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", gap:"0.4rem", alignItems:"center", flexWrap:"wrap", marginBottom:"0.2rem" }}>
                      <span style={{ fontFamily:"'Libre Baskerville',serif", fontWeight:700, fontSize:"0.82rem", color: standalone ? C.text : C.cream }}>{b.id}</span>
                      <span style={{ fontSize:"0.56rem", background:`${pm.color}20`, color:pm.color, padding:"1px 5px", borderRadius:2, fontFamily:"'Libre Baskerville',serif", letterSpacing:"0.06em", textTransform:"uppercase", border:`1px solid ${pm.color}40` }}>{pm.label}</span>
                      <span style={{ fontSize:"0.62rem", color:C.muted, fontFamily:"'Crimson Pro',serif" }}>{b.body==="sf"?"SF BOS":b.body==="senate"?"CA Senate":"CA Assembly"}</span>
                      {b.position && <span style={{ fontSize:"0.56rem", color: b.position==="OPPOSE"?(standalone?"#8C2A2A":"#F4A0A0"):(standalone?"#1B5A3A":"#7DD8A8"), fontFamily:"'Libre Baskerville',serif", letterSpacing:"0.05em", textTransform:"uppercase", fontWeight:700 }}>{b.position==="OPPOSE"?"⛔ Oppose":"✓ Support"}</span>}
                    </div>
                    <div style={{ fontSize:"0.85rem", color: standalone ? C.text : "rgba(250,247,242,0.85)", fontFamily:"'Crimson Pro',serif", fontStyle:"italic", marginBottom:"0.15rem", lineHeight:1.4 }}>{b.title}</div>
                    <div style={{ fontSize:"0.72rem", color:C.muted, fontFamily:"'Crimson Pro',serif", marginBottom: b.blurb ? "0.35rem" : 0 }}>{b.sponsor}{b.lastAction ? ` · ${b.lastAction}` : ""}</div>
                    {b.blurb && standalone && <div style={{ fontSize:"0.78rem", color:"#3A3A4E", fontFamily:"'Crimson Pro',serif", lineHeight:1.55 }}>{b.blurb}</div>}
                    {b.url && standalone && (
                      <a href={b.url} target="_blank" rel="noopener noreferrer" style={{ fontSize:"0.62rem", color:C.gold, fontFamily:"'Libre Baskerville',serif", letterSpacing:"0.06em", textTransform:"uppercase", textDecoration:"none", borderBottom:`1px solid ${C.gold}`, display:"inline-block", marginTop:"0.35rem" }}>
                        View Bill ↗
                      </a>
                    )}
                  </div>
                  <button onClick={()=>onRemoveBill(b.id)} title="Remove from tracker" style={{ background:"none", border:"none", color: standalone ? C.muted : "rgba(250,247,242,0.2)", fontSize:"0.9rem", cursor:"pointer", flexShrink:0, padding:"0 0.15rem", lineHeight:1 }}>✕</button>
                </div>
              );
            })}
          </div>
        )}

        {scannedBills.length === 0 && !scanning && standalone && latestNew === null && (
          <div style={{ textAlign:"center", padding:"3rem 1rem", color:C.muted, fontStyle:"italic", fontSize:"0.9rem", border:`1px dashed ${C.border}`, borderRadius:3 }}>
            No scanned bills yet. Click "Scan Now" to search for new bills introduced in the last 30 days.
          </div>
        )}
      </div>
    </div>
  );
}

function DeadlineDashboard({ bills, standalone = false }) {
  const today = new Date();
  today.setHours(0,0,0,0);

  // Upcoming letter deadlines from bills
  const letterDeadlines = [];
  const seen = new Set();
  bills.forEach(b => {
    if (b.letterDeadline && b.stage === "Committee" && !seen.has(b.id)) {
      seen.add(b.id);
      const d = new Date(b.letterDeadline+"T12:00:00");
      const diff = Math.ceil((d-today)/(1000*60*60*24));
      if (diff >= -3 && diff <= 30) letterDeadlines.push({ bill:b, date:d, diff });
    }
  });
  letterDeadlines.sort((a,b)=>a.date-b.date);

  // Session deadlines coming up
  const upcomingSession = SESSION_DEADLINES.filter(d => {
    const dt = new Date(d.date+"T12:00:00");
    const diff = Math.ceil((dt-today)/(1000*60*60*24));
    return diff >= -3 && diff <= 90;
  }).map(d => {
    const dt = new Date(d.date+"T12:00:00");
    return { ...d, diff: Math.ceil((dt-today)/(1000*60*60*24)) };
  });

  if (letterDeadlines.length === 0 && upcomingSession.length === 0) return null;

  function urgencyColor(diff) {
    if (diff <= 3)  return "#8C2A2A";
    if (diff <= 7)  return "#7A4A00";
    if (diff <= 14) return "#1B4A7A";
    return C.muted;
  }
  function urgencyBg(diff) {
    if (diff <= 3)  return "#FBE8E8";
    if (diff <= 7)  return "#FFF4E0";
    if (diff <= 14) return "#E8EFF8";
    return C.sand;
  }
  function diffLabel(diff) {
    if (diff < 0)  return "Passed";
    if (diff === 0) return "TODAY";
    if (diff === 1) return "Tomorrow";
    return `${diff} days`;
  }

  return (
    <div style={{ background: standalone ? C.cream : "#1B2A4A", borderBottom: standalone ? "none" : `2px solid #B8963E22` }}>
      <div style={{ maxWidth:900, margin:"0 auto", padding: standalone ? "0" : "1rem 1.25rem" }}>

        {standalone && (
          <>
            <h2 style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"1.3rem", fontWeight:700, color:C.text, marginBottom:"0.3rem" }}>
              ⏰ Upcoming Action Deadlines
            </h2>
            <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:"0.9rem", color:C.muted, marginBottom:"1.5rem", lineHeight:1.6 }}>
              Letter deadlines for bills currently in committee, plus key California legislative calendar dates for the 2026 session.
            </p>
          </>
        )}

        {/* ── LETTER DEADLINES ── */}
        {letterDeadlines.length > 0 && (
          <div style={{ marginBottom: standalone ? "2rem" : "0" }}>
            {standalone && (
              <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.6rem", letterSpacing:"0.2em", textTransform:"uppercase", color:C.gold, marginBottom:"0.75rem" }}>
                ✉ Bill Letter Deadlines
              </div>
            )}
            {!standalone && (
              <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.58rem", letterSpacing:"0.22em", textTransform:"uppercase", color:C.gold, marginBottom:"0.7rem" }}>
                ⏰ Upcoming Action Deadlines
              </div>
            )}
            <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
              {letterDeadlines.map((item,i) => (
                <div key={item.bill.id+i} style={{
                  background: urgencyBg(item.diff), border:`1px solid`,
                  borderColor: item.diff<=3 ? "#E8A0A0" : item.diff<=7 ? "#E8C870" : "#A0B8D8",
                  borderRadius:3, padding:"0.6rem 0.8rem",
                  minWidth: standalone ? 220 : 180,
                  flex:`1 1 ${standalone ? 220 : 180}px`,
                  maxWidth: standalone ? 320 : 260,
                }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.25rem" }}>
                    <span style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.75rem", fontWeight:700, color: urgencyColor(item.diff) }}>
                      {item.bill.id}
                    </span>
                    <span style={{
                      fontFamily:"'Libre Baskerville',serif", fontSize:"0.62rem", fontWeight:700,
                      color:"#FFF", background: item.diff<=3 ? "#8C2A2A" : item.diff<=7 ? "#7A4A00" : "#1B4A7A",
                      padding:"1px 6px", borderRadius:2,
                    }}>{diffLabel(item.diff)}</span>
                  </div>
                  {standalone && (
                    <div style={{ fontSize:"0.8rem", fontFamily:"'Crimson Pro',serif", fontStyle:"italic", color:"#2A2A3E", marginBottom:"0.2rem" }}>
                      {item.bill.title}
                    </div>
                  )}
                  <div style={{ fontSize:"0.72rem", color:"#2A2A3E", fontFamily:"'Crimson Pro',serif", lineHeight:1.35, marginBottom:"0.15rem" }}>
                    ✉ Letter deadline: <strong>{item.date.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}</strong>
                  </div>
                  <div style={{ fontSize:"0.65rem", color:C.muted, fontFamily:"'Crimson Pro',serif" }}>
                    📅 Hearing: {item.bill.hearingDate ? new Date(item.bill.hearingDate+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"}) : "TBD"} · {item.bill.committee}
                  </div>
                  {standalone && (
                    <a href="https://calegislation.lc.ca.gov/Advocates/" target="_blank" rel="noopener noreferrer"
                      style={{ fontSize:"0.62rem", color:C.gold, fontFamily:"'Libre Baskerville',serif", letterSpacing:"0.06em", textTransform:"uppercase", textDecoration:"none", borderBottom:`1px solid ${C.gold}`, display:"inline-block", marginTop:"0.4rem" }}>
                      Submit Position ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SESSION CALENDAR DEADLINES ── */}
        {upcomingSession.length > 0 && (
          <div>
            {standalone && (
              <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.6rem", letterSpacing:"0.2em", textTransform:"uppercase", color:C.gold, marginBottom:"0.75rem", marginTop: letterDeadlines.length > 0 ? "0" : "0" }}>
                📅 2026 CA Legislative Calendar
              </div>
            )}
            <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
              {upcomingSession.map((d,i) => (
                <div key={d.label+i} style={{
                  background: standalone
                    ? (d.type==="critical" ? "#FBE8E8" : d.type==="warning" ? "#FFF4E0" : "#E8EFF8")
                    : (d.type==="critical" ? "#3A1A1A" : d.type==="warning" ? "#3A2A0A" : "#1A2A3A"),
                  border:`1px solid ${d.type==="critical" ? (standalone?"#E8A0A0":"#8C4A4A") : d.type==="warning" ? (standalone?"#E8C870":"#8C7A3A") : (standalone?"#A0B8D8":"#3A5A7A")}`,
                  borderRadius:3, padding:"0.6rem 0.8rem",
                  minWidth: standalone ? 220 : 180,
                  flex:`1 1 ${standalone ? 220 : 180}px`,
                  maxWidth: standalone ? 340 : 260,
                }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.2rem" }}>
                    <span style={{ fontFamily:"'Libre Baskerville',serif", fontSize: standalone ? "0.8rem" : "0.68rem", fontWeight:700, color: standalone
                      ? (d.type==="critical" ? "#8C2A2A" : d.type==="warning" ? "#7A4A00" : "#1B4A7A")
                      : (d.type==="critical" ? "#F4A0A0" : d.type==="warning" ? "#F4D080" : "#A0C0F0") }}>
                      {d.label}
                    </span>
                    <span style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.62rem", fontWeight:700, color:"#FAF7F2",
                      background: d.type==="critical"?"#8C2A2A":d.type==="warning"?"#7A5000":"#1B4A7A", padding:"1px 5px", borderRadius:2 }}>
                      {diffLabel(d.diff)}
                    </span>
                  </div>
                  <div style={{ fontSize:"0.68rem", color: standalone ? C.muted : "rgba(250,247,242,0.65)", fontFamily:"'Crimson Pro',serif", lineHeight:1.4 }}>
                    {d.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {letterDeadlines.length === 0 && upcomingSession.length === 0 && standalone && (
          <div style={{ textAlign:"center", padding:"3rem 1rem", color:C.muted, fontStyle:"italic" }}>
            No upcoming deadlines in the next 90 days.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── EDUCATION TAB ───────────────────────────────────────────────────────
function EducationTab() {
  const [open, setOpen] = useState(null);
  const toggle = (id) => setOpen(o => o === id ? null : id);

  const sectionStyle = (color) => ({
    border: `1px solid ${color}33`,
    borderLeft: `5px solid ${color}`,
    borderRadius: 4,
    marginBottom: "1.5rem",
    background: "#fff",
    boxShadow: "0 1px 4px rgba(27,42,74,0.06)",
    overflow: "hidden",
  });
  const headStyle = (color, isOpen) => ({
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "1rem 1.25rem", cursor: "pointer",
    background: isOpen ? `${color}0D` : "#fff",
    transition: "background 0.15s",
  });
  const bodyStyle = { padding: "0 1.25rem 1.25rem" };
  const h3 = { fontFamily:"'Libre Baskerville',serif", fontSize:"1rem", fontWeight:700, color:C.text };
  const sectionLabel = (color) => ({ fontFamily:"'Libre Baskerville',serif", fontSize:"0.58rem", letterSpacing:"0.16em", textTransform:"uppercase", color, marginBottom:"0.6rem", display:"block" });
  const p = { fontFamily:"'Crimson Pro',serif", fontSize:"0.92rem", color:"#3A3A4E", lineHeight:1.75, marginBottom:"0.9rem" };
  const stepBox = (color) => ({
    display:"flex", gap:"0.75rem", alignItems:"flex-start",
    background:`${color}0A`, border:`1px solid ${color}25`,
    borderRadius:3, padding:"0.7rem 0.9rem", marginBottom:"0.5rem",
  });
  const stepNum = (color) => ({
    width:26, height:26, borderRadius:"50%", background:color,
    color:"#fff", fontFamily:"'Libre Baskerville',serif", fontSize:"0.72rem",
    fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
  });
  const tag = (bg, text) => ({
    display:"inline-block", background:bg, color:text,
    fontFamily:"'Libre Baskerville',serif", fontSize:"0.58rem",
    letterSpacing:"0.1em", textTransform:"uppercase",
    padding:"2px 7px", borderRadius:2, marginRight:"0.4rem", marginBottom:"0.3rem",
  });
  const tip = {
    background:"#FAF7F2", border:`1px solid ${C.gold}55`,
    borderLeft:`4px solid ${C.gold}`, borderRadius:3,
    padding:"0.65rem 0.9rem", marginTop:"0.75rem", marginBottom:"0.5rem",
    fontFamily:"'Crimson Pro',serif", fontSize:"0.85rem", color:"#3A3A4E", lineHeight:1.65,
  };

  return (
    <div>
      <h2 style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"1.4rem", fontWeight:700, color:C.text, marginBottom:"0.35rem" }}>
        📖 How Legislative Advocacy Works
      </h2>
      <p style={{ ...p, color:C.muted, marginBottom:"1.75rem" }}>
        A plain-English guide to how bills become law in California and San Francisco — what each stage means, who the key players are, and how the public can engage. Click any section to expand it.
      </p>

      {/* ── CALIFORNIA STATE LEGISLATURE ── */}
      <div style={sectionStyle(C.p1)}>
        <div style={headStyle(C.p1, open==="ca")} onClick={()=>toggle("ca")}>
          <div>
            <span style={sectionLabel(C.p1)}>California State Legislature</span>
            <span style={h3}>How a Bill Becomes Law in California</span>
          </div>
          <span style={{ fontSize:"1.2rem", color:C.p1 }}>{open==="ca" ? "▲" : "▼"}</span>
        </div>
        {open === "ca" && (
          <div style={bodyStyle}>
            <p style={p}>
              California's legislature has two chambers: the <strong>Assembly</strong> (80 members, 2-year terms) and the <strong>Senate</strong> (40 members, 4-year terms). A bill can start in either chamber. Here's what happens at each stage.
            </p>
            {[
              ["1", "Introduction", "Any Assembly Member or Senator can introduce a bill. It's assigned a number — AB for Assembly Bills, SB for Senate Bills — and referred to a relevant policy committee. At this stage the bill is just a proposal; it hasn't been debated or voted on yet."],
              ["2", "Policy Committee Hearing", "The bill is scheduled for a hearing before the relevant committee (e.g. Senate Judiciary, Assembly Elections, Assembly Health). Committee members question the author and hear testimony from supporters and opponents. The committee then votes on whether to send it forward. Most bills that die in the legislature die here."],
              ["3", "Fiscal Committee", "If a bill has a cost to the state, it goes to the Appropriations Committee after the policy committee. This committee weighs whether the fiscal impact is acceptable. Bills can be held here even if the policy committee approved them."],
              ["4", "Floor Vote — First Chamber", "The full Assembly or Senate debates and votes on the bill. Most bills need a simple majority (41 of 80 in the Assembly, 21 of 40 in the Senate). Some bills — urgency clauses, tax measures — require a two-thirds supermajority."],
              ["5", "Second Chamber", "The bill crosses over to the other chamber and goes through the same process again: policy committee → fiscal committee (if needed) → full floor vote. If the second chamber amends the bill, it returns to the first chamber to approve or reject the changes."],
              ["6", "Governor's Desk", "Once both chambers pass identical versions of the bill, it goes to the Governor. The Governor has 30 days to sign it (it becomes law), veto it (it dies, unless the legislature overrides), or do nothing (it passes without signature). The signing deadline is typically October 12."],
              ["7", "Enacted / In Effect", "A signed bill is \"chaptered\" into California law. Most bills take effect January 1 of the following year. Bills with an urgency clause — requiring a two-thirds vote — take effect immediately upon signing."],
            ].map(([num, title, what]) => (
              <div key={num} style={stepBox(C.p1)}>
                <div style={stepNum(C.p1)}>{num}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.82rem", fontWeight:700, color:C.p1, marginBottom:"0.2rem" }}>{title}</div>
                  <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:"0.86rem", color:"#3A3A4E", lineHeight:1.65 }}>{what}</div>
                </div>
              </div>
            ))}
            <div style={tip}>
              <strong>Two-Year Bills:</strong> California has a two-year legislative session. Bills that don't pass in their first year can be held over and revived in the second year. They appear as "Two-Year Bill" in this tracker — they are not dead, just paused.
            </div>
            <div style={tip}>
              <strong>Key 2026 deadlines:</strong> Policy committee deadline July 2 · Fiscal committee deadline August 14 · Final passage August 31 · Governor signing deadline October 12.
            </div>
          </div>
        )}
      </div>

      {/* ── SF BOARD OF SUPERVISORS ── */}
      <div style={sectionStyle(C.p3)}>
        <div style={headStyle(C.p3, open==="sf")} onClick={()=>toggle("sf")}>
          <div>
            <span style={sectionLabel(C.p3)}>San Francisco Board of Supervisors</span>
            <span style={h3}>How an Ordinance Becomes Law in San Francisco</span>
          </div>
          <span style={{ fontSize:"1.2rem", color:C.p3 }}>{open==="sf" ? "▲" : "▼"}</span>
        </div>
        {open === "sf" && (
          <div style={bodyStyle}>
            <p style={p}>
              The San Francisco Board of Supervisors is SF's local legislative body — 11 members, each representing one of SF's 11 geographic districts, elected to 4-year terms. Unlike the state legislature, the Board introduces legislation year-round with no session cutoff.
            </p>
            {[
              ["1", "Introduction", "Any Supervisor can introduce an ordinance, resolution, or motion at any time of year. It's assigned a file number, read into the record at a Board meeting, and referred to the relevant committee. Legislation can also be introduced by the Mayor or through a ballot initiative."],
              ["2", "Committee Hearing", "The ordinance goes to the relevant committee — Labor & Employment, Public Safety & Neighborhood Services, Land Use & Transportation, Budget & Finance, etc. The committee holds a public hearing where any member of the public can testify for two minutes. The committee then votes on whether to send it to the full Board."],
              ["3", "Full Board — First Reading", "If the committee approves the ordinance, it goes to the full 11-member Board of Supervisors for a vote. This is the first of two required votes. Public comment is open at all full Board meetings, held on Tuesdays at 2pm at City Hall, Room 250."],
              ["4", "Full Board — Second Reading", "One week later, the Board votes a second time. Both votes must pass. Any Supervisor can request a 30-day continuance to delay the second vote. Ordinances need 6 of 11 votes to pass; some measures require 8 of 11."],
              ["5", "Mayor's Signature or Veto", "The Mayor has 10 days to sign the ordinance, veto it, or let it pass without signature. The Board can override a veto with 8 of 11 votes — a high bar that is rarely reached."],
              ["6", "In Effect", "Most SF ordinances take effect 30 days after the Mayor's signature. Emergency ordinances approved by two-thirds of the Board can take effect immediately."],
            ].map(([num, title, what]) => (
              <div key={num} style={stepBox(C.p3)}>
                <div style={stepNum(C.p3)}>{num}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.82rem", fontWeight:700, color:C.p3, marginBottom:"0.2rem" }}>{title}</div>
                  <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:"0.86rem", color:"#3A3A4E", lineHeight:1.65 }}>{what}</div>
                </div>
              </div>
            ))}
            <div style={tip}>
              <strong>SF vs State law:</strong> SF can pass ordinances that go <em>further</em> than state law — stronger tenant protections, higher minimum wages, expanded parental leave — but cannot contradict state law. State law sets the floor; SF can raise it.
            </div>
            <div style={tip}>
              <strong>Key contacts:</strong> Find your District Supervisor at <a href="https://sfbos.org/supervisors" target="_blank" rel="noopener noreferrer" style={{color:C.gold}}>sfbos.org/supervisors ↗</a>. Board meetings are Tuesdays at 2pm, streamed live at sfgovtv.org. Committee schedules are posted weekly at sfbos.org.
            </div>
          </div>
        )}
      </div>

      {/* ── ASSEMBLY VS SENATE ── */}
      <div style={sectionStyle(C.p2)}>
        <div style={headStyle(C.p2, open==="chambers")} onClick={()=>toggle("chambers")}>
          <div>
            <span style={sectionLabel(C.p2)}>CA Assembly vs CA Senate</span>
            <span style={h3}>What's the Difference Between Assembly and Senate Bills?</span>
          </div>
          <span style={{ fontSize:"1.2rem", color:C.p2 }}>{open==="chambers" ? "▲" : "▼"}</span>
        </div>
        {open === "chambers" && (
          <div style={bodyStyle}>
            <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap", marginBottom:"1rem" }}>
              {[
                [C.p2, "CA Assembly", "AB (Assembly Bill)", "80 members", "2-year terms", "The lower house. Assembly Members represent smaller districts (~500,000 people each), which generally makes them more responsive to constituent contact. The Assembly is often where major progressive legislation originates."],
                ["#1B5A7A", "CA Senate", "SB (Senate Bill)", "40 members", "4-year terms", "The upper house. Senators represent larger districts (~1,000,000 people each) and tend to be more deliberative. Senate policy committees are often where bills face their most rigorous scrutiny before reaching the full chamber."],
              ].map(([color, title, prefix, members, terms, desc]) => (
                <div key={title} style={{ flex:"1 1 280px", background:`${color}08`, border:`1px solid ${color}30`, borderRadius:3, padding:"0.9rem 1rem" }}>
                  <div style={{ fontFamily:"'Libre Baskerville',serif", fontWeight:700, fontSize:"0.9rem", color, marginBottom:"0.5rem" }}>{title}</div>
                  <div style={{ marginBottom:"0.5rem" }}>
                    <span style={tag(`${color}20`, color)}>{prefix}</span>
                    <span style={tag(`${color}15`, color)}>{members}</span>
                    <span style={tag(`${color}15`, color)}>{terms}</span>
                  </div>
                  <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:"0.85rem", color:"#3A3A4E", lineHeight:1.65 }}>{desc}</div>
                </div>
              ))}
            </div>
            <div style={tip}>
              <strong>Finding your representatives:</strong> Every Californian has one Assembly Member and one Senator based on where they live. You can look yours up at <a href="https://findyourrep.legislature.ca.gov/" target="_blank" rel="noopener noreferrer" style={{color:C.gold}}>findyourrep.legislature.ca.gov ↗</a>. San Francisco is represented by Assembly Districts 17 and 19, and Senate Districts 11 and 13.
            </div>
          </div>
        )}
      </div>

      {/* ── HOW TO ENGAGE ── */}
      <div style={sectionStyle(C.p4)}>
        <div style={headStyle(C.p4, open==="engage")} onClick={()=>toggle("engage")}>
          <div>
            <span style={sectionLabel(C.p4)}>Public Participation</span>
            <span style={h3}>How Can the Public Engage With the Legislative Process?</span>
          </div>
          <span style={{ fontSize:"1.2rem", color:C.p4 }}>{open==="engage" ? "▲" : "▼"}</span>
        </div>
        {open === "engage" && (
          <div style={bodyStyle}>
            <p style={p}>The legislative process has several formal points where public input is explicitly invited — and legislators and their staff do read and track it.</p>
            {[
              ["Submit a Position Letter", "For CA state bills, you can formally submit a support or oppose position through the official CA Legislature advocate portal at calegislation.lc.ca.gov/Advocates. Your position is logged in the official record and visible to committee members. For SF BOS bills, written public comment can be submitted at sfbos.org/public-comment before any hearing."],
              ["Testify at a Committee Hearing", "Both CA legislative committees and SF BOS committees hold public hearings where anyone can testify — typically 2 minutes per speaker. For CA state bills, hearings are in Sacramento and can sometimes be attended remotely. SF BOS committee hearings are at City Hall and are often attended in person. Check sfbos.org or the CA Legislature website for upcoming hearing schedules."],
              ["Contact Your Representative Directly", "Calling or emailing your Assembly Member, Senator, or District Supervisor's office is one of the most direct forms of advocacy. Staff track constituent contacts and report them to the legislator. Be specific: name the bill, your position, and why it matters to you or your community."],
              ["Write to the Governor", "Once a bill reaches the Governor's desk, constituent letters matter. The Governor's office tracks volume and sentiment on bills. You can write via governor.ca.gov."],
              ["Attend a Full Board or Floor Session", "SF Board of Supervisors full board meetings are open to the public every Tuesday at 2pm at City Hall, Room 250. CA Assembly and Senate floor sessions are open to the public in Sacramento and streamed live at assembly.ca.gov and senate.ca.gov."],
            ].map(([title, desc], i) => (
              <div key={i} style={{ display:"flex", gap:"0.75rem", marginBottom:"0.75rem" }}>
                <div style={{ ...stepNum(C.p4), marginTop:2, fontSize:"0.68rem" }}>{i+1}</div>
                <div>
                  <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.82rem", fontWeight:700, color:C.p4, marginBottom:"0.2rem" }}>{title}</div>
                  <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:"0.85rem", color:"#3A3A4E", lineHeight:1.65 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── READING THE TRACKER ── */}
      <div style={sectionStyle(C.p5)}>
        <div style={headStyle(C.p5, open==="stages")} onClick={()=>toggle("stages")}>
          <div>
            <span style={sectionLabel(C.p5)}>Reading the Tracker</span>
            <span style={h3}>What Do the Stages and Labels in This Tracker Mean?</span>
          </div>
          <span style={{ fontSize:"1.2rem", color:C.p5 }}>{open==="stages" ? "▲" : "▼"}</span>
        </div>
        {open === "stages" && (
          <div style={bodyStyle}>
            <p style={{ ...p, marginBottom:"1rem" }}>Each bill card shows a pipeline of stages. Here's what each one means:</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem", marginBottom:"1.25rem" }}>
              {[
                ["Introduced",     "#A0B0C8", "Bill has been introduced and referred to committee. No hearing scheduled yet."],
                ["Committee",      C.navy,    "Bill has a scheduled committee hearing — the most important public engagement window."],
                ["Floor",          "#2A6A9A", "Bill has passed committee and is awaiting a vote by the full first chamber."],
                ["Second Chamber", "#4A9A6A", "Bill passed the first chamber and is now going through committees in the second chamber."],
                ["Governor",       "#7A5A00", "Bill passed both chambers and is on the Governor's desk awaiting signature or veto."],
                ["Enacted",        "#2A7A50", "Signed into law."],
                ["Two-Year Bill",  C.gold,    "Did not pass in year one. Held over to be revived in year two of the session — not dead."],
                ["Failed/Vetoed",  "#C04040", "Did not pass, or was vetoed by the Governor."],
              ].map(([stage, color, desc]) => (
                <div key={stage} style={{ display:"flex", gap:"0.75rem", alignItems:"flex-start" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", minWidth:150, flexShrink:0 }}>
                    <div style={{ width:10, height:10, borderRadius:"50%", background:color, flexShrink:0 }}/>
                    <span style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.75rem", fontWeight:700, color }}>{stage}</span>
                  </div>
                  <span style={{ fontFamily:"'Crimson Pro',serif", fontSize:"0.85rem", color:"#3A3A4E", lineHeight:1.55 }}>{desc}</span>
                </div>
              ))}
            </div>
            <p style={{ ...p, marginBottom:"0.75rem" }}>Position labels:</p>
            <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
              <div style={{ background:"#E8F5EE", border:"1px solid #2A7A50", borderRadius:3, padding:"0.5rem 0.8rem" }}>
                <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.72rem", fontWeight:700, color:"#2A7A50" }}>✓ Recommended Action: Support</div>
                <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:"0.8rem", color:"#1E3A2A", marginTop:"0.15rem" }}>This tracker recommends actively advocating for this bill to pass.</div>
              </div>
              <div style={{ background:"#FBE8E8", border:"1px solid #8C2A2A", borderRadius:3, padding:"0.5rem 0.8rem" }}>
                <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.72rem", fontWeight:700, color:"#8C2A2A" }}>⛔ Recommended Action: Oppose</div>
                <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:"0.8rem", color:"#3A1A1A", marginTop:"0.15rem" }}>This tracker recommends opposing this bill or pushing for amendments.</div>
              </div>
              <div style={{ background:C.sand, border:`1px solid ${C.border}`, borderRadius:3, padding:"0.5rem 0.8rem" }}>
                <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.72rem", fontWeight:700, color:C.muted }}>Monitor</div>
                <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:"0.8rem", color:C.muted, marginTop:"0.15rem" }}>Worth watching — no formal position taken yet.</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── GLOSSARY ── */}
      <div style={sectionStyle(C.p6)}>
        <div style={headStyle(C.p6, open==="glossary")} onClick={()=>toggle("glossary")}>
          <div>
            <span style={sectionLabel(C.p6)}>Quick Reference</span>
            <span style={h3}>Glossary of Common Terms</span>
          </div>
          <span style={{ fontSize:"1.2rem", color:C.p6 }}>{open==="glossary" ? "▲" : "▼"}</span>
        </div>
        {open === "glossary" && (
          <div style={bodyStyle}>
            <div style={{ columns:"2", columnGap:"1.5rem" }}>
              {[
                ["AB / SB",              "Assembly Bill / Senate Bill. The prefix tells you which chamber introduced it."],
                ["Appropriations",       "The committee that reviews a bill's fiscal impact. Bills can stall or die here even after passing a policy committee."],
                ["Author",               "The legislator who introduced the bill. Their office is your most direct contact for influencing the bill's content."],
                ["Chaptered",            "A bill that has been signed and formally enrolled into California law. Same as Enacted."],
                ["Coauthor",             "Additional legislators who formally sign on to support a bill. More coauthors generally signals broader support."],
                ["Committee Consultant", "Legislative staff who analyze bills and brief committee members. They are knowledgeable, accessible, and influential for complex bills."],
                ["Do Pass",              "A committee vote recommending the full chamber pass the bill. The opposite is 'Failed Passage.'"],
                ["Enrolled",             "A bill that has passed both chambers in identical form and been sent to the Governor."],
                ["Held Under Submission","A bill paused in Appropriations — not dead, but the committee is watching its cost before deciding."],
                ["Inactive File",        "A bill that has been set aside, typically in the Appropriations Committee. Can be revived but is likely stalled."],
                ["Ordinance",            "Local legislation passed by a city or county governing body such as the SF Board of Supervisors. Applies only within that jurisdiction."],
                ["Resolution",           "A formal statement of position or policy — not binding law. Both the SF BOS and the state legislature pass resolutions."],
                ["Two-Year Bill",        "A CA state bill not passed in Year 1 of the two-year session, held over to Year 2."],
                ["Urgency Clause",       "Makes a bill take effect immediately upon signing. Requires a two-thirds vote in both chambers."],
                ["Veto Override",        "The legislature can override a Governor's veto with a two-thirds vote in both chambers. Rare in practice."],
                ["OLSE",                 "SF Office of Labor Standards Enforcement — the agency that enforces SF labor ordinances including minimum wage and parental leave."],
              ].map(([term, def]) => (
                <div key={term} style={{ breakInside:"avoid", marginBottom:"0.75rem" }}>
                  <span style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.8rem", fontWeight:700, color:C.p6 }}>{term}</span>
                  <span style={{ fontFamily:"'Crimson Pro',serif", fontSize:"0.82rem", color:"#3A3A4E", lineHeight:1.55 }}> — {def}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop:"1rem", padding:"0.85rem 1rem", background:C.sand, borderLeft:`3px solid ${C.gold}`, fontSize:"0.75rem", color:C.muted, lineHeight:1.7 }}>
        For live bill status and full text: <a href="https://leginfo.legislature.ca.gov" target="_blank" rel="noopener noreferrer" style={{color:C.gold}}>leginfo.legislature.ca.gov</a> · <a href="https://sfbos.org" target="_blank" rel="noopener noreferrer" style={{color:C.gold}}>sfbos.org</a> · <a href="https://findyourrep.legislature.ca.gov" target="_blank" rel="noopener noreferrer" style={{color:C.gold}}>findyourrep.legislature.ca.gov</a>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────
export default function SFWPCTracker() {
  const [activeTab,      setActiveTab]      = useState("education");
  const [activePriority, setActivePriority] = useState("all");
  const [activeBody,     setActiveBody]     = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");
  const [search,         setSearch]         = useState("");

  // Persistent scanned bills from auto-scan
  const { scannedBills, addBills, removeBill, clearAll } = useScannedBills();

  // Merge hardcoded + scanned bills, deduplicating by id
  const allBills = useMemo(() => {
    const hardcodedIds = new Set(BILLS.map(b => b.id.toLowerCase().replace(/\s+/g,"")));
    const newOnly = scannedBills.filter(b => b.id && !hardcodedIds.has(b.id.toLowerCase().replace(/\s+/g,"")));
    // Give scanned bills defaults for fields BillCard needs
    const normalized = newOnly.map(b => ({
      sfwpcActions: ["Review this newly scanned bill and determine SFWPC's position"],
      position: b.position || "MONITOR",
      ...b,
    }));
    return [...BILLS, ...normalized];
  }, [scannedBills]);

  const filtered = useMemo(()=> {
    const seen = new Set();
    return allBills.filter(b => {
      const key = (b.id||"")+(b.priority||"");
      if (seen.has(key)) return false;
      seen.add(key);
      // Adjacent tab shows only p6 bills; priorities tab shows p1-p5
      if (activeTab === "adjacent") {
        if (b.priority !== "p6") return false;
      } else if (activeTab === "enacted") {
        if (b.stage !== "Enacted") return false;
        if (b.priority === "p6") return false; // adjacent enacted shown in adjacent tab
      } else if (activeTab === "priorities") {
        if (b.stage === "Enacted") return false;
        if (b.priority === "p6") return false;
      }
      if (activePriority !== "all" && b.priority !== activePriority) return false;
      if (activeBody     !== "all" && b.body     !== activeBody)     return false;
      if (positionFilter !== "all" && b.position !== positionFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (![b.id, b.title, b.sponsor||"", b.blurb||""].some(s=>(s||"").toLowerCase().includes(q))) return false;
      }
      return true;
    });
  }, [activeTab, activePriority, activeBody, positionFilter, search, allBills]);

  const stats = useMemo(()=>({
    total:   [...new Map(allBills.map(b=>[(b.id||"")+(b.priority||""),b])).values()].length,
    enacted: [...new Set(allBills.filter(b=>b.stage==="Enacted").map(b=>b.id))].length,
    active:  [...new Set(allBills.filter(b=>b.position==="SUPPORT" && !["Enacted","Vetoed","Failed"].includes(b.stage)).map(b=>b.id))].length,
    oppose:  [...new Set(allBills.filter(b=>b.position==="OPPOSE").map(b=>b.id))].length,
  }),[allBills]);

  const currentPriority = PRIORITIES.find(p=>p.id===activePriority);

  return (
    <div style={{ minHeight:"100vh", background:C.cream, fontFamily:"'Crimson Pro','Georgia',serif", color:C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,400&family=Libre+Baskerville:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.7}}
        ::-webkit-scrollbar{height:3px;width:3px}
        ::-webkit-scrollbar-thumb{background:${C.gold};border-radius:2px}
        button:focus-visible{outline:2px solid ${C.gold};outline-offset:1px}
        input:focus{outline:2px solid ${C.navy};outline-offset:1px}
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ background:C.navy, color:C.cream, position:"relative", overflow:"hidden" }}>

        {/* Decorative background rings */}
        <div style={{ position:"absolute", top:-80, right:-80, width:260, height:260, border:"2px solid rgba(232,112,90,0.08)", borderRadius:"50%", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, border:"2px solid rgba(245,185,66,0.06)", borderRadius:"50%", pointerEvents:"none" }}/>

        {/* Organisation name bar */}
        <div style={{ borderBottom:"1px solid rgba(232,112,90,0.25)", padding:"0.7rem 1.25rem 0.65rem" }}>
          <div style={{ maxWidth:900, margin:"0 auto", display:"flex", alignItems:"center", gap:"0.6rem" }}>
            {/* Coral dot — echoes logo dot */}
            <div style={{ width:8, height:8, borderRadius:"50%", background:"#E8705A", flexShrink:0 }}/>
            <span style={{
              fontFamily:"'Libre Baskerville',serif",
              fontSize:"0.62rem", fontWeight:700,
              letterSpacing:"0.22em", textTransform:"uppercase",
              color:"#E8705A",
            }}>San Francisco Women's Political Committee</span>
            <div style={{ flex:1, height:"1px", background:"rgba(232,112,90,0.2)" }}/>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"#E8705A", flexShrink:0 }}/>
          </div>
        </div>

        {/* Title + stats */}
        <div style={{ padding:"1.1rem 1.25rem 1.15rem" }}>
          <div style={{ maxWidth:900, margin:"0 auto" }}>
            <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:"1rem", flexWrap:"wrap" }}>
              <div>
                {/* Golden bar accent */}
                <div style={{ width:32, height:3, background:"#F5B942", borderRadius:2, marginBottom:"0.5rem" }}/>
                <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"clamp(1.2rem,3.5vw,1.85rem)", fontWeight:700, lineHeight:1.1, marginBottom:"0.3rem", color:C.cream }}>
                  2025–2026 Legislative Tracker
                </div>
                <div style={{ fontSize:"0.78rem", color:"rgba(250,247,242,0.45)", fontStyle:"italic", fontFamily:"'Crimson Pro',serif" }}>
                  CA Senate · CA Assembly · SF Board of Supervisors
                </div>
              </div>

              {/* Stats */}
              <div style={{ display:"flex", gap:"1.1rem", flexWrap:"wrap", alignSelf:"flex-end" }}>
                {[
                  [stats.total,   "Bills Tracked",        C.cream],
                  [stats.enacted, "Enacted",              "#7DD8A8"],
                  [stats.active,  "Support",              "#F5B942"],
                  [stats.oppose,  "Oppose",               "#F4A0A0"],
                ].map(([n,l,col])=>(
                  <div key={l} style={{ textAlign:"center" }}>
                    <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"1.25rem", fontWeight:700, color:col, lineHeight:1 }}>{n}</div>
                    <div style={{ fontSize:"0.5rem", letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(250,247,242,0.35)", marginTop:2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN TABS ── */}
      <div style={{ background:C.navy, borderBottom:`2px solid ${C.gold}` }}>
        <div style={{ maxWidth:900, margin:"0 auto", padding:"0 1.25rem", display:"flex", overflowX:"auto", scrollbarWidth:"none" }}>
          {[
            ["education",   "📖 How It Works",          "Understand the legislative process"],
            ["priorities",  "2026 Policy Priorities",   "Active bills by SFWPC priority"],
            ["adjacent",    "Adjacent Issues",           "Bills intersecting SFWPC's mission"],
            ["enacted",     "✓ Enacted",                 `${stats.enacted} signed into law`],
            ["deadlines",   "⏰ Deadlines",               "Action dates & session calendar"],
            ["scan",        "🔍 Scan New Bills",         "Auto-update from SF BOS & CA Legislature"],
          ].map(([val, label, sub])=>(
            <button key={val} onClick={()=>{ setActiveTab(val); setActivePriority("all"); setPositionFilter("all"); setSearch(""); }} style={{
              padding:"0.75rem 1rem 0.6rem",
              background:"none", border:"none",
              fontFamily:"'Libre Baskerville',serif", fontSize:"0.72rem", letterSpacing:"0.04em",
              color: activeTab===val ? C.gold : "rgba(250,247,242,0.45)",
              borderBottom: activeTab===val ? `3px solid ${C.gold}` : "3px solid transparent",
              fontWeight: activeTab===val ? 700 : 400,
              cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.15s",
              display:"flex", flexDirection:"column", gap:2, alignItems:"flex-start",
            }}>
              <span>{label}</span>
              <span style={{ fontSize:"0.52rem", letterSpacing:"0.07em", textTransform:"uppercase", color: activeTab===val ? "rgba(184,150,62,0.65)" : "rgba(250,247,242,0.25)", fontWeight:400 }}>{sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          TAB: DEADLINES
      ══════════════════════════════════════════ */}
      {activeTab === "deadlines" && (
        <div style={{ maxWidth:900, margin:"0 auto", padding:"1.5rem 1.25rem 3rem" }}>
          <DeadlineDashboard bills={allBills} standalone />
        </div>
      )}

      {/* ══════════════════════════════════════════
          TAB: SCAN NEW BILLS
      ══════════════════════════════════════════ */}
      {activeTab === "scan" && (
        <div style={{ maxWidth:900, margin:"0 auto", padding:"1.5rem 1.25rem 3rem" }}>
          <NewBillScanner
            scannedBills={scannedBills}
            onAddBills={addBills}
            onRemoveBill={removeBill}
            onClearAll={clearAll}
            standalone
          />
        </div>
      )}

      {/* ══════════════════════════════════════════
          TAB: EDUCATION — HOW IT WORKS
      ══════════════════════════════════════════ */}
      {activeTab === "education" && (
        <div style={{ maxWidth:900, margin:"0 auto", padding:"1.5rem 1.25rem 4rem" }}>
          <EducationTab />
        </div>
      )}

      {/* ══════════════════════════════════════════
          TABS: 2026 POLICY PRIORITIES + ADJACENT ISSUES + ENACTED
          (shared priority nav + filters + bill list)
      ══════════════════════════════════════════ */}
      {(activeTab === "priorities" || activeTab === "adjacent" || activeTab === "enacted") && (
        <>
          {/* ── PRIORITY SUB-TABS — only on 2026 Policy Priorities tab ── */}
          {activeTab === "priorities" && (
            <div style={{ background:C.sand, borderBottom:`1px solid ${C.border}` }}>
              <div style={{ maxWidth:900, margin:"0 auto", padding:"0 1.25rem" }}>
                <div style={{ display:"flex", overflowX:"auto", scrollbarWidth:"none", gap:0 }}>
                  <button onClick={()=>setActivePriority("all")} style={{
                    padding:"0.8rem 0.9rem", background:"none", border:"none",
                    fontFamily:"'Libre Baskerville',serif", fontSize:"0.68rem", letterSpacing:"0.04em",
                    color: activePriority==="all" ? C.text : C.muted,
                    borderBottom: activePriority==="all" ? `3px solid ${C.gold}` : "3px solid transparent",
                    fontWeight: activePriority==="all" ? 700 : 400,
                    cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.15s",
                  }}>All Priorities</button>
                  {PRIORITIES.filter(p => p.id !== "p6").map(p=>(
                    <button key={p.id} onClick={()=>setActivePriority(p.id)} style={{
                      padding:"0.8rem 0.9rem", background:"none", border:"none",
                      fontFamily:"'Libre Baskerville',serif", fontSize:"0.68rem", letterSpacing:"0.04em",
                      color: activePriority===p.id ? C.text : C.muted,
                      borderBottom: activePriority===p.id ? `3px solid ${p.color}` : "3px solid transparent",
                      fontWeight: activePriority===p.id ? 700 : 400,
                      cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.15s",
                    }}>{p.icon} {p.short}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div style={{ maxWidth:900, margin:"0 auto", padding:"0.9rem 1.25rem 0" }}>

            {/* Priority description */}
            {currentPriority && (
              <div style={{
                background:`${currentPriority.color}10`, border:`1px solid ${currentPriority.color}33`,
                borderLeft:`4px solid ${currentPriority.color}`, borderRadius:3,
                padding:"0.7rem 0.9rem", marginBottom:"0.85rem",
              }}>
                <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.62rem", letterSpacing:"0.12em", textTransform:"uppercase", color:currentPriority.color, marginBottom:"0.25rem" }}>
                  {currentPriority.label}
                </div>
                <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:"0.85rem", color:"#3A3A4E", lineHeight:1.6 }}>{currentPriority.desc}</p>
              </div>
            )}

            {/* Body filters */}
            <div style={{ display:"flex", gap:"0.45rem", flexWrap:"wrap", alignItems:"center", marginBottom:"0.5rem" }}>
              {BODIES.map(b=>(
                <button key={b.id} onClick={()=>setActiveBody(b.id)} style={{
                  padding:"0.3rem 0.75rem",
                  background: activeBody===b.id ? C.navy : "none",
                  border:`1.5px solid ${activeBody===b.id ? C.navy : C.border}`,
                  borderRadius:2, fontFamily:"'Crimson Pro',serif", fontSize:"0.78rem",
                  color: activeBody===b.id ? C.cream : C.muted,
                  cursor:"pointer", transition:"all 0.15s",
                }}>{b.label}</button>
              ))}
            </div>

            {/* Position filter — not on enacted tab */}
            {activeTab !== "enacted" && (
              <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap", marginBottom:"0.65rem" }}>
                {[
                  ["all",     "All Positions",                    C.navy,   C.cream],
                  ["SUPPORT", "✓ Recommended Action: Support",   "#1B5A3A", C.cream],
                  ["OPPOSE",  "⛔ Recommended Action: Oppose",   "#8C2A2A", C.cream],
                ].map(([val, label, activeBg, activeText])=>(
                  <button key={val} onClick={()=>setPositionFilter(val)} style={{
                    padding:"0.3rem 0.85rem",
                    background: positionFilter===val ? activeBg : "none",
                    border:`1.5px solid ${positionFilter===val ? activeBg : C.border}`,
                    borderRadius:2, fontFamily:"'Libre Baskerville',serif", fontSize:"0.68rem",
                    letterSpacing:"0.04em",
                    color: positionFilter===val ? activeText : C.muted,
                    cursor:"pointer", transition:"all 0.15s", fontWeight: positionFilter===val ? 700 : 400,
                  }}>{label}</button>
                ))}
              </div>
            )}

            {/* Search */}
            <input
              type="text" placeholder="Search bills, sponsors, keywords…"
              value={search} onChange={e=>setSearch(e.target.value)}
              style={{
                width:"100%", padding:"0.5rem 0.85rem",
                border:`1.5px solid ${C.border}`, borderRadius:2,
                fontFamily:"'Crimson Pro',serif", fontSize:"0.86rem",
                background:C.cream, color:C.text, marginBottom:"0.75rem",
              }}
            />

            {/* Legend */}
            <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap", marginBottom:"0.9rem" }}>
              {[
                ["#2A7A50","Enacted"],["#4A9A6A","Completed Stage"],[C.navy,"Current Stage"],
                [C.border,"Upcoming"],[C.gold,"Two-Year Bill"],["#C04040","Failed/Vetoed"],
              ].map(([col,label])=>(
                <div key={label} style={{ display:"flex", alignItems:"center", gap:4, fontSize:"0.59rem", fontFamily:"'Libre Baskerville',serif", color:C.muted, letterSpacing:"0.04em" }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:col, flexShrink:0 }}/>
                  {label}
                </div>
              ))}
            </div>

            {/* Adjacent Issues banner */}
            {activeTab === "adjacent" && (
              <div style={{
                background:"#EEF4F0", border:"1px solid #A8C8B8",
                borderLeft:`4px solid ${C.p6}`, borderRadius:3,
                padding:"0.7rem 0.9rem", marginBottom:"0.85rem",
              }}>
                <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.62rem", letterSpacing:"0.12em", textTransform:"uppercase", color:C.p6, marginBottom:"0.2rem" }}>
                  📋 Adjacent Issues
                </div>
                <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:"0.85rem", color:"#2A3A2E", lineHeight:1.6 }}>
                  Bills that sit adjacent to SFWPC's core policy priorities. These bills intersect with the issues SFWPC works on, even where SFWPC is not the primary advocacy organization. They may warrant monitoring, letters of support, or public comment.
                </p>
              </div>
            )}

            {/* Enacted banner */}
            {activeTab === "enacted" && (
              <div style={{
                background:"#E8F5EE", border:"1px solid #A8D8BB",
                borderLeft:`4px solid #2A7A50`, borderRadius:3,
                padding:"0.7rem 0.9rem", marginBottom:"0.85rem",
              }}>
                <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.62rem", letterSpacing:"0.12em", textTransform:"uppercase", color:"#2A7A50", marginBottom:"0.2rem" }}>
                  ✓ Enacted Bills — 2025–2026 Session Victories
                </div>
                <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:"0.85rem", color:"#1E3A2A", lineHeight:1.6 }}>
                  These bills have been signed into law. SFWPC should celebrate these wins, publicize them to members, and advocate for strong implementation in San Francisco.
                </p>
              </div>
            )}

            {/* Count */}
            <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:"0.55rem", letterSpacing:"0.2em", textTransform:"uppercase", color:C.gold, marginBottom:"0.8rem" }}>
              {filtered.length} bill{filtered.length!==1?"s":""} · {activeTab==="enacted" ? "Enacted" : activeTab==="adjacent" ? "Adjacent Issues" : "Active"}{activePriority!=="all" ? ` · ${PRIORITIES.find(p=>p.id===activePriority)?.short}` : ""}{activeBody!=="all" ? ` · ${BODIES.find(b=>b.id===activeBody)?.label}` : ""}
            </div>
          </div>

          {/* ── BILLS ── */}
          <div style={{ maxWidth:900, margin:"0 auto", padding:"0 1.25rem 2.5rem" }}>
            {filtered.length===0 ? (
              <div style={{ textAlign:"center", padding:"3rem 1rem", color:C.muted, fontStyle:"italic", fontSize:"0.92rem" }}>No bills match your filters.</div>
            ) : filtered.map((bill, i)=>(
              <BillCard
                key={(bill.id||"")+(bill.priority||"")+i}
                bill={bill}
                priorityColor={(PRIORITIES.find(p=>p.id===bill.priority)||{}).color||C.navy}
                idx={i}
              />
            ))}
            <div style={{ marginTop:"1.25rem", padding:"0.85rem 1rem", background:C.sand, borderLeft:`3px solid ${C.gold}`, fontSize:"0.7rem", color:C.muted, lineHeight:1.65, fontStyle:"italic" }}>
              <strong style={{ fontStyle:"normal", color:C.text }}>Tap any bill</strong> to expand summary, stage details, and recommended SFWPC actions.
              Data reflects the 2025–2026 CA legislative session and SF BOS calendar as of June 2026.
              <br/>Authoritative status: <a href="https://leginfo.legislature.ca.gov" target="_blank" rel="noopener noreferrer" style={{color:C.gold}}>leginfo.legislature.ca.gov</a> · <a href="https://sfbos.org" target="_blank" rel="noopener noreferrer" style={{color:C.gold}}>sfbos.org</a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── PASSWORD GATE ────────────────────────────────────────────────────────
const CORRECT_PASSWORD = "sfwpc2026";

function App() {
  const [authed, setAuthed] = useState(() => {
    try { return sessionStorage.getItem("sfwpc-auth") === "true"; } catch { return false; }
  });
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function attempt(e) {
    e.preventDefault();
    if (input.trim() === CORRECT_PASSWORD) {
      try { sessionStorage.setItem("sfwpc-auth", "true"); } catch {}
      setAuthed(true);
    } else {
      setError(true); setShake(true); setInput("");
      setTimeout(() => setShake(false), 500);
    }
  }

  if (authed) return <SFWPCTracker />;

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#1B2A4A", fontFamily:"'Libre Baskerville',Georgia,serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Crimson+Pro:ital,wght@0,400;1,400&display=swap');
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
        .shake { animation: shake 0.4s ease; }
      `}</style>
      <div style={{ width:"100%", maxWidth:400, padding:"0 1.5rem" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem", marginBottom:"1.75rem" }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:"#E8705A" }}/>
          <span style={{ fontSize:"0.58rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"#E8705A", fontWeight:700 }}>San Francisco Women's Political Committee</span>
          <div style={{ width:7, height:7, borderRadius:"50%", background:"#E8705A" }}/>
        </div>
        <div style={{ background:"#FAF7F2", borderRadius:4, padding:"2rem 2rem 1.75rem", boxShadow:"0 8px 40px rgba(0,0,0,0.35)" }}>
          <div style={{ width:36, height:3, background:"#F5B942", borderRadius:2, marginBottom:"1.25rem" }}/>
          <div style={{ fontSize:"1.35rem", fontWeight:700, color:"#1B2A4A", marginBottom:"0.3rem" }}>Legislative Tracker</div>
          <div style={{ fontSize:"0.82rem", color:"#7A7468", fontFamily:"'Crimson Pro',serif", fontStyle:"italic", marginBottom:"1.75rem" }}>Policy Committee — Members Only</div>
          <form onSubmit={attempt}>
            <label style={{ display:"block", fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#1B2A4A", marginBottom:"0.45rem" }}>Password</label>
            <input type="password" value={input} onChange={e=>{setInput(e.target.value);setError(false);}} autoFocus placeholder="Enter password" className={shake?"shake":""} style={{ width:"100%", padding:"0.6rem 0.75rem", border:`1.5px solid ${error?"#E8705A":"#D8D0C4"}`, borderRadius:3, fontSize:"0.95rem", fontFamily:"'Crimson Pro',serif", color:"#1E1E2E", background:"#fff", outline:"none", boxSizing:"border-box" }}/>
            {error && <div style={{ fontSize:"0.72rem", color:"#E8705A", marginTop:"0.4rem" }}>Incorrect password. Please try again.</div>}
            <button type="submit" style={{ width:"100%", marginTop:"1rem", padding:"0.65rem", background:"#1B2A4A", color:"#FAF7F2", border:"none", borderRadius:3, fontFamily:"'Libre Baskerville',serif", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer" }}>Enter</button>
          </form>
        </div>
        <div style={{ textAlign:"center", marginTop:"1.25rem", fontSize:"0.62rem", color:"rgba(250,247,242,0.25)" }}>Contact your Policy Committee chair for access.</div>
      </div>
    </div>
  );
}

export { App as default };
